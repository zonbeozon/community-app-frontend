import axios, { AxiosRequestConfig, AxiosError } from "axios";
import * as Sentry from "@sentry/react";
import { jotaiStore } from "@/atoms/store";
import { accessTokenAtom } from "@/atoms/authAtoms";
import { ENDPOINT } from "./url";

let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

const processQueue = (newToken: string | null) => {
  refreshQueue.forEach((cb) => cb(newToken));
  refreshQueue = [];
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push((newToken) => {
            if (newToken && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(api(originalRequest));
            } else {
              reject(error);
            }
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const reissueResponse = await api.post(
          ENDPOINT.REISSUE,
          {},
          { headers: { Authorization: null } }
        );

        const newAccessToken = reissueResponse.data?.accessToken;

        if (!newAccessToken) {
          throw new Error("새로운 액세스 토큰이 없습니다.");
        }

        localStorage.setItem('accessToken', newAccessToken);
        jotaiStore.set(accessTokenAtom, newAccessToken);
        processQueue(newAccessToken);
        
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return api(originalRequest);

      } catch (reissueError) {
        processQueue(null);
        Sentry.captureException(reissueError);
        
        localStorage.removeItem('accessToken');
        jotaiStore.set(accessTokenAtom, null);
        window.location.assign('/');

        return Promise.reject(reissueError);
      } finally {
        isRefreshing = false;
      }
    }

    Sentry.captureException(error);
    return Promise.reject(error);
  }
);

export default api;
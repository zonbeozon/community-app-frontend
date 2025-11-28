import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import * as Sentry from "@sentry/react";
import { jotaiStore } from "@/atoms/store";
import { accessTokenAtom } from "@/atoms/authAtoms";
import { reissue } from "./http/reissue.api";
import { ENDPOINT } from "./url";

let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

const processQueue = (newToken: string | null) => {
  refreshQueue.forEach((callback) => callback(newToken));
  refreshQueue = [];
};

const api = axios.create({
  baseURL: "",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem("accessToken");
    if (tokenString && tokenString !== "null" && config.headers) {
      try {
        const token = tokenString.startsWith('"') ? JSON.parse(tokenString) : tokenString;
        config.headers.Authorization = `Bearer ${token}`;
      } catch (e) {
        config.headers.Authorization = `Bearer ${tokenString}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (originalRequest.url?.includes(ENDPOINT.REISSUE)) {
      return Promise.reject(error);
    }

    const tokenString = localStorage.getItem("accessToken");
    if (!tokenString || tokenString === "null") {
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
      return Promise.reject(error);
    }

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
        const newAccessToken = await reissue();

        if (!newAccessToken) throw new Error("Failed to refresh token");

        jotaiStore.set(accessTokenAtom, newAccessToken);
        localStorage.setItem("accessToken", JSON.stringify(newAccessToken));

        processQueue(newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);

      } catch (reissueError) {
        processQueue(null);
        Sentry.captureException(reissueError);
        
        jotaiStore.set(accessTokenAtom, null);
        localStorage.removeItem("accessToken");

        window.location.href = "/";

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
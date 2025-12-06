import { api } from '@/apis/interceptor';
import { AxiosRequestConfig } from 'axios';

interface RequestProps {
  url: string;
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  errorMessage?: string;
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

export const fetcher = {
  async request<T = any>({ url, method = 'GET', body, headers, params }: RequestProps): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        url,
        method,
        headers,
        data: body,
        params,
      };

      const response = await api(config);
      return response.data as T;
    } catch (error: any) {
      throw error;
    }
  },

  get<T = any>(props: Omit<RequestProps, 'method' | 'body'>) {
    return this.request<T>({ ...props, method: 'GET' });
  },
  post<T = any>(props: Omit<RequestProps, 'method'>) {
    return this.request<T>({ ...props, method: 'POST' });
  },
  delete<T = any>(props: Omit<RequestProps, 'method'>) {
    return this.request<T>({ ...props, method: 'DELETE' });
  },
  patch<T = any>(props: Omit<RequestProps, 'method'>) {
    return this.request<T>({ ...props, method: 'PATCH' });
  },
  put<T = any>(props: Omit<RequestProps, 'method'>) {
    return this.request<T>({ ...props, method: 'PUT' });
  },
};

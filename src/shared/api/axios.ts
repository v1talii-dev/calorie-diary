import { Toast } from 'antd-mobile';
import axios, { type AxiosError } from 'axios';
import { store } from '@/app';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  config => {
    const state = store.getState();
    if (state.auth?.token) {
      // TODO
      // config.headers.Authorization = `Bearer ${state.auth.token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(
      error instanceof Error ? error : new Error(String(error))
    );
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    Toast.show({
      // TODO
      content:
        // @ts-ignore
        error.response?.data?.message ?? JSON.stringify(error.response?.data),
      position: 'bottom'
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;

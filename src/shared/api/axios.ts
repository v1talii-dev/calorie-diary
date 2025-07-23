import { Toast } from 'antd-mobile';
import axios, { type AxiosError } from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  config => {
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

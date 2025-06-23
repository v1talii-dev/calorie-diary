import { Toast } from 'antd-mobile';
import axios, { type AxiosError } from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  config => {
    // TODO
    // config.headers.Authorization = `Bearer ${}`;
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
      // @ts-ignore
      content: error.response?.data?.message
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;

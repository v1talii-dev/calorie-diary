import { createApi } from '@reduxjs/toolkit/query/react';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axiosInstance from './axios';

const baseQuery = async (props: AxiosRequestConfig) => {
  try {
    const result = await axiosInstance(props);
    return result;
  } catch (e) {
    const axiosErr = e as AxiosError;
    return {
      error: {
        status: axiosErr.status,
        data: axiosErr.response?.data
      }
    };
  }
};

export const rtkQueryApi = createApi({
  baseQuery,
  endpoints: () => ({})
});

import type { AxiosRequestConfig, AxiosResponse, AxiosError, Method } from "axios";

export interface Intercept {
  requestIntercept?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestError?: (error: AxiosError) => AxiosError;
  responseIntercept?: (config: AxiosResponse) => AxiosResponse;
  responseError?: (error: AxiosError) => AxiosError;
}

export interface RequestItem extends AxiosRequestConfig {
  key?: string;
  url?: string;
  method?: Method;
  data?: any;
  query?: any;
  params?: any;
  onlyIn?: boolean;
}

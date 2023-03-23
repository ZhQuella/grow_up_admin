import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from "axios";
import Request from "util/AxiosFactory";
import { createStorage } from "util/Storage";
import { AUTHORITY_TOKEN } from "@/assets/enums/cacheEnum";
import { ElMessage } from "element-plus";

const storage = createStorage({ prefixKey: "", storage: sessionStorage });

const request = new Request({
  baseURL: "/mock"
});
const requestIntercept = (config: AxiosRequestConfig): AxiosRequestConfig => {

  const token = storage.get(AUTHORITY_TOKEN);
  const isToken = (config.headers || {}).isToken === false;
  if (token && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  
  return config;
};
const responseIntercept = (response: AxiosResponse): AxiosResponse => {
  const { data, status } = response;
  if (status === 200) {
    if (data.code === 10000) {
      return data.result;
    }
    else { 
      throw new Error(data.message);
    }
  }
  else {
    ElMessage.error(response.statusText);
    return response;
  }
};
const processingError = (error: AxiosError): AxiosError => {
  return error;
};

request.interceptors({
  requestIntercept,
  requestError: processingError,
  responseIntercept,
  responseError: processingError
});

export default request;

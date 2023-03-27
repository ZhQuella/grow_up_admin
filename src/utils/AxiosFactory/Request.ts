import axios from "axios";
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  RawAxiosRequestConfig,
} from "axios";
import type { Intercept } from "types/Request";
import type { Fun } from "types/index";

export default class Request {
  private readonly axiosInstance;

  constructor(config: RawAxiosRequestConfig) {
    this.axiosInstance = axios.create(config);
  }

  interceptors(intercept: Intercept): void {
    const { axiosInstance } = this;
    const requestIntercept =
      intercept.requestIntercept || ((config: AxiosRequestConfig) => config);
    const requestError =
      intercept.requestError || ((error: AxiosError): AxiosError => error);
    const responseIntercept =
      intercept.responseIntercept || ((config: AxiosResponse) => config);
    const responseError =
      intercept.responseError || ((error: AxiosError): AxiosError => error);
    axiosInstance.interceptors.request.use(
      requestIntercept as any,
      requestError
    );
    axiosInstance.interceptors.response.use(responseIntercept, responseError);
  }

  public createMethod(requestItem: any): Fun {
    const { axiosInstance } = this;
    const {
      url: beforeUrl = "",
      method = "get",
      data: outData = {},
      query: outQuery = {},
      params: outParams = {},
      onlyIn: outOnlyIn = false,
      ...outArg
    } = requestItem;
    const that = this;

    return function (internalConfig: any = {}) {
      const {
        data: internalData = {},
        query: internalQuery = {},
        params: internalParams = {},
        onlyIn: internalOnlyIn = false,
        ...internalArg
      } = internalConfig;
      const isIn = internalOnlyIn || outOnlyIn;
      const reuqestConfig: any = {};
      if (!isIn) {
        const afterData = that.margeData(outData, internalData);
        reuqestConfig.data = afterData;
        const afterQuery = that.margeData(outQuery, internalQuery);
        reuqestConfig.params = afterQuery;
      } else {
        reuqestConfig.data = internalData;
        reuqestConfig.params = internalQuery;
      }
      const args = that.margeData(outArg, internalArg);
      const beforeParams = isIn
        ? internalParams
        : that.margeData(outParams, internalParams);
      const url = that.withParam(beforeUrl, beforeParams);

      return axiosInstance({
        url,
        method,
        ...reuqestConfig,
        ...args,
      });
    };
  }

  private margeData(outData: any, innerData: any): any {
    return Object.assign({}, outData, innerData);
  }

  private withParam(url: string, params: any): string {
    const keys = Object.keys(params);
    if (!keys.length) return url;
    return url.replace(/\{(\w+)\}/gi, ($1, $2) => {
      return params[$2] || "";
    });
  }
}

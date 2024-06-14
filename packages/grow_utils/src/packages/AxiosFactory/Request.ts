import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse, AxiosError, RawAxiosRequestConfig } from "axios";
import type { Intercept } from "types/Request";
import type { Fun } from "types/index";
import CatchResult from "./CatchResult";

export default class Request extends CatchResult {
  private readonly axiosInstance;

  constructor(config: RawAxiosRequestConfig) {
    super();
    this.axiosInstance = axios.create(config);
  }

  interceptors(intercept: Intercept): void {
    const { axiosInstance } = this;
    const requestIntercept = intercept.requestIntercept || ((config: AxiosRequestConfig) => config);
    const requestError = intercept.requestError || ((error: AxiosError): AxiosError => error);
    const responseIntercept = intercept.responseIntercept || ((config: AxiosResponse) => config);
    const responseError = intercept.responseError || ((error: AxiosError): AxiosError => error);
    axiosInstance.interceptors.request.use(requestIntercept as any, requestError);
    axiosInstance.interceptors.response.use(responseIntercept, responseError);
  }

  public createMethod(requestItem: any): Fun {
    const { axiosInstance, setCatch, getCache, isCache } = this;
    const {
      isCatch = false,
      key = "",
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
        const afterData = that.mergeData(outData, internalData);
        reuqestConfig.data = afterData;
        const afterQuery = that.mergeData(outQuery, internalQuery);
        reuqestConfig.params = afterQuery;
      } else {
        reuqestConfig.data = internalData;
        reuqestConfig.params = internalQuery;
      }
      const args = that.mergeData(outArg, internalArg);
      const beforeParams = isIn ? internalParams : that.mergeData(outParams, internalParams);
      const url = that.withParam(beforeUrl, beforeParams);
      if (isCatch && isCache.call(that, key)) {
        return Promise.resolve(getCache.call(that, key));
      }
      return axiosInstance({
        url,
        method,
        ...reuqestConfig,
        ...args
      }).then((result) => {
        if (isCatch) {
          setCatch.call(that, key, result);
        }
        return result;
      });
    };
  }

  private mergeData(outData: any, innerData: any): any {
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

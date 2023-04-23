import type { RawAxiosRequestConfig } from "axios";
import type { RequestItem } from "types/Request";
import Request from "./Request";

export default class AxiosFactory extends Request {
  private RequestConfigMap: any = {};
  static instance: AxiosFactory;

  constructor(config: RawAxiosRequestConfig) {
    super(config);
    if (AxiosFactory.instance === undefined) {
      AxiosFactory.instance = this;
    }
    return AxiosFactory.instance;
  }

  public setConfig(name: string, requestConfigs: RequestItem[]): void {
    this.RequestConfigMap[name] = requestConfigs;
  }

  public create(name: string, filters: string[] = []): any {
    const { RequestConfigMap } = this;
    const requestConfigs = RequestConfigMap[name];
    const methodsMap: any = {};
    if (!RequestConfigMap) {
      console.error("未找到对应集合，请使用新建setConfig添加");
      return methodsMap;
    }
    let createConfig = [];
    if (filters.length) {
      createConfig = requestConfigs.filter((el: RequestItem) =>
        filters.includes(el.key || "")
      );
    } else {
      createConfig = requestConfigs;
    }
    for (let i = 0; i < createConfig.length; i++) {
      const requestItem: RequestItem = createConfig[i];
      const { key = "" } = requestItem;
      const fn = this.createMethod(requestItem);
      methodsMap[key] = fn;
    }
    return methodsMap;
  }
}

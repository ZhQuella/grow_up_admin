export default class CatchResult {
  public cacheResult: any = {};

  setCatch(name: string, result: any) {
    this.cacheResult[name] = result;
  }

  getCache(name: string) {
    return this.cacheResult[name];
  }

  isCache(name: string) {
    return Boolean(this.cacheResult[name]);
  }
}

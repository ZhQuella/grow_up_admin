const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

export const createStorage = ({
  prefixKey = "",
  storage = localStorage,
} = {}) => {
  const Storage = class {
    private storage = storage;
    private prefixKey?: string = prefixKey;

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    set(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
      const stringData = JSON.stringify({
        value,
        expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
      });
      this.storage.setItem(this.getKey(key), stringData);
    }

    get<T = any>(key: string, def: any = null): T {
      const item = this.storage.getItem(this.getKey(key));
      if (item) {
        try {
          const data = JSON.parse(item);
          const { value, expire } = data;
          if (expire === null || expire >= Date.now()) {
            return value;
          }
          this.remove(this.getKey(key));
        } catch (e) {
          return def;
        }
      }
      return def;
    }

    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    clear(): void {
      this.storage.clear();
    }

    setCookie(
      name: string,
      value: any,
      expire: number | null = DEFAULT_CACHE_TIME
    ) {
      document.cookie = `${this.getKey(name)}=${value}; Max-Age=${expire}`;
    }

    getCookie(name: string): string {
      const cookieArr = document.cookie.split("; ");
      for (let i = 0, length = cookieArr.length; i < length; i++) {
        const kv = cookieArr[i].split("=");
        if (kv[0] === this.getKey(name)) {
          return kv[1];
        }
      }
      return "";
    }

    removeCookie(key: string) {
      this.setCookie(key, 1, -1);
    }

    clearCookie(): void {
      const keys = document.cookie.match(/[^ =;]+(?==)/g);
      if (keys) {
        for (let i = keys.length; i--; ) {
          document.cookie = `${keys[i]}=0;expire=${new Date(0).toUTCString()}`;
        }
      }
    }
  };
  return new Storage();
};

export const Storage = createStorage();

export default Storage;

export const debounce = (wait: number, immediate = false) => {
  let timeout: any = null;
  const debounced: any = function (...args: any[]) {
    return new Promise((resolve: any) => {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        const callNow = !timeout;
        timeout = setTimeout(() => {
          timeout = null;
        }, wait);
        if (callNow) {
          resolve();
        }
      } else {
        timeout = setTimeout(() => {
          resolve();
        }, wait);
      }
    });
  };
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
};

export const deepCopy = (source: any) => {
  if (typeof source != "object") {
    return source;
  }
  if (source == null) {
    return source;
  }
  const newObj = Array.isArray(source) ? [] : {};
  for (const i in source) {
    Reflect.set(newObj, i, deepCopy(source[i]));
  }
  return newObj;
};

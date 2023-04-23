export interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

export interface Fun {
  (...anr: any[]): any;
}

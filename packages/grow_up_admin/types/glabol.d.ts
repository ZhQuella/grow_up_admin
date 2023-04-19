import type { CSSProperties } from "vue";

declare global {
  declare interface Fn<T = any> {
    (...arg: T[]): T;
  }

  declare type Recordable<T = any, K = string> = Record<
    K extends null | undefined ? string : K,
    T
  >;
}

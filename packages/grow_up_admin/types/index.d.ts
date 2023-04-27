export interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

export interface Fun {
  (...anr: any[]): any;
}

export interface ViteEnv {
  VITE_URL: string;
  VITE_BASE_URL: string;
  VITE_ZIP_NAME: string;
}

export interface ExtendedDocument extends Document {
  msExitFullscreen?: any;
  mozCancelFullScreen?: any;
  msFullscreenElement?: any;
  mozFullScreenElement?: any;
  webkitFullscreenElement?: any;
}

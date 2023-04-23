import DownExcel from "./packages/DownExcel";
import EventEmiter from "./packages//Emit";
import Storage, { createStorage, storageExample } from "./packages/Storage";
import { addEventResize, removeResizeListener } from "./packages/ElementResize";
import Request from "./packages/AxiosFactory";

export { 
  DownExcel,
  EventEmiter,
  createStorage,
  storageExample,
  addEventResize,
  removeResizeListener,
  Request
};

export default {
  DownExcel,
  EventEmiter,
  Storage,
  Request
};

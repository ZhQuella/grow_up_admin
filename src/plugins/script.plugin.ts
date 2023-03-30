import type { App } from "vue";

import VueTour from 'v3-tour';
import ElementPlus from "element-plus";
import router from "router/index";
import store from "store/index";

import "router/permission";

export default (app: App) => {
  app.use(router);
  app.use(store);
  app.use(ElementPlus);
  app.use(VueTour);
};

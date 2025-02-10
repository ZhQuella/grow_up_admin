import { createRouter, createWebHashHistory } from "vue-router";

import routes from "./routers/index";

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  strict: true,
  routes
});

export default router;

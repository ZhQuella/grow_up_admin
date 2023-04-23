import { createRouter, createWebHistory } from "vue-router";

import routes from "./routers/index";

const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes
});

export default router;

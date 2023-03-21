import type { RouteRecordRaw } from "vue-router";

export default [
  {
    path: "/",
    name: "Index",
    component: () => import("pages/Index/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("pages/Login/index.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("pages/Home/index.vue"),
    children: [
      {
        path: "404",
        name: "NotFound",
        component: () => import("pages/NotFound/index.vue"),
      },
      {
        path: "redirect/:path(.*)",
        name: "Redirect",
        component: () => import("pages/Redirect/index.vue"),
      },
      {
        path: "child/:id",
        name: "Child",
        component: () => import("pages/Child1/index.vue"),
        meta: { componentName: "Child1" },
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("pages/NotFound/index.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    name: "pathMatch",
    redirect: () => {
      //  ! 这里需要判断，这一步必须要做 如果登录跳转到系统内部404(/home/404) 如果没有登录跳转到 /404
      return "/home/404";
    },
  },
] as RouteRecordRaw[];

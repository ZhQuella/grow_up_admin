import type { RouteRecordRaw } from "vue-router";
import { createStorage } from "grow_utils";
import { AUTHORITY_TOKEN } from "@/assets/enums/cacheEnum";
import { ROUTER_WHITELIST } from "@/assets/enums/systemEnum";

const storage = createStorage({ prefixKey: "", storage: sessionStorage });

export default [
  {
    path: "/",
    name: "Login",
    component: () => import("pages/Login/index.vue")
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("pages/Home/index.vue"),
    children: [
      {
        path: "404",
        name: "NotFound",
        component: () => import("pages/NotFound/index.vue")
      },
      {
        path: "redirect/:path(.*)",
        name: "Redirect",
        component: () => import("pages/Redirect/index.vue")
      },
      {
        path: "child/:id",
        name: "Child",
        component: () => import("pages/Child1/index.vue"),
        meta: { componentName: "Child1Page" }
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    component: () => import("pages/NotFound/index.vue")
  },
  {
    path: "/:pathMatch(.*)",
    name: "pathMatch",
    redirect: () => {
      const token = storage.get(AUTHORITY_TOKEN);
      if (token) {
        //  ! 这里最好可以判断一下权限，跳转到没有权限页面
        return "/home/404";
      } else {
        return "/404";
      }
    }
  }
] as RouteRecordRaw[];

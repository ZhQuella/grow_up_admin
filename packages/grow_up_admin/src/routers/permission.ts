import router from "router/index";
import NProgress from "nprogress";
import { createStorage } from "grow_utils";
import { AUTHORITY_TOKEN } from "@/assets/enums/cacheEnum";
import { ROUTER_WHITELIST } from "@/assets/enums/systemEnum";

const storage = createStorage({ prefixKey: "", storage: sessionStorage });

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();
  const { name } = to;
  const { path: fromPath } = from;
  const token = storage.get(AUTHORITY_TOKEN);
  if (!token && ROUTER_WHITELIST.includes(name as string)) {
    next();
    return;
  }
  if (!token && !ROUTER_WHITELIST.includes(name as string)) {
    next({ path: fromPath });
    return;
  }
  if (token && ROUTER_WHITELIST.includes(name as string)) {
    storage.remove(AUTHORITY_TOKEN);
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

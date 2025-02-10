import router from "router/index";
import NProgress from "nprogress";
import { createStorage } from "@grow-rock/grow-utils";
import { AUTHORITY_TOKEN } from "@/assets/enums/cacheEnum";
import { ROUTER_WHITELIST } from "@/assets/enums/systemEnum";
import { useLockScreen } from "store/modules/LockScreen";

const storage = createStorage({ prefixKey: "", storage: sessionStorage });

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();
  const { name } = to;
  const { path: fromPath } = from;
  const token = storage.get(AUTHORITY_TOKEN);
  const lockScreenStore = useLockScreen();

  if (!token && ROUTER_WHITELIST.includes(name as string)) {
    next();
    return;
  }
  if (!token && !ROUTER_WHITELIST.includes(name as string)) {
    next({ path: fromPath });
    lockScreenStore.setIsLockScreen(false);
    return;
  }
  if (token && ROUTER_WHITELIST.includes(name as string)) {
    storage.remove(AUTHORITY_TOKEN);
    lockScreenStore.setIsLockScreen(false);
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

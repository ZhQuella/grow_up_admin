import type { Ref } from "vue";
import type { MenuType } from "types/menu";
import type { RouteRecordRaw, RouteLocationNormalizedLoaded } from "vue-router";
import { computed, ref } from "vue";
import systemUserAxios from "api/System";
import { useRouter } from "vue-router";
import { nanoid } from "nanoid";
import { hasCommonElement } from "util/System";

import { useMenuStore } from "store/modules/menu";
import { useMultipleTab } from "store/modules/multipleTab";
import { useSystemStore } from "store/modules/systemInfo";
import authoritySigns from "router/authority";

import { extendComponent } from "util/System";

import frontMenuList from "router/pages/index";

export const useInteRouter = async ({
  systemLoading,
}: {
  systemLoading: Ref<boolean>;
}) => {
  const router = useRouter();
  const multipleTableStore = useMultipleTab();
  const menuStore = useMenuStore();
  const systemInfoStore = useSystemStore();

  const systemUser = systemUserAxios.create("userInfo");
  const menuList = systemUserAxios.create("menuList");
  const defaultPath = ref("");

  const roleSings = computed(() => systemInfoStore.getRoleSings);

  const addRouter = (
    allMenuList: MenuType[],
    catchViews: RouteLocationNormalizedLoaded[]
  ) => {
    allMenuList.forEach((el) => {
      const {
        custom,
        path,
        component: componentPath,
        props,
        children,
        name: routerName,
        cache,
        ...attrs
      } = el;
      let name = custom ? nanoid(20) : routerName;
      const route = catchViews.find((el) => el.name === routerName);
      route && (name = (route?.meta?.componentName || name) as string);
      const authoritys = (authoritySigns as any)[routerName] || [];
      const isAuthority = hasCommonElement(roleSings.value, authoritys);

      if (path && componentPath && isAuthority) {
        const component = extendComponent(`../../pages/${componentPath}`, {
          name,
        });
        const routerRecord: RouteRecordRaw = {
          path,
          name: routerName,
          component,
          props,
          meta: {
            componentName: cache === false ? void 0 : name,
            ...attrs,
          },
        };
        router.addRoute("Home", routerRecord);
      }
      if (children) {
        addRouter(children, catchViews);
      }
    });
  };

  const getFirstMenu = (allMenuList: MenuType[]): MenuType => {
    let firstMenu = null;
    let menuList: MenuType[] = [...allMenuList];
    while (true) {
      const menu = menuList.shift() as MenuType;
      const { children, path, component } = menu;
      if (path && component) {
        firstMenu = menu;
        break;
      }
      if (children) {
        menuList = [...children];
      }
    }
    return firstMenu as MenuType;
  };

  const getDefaultMenu = (allMenuList: MenuType[]): MenuType => {
    const temporary = [...allMenuList];
    let defaultMenu = getFirstMenu(allMenuList);
    while (temporary.length) {
      const menu = temporary.shift() as MenuType;
      const { default: isDefault, children } = menu;
      if (children) {
        temporary.push(...children);
      }
      if (isDefault) {
        defaultMenu = menu;
        break;
      }
    }
    return defaultMenu as MenuType;
  };
  const getUserInfo = async () => { 
    const result = await systemUser.getUserInfo();
    systemInfoStore.setUserInfo(result);
  };

  const getRoleSings = async () => { 
    const { roleSings } = await menuList.getRoleSings();
    systemInfoStore.setRoleSings(roleSings);
  };

  const systemMain = async () => {
    await getUserInfo();
    await getRoleSings();
    const catchViews = JSON.parse(
      JSON.parse(sessionStorage.getItem("TABS_LIST__") || '{ "value": "[]" }')
        .value
    );
    router.push({ name: "Home" });
    systemLoading.value = true;
    const { menuList: backMenuList } = await menuList.getMenuList();
    menuStore.setBackMenuList(backMenuList);
    menuStore.setFrontMenuList(frontMenuList as MenuType[]);
    addRouter(menuStore.allMenuList, catchViews);
    const defaultView = getDefaultMenu(menuStore.allMenuList);
    defaultPath.value = `/home/${defaultView.path}`;
    if (!catchViews.length) {
      const { name } = defaultView;
      router.push({ name });
    } else {
      multipleTableStore.visitedViews = catchViews;
      router.push({ path: multipleTableStore.activeKey });
    }
    systemLoading.value = false;
  };

  await systemMain();

  return { 
    defaultPath
  }
};

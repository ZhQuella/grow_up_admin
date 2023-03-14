import type { Ref } from "vue";
import type { MenuType } from "types/menu";
import type { RouteRecordRaw, RouteLocationNormalizedLoaded } from "vue-router";
import { useRouter } from "vue-router";
import { nanoid } from 'nanoid';

import { useMenuStore } from "store/modules/menu";
import { useMultipleTab } from "store/modules/multipleTab";

import { extendComponent } from "util/System";

//  模拟请求
import { getSystemMenu } from "@/temporary/MockRequest";
import frontMenuList from "router/pages/index";

export const useInteRouter = async ({
  systemLoading
}: { systemLoading: Ref<boolean> }) => { 

  const router = useRouter();
  const multipleTableStore = useMultipleTab();
  const menuStore = useMenuStore();

  const addRouter = (allMenuList: MenuType[], catchViews: RouteLocationNormalizedLoaded[]) => { 
    allMenuList.forEach((el) => {
      const { custom, path, component: componentPath, props, children, name: routerName, cache, ...attrs } = el;
      let name = custom ? nanoid(20) : routerName;
      const route = catchViews.find(el => el.name === routerName);
      route && (name = (route?.meta?.componentName || name) as string);
      if (path && componentPath) { 
        const component = extendComponent(`../../pages/${componentPath}`, { name });
        const routerRecord: RouteRecordRaw = {
          path,
          name: routerName,
          component,
          props,
          meta: {
            componentName: cache === false?void 0:name,
            ...attrs
          }
        };
        router.addRoute("Home", routerRecord);
      };
      if (children) { 
        addRouter(children, catchViews);
      };
    });
  };

  const getFirstMenu = (allMenuList: MenuType[]): MenuType => { 
    let firstMenu = null;
    let menuList:MenuType[]  = [...allMenuList];
    while (true) { 
      let menu = menuList.shift() as MenuType;
      const { children, path, component } = menu;
      if (path && component) { 
        firstMenu = menu;
        break;
      }
      if (children) { 
        menuList = [...children];
      }
    };
    return firstMenu as MenuType;
  };

  const getDefaultMenu = (allMenuList: MenuType[]):MenuType  => {
    let temporary = [...allMenuList];
    let defaultMenu = getFirstMenu(allMenuList);
    while (temporary.length) { 
      let menu = temporary.shift() as MenuType;
      const { default: isDefault, children } = menu;
      if (children) { 
        temporary.push(...children);
      }
      if (isDefault) { 
        defaultMenu = menu;
        break;
      }
    };
    return defaultMenu as MenuType;
  };


  const systemMain = async () => { 
    const catchViews = JSON.parse(JSON.parse(sessionStorage.getItem("TABS_LIST__") || '{ "value": "[]" }').value);
    router.push({ name: "Home" });
    systemLoading.value = true;
    const backMenuList = await getSystemMenu();
    menuStore.setBackMenuList(backMenuList);
    menuStore.setFrontMenuList(frontMenuList as MenuType[]);
    addRouter(menuStore.allMenuList, catchViews);
    if (!catchViews.length) {
      const { name } = getDefaultMenu(menuStore.allMenuList);
      router.push({ name });
    } else { 
      multipleTableStore.visitedViews = catchViews;
      router.push({ path: multipleTableStore.activeKey });
    };
    systemLoading.value = false;
  };

  await systemMain();

};

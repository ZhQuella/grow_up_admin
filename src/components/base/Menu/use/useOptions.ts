import type { MenuType } from "types/menu";
import { computed, watch, unref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useMenuStore } from "store/modules/menu";
import { useSystemStore } from "store/modules/systemInfo";
import { useMultipleTab, resetWhiteNameList } from "store/modules/multipleTab";
import authoritySigns from "router/authority";
import { hasCommonElement } from "util/System";

export const useOptions = () => {
  const menuStore = useMenuStore();
  const multipleTableStore = useMultipleTab();
  const systemInfoStore = useSystemStore();

  const menuActiveKey = computed(() => {
    return multipleTableStore.activeKey;
  });

  const visitedViews = computed(() => {
    return multipleTableStore.getVisitedViews;
  });

  const roleSings = computed(() => systemInfoStore.getRoleSings);
  const { currentRoute, push } = useRouter();

  const urlReg = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;

  const resetMenuOption = (menuList: MenuType[]): any[] => {
    return [...menuList].map((el): any => {
      const { label, name, icon, children, path } = el;
      const isDomain = urlReg.test(path);
      const toPaht = isDomain ? path : `/home/${path}`;
      const authoritys = (authoritySigns as any)[name] || [];
      const isAuthority = hasCommonElement(roleSings.value, authoritys);
      if (!isAuthority) return null;
      const menu = {
        label,
        name: path ? toPaht : name,
        icon,
      };
      if (children) {
        const childs = (resetMenuOption(children) as never[]).filter(el => el);
        Reflect.set(menu, "children", childs);
      }
      return menu;
    }).filter(el => el);
  };

  const menuList = computed(() => {
    return resetMenuOption(menuStore.menuList);
  });

  const addTags = () => {
    const { name, fullPath } = unref(currentRoute);
    if (name && !resetWhiteNameList.includes(name as string)) {
      multipleTableStore.activeKey = fullPath as string;
      multipleTableStore.addTabs(unref(currentRoute));
    }
    return false;
  };

  const moveToCurrentTag = async () => {
    await nextTick();
    for (const v of unref(visitedViews)) {
      if (v.fullPath === unref(currentRoute).path) {
        if (v.fullPath !== unref(currentRoute).fullPath) {
          multipleTableStore.updateVisitedView(unref(currentRoute));
        }
        break;
      }
    }
  };

  watch(
    () => currentRoute.value,
    () => {
      addTags();
      moveToCurrentTag();
    }
  );

  const onSelectMenu = (key: string) => {
    const isDomain = urlReg.test(key);
    if (isDomain) {
      const oA = document.createElement("a");
      oA.setAttribute("href", key);
      oA.setAttribute("target", key);
      oA.click();
    } else {
      push({ path: key });
    }
  };

  return {
    menuList,
    menuActiveKey,
    onSelectMenu,
  };
};

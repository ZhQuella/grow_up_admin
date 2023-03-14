import type { MenuType } from "types/menu";
import { computed, h, watch, unref, nextTick } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useMenuStore } from "store/modules/menu";
import { useMultipleTab, resetWhiteNameList } from "store/modules/multipleTab";

export const useOptions = () => {

  const menuStore = useMenuStore();
  const multipleTableStore = useMultipleTab();

  const menuActiveKey = computed(() => {
    return multipleTableStore.activeKey;
  });

  const visitedViews = computed(() => { 
    return multipleTableStore.getVisitedViews
  })

  const { currentRoute } = useRouter();

  const resetMenuOption = (menuList: MenuType[]): any[] => {
    return [...menuList].map((el): any => { 
      const { label, name, icon, children, path } = el;
      const toPaht = `/home/${path}`;
      const renderLabel = path ? () => h(RouterLink, {
        to: {
          path: toPaht
        }
      }, { default: () => label }) : label;
      const menu = {
        label,
        name: path?toPaht: name,
        icon
      };
      if (children) { 
        const childs = resetMenuOption(children) as never[];
        Reflect.set(menu, "children", childs);
      };
      return menu;
    });
  };

  const menuList = computed(() => {
    return resetMenuOption(menuStore.menuList);
  });

  const addTags = () => { 
    const { name, fullPath } = unref(currentRoute);
    if (name && !resetWhiteNameList.includes(name as string)) {
      multipleTableStore.activeKey = fullPath as string;
      multipleTableStore.addTabs(unref(currentRoute));
    };
    return false;
  };

  const moveToCurrentTag = async () => { 
    await nextTick()
    for (const v of unref(visitedViews)) {
      if (v.fullPath === unref(currentRoute).path) {
        if (v.fullPath !== unref(currentRoute).fullPath) {
          multipleTableStore.updateVisitedView(unref(currentRoute))
        }
        break
      }
    }
  };

  watch(() => currentRoute.value, () => {
    addTags();
    moveToCurrentTag();
  });

  return {
    menuList,
    menuActiveKey
  }

};

import { computed } from "vue";
import { useMenuStore } from "store/modules/menu";
import { useLayoutStore } from "store/modules/layout";

export const useResizeEle = () => {
  const menuStore = useMenuStore();
  const collapsed = computed(() => {
    return menuStore.getCollapsed;
  });

  const layoutStore = useLayoutStore();
  const menuMode = computed(() => {
    return isRoof.value ? "horizontal" : "vertical";
  });

  const isRoof = computed(() => {
    return layoutStore.layout === "roof";
  });

  return {
    collapsed,
    menuMode,
    isRoof,
  };
};

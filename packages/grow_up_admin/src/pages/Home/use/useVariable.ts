import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useMenuStore } from "store/modules/menu";
import { useLayoutStore } from "store/modules/layout";
import { addEventResize, removeResizeListener } from "grow_utils";
import { useAppStore } from "store/modules/app";
import { debounce } from "util/index";

export const useVariable = () => {
  const layoutStore = useLayoutStore();
  const menuStore = useMenuStore();
  const appStore = useAppStore();
  const systemLoading = ref<boolean>(false);
  const debounceFn = debounce(200);

  const resizeFn = async () => {
    await debounceFn();
    const docDOM = document.documentElement;
    if (layoutStore.layout === "roof") {
      menuStore.setCollapsed(false);
      return;
    }
    if (docDOM.clientWidth < 1024) {
      menuStore.setCollapsed(true);
      appStore.setIsPutAway(false);
    } else {
      menuStore.setCollapsed(false);
      appStore.setIsPutAway(true);
    }
  };

  onMounted(async () => {
    await nextTick();
    addEventResize(document.querySelector("#app"), resizeFn);
    resizeFn();
  });

  onUnmounted(() => {
    removeResizeListener(document.querySelector("#app"), resizeFn);
  });

  return {
    systemLoading
  };
};

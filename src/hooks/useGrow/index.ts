import type { MenuType, } from "types/menu";
import { h, Component, unref, ComputedRef, getCurrentInstance } from 'vue';
import { ElIcon } from 'element-plus';
import { computed } from "vue";
import { sizeEnum, screenEnum } from "@/assets/enums/breakpointEnum";

let globalScreenRef: ComputedRef<sizeEnum | undefined>;
let globalWidthRef: ComputedRef<number>;
let globalRealWidthRef: ComputedRef<number>;

export const useNaiveUI = () => {

  const renderIcon = (icon: Component) => {
    return () => h(ElIcon, null, { default: () => h(icon) })
  };

  const useBreakpoint = () => {
    return {
      screenRef: computed(() => unref(globalScreenRef)),
      widthRef: globalWidthRef,
      screenEnum,
      realWidthRef: globalRealWidthRef,
    };
  };

  return {
    renderIcon,
    useBreakpoint
  }
};


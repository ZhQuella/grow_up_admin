import { defineStore } from "pinia";
import { LAYOUT_KEY } from "@/assets/enums/cacheEnum";
import { storageExample } from "@grow-rock/grow-utils";
import type { LayoutState, LayoutTypes } from "types/layout";
import setting from "@/setting";

const defaultValue = setting.layoutType;

export const useLayoutStore = defineStore({
  id: "layout",
  state: (): LayoutState => ({
    layout: storageExample.get(LAYOUT_KEY, defaultValue)
  }),
  getters: {
    getLayoutType(): LayoutTypes {
      return (this.layout ?? defaultValue) as LayoutTypes;
    }
  },
  actions: {
    setLayout(layout: LayoutTypes) {
      this.layout = layout;
      storageExample.set(LAYOUT_KEY, layout);
    }
  }
});

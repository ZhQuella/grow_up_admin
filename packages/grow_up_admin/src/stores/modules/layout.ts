import { defineStore } from "pinia";
import { LAYOUT_KEY } from "@/assets/enums/cacheEnum";
import { storageExample } from "grow_utils";
import type { LayoutState, LayoutTypes } from "types/layout";

const defaultValue = "side";

export const useLayoutStore = defineStore({
  id: "layout",
  state: (): LayoutState => ({
    layout: storageExample.get(LAYOUT_KEY, defaultValue)
  }),
  getters: {
    getLayoutType(): LayoutTypes {
      return this.layout ?? defaultValue;
    }
  },
  actions: {
    setLayout(layout: LayoutTypes) {
      this.layout = layout;
      storageExample.set(LAYOUT_KEY, layout);
    }
  }
});

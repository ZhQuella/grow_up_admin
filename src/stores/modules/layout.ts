import { defineStore } from "pinia";
import { LAYOUT_KEY } from "@/assets/enums/cacheEnum";
import { Storage } from "util/Storage";
import type { LayoutState, layoutType } from "types/layout";

const defaultValue = "side";

export const useLayoutStore = defineStore({
  id: "layout",
  state: (): LayoutState => ({
    layout: Storage.get(LAYOUT_KEY, defaultValue),
  }),
  getters: {
    getLayoutType(): layoutType {
      return this.layout ?? defaultValue;
    },
  },
  actions: {
    setLayout(layout: layoutType) {
      this.layout = layout;
      Storage.set(LAYOUT_KEY, layout);
    },
  },
});

import { defineStore } from "pinia";
import { LAYOUT_KEY } from "@/assets/enums/cacheEnum";
import { Storage } from "util/Storage";
import type { LayoutState, LayoutTypes } from "types/layout";

const defaultValue = "side";

export const useLayoutStore = defineStore({
  id: "layout",
  state: (): LayoutState => ({
    layout: Storage.get(LAYOUT_KEY, defaultValue),
  }),
  getters: {
    getLayoutType(): LayoutTypes {
      return this.layout ?? defaultValue;
    },
  },
  actions: {
    setLayout(layout: LayoutTypes) {
      this.layout = layout;
      Storage.set(LAYOUT_KEY, layout);
    },
  },
});

import { defineStore } from "pinia";
import { THEME_KEY } from "@/assets/enums/cacheEnum";
import { Storage } from "util/Storage";
import type { ThemeState, themeType } from "types/theme";

export const useThemeStore = defineStore({
  id: "theme",
  state: (): ThemeState => ({
    theme: Storage.get(THEME_KEY, "light"),
  }),
  getters: {
    getTheme(): themeType {
      return this.theme ?? "light";
    },
  },
  actions: {
    setTheme(theme: themeType) {
      this.theme = theme;
      Storage.set(THEME_KEY, theme);
    },
  },
});

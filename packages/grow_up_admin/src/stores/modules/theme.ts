import { defineStore } from "pinia";
import { THEME_KEY } from "@/assets/enums/cacheEnum";
import { storageExample } from "grow_utils";
import type { ThemeState, themeType } from "types/theme";

export const useThemeStore = defineStore({
  id: "theme",
  state: (): ThemeState => ({
    theme: storageExample.get(THEME_KEY, "light")
  }),
  getters: {
    getTheme(): themeType {
      return this.theme ?? "light";
    }
  },
  actions: {
    setTheme(theme: themeType) {
      this.theme = theme;
      storageExample.set(THEME_KEY, theme);
    }
  }
});

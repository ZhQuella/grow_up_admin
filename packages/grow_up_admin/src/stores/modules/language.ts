import { defineStore } from "pinia";
import type { LanguageState, LanguageType } from "types/language";
import { LOCALE_KEY } from "@/assets/enums/cacheEnum";
import { storageExample } from "grow_utils";

export const useLanguageStore = defineStore({
  id: "locale",
  state: (): LanguageState => ({
    locale: storageExample.get(LOCALE_KEY, "ch"),
  }),
  getters: {
    getLocale(): LanguageType {
      return this.locale ?? "ch";
    },
  },
  actions: {
    setLocale(locale: LanguageType) {
      this.locale = locale;
      storageExample.set(LOCALE_KEY, locale);
    },
  },
});

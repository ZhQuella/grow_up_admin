import { defineStore } from "pinia";
import type { LanguageState, LanguageType } from "types/language";
import { LOCALE_KEY } from "@/assets/enums/cacheEnum";
import { Storage } from "util/Storage";

export const useLanguageStore = defineStore({
  id: "locale",
  state: (): LanguageState => ({
    locale: Storage.get(LOCALE_KEY, "ch"),
  }),
  getters: {
    getLocale(): LanguageType {
      return this.locale ?? "ch";
    },
  },
  actions: {
    setLocale(locale: LanguageType) {
      this.locale = locale;
      Storage.set(LOCALE_KEY, locale);
    },
  },
});

import type { App } from "vue";
import type { I18n } from "vue-i18n";
import { createI18n } from "vue-i18n";
import ElementPlus from "element-plus";
import elzhCn from "element-plus/dist/locale/zh-cn.mjs";
import elEn from "element-plus/dist/locale/en.mjs";

import { LOCALE_KEY } from "@/assets/enums/cacheEnum";
import { storageExample } from "grow_utils";

import ch from "./ch";
import en from "./en";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t: any;
  }
}

const i18n: I18n = createI18n({
  locale: storageExample.get(LOCALE_KEY, "ch"),
  legacy: false,
  messages: { ch, en },
});

export default (app: App) => {
  app.use(i18n);
  app.use(ElementPlus, {
    locale: elzhCn,
  });
  app.use(ElementPlus, {
    locale: elEn,
  });
};

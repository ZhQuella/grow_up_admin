<template>
  <ElConfigProvider :locale="localBag">
    <RouterView :class="themeClass" />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "store/modules/theme";
import { useLanguageStore } from "store/modules/language";
import { ElConfigProvider } from "element-plus";
import { useDark } from "@vueuse/core";
import elzhCn from "element-plus/dist/locale/zh-cn.mjs";
import elEn from "element-plus/dist/locale/en.mjs";

import { THEME_KEY } from "@/assets/enums/cacheEnum";

const themeStore = useThemeStore();
const languageStore = useLanguageStore();

const theme = computed(() => {
  return themeStore.theme;
});

const localBag = computed(() => {
  const localMap = {
    en: elEn,
    ch: elzhCn
  };
  return localMap[languageStore.locale];
});

const themeClass = computed(() => {
  const type = theme.value;
  return ["invoice", "theme-public", `theme-${type}`];
});

const isDark = useDark({
  storageKey: THEME_KEY,
  valueDark: "dark",
  valueLight: "light"
});
const themeValue = isDark.value ? "dark" : "light";
themeStore.theme = themeValue;
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App"
});
</script>

<template>
  <el-scrollbar class="h-full">
    <div class="px-[20px]">
      <el-divider>
        {{ $t("APP_OPTION.LANGUAGE_TITLE") }}
      </el-divider>
      <div class="flex justify-center">
        <SwitchLanguage />
      </div>
      <el-divider>
        {{ $t("APP_OPTION.THEME_TITLE") }}
      </el-divider>
      <div class="flex justify-center">
        <SwitchTheme />
      </div>
      <el-divider>
        {{ $t("APP_OPTION.LAYOUT_TITLE") }}
      </el-divider>
      <div class="flex justify-center">
        <LayoutSelect />
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import SwitchLanguage from "components/base/SwitchLanguage/index.vue";
import SwitchTheme from "components/base/SwitchTheme/index.vue";
import LayoutSelect from "components/base/LayoutSelect/index.vue";
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SettingContent"
});
</script>

<template>
  <div class="h-[100vh]">
    <div
      v-loading="systemLoading"
      class="h-full bg-BG_COLOR overflow-hidden"
      :element-loading-text="$t('PUBLIC.SYSTEM_LOADING')"
    >
      <Layout>
        <template #logo>
          <router-link :to="homePath" class="block h-full pl-[10px] w-full pr-[40px] pt-[5px]">
            <Logo :show-title="!collapsed" />
          </router-link>
        </template>
        <template #menu>
          <Menu />
        </template>
        <template #tab>
          <Tabs />
        </template>
        <template #view>
          <RenderView />
        </template>
        <template #option>
          <Options />
        </template>
        <template #bread>
          <div class="py-[18px] px-[10px]">
            <NavigationPath />
          </div>
        </template>
      </Layout>
    </div>

    <el-drawer
      v-model="settingActive"
      size="400px"
      placement="right"
      :title="$t('APP_OPTION.SETTING_TITLE')"
    >
      <SettingContent />
    </el-drawer>

    <el-dialog
      v-model="searchActive"
      destroy-on-close
      :title="$t('APP_SEARCH.SEARCH_MENU')"
      width="650px"
    >
      <div class="p-[20px]">
        <AppSearch @select="onAppSearchSelect" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Layout from "components/public/Layout/index.vue";
import Logo from "components/base/GLogo/index.vue";
import RenderView from "components/public/RenderView/index.vue";
import Menu from "components/base/Menu/index.vue";
import Tabs from "components/base/Tabs/index.vue";
import Options from "components/business/Home/Options/index.vue";
import SettingContent from "components/business/Home/SettingContent/index.vue";
import NavigationPath from "components/base/NavigationPath/index.vue";
import AppSearch from "components/base/AppSearch/index.vue";

import { useMenuStore } from "store/modules/menu";

import { useVariable } from "./use/useVariable";
import { useInteRouter } from "./use/useInteRouter";
import { useOption } from "./use/useOption";

const homePath = ref("");

const menuStore = useMenuStore();
const collapsed = computed(() => {
  return menuStore.getCollapsed;
});

const { systemLoading } = useVariable();
const { settingActive, searchActive, onAppSearchSelect } = useOption();

const onCreated = async () => {
  const { defaultPath } = await useInteRouter({ systemLoading });
  homePath.value = defaultPath.value;
};
onCreated();
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "IndexPage"
});
</script>

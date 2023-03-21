<template>
  <div class="h-[100vh]">
    <div
      v-loading="systemLoading"
      class="h-full bg-BG_COLOR overflow-hidden"
      :element-loading-text="$t('PUBLIC.SYSTEM_LOADING')"
    >
      <Layout>
        <template #logo>
          <router-link
            to="/login"
            class="block h-full w-[150px] pt-[5px] mx-[auto]"
            :class="[
              {
                'w-[64px]': collapsed,
                flex: collapsed,
                'justify-center': collapsed,
              },
            ]"
          >
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
    >
      <AppSearch @select="onAppSearchSelect" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
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

const menuStore = useMenuStore();
const collapsed = computed(() => {
  return menuStore.getCollapsed;
});

const { systemLoading } = useVariable();
const { settingActive, searchActive, onAppSearchSelect } = useOption();

const onCreated = async () => {
  await useInteRouter({ systemLoading });
};
onCreated();
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "IndexPage",
});
</script>

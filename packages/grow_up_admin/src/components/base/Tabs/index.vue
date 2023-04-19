<template>
  <div class="flex">
    <div class="flex-1 w-[1px]">
      <el-tabs
        :value="'first'"
        class="syetem-tabs-warp"
        :model-value="currentName"
      >
        <el-tab-pane
          v-for="item in tabsList"
          :key="item.fullPath"
          :name="item.fullPath"
        >
          <template #label>
            <ContextMenu
              :tag-item="item"
              :cur-route="curRoute"
              @select="onDropdownSelect"
              @visible-change="onHandleContextMenu"
            >
              <div class="flex h-full relative">
                <router-link
                  class="block pl-[10px] pr-[10px] leading-[30px]"
                  :class="[
                    {
                      'pr-[25px]': !item?.meta?.default,
                    },
                  ]"
                  :to="{ ...item }"
                >
                  {{ item?.meta?.label }}
                </router-link>
                <CloseOutlined
                  v-if="!item?.meta?.default"
                  class="leading-[30px] w-[14px] h-[14px] inline-block absolute top-[8px] right-[5px]"
                  @click.stop="onTabRemove(item)"
                />
              </div>
            </ContextMenu>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="flex w-[120px] justify-between">
      <div
        class="w-[30px] h-[30px] text-center leading-[36px] text-MAIN_TEXT hover:text-PUBLIC_MAIN_COLOR cursor-pointer transition-all duration-350"
      >
        <el-button
          :icon="ReloadOutlined"
          size="large"
          circle
          text
          class="text-[18px]"
          @click="onRedload"
        />
      </div>
      <div
        class="w-[30px] h-[30px] text-center leading-[36px] text-MAIN_TEXT hover:text-PUBLIC_MAIN_COLOR cursor-pointer transition-all duration-350"
      >
        <el-button
          :icon="isFullScreen ? FullscreenExitOutlined : FullscreenOutlined"
          size="large"
          circle
          text
          class="text-[18px]"
          @click="onWebFullScreen"
        />
      </div>
      <div>
        <ContextMenu
          trigger="click"
          :cur-route="curRoute"
          :tag-item="null"
          @select="onDropdownSelect"
          @visible-change="onHandleContextMenu"
        >
          <el-button
            :icon="ChevronDown"
            size="large"
            circle
            text
            class="text-[18px]"
          />
        </ContextMenu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ReloadOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@vicons/antd";
import { ChevronDown } from "@vicons/carbon";
import ContextMenu from "components/base/ContextMenu/index.vue";
import { useTabDropdown } from "./use/useTabDropdown";
import { useSortTabs } from "./use/useSortTabs";
import { onMounted, computed } from "vue";

import { useAppStore } from "store/modules/app";

const appStore = useAppStore();

const isFullScreen = computed(() => {
  return appStore.getWebFullScreen;
});

const onWebFullScreen = () => {
  appStore.setWebFullScreen(!isFullScreen.value);
};

useSortTabs();

const {
  tabsList,
  currentName,
  onHandleContextMenu,
  onClickoutside,
  onDropdownSelect,
  closeTag,
  onRedload,
  addDrag,
  curRoute,
} = useTabDropdown();

const onTabRemove = (tag: any) => {
  closeTag(tag);
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TabsComponent",
});
</script>

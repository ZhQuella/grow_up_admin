<template>
<div class="flex">
  <div class="flex-1 w-[1px]">
    <el-tabs :value="'first'" 
            class="syetem-tabs-warp"
            @tab-remove="closeTag"
            :modelValue="currentName">
      <el-tab-pane v-for="(item) in tabsList" 
                :key="item.fullPath" 
                :name="item.fullPath">
        <template #label>
          <ContextMenu :tagItem="item"
                      :curRoute="curRoute"
                      @select="onDropdownSelect" 
                      @visible-change="onHandleContextMenu">
            <div class="flex h-full">
              <router-link class="block pl-[10px] pr-[5px] leading-[30px]" :to="{ ...item }">
                {{ item?.meta?.label }}
              </router-link>
              <CloseOutlined class="ml-[4px] my-[8px] mr-[10px] leading-[30px] w-[14px] h-[14px] inline-block transition-all" 
                            v-if="!item?.meta?.default"
                            @click.stop="closeTag(item)"/>
            </div>
          </ContextMenu>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div class="flex w-[120px] justify-between">
    <div class="w-[30px] h-[30px] text-center leading-[36px] text-MAIN_TEXT hover:text-PUBLIC_MAIN_COLOR cursor-pointer transition-all duration-350">
      <el-button :icon="ReloadOutlined" 
                size="large" 
                circle 
                text 
                class="text-[18px]" 
                @click="onRedload">
      </el-button>
    </div>
    <div class="w-[30px] h-[30px] text-center leading-[36px] text-MAIN_TEXT hover:text-PUBLIC_MAIN_COLOR cursor-pointer transition-all duration-350">
      <el-button :icon="isFullScreen?FullscreenExitOutlined:FullscreenOutlined" 
                size="large" 
                circle 
                text 
                class="text-[18px]" 
                @click="onWebFullScreen">
      </el-button>
    </div>
    <div>
      <ContextMenu trigger="click"
                  :curRoute="curRoute"
                  @select="onDropdownSelect"
                  @visible-change="onHandleContextMenu"
                  :tagItem="null">
        <el-button :icon="ChevronDown" 
                  size="large" 
                  circle 
                  text 
                  class="text-[18px]">
        </el-button>
      </ContextMenu>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ReloadOutlined, FullscreenOutlined, FullscreenExitOutlined } from "@vicons/antd";
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
  curRoute
} = useTabDropdown();
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Tabs"
});
</script>
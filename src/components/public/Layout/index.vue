<template>
  <div class="flex h-full">
    <div class="w-[210px] h-full flex flex-col shrink-0 grow-0 bg-BG_COLOR3 border-r-[1px] border-BORDER_COLOR2 border-solid -enter-x transition-all duration-350" 
        v-if="layoutType === 'side' && !isFullScreen"
        :class="[{
          'w-[210px]': !collapsed && isPutAway,
          'w-[65px]': collapsed && !isPutAway
        }]">
      <div class="h-[50px] border-b-[1px] border-BORDER_COLOR2 border-solid box-border">
        <slot name="logo"></slot>
      </div>
      <div class="flex-1 relative transition-all">
        <el-scrollbar>
          <slot name="menu"></slot>
        </el-scrollbar>
        <div class="side-show-btn max"
            :class="[{
              'max': isPutAway,
              'min': !isPutAway
            }]"
            @click="onChangeSide"></div>
      </div>
    </div>
    <div class="flex-1 flex-col h-full w-[1px]">
      <div class="h-[50px] flex justify-between px-[10px] bg-BG_COLOR border-b-[1px] border-BORDER_COLOR2 border-solid box-border"
          v-if="!isFullScreen">
        <div class="-enter-y flex shrink-0">
          <slot name="logo" v-if="layoutType === 'roof'"></slot>
          <slot name="bread"></slot>
        </div>
        <div class="-enter-y w-full grow-0 overflow-hidden relative px-[10px]">
          <slot name="menu" v-if="layoutType === 'roof'"></slot>
        </div>
        <div class="-enter-y">
          <slot name="option"></slot>
        </div>
      </div>
      <div class="h-[40px] bg-BG_COLOR2 px-[10px] border-b-[1px] border-BORDER_COLOR2 border-solid box-border -enter-y">
        <slot name="tab"></slot>
      </div>
      <div class="flex-1 relative overflow-hidden bg-BG_COLOR enter-y" style="height: calc(100% - 90px);">
        <WerterMark class="absolute top-0 left-0 right-0 bottom-0 z-[3000] pointer-events-none"/>
        <slot name="view"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useLayoutStore } from "store/modules/layout";
import { useMenuStore } from "store/modules/menu";
import { useAppStore } from "store/modules/app";
import WerterMark from "components/public/Watermark/index.vue";

const appStore = useAppStore();
const menuStore = useMenuStore();

const isFullScreen = computed(() => {
  return appStore.getWebFullScreen;
});

const isPutAway = computed(() => {
  return appStore.getIsPutAway;
});

const onChangeSide = () => { 
  appStore.setIsPutAway(!isPutAway.value);
  menuStore.setCollapsed(!isPutAway.value);
};


const collapsed = computed(() => {
  return menuStore.getCollapsed;
});

const layoutStore = useLayoutStore();

const layoutType = computed(() => {
  return layoutStore.getLayoutType;
});

</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Layout"
});
</script>
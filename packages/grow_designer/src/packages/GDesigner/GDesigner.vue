<template>
  <div class="h-full relative"
       @mouseup="onLeftOptionClose"
       @click="onActivated('')">
    <div class="flex h-full rounded-[4px] overflow-hidden">
      <div class="grow-0 shrink-0 w-[50px] bg-BG_COLOR3 box-border p-[5px] border-r-[1px] border-BORDER_COLOR2 border-solid"
           @mouseup.stop>
        <el-tooltip class="box-item"
                    effect="dark"
                    content="组件库"
                    placement="right">
          <div class="text-center leading-[40px] mb-[5px] cursor-pointer hover:text-PUBLIC_MAIN_COLOR transition duration-150"
              :class="[
                {
                  'text-PUBLIC_MAIN_COLOR':optionConfig.type === 'module'
                }
              ]"
              @click="onLeftOptionClick('module')">
            <el-icon :size="18"
                     @click="onLeftOptionClose">
              <FlowLogsVpc/>
            </el-icon>
          </div>
        </el-tooltip>
      </div>
      <div class="h-full w-[300px] left-[50px] top-[0px] bg-BG_COLOR3 flex flex-col z-10"
           :class="[
             {
               'absolute': !optionConfig.isFixed
             }
           ]"
           @mouseup.stop
           v-if="optionConfig.visible">
        <div class="flex p-[5px] justify-between border-b-[1px] border-BORDER_COLOR2 border-solid">
          <h4 class="leading-[30px] text-[14px]">{{ optionConfig.title }}</h4>
          <div>
            <el-icon class="w-[30px] h-[30px] text-center leading-[30px] cursor-pointer"
                     :class="{
                      'text-PUBLIC_MAIN_COLOR': optionConfig.isFixed
                     }"
                     @click="onChangeOptionFixed"
                     size="16">
              <component :is="optionConfig.isFixed?'TagNone':'Tag'"/>
            </el-icon>
            <el-icon class="w-[30px] h-[30px] text-center leading-[30px] cursor-pointer"
                     @click="onLeftClose"
                     size="16">
              <Close />
            </el-icon>
          </div>
        </div>
        <div class="flex-1 h-[1px]">
          <component :is="optionConfig.componentName"
                     class="flex-1 h-full"
                     @dragstart="onGenerateKey"/>
        </div>
      </div>
      <div class="flex-1 bg-BG_COLOR2">
        <el-scrollbar class="h-full draggable-content">
          <DraggableView :draggableConfig="draggableConfig"
                         @add="onDraggableViewAdd"
                         @special="onSpecialAdd"
                        @active="onActivated"/>
        </el-scrollbar>
      </div>
      <div class="grow-0 shrink-0 w-[300px] bg-BG_COLOR3 border-l-[1px] border-BORDER_COLOR2 border-solid">
        配置区域
        {{ activeUUID }}
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { FlowLogsVpc, Close } from "@vicons/carbon";
import DraggableView from "./components/draggableView/index.vue";

import { useOption } from "./use/useOption";
import { useEvents } from "./use/useEvents";

const {
  draggableConfig,
  optionConfig,
  onLeftOptionClick,
  onLeftOptionClose,
  onChangeOptionFixed,
  onLeftClose,
  activeUUID
} = useOption();

const {
  onGenerateKey,
  onDraggableViewAdd,
  onSpecialAdd,
  onActivated
} = useEvents({
  draggableConfig,
  activeUUID
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
import moduleOptions from "./components/moduleOptions/index.vue";

export default defineComponent({
  name: "GDesigner",
  components: {
    moduleOptions
  }
});
</script>

<style lang="scss" scoped>
:deep(.draggable-content .el-scrollbar__wrap) {
  display: flex;
  flex-direction: column;
  .el-scrollbar__view {
    flex-grow: 1;
  }
}
</style>

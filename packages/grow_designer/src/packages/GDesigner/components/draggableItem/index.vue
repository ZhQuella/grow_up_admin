<template>
  <div class="relative pt-[30px] border-[1px] border-slate-300 border-dashed rounded-[5px] overflow-hidden min-h-[50px] duration-350"
       :class="[
         {
          'border-PUBLIC_MAIN_COLOR': active
         }
       ]">
    <!-- todo 这里需要点击显示 根据active的值进行判断 -->
    <transition appear
                name="animate__animated animate__bounce"
                enter-active-class="animate__backInLeft"
                leave-active-class="animate__backOutRight">
      <div class="z-20 absolute top-0 left-0 pr-[4px] h-[26px] bg-PUBLIC_MAIN_COLOR text-center rounded-br-[5px] overflow-hidden">
        <el-icon class="draggable-content-bar cursor-pointer w-[26px] h-[26px]">
          <Move class="text-white"/>
        </el-icon>
        <el-icon class="ml-[5px] cursor-pointer w-[26px] h-[26px]">
          <Delete class="text-white"/>
        </el-icon>
        <el-icon class="ml-[5px] cursor-pointer w-[26px] h-[26px]">
          <Copy class="text-white"/>
        </el-icon>
        <el-icon class="ml-[5px] cursor-pointer w-[26px] h-[26px]"
                 v-if="isAdd"
                 @click="onAddSpecificChild">
          <AddAlt class="text-white"/>
        </el-icon>
      </div>
    </transition>
    <div class="p-[5px]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Move, Delete, Copy, AddAlt } from "@vicons/carbon";
import { inject, computed, toRefs } from "vue";

const draggableConfig:any = inject("__draggableConfig__");

interface Props {
  active: boolean;
  structure: any;
}

const emit = defineEmits(['special'])

const props = defineProps<Props>();
const { structure } = toRefs(props);

const uuid = computed(() => {
  return structure?.value?.uuid;
});

const currentArgument = computed(() => {
  const { renderArgument } = draggableConfig;
  const argument = renderArgument[uuid?.value];
  return argument || {};
})

const isAdd = computed(() => {
  return currentArgument?.value?.isAdd;
});

const onAddSpecificChild = () => {
  emit('special', {
    structure: props.structure,
    renderArgument: currentArgument.value
  });
};
</script>

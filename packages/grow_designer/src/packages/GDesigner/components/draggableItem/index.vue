<template>
  <div class="relative border-[1px] border-slate-300 border-dashed rounded-[5px] overflow-hidden min-h-[50px] duration-350"
       :class="[
         {
          'border-PUBLIC_MAIN_COLOR': active
         }
       ]">
    <div class="z-20 absolute top-0 left-0 w-[70px] h-[20px] bg-PUBLIC_MAIN_COLOR text-center rounded-br-[5px] overflow-hidden">
      <el-icon class="draggable-content-bar cursor-pointer">
        <Move class="text-white"/>
      </el-icon>
      <el-icon class="ml-[5px] cursor-pointer">
        <Delete class="text-white"/>
      </el-icon>
      <el-icon class="ml-[5px] cursor-pointer">
        <Copy class="text-white"/>
      </el-icon>
    </div>
    <div class="p-[5px]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Move, Delete, Copy } from "@vicons/carbon";

interface Props {
  active: boolean
}

defineProps<Props>();

</script>

<template>
  <div>
    <div
      v-for="(item, index) in 20"
      :key="index"
      class="flex py-[5px] px-[10px]"
      :class="[
        index !== 19
          ? ['border-b-[1px] border-BORDER_COLOR2 border-solid']
          : [],
      ]"
    >
      <div class="pr-[10px] flex justify-center">
        <el-avatar
          :size="55"
          src="https://img0.baidu.com/it/u=1250551608,2180019998&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
        />
      </div>
      <div>
        <p class="text-[14px] text-TEXT_LIGHT1 leading-[26px]">
          Ah Jung 刚才把工作台页面随便写了一些，凑合能看了！
        </p>
        <span class="text-[12px] text-TEXT_LIGHT2">2023-01-04 22:37:16</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DynamicComponent",
});
</script>

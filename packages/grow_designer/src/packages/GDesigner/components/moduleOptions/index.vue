<template>
  <div class="flex flex-col">
    <div class="px-[5px]">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基础组件" name="BaseComponent"></el-tab-pane>
        <el-tab-pane label="业务组件" name="BusinessComponent"></el-tab-pane>
        <el-tab-pane label="原子组件" name="AtomicComponent"></el-tab-pane>
      </el-tabs>
    </div>
    <el-scrollbar class="h-full flex-1">
      <h1 v-for="(item) of 100" :key="item">{{ item }}</h1>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeName = ref("BaseComponent");

defineOptions({ name: "moduleOptions" })

</script>

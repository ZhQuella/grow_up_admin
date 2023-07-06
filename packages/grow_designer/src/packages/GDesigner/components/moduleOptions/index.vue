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
      <VueDraggableNext :list="list"
                        :group="{
                          name: 'draggable-group',
                          pull: 'clone',
                          put: false
                        }"
                        :animation="180"
                        :sort="false">
        <div
          class="select-none bg-gray-300 m-1 p-3 rounded-md text-center"
          v-for="element in list"
          :key="element.name"
        >
          {{ element.name }}
        </div>
      </VueDraggableNext>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { VueDraggableNext } from "vue-draggable-next";
import { ref } from "vue";

const list = ref([
  { name: 'John', id: 1 },
  { name: 'Joao', id: 2 },
  { name: 'Jean', id: 3 },
  { name: 'Gerard', id: 4 },
  { name: 'Tom', id: 5 },
  { name: 'Aaron', id: 6 },
]);

const activeName = ref("BaseComponent");

defineOptions({ name: "moduleOptions" })

</script>

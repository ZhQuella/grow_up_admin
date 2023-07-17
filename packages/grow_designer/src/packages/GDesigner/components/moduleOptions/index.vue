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
      <el-collapse v-model="collapseModel">
        <el-collapse-item v-for="(item) in drageMap"
                          :title="item[1].title"
                          :name="item[0]">
          <VueDraggableNext :list="item[1].group"
                            :group="{
                              name: 'draggable-group',
                              pull: 'clone',
                              put: false
                            }"
                            :animation="180"
                            :sort="false"
                            class="flex flex-wrap"
                            @start="onDraggableStart($event, item[1].group)"
                            @end="onDraggableEnd($event, item[1].group)">
            <div class="draggable-item w-1/3 h-[90px] box-border p-[10px] cursor-pointer hover:bg-slate-50 transition ease-in"
                v-for="(ele,index) in item[1].group"
                :key="ele.elType">
              <div class="text-center pt-[10px]">
                <el-icon :size="22">
                  <component :is="ele.elIcon"/>
                </el-icon>
              </div>
              <p class="text-center">{{ ele.elName }}</p>
            </div>
          </VueDraggableNext>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { VueDraggableNext } from "vue-draggable-next";
import { useInit } from "./use/useInit";

defineOptions({ name: "moduleOptions" });

const emit = defineEmits(["dragstart","dragend","start"]);

const {
  drageMap,
  activeName,
  collapseModel
} = useInit();
</script>

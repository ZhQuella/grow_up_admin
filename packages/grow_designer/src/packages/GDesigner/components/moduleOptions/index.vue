<template>
  <div class="flex flex-col">
    <div class="px-[5px]">
      <el-tabs v-model="activeName"
               @tab-change="onTableChange">
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
          <draggable v-model="item[1].group"
                    :group="{
                      name: 'draggable-group',
                      pull: 'clone',
                      put: false
                    }"
                    tag="div"
                    :animation="180"
                    :sort="false"
                    class="flex flex-wrap"
                    @start="onDragStart($event, item[1].group)"
                    @end="onDragEnd($event, item[1].group)">
            <template #item="{ element }">
              <div class="draggable-item">
                <div class="text-center pt-[10px]">
                  <el-icon :size="22">
                    <component :is="element.elIcon"/>
                  </el-icon>
                </div>
                <p class="text-center text-[var(--el-text-color-regular)]">{{ element.elName }}</p>
              </div>
            </template>
          </draggable>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { useInit } from "./use/useInit";
import { nanoid } from "nanoid";

defineOptions({ name: "moduleOptions" });

defineEmits(["dragstart","dragend","start"]);

const {
  drageMap,
  activeName,
  collapseModel,
  onTableChange
} = useInit();

const onDragStart = (event, list) => {
  const uuid:string = nanoid();
  list[event.oldIndex].uuid = uuid;
};

const onDragEnd = (event, list) => {
  Reflect.deleteProperty(list[event.oldIndex], "uuid");
};
</script>

<style lang="scss" scoped>
.draggable-item {
  width: 33.33%;
  height: 90px;
  padding: 10px;
  cursor: pointer;
  transition: background-color .35s;
  &:hover {
    background-color:var(--el-text-color-disabled);
  }
}
</style>

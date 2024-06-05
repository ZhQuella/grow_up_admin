<template>
  <div class="h-full p-[5px]">
    <draggableContent @add="onDraggableAdd"
                      @special="onSpecialAdd"
                      @active="onActive"
                      @delete="onDeleteItem"
                      @copy="onCopyItem"
                      :draggableConfig="draggableConfig"/>
  </div>
</template>

<script setup lang="ts">
import draggableContent from "../draggableContent/index.vue";

import { useEvents } from "./use/useEvents";

const emits = defineEmits(["add",'special','active','delete', 'copy']);

defineOptions({ name: "draggableView" });

interface Props {
  draggableConfig: any
};

defineProps<Props>();

const {
  onDraggableAdd,
  onSpecialAdd,
  onActive,
  onDeleteItem,
  onCopyItem
} = useEvents({
  emits
});
</script>

<style lang="scss">
.draggable-grop-wrap {
  .ghost {
    width: 100% !important;
    display: block !important;
    height: 5px !important;
    background-color: rgb(var(--public-main-color)) !important;
    overflow: hidden !important;
    padding: 0px !important;
  }
}
</style>

<template>
  <div class="h-full p-[5px]">
    <draggableContent @add="onDraggableAdd"
                      @special="onSpecialAdd"
                      @active="onActiveed"
                      :draggableConfig="draggableConfig"/>
  </div>
</template>

<script setup lang="ts">
import draggableContent from "../draggableContent/index.vue";

import { useEvents } from "./use/useEvents";

const emits = defineEmits(["add",'special','active']);

defineOptions({ name: "draggableView" });

interface Props {
  draggableConfig: any
};

defineProps<Props>();

const {
  onDraggableAdd,
  onSpecialAdd,
  onActiveed
} = useEvents({
  emits
});
</script>

<style lang="scss">
.draggable-grop-wrap {
  .draggable-item {
    width: 100% !important;
    display: block !important;
    height: auto !important;
    transition: all .35s !important;
  }
}
</style>

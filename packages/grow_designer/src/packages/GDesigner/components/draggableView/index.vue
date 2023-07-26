<template>
  <div class="h-full p-[5px]">
    <draggableContent @add="onDraggableAdd"
                      :draggableConfig="draggableConfig"/>
  </div>
</template>

<script setup lang="ts">
import draggableContent from "../draggableContent/index.vue";

import { useEvents } from "./use/useEvents";

const emits = defineEmits(["add"]);

defineOptions({ name: "draggableView" });

interface Props {
  draggableConfig: any
};

const props = defineProps<Props>();

const {
  onDraggableAdd
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

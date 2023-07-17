<template>
  {{ structures }}
  <VueDraggableNext group="draggable-group"
                    :animation="180"
                    :modelValue="structures"
                    class="draggable-grop-wrap h-full bg-BG_COLOR2"
                    @add="onDraggableAdd">
    <transition-group type="transition">
      <div v-for="ele in structures"
           :key="ele.uuid">{{ ele.elName }}</div>
    </transition-group>
  </VueDraggableNext>
</template>

<script setup lang="ts">
import { VueDraggableNext } from "vue-draggable-next";

import { useEvents } from "./use/useEvents";

const emits = defineEmits(["add"]);

defineOptions({ name: "draggableView" });

interface Props {
  structures: any[]
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

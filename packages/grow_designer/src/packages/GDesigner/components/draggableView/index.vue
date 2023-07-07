<template>
    <VueDraggableNext group="draggable-group"
                      :animation="180"
                      :modelValue="draggableList"
                      class="draggable-grop-wrap h-full bg-BG_COLOR2">
      <transition-group type="transition">
        <div v-for="ele in draggableList"
             :key="ele.elName + Math.random()">{{ ele.elName }}</div>
      </transition-group>
    </VueDraggableNext>
</template>

<script setup lang="ts">
import { VueDraggableNext } from "vue-draggable-next";

interface Props {
  draggableList: any[]
};

const props = defineProps<Props>();

defineOptions({ name: "draggableView" })

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

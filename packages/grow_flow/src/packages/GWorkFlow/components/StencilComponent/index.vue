<template>
  <div class="h-full relative" ref="stencilRef">

  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "StencilComponent" });
import { ref } from "vue";
import { initStencil } from "./use/initStencil"

const stencilRef = ref();

const {
  createStencil,
  createNodes,
  initNode,
} = initStencil({
  stencilRef
});

defineExpose({
  createStencil,
  createNodes,
  initNode
});
</script>

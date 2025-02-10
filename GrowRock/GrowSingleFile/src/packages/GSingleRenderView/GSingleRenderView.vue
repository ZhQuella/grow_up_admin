<template>
  <template v-if="RenderView">
    <RenderView />
  </template>
</template>

<script setup lang="ts">
defineOptions({ name: "GSingleRenderView" });
import { defineAsyncComponent, nextTick, ref } from "vue";
import { defineSFC } from "vue-sfc-component";

const RenderView = ref();

const setCode = async (options) => {
  RenderView.value = null;
  await nextTick();
  RenderView.value = defineAsyncComponent(() => defineSFC("App.vue", options) as any);
};

defineExpose({
  setCode
});
</script>

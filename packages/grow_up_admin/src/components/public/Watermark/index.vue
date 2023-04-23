<template>
  <div ref="werterMarkRef" />
</template>

<script setup lang="ts">
import { useWerterMark } from "./use/useWerterMark";

const { werterMarkRef } = useWerterMark();
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "RenderView"
});
</script>

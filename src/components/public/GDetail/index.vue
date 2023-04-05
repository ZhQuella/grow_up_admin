<template>
  <slot />
</template>

<script setup lang="ts">
import { provide, toRefs } from "vue";

const props = defineProps({
  model: {
    type: Object,
    default: () => ({})
  },
  labelWidth: {
    type: String,
    default: ""
  },
  align: {
    type: String,
    default: "right"
  }
});

provide("g-detail", props);
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GDetail",
});
</script>

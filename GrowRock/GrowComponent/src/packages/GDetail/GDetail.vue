<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent, provide } from "vue";
export default defineComponent({
  name: "GDetail",
  props: {
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
  },
  setup(props) {
    provide("g-detail", props);
  }
});
</script>

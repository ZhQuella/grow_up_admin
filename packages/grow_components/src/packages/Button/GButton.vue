<template>
  <ElButton>click me</ElButton>
</template>

<script lang="ts" setup></script>

<script lang="ts">
import { defineComponent } from "vue";
import { ElButton } from "element-plus";

export default defineComponent({
  name: "GButton",
  components: {
    ElButton
  }
});
</script>

<template>
  <div>
    <ElButton>123</ElButton>
    <ElDialog>click me</ElDialog>
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
import { defineComponent } from "vue";
import { ElDialog, ElButton } from "element-plus";

export default defineComponent({
  name: "GButton",
  components: {
    ElDialog,
    ElButton
  }
});
</script>

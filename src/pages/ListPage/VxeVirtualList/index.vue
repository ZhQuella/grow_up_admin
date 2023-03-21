<template>
  <div class="p-[10px]">
    <pageLayout>
      <template #header />
      <template #main />
      <template #footer>
        <div
          :span="12"
          class="flex justify-end pt-[10px]"
        />
      </template>
    </pageLayout>
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "VxeVirtualList",
});
</script>

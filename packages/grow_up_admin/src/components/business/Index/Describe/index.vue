<template>
  <div class="bg-BG_COLOR2 p-[24px] rounded-[4px] overflow-hidden h-full">
    <h6 class="text-[18px] pb-[10px]">
      <span class="pr-[5px]">{{ emjo }}</span>
      <span class="text-TEXT_LIGHT1">{{ title }}</span>
    </h6>
    <p class="text-[14px] text-TEXT_LIGHT2">
      {{ detail }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  emjo: string;
  title: string;
  detail: string;
}

defineProps<Props>();
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DescribeComponent",
});
</script>

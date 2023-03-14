<template>
  <div class="flex justify-between">
    <div class="h-[40px] min-w-[40px]">
      <img class="block h-[100%]" :src="getImageUrl(systemConfig?.logUrl)"/>
    </div>
    <h1 class="leading-[40px] pl-[10px] text-[18px] text-MAIN_TEXT transition ease-in"
        v-if="showTitle">
      {{ systemConfig?.systemName }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import { toRefs, computed } from "vue";
import { getImageUrl } from "util/System";
import systemConfig from "@/systemConfig";


const props = defineProps({
  isOpacity: {
    type: Boolean,
    default: false
  },
  showTitle: {
    type: Boolean,
    default: true
  }
});

const {
  isOpacity
} = toRefs(props);
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GLogo"
});
</script>

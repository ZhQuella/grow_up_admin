<template>
  <div class="h-full flex flex-col">
    <h5 class="text-[14px] p-[10px] bg-BG_COLOR2">页面配置</h5>
    <div class="px-[5px] shrink-0 grow-0">
      <ElTabs v-model="tabModel" stretch>
        <ElTabPane label="属性" name="props" />
        <ElTabPane label="高级" name="renderArgument" />
      </ElTabs>
    </div>
    <ElScrollbar class="h-full flex-1">
      <configurationComponent :config="props.config" />
    </ElScrollbar>
  </div>
</template>

<script setup lang="ts">
import configurationComponent from "../configurationComponent/index.vue";
defineOptions({ name: "pageOptions" });
import { ref } from "vue";

const tabModel = ref("props");
const props = defineProps({
  config: {
    type: Object
  }
});
</script>

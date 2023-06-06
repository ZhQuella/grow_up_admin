<template>
  <g-detail label-width="50px">
    <el-tag :type="tagType">
      {{ config.tagInfo }}
      <span v-if="config.personnel">{{ config.personnel }}</span>
    </el-tag>
    <g-detail-item label="操作人" class="text-[var(--el-text-color-secondary)] text-[12px]">
      <p class="text-[var(--el-text-color-secondary)]">
        {{ config.operator }}
      </p>
    </g-detail-item>
    <g-detail-item
      label="备注"
      class="text-[var(--el-text-color-secondary)] text-[12px] leading-[20px]"
      v-if="config.remark"
    >
      <p>{{ config.remark }}</p>
    </g-detail-item>
  </g-detail>
</template>

<script setup lang="ts">
import type { HistoryItem } from "../../types/index";
import { toRefs, computed } from "vue";

interface propsType {
  config: HistoryItem;
}

const prpos = withDefaults(defineProps<propsType>(), {
  config: {}
});

const { config } = toRefs(prpos);

const tagType = computed(() => {
  let type = "";
  switch (config.value.type) {
    case "3":
    case "5":
      type = "danger";
      break;
    case "6":
      type = "warning";
      break;
    case "4":
    case "2":
      type = "success";
      break;
    case "1":
    case "7":
      type = "";
      break;
    default:
      type = "info";
      break;
  }
  return type;
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "HistoryItem"
});
</script>

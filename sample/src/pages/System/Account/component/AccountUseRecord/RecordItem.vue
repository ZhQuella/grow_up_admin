<template>
  <g-detail label-width="60px">
    <g-detail-item
      label="登录方式"
      class="text-[var(--el-text-color-secondary)] text-[12px] leading-[20px]"
    >
      <p class="text-[var(--el-text-color-secondary)]">
        {{ config.loginType }}
      </p>
    </g-detail-item>
    <g-detail-item
      label="绑定人员"
      class="text-[var(--el-text-color-secondary)] text-[12px] leading-[20px]"
    >
      <p class="text-[var(--el-text-color-secondary)]">
        {{ config.personnel }}
      </p>
    </g-detail-item>
    <g-detail-item
      label="登录结果"
      class="text-[var(--el-text-color-secondary)] text-[12px] leading-[20px]"
    >
      <p>{{ config.loginResult }}</p>
    </g-detail-item>
    <g-detail-item
      v-if="config.errorMessage"
      label="错误信息"
      class="text-[var(--el-text-color-secondary)] text-[12px] leading-[20px]"
    >
      <p>{{ config.errorMessage }}</p>
    </g-detail-item>
  </g-detail>
</template>

<script setup lang="ts">
import type { RecordItem } from "../../types/index";
import { toRefs } from "vue";

interface propsType {
  config: RecordItem;
}

const props = defineProps<propsType>();

const { config } = toRefs(props);
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "RecordItem"
});
</script>

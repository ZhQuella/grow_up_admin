<template>
  <component
    :is="config.elType"
    v-model="searchData[config.model]"
    class="w-full"
    v-bind="config"
    size="default"
    :teleported="false"
  >
    <template v-if="['el-select'].includes(config.elType)">
      <el-option
        v-for="(item, index) in config.options"
        :key="index"
        :label="item[config.label]"
        :value="item[config.value]"
      />
    </template>
  </component>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps({
  searchData: {
    type: Object,
    default: () => ({}),
  },
  config: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AbstractEle",
});
</script>

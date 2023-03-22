<template>
  <component
    :is="config.elType"
    v-if="!isSlot"
    v-model="searchData[config.model]"
    class="w-full"
    v-bind="config"
    size="default"
    :teleported="false"
  />
  <component
    :is="config.elType"
    v-if="isSlot"
    v-model="searchData[config.model]"
    class="w-full"
    v-bind="config"
    size="default"
    :teleported="false"
  >
    <template>
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
import { computed } from "vue";

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

const isSlot = computed(() => {
  return ["el-select"].includes(props.config.elType);
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AbstractEle",
});
</script>

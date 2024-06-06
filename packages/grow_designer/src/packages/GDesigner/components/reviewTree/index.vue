<template>
  <ElTree :data="treeData"
          node-key="uuid"
          default-expand-all
          :defaultProps=" {
            children: 'children'
          }"
          :render-content="renderContent">
  </ElTree>
</template>

<script setup lang="tsx">
defineOptions({ name: "reviewTree" });
import { toRefs, computed } from "vue";
import { deepCopyArray } from "../../utils/index";

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["treeClick"]);

const { data } = toRefs(props);

const treeData = computed(() => {
  return deepCopyArray(data.value.structures);
});

const renderContent = (_, { data:nodeData }) => {
  return `${data.value.renderArgument[nodeData.uuid].elName} `;
};
</script>

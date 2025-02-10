<template>
  <ElForm class="px-[10px] pt-[5px]" label-width="50px">
    <ElFormItem v-for="(item, index) of configurationList" :key="index" :label="item.name">
      <component :is="item.eleType" />
    </ElFormItem>
  </ElForm>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";

const emit = defineEmits(["change"]);
const configurationList = ref([
  {
    eleType: "ElInput",
    name: "123"
  },
  {
    eleType: "ElSelect",
    name: "Select"
  }
]);

const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
});
const { config } = toRefs(props);

console.log(config);
</script>

<style scoped></style>

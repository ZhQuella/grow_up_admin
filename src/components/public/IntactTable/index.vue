<template>
  <el-table-v2
    ref="tableRef"
    :height="height"
    :width="width"
    fixed
    :columns="allColumns"
    :data="data"
  />
</template>

<script setup lang="ts">
import { onActivated, nextTick, ref } from "vue";
import { useInitColumns } from "./use/useInitColumns";
import { useEvent } from "./use/useEvent";

const tableRef = ref();

const props = defineProps({
  height: {
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: 0,
  },
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
  onlyKey: {
    type: String,
    default: "id",
  },
});

const { state, allColumns } = useInitColumns({
  columns: props.columns,
});

const { setColumns } = useEvent({
  state,
});

defineExpose({
  setColumns,
});

onActivated(async () => {
  await nextTick();
  tableRef.value.scrollTo({ scrollTop: 0, scrollLeft: 0 });
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "IntactTable",
});
</script>

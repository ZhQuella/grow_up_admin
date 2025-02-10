<template>
  <el-table
    v-loading="loading"
    :height="height"
    :data="data"
    :row-class-name="rowClassName"
    @cell-mouse-enter="onRowMouseEnter"
    @cell-mouse-leave="onRowMouseLeave"
    v-bind="$attrs"
  >
    <el-table-column v-if="isSerial" width="60px" v-bind="serialColumn">
      <template #header>
        {{ t("TABLE.SERIAL") }}
      </template>
      <template #default="scope">
        <div class="h-[28px] leading-[28px]" v-if="!onlyIndex">
          <span
            v-if="mouseKey !== scope.row[onlyKey] && !selectOnlyKeys.includes(scope.row[onlyKey])"
            >{{ scope.$index + 1 }}</span
          >
          <el-checkbox
            v-else
            size="small"
            @change="onTableCheckboxSelect($event, scope)"
            :checked="selectOnlyKeys.includes(scope.row[onlyKey])"
          />
        </div>
        <div class="h-[28px] leading-[28px]" v-if="onlyIndex">
          <span>{{ scope.$index + 1 }}</span>
        </div>
      </template>
    </el-table-column>

    <Column :children="allColumns" />

    <el-table-column v-if="isOperate" :label="operateColumn.title" v-bind="operateColumn">
      <template #default="scope">
        <slot name="btnOption" v-bind="scope" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Column from "./Column.vue";
import { useEvent } from "./use/useEvent";
import { useInitColumns } from "./use/useInitColumns";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const emit = defineEmits(["select"]);

const props = defineProps({
  height: {
    type: Number,
    default: 0
  },
  columns: {
    type: Array,
    default: () => []
  },
  onlyKey: {
    type: String,
    default: "id"
  },
  data: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  onlyIndex: {
    type: Boolean,
    default: false
  },
  select: {
    type: Array,
    default: () => []
  }
});

const { isSerial, isOperate, allColumns, serialColumn, operateColumn, state } = useInitColumns({
  props
});

const {
  mouseKey,
  selectOnlyKeys,
  onRowMouseEnter,
  onRowMouseLeave,
  onTableCheckboxSelect,
  rowClassName,
  setColumns,
  clearSelect
} = useEvent({
  emit,
  state,
  onlyKey: props.onlyKey,
  props
});

defineExpose({
  setColumns,
  clearSelect
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ElBaseList"
});
</script>

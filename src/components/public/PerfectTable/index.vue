<template>
  <el-table :height="height" 
            :data="data"
            @cell-mouse-enter="onRowMouseEnter"
            @cell-mouse-leave="onRowMouseLeave"
            :row-class-name="rowClassName">
    <el-table-column v-if="isSerial"
                    width="60px"
                    v-bind="serialColumn">
      <template #header>
        {{ $t("TABLE.SERIAL") }}
      </template>
      <template #default="scope">
        <div class="h-[28px] leading-[28px]">
          <span v-if="mouseKey !== scope.row[onlyKey] && !selectOnlyKeys.includes(scope.row[onlyKey])">{{ scope.$index + 1 }}</span>
          <el-checkbox v-else size="small"
                      @change="onTableCheckboxSelect($event, scope)"></el-checkbox>
        </div>
      </template>
    </el-table-column>

    <el-table-column v-for="(item,index) of allColumns"
                    :key="index"
                    :prop="item.field" 
                    :label="item.title" 
                    :width="item.width"
                    :fixed="item.fixed"
                    v-bind="item"></el-table-column>

    <el-table-column v-if="isOperate"
                    :label="operateColumn.title" 
                    v-bind="operateColumn">
      <template #default="scope">
        <slot name="btnOption" v-bind="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEvent } from "./use/useEvent";
import { useInitColumns } from "./use/useInitColumns";

const emit = defineEmits([
  "select"
]);

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
  }
});


const {
  isSerial,
  isOperate,
  allColumns,
  serialColumn,
  operateColumn,
  currentColumns,
  state
} = useInitColumns({
  props
});

const {
  mouseKey,
  selectOnlyKeys,
  onRowMouseEnter,
  onRowMouseLeave,
  onTableCheckboxSelect,
  rowClassName,
  setColumns
} = useEvent({
  emit,
  state,
  onlyKey: props.onlyKey
});

defineExpose({
  setColumns
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ElBaseList"
});
</script>

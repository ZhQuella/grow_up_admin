<template>
  <el-popover width="350px"
            v-model:visible="visible"
            placement="top-end"
            trigger="click"
            @hide="onSetColumns">
    <template #reference>
      <el-button :icon="DataTableReference" 
                circle></el-button>
    </template>
    <div>
      <div class="border-b-[1px] border-[var(--el-border-color)] border-solid py-[5px] px-[10px] flex justify-end">
        <el-checkbox :indeterminate="state.catchTreeCheckedKeys.length !== allChild.length"
                    :model-value="isAllChecked"
                    @change="onAllSelectChange">全选</el-checkbox>
      </div>
      <el-scrollbar height="400px">
        <el-tree node-key="field"
                :data="state.treeData"
                :props="{
                  label: renderLabel
                }"
                show-checkbox
                ref="treeRef"
                @check="onTreeChange"/>
      </el-scrollbar>
      <div class="border-t-[1px] border-[var(--el-border-color)] border-solid p-[10px] flex justify-end">
        <el-button :icon="DataView"
                  @click="onResetColumns">{{ $t("SEARCH_BAR.RESET_SYETEM") }}</el-button>
        <el-button type="primary" 
                  :icon="FolderDetailsReference"
                  @click="onSetColumns">{{ $t("PUBLIC.CONFIRM_TEXT")  }}</el-button>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DataTableReference, FolderDetailsReference, Reset, DataView } from "@vicons/carbon";
import { useInitTree } from "./use/useInitTree";
import { useEvent } from "./use/useEvent";

const emit = defineEmits([
  "confirm"
]);

const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  }
});

const visible = ref(false);

const { 
  renderLabel,
  treeRef,
  catchCheckedKeys,
  state,
  allChild,
  isAllChecked,
  getAllChild
} = useInitTree({
  columns: props.columns
});

const {
  onTreeChange,
  onAllSelectChange,
  onSetColumns,
  onResetColumns
} = useEvent({
  treeRef,
  state,
  catchCheckedKeys,
  allChild: allChild.value,
  getAllChild,
  emit,
  visible
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ColumnBar"
});
</script>

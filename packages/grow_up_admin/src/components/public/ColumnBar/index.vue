<template>
  <el-popover
    v-model:visible="visible"
    width="350px"
    placement="top-end"
    trigger="click"
    @hide="onSetColumns"
  >
    <template #reference>
      <el-button :icon="DataTableReference" circle />
    </template>
    <div>
      <div
        class="border-b-[1px] border-[var(--el-border-color)] border-solid py-[5px] px-[10px] flex justify-end"
      >
        <el-checkbox
          :indeterminate="state.catchTreeCheckedKeys.length !== allChild.length"
          :model-value="isAllChecked"
          @change="onAllSelectChange"
        >
          全选
        </el-checkbox>
      </div>
      <el-scrollbar height="400px">
        <el-tree
          ref="treeRef"
          :node-key="nodeKey"
          :data="state.treeData"
          :props="{
            label: renderLabel
          }"
          show-checkbox
          default-expand-all
          @check="onTreeChange"
        />
      </el-scrollbar>
      <div
        class="border-t-[1px] border-[var(--el-border-color)] border-solid p-[10px] flex justify-end"
      >
        <el-button :icon="DataView" @click="onResetColumns">
          {{ t("SEARCH_BAR.RESET_SYETEM") }}
        </el-button>
        <el-button type="primary" :icon="FolderDetailsReference" @click="onSetColumns">
          {{ t("PUBLIC.CONFIRM_TEXT") }}
        </el-button>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import { DataTableReference, FolderDetailsReference, Reset, DataView } from "@vicons/carbon";
import { useInitTree } from "./use/useInitTree";
import { useEvent } from "./use/useEvent";
import { useI18n } from "vue-i18n";


const { t } = useI18n();
const emit = defineEmits(["confirm"]);

const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  nodeKey: {
    type: String,
    default: "field"
  }
});

const visible = ref(false);

const { columns, nodeKey } = toRefs(props);

const { renderLabel, treeRef, catchCheckedKeys, state, allChild, isAllChecked, getAllChild } =
  useInitTree({
    columns,
    nodeKey
  });

const { onTreeChange, onAllSelectChange, onSetColumns, onResetColumns } = useEvent({
  treeRef,
  state,
  catchCheckedKeys,
  allChild: allChild.value,
  getAllChild,
  emit,
  visible,
  nodeKey
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ColumnBar"
});
</script>

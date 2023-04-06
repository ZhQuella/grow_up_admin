<template>
  <div class="p-[10px]">
    <pageLayout>
      <template #aside>
        <div class="h-full">
          <div class="p-[5px] border-b-[1px] border-[var(--el-border-color)] border-solid">
            <el-input
              v-model="deptSearchValue" 
              placeholder="请输入部门名称"
              clearable
              @input="onDeptInput"
            />
          </div>
          <el-scrollbar style="height: calc(100% - 43px);">
            <div v-show="!deptSearchValue">
              <el-tree
                :data="deptTreeList"
                :props="defaultProps" 
                default-expand-all
                @node-click="onTreeNodeClick"
              />
            </div>
            <div v-show="deptSearchValue">
              <div
                v-for="(item) of filterResult"
                :key="item.id"
                class="p-[5px] text-[13px] text-[var(--el-text-color-regular)] cursor-pointer"
                @click="onTreeNodeClick(item)"
              >
                {{ item.label }}
              </div>
            </div>
          </el-scrollbar>
        </div>
      </template>

      <template #header>
        <div class="flex justify-between">
          <div class="pt-[8px]">
            <ButtonGroup
              :button-group="optionGroup"
              :max="5"
              show-text
            />
          </div>
          <div class="pt-[3px]">
            <SearchBar
              :search="searchList"
              @search="onTableSeach"
            />
            <ColumnBar
              :columns="tableColumns"
              @confirm="onColumnsBarConfirm"
            />
          </div>
        </div>
      </template>
      <template #main="{ height }">
        <PerfectTable
          ref="tableRef"
          :height="height"
          :columns="tableColumns"
          :data="tableList"
          only-key="id"
          :loading="tableLoading"
          @select="onPerfectTableSelect"
        >
          <template #btnOption="btnOption">
            <ButtonGroup
              :button-group="buttonGroup"
              :max="4"
              :data="btnOption"
            />
          </template>
        </PerfectTable>
      </template>
      <template #footer>
        <div
          :span="12"
          class="flex justify-end pt-[10px]"
        >
          <el-pagination
            v-model:current-page="page"
            v-model:page-size="size"
            :page-sizes="pageSizes"
            :layout="layout"
            :total="total"
            small
          />
        </div>
      </template>
    </pageLayout>


    <g-dialog
      v-model="dialogConfig.visible" 
      width="600px"
      :title="dialogConfig.title"
      @close="onDialogClose"
    >
      <component
        :is="dialogConfig.conmponetName"
        :row="dialogConfig.data"
        @close="onDialogClose"
        @success="onAccountSuccess"
      />
    </g-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { useTable } from "hooks/useTable";
import ColumnBar from "components/public/ColumnBar/index.vue";
import { Delete, DataViewAlt } from "@vicons/carbon";
import SearchBar from "components/public/SearchBar/index.vue";
import PerfectTable from "components/public/PerfectTable/index.vue";
import ButtonGroup from "components/public/ButtonGroup/index.vue";

import { useDeptTree } from "hooks/useBusiness/useDeptTree";
import { useDict } from "./use/useDict";
import { useTableOption } from "./use/useTableOption";
import { useTableFunc } from "./use/useTableFunc";

const { pageSizes, page, size, layout, total } = useTable();

const {
  accountStates
} = useDict();

const { 
  tableList,
  tableColumns,
  getAccountList,
  onTreeNodeClick,
  tableLoading
} = useTableOption({
  tableTotal: total,
  accountStates
});

const {
  buttonGroup,
  optionGroup,
  dialogConfig,
  onDialogClose,
  onAccountSuccess
} = useTableFunc({
  getAccountList
});

const { 
  deptTreeList,
  deptSearchValue,
  filterResult,
  onDeptInput
} = useDeptTree();


const tableRef = ref();
const state = reactive({
  selectList: [],
});


// ~ 查询条件配置
const searchList = [
  {
    elType: "el-input",
    labelText: "导入文件ID1",
    model: "fileId1",
    placeholder: "请输入文件ID1",
  },
  {
    elType: "el-input",
    labelText: "导入文件ID2",
    model: "fileId2",
    placeholder: "请输入文件ID2",
  },
  {
    elType: "el-input",
    labelText: "导入文件ID3",
    model: "fileId3",
    placeholder: "请输入文件ID3",
  },
  {
    elType: "el-input",
    labelText: "导入文件ID4",
    model: "fileId4",
    placeholder: "请输入文件ID4",
  },
  {
    elType: "el-input",
    labelText: "导入文件ID5",
    model: "fileId5",
    placeholder: "请输入文件ID5",
  },
  {
    elType: "el-input",
    labelText: "导入文件ID",
    model: "fileId",
    placeholder: "请输入文件ID",
  },
  {
    elType: "el-input",
    labelText: "导入文件ID6",
    model: "fileId6",
    placeholder: "请输入文件ID6",
  },
  {
    elType: "el-date-picker",
    labelText: "日期区间",
    model: "seles.create.date",
    type: "daterange",
    "start-placeholder": "开始日期",
    "end-placeholder": "结束日期",
    "value-format": "YYYY-MM-DD",
  },
  {
    collapseTags: true,
    requestConfig: {
      method: "get",
      url: "/system/dict/data/type/sys_yes_no_number",
    },
    elType: "el-select",
    labelText: "是否清洗",
    multiple: true,
    model: "cleanSignList",
    label: "dictLabel",
    placeholder: "请选择是否清洗",
    value: "dictValue",
    noDataText: "暂无数据",
    options: [
      {
        dictLabel: "是",
        dictValue: "1",
      },
      {
        dictLabel: "否",
        dictValue: "0",
      },
    ],
  },
];

const defaultProps = {
  children: 'children',
  label: 'label',
}

const onTableSeach = (data: any) => {
  console.log(data);
};

const onPerfectTableSelect = (data: any[]) => {
  state.selectList = data;
};

const onColumnsBarConfirm = (columns: any[]) => {
  tableRef.value.setColumns(columns);
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
import AccountInfo from "./component/AccountInfo/index.vue";
import AccountCreate from "./component/AccountCreate/index.vue";
import AccountModify from "./component/AccountModify/index.vue";

export default defineComponent({
  name: "AccountManagement",
  components: {
    AccountInfo,
    AccountCreate,
    AccountModify
  }
});
</script>

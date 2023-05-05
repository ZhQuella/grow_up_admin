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
          <el-scrollbar style="height: calc(100% - 43px)">
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
                v-for="item of filterResult"
                :key="item.id"
                class="px-[10px] py-[8px] text-[14px] text-[var(--el-text-color-regular)] cursor-pointer"
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
            <ButtonGroup :button-group="optionGroup" :max="5" show-text />
          </div>
          <div class="pt-[3px]">
            <SearchBar :search="searchList" @search="onTableSeach" />
            <ColumnBar :columns="tableColumns" @confirm="onColumnsBarConfirm" />
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
            <ButtonGroup :button-group="buttonGroup" :max="4" :data="btnOption" />
          </template>
        </PerfectTable>
      </template>
      <template #footer>
        <div class="flex justify-end pt-[10px]">
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

    <el-drawer
      v-model="drawerConfig.visible"
      :title="drawerConfig.title"
      size="400px"
      @close="onDrawerClose"
    >
      <el-scrollbar>
        <component
          :is="drawerConfig.conmponetName"
          :row="drawerConfig.data"
          @close="onDrawerClose"
        />
      </el-scrollbar>
    </el-drawer>
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

const { accountStates } = useDict();

const { 
  searchData, 
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
  tableRef,
  buttonGroup,
  optionGroup,
  dialogConfig,
  drawerConfig,
  onDrawerClose,
  onDialogClose,
  onAccountSuccess,
  onPerfectTableSelect
} = useTableFunc({
  getAccountList
});

const { deptTreeList, deptSearchValue, filterResult, onDeptInput, defaultProps } = useDeptTree();

// ~ 查询条件配置
const searchList = [
  {
    labelText: "账号",
    placeholder: "请输入账号",
    elType: "el-input",
    isDefault: true,
    model: "account"
  },
  {
    labelText: "创建日期",
    elType: "el-date-picker",
    isDefault: true,
    startPlaceholder: "请选择开始日期",
    endPlaceholder: "请结束开始日期",
    type: "daterange",
    model: "createDate",
    valueFormat: "YYYY-DD-MM"
  },
  {
    isDefault: true,
    collapseTags: true,
    requestConfig: {
      method: "get",
      url: "/system/dict/data/type/sys_yes_no_number"
    },
    elType: "el-select",
    labelText: "账号状态",
    multiple: true,
    model: "cleanSignList",
    label: "dictLabel",
    placeholder: "请选择账号状态",
    value: "dictValue",
    noDataText: "暂无数据",
    options: [
      {
        dictLabel: "启用",
        dictValue: "1"
      },
      {
        dictLabel: "停用",
        dictValue: "0"
      }
    ]
  }
];

const onTableSeach = (data: any) => {
  searchData.value = data;
  getAccountList();
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
import AccountResetPassword from "./component/AccountResetPassword/index.vue";
import AccountHistory from "./component/AccountHistory/index.vue";
import AccountUseRecord from "./component/AccountUseRecord/index.vue";

export default defineComponent({
  name: "AccountManagement",
  components: {
    AccountInfo,
    AccountCreate,
    AccountModify,
    AccountResetPassword,
    AccountHistory,
    AccountUseRecord
  }
});
</script>

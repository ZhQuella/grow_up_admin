<template>
  <div class="p-[10px]">
    <PageLayout>
      <template #aside>
        <div class="h-full">
          <div class="p-[5px] border-b-[1px] border-[var(--el-border-color)] border-solid">
            <el-input
              placeholder="请输入部门名称"
              clearable
              v-model="deptSearchValue"
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
                @click="onTreeNodeClick"
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
            <SearchBar :search="searchList" @search="onTableSearch" />
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
          v-model:select="selectList"
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
            @size-change="onSizeChange"
            @current-change="onCurrentChange"
          />
        </div>
      </template>
    </PageLayout>

    <GDialog
      v-model="dialogConfig.visible"
      :title="dialogConfig.title"
      :width="dialogConfig.width"
      @close="onCloseDialog"
    >
      <component
        :is="dialogConfig.conmponetName"
        :data="dialogConfig.data"
        @close="onCloseDialog"
        @success="onRoleSuccess"
      />
    </GDialog>

    <ElDrawer
      v-model="drawerConfig.visible"
      :title="drawerConfig.title"
      :size="drawerConfig.size"
      @close="onCloseDrawer"
    >
      <component
        :is="drawerConfig.conmponetName"
        :data="drawerConfig.data"
        @close="onCloseDrawer"
      />
    </ElDrawer>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import PerfectTable from "components/public/PerfectTable/index.vue";
import ColumnBar from "components/public/ColumnBar/index.vue";
import ButtonGroup from "components/public/ButtonGroup/index.vue";
import SearchBar from "components/public/SearchBar/index.vue";
import PageLayout from "components/public/PageLayout/index.vue";
import { useTable } from "hooks/useTable";
import { useDeptTree } from "hooks/useBusiness/useDeptTree";
import { useDict } from "./use/useDict";
import { useTableOption } from "./use/useTableOption";
import { useTableFunc } from "./use/useTableFunc";
import { RoleItem } from "pages/System/Role/types";

const { roleStates, roleTypes } = useDict();
const { pageSizes, page, size, layout, total } = useTable();
const { deptTreeList, deptSearchValue, filterResult, onDeptInput, defaultProps } = useDeptTree();

const searchList = computed(() => [
  {
    labelText: "角色名称",
    placeholder: "请输入角色名称",
    elType: "el-input",
    isDefault: true,
    model: "roleName",
    noDelete: true
  },
  {
    labelText: "权限标识",
    placeholder: "请输入权限标识",
    elType: "el-input",
    isDefault: true,
    model: "authorityChart",
    noDelete: true
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
    elType: "el-select",
    labelText: "角色状态",
    multiple: true,
    model: "cleanSignList",
    label: "label",
    placeholder: "请选择角色状态",
    value: "code",
    noDataText: "暂无数据",
    options: roleStates
  },
  {
    isDefault: true,
    collapseTags: true,
    elType: "el-select",
    labelText: "角色类型",
    multiple: true,
    model: "roleType",
    label: "label",
    placeholder: "请选择角色类型",
    value: "code",
    noDataText: "暂无数据",
    options: roleTypes
  }
]);

const onShowBoundPersons = (row: RoleItem) => {
  const { roleName } = row;
  dialogConfig.visible = true;
  dialogConfig.title = `${roleName} 绑定人员`;
  dialogConfig.conmponetName = "BoundPersonList";
  dialogConfig.data = row;
  dialogConfig.width = "800px";
};

const { tableColumns, tableList, getRoleList, onTreeNodeClick, searchData } = useTableOption({
  tableTotal: total,
  roleStates,
  size,
  page,
  roleTypes,
  onShowBoundPersons
});

const {
  drawerConfig,
  dialogConfig,
  buttonGroup,
  optionGroup,
  tableRef,
  selectList,
  onCloseDialog,
  onCloseDrawer,
  onSizeChange,
  onCurrentChange,
  onRoleSuccess
} = useTableFunc({
  getRoleList,
  page,
  size
});

const onTableSearch = (data: any) => {
  searchData.value = data;
  getRoleList && getRoleList();
};

const onColumnsBarConfirm = (columns: any[]) => {
  tableRef.value.setColumns(columns);
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
import permissionControl from "components/business/Permission/index.vue";
import BoundPersonList from "./component/BoundPersonList/index.vue";
import InfoRole from "./component/infoRole/index.vue";
import CreateRole from "./component/createRole/index.vue";
import ModifyRole from "./component/modifyRole/index.vue";

export default defineComponent({
  name: "RoleManagement",
  components: {
    BoundPersonList,
    permissionControl,
    CreateRole,
    ModifyRole,
    InfoRole
  }
});
</script>

<template>
  <div class="p-[10px]">
    <PageLayout>
      <template #aside>
        <div class="h-full">
          <div class="p-[5px] border-b-[1px] border-[var(--el-border-color)] border-solid">
            <el-input placeholder="请输入部门名称"
                      clearable
                      v-model="deptSearchValue"
                      @input="onDeptInput"/>
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
            <!-- <SearchBar :search="searchList" @search="onTableSeach" /> -->
            <ColumnBar :columns="tableColumns" @confirm="onColumnsBarConfirm" />
          </div>
        </div>
      </template>

      <template #main="{ height }">
        <PerfectTable ref="tableRef"
                      :height="height"
                      :columns="tableColumns"
                      :data="tableList">
          <template #btnOption="btnOption">
            <ButtonGroup :button-group="buttonGroup" :max="4" :data="btnOption" />
          </template>
        </PerfectTable>
      </template>

      <template #footer>
        <div class="flex justify-end pt-[10px]">
          <el-pagination v-model:current-page="page"
                        v-model:page-size="size"
                        :page-sizes="pageSizes"
                        :layout="layout"
                        :total="total"
                        small
                        @size-change="onSizeChange"
                        @current-change="onCurrentChange"/>
        </div>
      </template>
    </PageLayout>

    <GDialog v-model="dialogConfig.visible"
              :title="dialogConfig.title"
            :width="dialogConfig.width"
            @close="onCloseDialog">
      <component :is="dialogConfig.conmponetName"
                  :data="dialogConfig.data"
                 @close="onCloseDialog"/>
    </GDialog>

    <ElDrawer v-model="drawerConfig.visible"
               :title="drawerConfig.title"
              :size="drawerConfig.size"
              @close="onCloseDrawer">
      <component :is="drawerConfig.conmponetName"
                  :data="drawerConfig.data"
                 @close="onCloseDrawer"/>
    </ElDrawer>

  </div>
</template>

<script setup lang="ts">
import PerfectTable from "components/public/PerfectTable/index.vue";
import ColumnBar from "components/public/ColumnBar/index.vue";
import ButtonGroup from "components/public/ButtonGroup/index.vue";
import { useTable } from "hooks/useTable";
import { useDeptTree } from "hooks/useBusiness/useDeptTree";
import { useDict } from "./use/useDict";
import { useTableOption } from "./use/useTableOption";
import { useTableFunc } from "./use/useTableFunc";
import PageLayout from "components/public/PageLayout/index.vue";

const { roleStates, roleTypes } = useDict();
const { pageSizes, page, size, layout, total } = useTable();
const { deptTreeList, deptSearchValue, filterResult, onDeptInput, defaultProps } = useDeptTree();

const {
  tableColumns,
  tableList,
  getRoleList,
  onTreeNodeClick
} = useTableOption({
  tableTotal: total,
  roleStates,
  size,
  page,
  roleTypes
});

const {
  drawerConfig,
  dialogConfig,
  buttonGroup,
  optionGroup,
  tableRef,
  onCloseDialog,
  onCloseDrawer,
  onSizeChange,
  onCurrentChange
} = useTableFunc({
  getRoleList,
  page,
  size
});


const onColumnsBarConfirm = (columns: any[]) => {
  tableRef.value.setColumns(columns);
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
import permissionControl from "components/business/Permission/index.vue";
import InfoRole from "./component/infoRole/index.vue";
import CreateRole from "./component/createRole/index.vue";
import ModifyRole from "./component/modifyRole/index.vue";

export default defineComponent({
  name: "RoleManagement",
  components: {
    permissionControl,
    CreateRole,
    ModifyRole,
    InfoRole
  }
});
</script>

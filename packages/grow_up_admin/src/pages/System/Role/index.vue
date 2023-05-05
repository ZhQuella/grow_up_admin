<template>
  <div class="p-[10px]">
    <pageLayout>
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
              />
            </div>
            <div v-show="deptSearchValue">
              <div
                v-for="item of filterResult"
                :key="item.id"
                class="px-[10px] py-[8px] text-[14px] text-[var(--el-text-color-regular)] cursor-pointer"
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
            123123
          </div>
          <div class="pt-[3px]">
            123123
          </div>
        </div>
      </template>

      <template #main="{ height }">
        <PerfectTable ref="tableRef"
                      :height="height">
          <template #btnOption="btnOption">
            <ButtonGroup :max="4" :data="btnOption" />
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
                        small/>
        </div>
      </template>
    </pageLayout>
  </div>
</template>

<script setup lang="ts">
import PerfectTable from "components/public/PerfectTable/index.vue";
import { useTable } from "hooks/useTable";
import { useDeptTree } from "hooks/useBusiness/useDeptTree";

const { pageSizes, page, size, layout, total } = useTable();
const { deptTreeList, deptSearchValue, filterResult, onDeptInput, defaultProps } = useDeptTree();

</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "RoleManagement"
});
</script>

<template>
  <div class="p-[10px]">
    <PageLayout>
      <template #header>
        <div class="flex justify-between">
          <div class="pt-[8px]">
            <ButtonGroup :button-group="[]" :max="5" show-text />
          </div>
          <div class="pt-[3px]">
            <SearchBar />
            <ColumnBar />
          </div>
        </div>
      </template>

      <template #main="{ height }">
        <PerfectTable ref="tableRef"
                      :columns="tableColumns"
                      :height="height"
                      :data="tableList"
                      border
                      default-expand-all
                      row-key="name"
                      only-key="name">
          <template #btnOption="btnOption">
            <ButtonGroup :button-group="[]" :max="4" :data="btnOption" />
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

    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import PerfectTable from "components/public/PerfectTable/index.vue";
import ColumnBar from "components/public/ColumnBar/index.vue";
import ButtonGroup from "components/public/ButtonGroup/index.vue";
import SearchBar from "components/public/SearchBar/index.vue";
import PageLayout from "components/public/PageLayout/index.vue";
import { useTable } from "hooks/useTable";
import { useTableOption } from "./use/useTableOption";
import { useDict } from "./use/useDict";

const {  pageSizes, page, size, layout, total } = useTable();

defineOptions({ name: "MenuManagement" });

const {
  menuTypeDicts,
  stateList
} = useDict();

const {
  tableList,
  tableColumns
} = useTableOption({
  page,
  size,
  menuTypeDicts,
  stateList
});




</script>

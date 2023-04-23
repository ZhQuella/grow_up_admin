<template>
  <div class="p-[10px]">
    <pageLayout>
      <template #header>
        <div class="flex justify-between">
          <div />
          <div class="pt-[3px]">
            <SearchBar />
            <ColumnBar :columns="columns" node-key="dataKey" @confirm="onColumnsBarConfirm" />
          </div>
        </div>
      </template>
      <template #main="{ height, width }">
        <IntactTable
          ref="tableRef"
          :height="height"
          :width="width"
          :columns="columns"
          :data="data"
        />
      </template>
      <template #footer>
        <div :span="12" class="flex justify-end pt-[10px]">
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
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onActivated, nextTick } from "vue";
import { useTable } from "hooks/useTable";
import ColumnBar from "components/public/ColumnBar/index.vue";
import SearchBar from "components/public/SearchBar/index.vue";
import IntactTable from "components/public/IntactTable/index.vue";

const tableRef = ref();

interface ScrollParams {
  scrollTop: number;
  scrollLeft: number;
}

const { pageSizes, page, size, layout, total } = useTable();

const generateColumns = (length = 10, prefix = "column-", props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    fixed: false,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex + 1}`,
    width: 300
  }));

const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = "row-") =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
        return rowData;
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null
      }
    );
  });

const columns = generateColumns(20);
const data = generateData(columns, 1000);

const onColumnsBarConfirm = (columns: any[]) => {
  tableRef.value.setColumns(columns);
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ElVirtualList"
});
</script>

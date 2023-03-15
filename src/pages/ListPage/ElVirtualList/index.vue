<template>
  <div class="p-[10px]">
    <pageLayout>
      <template #header>

      </template>
      <template v-slot:main="{ height, width }">
        <el-table-v2 :columns="columns"
                    :data="data"
                    :width="width"
                    :height="height"
                    fixed
                    border/>
      </template>
      <template #footer>
        <div :span="12" class="flex justify-end pt-[10px]">
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
import { useTable } from "hooks/useTable";

const { 
  pageSizes,
  page,
  size,
  layout,
  total
} = useTable();

const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    fixed: !columnIndex,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex + 1}`,
    width: Math.max(parseInt(`${Math.random() * 300}`), 160)
  }))

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = 'row-'
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      }
    )
  })

const columns = generateColumns(20)
const data = generateData(columns, 1000)
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ElVirtualList"
});
</script>
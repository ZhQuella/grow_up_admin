<template>
  <div class="p-[10px]">
    <PageLayout>
      <template #header>
        <div class="flex justify-between">
          <div class="pt-[8px]">
            <ButtonGroup :button-group="optionGroup" :max="5" show-text />
          </div>
          <div class="pt-[3px]">
            <SearchBar />
            <ColumnBar />
          </div>
        </div>
      </template>

      <template>
        <PerfectTable ref="tableRef"></PerfectTable>
      </template>

      <template #footer>
        <div class="flex justify-end pt-[10px]">
          <el-pagination />
        </div>
      </template>




    </PageLayout>
  </div>
</template>

<script setup lang="ts">
  import PerfectTable from "components/public/PerfectTable/index.vue"
  import ColumnBar from "components/public/ColumnBar/index.vue"
  import ButtonGroup from "components/public/ButtonGroup/index.vue"
  import SearchBar from "components/public/SearchBar/index.vue"
  import PageLayout from "components/public/PageLayout/index.vue"
  import { useTable } from "hooks/useTable"
  import { useTableOption } from "./use/useTableOption"
  import { useDict } from "./use/useDict"
  import { useTableFunc } from "./use/useTableFunc"

  const { pageSizes, page, size, layout, total } = useTable()



  defineOptions({ name: "DictManagement" })

  const {
    dictTypeDicts,
    stateList
  } = useDict()

  const {
    tableList,
    tableColumns
  } = useTableOption({
    page,
    size,
    dictTypeDicts,
    stateList
  })

  const {
    dialogCofign,
    buttonGroup,
    optionGroup
  } = useTableFunc()
</script>

<script lang="ts">

  import { defineComponent } from "vue";
  // import createDict from "./components/createDict.vue"

  export default defineComponent({
    name: "DictManagement",
    components: {
      // createDict
    }
  })

</script>
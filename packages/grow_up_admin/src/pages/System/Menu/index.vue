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
                      :height="height">
          <template #btnOption="btnOption">
            <ButtonGroup :button-group="[]" :max="4" :data="btnOption" />
          </template>
        </PerfectTable>
      </template>

      <template #footer>
        <div class="flex justify-end pt-[10px]">
          <el-pagination/>
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

defineOptions({ name: "MenuManagement" });
</script>

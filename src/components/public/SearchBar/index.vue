<template>
  <el-popover width="650px"
              v-model:visible="visible"
              placement="top-end"
              trigger="click">
    <template #reference>
      <el-button :icon="Search" 
                circle></el-button>
    </template>
    <SearchContainer :search="search" 
                        ref="container"/>
    <div class="flex p-[10px] justify-between border-t-[1px] border-[var(--el-border-color)] border-solid">
      <div>
        <slot name="option"></slot>
      </div>
      <div>
        <el-button :icon="DataView"
                    @click="onSyetemDefault">{{ $t("SEARCH_BAR.RESET_SYETEM") }}</el-button>
        <el-button :icon="Reset"
                  @click="onReset">{{ $t("PUBLIC.RESET_TEXT") }}</el-button>
        <el-button :icon="Search" 
                    type="primary"
                    @click="onSearch">{{ $t("PUBLIC.SEARCH_TEXT") }}</el-button>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Search, Reset, DataView } from "@vicons/carbon";
import SearchContainer from "components/public/SearchBar/SearchContainer.vue";
import { formatConversion } from "util/System/index";

const visible = ref(false);
const container = ref();

const emit = defineEmits(['search'])

const onSearch = () => { 
  const searchData = container.value.getSearchData();
  visible.value = false;
  emit("search", formatConversion({...searchData}));
};

const onReset = () => { 
  const searchData = container.value.resetSearch();
  visible.value = false;
  emit("search", formatConversion({...searchData}));
};

const onSyetemDefault = () => { 
  const searchData = container.value.resetDefault();
  visible.value = false;
  emit("search", formatConversion({...searchData}));
};

defineProps({
  search: {
    type: Array,
    default: () => []
  }
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SearchBar"
});
</script>
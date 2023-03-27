<template>
  <div
    class="flex justify-end p-[10px] border-b-[1px] border-[var(--el-border-color)] border-solid"
  >
    <div class="grow-0 shrink-0 h-[30px]">
      <el-button
        link
        :icon="AddComment"
        type="primary"
        class="w-full h-full"
        size="small"
        :disabled="state.currentSelect.length === search.length"
        @click="onAddSearchList"
      >
        {{ $t("SEARCH_BAR.ADD_SEARCH") }}
      </el-button>
    </div>
  </div>
  <el-scrollbar
    height="350px"
    class="overflow-visible"
  >
    <ul
      v-if="state.currentSelect.length"
      class="p-[10px]"
    >
      <li
        v-for="(item, index) of state.currentSelect"
        :key="item.model"
        class="flex pb-[10px]"
      >
        <div class="w-[260px] grow-0 shrink-0 pr-[10px]">
          <el-select
            class="w-full"
            :model-value="item.labelText"
            :disabled="state.notDeleteModels.includes(item.model)"
            filterable
            clearable
            :teleported="false"
            :placeholder="$t('SEARCH_BAR.SEARCH_TYPE_PLACEHOLDER')"
            @change="onSelectListTypeChange($event, index)"
            @clear="onSearchListTypeClear(index)"
          >
            <el-option
              v-for="(searchInfo, i) of selectOptions"
              :key="i"
              :label="searchInfo.labelText"
              :value="searchInfo.model"
              class="block"
            />
          </el-select>
        </div>

        <div class="flex-1">
          <AbstractEle
            v-if="item.elType"
            :search-data="state.searchData"
            :config="item"
          />
        </div>
        <div class="grow-0 shrink-0 w-[30px]">
          <el-button
            :icon="Delete"
            type="danger"
            link
            class="block w-full h-full"
            :disabled="state.notDeleteModels.includes(item.model)"
            @click="onDeleteCurrent(index)"
          />
        </div>
      </li>
    </ul>
    <div
      v-else
      class="h-full w-full"
    >
      <el-empty
        :image-size="200"
        :description="$t('PUBLIC.NOT_DATA_TEXT')"
      />
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { toRefs, computed, reactive, watch } from "vue";
import { Delete, AddComment } from "@vicons/carbon";
import AbstractEle from "components/public/AbstractEle/index.vue";

const props = defineProps({
  search: {
    type: Array,
    default: () => [],
  },
  defaultData: {
    type: Object,
    default: () => ({}),
  },
});
const { search, defaultData } = toRefs(props);

const state = reactive({
  currentSelect: [],
  searchData: {},
  notDeleteModels: [],
});

watch(
  () => defaultData.value,
  (newValue: any) => {
    state.searchData = JSON.parse(
      JSON.stringify({ ...newValue, ...state.searchData })
    );
  },
  {
    deep: true,
    immediate: true,
  }
);

watch(
  (): any[] => search.value,
  (newValue: any[]) => {
    state.notDeleteModels = [];
    state.currentSelect = [];
    newValue.forEach((el) => {
      el.isDefault && el.noDelete && state.notDeleteModels.push(el.model);
      el.isDefault && state.currentSelect.push(el);
    });
  },
  {
    immediate: true,
  }
);

const modelLists = computed(() => {
  const { currentSelect } = state;
  return currentSelect.map((el) => el.model).filter((el) => el);
});

const selectOptions = computed((): any => {
  return [...search.value].filter((el: any) => {
    return !modelLists.value.includes(el.model);
  });
});

const onSelectListTypeChange = (value: any, index: number) => {
  const filterSearchList = selectOptions.value;
  const item: any = filterSearchList.find((el: any) => el.model === value);
  if (item) {
    onSearchListTypeClear(index, false);
    state.currentSelect.splice(index, 1, item);
  }
};

const onSearchListTypeClear = (index: number, isReset = true) => {
  const current = state.currentSelect[index];
  Reflect.set(state.searchData, current.model, null);
  isReset && state.currentSelect.splice(index, 1, {});
};

const onDeleteCurrent = (index: number) => {
  const current = state.currentSelect[index];
  Reflect.set(state.searchData, current.model, null);
  state.currentSelect.splice(index, 1);
};

const onAddSearchList = () => {
  state.currentSelect.push({});
};

const getSearchData = () => {
  return state.searchData;
};

const resetSearch = () => {
  state.searchData = { ...defaultData.value };
  return state.searchData;
};

const resetDefault = () => {
  state.currentSelect = [];
  state.notDeleteModels = [];
  search.value.forEach((el: any) => {
    el.isDefault && el.noDelete && state.notDeleteModels.push(el.model);
    el.isDefault && state.currentSelect.push(el);
  });
  state.searchData = { ...defaultData.value };
  return state.searchData;
};

defineExpose({
  getSearchData,
  resetSearch,
  resetDefault,
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SearchContainer",
});
</script>

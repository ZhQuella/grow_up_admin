<template>
  <el-input
    v-model="searchValue"
    type="text"
    size="large"
    :placeholder="$t('APP_SEARCH.SEARCH_PLACEHOLDER')"
    class="enter-y"
  >
    <template #prefix>
      <n-icon :component="SearchOutlined" />
    </template>
  </el-input>
  <SearchContainer class="enter-y mt-[14px]" :search-value="searchValue" @select="onSelect" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SearchOutlined } from "@vicons/antd";
import SearchContainer from "./SearchContainer.vue";

const searchValue = ref("");
const emit = defineEmits(["select"]);

const onSelect = () => {
  emit("select");
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppSearch"
});
</script>

<template>
  <div class="p-[20px]">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in historyList" 
        :key="index" 
        :timestamp="item.date" 
        placement="top"
      >
        <HistoryItem :config="item" />
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
import HistoryItem from "./HistoryItem.vue";
import { useInit } from "./use/useInit";

const emit = defineEmits(["close"]);

const porps = defineProps({
  row: {
    type: Object,
    default: () => ({})
  }
});

const {
  historyList
} = useInit({
  id: porps.row.id,
  emit
});

</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AccountHistory",
});
</script>

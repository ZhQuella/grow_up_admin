<template>
  <div class="p-[20px]">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in usedRecordList" 
        :key="index" 
        :timestamp="item.date" 
        placement="top"
      >
        <RecordItem :config="item" />
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
import RecordItem from "./RecordItem.vue";
import { useInit } from "./use/useInit";

const emit = defineEmits(["close"]);

const porps = defineProps({
  row: {
    type: Object,
    default: () => ({})
  }
});

const {
  usedRecordList
} = useInit({
  id: porps.row.id,
  emit
});

</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AccountUseRecord",
});
</script>

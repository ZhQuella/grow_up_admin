<template>
  <div>
    Child{{ id }}
    <el-input v-model="value" />
    <el-button @click="onBtnClick">click Me</el-button>
    <div v-if="visible">显示么？</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTabs } from "hooks/usetabs";
import { useRoute } from "vue-router";

const value = ref("");
const route = useRoute();

const visible = ref(false);

const id = computed(() => {
  return route.params.id;
});

const { setTab } = useTabs();

setTab(`详情页-${id.value}`);

const onBtnClick = () => {
  visible.value = !visible.value;
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Child1Page"
});
</script>

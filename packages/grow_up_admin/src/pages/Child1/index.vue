<template>
  <div>
    Child{{ id }}
    <el-input v-model="value" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTabs } from "hooks/usetabs";
import { useRoute } from "vue-router";

const value = ref("");
const route = useRoute();

const id = computed(() => {
  return route.params.id;
});

const { setTab } = useTabs();

setTab(`详情页-${id.value}`);
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Child1Page"
});
</script>

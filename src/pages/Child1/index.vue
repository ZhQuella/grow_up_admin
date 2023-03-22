<template>
  <div>
    Child1
    <el-input v-model="value" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTabs } from "hooks/usetabs";

const value = ref("");

const { setTab } = useTabs();

setTab(`child-${parseInt((Math.random() * 10).toString())}`);
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Child1Page",
});
</script>

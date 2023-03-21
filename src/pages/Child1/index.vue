<template>
  <div>
    Child1
    <el-input />
  </div>
</template>

<script setup lang="ts">
import { useTabs } from "hooks/usetabs";

const { setTab } = useTabs();

setTab(`child-${parseInt((Math.random() * 10).toString())}`);
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Child1Page",
});
</script>

<template>
  <ul>
    <li v-for="(item) of 20"
        :key="item"
        class="py-[5px]">
      <el-link>操作{{ item }}</el-link>
    </li>
  </ul>
</template>

<script setup lang="ts">

</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "QuickNav"
});
</script>

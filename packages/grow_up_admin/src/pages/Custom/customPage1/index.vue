<template>
  <div>
    customPage1
    <el-input v-model="val" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const val = ref("");
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CustomPage1"
});
</script>

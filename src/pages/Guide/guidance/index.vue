<template>
  <div>
    guidance
    <el-button @click="onOpenPage(1)">
      open page1
    </el-button>
    <el-button @click="onOpenPage(2)">
      open page2
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const onOpenPage = (id: number) => {
  router.push({
    name: "Child",
    params: {
      id,
    },
  });
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GuidancePage",
});
</script>

<template>
  <router-view class="grow shrink-0 h-full overflow-hidden">
    <template #default="{ Component, route }">
      <keep-alive :include="cachedViews">
        <component
          :is="Component"
          :key="route.fullPath"
          class="enter-y"
        />
      </keep-alive>
    </template>
  </router-view>
</template>

<script setup lang="ts">
import { useCatch } from "./use/useCatch";

const { cachedViews } = useCatch();
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "RenderView",
});
</script>

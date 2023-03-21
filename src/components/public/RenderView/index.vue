<template>
  <router-view
    v-slot="{ Component }"
    class="grow shrink-0 h-full overflow-hidden"
  >
    <keep-alive :include="cachedViews">
      <component
        :is="Component"
        :key="fullPath"
        class="enter-y"
      />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useCatch } from "./use/useCatch";

const route = useRoute();

const fullPath = computed(() => {
  return route.fullPath;
});

const { cachedViews } = useCatch();
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "RenderView",
});
</script>

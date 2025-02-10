<template>
  <router-view class="grow shrink-0 overflow-hidden">
    <template #default="{ Component, route }">
      <keep-alive :include="cachedViews">
        <component
          :is="Component"
          :key="route.fullPath"
          class="enter-y"
          :class="{
            'h-full': !route.meta.iframeSrc
          }"
        />
      </keep-alive>
    </template>
  </router-view>
  <RenderIframe class="h-full" />
</template>

<script setup lang="ts">
import { useCatch } from "./use/useCatch";

const { cachedViews } = useCatch();
</script>

<script lang="ts">
import { defineComponent } from "vue";
import RenderIframe from "pages/EmbedPage/RenderIframe.vue";
export default defineComponent({
  name: "RenderView",
  components: {
    RenderIframe
  }
});
</script>

<template>
  <div></div>
<!--  <div v-loading="loading" class="h-full">-->
<!--    <iframe ref="iframeRef" :src="iframeSrc" class="w-full h-full" @load="onIframeLoad" />-->
<!--  </div>-->
</template>

<script setup lang="ts">
// import type { ComputedRef, Ref } from "vue";
// import { computed, ref, onMounted } from "vue";
// import { useRoute } from "vue-router";
//
// const route = useRoute();
// const iframeRef: Ref<HTMLElement> = ref();
// const loading = ref(true);
//
// const iframeSrc: ComputedRef<string> = computed(() => {
//   return route.meta?.iframeSrc as string;
// });
//
// const onIframeLoad = () => {
//   loading.value = false;
// };
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "EmbedPage"
});
</script>

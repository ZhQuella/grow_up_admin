<template>
  <iframe :src="src" :loading="loading" @load="onIframeLoad"></iframe>
</template>

<script lang="ts" setup>
import { toRefs, ref } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true
  }
});
const { src } = toRefs(props);
const loading = ref(true);

const onIframeLoad = () => {
  loading.value = false;
};
</script>

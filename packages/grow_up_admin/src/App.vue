<template>
  <h3 class="-enter-x pt-[110px] bc">{{ a }}</h3>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    const a = ref("Aaron11");

    return {
      a
    };
  }
});
</script>

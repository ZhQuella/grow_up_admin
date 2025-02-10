<template>
  <GCodemirror ref="codemirrorRef" />
</template>

<script setup>
defineOptions({ name: "OnlineEditor" });
import { GCodemirror } from "@grow-rock/grow-editor";
import { ref, onMounted } from "vue";
const codemirrorRef = ref(null);

onMounted(() => {
  codemirrorRef.value.setDoc(
    `//  这里是注释\n/*这里也是注释*/\nvar a = 1;\nvar b = 2;\nvar c = 3;\nvar d = c - b - a;`
  );
});
</script>

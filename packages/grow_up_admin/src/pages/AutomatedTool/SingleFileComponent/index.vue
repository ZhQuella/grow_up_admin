<template>
  <div>
    <GSingleComponent ref="singleFileRef" />
  </div>
</template>

<script setup>

defineOptions({ name: "SingleFileComponent" });
import { GSingleComponent } from "grow_single_file_component";
import { ref, onMounted } from "vue";
import { useCodeOption } from "./use/useCodeOption";

const { options } = useCodeOption();

const singleFileRef = ref();

onMounted(() => {
  singleFileRef.value.setCode(options);
});
</script>

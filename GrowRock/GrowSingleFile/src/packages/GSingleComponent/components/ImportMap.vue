<template>
  <div class="flex flex-col h-full">
    <ElScrollbar class="h-full">
      <GCodemirror defaultModel="json" isPure ref="importCodeRef" @change="onImportMapChange" />
    </ElScrollbar>
    <div class="flex justify-center grow-0 shrink-0 h-[40px]">
      <ElButton type="primary" @click="onSubmit">确定</ElButton>
      <ElButton @click="emits('close')">取消</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "ImportMap" });
import { GCodemirror } from "@grow-rock/grow-editor";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

const emits = defineEmits(["close", "submit"]);

const defaultImport = ref("{\n\n}");
const importCodeRef = ref();

const onImportMapChange = async ({ doc }) => {
  defaultImport.value = doc;
};

const setCode = (code) => {
  if (!code) return;
  const codeValue = JSON.stringify(code, null, 2);
  importCodeRef.value.setDoc(JSON.stringify(code, null, 2));
  defaultImport.value = codeValue;
};

const onSubmit = () => {
  try {
    const data = JSON.parse(defaultImport.value);
    emits("submit", data);
  } catch {
    ElMessage({
      type: "error",
      message: "导入内容格式错误"
    });
  }
};

onMounted(() => {
  importCodeRef.value.setDoc(defaultImport.value);
});

defineExpose({
  setCode
});
</script>

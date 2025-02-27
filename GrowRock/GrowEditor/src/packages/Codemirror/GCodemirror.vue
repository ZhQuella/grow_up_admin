<template>
  <div class="flex flex-col h-full">
    <div class="grow-0 shrink-0 h-[40px] bg-BG_COLOR2 flex justify-between" v-if="!isPure">
      <div class="p-[4px] pl-[10px]">
        <ElTooltip effect="dark" content="清空" placement="top">
          <ElButton type="primary" text @click="onCleanEditor">
            <ElIcon size="16">
              <Clean />
            </ElIcon>
          </ElButton>
        </ElTooltip>
      </div>
      <div class="p-[4px] pr-[10px] w-[200px]">
        <ElSelect v-model="editorValue" @change="onModelChange" v-if="isSelectMode && !isPure">
          <ElOption
            v-for="item of selectMap"
            value-key="value"
            :key="item.value"
            :label="item.label"
            :value="item"
          ></ElOption>
        </ElSelect>
      </div>
    </div>
    <ElScrollbar class="h-full w-full">
      <div ref="codeEditor"></div>
    </ElScrollbar>
  </div>
</template>

<script setup>
defineOptions({ name: "GCodemirror" });
import { ElScrollbar, ElSelect, ElOption, ElTooltip, ElButton, ElIcon } from "element-plus";
import { Clean } from "@vicons/carbon";
import { ref, onMounted, toRefs } from "vue";

import { selectMap } from "../../static/dict";
import { initEditor } from "./use/initEditor";
import { useEvent } from "./use/useEvent";

const emit = defineEmits(["change", "lang-change", "save"]);

const props = defineProps({
  isSelectMode: { type: Boolean, default: true },
  defaultModel: { type: String, default: "javascript" },
  isReadOnly: { type: Boolean, default: false },
  isPure: { type: Boolean, default: false }
});

const { defaultModel, isSelectMode, isReadOnly } = toRefs(props);

const editorValue = ref(selectMap[0]);
const codeEditor = ref();

const { resetEditor, editorView } = initEditor({
  emit,
  isReadOnly
});

const { onModelChange, onCleanEditor, toJSON, setDoc } = useEvent({
  editorView,
  codeEditor,
  resetEditor,
  editorValue,
  emit
});

onMounted(() => {
  if (isSelectMode.value) {
    editorValue.value = selectMap.find((el) => el.value === defaultModel.value) || selectMap[0];
  }
  resetEditor(codeEditor.value, editorValue.value.method);
});

defineExpose({
  toJSON,
  setDoc
});
</script>

<template>
  <el-dialog
    ref="gDialog"
    :model-value="visible"
    :show-close="false"
    append-to-body
    v-bind="$attrs"
    destroy-on-close
    :fullscreen="isFullscreen"
    :draggable="!isFullscreen"
    @open="onDialogOpen"
    @close="onDialogClose"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="flex justify-between">
        <h4 :id="titleId" class="text-[14px]" :class="titleClass">
          {{ title }}
        </h4>
        <div>
          <el-button link @click="onFullscreenChange">
            <el-icon class="el-icon--left">
              <component :is="fullscreenIconName" />
            </el-icon>
          </el-button>
          <el-button link class="ml-[10px]" @click="close">
            <el-icon class="el-icon--left">
              <Close />
            </el-icon>
          </el-button>
        </div>
      </div>
    </template>
    <slot />
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch, toRefs } from "vue";

const emit = defineEmits(["update:modelValue", "open", "close"]);
const isFullscreen = ref(false);
const gDialog = ref();


const props = defineProps<{
  modelValue: boolean;
  destroyOnClose: boolean;
  title: string;
}>();

const { modelValue, title } = toRefs(props);
const visible = ref(false);

watch(() => modelValue.value, (newValue) => {
  visible.value = newValue;
},{
  immediate: true
});

const onDialogOpen = () => {
  visible.value = true;
  emit("update:modelValue", visible.value);
  emit("open");
};

const onDialogClose = () => {
  visible.value = false;
  emit("update:modelValue", false);
  emit("close");
};

const fullscreenIconName = computed(() => {
  return isFullscreen.value ? "FullscreenExitOutlined" : "FullscreenOutlined";
});

const onFullscreenChange = () => {
  isFullscreen.value = !isFullscreen.value;
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
import { FullscreenExitOutlined, FullscreenOutlined } from "@vicons/antd";
import { Close } from "@vicons/carbon";

export default defineComponent({
  name: "GDialog",
  components: {
    FullscreenExitOutlined, 
    FullscreenOutlined,
    Close
  }
});
</script>

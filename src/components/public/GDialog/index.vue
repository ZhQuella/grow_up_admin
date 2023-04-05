<template>
  <el-dialog
    ref="gDialog" 
    :model-value="modelValue"
    :show-close="false"
    append-to-body
    :style="dialogStyles"
    v-bind="$attrs"
    destroy-on-close
    @open="onDialogOpen"
    @close="onDialogClose"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="flex justify-between">
        <h4
          :id="titleId"
          class="text-[14px]"
          :class="titleClass"
        >
          {{ title }}
        </h4>
        <div>
          <el-button
            link
            @click="onFullscreenChange"
          >
            <el-icon class="el-icon--left">
              <component :is="fullscreenIconName" />
            </el-icon>
          </el-button>
          <el-button
            link
            class="ml-[10px]"
            @click="close"
          >
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
import { toRefs, computed, ref } from "vue";

const emit = defineEmits(['update:modelValue','open','close']);
const isFullscreen = ref(false);
const gDialog = ref();

const porps = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  destroyOnClose: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ""
  }
});
const { modelValue } = toRefs(porps);

const onDialogOpen = () => { 
  emit("update:modelValue", true);
  emit('open');
};

const onDialogClose = () => {
  emit("update:modelValue", false);
  emit('close');
};

const fullscreenIconName = computed(() => {
  return isFullscreen.value ? "FullscreenExitOutlined" : "FullscreenOutlined";
});

const dialogStyles = computed(() => {
  if (!isFullscreen.value) return {};
  return {
    position: "fixed",
    margin: "0px",
    height: "100%",
    width: "100%"
  }
});

const onFullscreenChange = () => { 
  isFullscreen.value = !isFullscreen.value;
  console.log(gDialog.value.$el);
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GDialog",
});
</script>
<template>
  <div
    class="w-[70px] h-[70px] p-[2px] rounded-[4px] overflow-hidden cursor-pointer border-2 border-solid"
    :class="[
      {
        'border-sky-600': layoutType === 'roof',
        'border-gray-300': layoutType !== 'roof'
      }
    ]"
    @click="onSelectLayoutType('roof')"
  >
    <div class="h-[15px] mb-[2px] bg-sky-800" />
    <div class="h-[10px] mb-[2px] bg-zinc-600" />
    <div class="h-[33px] bg-zinc-300" />
  </div>
  <div
    class="w-[70px] h-[70px] p-[2px] mx-[15px] flex rounded-[4px] cursor-pointer overflow-hidden border-2 border-solid"
    :class="[
      {
        'border-sky-600': layoutType === 'side',
        'border-gray-300': layoutType !== 'side'
      }
    ]"
    @click="onSelectLayoutType('side')"
  >
    <div class="w-[20px] h-[62px] bg-sky-800" />
    <div class="w-[40px] ml-[2px]">
      <div class="h-[10px] mb-[2px] bg-zinc-600" />
      <div class="h-[49px] bg-zinc-300" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LayoutTypes } from "types/layout";
import { computed } from "vue";
import { useLayoutStore } from "store/modules/layout";
import { useMenuStore } from "store/modules/menu";
import { useAppStore } from "store/modules/app";

const emit = defineEmits(["select"]);

const menuStore = useMenuStore();
const appStore = useAppStore();

const layoutStore = useLayoutStore();

const layoutType = computed(() => {
  return layoutStore.getLayoutType;
});

const onSelectLayoutType = (type: LayoutTypes) => {
  layoutStore.setLayout(type);
  menuStore.setCollapsed(false);
  appStore.setIsPutAway(true);
  emit("select");
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LayoutSelect"
});
</script>

<template>
  <div class="bg-BG_COLOR3 h-full rounded-[4px] overflow-hidden">
    <el-container class="h-full">
      <el-aside class="border-r-[1px] border-BORDER_COLOR2 border-solid" :width="asideWidth" v-if="$slots.aside">
        <slot name="aside"></slot>
      </el-aside>
      <el-container>
        <el-header v-if="$slots.header" class="px-[10px] border-b-[1px] border-BORDER_COLOR2 border-solid" height="40px">
          <slot name="header"></slot>
        </el-header>
        <el-main v-if="$slots.main" class="p-[0px]" ref="mainRef">
          <slot name="main" :height="mainHeight" :width="mainWidth"></slot>
        </el-main>
        <el-footer v-if="$slots.footer" class="px-[10px]" height="40px">
          <slot name="footer"></slot>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { ref, onMounted, onUnmounted } from "vue";
import { addEventResize, removeResizeListener } from "util/ElementResize";

const mainRef:Ref = ref();
const mainHeight = ref(0);
const mainWidth = ref(0);

const resizeFn = (evnet: any) => { 
  mainHeight.value = mainRef.value?.$el?.offsetHeight || 0;
  mainWidth.value = mainRef.value?.$el?.offsetWidth || 0;
};

onMounted(() => {
  if (mainRef.value) { 
    addEventResize(mainRef.value.$el, resizeFn);
  }
});

defineProps({
  isAside: {
    type: Boolean,
    default: false
  },
  asideWidth: {
    type: String,
    default: "240px"
  }
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "PageLayout"
});
</script>

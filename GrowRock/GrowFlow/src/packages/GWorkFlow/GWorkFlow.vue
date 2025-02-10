<template>
  <div class="flex relative">
    <div
      class="grow-0 shrink-0 w-[50px] bg-BG_COLOR3 box-border p-[5px] border-r-[1px] border-BORDER_COLOR2 border-solid"
    >
      <el-tooltip class="box-item" effect="dark" content="流程组件" placement="right">
        <div
          class="text-center leading-[40px] mb-[5px] cursor-pointer hover:text-PUBLIC_MAIN_COLOR transition duration-150"
          :class="[
            {
              'text-PUBLIC_MAIN_COLOR': true
            }
          ]"
        >
          <el-icon :size="18">
            <Carbon3DMprToggle />
          </el-icon>
        </div>
      </el-tooltip>
    </div>
    <div
      class="h-full w-[190px] left-[50px] top-[0px] bg-BG_COLOR3 flex flex-col z-10 grow-0 shrink-0"
    >
      <StencilComponent ref="stencilRef" />
    </div>
    <div class="flex flex-col flex-1 bg-BG_COLOR2">
      <div
        class="flex grow-0 shrink-0 h-[40px] bg-BG_COLOR3 ox-border p-[8px] border-r-[1px] border-BORDER_COLOR2 border-solid"
      >
        <el-tooltip effect="dark" content="保存" placement="top">
          <el-button type="success" text size="small">
            <el-icon size="18px">
              <Save />
            </el-icon>
          </el-button>
        </el-tooltip>
        <el-divider direction="vertical" class="h-full" />
        <el-tooltip effect="dark" content="居中" placement="top">
          <el-button type="primary" text size="small" @click="onHandleCenter">
            <el-icon size="18px">
              <CenterToFit />
            </el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="清空" placement="top">
          <el-button type="primary" text size="small" @click="onHandleClean">
            <el-icon size="18px">
              <TextClearFormat />
            </el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="上一步" placement="top">
          <el-button type="primary" text size="small" @click="onHandleUndo">
            <el-icon size="18px">
              <PageFirst />
            </el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="重做" placement="top">
          <el-button type="primary" text size="small" @click="onHandleRedo">
            <el-icon size="18px">
              <PageLast />
            </el-icon>
          </el-button>
        </el-tooltip>
        <el-divider direction="vertical" class="h-full" />
        <el-tooltip effect="dark" content="保存图片" placement="top">
          <el-button type="warning" text size="small" @click="onHandleSaveImage">
            <el-icon size="18px">
              <SaveAnnotation />
            </el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="查看Json" placement="top">
          <el-button type="warning" text size="small">
            <el-icon size="18px">
              <Code />
            </el-icon>
          </el-button>
        </el-tooltip>
      </div>
      <div class="flex-1" ref="graphContainer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "GWorkFlow" });
import type { Fn } from "types/public";
import StencilComponent from "./components/StencilComponent/index.vue";
import { ref, onMounted, unref, computed } from "vue";
import {
  Carbon3DMprToggle,
  Save,
  CenterToFit,
  TextClearFormat,
  PageFirst,
  PageLast,
  SaveAnnotation,
  Code
} from "@vicons/carbon";
import { initCanvas } from "./use/InitCanvas";
import { useEvent } from "./use/useEvent";
const graphContainer = ref<HTMLDivElement>();
const stencilRef = ref(null);

const { initGraph, graph, Graph, initEvents, initPlugins } = initCanvas();

const graphExample = computed(() => {
  return graph.value;
});

const { onHandleCenter, onHandleClean, onHandleUndo, onHandleRedo, onHandleSaveImage } = useEvent({
  graphExample
});

onMounted(() => {
  initGraph(graphContainer.value as HTMLDivElement);
  initPlugins();
  if (stencilRef.value) {
    const oGraph = unref(graph);
    stencilRef.value!.createStencil(oGraph) as Fn;
    stencilRef.value!.initNode(Graph) as Fn;
    stencilRef.value!.createNodes(oGraph) as Fn;
  }
  initEvents(graphContainer.value as HTMLDivElement);
});

defineExpose({
  graphExample
});
</script>
<style lang="scss">
@keyframes running-line {
  to {
    stroke-dashoffset: -1000;
  }
}
</style>

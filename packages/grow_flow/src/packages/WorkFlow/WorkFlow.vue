<template>
  <div class="flex relative">
    <div class="grow-0 shrink-0 w-[50px] bg-BG_COLOR3 box-border p-[5px] border-r-[1px] border-BORDER_COLOR2 border-solid">
      <el-tooltip class="box-item"
                  effect="dark"
                  content="流程组件"
                  placement="right">
        <div class="text-center leading-[40px] mb-[5px] cursor-pointer hover:text-PUBLIC_MAIN_COLOR transition duration-150"
             :class="[
                {
                  'text-PUBLIC_MAIN_COLOR': true
                }
              ]">
          <el-icon :size="18">
            <Carbon3DMprToggle />
          </el-icon>
        </div>
      </el-tooltip>
    </div>
    <div class="h-full w-[190px] left-[50px] top-[0px] bg-BG_COLOR3 flex flex-col z-10 grow-0 shrink-0">
      <StencilComponent ref="stencilRef"/>
    </div>
    <div class="flex flex-col flex-1 bg-BG_COLOR2">
      <div class="grow-0 shrink-0 h-[50px] bg-BG_COLOR3 ox-border p-[5px] border-r-[1px] border-BORDER_COLOR2 border-solid">
        工具栏
      </div>
      <div class="flex-1" ref="graphContainer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StencilComponent from "./components/StencilComponent/index.vue";
defineOptions({ name: "WorkFlow" });
import { ref, onMounted, unref } from "vue";
import { Carbon3DMprToggle } from "@vicons/carbon";
import { initCanvas } from "./use/InitCanvas";
import { Fn } from "types/public";

const graphContainer = ref<HTMLDivElement>();
const stencilRef = ref(null);

const {
  initGraph,
  graph,
  Graph,
  initEvents,
  initPlugins
} = initCanvas({

});

onMounted(() => {
  initGraph(graphContainer.value as HTMLDivElement);
  initPlugins();
  if(stencilRef.value){
    const oGraph = unref(graph);
    stencilRef.value!.createStencil(oGraph) as Fn;
    stencilRef.value!.initNode(Graph) as Fn;
    stencilRef.value!.createNodes(oGraph) as Fn;
  };
  initEvents(graphContainer.value as HTMLDivElement);
});
</script>
<style lang="scss">
@keyframes running-line {
  to {
    stroke-dashoffset: -1000;
  }
}
</style>

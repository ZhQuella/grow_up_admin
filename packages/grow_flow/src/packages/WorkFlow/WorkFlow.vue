<template>
  <div class="flex relative">
    <div class="grow-0 shrink-0 w-[50px] bg-BG_COLOR3 box-border p-[5px] border-r-[1px] border-BORDER_COLOR2 border-solid">
      <el-tooltip class="box-item"
                  effect="dark"
                  content="组件库"
                  placement="right">
        <div class="text-center leading-[40px] mb-[5px] cursor-pointer hover:text-PUBLIC_MAIN_COLOR transition duration-150"
             :class="[
                {
                  'text-PUBLIC_MAIN_COLOR': false
                }
              ]">
          <el-icon :size="18">
            <Carbon3DMprToggle />
          </el-icon>
        </div>
      </el-tooltip>
    </div>
    <div class="h-full w-[300px] left-[50px] top-[0px] bg-BG_COLOR3 flex flex-col z-10 grow-0 shrink-0">
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
  Graph
} = initCanvas({

});

onMounted(() => {
  initGraph(graphContainer.value as HTMLDivElement);
  if(stencilRef.value){
    const oGraph = unref(graph);
    stencilRef.value!.initPlugins(oGraph) as Fn;
    stencilRef.value!.createStencil(oGraph) as Fn;
    stencilRef.value!.initNode(Graph) as Fn;
    stencilRef.value!.createNodes(oGraph) as Fn;
  }

  // #region 快捷键与事件
  graph.value.bindKey(['meta+c', 'ctrl+c'], () => {
    const cells = graph.value.getSelectedCells()
    if (cells.length) {
      graph.value.copy(cells)
    }
    return false
  })
  graph.value.bindKey(['meta+x', 'ctrl+x'], () => {
    const cells = graph.value.getSelectedCells()
    if (cells.length) {
      graph.value.cut(cells)
    }
    return false
  })
  graph.value.bindKey(['meta+v', 'ctrl+v'], () => {
    if (!graph.value.isClipboardEmpty()) {
      const cells = graph.value.paste({ offset: 32 })
      graph.value.cleanSelection()
      graph.value.select(cells)
    }
    return false
  })

// undo redo
  graph.value.bindKey(['meta+z', 'ctrl+z'], () => {
    if (graph.value.canUndo()) {
      graph.value.undo()
    }
    return false
  })
  graph.value.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
    if (graph.value.canRedo()) {
      graph.value.redo()
    }
    return false
  })

// select all
  graph.value.bindKey(['meta+a', 'ctrl+a'], () => {
    const nodes = graph.value.getNodes()
    if (nodes) {
      graph.value.select(nodes)
    }
  })

// delete
  graph.value.bindKey('backspace', () => {
    const cells = graph.value.getSelectedCells()
    if (cells.length) {
      graph.value.removeCells(cells)
    }
  })

// zoom
  graph.value.bindKey(['ctrl+1', 'meta+1'], () => {
    const zoom = graph.value.zoom()
    if (zoom < 1.5) {
      graph.value.zoom(0.1)
    }
  })
  graph.value.bindKey(['ctrl+2', 'meta+2'], () => {
    const zoom = graph.value.zoom()
    if (zoom > 0.5) {
      graph.value.zoom(-0.1)
    }
  })

// 控制连接桩显示/隐藏
  const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
    for (let i = 0, len = ports.length; i < len; i += 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }
  graph.value.on('node:mouseenter', () => {
    const ports = graphContainer.value!.querySelectorAll(
        '.x6-port-body',
    ) as NodeListOf<SVGElement>
    showPorts(ports, true)
  })
  graph.value.on('node:mouseleave', () => {
    const ports = graphContainer.value!.querySelectorAll(
        '.x6-port-body',
    ) as NodeListOf<SVGElement>
    showPorts(ports, false)
  })

});
</script>

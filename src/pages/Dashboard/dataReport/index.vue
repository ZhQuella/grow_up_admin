<template>
  <el-scrollbar class="h-full">
    <GridLayout v-model:layout="layout"
                :col-num="24"
                :row-height="30"
                :is-draggable="draggable"
                :is-resizable="resizable"
                :vertical-compact="true"
                :use-css-transforms="true">
        <GridItem v-for="item in layout"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :i="item.i"
                :key="item.i">
        <el-card class="h-full">
          <template #header>
            <span>{{ item.title }}</span>
          </template>
          <component :is="item.componentName" :height="`${item.h * 30}px`"/>
        </el-card>
      </GridItem>
    </GridLayout>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { GridLayout, GridItem } from "vue3-grid-layout";
import { ref } from "vue";

const draggable = ref(true);
const resizable = ref(true);

const layout = [
  { "x": 0, "y": 0, "w": 24, "h": 11, "i": 0, componentName: "GradientStackedArea", title: "渐变堆叠面积图" },
  { "x": 0, "y": 11, "w": 8, "h": 10, "i": 1, componentName: "MixedLineAndBar", title: "折柱混合" },
  { "x": 8, "y": 11, "w": 8, "h": 10, "i": 2, componentName: "EffectScatter", title: "涟漪特效散点图" },
  { "x": 16, "y": 11, "w": 8, "h": 10, "i": 3, componentName: "HalfDoughnut", title: "半环形图" },
  { "x": 0, "y": 20, "w": 24, "h": 12, "i": 4, componentName: "ThemeRiver", title: "主题河流图" }
];
</script>

<script lang="ts">
import GradientStackedArea from "components/business/Dashboard/dataReport/GradientStackedArea/index.vue";
import MixedLineAndBar from "components/business/Dashboard/dataReport/MixedLineAndBar/index.vue";
import EffectScatter from "components/business/Dashboard/dataReport/EffectScatter/index.vue";
import HalfDoughnut from "components/business/Dashboard/dataReport/HalfDoughnut/index.vue";
import ThemeRiver from "components/business/Dashboard/dataReport/ThemeRiver/index.vue";

import { defineComponent } from "vue";
export default defineComponent({
  name: "dataReport",
  components: {
    GradientStackedArea,
    MixedLineAndBar,
    EffectScatter,
    HalfDoughnut,
    ThemeRiver
  }
});
</script>


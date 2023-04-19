<template>
  <el-scrollbar class="h-full">
    <el-row
      :gutter="10"
      class="p-[10px] w-full"
    >
      <el-col
        :span="24"
        class="enter-y"
      >
        <el-card>
          <template #header>
            <span>流量趋势</span>
          </template>
          <visitAnalysis />
        </el-card>
      </el-col>
      <el-col
        :span="24"
        class="mt-[10px] enter-y"
      >
        <el-card>
          <template #header>
            <span>访问量</span>
          </template>
          <visitAnalysisBar />
        </el-card>
      </el-col>
      <el-col
        :span="8"
        class="mt-[10px] enter-y"
      >
        <el-card>
          <template #header>
            <span>转化率</span>
          </template>
          <visitRadar />
        </el-card>
      </el-col>
      <el-col
        :span="8"
        class="mt-[10px] enter-y"
      >
        <el-card>
          <template #header>
            <span>访问来源</span>
          </template>
          <visitSource />
        </el-card>
      </el-col>
      <el-col
        :span="8"
        class="mt-[10px] enter-y"
      >
        <el-card>
          <template #header>
            <span>成交占比</span>
          </template>
          <salesProductPie />
        </el-card>
      </el-col>
    </el-row>
  </el-scrollbar>
</template>

<script setup lang="ts">
import visitAnalysis from "components/business/Dashboard/Analysis/VisitAnalysis/index.vue";
import visitAnalysisBar from "components/business/Dashboard/Analysis/VisitAnalysisBar/index.vue";
import visitRadar from "components/business/Dashboard/Analysis/VisitRadar/index.vue";
import visitSource from "components/business/Dashboard/Analysis/VisitSource/index.vue";
import salesProductPie from "components/business/Dashboard/Analysis/SalesProductPie/index.vue";
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AnalysisPage",
});
</script>

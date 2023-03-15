<template>
  <el-scrollbar class="h-full">
    <SayHello/>
    <div class="p-[10px]">
      <el-row :gutter="10">
        <el-col :span="16" class="enter-y">
          <el-card shadow="never">
            <template #header>
              <span>项目</span>
            </template>
            <Project />
          </el-card>

          <el-card shadow="never" class="mt-[10px]">
            <template #header>
              <span>动态</span>
            </template>
            <el-scrollbar class="h-[475px]">
              <div class="px-[10px]">
                <Dynamic />
              </div>
            </el-scrollbar>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="never">
            <template #header>
              <span>快捷导航</span>
            </template>
            <el-scrollbar class="h-[300px]">
              <div class="px-[10px]">
                <QuickNav />
              </div>
            </el-scrollbar>
          </el-card>

          <el-card shadow="never" class="mt-[10px]">
            <div>
              <img :src="getImageUrl('login_illustration.png')"/>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import SayHello from "components/business/Dashboard/workbench/SayHello/index.vue";
import Project from "components/business/Dashboard/workbench/Project/index.vue";
import QuickNav from "components/business/Dashboard/workbench/QuickNav/index.vue";
import Dynamic from "components/business/Dashboard/workbench/Dynamic/index.vue";
import { getImageUrl } from "util/System";

</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "workbench"
});
</script>


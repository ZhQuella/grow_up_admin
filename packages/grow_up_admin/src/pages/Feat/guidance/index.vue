<template>
  <div>
    <div>
      <div class="bg-BG_COLOR3 text-MAIN_TEXT py-[50px] px-[20px] text-[17px] mb-[10px]">
        引导示例
      </div>
      <div class="mx-[10px] mb-[10px]">
        <el-button @click="onStartGuide"> 开始引导 </el-button>
        <el-button id="intro_title"> 第一步 </el-button>
        <el-button id="intro_mine"> 第二步 </el-button>
        <el-button id="intro_save"> 第三步 </el-button>
      </div>
    </div>
    <v-tour name="myTour" :steps="reactData.steps" :options="reactData.myOptions" />
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, getCurrentInstance } from "vue";

const internalInstance = getCurrentInstance();

const reactData = reactive({
  myOptions: {
    useKeyboardNavigation: false,
    labels: {
      buttonSkip: "跳过",
      buttonPrevious: "上一步",
      buttonNext: "下一步",
      buttonStop: "完成"
    }
  },
  steps: [
    {
      target: "#intro_title",
      header: {
        title: "这是第一步引导"
      },
      content: "这里进行的是第一步!"
    },
    {
      target: "#intro_mine",
      header: {
        title: "这是第二步引导"
      },
      content: "不可以点击其他地方!",
      params: {
        highlight: true
      }
    },
    {
      target: "#intro_save",
      header: {
        title: "这是第三步引导"
      },
      content: "可以点击其他地方哦!"
    }
  ]
});

const onStartGuide = () => {
  const $tours = internalInstance.appContext.config.globalProperties.$tours;
  if ($tours) {
    if ($tours["myTour"]) {
      $tours["myTour"].start();
    }
  }
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GuidancePage"
});
</script>

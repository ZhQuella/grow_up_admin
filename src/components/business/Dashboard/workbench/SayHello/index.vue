<template>
  <div class="bg-BG_CARD px-[20px] py-[10px] flex justify-between">
    <div class="flex">
      <div class="pl-[10px]">
        <el-avatar :size="100" 
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
      <div class="py-[20px] pl-[20px]">
        <h5 class="text-[22px] text-TEXT_LIGHT2 leading-[34px]">早安, Mr.G Admin, 开始您一天的工作吧！</h5>
        <p class="text-[14px] text-TEXT_LIGHT2">今日晴，20℃ - 32℃！</p>
      </div>
    </div>
    <div class="flex p-[20px]">
      <div class="text-right pr-[50px]">
        <p class="text-[14px] text-TEXT_LIGHT2">通知</p>
        <div class="text-[24px] text-TEXT_LIGHT1">0/10</div>
      </div>
      <div class="text-right pr-[50px]">
        <p class="text-[14px] text-TEXT_LIGHT2">消息</p>
        <div class="text-[24px] text-TEXT_LIGHT1">1/5</div>
      </div>
      <div class="text-right">
        <p class="text-[14px] text-TEXT_LIGHT2">待办</p>
        <div class="text-[24px] text-TEXT_LIGHT1">4/5</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SayHello"
});
</script>
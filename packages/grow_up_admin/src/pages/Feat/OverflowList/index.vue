<template>
  <div id="overflowList">
    <div class="bg-BG_COLOR3 text-MAIN_TEXT py-[50px] px-[20px] text-[17px] mb-[10px]">
      折叠列表
    </div>
    <div class="mx-[10px]">
      <div>
        <el-slider :min="80" :max="1000" v-model="width" show-input size="small" />
      </div>
      <div id="allTag" :style="{width:`${width}px`,}">
        <GOverFlowList :width='width' :num='num'>
          <el-tag v-for="(n) in num" class="child" :key="`${n}`" :style="{'margin-right':'10px'}">{{n}}这是tag</el-tag>
        </GOverFlowList>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style lang='scss' scoped>

</style>

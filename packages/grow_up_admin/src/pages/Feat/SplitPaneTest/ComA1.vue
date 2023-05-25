<template>
  ComA1 -- {{ slotProps }}
  <div>
    我是测试赛组件
    <el-button @click="onTest">按钮</el-button>
  </div>
</template>
<script setup>
const pros = defineProps({
    slotProps: {
      type: Object,
      default:() => {}
    }
})
const onTest = () => {
}
</script>
<template>
  ComA2组件---{{ slotProps }}
</template>
<script setup>
const pros = defineProps({
    slotProps: {
      type: Object,
      default:() => {}
    }
  
  })
</script>
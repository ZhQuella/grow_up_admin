<template>
  <component :is="config.elTagName">111</component>
</template>

<script setup lang="ts">
interface PropsType {
  config: any;
}

const props = withDefaults(defineProps<PropsType>(), {
  config: () => ({})
});
</script>

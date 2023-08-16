<template>
  <template v-if="config.elType === 'basic'">
    <basicComponent :config="config"/>
  </template>

  <template v-if="config.elType === 'eleModule'">
    <eleModuleComponent :config="config"/>
  </template>
</template>

<script lang="ts" setup>
import basicComponent from "./component/basicComponent/index.vue";
import eleModuleComponent from "./component/eleModuleComponent/index.vue";

interface PropsType {
  config: any;
}

const props = withDefaults(defineProps<PropsType>(), {
  config: () => ({})
});

</script>

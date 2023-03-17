<template>
  <div>
    <el-button link type="primary">
      <template #icon>
        <el-icon size="19px">
          <component :is="`CloudServerOutlined`"/>
        </el-icon>
      </template>
    </el-button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    default: () => null
  }
});

</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ButtonGroup"
});
</script>

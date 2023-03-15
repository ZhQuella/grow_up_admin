<template>
  <div class="p-[10px]">
    <pageLayout>
      <template #header>

      </template>
      <template v-slot:main>
        
      </template>
      <template #footer>
        <div :span="12" class="flex justify-end pt-[10px]">
        </div>
      </template>
    </pageLayout>
  </div>
</template>

<script setup lang="ts">

</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "VxeVirtualList"
});
</script>
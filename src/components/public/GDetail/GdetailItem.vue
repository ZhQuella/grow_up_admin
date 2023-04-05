<template>
  <div class="flex leading-[28px]">
    <div
      class="grow-0 shrink-0"
      :style="labelStyle"
    >
      {{ label }}
    </div>
    <span class="px-[2px]">:</span>
    <div class="w-full">
      <span v-if="!$slots.default">{{ value }}</span>
      <slot :value="value" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, toRefs, computed } from "vue";

const props = defineProps({
  prop: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: ""
  },
  labelWidth: {
    type: String,
    default: ""
  },
  align: {
    type: String,
    default: ""
  }
});
const parentProps = inject("g-detail") as any;

const { prop, label, labelWidth, align } = toRefs(props);
const { model, labelWidth: pLabelWidth, align: pAlign } = toRefs(parentProps);

const value = computed(() => {
  return model.value[prop.value]
});

const labelStyle = computed(() => { 
  return {
    width: labelWidth.value || pLabelWidth.value,
    'text-align': align.value || pAlign.value
  }
})

console.log(parentProps);
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GDetailItem",
});
</script>

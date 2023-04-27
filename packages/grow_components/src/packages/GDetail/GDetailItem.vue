<template>
  <div class="flex leading-[32px]">
    <div class="grow-0 shrink-0" :style="labelStyle">
      {{ label }}
    </div>
    <span class="px-[2px]">:</span>
    <div class="w-full">
      <span v-if="!$slots.default">{{ value }}</span>
      <slot :value="value" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, toRefs, computed } from "vue";
export default defineComponent({
  name: "GDetailItem",
  props: {
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
  },
  setup(props){
    const parentProps = inject("g-detail") as any;

    const { labelWidth, align, prop } = toRefs(props);
    const { model, labelWidth: pLabelWidth, align: pAlign } = toRefs(parentProps);

    const getElType = (arg: any) => {
      return Object.prototype.toString.call(arg).slice(8, -1);
    };

    const getObjectValue = (from: any, selector: string) => {
      if (getElType(from) !== "Object") {
        throw new Error("Parameter is not an object.");
      }

      return selector
        .replace(/\[(\w+)\]/g, ".$1")
        .split(".")
        .reduce((prev, cur) => {
          return prev && prev[cur];
        }, from);
    };

    const value = computed(() => {
      return getObjectValue(model.value, prop.value);
    });

    const labelStyle = computed(() => {
      return {
        width: labelWidth.value || pLabelWidth.value,
        "text-align": align.value || pAlign.value
      };
    });
    
    return {
      value,
      labelStyle
    }
  }
});
</script>

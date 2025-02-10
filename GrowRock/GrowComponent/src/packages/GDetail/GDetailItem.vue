<template>
  <div class="flex leading-[32px]">
    <div class="g-detail-label grow-0 shrink-0 text-[14px]" :style="labelStyle">
      {{ label }}
    </div>
    <span class="px-[4px] text-[14px] font-bold">:</span>
    <div class="overflow-hidden w-full" ref="wordRef">
      <div v-if="!$slots.default">
        <div class="truncate w-full">
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="value"
            placement="top"
            :disabled="tooltipDisabled"
          >
            <span class="truncate w-full text-[14px]" ref="contentRef">{{ value }}</span>
          </el-tooltip>
        </div>
      </div>
      <slot v-else :value="value" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, toRefs, computed, ref, nextTick, watch } from "vue";
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
  setup(props) {
    const wordRef = ref(null);
    const contentRef = ref(null);
    const parentProps = inject("g-detail") as any;
    const tooltipDisabled = ref(false);

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

    watch(
      () => value.value,
      async () => {
        await nextTick();
        const wordDom = wordRef.value;
        const contentDom = contentRef.value;
        if (!contentDom || !wordDom) return;
        tooltipDisabled.value = contentDom.offsetWidth < wordDom.offsetWidth;
      },
      {
        deep: true
      }
    );

    const labelStyle = computed(() => {
      return {
        width: labelWidth.value || pLabelWidth.value,
        "text-align": align.value || pAlign.value
      };
    });

    return {
      wordRef,
      contentRef,
      tooltipDisabled,
      value,
      labelStyle
    };
  }
});
</script>

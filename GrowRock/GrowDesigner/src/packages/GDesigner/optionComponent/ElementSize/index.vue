<template>
  <div class="px-[10px] py-[5px]">
    <div class="relative w-full h-[150px]">
      <div class="py-[60px] px-[60px]">
        <ElSelect v-model="marginUnit" class="w-full" size="small" @change="onMarginUnitChange">
          <ElOption label="px" value="px"></ElOption>
          <ElOption label="%" value="%"></ElOption>
          <ElOption label="vw/vh" value="vw/vh"></ElOption>
        </ElSelect>
      </div>
      <div
        class="absolute top-0 left-0 right-0 border-t-[20px] border-r-[20px] border-l-[20px] border-t-[#d6e4ff] border-solid border-l-[transparent] border-r-[transparent]"
      >
        <span class="absolute top-[-20px] left-0 right-0 h-[20px] bg-transparent w-full">
          <input
            placeholder="0"
            maxlength="3"
            height="100%"
            autocomplete="off"
            :value="parseFloat(styleOption['margin-top']) || ''"
            class="text-[12px] text-center h-[20px] p-[0px] leading-[20px] block w-full bg-transparent"
            @input="(event) => onMarginChange('margin-top', event)"
          />
        </span>
      </div>
      <div
        class="absolute top-[5px] bottom-[5px] right-0 width-[0px] border-t-[transparent] border-b-[transparent] border-r-[#d6e4ff] border-t-[20px] border-b-[20px] border-r-[20px]"
      >
        <span class="absolute top-0 bottom-0 right-[-20px] w-[20px] m-[auto] bg-transparent">
          <input
            placeholder="0"
            maxlength="3"
            height="100%"
            autocomplete="off"
            :value="parseFloat(styleOption['margin-right']) || ''"
            class="text-[12px] absolute top-0 bottom-0 right-[0px] m-[auto] w-[20px] h-[20px] leading-[20px] text-center p-x-[8px] bg-transparent"
            @input="(event) => onMarginChange('margin-right', event)"
          />
        </span>
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 h-[0px] border-l-[transparent] border-r-[transparent] border-b-[#d6e4ff] border-l-[20px] border-b-[20px] border-r-[20px]"
      >
        <span class="float-left ml-[-10px] scale-[0.65] mt-[-5px] text-[#999]">Margin</span>
        <span class="absolute left-[0px] right-[0px] bottom-[0px] h-[20px]">
          <input
            placeholder="0"
            maxlength="3"
            height="100%"
            autocomplete="off"
            :value="parseFloat(styleOption['margin-bottom']) || ''"
            class="text-[12px] absolute left-0 right-0 bottom-[-20px] h-[20px] bg-transparent text-center"
            @input="(event) => onMarginChange('margin-bottom', event)"
          />
        </span>
      </div>
      <div
        class="absolute top-[5px] bottom-[5px] left-0 w-[0px] border-t-[transparent] border-b-[transparent] border-l-[#d6e4ff] border-t-[20px] border-b-[20px] border-l-[20px]"
      >
        <span class="absolute top-0 bottom-0 left-[-20px] w-[20px] m-[auto] bg-transparent">
          <input
            placeholder="0"
            maxlength="3"
            height="100%"
            autocomplete="off"
            :value="parseFloat(styleOption['margin-left']) || ''"
            class="text-[12px] absolute top-0 bottom-0 left-[0px] m-[auto] w-[20px] h-[20px] leading-[20px] text-center p-x-[8px] bg-transparent"
            @input="(event) => onMarginChange('margin-left', event)"
          />
        </span>
      </div>

      <div
        class="absolute top-[25px] left-[25px] right-[25px] h-[0px] border-t-[20px] border-r-[20px] border-l-[20px] border-t-[#d6e4ff] border-solid border-l-[transparent] border-r-[transparent]"
      >
        <span class="absolute top-[-20px] left-0 right-0 h-[20px] bg-transparent w-full">
          <input
            placeholder="0"
            maxlength="3"
            height="100%"
            autocomplete="off"
            :value="parseFloat(styleOption['padding-top']) || ''"
            class="text-[12px] text-center h-[20px] p-[0px] leading-[20px] block w-full bg-transparent"
            @input="(event) => onMarginChange('padding-top', event)"
          />
        </span>
      </div>
      <div
        class="absolute top-[30px] bottom-[30px] right-[25px] w-[0px] border-t-[transparent] border-b-[transparent] border-r-[#d6e4ff] border-t-[20px] border-b-[20px] border-r-[20px]"
      >
        <span class="absolute top-0 bottom-0 right-[-20px] w-[20px] m-[auto] bg-transparent">
          <input
            placeholder="0"
            maxlength="3"
            height="100%"
            autocomplete="off"
            :value="parseFloat(styleOption['padding-right']) || ''"
            class="text-[12px] absolute top-0 bottom-0 right-[0px] m-[auto] w-[20px] h-[20px] leading-[20px] text-center p-x-[8px] bg-transparent"
            @input="(event) => onMarginChange('padding-right', event)"
          />
        </span>
      </div>
      <div
        class="absolute bottom-[25px] left-[25px] right-[25px] h-[0px] border-l-[transparent] border-r-[transparent] border-b-[#d6e4ff] border-l-[20px] border-b-[20px] border-r-[20px]"
      >
        <span class="float-left ml-[-10px] scale-[0.65] mt-[-5px] text-[#999]">Padding</span>
        <span class="absolute left-[0px] right-[0px] bottom-[0px] h-[20px]">
          <input
            placeholder="0"
            maxlength="3"
            height="100%"
            autocomplete="off"
            :value="parseFloat(styleOption['padding-bottom']) || ''"
            class="text-[12px] absolute left-0 right-0 bottom-[-20px] h-[20px] bg-transparent text-center"
            @input="(event) => onMarginChange('padding-bottom', event)"
          />
        </span>
      </div>
      <div
        class="absolute top-[30px] bottom-[30px] left-[25px] w-[0px] border-t-[transparent] border-b-[transparent] border-l-[#d6e4ff] border-t-[20px] border-b-[20px] border-l-[20px]"
      >
        <span class="absolute top-0 bottom-0 left-[-20px] w-[20px] m-[auto] bg-transparent">
          <input
            placeholder="0"
            maxlength="3"
            height="100%"
            autocomplete="off"
            :value="parseFloat(styleOption['padding-left']) || ''"
            class="text-[12px] absolute top-0 bottom-0 left-[0px] m-[auto] w-[20px] h-[20px] leading-[20px] text-center p-x-[8px] bg-transparent"
            @input="(event) => onMarginChange('padding-left', event)"
          />
        </span>
      </div>
    </div>
    <div class="flex pt-[5px]">
      <ElInput
        class="flex-1 mr-[4px]"
        size="small"
        placeholder="长度"
        :controls="false"
        :modelValue="parseFloat(styleOption['height']) || ''"
      >
        <template #append>
          <ElSelect :modelValue="`px`" class="w-[50px]" size="small">
            <ElOption label="px" value="px"></ElOption>
            <ElOption label="%" value="%"></ElOption>
            <ElOption label="vh" value="vh"></ElOption>
            <ElOption label="auto" value="auto"></ElOption>
          </ElSelect>
        </template>
      </ElInput>
      <ElInput
        class="flex-1 ml[4px]"
        size="small"
        placeholder="宽度"
        :controls="false"
        :modelValue="parseFloat(styleOption['width']) || ''"
      >
        <template #append>
          <ElSelect :modelValue="`px`" class="w-[50px]" size="small">
            <ElOption label="px" value="px"></ElOption>
            <ElOption label="%" value="%"></ElOption>
            <ElOption label="vw" value="vw"></ElOption>
            <ElOption label="auto" value="auto"></ElOption>
          </ElSelect>
        </template>
      </ElInput>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
defineOptions({ name: "ElementSize" });

const emits = defineEmits(["update:styleOption"]);
const porps = defineProps({
  styleOption: {
    type: Object,
    default: () => ({})
  }
});
const { styleOption } = toRefs(porps);
import { useMargin } from "./use/useMargin";

const { marginUnit, onMarginUnitChange, onMarginChange } = useMargin({
  styleOption,
  emits
});
</script>

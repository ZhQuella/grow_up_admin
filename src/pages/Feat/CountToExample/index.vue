<template>
  <div>
    <div class="bg-BG_COLOR3 text-MAIN_TEXT py-[50px] px-[20px] text-[17px] mb-[10px]">
      数字动画
    </div>
    <div class="flex flex-col justify-center items-center">
      <div class="text-7xl text-pink-500 tracking-normal">
        <count-to
          ref="counter"
          :start-val="config.startVal" 
          :end-val="config.endVal" 
          :duration="config.duration" 
          :decimals="config.decimals" 
          :separator="config.separator" 
          :prefix="config.prefix" 
          :suffix="config.suffix"
          :autoplay="false" 
        />
      </div>
      <div class="flex flex-wrap mx-[20px]">
        <label 
          for="startVal" 
          class="flex items-center flex-nowrap m-[10px]"
        >
          startVal:
          <el-input 
            v-model.number="config.startVal" 
            name="startVal" 
            type="number"
          />
        </label>
        <label 
          for="endVal" 
          class="flex items-center flex-nowrap m-[10px]"
        >
          endVal:
          <el-input 
            v-model.number="config.endVal" 
            name="endVal" 
            type="number"
          />
        </label>
        <label 
          for="duration" 
          class="flex items-center flex-nowrap m-[10px]"
        >
          duration:
          <el-input 
            v-model.number="config.duration" 
            name="duration" 
            type="number"
          />
        </label>
        <label 
          for="decimals" 
          class="flex items-center flex-nowrap m-[10px]"
        >
          decimals:
          <el-input 
            v-model.number="config.decimals" 
            name="decimals" 
            type="number"
          />
        </label>
        <label 
          for="separator" 
          class="flex items-center flex-nowrap m-[10px]"
        >
          separator:
          <el-input 
            v-model="config.separator" 
            name="separator" 
            type="text"
          />
        </label>
        <label 
          for="prefix" 
          class="flex items-center flex-nowrap m-[10px]"
        >
          prefix:
          <el-input 
            v-model="config.prefix" 
            name="prefix" 
            type="text"
          />
        </label>
        <label 
          for="suffix" 
          class="flex items-center flex-nowrap m-[10px]"
        >
          suffix:
          <el-input 
            v-model.number="config.suffix" 
            name="suffix" 
            type="text"
          />
        </label>
      </div>
      <div>
        <el-button 
          type="primary" 
          @click="start"
        > 
          start
        </el-button>
        <el-button 
          type="danger" 
          @click="pauseResume"
        > 
          pause/Resume
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CountTo from "@/components/public/CountTo/index.vue"

const config = reactive({
    startVal:0,
    endVal:2023,
    duration: 4000,
    decimals: 0,
    separator: ',',
    prefix: '¥',
    suffix: 'rmb'
})

const counter = ref();

const start = () => {
    counter.value.start();
}

const pauseResume = () => {
    counter.value.pauseResume();
}
</script>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
    name: "CountToExample",
});
</script>

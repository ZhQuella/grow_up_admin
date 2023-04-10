<template>
  <div>
    <div class="bg-BG_COLOR3 text-MAIN_TEXT py-[50px] px-[20px] text-[17px] mb-[10px]">
      数字动画
    </div>
    <div class="mx-[20px]">
      <div class="text-7xl text-pink-500 tracking-normal text-center">
        <count-to
          ref="counter"
          :start-val="config.startVal"
          :end-val="config.endVal"
          :duration="config.duration"
          :decimals="config.decimals"
          :separator="config.separator"
          :prefix="config.prefix"
          :suffix="config.suffix"
        />
      </div>
      <el-row align="middle">
        <el-col :span="6">
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
        </el-col>
        <el-col :span="6">
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
        </el-col>
        <el-col :span="6">
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
        </el-col>
        <el-col :span="6">
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
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="6">
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
        </el-col>
        <el-col :span="6">
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
        </el-col>
        <el-col :span="6">
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
        </el-col>
        <el-col :span="6">
          <div class="flex-algin-center">
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
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import CountTo from "components/public/CountTo/index.vue"

const config = reactive({
  startVal: 0,
  endVal: 2023,
  duration: 4000,
  decimals: 0,
  separator: ',',
  prefix: '¥',
  suffix: 'rmb'
})

const counter = ref(null);

const start = () => {
  counter.value.start();
}

const pauseResume = () => {
  counter.value.pauseResume();
}
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CountToExample",
});
</script>

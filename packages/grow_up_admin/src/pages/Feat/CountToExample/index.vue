<template>
  <div>
    <div class="bg-BG_COLOR3 text-MAIN_TEXT py-[50px] px-[20px] text-[17px] mb-[10px]">
      数字动画
    </div>
    <div class="mx-[20px]">
      <div class="my-[20px] text-7xl text-pink-500 tracking-normal text-center">
        <count-to
          ref="counter"
          :start-val="config.startVal"
          :end-val="config.endVal"
          :duration="config.duration"
          :decimals="config.decimals"
          :separator="config.separator"
          :prefix="config.prefix"
          :suffix="config.suffix"
          :autoplay="config.autoplay"
          :delay="config.delay"
        />
      </div>
      <el-form label-position="right" label-width="80px" :model="config">
        <el-row align="middle">
          <el-col :span="6">
            <el-form-item label="开始值:">
              <el-input v-model.number="config.startVal" name="startVal" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束值:">
              <el-input v-model.number="config.endVal" name="endVal" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="持续时间:">
              <el-input v-model.number="config.duration" name="duration" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="小数:">
              <el-input v-model.number="config.decimals" name="decimals" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="6">
            <el-form-item label="分隔符:">
              <el-input v-model="config.separator" name="separator" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="前缀:">
              <el-input v-model="config.prefix" name="prefix" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="后缀:">
              <el-input v-model.number="config.suffix" name="suffix" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="延时执行:">
              <el-input v-model.number="config.delay" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <div class="flex-algin-center">
                <el-button type="primary" @click="start"> start </el-button>
                <el-button type="danger" @click="pauseResume"> pause/Resume </el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import CountTo from "components/public/CountTo/index.vue";

const config = reactive({
  startVal: 20,
  endVal: 2023,
  duration: 350,
  decimals: 2,
  separator: ",",
  prefix: "¥",
  suffix: "RMB",
  autoplay: true,
  delay: 0
});

const counter = ref(null);

const start = () => {
  counter.value.start();
};

const pauseResume = () => {
  counter.value.pauseResume();
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CountToExample"
});
</script>

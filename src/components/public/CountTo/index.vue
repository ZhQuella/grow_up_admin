<template>
  <span>{{ displayValue }}</span>
</template>
  
<script setup lang="ts">
import { onUnmounted, reactive, ref, defineExpose, computed } from 'vue';

const props = defineProps({
  startVal: {
    type: Number,
    required: false,
    default: 0,
  },
  endVal: {
    type: Number,
    required: false,
    default: 2023,
  },
  duration: {
    type: Number,
    default: 3000,
  },
  decimals: {
    type: Number,
    required: false,
    default: 0,
    validator(value: number) {
      return value >= 0;
    }
  },
  decimal: {
    type: String,
    required: false,
    default: '.'
  },
  separator: {
    type: String,
    required: false,
    default: ','
  },
  prefix: {
    type: String,
    required: false,
    default: ''
  },
  suffix: {
    type: String,
    required: false,
    default: ''
  },
})

// 格式化数据，返回想要展示的数据格式
const formatNumber = (val: number) => {
  const value = val.toFixed(props.decimals)
  const x = value.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? props.decimal + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  if (props.separator && !isNumber(props.separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + props.separator + '$2')
    }
  }
  return props.prefix + x1 + x2 + props.suffix;
}

// 判断是否为number
const isNumber = (val: string) => {
  return !isNaN(parseFloat(val))
}

// 初始化props传进来的值
const state = reactive<{
  previousTimestamp: number | null,
  start: number,
  end: number,
  duration: number,
  paused: boolean,
  remaining: number,
  rAF: number | null,
  printVal: number,
}>({
  previousTimestamp: null,
  start: props.startVal,
  end: props.endVal,
  duration: props.duration,
  paused: false,// 是否暂停
  remaining: 0,
  rAF: null,
  printVal: props.startVal,
})

// 初始化展示在页面上的值
const displayValue = computed(() => formatNumber(state.printVal));

// 定义一个计算属性，当开始数字大于结束数字时返回true
const stopCount = computed(() => {
  return props.startVal > props.endVal;
})

// 数字增加的过程函数
const step = (timestamp: number) => {
  if (!state.previousTimestamp) state.previousTimestamp = timestamp;
  const progress = timestamp - state.previousTimestamp;
  state.remaining = state.duration - progress;

  //如果startVal大于endVal
  if (stopCount.value) {
    state.printVal = state.start - (state.start - state.end) * (progress / state.duration);
  } else {
    state.printVal = state.start + (state.end - state.start) * (progress / state.duration);
  }

  if (stopCount.value) {
    state.printVal = state.printVal < props.endVal ? props.endVal : state.printVal;
  } else {
    state.printVal = state.printVal > props.endVal ? props.endVal : state.printVal;
  }

  if (progress < state.duration) {
    state.rAF = window.requestAnimationFrame(step)
  }
}

// 开始动画
const start = () => {
  state.start = props.startVal;
  state.previousTimestamp = null;
  state.paused = false;
  state.duration = props.duration;

  if (state.rAF) window.cancelAnimationFrame(state.rAF);

  state.rAF = window.requestAnimationFrame(step);
}

// 暂停
const pause = () => {
  window.cancelAnimationFrame(state.rAF!);
}

// 恢复计数
const resume = () => {
  state.previousTimestamp = null;
  state.start = +state.printVal;
  state.duration = +state.remaining || props.duration;
  window.requestAnimationFrame(step);
}

//暂停之后继续
const pauseResume = () => {
  if (state.paused) {
    resume();
    state.paused = false;
  } else {
    pause();
    state.paused = true;
  }
}

// 将start函数和pauseResume函数抛出去
defineExpose({
  start,
  pauseResume,
})

// 组件销毁之后取消动画
onUnmounted(() => {
  window.cancelAnimationFrame(state.rAF!);
})
</script>
  
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CountTo",
});
</script>
  
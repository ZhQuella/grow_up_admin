<template>
  <div class="flex h-[5px]">
    <div
      v-show="strength >= 0"
      class="w-1/5 h-[5px] bg-green-300 mr-[4px] -enter-x"
    />
    <div
      v-show="strength >= 1"
      class="w-1/5 mr-[4px] bg-green-400 -enter-x"
    />
    <div
      v-show="strength >= 2"
      class="w-1/5 mr-[4px] bg-yellow-400 -enter-x"
    />
    <div
      v-show="strength >= 3"
      class="w-1/5 mr-[4px] bg-orange-400 -enter-x"
    />
    <div
      v-show="strength === 4"
      class="w-1/5 bg-red-400 -enter-x"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
});

const strength = computed(() => {
  const str = props.value;
  let isStrength = -1;
  if (str.length >= 10) isStrength++;
  if (/\d/.test(str)) isStrength++;
  if (/[a-z]/.test(str)) isStrength++;
  if (/[A-Z]/.test(str)) isStrength++;
  if (/\W/.test(str)) isStrength++;
  return isStrength;
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ChangePassword",
});
</script>

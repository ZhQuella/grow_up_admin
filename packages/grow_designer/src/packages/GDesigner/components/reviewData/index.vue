<template>
  <GCodemirror defaultModel="json"
               isPure
               isReadOnly
               ref="codemirrorRef"/>
</template>

<script setup lang="ts">
defineOptions({ name: "reviewData" });
import { ref, toRefs, watch, onMounted } from "vue";
import { GCodemirror } from "grow_editor";

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const { data } = toRefs(props);
const codemirrorRef = ref();
const setData = () => {
  codemirrorRef.value.setDoc(JSON.stringify(data.value, null, 2));
};

watch(() => data.value, setData, {
  deep: true
});
onMounted(setData);
</script>

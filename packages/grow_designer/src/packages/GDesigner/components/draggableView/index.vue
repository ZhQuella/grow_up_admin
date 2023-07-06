<template>
    <VueDraggableNext group="draggable-group"
                      :animation="180"
                      v-model="draggableList"
                      class="h-full bg-BG_COLOR2">
      <transition-group>
        <div v-for="ele in draggableList"
             :key="ele.name + Math.random()">{{ ele.name }}</div>
      </transition-group>
    </VueDraggableNext>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VueDraggableNext } from "vue-draggable-next";

const draggableList = ref([]);

defineOptions({ name: "draggableView" })

</script>


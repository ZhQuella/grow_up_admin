<template>
  <VueDraggableNext group="draggable-group"
                    :animation="180"
                    v-model="draggableConfig.structures"
                    class="draggable-grop-wrap h-full bg-BG_COLOR2"
                    handle=".draggable-content-bar"
                    @add="onDraggableAdd">
    <transition-group name="list"
                      type="transition">
      <DraggableItem v-for="ele in draggableConfig.structures"
                     :key="ele.uuid">
        {{ draggableConfig.renderArgument[ele.uuid] }}
      </DraggableItem>
    </transition-group>
  </VueDraggableNext>
</template>

<script setup lang="ts">
import { VueDraggableNext } from "vue-draggable-next";
import DraggableItem from "../draggableItem/index.vue";

const emit = defineEmits(['add']);

interface Props {
  draggableConfig: any
};
const props = defineProps<Props>();

const onDraggableAdd = (event) => {
  const list = props.draggableConfig.structures;
  emit("add", { event, list });
};
</script>

<style lang="scss" space>
.draggable-item {
  transition: all .35s;
}
.list-enter-active {
  transition: all .5s;
}
.list-leave-active {
  transition: all .3s;
}
.list-enter, .list-leave-to{
  opacity  : 0;
  transform: translateX(-100px);
}
.list-enter {
  height: 30px;
}
</style>

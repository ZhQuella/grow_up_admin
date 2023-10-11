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
                     :key="ele.uuid"
                     :structure="ele"
                     @special="onSpecialAdd">
        <abstractionComponent :config="draggableConfig.renderArgument[ele.uuid]"
                              :structure="ele"
                              @add="onChildAdd"/>
      </DraggableItem>
    </transition-group>
  </VueDraggableNext>
</template>

<script setup lang="ts">
import { VueDraggableNext } from "vue-draggable-next";
import DraggableItem from "../draggableItem/index.vue";
import abstractionComponent from "../abstractionComponent/index.vue";

const emit = defineEmits(['add','special']);

interface Props {
  draggableConfig: any
}
const props = defineProps<Props>();

const onDraggableAdd = (event) => {
  const list = props.draggableConfig.structures;
  emit("add", { event, list });
};

const onChildAdd = (event) => {
  console.log(">>>> 这里没有执行？");
  emit("add", event);
}

const onSpecialAdd = (event) => {
  emit('special',event)
}
</script>

<style lang="scss" space>
.draggable-item {
  transition: all .35s;
}
.list-enter-active {
  transition: all .35s;
}
.list-leave-active {
  transition: all .35s;
}
.list-enter, .list-leave-to{
  opacity  : 0;
  transform: translateX(-100px);
}
.list-enter {
  height: 30px;
}
</style>

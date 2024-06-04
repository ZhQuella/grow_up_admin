<template>
  <draggable group="draggable-group"
             :animation="200"
             item-key="uuid"
             :component-data="{
              tag: 'div',
              type: 'transition-group',
              name: 'draggable-group'
             }"
             :disabled="false"
             ghostClass="ghost"
             v-model="draggableConfig.structures"
             class="draggable-grop-wrap border-slate-300"
             handle=".draggable-content-bar"
             @add="onDraggableAdd">
    <template #item="{ element }">
      <DraggableItem :structure="element"
                     @special="onSpecialAdd"
                     @delete="onSpecialDelete"
                     @active="onActive">
        <abstractionComponent :config="draggableConfig.renderArgument[element.uuid]"
                              :structure="element"
                              @add="onChildAdd"
                              @special="onSpecialAdd"
                              @active="onActive"/>
      </DraggableItem>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import DraggableItem from "../draggableItem/index.vue";
import abstractionComponent from "../abstractionComponent/index.vue";

const emit = defineEmits(['add','special','delete','active']);

interface Props {
  draggableConfig: any
}
const props = defineProps<Props>();

const onDraggableAdd = (event) => {
  const list = props.draggableConfig.structures;
  emit("add", { event, list });
};

const onChildAdd = (event) => {
  emit("add", event);
}

const onSpecialAdd = (event) => {
  emit('special',event);
}

const onActive = (event) => {
  emit('active', event);
};

const onSpecialDelete = (event) => {
  emit('delete', event);
};
</script>

<style lang="scss" scoped>
.draggable-group-move,.draggable-item {
  transition: all .35s;
}
.no-move {
  transition: transform 0s;
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
  height: 0px;
}
.draggable-grop-wrap {
  height: 100%;
}
</style>

<template>
  <template v-if="config.elType === 'basic' && !config.isChild">
    <basicComponent :config="config"/>
  </template>

  <template v-if="config.elType === 'eleModule' && !config.isChild">
    <eleModuleComponent :config="config"/>
  </template>

  <template v-if="config.isChild">
    <el-card v-if="config.elTagName === 'el-card'">
      <template #header>
        <div class="flex justify-between">
          <div>
            <span>Card name</span>
          </div>
          <div>
            <el-button class="button" text>Operation button</el-button>
          </div>
        </div>
      </template>
      <VueDraggableNext group="draggable-group"
                        :animation="180"
                        class="draggable-grop-wrap h-full bg-BG_COLOR2 relative border-[1px] border-slate-300 border-dashed rounded-[5px] overflow-hidden min-h-[50px] duration-350"
                        handle=".draggable-content-bar"
                        v-model="structure.children"
                        @add="onChildAdd">
        <DraggableItem v-for="ele in structure.children"
                       :key="ele.uuid">
          <abstractionComponent :config="draggableConfig.renderArgument[ele.uuid]"
                                :structure="ele"
                                @add="onAbstractionAdd"/>
        </DraggableItem>
      </VueDraggableNext>
    </el-card>

  </template>

</template>

<script lang="ts" setup>
import { inject } from "vue"
import { VueDraggableNext } from "vue-draggable-next";
import basicComponent from "./component/basicComponent/index.vue";
import eleModuleComponent from "./component/eleModuleComponent/index.vue";
import DraggableItem from "../draggableItem/index.vue";

const draggableConfig:any = inject("__draggableConfig__");

defineOptions({ name: "abstractionComponent" });

const emit = defineEmits(['add'])

interface PropsType {
  config: any;
  structure: any;
}

const props = withDefaults(defineProps<PropsType>(), {
  config: () => ({}),
  structure: () => ({})
});

const onAbstractionAdd = (event) => {
  emit('add', event);
}

const onChildAdd = (event) => {
  const list = props.structure.children;
  emit('add', { event, list });
}
</script>

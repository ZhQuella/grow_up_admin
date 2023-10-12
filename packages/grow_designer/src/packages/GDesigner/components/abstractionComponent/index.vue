<template>
  <template v-if="config.elType === 'basic' && !config.isChild">
    <basicComponent :config="config"/>
  </template>

  <template v-if="config.elType === 'eleModule' && !config.isChild">
    <eleModuleComponent :config="config"/>
  </template>

  <template v-if="config.isChild">
    <component v-if="['el-col','el-tab-pane'].includes(config.elTagName)"
               :is="config.elTagName"
               label="User"
               :span="12"
               :name="Math.random()">
      <VueDraggableNext group="draggable-group"
                        :animation="180"
                        class="draggable-grop-wrap h-full bg-BG_COLOR2 relative border-[1px] border-slate-300 border-dashed rounded-[5px] overflow-hidden min-h-[50px] duration-350"
                        handle=".draggable-content-bar"
                        v-model="structure.children"
                        @add="onChildAdd"
                        @special="onDraggableAdd">
        <DraggableItem v-for="ele in structure.children"
                       :structure="ele"
                       :key="ele.uuid"
                       @special="onDraggableAdd"
                       @active="onActive">
          <abstractionComponent :config="draggableConfig.renderArgument[ele.uuid]"
                                :structure="ele"
                                @add="onAbstractionAdd"
                                @special="onDraggableAdd"
                                @active="onActive"/>
        </DraggableItem>
      </VueDraggableNext>
    </component>

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
                       :structure="ele"
                       :key="ele.uuid"
                       @active="onActive"
                       @special="onDraggableAdd">
          <abstractionComponent :config="draggableConfig.renderArgument[ele.uuid]"
                                :structure="ele"
                                @add="onAbstractionAdd"
                                @active="onActive"/>
        </DraggableItem>
      </VueDraggableNext>
    </el-card>

    <template v-if="['el-tabs','el-row'].includes(config.elTagName)">
      <component :is="config.elTagName">
        <abstractionComponent v-for="ele in structure.children"
                              :structure="ele"
                              :config="draggableConfig.renderArgument[ele.uuid]"
                              :key="ele.uuid"
                              @add="onAbstractionAdd"
                              @special="onDraggableAdd"
                              @active="onActive"/>
      </component>
    </template>
  </template>

</template>

<script lang="ts" setup>
import { DRAGGABLE_CONGIG } from "../../config/designation";
import { inject, toRefs } from "vue"
import { VueDraggableNext } from "vue-draggable-next";
import basicComponent from "./component/basicComponent/index.vue";
import eleModuleComponent from "./component/eleModuleComponent/index.vue";
import DraggableItem from "../draggableItem/index.vue";

const draggableConfig:any = inject(DRAGGABLE_CONGIG);

defineOptions({ name: "abstractionComponent" });

const emit = defineEmits(['add','special','active'])

interface PropsType {
  config: any;
  structure: any;
}

const props = withDefaults(defineProps<PropsType>(), {
  config: () => ({}),
  structure: () => ({})
});

const { structure } = toRefs(props);

const onAbstractionAdd = (event) => {
  emit('add', event);
}

const onChildAdd = (event) => {
  const list = props.structure.children;
  emit('add', { event, list });
}

const onDraggableAdd = (event) => {
  emit('special', event);
}

const onActive = (event) => {
  emit('active', event);
}
</script>

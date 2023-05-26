<template>
<!-- @name 
    -- @author wanghan
    -- @date 2023-05-09 16:44:51 星期二
    -->
    <Splitpanes  :horizontal="rootHorizontal" class="default-theme h-full">
      <Pane  v-for="(pItem,i) in treeData" :class="pItem.class" :key="pItem.id" :size="pItem.size">
        <template v-if="pItem.slotKey">
          <slot :name="pItem.slotKey" v-bind="pItem"></slot>
        </template>
        <template v-if="pItem.child">
          <PaneCom :treeData="pItem.child"  :rootHorizontal="pItem.horizontal">
            <template v-for="(row) in getAllChild(pItem)" v-slot:[row]="slotData">
              <slot :name="row" v-bind="slotData"></slot>
            </template>
          </PaneCom>
        </template>
      </Pane> 
    </Splitpanes>
</template>
<script lang="ts">
import { defineComponent, } from "vue";

export default defineComponent({
  name: "SplitPane",
});
</script>
<script lang="ts" setup>
import { Splitpanes, Pane } from "splitpanes";
import PaneCom from './PaneCom.vue'
const props = defineProps({
  treeData: {
    type: Array,
    required: false,
    default: () => []
  },
  rootHorizontal: {
    type: Boolean,
    default: false
  },
});

function getAllChild (item) {
  let whileArr = [item];
  let result = [item];
  while (whileArr.length){
    let ele = whileArr.shift();
    if(ele.child && Array.isArray(ele.child)){
      whileArr.push(...ele.child);
      result.push(...ele.child);
    };
  }
  return result.filter(el => el.slotKey).map(el => el.slotKey);
}
</script>
<style scoped>

</style>
<template>
<!-- @name 
    -- @author wanghan
    -- @date 2023-05-09 16:44:51 星期二
    -->
    <Splitpanes v-for="(paneItem,i) in treeData" :key="paneItem.id" class="default-theme" :horizontal="isHor(paneItem)" :style="`height: ${paneItem.height}px`">
        <Pane v-for="(item) in paneItem.panes" :key="item.id" :style="`border:1px solid ${item.color};`">
            <template v-if="item.slotkey">
              <slot :name="item.slotkey" :data='item'></slot>
            </template>
            <PaneCom v-if="item.splits" :treeData='item.splits'></PaneCom>
        </Pane>
    </Splitpanes>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SplitPane",
});
</script>
<script lang="ts" setup>
import { Splitpanes, Pane } from "splitpanes";
import PaneCom from './PaneCom.vue'
import { watch, toRefs, unref, reactive,ref,PropType,defineAsyncComponent } from "vue";
// 定义aaaaaaa
const props = defineProps({
    treeData: {
        type: Array,
        required: false,
        default: () => []
    },
})
let allComs = reactive({})

function init() {
  let arr = props.treeData;
  arr.forEach((el:any) => {
    if (el.components) {
      el.components.forEach((name:string) => {
        let url = `./${name}.vue`;
        allComs[`${name}`] = defineAsyncComponent(() => import(url))
      })
    }
    console.log('allComs',allComs)
  })
}
init();
//! horizontal:true 竖着分布
const isHor = (paneItem:object) => {
    return paneItem.horizontal === 'col'
}
const getComName = (item:any) => {
  return allComs[item.comName]
}
</script>
<style scoped>
.PaneCom1 {
    border: 1px solid blue;
}
</style>
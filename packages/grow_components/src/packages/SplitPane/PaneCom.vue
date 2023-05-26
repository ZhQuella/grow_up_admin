<template>
<!-- @name
    -- @author wanghan
    -- @date 2023-05-09 16:44:51 星期二
    -->
    <Splitpanes  :horizontal="rootHorizontal" class="default-theme h-full">
      <Pane  v-for="(pItem, i) in treeData"
             :key="i"
             :size="pItem.size">
        <template v-if="pItem?.slotKey">
          <slot :name="pItem.slotKey" v-bind="pItem"></slot>
        </template>
        <template v-if="pItem.child">
          <PaneCom :treeData="pItem.child"  :rootHorizontal="pItem.horizontal">
            <template v-for="(row, j) in getAllChild(pItem)" v-slot:[row]="slotData">
              <slot :name="row" v-bind="slotData"></slot>
            </template>
          </PaneCom>
        </template>
      </Pane>
    </Splitpanes>
</template>

<script lang="ts" setup name="SplitPane">
import { Splitpanes, Pane } from "splitpanes";

withDefaults(defineProps<{
  treeData: any[];
  rootHorizontal?: boolean;
}>(), {
  rootHorizontal: false
});

function getAllChild (item: any) {
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

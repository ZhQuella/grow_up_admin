<template>
    <Splitpanes  :horizontal="rootHorizontal" class="default-theme h-full">
      <Pane  v-for="(pItem, i) in treeData"
             :key="i"
             :size="pItem.size">
        <template v-if="pItem?.slotKey">
          <slot :name="pItem.slotKey" v-bind="pItem as any"></slot>
        </template>
        <template v-if="pItem.child">
          <GSplitPane :treeData="pItem.child"  :rootHorizontal="pItem.horizontal">
            <template v-for="(row) in getAllChild(pItem)" v-slot:[row]="{...slotData}">
              <slot :name="row" v-bind="slotData"></slot>
            </template>
          </GSplitPane>
        </template>
      </Pane>
    </Splitpanes>
</template>

<script lang="ts" setup generic="T extends SplitPane">
import type { SplitPane } from "types/GSplitPane";
import { Splitpanes, Pane } from "splitpanes";

defineOptions({ name: "GSplitPane" });

interface propsType {
  treeData?: T[];
  rootHorizontal?: boolean;
};

withDefaults(defineProps<T, propsType>(),{
  treeData: [],
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

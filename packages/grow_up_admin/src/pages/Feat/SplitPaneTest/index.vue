<template>
<!-- @name 
  -- @author wanghan
  -- @date 2023-05-05 18:24:54 星期五
  -->
  <div id="splitPaneTest">
    <div class="bg-BG_COLOR3 text-MAIN_TEXT py-[50px] px-[20px] text-[17px] mb-[10px]">
      分屏组件
    </div>
    <div class="split-content mx-[10px]">
      <GSplitPane :treeData="treeData"  :rootHorizontal="false">
        <template #ComA="slotProps">
          <ComA :slotProps="slotProps"></ComA>
        </template>
        <template #ComB1="slotProps">
          <ComB1 :slotProps="slotProps"></ComB1>
        </template>
        <template #ComB2="slotProps">
          <ComB2 :slotProps="slotProps"></ComB2>
        </template>
        <template #ComA1="slotProps">
          <ComA1 :slotProps="slotProps"></ComA1>
        </template>
        <template #ComA2="slotProps">
          <ComA2 :slotProps="slotProps"></ComA2>
        </template>
        <template #ComC="slotProps">
          <ComC :slotProps="slotProps"></ComC>
        </template>
        <template #ComB="slotProps">
          <ComB :slotProps="slotProps"></ComB>
        </template>
      </GSplitPane>
    </div>
  </div>
</template>
<script lang="ts" setup>
import ComA from './ComA.vue'
import ComB1 from './ComB1.vue'
import ComB2 from './ComB2.vue'
import ComC from './ComC.vue'
import ComB from './ComB.vue'
import ComA1 from './ComA1.vue'
import ComA2 from './ComA2.vue'
// 数组中每一个对象都是一个pane,pane里面的child代表新的pane
const treeData: any = [
  {
    horizontal: true,// true：竖着分布，false：横着分布
    size: 65,
    slotKey: '',
    id:'a',
    class:'pane-a',
    child: [
      {
        size: 50,
        horizontal: true,
        slotKey: 'ComA',
        id:'a-1',
        class:'pane-a-1',
      },
      {
        size: 50,
        horizontal: false,
        id:'a-2',
        class:'pane-a-2',
        child: [
          {
            size: 50,
            horizontal: false,
            slotKey: 'ComA2',
            id:'a-2-1',
            class:'pane-a-2-1',
          },
          {
            size: 50,
            horizontal: false,
            slotKey: 'ComA1',
            id:'a-2-2',
            class:'pane-a-2-2',
          }
        ]
      }
    ]
  },
  {
    horizontal: false,// true：竖着分布，false：横着分布
    size: 15,
    slotKey: 'ComB',
    id:'b',
    class:'pane-b',
    child: [
      
    ]
  },
  {
    horizontal: false,// true：竖着分布，false：横着分布
    size: 20,
    slotKey: 'ComC',
    id:'c',
    class:'pane-c',
    child: [
      
    ]
  }
]
</script>
<style  lang="scss">
#splitPaneTest {
  .split-content {
    height: calc(100% - 200px);
  }
}
</style>
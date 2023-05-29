<template>
  <div id="splitPaneTest">
    <div class="bg-BG_COLOR3 text-MAIN_TEXT py-[50px] px-[20px] text-[17px] mb-[10px]">
      分屏组件
    </div>
    <div class="split-content mx-[10px]">
      <GSplitPane :treeData="treeData"  :rootHorizontal="false">
        <template #ComA>
          ComA
        </template>
        <template #ComB1="slotProps">
          ComA
        </template>
        <template #ComB2>
          ComB2
        </template>
        <template #ComA1>
          ComA1
        </template>
        <template #ComA2>
          ComA2
        </template>
        <template #ComC="slotProps">
          ComC
        </template>
        <template #ComB="slotProps">
          {{ slotProps }}
        </template>
      </GSplitPane>
    </div>
  </div>
</template>
<script lang="ts" setup>
// 数组中每一个对象都是一个pane,pane里面的child代表新的pane
const treeData: any[] = [
  {
    horizontal: true,// true：竖着分布，false：横着分布
    size: 65,
    slotKey: '',
    child: [
      {
        size: 50,
        horizontal: true,
        slotKey: 'ComA',
      },
      {
        size: 50,
        horizontal: false,
        child: [
          {
            size: 50,
            horizontal: false,
            slotKey: 'ComA2'
          },
          {
            size: 50,
            horizontal: false,
            slotKey: 'ComA1',
          }
        ]
      }
    ]
  },
  {
    horizontal: false,// true：竖着分布，false：横着分布
    size: 15,
    slotKey: 'ComB'
  },
  {
    horizontal: false,// true：竖着分布，false：横着分布
    size: 20,
    slotKey: 'ComC'
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

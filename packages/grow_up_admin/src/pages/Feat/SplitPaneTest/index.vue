<template>
<!-- @name 
  -- @author wanghan
  -- @date 2023-05-05 18:24:54 星期五
  -->
  <div class="">
      <SplitPane :treeData="treeData">
        <!-- <template v-for="(name,i) in treeData.components">
          <template v-slot:[name]>
            
          </template>
        </template> -->
      </SplitPane>
  </div>
</template>
<script lang="ts" setup>
const treeData:any = [
  {
    id: 1,
    horizontal: 'row',
    slotkey: '',
    height: 500,
    color: 'blue',
    components: ['ComA','ComC'],
    panes: [
      {
        id: 11,
        slotkey:'ComA',
        height:200,
        color:'pink',
        name: 'ComA',
        comName:'ComA'
      },
      {
        id: 22,
        slotkey:'',
        height:200,
        color:'yellow',
        name: 'B',
        splits:[
          {
            id: 2,
            horizontal: 'col',// 竖着排列
            slotkey:'',
            height:200,
            color: '#213741',
            components: ['ComB1','ComB2'],
            panes:[
              {
                id: 111,
                slotkey:'ComB1',
                height:50,
                color:'#ededed',
                name: 'B-1',
                comName:'ComB1'
              },
              {
                id: 222,
                slotkey:'ComB2',
                height:50,
                color:'#1cd66c',
                name:'B-2',
                comName:'ComB2'
              },
            ]
          },
          {
            id: 4,
            horizontal: 'col',// 竖着排列
            slotkey:'',
            height:100,
            color: '#213741',
            panes:[
              {
                id: 111,
                slotkey:'',
                height:50,
                color:'#e13a2d',
                name:'B-4'
              },
              {
                id: 222,
                slotkey:'',
                height:50,
                color:'#2979ea',
                name:'B-5'
              },
            ]
          },
        ]
      },
      {
        id: 33,
        slotkey:'ComC',
        height:200,
        color:'#ccc',
        name:'C',
        comName:'ComC'
      }
    ]
  },
]
</script>
<style  lang="scss">

</style>
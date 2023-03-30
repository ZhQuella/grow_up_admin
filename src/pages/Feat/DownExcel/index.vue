<template>
  <div>
    <div class="bg-BG_COLOR3 text-MAIN_TEXT py-[50px] px-[20px] text-[17px] mb-[10px]">
      导出Excel
    </div>
    <div class="mx-[10px]">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>本地导出Excel</span>
          </div>
        </template>
        <div>
          <el-button @click="onLocalDownExcel">
            Down Excel
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import DownExcel from "util/DownExcel/index";

const onLocalDownExcel = () => { 
  const downLoadExcel = new DownExcel([{
    title: "嘿嘿",
    header: [{
      field: "c1",
      title: "c111",
      bgColor: "A9BCD1",
      children: [{
        field: "c2",
        title: "c222",
        bgColor: "A9BCD1",
      },{
        field: "c3",
        title: "c333",
        bgColor: "A9BCD1",
      },{
        field: "c4",
        title: "c444",
        bgColor: "A9BCD1",
      }]
    },
    {
      field: "d1",
      title: "d111",
      bgColor: "E9AF80",
      children: [{
        field: "d2",
        title: "d222",
        bgColor: "E9AF80",
      }, {
        field: "d3",
        title: "d333",
        bgColor: "E9AF80",
      }, {
        field: "d4",
        title: "d444",
        bgColor: "E9AF80",
      }]
    }],
    data: [{
      c2: 1,
      c3: 2,
      c4: 3,
      d2: 1,
      d3: 2,
      d4: 3
    }]
  }]);
  downLoadExcel.down("测试");
};

</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DownExcel",
});
</script>

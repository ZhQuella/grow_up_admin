<template>
  <div class="p-[10px]">
    <pageLayout>
      <template #header>
        <div class="flex justify-between">
          <div></div>
          <div class="pt-[3px]">
            <SearchBar :search="searchList"
                      @search="onTableSeach"/>
            <ColumnBar :columns="columns"
                      @confirm="onColumnsBarConfirm"/>
          </div>
        </div>
      </template>
      <template v-slot:main="{ height }">
        <PerfectTable :height="height"
                      :columns="columns"
                      :data="data"
                      ref="tableRef"/>
      </template>
      <template #footer>
        <div :span="12" class="flex justify-end pt-[10px]">
          <el-pagination v-model:current-page="page"
                        v-model:page-size="size"
                        :page-sizes="pageSizes"
                        :layout="layout"
                        :total="total"
                        small/>
        </div>
      </template>
    </pageLayout>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTable } from "hooks/useTable";
import ColumnBar from "components/public/ColumnBar/index.vue";
import { Delete, DataViewAlt } from "@vicons/carbon";
import SearchBar from "components/public/SearchBar/index.vue";
import PerfectTable from "components/public/PerfectTable/index.vue";


const tableRef = ref();

const { 
  pageSizes,
  page,
  size,
  layout,
  total
} = useTable();

const onTableSeach = (data: any) => { 
  console.log(data);
};

const searchList = [{
  "elType": "el-input",
  "labelText": "导入文件ID1",
  "model": "fileId1",
  "placeholder": "请输入文件ID1"
},{
  "elType": "el-input",
  "labelText": "导入文件ID2",
  "model": "fileId2",
  "placeholder": "请输入文件ID2"
},{
  "elType": "el-input",
  "labelText": "导入文件ID3",
  "model": "fileId3",
  "placeholder": "请输入文件ID3"
},{
  "elType": "el-input",
  "labelText": "导入文件ID4",
  "model": "fileId4",
  "placeholder": "请输入文件ID4"
},{
  "elType": "el-input",
  "labelText": "导入文件ID5",
  "model": "fileId5",
  "placeholder": "请输入文件ID5"
},{
  "elType": "el-input",
  "labelText": "导入文件ID",
  "model": "fileId",
  "placeholder": "请输入文件ID"
},{
  "elType": "el-input",
  "labelText": "导入文件ID6",
  "model": "fileId6",
  "placeholder": "请输入文件ID6"
},{
  "elType": "el-date-picker",
  "labelText": "日期区间",
  "model": "seles.create.date",
  "type": "daterange",
  "start-placeholder": "开始日期",
  "end-placeholder": "结束日期",
  "value-format": "YYYY-MM-DD"
}, {
  "collapseTags": true,
  "requestConfig": {
    "method": "get",
    "url": "/system/dict/data/type/sys_yes_no_number"
  },
  "elType": "el-select",
  "labelText": "是否清洗",
  "multiple": true,
  "model": "cleanSignList",
  "label": "dictLabel",
  "placeholder": "请选择是否清洗",
  "value": "dictValue",
  "noDataText": "暂无数据",
  "options": [
    {
      "dictLabel": "是",
      "dictValue": "1",
    },
    {
      "dictLabel": "否",
      "dictValue": "0",
    }
  ]
}];

const columns = [{
  field: "serial",
  title: "序号"
},{
  field: "date",
  title: "日期"
},{
  field: "name",
  title: "名称"
},{
  field: "state",
  title: "状态"
},{
  field: "city",
  title: "城市"
},{
  field: "address",
  title: "地址",
  "show-overflow-tooltip": true
},{
  field: "zip",
  title: "编号"
}, {
  field: "operate",
  title: "操作"
}];

const data = [
  {
    id: 1,
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    id: 2,
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    id: 3,
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    id: 5,
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    id: 6,
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    id: 7,
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    id: 8,
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    id: 9,
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    id: 10,
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  }
];

const onColumnsBarConfirm = (columns: any[]) => { 
  tableRef.value.setColumns(columns);
};

</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ElBaseList"
});
</script>

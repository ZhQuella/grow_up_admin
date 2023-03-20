<template>
  <div class="p-[10px]">
    <pageLayout>
      <template #header>
        <div class="flex justify-between">
          <div class="pt-[8px]">
            <ButtonGroup :button-group="optionGroup" :max="5" showText/>
          </div>
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
                      ref="tableRef"
                      @select="onPerfectTableSelect">
          <template #btnOption="data">
            <ButtonGroup :button-group="buttonGroup" :max="4" :data="data"/>
          </template>
        </PerfectTable>
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
import { ref, computed, reactive } from "vue";
import { useTable } from "hooks/useTable";
import ColumnBar from "components/public/ColumnBar/index.vue";
import { Delete, DataViewAlt } from "@vicons/carbon";
import SearchBar from "components/public/SearchBar/index.vue";
import PerfectTable from "components/public/PerfectTable/index.vue";
import ButtonGroup from "components/public/ButtonGroup/index.vue";

const tableRef = ref();
const state = reactive({
  selectList: []
});

// ~ 表格操作配置
const buttonGroup = computed(() => [{
  title: "详情",
  type: "primary",
  icon: "DataViewAlt",
  func: (row: any) => { 
    console.log(row,1);
  },
  authority: "LIST_PAGE:EL_BASE_LIST:VIEW"
}, {
  title: "删除",
  type: "danger",
  icon: "Delete",
  func: (row: any) => { 
    console.log(row, 2);
  },
  authority: "LIST_PAGE:EL_BASE_LIST:VIEW"
}, {
  title: "报表",
  type: "success",
  icon: "ChartEvaluation",
  func: (row: any) => { 
    console.log(row, 3);
  },
  color: "#626aef",
  authority: "LIST_PAGE:EL_BASE_LIST:REPORT"
}, {
  title: "其他",
  type: "warning",
  icon: "WarningOther",
  func: (row: any) => { 
    console.log(row, 4);
  },
  color: "#626aef",
  authority: "LIST_PAGE:EL_BASE_LIST:REPORT",
  disabled: () => { 
    return true;
  }
}]);

// ~ 表格批量操作配置
const optionGroup = computed(() => [ {
  title: "批量删除",
  type: "danger",
  icon: "Delete",
  func: (row: any) => { 
    console.log(tableRef.value, 2);
  },
  authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
  disabled: () => { 
    return !state.selectList.length;
  }
}]);

const { 
  pageSizes,
  page,
  size,
  layout,
  total
} = useTable();

// ~ 查询条件配置
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

// ~ 表头配置
const columns = [{
  field: "serial",
  title: "序号"
},{
  field: "date",
  title: "日期",
  "show-overflow-tooltip": true
},{
  field: "name",
  title: "名称",
  "show-overflow-tooltip": true
},{
  field: "state",
  title: "状态",
  "show-overflow-tooltip": true
},{
  field: "city",
  title: "城市",
  "show-overflow-tooltip": true
},{
  field: "address",
  title: "地址",
  "show-overflow-tooltip": true
},{
  field: "zip",
  title: "编号",
  "show-overflow-tooltip": true
}, {
  field: "operate",
  title: "操作",
  fixed: "right",
  width: "160px"
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

const onTableSeach = (data: any) => { 
  console.log(data);
};

const onPerfectTableSelect = (data: any[]) => { 
  state.selectList = data;
};

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

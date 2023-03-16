<template>
  <div class="p-[10px]">
    <pageLayout>
      <template #header>
        <div class="flex justify-between">
          <div></div>
          <div class="pt-[3px]">
            <SearchBar :search="searchList"
                      @search="onTableSeach"/>
          </div>
        </div>
      </template>
      <template v-slot:main="{ height }">
        <el-table :height="height" 
                  border 
                  :data="[...data,...data]">
          <el-table-column fixed prop="date" label="日期" width="240" />
          <el-table-column prop="name" label="名称" width="260" />
          <el-table-column prop="state" label="状态" width="360" />
          <el-table-column prop="city" label="城市" width="320" />
          <el-table-column prop="address" label="地址" width="400" />
          <el-table-column prop="zip" label="Zip" width="120"/>
          <el-table-column fixed="right" label="操作" width="80">
            <template #default>
              <el-button link
                        type="primary"
                        :icon="DataViewAlt"></el-button>
              <el-button link
                        type="danger"
                        :icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
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
import { useTable } from "hooks/useTable";
import { Delete, DataViewAlt } from "@vicons/carbon";
import SearchBar from "components/public/SearchBar/index.vue";

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
  "labelText": "导入文件ID",
  "model": "fileId",
  "placeholder": "请输入文件ID"
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

const data = [
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  }
];

</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ElBaseList"
});
</script>

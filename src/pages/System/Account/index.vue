<template>
  <div class="p-[10px]">
    <pageLayout>
      <template #aside>
        <div class="h-full">
          <div class="p-[5px] border-b-[1px] border-[var(--el-border-color)] border-solid flex">
            <el-input placeholder="请输入部门名称" />
            <el-dropdown>
              <el-button
                icon="ChevronDown"
                link
                class="outline-none outline-0 text-[var(--el-border-color)] px-[5px text-[20px] font-bold"
              />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>展开全部</el-dropdown-item>
                  <el-dropdown-item>收起全部</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <el-scrollbar style="height: calc(100% - 43px);">
            <el-tree
              :data="treeData"
              :props="defaultProps"
            />
          </el-scrollbar>
        </div>
      </template>

      <template #header>
        <div class="flex justify-between">
          <div class="pt-[8px]">
            <ButtonGroup
              :button-group="optionGroup"
              :max="5"
              show-text
            />
          </div>
          <div class="pt-[3px]">
            <SearchBar
              :search="searchList"
              @search="onTableSeach"
            />
            <ColumnBar
              :columns="columns"
              @confirm="onColumnsBarConfirm"
            />
          </div>
        </div>
      </template>
      <template #main="{ height }">
        <PerfectTable
          ref="tableRef"
          :height="height"
          :columns="columns"
          :data="data"
          @select="onPerfectTableSelect"
        >
          <template #btnOption="btnOption">
            <ButtonGroup
              :button-group="buttonGroup"
              :max="4"
              :data="btnOption"
            />
          </template>
        </PerfectTable>
      </template>
      <template #footer>
        <div
          :span="12"
          class="flex justify-end pt-[10px]"
        >
          <el-pagination
            v-model:current-page="page"
            v-model:page-size="size"
            :page-sizes="pageSizes"
            :layout="layout"
            :total="total"
            small
          />
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

interface Tree {
  label: string
  children?: Tree[]
}

const tableRef = ref();
const state = reactive({
  selectList: [],
});

// ~ 表格操作配置
const buttonGroup = computed(() => [
  {
    title: "详情",
    type: "primary",
    icon: "DataViewAlt",
    func: (row: any) => {
      console.log(row, 1);
    },
    authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
  },
  {
    title: "修改",
    type: "warning",
    icon: "EditOutlined",
    func: (row: any) => {
      console.log(row, 4);
    },
    color: "#626aef",
    authority: "LIST_PAGE:EL_BASE_LIST:REPORT",
    disabled: () => {
      return true;
    },
  },
  {
    title: "删除",
    type: "danger",
    icon: "Delete",
    func: (row: any) => {
      console.log(row, 2);
    },
    authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
  },
  {
    title: "停用",
    type: "danger",
    icon: "WarningOutlined",
    func: (row: any) => {
      console.log(row, 2);
    },
    authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
  },
  {
    title: "启用",
    type: "success",
    icon: "RocketOutlined",
    func: (row: any) => {
      console.log(row, 2);
    },
    authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
  },
  {
    title: "重置密码",
    type: "danger",
    icon: "ResetAlt",
    func: (row: any) => {
      console.log(row, 2);
    },
    authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
  }
]);


// ~ 表格批量操作配置
const optionGroup = computed(() => [
  {
    title: "批量删除",
    type: "danger",
    icon: "Delete",
    func: (row: any) => {
      console.log(tableRef.value, 2);
    },
    authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
    disabled: () => {
      return !state.selectList.length;
    },
  },
]);

const { pageSizes, page, size, layout, total } = useTable();

// ~ 查询条件配置
const searchList = [
  {
    elType: "el-input",
    labelText: "导入文件ID1",
    model: "fileId1",
    placeholder: "请输入文件ID1",
  },
  {
    elType: "el-input",
    labelText: "导入文件ID2",
    model: "fileId2",
    placeholder: "请输入文件ID2",
  },
  {
    elType: "el-input",
    labelText: "导入文件ID3",
    model: "fileId3",
    placeholder: "请输入文件ID3",
  },
  {
    elType: "el-input",
    labelText: "导入文件ID4",
    model: "fileId4",
    placeholder: "请输入文件ID4",
  },
  {
    elType: "el-input",
    labelText: "导入文件ID5",
    model: "fileId5",
    placeholder: "请输入文件ID5",
  },
  {
    elType: "el-input",
    labelText: "导入文件ID",
    model: "fileId",
    placeholder: "请输入文件ID",
  },
  {
    elType: "el-input",
    labelText: "导入文件ID6",
    model: "fileId6",
    placeholder: "请输入文件ID6",
  },
  {
    elType: "el-date-picker",
    labelText: "日期区间",
    model: "seles.create.date",
    type: "daterange",
    "start-placeholder": "开始日期",
    "end-placeholder": "结束日期",
    "value-format": "YYYY-MM-DD",
  },
  {
    collapseTags: true,
    requestConfig: {
      method: "get",
      url: "/system/dict/data/type/sys_yes_no_number",
    },
    elType: "el-select",
    labelText: "是否清洗",
    multiple: true,
    model: "cleanSignList",
    label: "dictLabel",
    placeholder: "请选择是否清洗",
    value: "dictValue",
    noDataText: "暂无数据",
    options: [
      {
        dictLabel: "是",
        dictValue: "1",
      },
      {
        dictLabel: "否",
        dictValue: "0",
      },
    ],
  },
];

// ~ 表头配置
const columns = [
  {
    field: "serial",
    title: "序号",
  },
  {
    field: "zip11",
    title: "用户名",
    "show-overflow-tooltip": true,
  },
  {
    field: "zip8",
    title: "昵称",
    "show-overflow-tooltip": true,
  },
  {
    field: "zip7",
    title: "角色名称",
    "show-overflow-tooltip": true,
  },
  {
    field: "zip6",
    title: "归属",
    "show-overflow-tooltip": true,
    visible: false,
    children: [{
      field: "zip5",
      title: "归属人",
      "show-overflow-tooltip": true,
      visible: false
    },
    {
      field: "zip4",
      title: "所属部门",
      "show-overflow-tooltip": true,
      visible: false
    },
    { 
      field: "zip3",
      title: "所属岗位",
      "show-overflow-tooltip": true,
      visible: false
    }]
  },
  {
    field: "zip2",
    title: "创建方式",
    "show-overflow-tooltip": true,
  },
  {
    field: "zip1",
    title: "创建日期",
    "show-overflow-tooltip": true,
  },
  {
    field: "operate",
    title: "操作",
    fixed: "right",
    width: "200px",
  },
];

const data = [
  {
    id: 1,
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    id: 2,
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    id: 3,
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    id: 4,
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    id: 5,
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    id: 6,
    date: "2016-05-03",
    name3: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    id: 7,
    date: "2016-05-01",
    name2: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    id: 8,
    date: "2016-05-02",
    name1: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    id: 9,
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    id: 10,
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
];

const treeData: Tree[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
];

const defaultProps = {
  children: 'children',
  label: 'label',
}

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
  name: "AccountManagement",
});
</script>

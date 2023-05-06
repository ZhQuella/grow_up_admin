import type { Ref } from "vue";
import { computed, reactive, onMounted, unref } from "vue";
import * as ElementPlus from "element-plus";
import request from "api/systemMent";

interface props {
  tableTotal: Ref<number>;
  accountStates: Ref<any[]>;
  page: Ref<number>;
  size: Ref<number>;
}


export const useTableOption = ({ 
  tableTotal,
  accountStates,
  page,
  size
}: props) => { 

  const roleRequest = request.create("roleMent");
  const state = reactive({
    tableList: []
  });

  const tableList = computed(() => {
    return state.tableList;
  });

  const tableColumns = computed(() => [
    {
      field: "serial",
      title: "序号",
      fixed: "left"
    },
    {
      field: "roleName",
      title: "角色名称",
      "show-overflow-tooltip": true,
      width: 120
    },
    {
      field: "state",
      title: "状态",
      "show-overflow-tooltip": true,
      width: 120,
      formatter: (space: any) => { 
        const item = accountStates.value.find((el) => el.code === space.state);
        const type = ["danger", "success"][item.code] as "success" | "danger";
        return [
          <ElementPlus.ElTag type={ type }>
            { item.label }
          </ElementPlus.ElTag>
        ];
      }
    },
    {
      field: "roleCode",
      title: "角色编码",
      "show-overflow-tooltip": true,
      width: 200
    },
    {
      field: "memberNum",
      title: "角色成员数",
      "show-overflow-tooltip": true,
      width: 120,
      formatter: (row: any) => { 
        return [
          <ElementPlus.ElLink>{ row.memberNum }</ElementPlus.ElLink>
        ]
      }
    },
    {
      field: "roleMark",
      title: "角色描述",
      "show-overflow-tooltip": true
    },
    {
      field: "createTime",
      title: "创建时间",
      "show-overflow-tooltip": true,
      width: 200
    },
    {
      field: "updataTime",
      title: "更新时间",
      "show-overflow-tooltip": true,
      width: 200
    },
    {
      field: "operate",
      title: "操作",
      fixed: "right",
      width: "200px"
    }
  ]);

  const getRoleList = async () => {
    const searchDdata = {};
    const { data, total } = await roleRequest.getRoleList({
      data: searchDdata,
      params: { page: unref(page), size: unref(size) }
    });
    state.tableList = data;
    tableTotal.value = total;
  };

  onMounted(async () => {
    await getRoleList();
  });

  return {
    tableList,
    tableColumns,
    getRoleList
  }
};

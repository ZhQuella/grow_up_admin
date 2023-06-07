import type { Ref, ComputedRef } from "vue";
import type { Tree } from "types/Tree";
import type { Column } from "types/TableColumn";
import type { DictItem } from "types/Dict";
import type { RoleItem } from "../types/index";
import { computed, reactive, onMounted, unref } from "vue";
import * as ElementPlus from "element-plus";
import request from "api/systemMent";

interface props {
  tableTotal: Ref<number>;
  roleStates: Ref<DictItem[]>;
  roleTypes: Ref<DictItem[]>;
  page: Ref<number>;
  size: Ref<number>;
}

interface tableOption {
  onTreeNodeClick: Fn;
  tableList: ComputedRef<RoleItem[]>;
  tableColumns: ComputedRef<Column[]>;
  getRoleList: Fn;
}

type stateType = "success" | "danger";
type roleType = "" | "warning";

export const useTableOption = ({
  tableTotal,
  roleStates,
  page,
  size,
  roleTypes
}: props): tableOption => {
  const roleRequest = request.create("roleMent");
  const searchData = reactive<any>({});
  const state: { tableList: RoleItem[] } = reactive({
    tableList: []
  });

  const tableList: ComputedRef<RoleItem[]> = computed(() => {
    return state.tableList;
  });

  const tableColumns: ComputedRef<Column[]> = computed(() => [
    {
      field: "serial",
      title: "序号",
      fixed: "left"
    },
    {
      field: "roleName",
      title: "角色名称",
      showOverflowTooltip: true,
      width: 120
    },
    {
      field: "roleCode",
      title: "角色编码",
      visible: false,
      showOverflowTooltip: true,
      width: 200
    },
    {
      field: "authorityChart",
      title: "权限字符",
      showOverflowTooltip: true,
      width: 200
    },
    {
      field: "roleType",
      title: "角色类型",
      showOverflowTooltip: true,
      width: 140,
      formatter: (space: any) => {
        const item = roleTypes.value.find((el) => el.code === space.state);
        const type = ["", "warning"][Number(item?.code)] as roleType;
        return [<ElementPlus.ElTag type={type}>{item?.label}</ElementPlus.ElTag>];
      }
    },
    {
      field: "state",
      title: "状态",
      showOverflowTooltip: true,
      width: 120,
      formatter: (space: any) => {
        const item = roleStates.value.find((el) => el.code === space.state);
        const type = ["danger", "success"][Number(item?.code)] as stateType;
        return [<ElementPlus.ElTag type={type}>{item?.label}</ElementPlus.ElTag>];
      }
    },
    {
      field: "memberNum",
      title: "角色成员数",
      showOverflowTooltip: true,
      width: 120,
      formatter: (row: any) => {
        return [<ElementPlus.ElLink>{row.memberNum}</ElementPlus.ElLink>];
      }
    },
    {
      field: "roleMark",
      title: "角色描述",
      showOverflowTooltip: true
    },
    {
      field: "createTime",
      title: "创建时间",
      showOverflowTooltip: true,
      width: 200
    },
    {
      field: "updataTime",
      title: "更新时间",
      showOverflowTooltip: true,
      width: 200
    },
    {
      field: "operate",
      title: "操作",
      fixed: "right",
      width: 200
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

  const onTreeNodeClick = async (item: Tree) => {
    searchData.deptId = item.id;
    await getRoleList();
  };

  onMounted(async () => {
    await getRoleList();
  });

  return {
    onTreeNodeClick,
    tableList,
    tableColumns,
    getRoleList
  };
};

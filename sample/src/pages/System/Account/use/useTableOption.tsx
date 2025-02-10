import type { Tree } from "types/Tree";
import type { DictItem } from "types/Dict";
import type { Column } from "types/TableColumn";
import type { Ref, ComputedRef, UnwrapNestedRefs } from "vue";
import type { Fn } from "types/index";
import type { AccountItem } from "../types/index";
import { reactive, onMounted, computed, ref, unref } from "vue";
import request from "api/systemMent";
import { ElTag } from "element-plus";

export interface TableOptionProps {
  tableTotal: Ref<number>;
  accountStates: Ref<DictItem[]>;
  page: Ref<number>;
  size: Ref<number>;
}

interface SearchType {
  account?: string;
  cleanSignList?: ("0" | "1")[];
  createDate?: string[];
  deptId?: string;
}

export interface TableOption {
  searchData: Ref<SearchType>;
  tableLoading: Ref<boolean>;
  tableList: ComputedRef<AccountItem[]>;
  tableColumns: ComputedRef<Column[]>;
  onTreeNodeClick: Fn;
  getAccountList: Fn;
}

export interface TableState {
  tableList: ComputedRef<AccountItem[]>;
}

export const useTableOption = ({
  tableTotal,
  accountStates,
  page,
  size
}: TableOptionProps): TableOption => {
  const tableLoading: Ref<boolean> = ref(false);
  const accountMethod = request.create("accountMent");
  const searchData: Ref<SearchType> = ref<SearchType>({});
  const treeValue: Ref<string> = ref("");
  const state: UnwrapNestedRefs<{ tableList: AccountItem[] }> = reactive({
    tableList: []
  });

  // ~ 表头配置
  const tableColumns: ComputedRef<Column[]> = computed(() => [
    {
      field: "serial",
      title: "序号",
      fixed: "left"
    },
    {
      field: "account",
      title: "账号",
      showOverflowTooltip: true,
      width: 120
    },
    {
      field: "state",
      title: "状态",
      showOverflowTooltip: true,
      width: 120,
      formatter: (space: any): any[] => {
        const item: DictItem = accountStates.value.find(
          (el: DictItem): boolean => el.code === space.state
        );
        if (!item) return [];
        const type: "danger" | "success" = ["danger", "success"][Number(item.code)] as
          | "success"
          | "danger";
        return [<ElTag type={type}>{item.label}</ElTag>];
      }
    },
    {
      field: "forbidCause",
      title: "停用原因",
      showOverflowTooltip: true,
      width: 100,
      visible: false
    },
    {
      field: "roleNames",
      title: "角色名称",
      showOverflowTooltip: true
    },
    {
      field: "belong",
      title: "归属",
      showOverflowTooltip: true,
      visible: false,
      children: [
        {
          field: "belong.person",
          title: "归属人",
          showOverflowTooltip: true,
          width: 150,
          visible: false
        },
        {
          field: "belong.department",
          title: "所属部门",
          showOverflowTooltip: true,
          width: 150,
          visible: false
        },
        {
          field: "belong.post",
          title: "所属岗位",
          showOverflowTooltip: true,
          width: 150,
          visible: false
        }
      ]
    },
    {
      field: "createType",
      title: "创建方式",
      showOverflowTooltip: true,
      width: 100
    },
    {
      field: "createDate",
      title: "创建日期",
      showOverflowTooltip: true
    },
    {
      field: "remarks",
      title: "备注",
      showOverflowTooltip: true,
      width: 140
    },
    {
      field: "operate",
      title: "操作",
      fixed: "right",
      width: 200
    }
  ]);

  const tableList: ComputedRef<AccountItem[]> = computed(() => {
    return state.tableList;
  });

  const getAccountList = async (): Promise<void> => {
    tableLoading.value = true;
    const { accountList, total } = await accountMethod.getAccountList({
      data: {
        ...searchData.value,
        deptId: treeValue.value
      },
      params: { page: unref(page), size: unref(size) }
    });
    state.tableList = accountList;
    tableTotal.value = total;
    tableLoading.value = false;
  };

  const onTreeNodeClick = async (item: Tree): Promise<void> => {
    if (treeValue.value !== item.id) {
      treeValue.value = item.id;
    } else {
      treeValue.value = "";
    }
    await getAccountList();
  };

  onMounted(async (): Promise<void> => {
    await getAccountList();
  });

  return {
    searchData,
    tableLoading,
    tableList,
    tableColumns,
    onTreeNodeClick,
    getAccountList
  };
};

import type { Tree } from "types/Tree"; 
import type { Ref } from "vue";
import { reactive, onMounted, computed, h } from "vue";
import request from "api/systemMent";
import { ElTag } from "element-plus";

interface props { 
  tableTotal: Ref<number>;
}

export const useTableOption = ({ 
  tableTotal
}: props) => { 

  const accountMethod = request.create("accountMent");
  const searchData = reactive<any>({});
  const state = reactive({
    tableList: []
  });
  
  // ~ 表头配置
  const tableColumns = [
    {
      field: "serial",
      title: "序号",
      fixed: "left"
    },
    {
      field: "account",
      title: "账号",
      "show-overflow-tooltip": true,
    },
    {
      field: "state",
      title: "状态",
      "show-overflow-tooltip": true,
      formatter: (space: any): any[] => {
        const contextMap = ["停用", "启用"];
        const type = space.state === '0' ? 'danger' : 'success';
        return [
          h(ElTag, {
            type
          }, contextMap[space.state])
        ]
      }  
    },
    {
      field: "forbidCause",
      title: "停用原因",
      "show-overflow-tooltip": true,
      width: 100,
      visible: false
    },
    {
      field: "roleName",
      title: "角色名称",
      "show-overflow-tooltip": true,
      width: 100
    },
    {
      field: "belong",
      title: "归属",
      "show-overflow-tooltip": true,
      children: [{
        field: "belong.person",
        title: "归属人",
        "show-overflow-tooltip": true,
        width: 150
      },
      {
        field: "belong.department",
        title: "所属部门",
        "show-overflow-tooltip": true,
        width: 150
      },
      { 
        field: "belong.post",
        title: "所属岗位",
        "show-overflow-tooltip": true,
        width: 150
      }]
    },
    {
      field: "createType",
      title: "创建方式",
      "show-overflow-tooltip": true,
      width: 100
    },
    {
      field: "createDate",
      title: "创建日期",
      "show-overflow-tooltip": true,
      width: 100
    },
    {
      field: "remarks",
      title: "备注",
      "show-overflow-tooltip": true,
      width: 140
    },
    {
      field: "operate",
      title: "操作",
      fixed: "right",
      width: "200px",
    },
  ];

  const tableList = computed(() => { 
    return state.tableList;
  })

  const onTreeNodeClick = (item: Tree) => { 
    searchData.deptId = item.id;
  };

  const getAccountList = async () => { 
    const { accountList, total } = await accountMethod.getAccountList();
    state.tableList = accountList;
    tableTotal.value = total;
  };

  onMounted(async () => {
    await getAccountList();
  });

  return {
    tableList,
    tableColumns,
    onTreeNodeClick
  }

}

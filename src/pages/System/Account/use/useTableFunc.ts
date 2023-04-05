import { computed, ref, reactive } from "vue";

export const useTableFunc = () => { 

  const dialogConfig = reactive({
    visible: false,
    conmponetName: "",
    title: "",
    data: {}
  })

  // ~ 表格操作配置
  const buttonGroup = computed(() => [
    {
      title: "详情",
      type: "primary",
      icon: "DataViewAlt",
      func: ({ row }: any) => {
        const { account } = row;
        dialogConfig.visible = true;
        dialogConfig.title = `${account} 详情`;
        dialogConfig.conmponetName = "AccountInfo";
        dialogConfig.data = row;
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
      disabled: (space:any):boolean => {
        return space.row.state !== "0";
      }
    },
    {
      title: "删除",
      type: "danger",
      icon: "Delete",
      func: (row: any) => {
        console.log(row, 2);
      },
      disabled: (space: any): boolean => {
        return space.row.state !== "0";
      },
      authority: "LIST_PAGE:EL_BASE_LIST:VIEW"
    },
    {
      title: "停用",
      type: "danger",
      icon: "WarningOutlined",
      func: (row: any) => {
        console.log(row, 2);
      },
      authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
      show: (space: any): boolean => { 
        return space.row.state !== "0"
      }
    },
    {
      title: "启用",
      type: "success",
      icon: "RocketOutlined",
      func: (row: any) => {
        console.log(row, 2);
      },
      authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
      show: (space: any): boolean => { 
        return space.row.state === "0"
      }
    },
    {
      title: "重置密码",
      type: "danger",
      icon: "ResetAlt",
      func: (row: any) => {
        console.log(row, 2);
      },
      authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
    },
    {
      title: "解绑",
      type: "warning",
      icon: "HeatMap02",
      func: (row: any) => {
        console.log(row, 2);
      },
      authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
    },
    {
      title: "账号历史",
      type: "primary",
      icon: "ChartHistogram",
      func: (row: any) => {
        console.log(row, 2);
      },
      authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
    }
  ]);
  
  
  // ~ 表格批量操作配置
  const optionGroup = computed(() => [
    {
      title: "新增",
      type: "success",
      icon: "Add",
      authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
      func: () => {
        dialogConfig.visible = true;
        dialogConfig.title = `新增账号`;
        dialogConfig.conmponetName = "AccountCreate";
        dialogConfig.data = {};
      },
    },
    {
      title: "批量删除",
      type: "danger",
      icon: "Delete",
      func: (row: any) => {
        // console.log(tableRef.value, 2);
      },
      authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
      disabled: () => {
        // return !state.selectList.length;
      },
    },
  ]);

  const onDialogClose = () => { 
    dialogConfig.visible = false;
    dialogConfig.title = "";
    dialogConfig.conmponetName = "";
    dialogConfig.data = {};
  };

  return {
    dialogConfig,
    buttonGroup,
    optionGroup,
    onDialogClose
  };
};


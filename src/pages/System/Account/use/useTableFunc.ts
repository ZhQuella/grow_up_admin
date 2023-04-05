import { computed, ref } from "vue";

export const useTableFunc = () => { 

  const visible = ref(false);

  // ~ 表格操作配置
  const buttonGroup = computed(() => [
    {
      title: "详情",
      type: "primary",
      icon: "DataViewAlt",
      func: (row: any) => {
        visible.value = true;
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
        // console.log(tableRef.value, 2);
      },
      authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
      disabled: () => {
        // return !state.selectList.length;
      },
    },
  ]);

  return {
    visible,
    buttonGroup,
    optionGroup
  };
};


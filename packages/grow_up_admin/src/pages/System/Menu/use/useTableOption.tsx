import type { ComputedRef } from "vue";
import type { Column } from "types/TableColumn";
import {computed} from "vue";

export const useTableOption = () => {


  const tableColumns: ComputedRef<Column[]> = computed(() => [
    {
      field: "menuName",
      title: "菜单名称",
      showOverflowTooltip: true
    },
    {
      field: "menuType",
      title: "菜单类型",
      showOverflowTooltip: true
    },
    {
      field: "authorityChart",
      title: "权限标识",
      showOverflowTooltip: true
    },
    {
      field: "icon",
      title: "图标",
      showOverflowTooltip: true,
      width: 120
    },
    {
      field: "path",
      title: "路由地址",
      showOverflowTooltip: true
    },
    {
      field: "isShow",
      title: "是否显示",
      showOverflowTooltip: true,
      width: 120
    },
    {
      field: "custom",
      title: "是否自定义",
      showOverflowTooltip: true,
      width: 120
    },
    {
      field: "name",
      title: "组件名称",
      showOverflowTooltip: true
    },
    {
      field: "component",
      title: "组件地址",
      showOverflowTooltip: true
    },
    {
      field: "createTime",
      title: "创建时间",
      visible: false,
      showOverflowTooltip: true,
      width: 120
    },
    {
      field: "updateTime",
      title: "更新时间",
      visible: false,
      showOverflowTooltip: true,
      width: 120
    },
    {
      field: "operate",
      title: "操作",
      fixed: "right",
      width: 200
    }
  ]);

  return {
    tableColumns
  };
}

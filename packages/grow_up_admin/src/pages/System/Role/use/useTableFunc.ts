import type { Ref } from "vue";
import type { GroupBtn } from "types/ButtonGroup";
import { ref, computed, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

interface Prop {
  getRoleList: Fn;
  page: Ref<number>;
  size: Ref<number>;
}

export const useTableFunc = ({ getRoleList, page, size }: Prop) => {
  const tableRef = ref(null);
  const drawerConfig = reactive({
    visible: false,
    conmponetName: "",
    size: "",
    title: "",
    data: {}
  });
  const dialogConfig = reactive({
    visible: false,
    conmponetName: "",
    width: "",
    title: "",
    data: {}
  });

  const buttonGroup = computed(
    () =>
      [
        {
          title: "详情",
          type: "primary",
          icon: "DataViewAlt",
          func: ({ row }: any) => {
            const { roleName } = row;
            drawerConfig.visible = true;
            drawerConfig.title = `${roleName} 详情`;
            drawerConfig.conmponetName = "InfoRole";
            drawerConfig.data = row;
            drawerConfig.size = "800px";
          },
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW"
        },
        {
          title: "修改",
          type: "primary",
          icon: "EditOutlined",
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
          func: ({ row }): void => {
            const { roleName } = row;
            dialogConfig.visible = true;
            dialogConfig.title = `${roleName} 角色修改`;
            dialogConfig.conmponetName = "ModifyRole";
            dialogConfig.data = row;
            dialogConfig.width = "600px";
          }
        },
        {
          title: "删除",
          type: "danger",
          icon: "Delete",
          func: ({ row }: any) => {},
          disabled: (space: any): boolean => {
            return space.row.state !== "0";
          },
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW"
        },
        {
          title: "停用",
          type: "danger",
          icon: "AiStatusFailed",
          func: async ({ row }: any) => {},
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
          show: (space: any): boolean => {
            return space.row.state !== "0";
          }
        },
        {
          title: "启用",
          type: "success",
          icon: "AiStatusComplete",
          func: async (row: any) => {},
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
          show: (space: any): boolean => {
            return space.row.state === "0";
          }
        },
        {
          title: "解绑",
          type: "warning",
          icon: "HeatMap02",
          func: ({ row }: any) => {},
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW"
        },
        {
          title: "功能权限",
          type: "primary",
          icon: "IdManagement",
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
          func: ({ row }): void => {
            const { roleName } = row;
            drawerConfig.visible = true;
            drawerConfig.title = `${roleName} 功能权限`;
            drawerConfig.conmponetName = "permissionControl";
            drawerConfig.data = null;
            drawerConfig.size = "800px";
          }
        },
        {
          title: "数据权限",
          type: "primary",
          icon: "DataViewAlt",
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
          func: ({ row }): void => {
            // const { roleName } = row;
            // drawerConfig.visible = true;
            // drawerConfig.title = `${roleName} 数据权限`;
            // drawerConfig.conmponetName = "CreatePermission";
            // drawerConfig.data = null;
          }
        },
        {
          title: "角色历史",
          type: "success",
          icon: "ChartHistogram",
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
          func: ({ row }): void => {
            // const { roleName } = row;
            // drawerConfig.visible = true;
            // drawerConfig.title = `${roleName} 数据权限`;
            // drawerConfig.conmponetName = "CreatePermission";
            // drawerConfig.data = null;
          }
        }
      ] as GroupBtn[]
  );

  const optionGroup = computed(() => [
    {
      title: "新增",
      type: "success",
      icon: "Add",
      authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
      func: (): void => {
        dialogConfig.visible = true;
        dialogConfig.title = `新增角色`;
        dialogConfig.conmponetName = "CreateRole";
        dialogConfig.data = null;
        dialogConfig.width = "600px";
      }
    },
    {
      title: "批量删除",
      type: "danger",
      icon: "Delete",
      func: async (): Promise<void> => {},
      authority: "LIST_PAGE:EL_BASE_LIST:VIEW"
    }
  ]);

  const onCloseDrawer = (): void => {
    drawerConfig.visible = false;
    drawerConfig.title = "";
    drawerConfig.conmponetName = "";
    drawerConfig.data = null;
  };

  const onCloseDialog = () => {
    dialogConfig.visible = false;
    dialogConfig.title = ``;
    dialogConfig.conmponetName = "";
    dialogConfig.data = null;
    dialogConfig.width = "0px";
  };

  const onCurrentChange = (_page: number): void => {
    page.value = _page;
    getRoleList();
  };

  const onSizeChange = (_size: number): void => {
    size.value = _size;
    page.value = 1;
    getRoleList();
  };

  return {
    dialogConfig,
    drawerConfig,
    buttonGroup,
    optionGroup,
    onCloseDialog,
    onCloseDrawer,
    onCurrentChange,
    onSizeChange,
    tableRef
  };
};

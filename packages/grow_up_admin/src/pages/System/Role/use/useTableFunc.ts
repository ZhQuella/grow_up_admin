import type { Ref } from "vue";
import type { GroupBtn } from "types/ButtonGroup";
import type { RoleItem, OutServiceData } from "../types/index";
import { ref, computed, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import axios from "api/systemMent";
import to from "await-to-js";

interface Prop {
  getRoleList: Fn;
  page: Ref<number>;
  size: Ref<number>;
}

export const useTableFunc = ({ getRoleList, page, size }: Prop) => {

  const tableRef = ref(null);
  const systemMentMethod = axios.create("roleMent");
  const selectList = ref([]);

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

  const buttonGroup = computed(() =>
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
            const { roleName } = row as RoleItem;
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
          func: async ({ row }: any) => {
            const { id } = row as RoleItem;
            await onDeleteAccountByIds([id]);
          },
          disabled: (space: any): boolean => {
            return space.row.state !== "0";
          },
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW"
        },
        {
          title: "停用",
          type: "danger",
          icon: "AiStatusFailed",
          func: async ({ row }: any) => {
            await ElMessageBox.confirm("角色停用所绑定人员将失去所有权限，是否继续？", "温馨提示", {
              confirmButtonText: "删除",
              cancelButtonText: "取消",
              type: "warning"
            });
            const { id } = row as RoleItem;
            const data: OutServiceData = { id, state: "0" };
            await onRoleOutService(data);
            ElMessage({
              type: "success",
              message: "角色停用成功"
            });
          },
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
          show: (space: any): boolean => {
            return space.row.state !== "0";
          }
        },
        {
          title: "启用",
          type: "success",
          icon: "AiStatusComplete",
          func: async (row: any) => {
            await ElMessageBox.confirm("角色启用在使用人员将会赋予其权限，是否继续？", "温馨提示", {
              confirmButtonText: "删除",
              cancelButtonText: "取消",
              type: "warning"
            });
            const { id } = row as RoleItem;
            const data: OutServiceData = { id, state: "0" };
            await onRoleOutService(data);
            ElMessage({
              type: "success",
              message: "角色启用成功"
            });
          },
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
          show: (space: any): boolean => {
            return space.row.state === "0";
          }
        },
        {
          title: "解绑全部",
          type: "warning",
          icon: "HeatMap02",
          func: async ({ row }: any) => {
            const { id } = row as RoleItem;
            await onRoleUniteAll(id);
          },
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
      func: async (): Promise<void> => {
        const ids: number[] = selectList.value.map((el) => el.id);
        await onDeleteAccountByIds(ids);
        selectList.value = [];
        tableRef.value.clearSelect();
      },
      authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
      disabled: () => {
        const disableAccount = selectList.value.filter((el) => el.state === "0");
        return !(disableAccount.length === selectList.value.length) || !selectList.value.length;
      }
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

  const onRoleSuccess = (message: string) => {
    onCloseDialog();
    ElMessage({
      message,
      type: "success"
    });
    page.value = 1;
    getRoleList();
  };

  const onDeleteAccountByIds = async (ids: number[]) => {
    await ElMessageBox.confirm("删除内容无法恢复，是否继续？", "温馨提示", {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning"
    });
    const [error] = await to(systemMentMethod.deleteRoleIds({ data: { ids } }));
    if (error) {
      const { message } = error;
      ElMessage.error(message);
      return;
    }
    ElMessage({
      type: "success",
      message: "删除成功"
    });
    getRoleList();
  };

  const onRoleUniteAll = async (roleId: number) => {
    await ElMessageBox.confirm("解绑所有人员将失去对应角色权限，是否继续？", "温馨提示", {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning"
    });
    const [error] = await to(systemMentMethod.roleUntieAll({ data: { roleId } }));
    if (error) {
      const { message } = error;
      ElMessage.error(message);
      return;
    }
    ElMessage({
      type: "success",
      message: "全部解绑成功"
    });
    await getRoleList();
  }

  const onRoleOutService = async (data: OutServiceData): Promise<void> => {
    const { id, state } = data;
    const [error] = await to(systemMentMethod.roleChangeState({ params: { id }, data: { state } }));
    if (error) {
      const { message } = error;
      ElMessage.error(message);
      return;
    }
    await getRoleList();
  };

  const onPerfectTableSelect = (data: RoleItem[]) => {
    selectList.value = [...data];
  };

  return {
    dialogConfig,
    drawerConfig,
    buttonGroup,
    optionGroup,
    tableRef,
    onCloseDialog,
    onCloseDrawer,
    onCurrentChange,
    onSizeChange,
    onRoleSuccess,
    onPerfectTableSelect
  };
};

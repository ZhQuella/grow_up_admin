import { computed, reactive } from "vue";
import { GroupBtn } from "types/ButtonGroup";
import createDict from "pages/System/Dict/components/createDict.vue"


export const useTableFunc = () => {



  const dialogConfig = reactive({
    visible: false,
    conmponetName: "",
    title: "",
    data: {}
  })

  const buttonGroup = computed(() =>
    [
      {
        title: "详情",
        type: "primary",
        icon: "DataViewAlt",
        func: ({ row }: any) => {
          const { roleName } = row;
          // drawerConfig.visible = true;
          // drawerConfig.title = `${roleName} 详情`;
          // drawerConfig.conmponetName = "InfoRole";
          // drawerConfig.data = row;
          // drawerConfig.size = "800px";
        },
        authority: "LIST_PAGE:EL_BASE_LIST:VIEW"
      },
      {
        title: "修改",
        type: "primary",
        icon: "EditOutlined",
        authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
        func: ({ row }): void => {
          // const { roleName } = row as RoleItem;
          // dialogConfig.visible = true;
          // dialogConfig.title = `${roleName} 角色修改`;
          // dialogConfig.conmponetName = "ModifyRole";
          // dialogConfig.data = row;
          // dialogConfig.width = "600px";
        }
      },
      {
        title: "删除",
        type: "danger",
        icon: "Delete",
        func: async ({ row }: any) => {
          // const { id } = row as RoleItem;
          // await onDeleteAccountByIds([id]);
          // selectList.value = selectList.value.filter(el => {
          //   return el.id !== id;
          // });
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
          // await ElMessageBox.confirm("角色停用所绑定人员将失去所有权限，是否继续？", "温馨提示", {
          //   confirmButtonText: "确认",
          //   cancelButtonText: "取消",
          //   type: "warning"
          // });
          // const { id } = row as RoleItem;
          // const data: OutServiceData = { id, state: "0" };
          // await onRoleOutService(data);
          // ElMessage({
          //   type: "success",
          //   message: "角色停用成功"
          // });
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
          // await ElMessageBox.confirm("角色启用在使用人员将会赋予其权限，是否继续？", "温馨提示", {
          //   confirmButtonText: "删除",
          //   cancelButtonText: "取消",
          //   type: "warning"
          // });
          // const { id } = row as RoleItem;
          // const data: OutServiceData = { id, state: "0" };
          // await onRoleOutService(data);
          // ElMessage({
          //   type: "success",
          //   message: "角色启用成功"
          // });
        },
        authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
        show: (space: any): boolean => {
          return space.row.state === "0";
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
        dialogConfig.title = `新增菜单`;
        dialogConfig.conmponetName = "createDict";
        dialogConfig.data = {}
      }
    }
  ])
  return {
    dialogConfig,
    buttonGroup,
    optionGroup
  }
}
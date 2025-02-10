import type { Ref } from "vue";
import type { GroupBtn } from "types/ButtonGroup";
import to from "await-to-js";
import { computed, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import axios from "api/systemMent";

interface Prop {
  getAccountList: Fn;
  page: Ref<number>;
  size: Ref<number>;
}

export const useTableFunc = ({ getAccountList, page, size }: Prop) => {
  const tableRef = ref();
  const systemMentMethod = axios.create("accountMent");

  const selectList = ref([]);

  const dialogConfig = reactive({
    visible: false,
    conmponetName: "",
    title: "",
    data: {}
  });

  const drawerConfig = reactive({
    visible: false,
    conmponetName: "",
    title: "",
    data: {}
  });

  // ~ 表格操作配置
  const buttonGroup = computed(
    () =>
      [
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
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW"
        },
        {
          title: "修改",
          type: "warning",
          icon: "EditOutlined",
          func: ({ row }: any) => {
            const { account } = row;
            dialogConfig.visible = true;
            dialogConfig.title = `${account} 修改`;
            dialogConfig.conmponetName = "AccountModify";
            dialogConfig.data = row;
          },
          color: "#626aef",
          authority: "LIST_PAGE:EL_BASE_LIST:REPORT",
          disabled: (space: any): boolean => {
            return space.row.state !== "0";
          }
        },
        {
          title: "删除",
          type: "danger",
          icon: "Delete",
          func: async ({ row }: any) => {
            const { id } = row;
            await onDeleteAccountByIds([`${id}`]);
            selectList.value = selectList.value.filter((el) => {
              return el.id !== id;
            });
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
            await ElMessageBox.confirm("账号停用后将无法继续使用，是否继续？", "温馨提示", {
              confirmButtonText: "停用",
              cancelButtonText: "取消",
              type: "warning"
            });
            const ids = [row.id];
            const data = { ids, state: "0" };
            await onAccountChangeState(data);
            getAccountList();
            ElMessage({
              type: "success",
              message: "账号停用成功"
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
          func: async ({ row }: any) => {
            const ids = [row.id];
            const data = { ids, state: "1" };
            await onAccountChangeState(data);
            getAccountList();
            ElMessage({
              type: "success",
              message: "账号启用成功"
            });
          },
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
          show: (space: any): boolean => {
            return space.row.state === "0";
          }
        },
        {
          title: "重置密码",
          type: "danger",
          icon: "ResetAlt",
          func: ({ row }: any) => {
            const { account } = row;
            dialogConfig.visible = true;
            dialogConfig.title = `${account} 重置密码`;
            dialogConfig.conmponetName = "AccountResetPassword";
            dialogConfig.data = row;
          },
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW"
        },
        {
          title: "解绑",
          type: "warning",
          icon: "HeatMap02",
          func: ({ row }: any) => {
            const { id } = row;
            onAccountUnbind([id]);
          },
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW"
        },
        {
          title: "账号历史",
          type: "primary",
          icon: "ChartHistogram",
          func: ({ row }: any) => {
            const { account } = row;
            drawerConfig.visible = true;
            drawerConfig.title = `${account} 历史`;
            drawerConfig.conmponetName = "AccountHistory";
            drawerConfig.data = row;
          },
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW"
        },
        {
          title: "使用记录",
          type: "primary",
          icon: "DirectoryDomain",
          func: ({ row }: any) => {
            const { account } = row;
            drawerConfig.visible = true;
            drawerConfig.title = `${account} 使用记录`;
            drawerConfig.conmponetName = "AccountUseRecord";
            drawerConfig.data = row;
          },
          authority: "LIST_PAGE:EL_BASE_LIST:VIEW"
        }
      ] as GroupBtn[]
  );

  // ~ 表格批量操作配置
  const optionGroup = computed(() => [
    {
      title: "新增",
      type: "success",
      icon: "Add",
      authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
      func: (): void => {
        dialogConfig.visible = true;
        dialogConfig.title = `新增账号`;
        dialogConfig.conmponetName = "AccountCreate";
        dialogConfig.data = {};
      }
    },
    {
      title: "批量删除",
      type: "danger",
      icon: "Delete",
      func: async (): Promise<void> => {
        const ids = selectList.value.map((el) => el.id);
        await onDeleteAccountByIds(ids);
        selectList.value = [];
      },
      authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
      disabled: () => {
        const disableAccount = selectList.value.filter((el) => el.state === "0");
        return !(disableAccount.length === selectList.value.length) || !selectList.value.length;
      }
    },
    {
      title: "批量解绑",
      type: "warning",
      icon: "HeatMap02",
      func: async (): Promise<void> => {
        const ids = selectList.value.map((el) => el.id);
        await onAccountUnbind(ids);
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

  const onDialogClose = () => {
    dialogConfig.visible = false;
    dialogConfig.title = "";
    dialogConfig.conmponetName = "";
    dialogConfig.data = {};
  };

  const onDeleteAccountByIds = async (ids: string[]) => {
    await ElMessageBox.confirm("删除内容无法恢复，是否继续？", "温馨提示", {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning"
    });
    const [error] = await to(systemMentMethod.deleteAccount({ data: { ids } }));
    if (error) {
      const { message } = error;
      ElMessage.error(message);
      return;
    }
    ElMessage({
      type: "success",
      message: "删除成功"
    });
    await getAccountList();
  };

  const onAccountSuccess = (message: string) => {
    message &&
      ElMessage({
        type: "success",
        message
      });
    page.value = 1;
    onDialogClose();
    getAccountList();
  };

  const onAccountChangeState = async (data: any) => {
    const [error] = await to(systemMentMethod.accountChangeState({ data }));
    if (error) {
      return Promise.reject(error);
    }
    return Promise.resolve();
  };

  const onAccountUnbind = async (ids: string[]) => {
    const [messageError] = await to(
      ElMessageBox.confirm("账号解绑后绑定人员将无法继续时候，且无法获知登录人员", "温馨提示", {
        confirmButtonText: "解绑",
        cancelButtonText: "取消",
        type: "warning"
      })
    );
    if (messageError) return Promise.reject();
    const [error] = await to(systemMentMethod.accountUnbind({ data: { ids } }));
    if (error) {
      const { message } = error;
      ElMessage.error(message);
      return Promise.reject();
    }
    ElMessage({
      type: "success",
      message: "解绑成功"
    });
    getAccountList();
  };

  const onDrawerClose = () => {
    drawerConfig.visible = true;
    drawerConfig.title = ``;
    drawerConfig.conmponetName = "AccountInfo";
    drawerConfig.data = {};
  };

  const onCurrentChange = (_page: number) => {
    page.value = _page;
    getAccountList();
  };

  const onSizeChange = (_size: number) => {
    size.value = _size;
    page.value = 1;
    getAccountList();
  };

  return {
    tableRef,
    dialogConfig,
    drawerConfig,
    buttonGroup,
    optionGroup,
    selectList,
    onDrawerClose,
    onDialogClose,
    onAccountSuccess,
    onAccountUnbind,
    onCurrentChange,
    onSizeChange
  };
};

import type { Ref } from "vue";
import type { RolePersonItem } from "../../../types/index";
import { computed, ComputedRef, ref } from "vue";
import { Column } from "types/TableColumn";
import axios from "api/systemMent";
import {UntieRoleData} from "../../../types/index";

interface RequestMethod {
  roleBoundPersons: Fn,
  roleUntieById: Fn,
};

interface Props {
  roleId: ComputedRef<string>,
  emit: Fn
};

export const useTable = ({
 roleId,
 emit
}: Props) => {

  const request: RequestMethod = axios.create("roleMent", ["roleBoundPersons", "roleUntieById"]);
  const tableRef = ref();
  const personList: Ref<RolePersonItem[]> = ref([]);
  const personSelects: Ref<RolePersonItem[]> = ref([]);

  const tableColumns: ComputedRef<Column[]> = computed(() => [
    {
      field: "serial",
      title: "序号",
    },
    {
      field: "account",
      title: "账号",
      showOverflowTooltip: true
    },
    {
      field: "personName",
      title: "所属人员",
    },
    {
      field: "roles",
      title: "所有角色",
      showOverflowTooltip: true
    },
    {
      field: "department",
      title: "人员部门",
    },
    {
      field: "boundDate",
      title: "绑定时间",
      showOverflowTooltip: true
    },
    {
      field: "operator",
      title: "最近操作人",
    },
    {
      field: "operate",
      title: "操作"
    }
  ]);

  const buttonGroup = computed(() => [
    {
      title: "解绑",
      type: "warning",
      icon: "HeatMap02",
      authority: "LIST_PAGE:EL_BASE_LIST:VIEW",
      func: ({ row }: any) => {
        const { id } = row as RolePersonItem;
        onRoleUntieById({ roleId: roleId.value, personIds: [id] });
      }
    }
  ]);

  const getRoleBoundPersonList = async (roleId: string) => {
    const { data } = await request.roleBoundPersons({ params: { roleId } });
    personList.value = data;
  };

  const onTableSelect = (persons: RolePersonItem[]) => {
    personSelects.value = [...persons];
  };

  const onRoleUntieById = async (data: UntieRoleData) => {
    const { roleId, personIds } = data;
    await request.roleUntieById({ params: { roleId }, data:{ personIds } });
    await getRoleBoundPersonList(data.roleId);
  };

  const onUntieSelects = async () => {
    const personIds = personSelects.value.map(el => el.id);
    await request.roleUntieById({ params: { roleId: roleId.value }, data:{ personIds } });
    emit("success", "解绑成功");
  };

  return {
    personSelects,
    personList,
    buttonGroup,
    tableColumns,
    tableRef,
    getRoleBoundPersonList,
    onTableSelect,
    onUntieSelects
  };
};

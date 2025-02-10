import type { ComputedRef } from "vue";
import { computed, ref } from "vue";
import { Column } from "types/TableColumn";
import roleAxios from "api/systemMent";

interface roleMethod {
  roleBoundPersons: Fn;
}

export const useApply = () => {
  const personList = ref([]);
  const roleRequest: roleMethod = roleAxios.create("roleMent", ["roleBoundPersons"]);

  const tableColumns: ComputedRef<Column[]> = computed(() => [
    {
      field: "serial",
      title: "序号"
    },
    {
      field: "account",
      title: "账号",
      showOverflowTooltip: true
    },
    {
      field: "personName",
      title: "所属人员"
    },
    {
      field: "roles",
      title: "所有角色",
      showOverflowTooltip: true
    },
    {
      field: "department",
      title: "人员部门"
    },
    {
      field: "boundDate",
      title: "绑定时间",
      showOverflowTooltip: true
    },
    {
      field: "operator",
      title: "最近操作人"
    }
  ]);

  const getRoleBoundPersonList = async (roleId: string) => {
    const { data } = await roleRequest.roleBoundPersons({ params: { roleId } });
    personList.value = data;
  };

  return {
    getRoleBoundPersonList,
    personList,
    tableColumns
  };
};

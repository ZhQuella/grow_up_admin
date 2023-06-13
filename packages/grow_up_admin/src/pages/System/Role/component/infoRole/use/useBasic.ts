import type { Ref } from "vue";
import type { RolePersonItem } from "../../../types/index";
import { ref } from "vue";
import roleAxios from "api/systemMent";

interface roleMethod {
  getRoleInfo: Fn
};

export const useBasic = () => {

  const roleRequest: roleMethod = roleAxios.create("roleMent", ["getRoleInfo"]);

    const roleInfo: Ref<RolePersonItem> = ref({
      id: "",
      account: "",
      personName: "",
      roles: [],
      department: "",
      boundDate: "",
      operator: ""
    });

  const getRoleInfo = async (id: string) => {
    const { data } = await roleRequest.getRoleInfo({ params: { id } });
    roleInfo.value = data;
  };


  return {
    roleInfo,
    getRoleInfo
  };
};

import type { Ref } from "vue";
import type { RoleItem } from "../../../types/index";
import { computed, ComputedRef, ref } from "vue";
import axios from "api/systemMent";
import to from "await-to-js";
import { ElMessage } from "element-plus";

interface Props {
  emit: Fn;
}

export const useForm = ({ emit }: Props) => {
  const roleMethod = axios.create("roleMent");
  const formRef = ref(null);
  const buttonLoading: Ref<boolean> = ref(false);

  const rules: ComputedRef<any> = computed(() => ({
    roleName: [
      {
        required: true,
        message: "请输入角色名称",
        trigger: "change"
      }
    ],
    authorityChart: [
      {
        required: true,
        message: "请输入权限标识",
        trigger: "change"
      },
      {
        pattern:
          /^(?!\d)[\da-zA-Z]*[a-zA-Z]+[\da-zA-Z]*:(?!\d)[\da-zA-Z]*[a-zA-Z]+[\da-zA-Z]*:(?!\d)[\da-zA-Z]*[a-zA-Z]+[\da-zA-Z]*$/,
        message: "权限标识错误 例：system:role:createRole"
      }
    ],
    roleCode: [
      {
        required: true,
        message: "请输入角色编码",
        trigger: "change"
      }
    ]
  }));

  const formData: Ref<RoleItem> = ref({
    id: "",
    roleName: "",
    state: "0",
    authorityChart: "",
    roleType: "0",
    roleCode: "",
    memberNum: "",
    roleMark: "",
    createTime: "",
    updataTime: ""
  });

  const getRoleInfo = async (id: string): Promise<void> => {
    const { data } = await roleMethod.getRoleInfo({ params: { id } });
    formData.value = data;
  };

  const onModifyRole = async () => {
    buttonLoading.value = true;
    try {
      await formRef.value.validate();
      const [error] = await to(roleMethod.modifyRoleInfo({ data: formData.value }));
      if (error) {
        const { message } = error;
        ElMessage.error(message);
        buttonLoading.value = false;
        return;
      }
      emit("success", "角色修改成功");
      buttonLoading.value = false;
    } catch {
      buttonLoading.value = false;
    }
  };

  return {
    formData,
    rules,
    formRef,
    getRoleInfo,
    buttonLoading,
    onModifyRole
  };
};

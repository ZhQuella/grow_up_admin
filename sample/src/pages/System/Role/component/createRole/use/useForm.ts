import type { ComputedRef, Ref } from "vue";
import type { RoleForm } from "../../../types/index";
import type { FormInstance } from "element-plus";
import { computed, reactive, ref } from "vue";
import axios from "api/systemMent";
import to from "await-to-js";
import { ElMessage } from "element-plus";

export interface Props {
  emit: Fn;
}

export interface UseForm {
  rules: ComputedRef<any>;
  formData: RoleForm;
  formRef: Ref<FormInstance>;
  onCreateRole: Fn;
}

interface RequestMethod {
  createRole: Fn;
}

export const useForm = ({ emit }: Props): UseForm => {
  const formRef: Ref<FormInstance> = ref();
  const request: RequestMethod = axios.create("roleMent", ["createRole"]);
  const buttonLoading: Ref<boolean> = ref(false);

  const formData: RoleForm = reactive({
    roleName: "",
    roleCode: "",
    authorityChart: "",
    roleType: "0",
    state: "1",
    roleMark: ""
  });

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

  const onCreateRole = async (): Promise<void> => {
    buttonLoading.value = true;
    try {
      await formRef.value.validate();
      const [error] = await to(request.createRole({ data: formData }));
      if (error) {
        const { message } = error;
        ElMessage.error(message);
        buttonLoading.value = false;
        return;
      }
      emit("success", "角色新增成功");
      buttonLoading.value = false;
    } catch {
      buttonLoading.value = false;
    }
  };

  return {
    rules,
    formData,
    formRef,
    onCreateRole
  };
};

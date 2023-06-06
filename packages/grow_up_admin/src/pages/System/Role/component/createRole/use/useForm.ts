import type { Component, ComputedRef, Ref } from "vue";
import type { RoleForm } from "../../../types/index";
import type { FormInstance } from "element-plus";
import { computed, reactive, ref } from "vue";
import to from "await-to-js";

export interface Props {
  emit: Fn;
}

export interface UseForm {
  rules: ComputedRef<any>;
  formData: RoleForm;
  formRef: Ref<FormInstance>;
  onCreateRole: Fn;
}

export const useForm = ({ emit }: Props): UseForm => {
  const formRef: Ref<FormInstance> = ref();

  const formData: RoleForm = reactive({
    roleName: "",
    roleCode: "",
    authorityChart: "",
    roleType: "",
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
      }
    ],
    roleCode: [
      {
        required: true,
        message: "请输入角色编码",
        trigger: "change"
      }
    ],
    roleType: [
      {
        required: true,
        message: "请选择角色类型",
        trigger: "change"
      }
    ]
  }));

  const onCreateRole = async (): Promise<void> => {
    try {
      await formRef.value.validate();
      // const [error] = await to(accountMethod.createAccount({ data: formData }));
    } catch {}
  };

  return {
    rules,
    formData,
    formRef,
    onCreateRole
  };
};

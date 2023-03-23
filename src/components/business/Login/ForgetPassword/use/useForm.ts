import to from 'await-to-js';
import { reactive, computed, ref } from "vue";
import { ElMessage } from "element-plus";

export interface forgetFromType { 
  phoneNumber: string;
  account: string;
  verificationCode: string;
}

interface prop { 
  t: Fn,
  forgetMethod: any,
  emit: Fn
}

export const useForm = ({ 
  t,
  forgetMethod,
  emit
}: prop) => { 

  const loading = ref(false);
  const forgetFormRef = ref();
  const forgetForm: forgetFromType = reactive({
    phoneNumber: "13800138000",
    account: "admin",
    verificationCode: ""
  });

  const rules = computed(() => ({
    phoneNumber: [{
      required: true,
      message: t("LOGIN_WORD.MOBILE_PHONE"),
      trigger: ['input','blur']
    }],
    account: [{
      required: true,
      message: t("LOGIN_WORD.ACCESS_MSG"),
      trigger: ['input','blur']
    }],
    verificationCode: [{
      required: true,
      message: t("LOGIN_WORD.VERIFICATION_CODE"),
      trigger: ['input','blur']
    }]
  }));

  const onForgetPassword = async () => { 
    loading.value = true;
    try {
      await forgetFormRef.value.validate();
      const [error, { identifying }]: any = await to(forgetMethod.testVerificationCode({ data: forgetForm }));
      loading.value = false;
      if (error) { 
        const { message } = error;
        ElMessage.error(message);
        return;
      }
      emit("success", identifying);
    } catch {
      loading.value = false;
    }
  };


  return {
    forgetFormRef,
    forgetForm,
    rules,
    onForgetPassword
  }
};


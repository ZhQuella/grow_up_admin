import to from 'await-to-js';
import { ref, computed } from "vue";
import axios from "api/Login/index";
import { useLoginSuccess } from "../../use/useLoginSuccess";
import { ElMessage } from "element-plus";

interface props {
  formData: any,
  t: Fn
}

export const useLogin = ({ 
  t,
  formData
}: props) => { 

  const { loginSuccess } = useLoginSuccess();
  const request = axios.create("PhoneLogin");
  const loginLoading = ref(false);
  const formRef = ref();
  const rules = computed(() => ([
    {
      phoneNumber: [{
        required: true,
        message: t("LOGIN_WORD.MOBILE_PHONE"),
        trigger: ['input','blur']
      },{
        pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
        message: t("LOGIN_WORD.PHONE_NUM_ERROR")
      }]
    },
    {
      verificationCode: [{
        required: true,
        message: t("LOGIN_WORD.VERIFICATION_CODE"),
        trigger: ['input','blur']
      }]
    }
  ]))

  const onPhoneLogin = async () => { 
    loginLoading.value = true;
    try {
      await formRef.value.validate();
      const [error, result] = await to(request.phoneLogin({ data: formData }));
      if (error) {
        const { message } = error;
        ElMessage.error(message);
        loginLoading.value = false;
        return;
      }
      loginSuccess(result);
    } catch (error){ 
      loginLoading.value = false;
    }
  };

  return {
    formRef,
    loginLoading,
    rules,
    onPhoneLogin
  };
};

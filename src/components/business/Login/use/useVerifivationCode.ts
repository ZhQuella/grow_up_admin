import to from "await-to-js";
import { computed, ref, onUnmounted } from "vue";
import axios from "api/Login";

import { ElMessage } from "element-plus";

interface prop {
  forgetForm: any;
  t: Fn;
}

export const useVerifivationCode = ({ forgetForm, t }: prop) => {
  const isCooling = ref(false);
  const secNum = ref(0);
  const timte = ref();
  const forgetMethod = axios.create("ForgetPassword");

  const isGetCodeDisabled = computed(() => {
    return !forgetForm.phoneNumber && !forgetForm.account;
  });

  const codeContext = computed(() => {
    if (isCooling.value) {
      return `${secNum.value}s`;
    }
    return t("LOGIN_WORD.GET_CODE");
  });

  const onGetVerificationCode = async () => {
    if (isCooling.value) return;
    secNum.value = 60;
    isCooling.value = true;
    countSecond();
    getVerificationCode();
  };

  const getVerificationCode = async () => {
    const [error, result]: any = await to(
      forgetMethod.getVerificationCode({ data: forgetForm })
    );
    console.log(result);
    const { verificationCode } = result;
    if (error) {
      const { message } = error;
      ElMessage.error(message);
      return;
    }
    // ! 删除，生产这里不应该返回验证码
    forgetForm.verificationCode = verificationCode;
  };

  const countSecond = () => {
    clearInterval(timte.value);
    timte.value = setInterval(() => {
      secNum.value -= 1;
      if (secNum.value < 0) {
        isCooling.value = false;
        clearInterval(timte.value);
      }
    }, 1000);
  };

  onUnmounted(() => {
    clearInterval(timte.value);
  });

  return {
    forgetForm,
    codeContext,
    isCooling,
    isGetCodeDisabled,
    onGetVerificationCode,
  };
};

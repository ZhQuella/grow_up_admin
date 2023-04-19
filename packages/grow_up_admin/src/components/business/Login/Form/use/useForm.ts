import to from "await-to-js";
import { ref, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { Storage } from "util/Storage";
import { useLoginSuccess } from "../../use/useLoginSuccess";
import { ACCOUNT_INFO } from "@/assets/enums/cacheEnum";
import formLogin from "api/Login";
import { ElMessage } from "element-plus";

export const useForm = () => {
  const i18n = useI18n();
  const { loginSuccess } = useLoginSuccess();

  const loginFormRef = ref();
  const loading = ref(false);
  const loginFormData = reactive({
    account: "admin",
    password: "123789456",
    isRemember: false,
  });
  const formLoginMethod = formLogin.create("LoginMethod");

  const formRules = computed(() => ({
    account: [
      {
        required: true,
        message: i18n.t("LOGIN_WORD.ACCESS_MSG"),
        trigger: ["input", "blur"],
      },
    ],
    password: [
      {
        required: true,
        message: i18n.t("LOGIN_WORD.PASSORD_MSG"),
        trigger: ["input", "blur"],
      },
    ],
  }));

  const saveFormInfo = () => {
    const { account, password, isRemember } = loginFormData;
    if (!isRemember) {
      Storage.remove(ACCOUNT_INFO);
      return;
    }
    const formData = { account, password, isRemember };
    Storage.set(ACCOUNT_INFO, JSON.stringify(formData));
  };

  const onLogin = async () => {
    loading.value = true;
    try {
      await loginFormRef.value.validate();
      const [error, result] = await to(
        formLoginMethod.accountLogin({ data: loginFormData })
      );
      if (error) {
        const { message } = error;
        ElMessage.error(message);
        loading.value = false;
        return;
      }
      saveFormInfo();
      loginSuccess(result);
      loading.value = false;
    } catch {
      loading.value = false;
    }
  };

  const resetLoginForm = () => {
    const { account, password, isRemember } = JSON.parse(
      Storage.get(ACCOUNT_INFO) || "{}"
    );
    if (account && password) {
      loginFormData.account = account;
      loginFormData.password = password;
      loginFormData.isRemember = isRemember;
    }
  };

  onMounted(() => {
    resetLoginForm();
  });

  return {
    loading,
    formRules,
    loginFormData,
    loginFormRef,
    onLogin,
  };
};

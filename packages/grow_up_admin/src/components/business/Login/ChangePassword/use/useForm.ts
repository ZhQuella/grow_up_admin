import to from "await-to-js";
import { reactive, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
import formLogin from "api/Login";

interface prop {
  tagCode: string;
  emit: Fn;
}

export const useForm = ({ tagCode, emit }: prop) => {
  const { t } = useI18n();
  const formRef = ref();
  const loading = ref(false);
  const formData = reactive({
    password: "",
    newPassword: ""
  });
  const formLoginMethod = formLogin.create("ForgetPassword");

  const validatePasswordSame = (rule: any, value: string, callback: Fn) => {
    if (!formData.password || !formData.newPassword) {
      callback();
    }
    if (formData.password !== formData.newPassword) {
      callback(new Error(t("LOGIN_WORD.OLD_NEW_DIFFERENT")));
    } else {
      callback();
    }
  };

  const rules = computed(() => ({
    password: [
      { required: true, message: t("LOGIN_WORD.NEW_PASSWORD_CONTEXT") },
      { min: 6, max: 20, message: t("LOGIN_WORD.PASSWORD_LEN_CONTEXT") },
      {
        validator: validatePasswordSame,
        message: t("LOGIN_WORD.OLD_NEW_DIFFERENT")
      }
    ],
    newPassword: [
      { required: true, message: t("LOGIN_WORD.ENTER_PASSWORD_CONTEXT") },
      { min: 6, max: 20, message: t("LOGIN_WORD.PASSWORD_LEN_CONTEXT") },
      {
        validator: validatePasswordSame,
        message: t("LOGIN_WORD.OLD_NEW_DIFFERENT")
      }
    ]
  }));

  const onModifyPassword = async () => {
    loading.value = true;
    try {
      await formRef.value.validate();
      const [error, result] = await to(
        formLoginMethod.modifyPassword({
          data: {
            ...formData,
            tagCode
          }
        })
      );
      if (error) {
        const { message } = error;
        ElMessage.error(message);
        loading.value = false;
        return;
      }
      emit("success");
      loading.value = false;
    } catch {
      loading.value = false;
    }
  };

  const onBack = () => {
    emit("back");
  };

  return {
    formRef,
    rules,
    formData,
    onModifyPassword,
    onBack
  };
};

import { reactive, computed, ref } from "vue";
import axios from "api/systemMent";
import to from "await-to-js";
import { ElMessage } from "element-plus";

interface Prop {
  emit: Fn;
}

export const useForm = ({ emit }: Prop) => {
  const accountForm = ref();
  const buttonLoading = ref(false);
  const accountMethod = axios.create("accountMent");

  const formData = reactive({
    account: "",
    password: "g123987",
    personnel: "",
    state: "1",
  });

  //  /^[A-Za-z0-9]{6,12}$/
  const rules = computed(() => ({
    account: [
      {
        required: true,
        message: "请输入账号",
        trigger: "change",
      },
      {
        pattern: /^[A-Za-z0-9]{6,12}$/,
        message: "密码位数应该在6-12之间",
      },
    ],
    password: [
      {
        required: true,
        message: "请输入初始密码",
        trigger: "change",
      },
    ],
  }));

  const onCreateAccount = async () => {
    buttonLoading.value = true;
    try {
      await accountForm.value.validate();
      const [error] = await to(accountMethod.createAccount({ data: formData }));
      if (error) {
        const { message } = error;
        ElMessage.error(message);
        buttonLoading.value = false;
        return;
      }
      emit("success", "账号新增成功");
      buttonLoading.value = false;
    } catch {
      buttonLoading.value = false;
    }
  };

  return {
    rules,
    formData,
    accountForm,
    buttonLoading,
    onCreateAccount,
  };
};

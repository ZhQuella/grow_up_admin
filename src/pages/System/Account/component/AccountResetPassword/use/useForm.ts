import { reactive, computed, ref } from "vue";
import to from 'await-to-js';
import axios from "api/systemMent";
import { ElMessage } from "element-plus";

interface Prop {
  emit: Fn
}

export const useForm = ({ 
  emit
}:Prop) => {

  const accoutMethods = axios.create("accountMent");
  const buttonLoading = ref(false);
  const formRef = ref();

  const formData = reactive({
    password: ""
  });

  const rules = computed(() => ({
    password: [{
      required: true,
      message: '请输入初始密码',
      trigger: 'change',
    }]
  }));

  const onReset = async () => { 
    buttonLoading.value = true;
    try {
      await formRef.value.validate();
      const [error] = await to(accoutMethods.accountResetPassword({ data: formData }));
      if (error) {
        const { message } = error;
        ElMessage.error(message);
        buttonLoading.value = false;
        return;
      }
      buttonLoading.value = false;
      emit("success","密码重置成功");
    } catch { 
      buttonLoading.value = false;
    }
  };

  const onClean = () => { 
    emit("close");
  };

  return {
    buttonLoading,
    formRef,
    rules,
    formData,
    onClean,
    onReset
  }

};

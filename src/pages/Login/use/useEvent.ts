import { ref } from "vue";
import { useRouter } from "vue-router";

export const useEvent = () => {
  const router = useRouter();

  const formType = ref("login");
  const tagCode = ref("");

  const onGoToIndex = () => {
    router.push({
      name: "Index",
    });
  };

  const onChangeFormType = (type: string) => {
    formType.value = type;
  };

  const onForgetPasswordSuccess = (identifying: string) => { 
    tagCode.value = identifying;
    formType.value = "changePassword";
  };

  return {
    onForgetPasswordSuccess,
    onChangeFormType,
    onGoToIndex,
    formType
  };
};

import { ref } from "vue";
import { useRouter } from "vue-router";

export const useEvent = () => {
  const router = useRouter();

  const formType = ref("login");

  const onGoToIndex = () => {
    router.push({
      name: "Index",
    });
  };

  const onChangeFormType = (type: string) => {
    formType.value = type;
  };

  return {
    onChangeFormType,
    onGoToIndex,
    formType,
  };
};

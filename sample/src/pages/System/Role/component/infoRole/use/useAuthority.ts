import type { Ref } from "vue";
import { ref } from "vue";

export const useAuthority = () => {
  const authorityTabsValue: Ref<string> = ref("FunctionalAuthority");

  return {
    authorityTabsValue
  };
};

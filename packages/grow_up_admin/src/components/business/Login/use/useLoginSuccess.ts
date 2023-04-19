import { AUTHORITY_TOKEN } from "@/assets/enums/cacheEnum";
import { createStorage } from "util/Storage";
import { useRouter } from "vue-router";

export const useLoginSuccess = () => {
  const storage = createStorage({ prefixKey: "", storage: sessionStorage });
  const router = useRouter();

  const loginSuccess = (result: any) => {
    const { token } = result as { token: string };
    storage.set(AUTHORITY_TOKEN, token);
    router.push({
      name: "Home",
    });
  };

  return {
    loginSuccess,
  };
};

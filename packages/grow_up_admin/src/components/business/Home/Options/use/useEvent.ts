import { ExtendedDocument } from "types/index";
import { ref } from "vue";
import { useAppStore } from "store/modules/app";
import { useFullscreen } from "@vueuse/core";
import { AUTHORITY_TOKEN, TABS_LIST_KEY, TABS_CURRENT_KEY } from "@/assets/enums/cacheEnum";
import { createStorage } from "grow_utils";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";

type userMenuType = "profile" | "logout";

export const useEvent = ({ t }: { t: Fn }) => {
  const appStore = useAppStore();
  const { toggle, isFullscreen } = useFullscreen();
  const settingActive = ref(false);
  const messageActive = ref(false);
  const storage = createStorage({ prefixKey: "", storage: sessionStorage });
  const { push } = useRouter();

  const onSettingHadnler = () => {
    appStore.setSettingActive(true);
  };

  const onSearchHeadler = () => {
    appStore.setSearchActive(true);
  };

  const domc: ExtendedDocument = document;
  isFullscreen.value = !!(
    domc.fullscreenElement ||
    domc.webkitFullscreenElement ||
    domc.mozFullScreenElement ||
    domc.msFullscreenElement
  );

  const onLoginOut = async () => {
    try {
      await ElMessageBox.confirm(t("APP_OTHER.LOGIN_OUT_PROMPT"), t("APP_OTHER.LOGIN_OUT_TITLE"), {
        confirmButtonText: t("PUBLIC.CONFIRM_TEXT"),
        cancelButtonText: t("PUBLIC.CANCEL_TEXT"),
        type: "warning"
      });
      storage.remove(AUTHORITY_TOKEN);
      storage.remove(TABS_LIST_KEY);
      storage.remove(TABS_CURRENT_KEY);
      push({ path: "/" });
    } catch {
      ElMessage({
        type: "info",
        message: t("APP_OTHER.LOGIN_OUT_CANCEL_PROMPT")
      });
    }
  };

  const onDropdownClick = (value: userMenuType) => {
    if (value === "logout") onLoginOut();
  };

  return {
    settingActive,
    isFullscreen,
    messageActive,
    toggle,
    onSettingHadnler,
    onSearchHeadler,
    onDropdownClick
  };
};

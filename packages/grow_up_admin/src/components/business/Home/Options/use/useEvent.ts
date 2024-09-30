import { ExtendedDocument } from "types/index";
import { ref } from "vue";
import { useAppStore } from "store/modules/app";
import { useFullscreen } from "@vueuse/core";
import { useLockScreen } from "store/modules/LockScreen";
import { useLoginOut } from "hooks/useLoginOut";

type userMenuType = "profile" | "logout";

export const useEvent = ({ t }: { t: Fn }) => {
  const appStore = useAppStore();
  const lockScreenStore = useLockScreen();
  const { toggle, isFullscreen } = useFullscreen();
  const settingActive = ref(false);
  const messageActive = ref(false);
  const { loginOut } = useLoginOut({ t });

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
    loginOut();
  };

  const onDropdownClick = (value: userMenuType) => {
    if (value === "logout") onLoginOut();
  };

  const onLockScreenHeadler = () => {
    lockScreenStore.setIsLockScreen(true);
  };

  return {
    settingActive,
    isFullscreen,
    messageActive,
    toggle,
    onLockScreenHeadler,
    onSettingHadnler,
    onSearchHeadler,
    onDropdownClick
  };
};

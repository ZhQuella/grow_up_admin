import { ExtendedDocument } from "types/index";
import { ref } from "vue";
import { useAppStore } from "store/modules/app";
import { useFullscreen } from '@vueuse/core';

export const useEvent = () => {
  
  const appStore = useAppStore();
  const { toggle, isFullscreen } = useFullscreen();
  const settingActive = ref(false);
  const messageActive = ref(false);

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

  return {
    settingActive,
    isFullscreen,
    messageActive,
    toggle,
    onSettingHadnler,
    onSearchHeadler
  };

};

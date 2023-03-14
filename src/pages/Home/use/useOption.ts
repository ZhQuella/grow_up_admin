import { computed } from "vue";
import { useAppStore } from "store/modules/app";

export const useOption = () => { 

  const appStore = useAppStore();

  const settingActive = computed({
    get() { 
      return appStore.settingActive;
    },
    set() { 
      return appStore.setSettingActive(false);
    }
  });

  const searchActive = computed({
    get() { 
      return appStore.searchActive;
    },
    set() { 
      return appStore.setSearchActive(false);
    }
  });

  const onAppSearchSelect = () => { 
    appStore.setSearchActive(false);
  };
  

  return {
    settingActive,
    searchActive,
    onAppSearchSelect
  };
};

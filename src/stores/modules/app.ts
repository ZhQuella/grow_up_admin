import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({ 
    webFullScreen: false,
    settingActive: false,
    searchActive: false,
    isPutAway: false
  }),
  getters: {
    getWebFullScreen():boolean {
      return this.webFullScreen;
    },
    getSettingActive():boolean { 
      return this.settingActive;
    },
    getSearchActive(): boolean { 
      return this.searchActive
    },
    getIsPutAway(): boolean { 
      return this.isPutAway;
    }
  },
  actions: {
    setWebFullScreen(isFullScreen: boolean) {
      this.webFullScreen = isFullScreen;
    },
    setSettingActive(isActive: boolean) { 
      this.settingActive = isActive;
    },
    setSearchActive(isActive: boolean) { 
      this.searchActive = isActive;
    },
    setIsPutAway(isPutAway: boolean) { 
      this.isPutAway = isPutAway;
    }
  },
});

import { defineStore } from "pinia";

export const useSystemStore = defineStore({
  id: "systemInfo",
  state: () => ({
    userInfo: {}
  }),
  getters: {
    getUserInfo():any { 
      return this.userInfo;
    }
  },
  actions: {
    setUserInfo(userInfo: any) { 
      this.userInfo = userInfo;
    }
  },
});

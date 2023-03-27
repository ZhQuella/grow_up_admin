import { defineStore } from "pinia";

export const useSystemStore = defineStore({
  id: "systemInfo",
  state: () => ({
    userInfo: {},
    roleSings: []
  }),
  getters: {
    getUserInfo():any { 
      return this.userInfo;
    },
    getRoleSings():string[] { 
      return this.roleSings;
    }
  },
  actions: {
    setUserInfo(userInfo: any) { 
      this.userInfo = userInfo;
    },
    setRoleSings(roleSings: string[]) { 
      this.roleSings = roleSings;
    }
  },
});

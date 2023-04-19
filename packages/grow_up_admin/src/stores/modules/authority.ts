import { defineStore } from "pinia";
import { GroupBtn } from "types/ButtonGroup";

interface AuthorityState {
  authorityList: string[];
}

export const useAuthorityStore = defineStore({
  id: "authority",
  state: (): AuthorityState => ({
    authorityList: [
      "LIST_PAGE:EL_BASE_LIST:VIEW",
      "LIST_PAGE:EL_BASE_LIST:DELETE",
      "LIST_PAGE:EL_BASE_LIST:REPORT",
    ],
  }),
  getters: {
    getAuthorityType(): string[] {
      return this.authorityList;
    },
  },
  actions: {
    setAuthority(authorityList: string[]) {
      this.authorityList = authorityList;
    },
  },
});

import type { MenuType } from "types/menu";
import { defineStore } from "pinia";
import { treeIterator, filterBinaryTree } from "util/System/index";

interface PermissionState { 
  collapsed: boolean;
  showMenu: boolean;
  backMenuList: MenuType[],
  frontMenuList: MenuType[]
};

export const useMenuStore = defineStore({
  id: "menu",
  state: (): PermissionState => ({ 
    collapsed: true,
    showMenu: true,
    // 后台菜单列表
    backMenuList: [],
    // 前台菜单列表
    frontMenuList: []
  }),
  getters: {
    getCollapsed(): boolean {
      return this.collapsed ?? false;
    },
    allMenuList(): MenuType[] { 
      const { backMenuList, frontMenuList } = this;
      return treeIterator(backMenuList, frontMenuList);
    },
    menuList(): MenuType[] {
      const { allMenuList } = this;
      const menuList = filterBinaryTree(allMenuList);
      return menuList;
    }
  },
  actions: {
    setCollapsed(collapsed: boolean) {
      this.collapsed = collapsed;
    },
    setShowMenu(show: boolean) {  
      this.showMenu = true;
    },
    setFrontMenuList(frontMenuList: MenuType[]) { 
      this.frontMenuList = frontMenuList;
    },
    setBackMenuList(backMenuList: MenuType[]) { 
      this.backMenuList = backMenuList;
    }
  },
})

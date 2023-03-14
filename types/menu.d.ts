
type _menuType = "JumpTo" | "ScrollTo";

export interface MenuItem { 
  label: string;
  addition: string;
  key: string;
  type: _menuType;
  path: string;
};

export interface MenuType { 
  label: string;
  name: string;
  icon: string;
  path: string;
  component: string;
  hidden?: boolean;
  default?: boolean;
  children?: MenuType[];
  custom?: boolean;
  props?: boolean;
  cache?: boolean;
}

export const menuTypes = _menuType;

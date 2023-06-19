
type enumerate = "0" | "1";

export interface MenuItem {
  label: string;
  menuType: enumerate;
  menuIcon: string;
  sort: number;
  path: string;
  component: string;
  name: string;
  hidden: boolean;
  state: enumerate;
  createTime: string;
  children?: MenuItem[]
};


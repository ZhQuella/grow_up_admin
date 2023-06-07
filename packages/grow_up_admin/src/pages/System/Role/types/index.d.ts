type roleState = "0" | "1";

export interface RoleItem {
  id: number;
  roleName: string;
  state: roleState;
  authorityChart: string;
  roleType: string;
  roleCode: string;
  memberNum: string;
  roleMark: string;
  createTime: string;
  updataTime: string;
};

export interface RoleForm {
  roleName: string;
  roleCode: string;
  authorityChart: string;
  roleType: string;
  state: roleState;
  roleMark?: string;
  id?: string;
}

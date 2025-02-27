import { stateType } from "pages/System/Account/types";

type roleState = "0" | "1";

export interface RoleItem {
  id: string;
  roleName: string;
  state: roleState;
  authorityChart: string;
  roleType: string;
  roleCode: string;
  memberNum: string;
  roleMark: string;
  createTime: string;
  updataTime: string;
}

export interface RoleForm {
  roleName: string;
  roleCode: string;
  authorityChart: string;
  roleType: string;
  state: roleState;
  roleMark?: string;
  id?: string;
}

export interface OutServiceData {
  id: string;
  state: stateType;
}

export interface RolePersonItem {
  id: string;
  account: string;
  personName: string;
  roles: string[];
  department: string;
  boundDate: string;
  operator: string;
}

export interface UntieRoleData {
  personIds: string[];
  roleId: string;
}

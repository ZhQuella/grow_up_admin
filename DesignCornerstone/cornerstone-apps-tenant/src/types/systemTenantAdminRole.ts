import type { SystemTenantGrantMenu, TenantStatus } from './systemTenant'

export const ROLE_CODE_PATTERN = /^[a-zA-Z][a-zA-Z0-9_]*$/
export const ROLE_CODE_MESSAGE = '编码需以字母开头，仅含字母数字下划线'

export const TENANT_ADMIN_ROLE_NAME = '租户管理员'
export const TENANT_ADMIN_ROLE_CODE = 'TENANT_ADMIN'

export type TenantAdminRoleListItem = {
  id: string
  tenantId: string
  tenantCode: string
  tenantName: string
  tenantStatus: TenantStatus
  name: string
  code: string
  builtIn: boolean
  enabled: boolean
  memberCount: number
  menuCount: number
  functionCount: number
  grantedAt: string | null
  createdAt: string
  remark?: string
  sort?: number
}

export type TenantAdminRoleMember = {
  accountId: string
  username: string
  personName?: string
  enabled: boolean
}

export type TenantAdminRoleDetail = TenantAdminRoleListItem & {
  members: TenantAdminRoleMember[]
  tree: SystemTenantGrantMenu[]
  menuIds: string[]
  functionIds: string[]
  queryPermissionIds: string[]
  columnPermissionIds: string[]
  editPermissionIds: string[]
  dataPerms: TenantAdminRoleDataPerm[]
}

export type TenantRoleEditScope = 'all' | 'dept' | 'dept_and_sub' | 'custom' | 'self' | 'specified'
export type TenantRoleViewOther = 'all' | 'self' | 'specified' | 'none'
export type TenantRoleFilterOperator = 'eq' | 'neq' | 'contains' | 'not_contains' | 'gt' | 'gte' | 'lt' | 'lte'

export type TenantRoleSelfRelated = {
  createdBySelf: boolean
  fieldContainsSelf: boolean
  columnIds: string[]
}

export type TenantRoleFilter = {
  id: string
  columnId: string
  operator: TenantRoleFilterOperator
  value: string[]
}

export type TenantAdminRoleDataPerm = {
  menuName: string
  editScope: TenantRoleEditScope
  viewOther: TenantRoleViewOther
  deptIds: string[]
  selfRelated: TenantRoleSelfRelated
  viewSelfRelated: TenantRoleSelfRelated
  filters: TenantRoleFilter[]
  viewFilters: TenantRoleFilter[]
}

export type TenantRoleDeptOption = { id: string; title: string }

export type TenantAdminRoleGrantPayload = {
  roleId: string
  menuIds: string[]
  functionIds: string[]
  queryPermissionIds: string[]
  columnPermissionIds: string[]
  editPermissionIds: string[]
}

export type TenantAdminRoleQuery = {
  keyword?: string
  tenantId?: string
  tenantStatus?: TenantStatus | ''
  builtIn?: string | boolean
  enabled?: string | boolean
  page?: number
  pageSize?: number
}

export type TenantAdminRolePageResult = {
  items: TenantAdminRoleListItem[]
  total: number
}

export type TenantAdminRoleCreatePayload = {
  tenantId: string
  name: string
  code: string
  sort?: number
  remark?: string
}

export type TenantAdminRoleUpdatePayload = Omit<TenantAdminRoleCreatePayload, 'tenantId'>

export type TenantAdminRoleDeleteImpact = {
  memberCount: number
  menuCount: number
  functionCount: number
  dataPermCount: number
}

export type TenantAdminRoleAccount = {
  accountId: string
  username: string
  personName?: string
  enabled: boolean
}

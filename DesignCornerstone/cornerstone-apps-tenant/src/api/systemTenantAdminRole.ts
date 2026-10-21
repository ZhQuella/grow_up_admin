import { diKT } from '@grow-admin-rock/ioc'
import { Lib as infrastructureLib } from '@grow-admin-rock/infrastructure'
import type {
  TenantAdminRoleDataPerm,
  TenantAdminRoleCreatePayload,
  TenantAdminRoleDetail,
  TenantAdminRoleGrantPayload,
  TenantAdminRolePageResult,
  TenantAdminRoleQuery,
  TenantRoleDeptOption,
} from '../types/systemTenantAdminRole'

const useRequest = () => diKT(infrastructureLib.types.InfrastructureAxios)

export function fetchTenantAdminRolePage(params: TenantAdminRoleQuery) {
  return useRequest().post<TenantAdminRolePageResult>({
    url: '/platform/tenant-admin-roles/page',
    data: params,
  })
}

export function getTenantAdminRoleDetail(roleId: string) {
  return useRequest().post<TenantAdminRoleDetail>({
    url: '/platform/tenant-admin-role/detail',
    data: { roleId },
  })
}

export function createTenantAdminRole(data: TenantAdminRoleCreatePayload) {
  return useRequest().post<TenantAdminRoleDetail>({
    url: '/platform/tenant-admin-role/create',
    data,
  })
}

export function saveTenantAdminRoleGrant(data: TenantAdminRoleGrantPayload) {
  return useRequest().put<TenantAdminRoleDetail>({
    url: '/platform/tenant-admin-role/grant',
    data,
  })
}

export function fetchTenantRoleDepts(tenantId: string) {
  return useRequest().post<TenantRoleDeptOption[]>({
    url: '/platform/tenant-admin-role/depts',
    data: { tenantId },
  })
}

export function fetchTenantRoleUsers(tenantId: string) {
  return useRequest().post<Array<{ id: string; name: string }>>({
    url: '/platform/tenant-admin-role/users',
    data: { tenantId },
  })
}

export function saveTenantAdminRoleDataPerm(roleId: string, items: TenantAdminRoleDataPerm[]) {
  return useRequest().put<TenantAdminRoleDetail>({
    url: '/platform/tenant-admin-role/data-perm',
    data: { roleId, items },
  })
}

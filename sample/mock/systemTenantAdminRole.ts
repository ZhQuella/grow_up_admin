import type { MockMethod } from '@grow-admin-rock/mock/types'
import { mockUrl } from '@grow-admin-rock/mock/constants'
import { resultError, resultSuccess } from '@grow-admin-rock/mock/util'
import { GRANT_TREE, findTenant, listTenants } from './systemTenant'
import { listAllColumns } from './systemMenu'
import { countTenantAdminMembers, listTenantAccounts, tenantAdminRoleId } from './tenantAccountStore'

type RoleSelfRelated = { createdBySelf: boolean; fieldContainsSelf: boolean; columnIds: string[] }
type RoleFilter = { id: string; columnId: string; operator: string; value: string[] }
type RoleDataPerm = {
  menuName: string
  editScope: string
  viewOther: string
  deptIds: string[]
  selfRelated: RoleSelfRelated
  viewSelfRelated: RoleSelfRelated
  filters: RoleFilter[]
  viewFilters: RoleFilter[]
}

const EDIT_SCOPES = new Set(['all', 'dept', 'dept_and_sub', 'custom', 'self', 'specified'])
const VIEW_OTHERS = new Set(['all', 'self', 'specified', 'none'])
const FILTER_OPERATORS = new Set(['eq', 'neq', 'contains', 'not_contains', 'gt', 'gte', 'lt', 'lte'])

const ROLE_NAME = '租户管理员'
const ROLE_CODE = 'TENANT_ADMIN'
const CODE_PATTERN = /^[a-zA-Z][a-zA-Z0-9_]*$/
const STORE_VERSION = 5

type CustomRole = {
  id: string
  tenantId: string
  name: string
  code: string
  sort: number
  remark: string
  enabled: boolean
  createdAt: string
  menuIds?: string[]
  functionIds?: string[]
  queryPermissionIds?: string[]
  columnPermissionIds?: string[]
  editPermissionIds?: string[]
  dataPerms?: RoleDataPerm[]
  grantedAt?: string | null
}

function now() {
  return new Date().toISOString()
}

function text(value: unknown) {
  return String(value ?? '').trim()
}

function parseBoolean(value: unknown) {
  if (value === true || value === 'true') return true
  if (value === false || value === 'false') return false
  return undefined
}

function countGrantedMenus(menuIds: string[]) {
  const ids = new Set(menuIds)
  let count = 0
  const walk = (nodes: typeof GRANT_TREE) => {
    nodes.forEach((node) => {
      if (!node.directory && ids.has(node.id)) count += 1
      if (node.children?.length) walk(node.children)
    })
  }
  walk(GRANT_TREE)
  return count
}

function tenantDepts(tenantId: string) {
  const tenant = findTenant(tenantId)
  return Array.from({ length: tenant?.deptCount || 0 }, (_, index) => ({
    id: `tenant_${tenantId}_dept_${index + 1}`,
    title: `部门 ${index + 1}`,
  }))
}

function permittedColumns(role: CustomRole) {
  const queryIds = new Set(role.queryPermissionIds || [])
  const limit = new Set(findTenant(role.tenantId)?.columnPermissionIds || [])
  return listAllColumns().filter((column) => column.enabled && column.queryFilter && queryIds.has(column.id) && limit.has(column.id))
}

function checkRelated(raw: any, menuName: string, columnIds: Set<string>) {
  const createdBySelf = raw?.createdBySelf === true
  const fieldContainsSelf = raw?.fieldContainsSelf === true
  const ids = Array.isArray(raw?.columnIds) ? raw.columnIds.map(String) as string[] : []
  if (!createdBySelf && !fieldContainsSelf) return '请至少选择一项当前用户关联条件'
  if (fieldContainsSelf && !ids.length) return '请选择包含当前用户的字段'
  if (ids.some((id) => !columnIds.has(id))) return `页面「${menuName}」存在未授权的关联字段`
  return ''
}

function checkFilters(raw: any, menuName: string, columns: ReturnType<typeof permittedColumns>, depts: Set<string>, users: Set<string>) {
  if (!Array.isArray(raw) || !raw.length) return '请添加筛选条件'
  for (const filter of raw) {
    const column = columns.find((item) => item.menuName === menuName && item.id === String(filter?.columnId))
    if (!column) return `页面「${menuName}」存在未授权的筛选字段`
    if (!FILTER_OPERATORS.has(String(filter?.operator))) return '筛选运算符不合法'
    const operators = column.columnType === 'number' || column.columnType === 'date'
      ? ['eq', 'neq', 'gt', 'gte', 'lt', 'lte']
      : column.columnType === 'boolean' ? ['eq', 'neq'] : ['eq', 'neq', 'contains', 'not_contains']
    if (!operators.includes(String(filter.operator))) return '筛选运算符不适用于该字段'
    if (!Array.isArray(filter?.value) || !filter.value.length || filter.value.some((value: unknown) => !String(value).trim())) {
      return '请补全筛选条件'
    }
    const values = filter.value.map(String) as string[]
    if (column.columnType === 'dept' && values.some((value) => value !== '__current_user__' && !depts.has(value))) {
      return '筛选包含其它租户的部门'
    }
    if (column.columnType === 'person' && values.some((value) => value !== '__current_user__' && !users.has(value))) {
      return '筛选包含其它租户的账号'
    }
    if (column.columnType === 'number' && values.some((value) => !Number.isFinite(Number(value)))) return '数值条件不合法'
  }
  return ''
}

function validateDataPerms(role: CustomRole, items: any[]): string {
  const grantedMenus = new Set((role.menuIds || []).filter((id) => findTenant(role.tenantId)?.menuIds.includes(id)))
  const leafMenus = new Set(GRANT_TREE.flatMap((node) => node.children.map((child) => child.id)))
  const columns = permittedColumns(role)
  const allowedValues = new Set(tenantDepts(role.tenantId).map((dept) => dept.id))
  const allowedUsers = new Set(listTenantAccounts(role.tenantId).map((account) => account.accountId))
  const seen = new Set<string>()
  for (const item of items) {
    const name = text(item?.menuName)
    if (!grantedMenus.has(name) || !leafMenus.has(name) || seen.has(name)) return '页面未授权或重复配置'
    seen.add(name)
    if (!EDIT_SCOPES.has(item?.editScope)) return `页面「${name}」编辑范围不合法`
    if (item.editScope !== 'all' && !VIEW_OTHERS.has(item?.viewOther)) return `页面「${name}」其它记录权限不合法`
    const allowed = new Set(columns.filter((column) => column.menuName === name).map((column) => column.id))
    if (item.editScope === 'custom') {
      if (!Array.isArray(item.deptIds) || !item.deptIds.length || item.deptIds.some((id: string) => !allowedValues.has(id))) {
        return `页面「${name}」请选择本租户部门`
      }
    }
    if (item.editScope === 'self') {
      const error = checkRelated(item.selfRelated, name, allowed)
      if (error) return error
    }
    if (item.viewOther === 'self' && item.editScope !== 'all') {
      const error = checkRelated(item.viewSelfRelated, name, allowed)
      if (error) return error
    }
    if (item.editScope === 'specified' || (item.editScope !== 'all' && item.viewOther === 'specified')) {
      if (item.editScope === 'specified') {
        const error = checkFilters(item.filters, name, columns, allowedValues, allowedUsers)
        if (error) return error
      }
      if (item.editScope !== 'all' && item.viewOther === 'specified') {
        const error = checkFilters(item.viewFilters, name, columns, allowedValues, allowedUsers)
        if (error) return error
      }
    }
  }
  return ''
}

function createCustomRoleStore(): CustomRole[] {
  return [
    {
      id: 'tr_acme_ops',
      tenantId: '2',
      name: '运营',
      code: 'OPS',
      sort: 20,
      remark: '日常运营',
      enabled: true,
      createdAt: '2026-08-22T04:00:00.000Z',
      menuIds: ['AccountManage', 'PersonManage'],
      functionIds: ['af_query', 'af_create', 'pf_query'],
      queryPermissionIds: ['ac_username', 'ac_person', 'ac_dept', 'pc_name', 'pc_dept'],
      columnPermissionIds: ['ac_username', 'ac_person', 'pc_name'],
      editPermissionIds: ['ac_person', 'pc_dept'],
      grantedAt: '2026-08-22T04:00:00.000Z',
    },
    {
      id: 'tr_gov_clerk',
      tenantId: '4',
      name: '办事员',
      code: 'CLERK',
      sort: 20,
      remark: '',
      enabled: true,
      createdAt: '2026-06-02T08:00:00.000Z',
      menuIds: ['AccountManage', 'PersonManage'],
      functionIds: ['af_query', 'pf_query'],
      queryPermissionIds: ['ac_username', 'ac_person', 'pc_name'],
      columnPermissionIds: ['ac_username', 'pc_name'],
      editPermissionIds: [],
      grantedAt: '2026-06-02T08:00:00.000Z',
    },
    {
      id: 'tr_gov_auditor',
      tenantId: '4',
      name: '审计',
      code: 'AUDITOR',
      sort: 30,
      remark: '',
      enabled: true,
      createdAt: '2026-06-03T08:00:00.000Z',
      menuIds: ['MenuManage', 'RoleManage'],
      functionIds: ['mf_query', 'mf_export', 'rf_query'],
      queryPermissionIds: ['mc_title', 'mc_name', 'rc_name', 'rc_code'],
      columnPermissionIds: ['mc_title', 'mc_name', 'rc_name', 'rc_code'],
      editPermissionIds: [],
      grantedAt: '2026-06-03T08:00:00.000Z',
    },
    {
      id: 'tr_gov_lead',
      tenantId: '4',
      name: '科室负责人',
      code: 'LEAD',
      sort: 15,
      remark: '',
      enabled: true,
      createdAt: '2026-06-04T08:00:00.000Z',
      menuIds: ['DeptManage', 'PostManage'],
      functionIds: ['df_query', 'df_create', 'post_query'],
      queryPermissionIds: ['dc_name', 'dc_code', 'postc_name'],
      columnPermissionIds: ['dc_name', 'dc_code', 'postc_name'],
      editPermissionIds: ['dc_name', 'postc_name'],
      grantedAt: '2026-06-04T08:00:00.000Z',
    },
    {
      id: 'tr_north_member',
      tenantId: '5',
      name: '会员管理',
      code: 'MEMBER',
      sort: 20,
      remark: '',
      enabled: true,
      createdAt: '2026-07-02T04:00:00.000Z',
      menuIds: ['AccountManage'],
      functionIds: ['af_query'],
      queryPermissionIds: ['ac_username', 'ac_enabled'],
      columnPermissionIds: ['ac_username'],
      editPermissionIds: [],
      grantedAt: '2026-07-02T04:00:00.000Z',
    },
  ]
}

function getCustomRoleStore() {
  const g = globalThis as typeof globalThis & {
    __GROW_TENANT_CUSTOM_ROLES__?: CustomRole[]
    __GROW_TENANT_CUSTOM_ROLES_VERSION__?: number
  }
  if (!g.__GROW_TENANT_CUSTOM_ROLES__ || g.__GROW_TENANT_CUSTOM_ROLES_VERSION__ !== STORE_VERSION) {
    g.__GROW_TENANT_CUSTOM_ROLES__ = createCustomRoleStore()
    g.__GROW_TENANT_CUSTOM_ROLES_VERSION__ = STORE_VERSION
  }
  return g.__GROW_TENANT_CUSTOM_ROLES__
}

function listRoleMembers(tenantId: string, roleId: string) {
  return listTenantAccounts(tenantId)
    .filter((account) => account.roleIds?.includes(roleId))
    .map((account) => ({
      accountId: account.accountId,
      username: account.username,
      personName: account.personId ? account.personName : undefined,
      enabled: account.enabled,
    }))
}

function toBuiltInItem(tenant: NonNullable<ReturnType<typeof findTenant>>) {
  return {
    id: tenantAdminRoleId(tenant.id),
    tenantId: tenant.id,
    tenantCode: tenant.tenantCode,
    tenantName: tenant.tenantName,
    tenantStatus: tenant.status,
    name: ROLE_NAME,
    code: ROLE_CODE,
    builtIn: true,
    enabled: true,
    memberCount: countTenantAdminMembers(tenant.id),
    menuCount: countGrantedMenus(tenant.menuIds),
    functionCount: tenant.functionIds.length,
    grantedAt: tenant.grantedAt,
    createdAt: tenant.createdAt,
    remark: '内置角色，权限与租户授权同步',
    sort: 0,
  }
}

function toCustomItem(role: CustomRole, tenant: NonNullable<ReturnType<typeof findTenant>>) {
  return {
    id: role.id,
    tenantId: role.tenantId,
    tenantCode: tenant.tenantCode,
    tenantName: tenant.tenantName,
    tenantStatus: tenant.status,
    name: role.name,
    code: role.code,
    builtIn: false,
    enabled: role.enabled,
    memberCount: listRoleMembers(role.tenantId, role.id).length,
    menuCount: role.menuIds?.length || 0,
    functionCount: role.functionIds?.length || 0,
    grantedAt: role.grantedAt || null,
    createdAt: role.createdAt,
    remark: role.remark,
    sort: role.sort,
  }
}

function listAllRoles() {
  const items = listTenants()
    .filter((item) => item.status !== 'deleted')
    .flatMap((tenant) => {
      const customs = getCustomRoleStore()
        .filter((role) => role.tenantId === tenant.id)
        .map((role) => toCustomItem(role, tenant))
      return [toBuiltInItem(tenant), ...customs]
    })
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

function readonlyTree() {
  return GRANT_TREE.map((node) => ({
    ...node,
    disabled: true,
    children: node.children?.map((child) => ({ ...child, disabled: true })),
  }))
}

export default [
  {
    url: mockUrl('/platform/tenant-admin-roles/page'),
    method: 'post',
    timeout: 60,
    response: ({ body }) => {
      const payload = (body || {}) as Recordable<any>
      const keyword = text(payload.keyword).toLowerCase()
      const tenantId = text(payload.tenantId)
      const tenantStatus = text(payload.tenantStatus)
      const builtIn = parseBoolean(payload.builtIn)
      const enabled = parseBoolean(payload.enabled)
      const page = Math.max(1, Number(payload.page || 1))
      const pageSize = Math.max(1, Number(payload.pageSize || 10))
      const filtered = listAllRoles().filter((item) => {
        if (tenantId && item.tenantId !== tenantId) return false
        if (tenantStatus && item.tenantStatus !== tenantStatus) return false
        if (builtIn != null && item.builtIn !== builtIn) return false
        if (enabled != null && item.enabled !== enabled) return false
        if (!keyword) return true
        const haystack = [item.tenantCode, item.tenantName, item.name, item.code]
          .join(' ')
          .toLowerCase()
        return haystack.includes(keyword)
      })
      const start = (page - 1) * pageSize
      return resultSuccess({
        items: filtered.slice(start, start + pageSize),
        total: filtered.length,
      })
    },
  },
  {
    url: mockUrl('/platform/tenant-admin-role/detail'),
    method: 'post',
    timeout: 40,
    response: ({ body }) => {
      const roleId = text((body as Recordable<any>)?.roleId)
      const all = listAllRoles()
      const item = all.find((role) => role.id === roleId)
      if (!item) return resultError('角色不存在')
      const tenant = findTenant(item.tenantId)
      if (!tenant) return resultError('租户不存在')
      if (item.builtIn) {
        return resultSuccess({
          ...item,
          members: listRoleMembers(tenant.id, roleId),
          tree: readonlyTree(),
          menuIds: [...tenant.menuIds],
          functionIds: [...tenant.functionIds],
          queryPermissionIds: [...(tenant.columnPermissionIds || [])],
          columnPermissionIds: [...(tenant.columnPermissionIds || [])],
          editPermissionIds: [...(tenant.columnPermissionIds || [])],
          dataPerms: [],
        })
      }
      const role = getCustomRoleStore().find((entry) => entry.id === roleId)!
      return resultSuccess({
        ...item,
        members: listRoleMembers(tenant.id, roleId),
        tree: readonlyTree(),
        menuIds: [...(role.menuIds || [])],
        functionIds: [...(role.functionIds || [])],
        queryPermissionIds: [...(role.queryPermissionIds || [])],
        columnPermissionIds: [...(role.columnPermissionIds || [])],
        editPermissionIds: [...(role.editPermissionIds || [])],
        dataPerms: structuredClone(role.dataPerms || []),
      })
    },
  },
  {
    url: mockUrl('/platform/tenant-admin-role/create'),
    method: 'post',
    timeout: 80,
    response: ({ body }) => {
      const payload = (body || {}) as Recordable<any>
      const tenantId = text(payload.tenantId)
      const tenant = findTenant(tenantId)
      if (!tenant) return resultError('租户不存在')
      if (tenant.status === 'deleted') return resultError('已删除租户不可新增角色')
      const name = text(payload.name)
      const code = text(payload.code)
      if (!name) return resultError('请填写角色名称')
      if (!CODE_PATTERN.test(code)) return resultError('编码需以字母开头，仅含字母数字下划线')
      if (code.toUpperCase() === ROLE_CODE) return resultError('TENANT_ADMIN 为内置编码，不可新增')
      const store = getCustomRoleStore()
      const duplicated = store.some(
        (item) => item.tenantId === tenantId && item.code.toLowerCase() === code.toLowerCase(),
      )
      if (duplicated) return resultError('该租户下角色编码已存在')
      const created: CustomRole = {
        id: `tr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
        tenantId,
        name,
        code,
        sort: Number(payload.sort || 10),
        remark: text(payload.remark),
        enabled: true,
        createdAt: now(),
      }
      store.unshift(created)
      tenant.roleCount += 1
      return resultSuccess({
        ...toCustomItem(created, tenant),
        members: [],
        tree: readonlyTree(),
        menuIds: [],
        functionIds: [],
        queryPermissionIds: [],
        columnPermissionIds: [],
        editPermissionIds: [],
        dataPerms: [],
      }, { message: '创建成功' })
    },
  },
  {
    url: mockUrl('/platform/tenant-admin-role/update'),
    method: 'put',
    response: ({ body }) => {
      const payload = (body || {}) as Recordable<any>
      const role = getCustomRoleStore().find((item) => item.id === text(payload.roleId))
      if (!role) return resultError('内置角色不能编辑或角色不存在')
      const name = text(payload.name)
      const code = text(payload.code)
      if (!name) return resultError('请填写角色名称')
      if (!CODE_PATTERN.test(code) || code.toUpperCase() === ROLE_CODE) return resultError('角色编码无效')
      if (getCustomRoleStore().some((item) => item.id !== role.id && item.tenantId === role.tenantId && item.code.toLowerCase() === code.toLowerCase())) {
        return resultError('该租户下角色编码已存在')
      }
      role.name = name
      role.code = code
      role.sort = Number(payload.sort ?? 10)
      role.remark = text(payload.remark)
      return resultSuccess(toCustomItem(role, findTenant(role.tenantId)!), { message: '保存成功' })
    },
  },
  {
    url: mockUrl('/platform/tenant-admin-role/accounts'),
    method: 'post',
    response: ({ body }) => {
      const tenantId = text((body as Recordable<any>)?.tenantId)
      if (!findTenant(tenantId)) return resultError('租户不存在')
      return resultSuccess(listTenantAccounts(tenantId).map((account) => ({
        accountId: account.accountId,
        username: account.username,
        personName: account.personId ? account.personName : undefined,
        enabled: account.enabled,
      })))
    },
  },
  {
    url: mockUrl('/platform/tenant-admin-role/members'),
    method: 'put',
    response: ({ body }) => {
      const payload = (body || {}) as Recordable<any>
      const role = getCustomRoleStore().find((item) => item.id === text(payload.roleId))
      if (!role) return resultError('内置角色不能绑定账号或角色不存在')
      if (!Array.isArray(payload.accountIds)) return resultError('请选择账号')
      const selected = new Set(payload.accountIds.map(String))
      const accounts = listTenantAccounts(role.tenantId)
      if ([...selected].some((id) => !accounts.some((account) => account.accountId === id))) return resultError('账号不属于当前租户')
      accounts.forEach((account) => {
        const previous = account.roleIds || []
        const next = previous.filter((id) => id !== role.id)
        if (selected.has(account.accountId)) next.push(role.id)
        if (previous.length !== next.length || previous.some((id, index) => id !== next[index])) {
          account.roleIds = next
          account.updatedAt = now()
        }
      })
      return resultSuccess(toCustomItem(role, findTenant(role.tenantId)!), { message: '绑定成功' })
    },
  },
  {
    url: mockUrl('/platform/tenant-admin-role/enabled'),
    method: 'put',
    response: ({ body }) => {
      const payload = (body || {}) as Recordable<any>
      const role = getCustomRoleStore().find((item) => item.id === text(payload.roleId))
      if (!role) return resultError('内置角色不能停用或角色不存在')
      if (typeof payload.enabled !== 'boolean') return resultError('状态无效')
      role.enabled = payload.enabled
      return resultSuccess(toCustomItem(role, findTenant(role.tenantId)!))
    },
  },
  {
    url: mockUrl('/platform/tenant-admin-role/delete-impact'),
    method: 'post',
    response: ({ body }) => {
      const role = getCustomRoleStore().find((item) => item.id === text((body as Recordable<any>)?.roleId))
      if (!role) return resultError('内置角色不能删除或角色不存在')
      return resultSuccess({
        memberCount: listRoleMembers(role.tenantId, role.id).length,
        menuCount: role.menuIds?.length || 0,
        functionCount: role.functionIds?.length || 0,
        dataPermCount: role.dataPerms?.length || 0,
      })
    },
  },
  {
    url: mockUrl('/platform/tenant-admin-role/delete'),
    method: 'post',
    response: ({ body }) => {
      const store = getCustomRoleStore()
      const index = store.findIndex((item) => item.id === text((body as Recordable<any>)?.roleId))
      if (index < 0) return resultError('内置角色不能删除或角色不存在')
      const role = store[index]
      if (role.enabled) return resultError('启用中的角色不能删除，请先停用')
      listTenantAccounts(role.tenantId).forEach((account) => {
        if (account.roleIds?.includes(role.id)) {
          account.roleIds = account.roleIds.filter((id) => id !== role.id)
          account.updatedAt = now()
        }
      })
      store.splice(index, 1)
      const tenant = findTenant(role.tenantId)
      if (tenant) tenant.roleCount = Math.max(1, tenant.roleCount - 1)
      return resultSuccess(null, { message: '删除成功' })
    },
  },
  {
    url: mockUrl('/platform/tenant-admin-role/grant'),
    method: 'put',
    timeout: 80,
    response: ({ body }) => {
      const payload = (body || {}) as Recordable<any>
      const role = getCustomRoleStore().find((item) => item.id === text(payload.roleId))
      if (!role) return resultError('普通角色不存在或不可授权')
      const tenant = findTenant(role.tenantId)
      if (!tenant) return resultError('租户不存在')
      const menuIds = (Array.isArray(payload.menuIds) ? payload.menuIds.map(String) : []) as string[]
      const functionIds = (Array.isArray(payload.functionIds) ? payload.functionIds.map(String) : []) as string[]
      const queryPermissionIds = (Array.isArray(payload.queryPermissionIds) ? payload.queryPermissionIds.map(String) : []) as string[]
      const columnPermissionIds = (Array.isArray(payload.columnPermissionIds) ? payload.columnPermissionIds.map(String) : []) as string[]
      const editPermissionIds = (Array.isArray(payload.editPermissionIds) ? payload.editPermissionIds.map(String) : []) as string[]
      if (menuIds.some((id) => !tenant.menuIds.includes(id)) || functionIds.some((id) => !tenant.functionIds.includes(id))) {
        return resultError('授权超出租户菜单或功能范围')
      }
      const allowedColumns = new Set(tenant.columnPermissionIds || [])
      if ([...queryPermissionIds, ...columnPermissionIds, ...editPermissionIds].some((id) => !allowedColumns.has(id))) {
        return resultError('字段授权超出租户范围')
      }
      const queried = new Set(queryPermissionIds)
      if ([...columnPermissionIds, ...editPermissionIds].some((id) => !queried.has(id))) {
        return resultError('列权限和编辑权限须先授权查询')
      }
      role.menuIds = menuIds
      role.functionIds = functionIds
      role.queryPermissionIds = queryPermissionIds
      role.columnPermissionIds = columnPermissionIds
      role.editPermissionIds = editPermissionIds
      role.dataPerms = (role.dataPerms || []).filter((item) => !validateDataPerms(role, [item]))
      role.grantedAt = now()
      return resultSuccess({
        ...toCustomItem(role, tenant),
        members: listRoleMembers(tenant.id, role.id),
        tree: readonlyTree(),
        menuIds,
        functionIds,
        queryPermissionIds,
        columnPermissionIds,
        editPermissionIds,
        dataPerms: structuredClone(role.dataPerms),
      }, { message: '授权已保存' })
    },
  },
  {
    url: mockUrl('/platform/tenant-admin-role/depts'),
    method: 'post',
    response: ({ body }) => {
      const tenantId = text((body as Recordable<any>)?.tenantId)
      if (!findTenant(tenantId)) return resultError('租户不存在')
      return resultSuccess(tenantDepts(tenantId))
    },
  },
  {
    url: mockUrl('/platform/tenant-admin-role/users'),
    method: 'post',
    response: ({ body }) => {
      const tenantId = text((body as Recordable<any>)?.tenantId)
      if (!findTenant(tenantId)) return resultError('租户不存在')
      return resultSuccess(listTenantAccounts(tenantId).map((account) => ({
        id: account.accountId, name: account.personId ? account.personName || account.username : account.username,
      })))
    },
  },
  {
    url: mockUrl('/platform/tenant-admin-role/data-perm'),
    method: 'put',
    response: ({ body }) => {
      const payload = (body || {}) as Recordable<any>
      const role = getCustomRoleStore().find((item) => item.id === text(payload.roleId))
      if (!role) return resultError('普通角色不存在或不可配置数据权限')
      const items = Array.isArray(payload.items) ? payload.items : []
      const error = validateDataPerms(role, items)
      if (error) return resultError(error)
      role.dataPerms = structuredClone(items).map((item: RoleDataPerm) => ({
        ...item,
        viewOther: item.editScope === 'all' ? 'none' : item.viewOther,
        deptIds: item.editScope === 'custom' ? item.deptIds : [],
        selfRelated: item.selfRelated || { createdBySelf: true, fieldContainsSelf: false, columnIds: [] },
        viewSelfRelated: item.viewSelfRelated || { createdBySelf: true, fieldContainsSelf: false, columnIds: [] },
        filters: item.editScope === 'specified' ? item.filters : [],
        viewFilters: item.editScope !== 'all' && item.viewOther === 'specified' ? item.viewFilters : [],
      })) as RoleDataPerm[]
      return resultSuccess({
        ...toCustomItem(role, findTenant(role.tenantId)!),
        members: listRoleMembers(role.tenantId, role.id),
        tree: readonlyTree(),
        menuIds: [...(role.menuIds || [])],
        functionIds: [...(role.functionIds || [])],
        queryPermissionIds: [...(role.queryPermissionIds || [])],
        columnPermissionIds: [...(role.columnPermissionIds || [])],
        editPermissionIds: [...(role.editPermissionIds || [])],
        dataPerms: structuredClone(role.dataPerms),
      }, { message: '数据权限已保存' })
    },
  },
] as MockMethod[]

<template>
  <div class="tenant-admin-role">
    <GrowRow justify="space-between" class="tenant-admin-role__toolbar">
      <GrowCol :span="14">
        <GrowButton type="primary" @click="openCreate()">新增</GrowButton>
      </GrowCol>
      <GrowCol :span="10">
        <div class="tenant-admin-role__toolbar-options">
          <GrowSearchBar :search="searchList" @search="onSearch" />
          <GrowColumnBar :columns="tableColumns" @confirm="onColumnsConfirm" />
        </div>
      </GrowCol>
    </GrowRow>

    <div class="tenant-admin-role__table">
      <GrowWatchBox class="tenant-admin-role__watch">
        <template #default="{ height }">
          <GrowTable
            v-if="height > 0"
            :data="tableData"
            :height="`${height}px`"
            row-key="id"
            border
          >
            <GrowTableColumn
              v-for="col in leafColumns"
              :key="String(col.field)"
              :prop="String(col.field)"
              :label="col.title"
              :width="col.width"
              :min-width="col.minWidth || (col.width ? undefined : 120)"
              :fixed="col.fixed"
              :show-overflow-tooltip="col.field !== 'actions' && col.field !== 'tenantStatus' && col.field !== 'name'"
            >
              <template #default="{ row }">
                <template v-if="col.field === 'name'">
                  <span class="tenant-admin-role__name">
                    {{ row.name }}
                    <GrowTag v-if="row.builtIn" type="info" size="small">内置</GrowTag>
                  </span>
                </template>
                <template v-else-if="col.field === 'tenantStatus'">
                  <GrowTag :type="tenantStatusTagType(row.tenantStatus)" size="small">
                    {{ tenantStatusLabel(row.tenantStatus) }}
                  </GrowTag>
                </template>
                <template v-else-if="col.field === 'memberCount'">
                  <GrowButton link type="primary" @click="openView(row)">{{ row.memberCount }}</GrowButton>
                </template>
                <template v-else-if="col.field === 'grantedAt'">{{ formatTime(row.grantedAt) }}</template>
                <template v-else-if="col.field === 'actions'">
                  <div class="tenant-admin-role__actions">
                    <GrowTooltip content="查看" placement="top">
                      <GrowButton class="tenant-admin-role__icon-btn" link type="primary" @click="openView(row)">
                        <GrowIconify icon="ant-design:profile-outlined" :size="16" />
                      </GrowButton>
                    </GrowTooltip>
                    <GrowTooltip v-if="!row.builtIn" content="授权" placement="top">
                      <GrowButton class="tenant-admin-role__icon-btn" link type="primary" @click="openGrant(row)">
                        <GrowIconify icon="ant-design:safety-certificate-outlined" :size="16" />
                      </GrowButton>
                    </GrowTooltip>
                    <GrowTooltip v-if="!row.builtIn" content="数据权限" placement="top">
                      <GrowButton class="tenant-admin-role__icon-btn" link type="primary" @click="openDataPerm(row)">
                        <GrowIconify icon="ant-design:database-outlined" :size="16" />
                      </GrowButton>
                    </GrowTooltip>
                  </div>
                </template>
                <template v-else>{{ row[col.field] ?? '-' }}</template>
              </template>
            </GrowTableColumn>
          </GrowTable>
        </template>
      </GrowWatchBox>
    </div>

    <div class="tenant-admin-role__pager">
      <GrowPagination
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        :total="total"
        layout="total, sizes, prev, pager, next"
        background
        @current-change="loadList"
        @size-change="onSizeChange"
      />
    </div>

    <GrowDrawer
      v-model="detailVisible"
      title="查看租户角色"
      size="680px"
      append-to-body
      destroy-on-close
    >
      <GrowWatchBox class="tenant-admin-role__detail-watch">
        <template #default="{ height }">
          <GrowScrollbar v-if="height > 0" :height="`${height}px`">
            <div class="tenant-admin-role__detail-content">
              <div v-if="detailLoading" class="tenant-admin-role__empty">加载中…</div>
              <template v-else-if="detail">
                <dl class="tenant-admin-role__meta">
                  <div><dt>角色名称</dt><dd>{{ detail.name }}</dd></div>
                  <div><dt>角色编码</dt><dd>{{ detail.code }}</dd></div>
                  <div><dt>授权菜单</dt><dd>{{ detail.menuCount }}</dd></div>
                  <div><dt>功能权限</dt><dd>{{ detail.functionCount }}</dd></div>
                </dl>
                <section>
                  <div class="tenant-admin-role__section-title">成员账号</div>
                  <div class="tenant-admin-role__members">
                    <div v-if="!detail.members.length" class="tenant-admin-role__empty">
                      {{ detail.builtIn ? '尚未分配租户管理员账号' : '暂无成员' }}
                    </div>
                    <div v-for="member in detail.members" :key="member.accountId" class="tenant-admin-role__member">
                      <div class="tenant-admin-role__member-info">
                        <strong>{{ member.username }}</strong>
                        <span v-if="member.personName">人员：{{ member.personName }}</span>
                      </div>
                      <GrowTag :type="member.enabled ? 'success' : 'info'" size="small">
                        {{ member.enabled ? '启用' : '停用' }}
                      </GrowTag>
                    </div>
                  </div>
                </section>
                <section>
                  <div class="tenant-admin-role__section-title">授权权限</div>
                  <div class="tenant-admin-role__grant">
                    <GrowTree
                      v-if="detailTree.length"
                      :key="detail.id"
                      :data="detailTree"
                      node-key="id"
                      :expand-on-click-node="false"
                      :default-expand-all="true"
                      :props="{ label: 'title', children: 'children' }"
                    >
                      <template #default="{ data }">
                        <span
                          class="tenant-admin-role__tree-node"
                          :class="{
                            'tenant-admin-role__tree-node--nested': data.kind === 'function' || data.kind === 'table',
                            'tenant-admin-role__tree-node--field': data.kind === 'field',
                          }"
                        >
                          <span>{{ data.title }}</span>
                          <span v-if="data.kind === 'field'" class="tenant-admin-role__field-permissions">
                            <GrowTag v-for="permission in data.permissions" :key="permission" size="small" type="info">
                              {{ permission }}
                            </GrowTag>
                          </span>
                        </span>
                      </template>
                    </GrowTree>
                    <div v-else class="tenant-admin-role__empty">暂无授权权限</div>
                  </div>
                </section>
              </template>
            </div>
          </GrowScrollbar>
        </template>
      </GrowWatchBox>
      <template #footer>
        <GrowButton @click="detailVisible = false">关闭</GrowButton>
      </template>
    </GrowDrawer>

    <GrowDialog
      v-model="formVisible"
      title="新增租户角色"
      width="520px"
      append-to-body
      destroy-on-close
    >
      <GrowForm
        ref="formRef"
        class="tenant-admin-role__form"
        :model="formModel"
        :rules="formRules"
        label-width="84px"
      >
        <GrowFormItem label="所属租户" prop="tenantId">
          <GrowSelect
            v-model="formModel.tenantId"
            :options="tenantSelectOptions"
            filterable
            placeholder="请选择租户"
          />
        </GrowFormItem>
        <GrowFormItem label="名称" prop="name">
          <GrowInput v-model="formModel.name" maxlength="64" clearable placeholder="角色名称" />
        </GrowFormItem>
        <GrowFormItem label="编码" prop="code">
          <GrowInput v-model="formModel.code" maxlength="64" clearable placeholder="角色唯一编码" />
        </GrowFormItem>
        <GrowFormItem label="排序" prop="sort">
          <GrowInputNumber
            v-model="formModel.sort"
            :min="0"
            :max="9999"
            controls-position="right"
          />
        </GrowFormItem>
        <GrowFormItem label="角色描述" prop="remark">
          <GrowInput
            v-model="formModel.remark"
            type="textarea"
            :rows="3"
            maxlength="200"
            show-word-limit
          />
        </GrowFormItem>
      </GrowForm>
      <template #footer>
        <GrowSpace>
          <GrowButton @click="formVisible = false">取消</GrowButton>
          <GrowButton type="primary" :loading="formSubmitting" @click="submitForm">
            确定
          </GrowButton>
        </GrowSpace>
      </template>
    </GrowDialog>

    <TenantAdminRoleGrantDialog v-model="grantVisible" :role="grantTarget" @saved="loadList" />
    <TenantAdminRoleDataPermDrawer v-model="dataPermVisible" :role="dataPermTarget" @saved="loadList" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { SystemTenantGrantMenu } from '../../types/systemTenant'
import type { TenantAdminRoleListItem } from '../../types/systemTenantAdminRole'
import TenantAdminRoleGrantDialog from './TenantAdminRoleGrantDialog.vue'
import TenantAdminRoleDataPermDrawer from './TenantAdminRoleDataPermDrawer.vue'
import { useTenantAdminRole } from './use/useTenantAdminRole'

defineOptions({
  name: 'TenantAdminRolePage',
})

const grantVisible = ref(false)
const grantTarget = ref<TenantAdminRoleListItem | null>(null)
const dataPermVisible = ref(false)
const dataPermTarget = ref<TenantAdminRoleListItem | null>(null)

function openDataPerm(row: TenantAdminRoleListItem) {
  dataPermTarget.value = row
  dataPermVisible.value = true
}

function openGrant(row: TenantAdminRoleListItem) {
  grantTarget.value = row
  grantVisible.value = true
}

const {
  tableData,
  total,
  page,
  pageSize,
  searchList,
  tableColumns,
  leafColumns,
  loadList,
  onSearch,
  onColumnsConfirm,
  onSizeChange,
  detailVisible,
  detailLoading,
  detail,
  detailColumns,
  detailTables,
  openView,
  formVisible,
  formSubmitting,
  formRef,
  formModel,
  formRules,
  tenantSelectOptions,
  openCreate,
  submitForm,
  formatTime,
  tenantStatusLabel,
  tenantStatusTagType,
} = useTenantAdminRole()

type GrantNode = {
  id: string
  title: string
  kind: 'menu' | 'group' | 'function' | 'table' | 'field'
  permissions?: string[]
  children?: GrantNode[]
}

const detailTree = computed<GrantNode[]>(() => {
  if (!detail.value) return []
  const menuIds = new Set(detail.value.menuIds)
  const functionIds = new Set(detail.value.functionIds)
  const queryIds = new Set(detail.value.queryPermissionIds)
  const columnIds = new Set(detail.value.columnPermissionIds)
  const editIds = new Set(detail.value.editPermissionIds)

  function buildMenu(menu: SystemTenantGrantMenu): GrantNode | null {
    const children = (menu.children || []).map(buildMenu).filter((node): node is GrantNode => node !== null)
    const functions = menu.functions.filter((item) => functionIds.has(item.id))
    if (functions.length) {
      children.push(
        { id: `functions:${menu.id}`, title: '功能授权', kind: 'group' },
        ...functions.map((item) => ({
          id: `function:${menu.id}:${item.id}`,
          title: item.title,
          kind: 'function' as const,
        })),
      )
    }
    const tables = detailTables.value.filter((table) => table.menuName === menu.id).map((table) => ({
      table,
      fields: detailColumns.value
        .filter((column) => column.menuName === menu.id && column.tableCode === table.code)
        .map((column) => ({
          id: `field:${column.id}`,
          title: column.title,
          kind: 'field' as const,
          permissions: [
            queryIds.has(column.id) && '查询权限',
            columnIds.has(column.id) && '列权限',
            editIds.has(column.id) && '编辑权限',
          ].filter((permission): permission is string => Boolean(permission)),
        })).filter((column) => column.permissions.length),
    })).filter((item) => item.fields.length)
    if (tables.length) {
      children.push({ id: `fields:${menu.id}`, title: '字段授权', kind: 'group' })
      tables.forEach(({ table, fields }) => {
        children.push({ id: `table:${menu.id}:${table.code}`, title: table.title, kind: 'table' }, ...fields)
      })
    }
    if (!menuIds.has(menu.id) && !children.length) return null
    return { id: `menu:${menu.id}`, title: menu.title, kind: 'menu', children }
  }

  return detail.value.tree.map(buildMenu).filter((node): node is GrantNode => node !== null)
})
</script>

<style scoped>
.tenant-admin-role {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  min-height: 0;
  padding: 10px;
}

.tenant-admin-role__toolbar {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--component-background-color);
}

.tenant-admin-role__toolbar-options {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.tenant-admin-role__table {
  flex: 1;
  min-height: 0;
  margin-top: 10px;
  overflow: hidden;
  border-radius: 8px;
  background: var(--component-background-color);
}

.tenant-admin-role__watch {
  height: 100%;
  min-height: 0;
}

.tenant-admin-role__pager {
  display: flex;
  justify-content: flex-end;
  padding: 12px;
  background: var(--component-background-color);
}

.tenant-admin-role__name,
.tenant-admin-role__actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.tenant-admin-role__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: auto;
  height: auto;
  margin: 0;
  padding: 2px;
  line-height: 1;
}

.tenant-admin-role__icon-btn :deep(.grow-iconify) {
  display: flex !important;
}

.tenant-admin-role__meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 24px;
  margin: 0 0 16px;
}

.tenant-admin-role__meta div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  line-height: 28px;
}

.tenant-admin-role__meta dt,
.tenant-admin-role__meta dd {
  margin: 0;
}

.tenant-admin-role__meta dt {
  color: var(--text-color-secondary);
}

.tenant-admin-role__section-title {
  margin: 16px 0 8px;
  font-weight: 600;
}

.tenant-admin-role__empty {
  padding: 16px 0;
  color: var(--text-color-secondary);
  text-align: center;
}

.tenant-admin-role__detail-watch {
  height: 100%;
  min-height: 240px;
}

.tenant-admin-role__detail-content {
  padding: 16px;
}

.tenant-admin-role__members {
  padding: 0 12px;
  border: 1px solid var(--layout-border-color);
  border-radius: 6px;
}

.tenant-admin-role__member {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
}

.tenant-admin-role__member + .tenant-admin-role__member {
  border-top: 1px solid var(--layout-border-color);
}

.tenant-admin-role__member-info {
  display: flex;
  align-items: baseline;
  gap: 12px;
  min-width: 0;
  overflow-wrap: anywhere;
}

.tenant-admin-role__member-info span {
  color: var(--text-color-secondary);
}

.tenant-admin-role__grant {
  padding: 8px;
  border: 1px solid var(--layout-border-color);
  border-radius: 6px;
  overflow: hidden;
}

.tenant-admin-role__tree-node,
.tenant-admin-role__field-permissions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.tenant-admin-role__field-permissions {
  margin-left: 12px;
}

.tenant-admin-role__tree-node--nested {
  padding-left: 16px;
}

.tenant-admin-role__tree-node--field {
  padding-left: 32px;
}

.tenant-admin-role__form {
  padding: 4px 8px 0 0;
}
</style>

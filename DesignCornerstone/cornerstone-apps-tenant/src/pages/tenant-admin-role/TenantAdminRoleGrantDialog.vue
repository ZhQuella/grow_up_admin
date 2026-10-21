<template>
  <GrowDialog :model-value="modelValue" title="角色授权" width="760px" append-to-body destroy-on-close @update:model-value="emit('update:modelValue', $event)">
    <p class="role-grant__hint">{{ role?.tenantName }}（{{ role?.tenantCode }}）· {{ role?.name }}</p>
    <div class="role-grant__option">
      <span>勾选菜单时同时授权所有功能和字段授权</span>
      <GrowSwitch v-model="grantWithMenu" />
    </div>
    <div v-if="loading" class="role-grant__empty">加载授权…</div>
    <div v-else class="role-grant__layout">
      <aside class="role-grant__aside">
        <strong>应用功能</strong>
        <GrowScrollbar height="360px">
          <div v-for="menu in menus" :key="menu.id" class="role-grant__menu" :class="{ 'is-active': menu.id === activeMenuId }" @click="activeMenuId = menu.id">
            <GrowCheckbox :model-value="menuIds.includes(menu.id)" @click.stop @update:model-value="(value) => toggleMenu(menu.id, Boolean(value))" />
            <span>{{ menu.title }}</span>
          </div>
          <div v-if="!menus.length" class="role-grant__empty">该租户暂无授权的应用功能</div>
        </GrowScrollbar>
      </aside>
      <main class="role-grant__main">
        <GrowTabs v-model="activeTab">
          <GrowTabPane label="功能授权" name="functions" />
          <GrowTabPane label="字段授权" name="fields" />
        </GrowTabs>
        <GrowScrollbar height="300px">
          <div class="role-grant__header">
            <strong>{{ activeTab === 'functions' ? '功能授权' : '字段授权' }}</strong>
            <GrowCheckbox
              :model-value="activeTab === 'functions' ? allFunctionsChecked : allFieldsChecked"
              :indeterminate="activeTab === 'functions' ? someFunctionsChecked : someFieldsChecked"
              :disabled="activeTab === 'functions' ? !activeFunctions.length : !activeFields.length"
              @update:model-value="(value) => activeTab === 'functions' ? toggleAllFunctions(Boolean(value)) : toggleAllFields(Boolean(value))"
            >全选</GrowCheckbox>
          </div>
          <template v-if="activeMenu">
            <template v-if="activeTab === 'functions'">
              <label v-for="item in activeFunctions" :key="item.id" class="role-grant__function">
                <GrowCheckbox :model-value="functionIds.includes(item.id)" @update:model-value="(value) => toggleFunction(item.id, Boolean(value))" />
                <span>{{ item.title }}</span><small>{{ item.code }}</small>
              </label>
              <div v-if="!activeFunctions.length" class="role-grant__empty">该应用功能暂无功能权限</div>
            </template>
            <template v-else>
              <div v-for="table in activeTables" :key="table.code" class="role-grant__table">
                <label class="role-grant__table-title">
                  <GrowCheckbox :model-value="table.columns.length > 0 && table.columns.every((column) => hasAllColumnPermissions(column.id))"
                    :indeterminate="table.columns.some((column) => hasAnyColumnPermission(column.id)) && !table.columns.every((column) => hasAllColumnPermissions(column.id))"
                    :disabled="!table.columns.length" @update:model-value="(value) => toggleTable(table.columns, Boolean(value))" />
                  <span>{{ table.title }}（全选字段）</span>
                </label>
                <div class="role-grant__field role-grant__field--head"><span>字段</span><span>查询权限</span><span>列权限</span><span>编辑权限</span></div>
                <div v-for="column in table.columns" :key="column.id" class="role-grant__field">
                  <span>{{ column.title }}</span>
                  <GrowCheckbox :model-value="queryIds.includes(column.id)" @update:model-value="(value) => toggleColumn(column.id, 'query', Boolean(value))" />
                  <GrowCheckbox :model-value="queryIds.includes(column.id) && columnIds.includes(column.id)" :disabled="!queryIds.includes(column.id)" @update:model-value="(value) => toggleColumn(column.id, 'column', Boolean(value))" />
                  <GrowCheckbox :model-value="queryIds.includes(column.id) && editIds.includes(column.id)" :disabled="!queryIds.includes(column.id)" @update:model-value="(value) => toggleColumn(column.id, 'edit', Boolean(value))" />
                </div>
              </div>
              <div v-if="!activeFields.length" class="role-grant__empty">该应用功能暂无可授权字段</div>
            </template>
          </template>
          <div v-else class="role-grant__empty">请选择应用功能</div>
        </GrowScrollbar>
      </main>
    </div>
    <template #footer>
      <GrowSpace>
        <GrowButton @click="emit('update:modelValue', false)">取消</GrowButton>
        <GrowButton type="primary" :loading="saving" :disabled="loading" @click="save">保存授权</GrowButton>
      </GrowSpace>
    </template>
  </GrowDialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch, type Ref } from 'vue'
import { useMsg } from '@grow-admin-rock/components'
import { fetchAllApplicationFunctionColumns, fetchAllApplicationFunctionTables } from '../../api/applicationFunctionColumn'
import { fetchSystemTenantApplicationFunctions, fetchSystemTenantGrantDetail } from '../../api/systemTenant'
import { getTenantAdminRoleDetail, saveTenantAdminRoleGrant } from '../../api/systemTenantAdminRole'
import type { ApplicationFunctionColumn, ApplicationFunctionNamedTable } from '../../types/applicationFunctionColumn'
import type { SystemTenantGrantMenu } from '../../types/systemTenant'
import type { TenantAdminRoleListItem } from '../../types/systemTenantAdminRole'

defineOptions({ name: 'TenantAdminRoleGrantDialog' })

const props = defineProps<{ modelValue: boolean; role: TenantAdminRoleListItem | null }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean]; saved: [] }>()
const message = useMsg() as any
const loading = ref(false)
const saving = ref(false)
const grantWithMenu = ref(true)
const activeTab = ref('functions')
const activeMenuId = ref('')
const menus = ref<SystemTenantGrantMenu[]>([])
const columns = ref<ApplicationFunctionColumn[]>([])
const tables = ref<ApplicationFunctionNamedTable[]>([])
const menuIds = ref<string[]>([])
const functionIds = ref<string[]>([])
const queryIds = ref<string[]>([])
const columnIds = ref<string[]>([])
const editIds = ref<string[]>([])

function flattenMenus(nodes: SystemTenantGrantMenu[]): SystemTenantGrantMenu[] {
  return nodes.flatMap((node) => [node, ...flattenMenus(node.children || [])])
}

const activeMenu = computed(() => menus.value.find((item) => item.id === activeMenuId.value))
const activeFunctions = computed(() => activeMenu.value?.functions || [])
const activeTables = computed(() => tables.value.filter((item) => item.menuName === activeMenuId.value).map((table) => ({
  ...table,
  columns: columns.value.filter((column) => column.menuName === table.menuName && column.tableCode === table.code),
})).filter((table) => table.columns.length))
const activeFields = computed(() => activeTables.value.flatMap((table) => table.columns))
const allFunctionsChecked = computed(() => activeFunctions.value.length > 0 && activeFunctions.value.every((item) => functionIds.value.includes(item.id)))
const someFunctionsChecked = computed(() => !allFunctionsChecked.value && activeFunctions.value.some((item) => functionIds.value.includes(item.id)))
const allFieldsChecked = computed(() => activeFields.value.length > 0 && activeFields.value.every((item) => hasAllColumnPermissions(item.id)))
const someFieldsChecked = computed(() => !allFieldsChecked.value && activeFields.value.some((item) => hasAnyColumnPermission(item.id)))

function toggleId(ids: Ref<string[]>, id: string, checked: boolean) {
  ids.value = checked ? [...new Set([...ids.value, id])] : ids.value.filter((item) => item !== id)
}

function toggleFunction(id: string, checked: boolean) {
  toggleId(functionIds, id, checked)
}

function hasAllColumnPermissions(id: string) {
  return queryIds.value.includes(id) && columnIds.value.includes(id) && editIds.value.includes(id)
}

function hasAnyColumnPermission(id: string) {
  return queryIds.value.includes(id) || columnIds.value.includes(id) || editIds.value.includes(id)
}

function toggleColumn(id: string, kind: 'query' | 'column' | 'edit', checked: boolean) {
  if (checked && kind === 'column' && !queryIds.value.includes(id)) return
  if (checked && kind === 'edit' && !queryIds.value.includes(id)) return
  toggleId(kind === 'query' ? queryIds : kind === 'column' ? columnIds : editIds, id, checked)
  if (!checked && kind === 'query') {
    toggleId(columnIds, id, false)
    toggleId(editIds, id, false)
  }
}

function toggleTable(items: ApplicationFunctionColumn[], checked: boolean) {
  items.forEach((item) => {
    if (checked) {
      toggleId(queryIds, item.id, true)
      toggleId(columnIds, item.id, true)
      toggleId(editIds, item.id, true)
    } else toggleColumn(item.id, 'query', false)
  })
}

function toggleAllFields(checked: boolean) {
  toggleTable(activeFields.value, checked)
}

function toggleAllFunctions(checked: boolean) {
  activeFunctions.value.forEach((item) => toggleId(functionIds, item.id, checked))
}

function toggleMenu(id: string, checked: boolean) {
  activeMenuId.value = id
  toggleId(menuIds, id, checked)
  const menu = menus.value.find((item) => item.id === id)
  const menuColumns = columns.value.filter((item) => item.menuName === id)
  if (checked && !grantWithMenu.value) return
  menu?.functions.forEach((item) => toggleId(functionIds, item.id, checked))
  toggleTable(menuColumns, checked)
}

watch(grantWithMenu, (enabled) => {
  if (!enabled) return
  menuIds.value.forEach((id) => {
    const menu = menus.value.find((item) => item.id === id)
    menu?.functions.forEach((item) => toggleId(functionIds, item.id, true))
    toggleTable(columns.value.filter((item) => item.menuName === id), true)
  })
})

watch(() => props.modelValue, (visible) => {
  if (visible && props.role) void load()
})

async function load() {
  const role = props.role
  if (!role) return
  loading.value = true
  activeTab.value = 'functions'
  grantWithMenu.value = true
  try {
    const [detail, limit, applications, allColumns, allTables] = await Promise.all([
      getTenantAdminRoleDetail(role.id),
      fetchSystemTenantGrantDetail(role.tenantId),
      fetchSystemTenantApplicationFunctions(),
      fetchAllApplicationFunctionColumns(),
      fetchAllApplicationFunctionTables(),
    ])
    const allowedMenus = new Set(limit.menuIds)
    const allowedFunctions = new Set(limit.functionIds)
    const allowedColumns = new Set(limit.columnPermissionIds)
    const tree = flattenMenus(limit.tree)
    menus.value = (Array.isArray(applications) ? applications : []).filter((item) => allowedMenus.has(item.name)).map((item) => ({
      id: item.name,
      title: item.title,
      directory: false,
      functions: (tree.find((menu) => menu.id === item.name)?.functions || []).filter((fn) => allowedFunctions.has(fn.id)),
    }))
    columns.value = (Array.isArray(allColumns) ? allColumns : []).filter((item) => item.enabled && allowedMenus.has(item.menuName) && allowedColumns.has(item.id))
    tables.value = Array.isArray(allTables) ? allTables : []
    menuIds.value = detail.menuIds.filter((id) => allowedMenus.has(id))
    functionIds.value = detail.functionIds.filter((id) => allowedFunctions.has(id))
    queryIds.value = (detail.queryPermissionIds || []).filter((id) => allowedColumns.has(id))
    columnIds.value = (detail.columnPermissionIds || []).filter((id) => queryIds.value.includes(id))
    editIds.value = (detail.editPermissionIds || []).filter((id) => queryIds.value.includes(id))
    activeMenuId.value = menus.value[0]?.id || ''
  } catch (error) {
    message.error(error instanceof Error ? error.message : '加载角色授权失败')
    emit('update:modelValue', false)
  } finally {
    loading.value = false
  }
}

async function save() {
  if (!props.role) return
  saving.value = true
  try {
    await saveTenantAdminRoleGrant({
      roleId: props.role.id,
      menuIds: menuIds.value,
      functionIds: functionIds.value,
      queryPermissionIds: queryIds.value,
      columnPermissionIds: columnIds.value,
      editPermissionIds: editIds.value,
    })
    message.success('授权已保存')
    emit('update:modelValue', false)
    emit('saved')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '保存授权失败')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.role-grant__hint {
  margin: 0 0 12px;
  color: var(--text-color-secondary);
}

.role-grant__option,
.role-grant__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.role-grant__option {
  margin-bottom: 12px;
}

.role-grant__layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 360px;
  border: 1px solid var(--layout-border-color);
  border-radius: 6px;
  overflow: hidden;
}

.role-grant__aside {
  padding: 8px;
  border-right: 1px solid var(--layout-border-color);
}

.role-grant__aside strong {
  display: block;
  padding: 4px 4px 12px;
}

.role-grant__menu {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  padding: 0 8px;
  border-radius: 4px;
  cursor: pointer;
}

.role-grant__menu:hover,
.role-grant__menu.is-active {
  background: var(--color-primary-a08, var(--layout-color));
}

.role-grant__main {
  padding: 12px 16px;
}

.role-grant__header {
  margin-bottom: 12px;
}

.role-grant__function,
.role-grant__table-title {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  cursor: pointer;
}

.role-grant__function small,
.role-grant__field--head {
  color: var(--text-color-secondary);
}

.role-grant__table {
  margin-bottom: 12px;
}

.role-grant__table-title {
  font-weight: 600;
}

.role-grant__field {
  display: grid;
  grid-template-columns: minmax(0, 1fr) repeat(3, 72px);
  align-items: center;
  min-height: 32px;
  gap: 4px;
}

.role-grant__field--head {
  font-size: 12px;
}

.role-grant__empty {
  padding: 16px 0;
  color: var(--text-color-secondary);
  text-align: center;
}
</style>

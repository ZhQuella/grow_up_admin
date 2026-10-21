<template>
  <GrowDialog v-model="visible" :title="role ? `角色授权 · ${role.name}` : '角色授权'" width="760px" append-to-body destroy-on-close>
    <div class="role-grant__option">
      <span>勾选菜单时同时授权所有功能和字段授权</span>
      <GrowSwitch v-model="grantWithMenu" />
    </div>
    <div v-if="loading" class="role-grant__empty">加载授权…</div>
    <div v-else class="role-grant__layout">
      <aside class="role-grant__aside">
        <strong>菜单</strong>
        <GrowScrollbar height="360px">
          <div
            v-for="menu in menus"
            :key="menu.name"
            class="role-grant__menu"
            :class="{ 'is-active': menu.name === activeMenuName, 'is-disabled': menu.disabled }"
            @click="activeMenuName = menu.name"
          >
            <GrowCheckbox
              :model-value="menuNames.includes(menu.name)"
              :disabled="menu.disabled"
              @click.stop
              @update:model-value="(value) => toggleMenu(menu.name, Boolean(value))"
            />
            <span>{{ menu.title }}</span>
          </div>
          <div v-if="!menus.length" class="role-grant__empty">暂无可授权菜单</div>
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
              :disabled="activeMenu?.disabled || (activeTab === 'functions' ? !toggleableFunctions.length : !activeFields.length)"
              @update:model-value="(value) => activeTab === 'functions' ? toggleAllFunctions(Boolean(value)) : toggleAllFields(Boolean(value))"
            >全选</GrowCheckbox>
          </div>
          <template v-if="activeMenu">
            <template v-if="activeTab === 'functions'">
              <label v-for="item in activeFunctions" :key="item.id" class="role-grant__function">
                <GrowCheckbox
                  :model-value="functionIds.includes(item.id)"
                  :disabled="activeMenu.disabled || !item.enabled"
                  @update:model-value="(value) => toggleFunction(item.id, Boolean(value))"
                />
                <span>{{ item.title }}</span>
                <small>{{ item.code }}</small>
              </label>
              <div v-if="!activeFunctions.length" class="role-grant__empty">该菜单暂无功能权限</div>
            </template>
            <template v-else>
              <div v-for="table in activeTables" :key="table.code" class="role-grant__table">
                <label class="role-grant__table-title">
                  <GrowCheckbox
                    :model-value="table.columns.every((column) => hasAllColumnPermissions(column.id))"
                    :indeterminate="table.columns.some((column) => hasAnyColumnPermission(column.id)) && !table.columns.every((column) => hasAllColumnPermissions(column.id))"
                    :disabled="activeMenu.disabled"
                    @update:model-value="(value) => toggleTable(table.columns, Boolean(value))"
                  />
                  <span>{{ table.title }}（全选字段）</span>
                </label>
                <div class="role-grant__field role-grant__field--head"><span>字段</span><span>查询权限</span><span>列权限</span><span>编辑权限</span></div>
                <div v-for="column in table.columns" :key="column.id" class="role-grant__field">
                  <span>{{ column.title }}</span>
                  <GrowCheckbox :model-value="queryIds.includes(column.id)" :disabled="activeMenu.disabled" @update:model-value="(value) => toggleColumn(column.id, 'query', Boolean(value))" />
                  <GrowCheckbox :model-value="queryIds.includes(column.id) && columnIds.includes(column.id)" :disabled="activeMenu.disabled || !queryIds.includes(column.id)" @update:model-value="(value) => toggleColumn(column.id, 'column', Boolean(value))" />
                  <GrowCheckbox :model-value="queryIds.includes(column.id) && editIds.includes(column.id)" :disabled="activeMenu.disabled || !queryIds.includes(column.id)" @update:model-value="(value) => toggleColumn(column.id, 'edit', Boolean(value))" />
                </div>
              </div>
              <div v-if="!activeFields.length" class="role-grant__empty">该菜单暂无可授权字段</div>
            </template>
          </template>
          <div v-else class="role-grant__empty">请选择菜单</div>
        </GrowScrollbar>
      </main>
    </div>
    <template #footer>
      <GrowSpace>
        <GrowButton @click="visible = false">取消</GrowButton>
        <GrowButton type="primary" :loading="saving" :disabled="loading" @click="submit">保存授权</GrowButton>
      </GrowSpace>
    </template>
  </GrowDialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch, type Ref } from 'vue'
import { useMsg } from '@grow-admin-rock/components'
import { fetchSystemMenuTree } from '../../../api/systemMenu'
import { fetchAllSystemMenuFunctions } from '../../../api/systemMenuFunction'
import { fetchAllSystemMenuColumns } from '../../../api/systemMenuColumn'
import { getSystemRoleDetail, saveSystemRoleMenuPerm } from '../../../api/systemRole'
import type { SystemMenuFunction } from '../../../types/systemMenuFunction'
import type { SystemMenuColumn } from '../../../types/systemMenuColumn'
import type { SystemRoleListItem } from '../../../types/systemRole'
import { buildRolePermTree, flattenRoleMenuTree } from '../use/permTree'
import { toMessage } from '../use/helpers'

defineOptions({ name: 'RoleMenuPermDrawer' })

const emit = defineEmits<{ success: [] }>()
const message = useMsg()
const visible = ref(false)
const loading = ref(false)
const saving = ref(false)
const role = ref<SystemRoleListItem | null>(null)
const grantWithMenu = ref(true)
const activeTab = ref('functions')
const activeMenuName = ref('')
const menus = ref<Array<{ name: string; title: string; disabled: boolean }>>([])
const functions = ref<SystemMenuFunction[]>([])
const columns = ref<SystemMenuColumn[]>([])
const menuNames = ref<string[]>([])
const functionIds = ref<string[]>([])
const queryIds = ref<string[]>([])
const columnIds = ref<string[]>([])
const editIds = ref<string[]>([])

const activeMenu = computed(() => menus.value.find((item) => item.name === activeMenuName.value))
const activeFunctions = computed(() => functions.value.filter((item) => item.menuName === activeMenuName.value)
  .sort((first, second) => first.sort - second.sort || first.title.localeCompare(second.title, 'zh-CN')))
const toggleableFunctions = computed(() => activeFunctions.value.filter((item) => item.enabled))
const activeFields = computed(() => columns.value.filter((item) => item.menuName === activeMenuName.value))
const activeTables = computed(() => {
  const tables = new Map<string, { code: string; title: string; columns: SystemMenuColumn[] }>()
  for (const column of activeFields.value) {
    const table = tables.get(column.tableCode) || { code: column.tableCode, title: column.tableTitle, columns: [] }
    table.columns.push(column)
    tables.set(column.tableCode, table)
  }
  return [...tables.values()]
})
const allFunctionsChecked = computed(() => toggleableFunctions.value.length > 0 && toggleableFunctions.value.every((item) => functionIds.value.includes(item.id)))
const someFunctionsChecked = computed(() => !allFunctionsChecked.value && toggleableFunctions.value.some((item) => functionIds.value.includes(item.id)))
const allFieldsChecked = computed(() => activeFields.value.length > 0 && activeFields.value.every((item) => hasAllColumnPermissions(item.id)))
const someFieldsChecked = computed(() => !allFieldsChecked.value && activeFields.value.some((item) => hasAnyColumnPermission(item.id)))

function toggleId(ids: Ref<string[]>, id: string, checked: boolean) {
  ids.value = checked ? [...new Set([...ids.value, id])] : ids.value.filter((item) => item !== id)
}

function hasAllColumnPermissions(id: string) {
  return queryIds.value.includes(id) && columnIds.value.includes(id) && editIds.value.includes(id)
}

function hasAnyColumnPermission(id: string) {
  return queryIds.value.includes(id) || columnIds.value.includes(id) || editIds.value.includes(id)
}

function toggleFunction(id: string, checked: boolean) {
  const item = activeFunctions.value.find((fn) => fn.id === id)
  if (!item?.enabled || activeMenu.value?.disabled) return
  toggleId(functionIds, id, checked)
}

function toggleColumn(id: string, kind: 'query' | 'column' | 'edit', checked: boolean) {
  if (activeMenu.value?.disabled || (checked && kind !== 'query' && !queryIds.value.includes(id))) return
  toggleId(kind === 'query' ? queryIds : kind === 'column' ? columnIds : editIds, id, checked)
  if (!checked && kind === 'query') {
    toggleId(columnIds, id, false)
    toggleId(editIds, id, false)
  }
}

function toggleTable(items: SystemMenuColumn[], checked: boolean) {
  if (items.length && menus.value.find((menu) => menu.name === items[0].menuName)?.disabled) return
  items.forEach((item) => {
    if (checked) {
      toggleId(queryIds, item.id, true)
      toggleId(columnIds, item.id, true)
      toggleId(editIds, item.id, true)
    } else {
      toggleId(queryIds, item.id, false)
      toggleId(columnIds, item.id, false)
      toggleId(editIds, item.id, false)
    }
  })
}

function toggleAllFields(checked: boolean) {
  toggleTable(activeFields.value, checked)
}

function toggleAllFunctions(checked: boolean) {
  if (activeMenu.value?.disabled) return
  toggleableFunctions.value.forEach((item) => toggleId(functionIds, item.id, checked))
}

function toggleMenu(name: string, checked: boolean) {
  const menu = menus.value.find((item) => item.name === name)
  if (!menu || menu.disabled) return
  activeMenuName.value = name
  toggleId(menuNames, name, checked)
  if (checked && !grantWithMenu.value) return
  functions.value.filter((item) => item.menuName === name && (item.enabled || !checked))
    .forEach((item) => toggleId(functionIds, item.id, checked))
  toggleTable(columns.value.filter((item) => item.menuName === name), checked)
}

watch(grantWithMenu, (enabled) => {
  if (!enabled) return
  menuNames.value.forEach((name) => {
    const menu = menus.value.find((item) => item.name === name)
    if (menu && !menu.disabled) {
      functions.value.filter((item) => item.menuName === name && item.enabled)
        .forEach((item) => toggleId(functionIds, item.id, true))
      toggleTable(columns.value.filter((item) => item.menuName === name), true)
    }
  })
})

async function open(row: SystemRoleListItem) {
  role.value = row
  visible.value = true
  loading.value = true
  grantWithMenu.value = true
  activeTab.value = 'functions'
  activeMenuName.value = ''
  menus.value = []
  try {
    const [detail, tree, allFunctions, allColumns] = await Promise.all([
      getSystemRoleDetail(row.id), fetchSystemMenuTree(), fetchAllSystemMenuFunctions(), fetchAllSystemMenuColumns(),
    ])
    menus.value = flattenRoleMenuTree(buildRolePermTree(Array.isArray(tree) ? tree : []))
      .map((item) => ({ name: item.menuName!, title: item.title, disabled: Boolean(item.disabled) }))
    functions.value = Array.isArray(allFunctions) ? allFunctions : []
    columns.value = (Array.isArray(allColumns) ? allColumns : []).filter((item) => item.enabled && item.columnPermission)
    menuNames.value = [...detail.menuNames]
    functionIds.value = [...detail.functionIds]
    queryIds.value = [...(detail.queryPermissionIds || [])]
    columnIds.value = [...(detail.columnPermissionIds || [])].filter((id) => queryIds.value.includes(id))
    editIds.value = [...(detail.editPermissionIds || [])].filter((id) => queryIds.value.includes(id))
    activeMenuName.value = menuNames.value.find((name) => menus.value.some((item) => item.name === name)) || menus.value[0]?.name || ''
  } catch (error) {
    message.error(toMessage(error, '加载角色授权失败'))
    visible.value = false
  } finally {
    loading.value = false
  }
}

async function submit() {
  const id = role.value?.id
  if (!id) return
  saving.value = true
  try {
    await saveSystemRoleMenuPerm(id, {
      menuNames: menuNames.value,
      functionIds: functionIds.value,
      queryPermissionIds: queryIds.value,
      columnPermissionIds: columnIds.value,
      editPermissionIds: editIds.value,
    })
    message.success('授权已保存')
    visible.value = false
    emit('success')
  } catch (error) {
    message.error(toMessage(error, '保存角色授权失败'))
  } finally {
    saving.value = false
  }
}

defineExpose({ open })
</script>

<style scoped>
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
  grid-template-columns: 270px minmax(0, 1fr);
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

.role-grant__menu.is-disabled {
  color: var(--text-color-secondary);
}

.role-grant__main {
  min-width: 0;
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

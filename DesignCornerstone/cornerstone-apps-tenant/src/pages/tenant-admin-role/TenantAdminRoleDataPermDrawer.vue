<template>
  <GrowDrawer v-model="visible" :title="role ? `数据权限 · ${role.name}` : '数据权限'" size="920px" append-to-body destroy-on-close>
    <GrowWatchBox class="tenant-role-data__watch">
      <template #default="{ height }">
        <div v-if="height > 0" class="tenant-role-data" :style="{ height: `${height}px` }">
          <aside class="tenant-role-data__aside">
            <strong>已授权应用页面</strong>
            <div class="tenant-role-data__aside-scroll">
              <GrowScrollbar height="100%">
                <div v-if="loading" class="tenant-role-data__hint">加载中…</div>
                <div v-else-if="!menus.length" class="tenant-role-data__hint">请先为角色授权应用页面</div>
                <button
                  v-for="menu in menus"
                  :key="menu.id"
                  type="button"
                  class="tenant-role-data__menu"
                  :class="{ 'is-active': activeMenuId === menu.id }"
                  :aria-current="activeMenuId === menu.id ? 'page' : undefined"
                  @click="activeMenuId = menu.id"
                >{{ menu.title }}</button>
              </GrowScrollbar>
            </div>
          </aside>
          <main class="tenant-role-data__main">
            <GrowScrollbar height="100%">
              <div v-if="activeDraft" class="tenant-role-data__form">
                <h3>{{ activeMenu?.title }}</h3>
                <section>
                  <h4>可编辑和删除的记录范围</h4>
                  <div v-for="option in editOptions" :key="option.value" class="tenant-role-data__option" :class="{ 'is-selected': activeDraft.editScope === option.value }">
                    <label>
                      <input :checked="activeDraft.editScope === option.value" type="radio" :name="`edit-${activeMenuId}`" :value="option.value" @change="selectEditScope(option.value)" />
                      {{ option.label }}
                    </label>
                    <TenantRoleSelfRelatedEditor
                      v-if="option.value === 'self' && activeDraft.editScope === 'self'"
                      v-model="activeDraft.selfRelated"
                      :columns="activeColumns"
                    />
                    <div v-if="option.value === 'custom' && activeDraft.editScope === 'custom'" class="tenant-role-data__sub">
                      <GrowSelect
                        class="tenant-role-data__dept-select"
                        :model-value="activeDraft.deptIds"
                        :options="deptOptions"
                        label="label"
                        value="value"
                        multiple
                        filterable
                        clearable
                        :disabled="!depts.length"
                        :placeholder="depts.length ? '请选择部门' : '该租户暂无部门'"
                        @update:model-value="activeDraft.deptIds = Array.isArray($event) ? $event.map(String) : []"
                      />
                    </div>
                    <TenantRoleFilterEditor
                      v-if="option.value === 'specified' && activeDraft.editScope === 'specified'"
                      v-model="activeDraft.filters"
                      :columns="activeColumns"
                      :depts="depts"
                      :users="users"
                    />
                  </div>
                </section>
                <section v-if="activeDraft.editScope !== 'all'">
                  <h4>其它记录权限</h4>
                  <div v-for="option in viewOptions" :key="option.value" class="tenant-role-data__option" :class="{ 'is-selected': activeDraft.viewOther === option.value }">
                    <label>
                      <input :checked="activeDraft.viewOther === option.value" type="radio" :name="`view-${activeMenuId}`" :value="option.value" @change="selectViewOther(option.value)" />
                      {{ option.label }}
                    </label>
                    <TenantRoleSelfRelatedEditor
                      v-if="option.value === 'self' && activeDraft.viewOther === 'self'"
                      v-model="activeDraft.viewSelfRelated"
                      :columns="activeColumns"
                    />
                    <TenantRoleFilterEditor
                      v-if="option.value === 'specified' && activeDraft.viewOther === 'specified'"
                      v-model="activeDraft.viewFilters"
                      :columns="activeColumns"
                      :depts="depts"
                      :users="users"
                    />
                  </div>
                </section>
              </div>
              <div v-else class="tenant-role-data__hint">{{ loading ? '加载中…' : '请选择已授权应用页面' }}</div>
            </GrowScrollbar>
          </main>
        </div>
      </template>
    </GrowWatchBox>
    <template #footer>
      <GrowSpace>
        <GrowButton @click="visible = false">取消</GrowButton>
        <GrowButton type="primary" :loading="saving" :disabled="loading || !menus.length" @click="save">保存</GrowButton>
      </GrowSpace>
    </template>
  </GrowDrawer>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useMsg } from '@grow-admin-rock/components'
import { fetchAllApplicationFunctionColumns } from '../../api/applicationFunctionColumn'
import { fetchSystemTenantGrantDetail } from '../../api/systemTenant'
import { fetchTenantRoleDepts, fetchTenantRoleUsers, getTenantAdminRoleDetail, saveTenantAdminRoleDataPerm } from '../../api/systemTenantAdminRole'
import type { ApplicationFunctionColumn } from '../../types/applicationFunctionColumn'
import type { SystemTenantGrantMenu } from '../../types/systemTenant'
import type {
  TenantAdminRoleDataPerm, TenantAdminRoleListItem, TenantRoleDeptOption,
  TenantRoleEditScope, TenantRoleFilter, TenantRoleSelfRelated, TenantRoleViewOther,
} from '../../types/systemTenantAdminRole'
import TenantRoleFilterEditor from './TenantRoleFilterEditor.vue'
import TenantRoleSelfRelatedEditor from './TenantRoleSelfRelatedEditor.vue'

const props = defineProps<{ modelValue: boolean; role: TenantAdminRoleListItem | null }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean]; saved: [] }>()
const message = useMsg()
const visible = computed({ get: () => props.modelValue, set: (value: boolean) => emit('update:modelValue', value) })
const loading = ref(false)
const saving = ref(false)
const menus = ref<Array<{ id: string; title: string }>>([])
const activeMenuId = ref('')
const columns = ref<ApplicationFunctionColumn[]>([])
const depts = ref<TenantRoleDeptOption[]>([])
const users = ref<Array<{ id: string; name: string }>>([])
const drafts = ref<Record<string, TenantAdminRoleDataPerm>>({})

const editOptions: Array<{ value: TenantRoleEditScope; label: string }> = [
  { value: 'all', label: '所有记录' },
  { value: 'dept', label: '仅本部门' },
  { value: 'dept_and_sub', label: '本部门及下级' },
  { value: 'custom', label: '自定义部门' },
  { value: 'self', label: '与成员自己相关的记录' },
  { value: 'specified', label: '指定记录' },
]
const viewOptions: Array<{ value: TenantRoleViewOther; label: string }> = [
  { value: 'all', label: '可查看其他全部记录' },
  { value: 'self', label: '可查看其他与成员自己相关的记录' },
  { value: 'specified', label: '可查看指定的其他记录' },
  { value: 'none', label: '不可查看其它记录' },
]

const activeMenu = computed(() => menus.value.find((item) => item.id === activeMenuId.value))
const activeDraft = computed(() => drafts.value[activeMenuId.value])
const activeColumns = computed(() => columns.value.filter((column) => column.menuName === activeMenuId.value))
const deptOptions = computed(() => depts.value.map((dept) => ({ label: dept.title, value: dept.id })))

function selfRelated(createdBySelf = true): TenantRoleSelfRelated {
  return { createdBySelf, fieldContainsSelf: false, columnIds: [] }
}

function emptyDraft(menuName: string): TenantAdminRoleDataPerm {
  return {
    menuName, editScope: 'all', viewOther: 'none', deptIds: [],
    selfRelated: selfRelated(false), viewSelfRelated: selfRelated(false), filters: [], viewFilters: [],
  }
}

function selectEditScope(scope: TenantRoleEditScope) {
  const draft = activeDraft.value
  if (!draft || draft.editScope === scope) return
  draft.editScope = scope
  draft.deptIds = []
  draft.selfRelated = selfRelated(scope === 'self')
  draft.filters = []
  if (scope === 'all') draft.viewOther = 'none'
  if (draft.viewOther !== 'self') draft.viewSelfRelated = selfRelated(false)
  if (draft.viewOther !== 'specified') draft.viewFilters = []
}

function selectViewOther(permission: TenantRoleViewOther) {
  const draft = activeDraft.value
  if (!draft || draft.viewOther === permission) return
  draft.viewOther = permission
  draft.viewSelfRelated = selfRelated(permission === 'self')
  draft.viewFilters = []
}

function flatten(nodes: SystemTenantGrantMenu[]): SystemTenantGrantMenu[] {
  return nodes.flatMap((node) => [node, ...flatten(node.children || [])])
}

function validateFilters(items: TenantRoleFilter[], title: string) {
  if (!items.length || items.some((item) => !item.columnId || !item.value.length)) return `请补全「${title}」筛选条件`
  return ''
}

function validate(draft: TenantAdminRoleDataPerm, title: string) {
  if (draft.editScope === 'custom' && !draft.deptIds.length) return `请为「${title}」选择部门`
  for (const related of [
    draft.editScope === 'self' ? draft.selfRelated : null,
    draft.editScope !== 'all' && draft.viewOther === 'self' ? draft.viewSelfRelated : null,
  ]) {
    if (related && !related.createdBySelf && (!related.fieldContainsSelf || !related.columnIds.length)) {
      return `请为「${title}」选择与当前用户相关的条件`
    }
    if (related?.fieldContainsSelf && !related.columnIds.length) return `请为「${title}」选择包含当前用户的字段`
  }
  if (draft.editScope === 'specified') {
    const error = validateFilters(draft.filters, title)
    if (error) return error
  }
  if (draft.editScope !== 'all' && draft.viewOther === 'specified') return validateFilters(draft.viewFilters, title)
  return ''
}

watch(() => props.modelValue, (open) => {
  if (open && props.role) void load(props.role)
})

async function load(row: TenantAdminRoleListItem) {
  loading.value = true
  menus.value = []
  activeMenuId.value = ''
  try {
    const [detail, limit, allColumns, tenantDepts, tenantUsers] = await Promise.all([
      getTenantAdminRoleDetail(row.id), fetchSystemTenantGrantDetail(row.tenantId), fetchAllApplicationFunctionColumns(),
      fetchTenantRoleDepts(row.tenantId), fetchTenantRoleUsers(row.tenantId),
    ])
    const grantedMenus = new Set(detail.menuIds.filter((id) => limit.menuIds.includes(id)))
    const queryIds = new Set(detail.queryPermissionIds.filter((id) => limit.columnPermissionIds.includes(id)))
    menus.value = flatten(detail.tree).filter((node) => !node.directory && grantedMenus.has(node.id))
      .map((node) => ({ id: node.id, title: node.title }))
    columns.value = allColumns.filter((column) => column.enabled && column.queryFilter !== false && queryIds.has(column.id))
    depts.value = tenantDepts
    users.value = tenantUsers
    const existing = new Map((detail.dataPerms || []).map((item) => [item.menuName, item]))
    drafts.value = Object.fromEntries(menus.value.map((menu) => [
      menu.id, existing.has(menu.id) ? structuredClone(existing.get(menu.id)!) : emptyDraft(menu.id),
    ]))
    activeMenuId.value = menus.value[0]?.id || ''
  } catch (error) {
    message.error(error instanceof Error ? error.message : '加载数据权限失败')
    visible.value = false
  } finally {
    loading.value = false
  }
}

async function save() {
  if (!props.role) return
  const items = menus.value.map((menu) => drafts.value[menu.id])
  for (const item of items) {
    const error = validate(item, menus.value.find((menu) => menu.id === item.menuName)?.title || item.menuName)
    if (error) {
      activeMenuId.value = item.menuName
      message.warning(error)
      return
    }
  }
  saving.value = true
  try {
    await saveTenantAdminRoleDataPerm(props.role.id, items.map((item) => ({
      ...item,
      viewOther: item.editScope === 'all' ? 'none' : item.viewOther,
      deptIds: item.editScope === 'custom' ? item.deptIds : [],
      filters: item.editScope === 'specified' ? item.filters : [],
      viewFilters: item.editScope !== 'all' && item.viewOther === 'specified' ? item.viewFilters : [],
    })))
    message.success('数据权限已保存')
    visible.value = false
    emit('saved')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '保存数据权限失败')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.tenant-role-data__watch {
  height: 100%;
  min-height: 240px;
}

.tenant-role-data {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  min-height: 0;
  font-size: 13px;
  line-height: 1.5;
}

.tenant-role-data__aside {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 10px;
  border-right: 1px solid var(--el-border-color-lighter, var(--layout-border-color));
  background: var(--el-fill-color-lighter, var(--layout-color));
  min-height: 0;
}

.tenant-role-data__aside strong {
  padding: 0 10px;
  font-size: 12px;
  color: var(--text-color-secondary);
}

.tenant-role-data__aside-scroll {
  flex: 1;
  min-height: 0;
}

.tenant-role-data__menu {
  display: block;
  width: 100%;
  padding: 8px 10px;
  text-align: left;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--text-color);
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.tenant-role-data__menu:hover {
  background: var(--el-fill-color-light, var(--layout-color));
}

.tenant-role-data__menu.is-active {
  background: var(--el-color-primary-light-9, var(--color-primary-a08));
  color: var(--el-color-primary);
  font-weight: 600;
}

.tenant-role-data__menu:focus-visible {
  outline: 2px solid var(--el-color-primary);
  outline-offset: -2px;
}

.tenant-role-data__main {
  min-width: 0;
  overflow: hidden;
}

.tenant-role-data__form {
  padding: 16px 24px 28px;
}

.tenant-role-data__form h3 {
  margin: 0 0 16px;
  font-size: 15px;
}

.tenant-role-data__form h4 {
  margin: 0 0 10px;
  font-size: 13px;
}

.tenant-role-data__form section {
  padding: 0 0 16px;
  margin-bottom: 18px;
}

.tenant-role-data__form section + section {
  padding-top: 18px;
  border-top: 1px solid var(--el-border-color-lighter, var(--layout-border-color));
}

.tenant-role-data__option {
  padding: 8px 10px;
  margin-top: 2px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.tenant-role-data__option.is-selected {
  background: var(--el-color-primary-light-9, var(--color-primary-a08));
}

.tenant-role-data__option > label,
.tenant-role-data__sub label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tenant-role-data__option > label {
  cursor: pointer;
}

.tenant-role-data__option input {
  accent-color: var(--el-color-primary);
}

.tenant-role-data__sub {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0 8px 28px;
}

.tenant-role-data__dept-select {
  width: 100%;
  max-width: 360px;
}

.tenant-role-data__hint {
  padding: 12px;
  color: var(--text-color-secondary);
}
</style>

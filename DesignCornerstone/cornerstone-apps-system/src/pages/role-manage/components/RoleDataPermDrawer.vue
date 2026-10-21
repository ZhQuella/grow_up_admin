<template>
  <GrowDrawer v-model="visible" :title="role ? `数据权限 · ${role.name}` : '数据权限'" size="700px" append-to-body destroy-on-close class="role-drawer">
    <GrowWatchBox class="role-drawer__watch">
      <template #default="{ height }">
        <div v-if="height > 0" class="role-data" :style="{ height: `${height}px` }">
          <aside class="role-data__aside">
            <strong>已授权菜单</strong>
            <div class="role-data__aside-scroll">
              <GrowScrollbar height="100%">
                <div v-if="loading" class="role-data__hint">加载中…</div>
                <div v-else-if="!menus.length" class="role-data__hint">请先在「角色授权」中勾选菜单</div>
                <button
                  v-for="menu in menus"
                  :key="menu.name"
                  type="button"
                  class="role-data__menu"
                  :class="{ 'is-active': activeMenuName === menu.name }"
                  :aria-current="activeMenuName === menu.name ? 'page' : undefined"
                  @click="activeMenuName = menu.name"
                >{{ menu.title }}</button>
              </GrowScrollbar>
            </div>
          </aside>
          <main class="role-data__main">
            <GrowScrollbar height="100%">
              <div v-if="activeDraft" class="role-data__form">
                <h3>{{ activeMenu?.title }}</h3>
                <section>
                  <h4>可编辑和删除的记录范围</h4>
                  <div v-for="option in EDIT_SCOPE_OPTIONS" :key="option.value" class="role-data__option" :class="{ 'is-selected': activeDraft.editScope === option.value }">
                    <label>
                      <input :checked="activeDraft.editScope === option.value" type="radio" :name="`edit-${activeMenuName}`" :value="option.value" @change="selectEditScope(option.value)" />
                      {{ option.value === 'dept' ? '仅本部门' : option.label }}
                    </label>
                    <RowSelfRelatedEditor
                      v-if="option.value === 'self' && activeDraft.editScope === 'self'"
                      v-model="activeDraft.selfRelated"
                      :columns="activeColumns"
                    />
                    <div v-if="option.value === 'custom' && activeDraft.editScope === 'custom'" class="role-data__sub">
                      <GrowSelect
                        class="role-data__dept-select"
                        :model-value="activeDraft.deptIds"
                        :options="deptOptions"
                        label="label"
                        value="value"
                        multiple
                        filterable
                        clearable
                        :disabled="!deptOptions.length"
                        :placeholder="deptOptions.length ? '请选择部门' : '暂无部门'"
                        @update:model-value="activeDraft.deptIds = Array.isArray($event) ? $event.map(String) : []"
                      />
                    </div>
                    <RowFilterEditor
                      v-if="option.value === 'specified' && activeDraft.editScope === 'specified'"
                      v-model="activeDraft.filters"
                      :columns="activeColumns"
                      :dept-tree="deptTree"
                    />
                  </div>
                </section>
                <section v-if="activeDraft.editScope !== 'all'">
                  <h4>其它记录权限</h4>
                  <div v-for="option in VIEW_OTHER_OPTIONS" :key="option.value" class="role-data__option" :class="{ 'is-selected': activeDraft.viewOther === option.value }">
                    <label>
                      <input :checked="activeDraft.viewOther === option.value" type="radio" :name="`view-${activeMenuName}`" :value="option.value" @change="selectViewOther(option.value)" />
                      {{ option.label }}
                    </label>
                    <RowSelfRelatedEditor
                      v-if="option.value === 'self' && activeDraft.viewOther === 'self'"
                      v-model="activeDraft.viewSelfRelated"
                      :columns="activeColumns"
                    />
                    <RowFilterEditor
                      v-if="option.value === 'specified' && activeDraft.viewOther === 'specified'"
                      v-model="activeDraft.viewFilters"
                      :columns="activeColumns"
                      :dept-tree="deptTree"
                    />
                  </div>
                </section>
              </div>
              <div v-else class="role-data__hint">{{ loading ? '加载中…' : '请选择已授权菜单' }}</div>
            </GrowScrollbar>
          </main>
        </div>
      </template>
    </GrowWatchBox>
    <template #footer>
      <GrowSpace>
        <GrowButton @click="visible = false">取消</GrowButton>
        <GrowButton type="primary" :loading="saving" :disabled="loading || !menus.length" @click="submit">保存</GrowButton>
      </GrowSpace>
    </template>
  </GrowDrawer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useMsg } from '@grow-admin-rock/components'
import { fetchAllSystemMenuColumns } from '../../../api/systemMenuColumn'
import { fetchSystemMenuTree } from '../../../api/systemMenu'
import { fetchSystemDeptTree, getSystemRoleDetail, saveSystemRoleDataPerm } from '../../../api/systemRole'
import type { SystemMenuColumn } from '../../../types/systemMenuColumn'
import {
  EDIT_SCOPE_OPTIONS, VIEW_OTHER_OPTIONS,
  type EditScope, type RowFilterCondition, type SelfRelatedConfig,
  type SystemDeptTreeNode, type SystemRoleDataPermItem, type SystemRoleListItem, type ViewOtherScope,
} from '../../../types/systemRole'
import { toMessage } from '../use/helpers'
import { findMenuTitle } from '../use/permTree'
import RowFilterEditor from './RowFilterEditor.vue'
import RowSelfRelatedEditor from './RowSelfRelatedEditor.vue'

defineOptions({ name: 'RoleDataPermDrawer' })

const emit = defineEmits<{ success: [] }>()
const message = useMsg()
const visible = ref(false)
const loading = ref(false)
const saving = ref(false)
const role = ref<SystemRoleListItem | null>(null)
const menus = ref<Array<{ name: string; title: string }>>([])
const activeMenuName = ref('')
const columns = ref<SystemMenuColumn[]>([])
const queryIds = ref<string[]>([])
const deptTree = ref<SystemDeptTreeNode[]>([])
const drafts = ref<Record<string, SystemRoleDataPermItem>>({})

const activeMenu = computed(() => menus.value.find((item) => item.name === activeMenuName.value))
const activeDraft = computed(() => drafts.value[activeMenuName.value])
const activeColumns = computed(() => columns.value.filter((item) =>
  item.menuName === activeMenuName.value && item.enabled && item.queryFilter && queryIds.value.includes(item.id)))
const deptOptions = computed(() => {
  const options: Array<{ label: string; value: string }> = []
  const walk = (nodes: SystemDeptTreeNode[], prefix: string) => {
    nodes.forEach((node) => {
      const label = prefix ? `${prefix} / ${node.title}` : node.title
      options.push({ label, value: node.id })
      if (node.children?.length) walk(node.children, label)
    })
  }
  walk(deptTree.value, '')
  return options
})

function selfRelated(createdBySelf = true): SelfRelatedConfig {
  return { createdBySelf, fieldContainsSelf: false, columnIds: [] }
}

function emptyDraft(menuName: string, columnIds: string[], editableColumnIds: string[]): SystemRoleDataPermItem {
  return {
    menuName, editScope: 'all', viewOther: 'none', deptIds: [],
    selfRelated: selfRelated(false), viewSelfRelated: selfRelated(false), filters: [], viewFilters: [],
    columnIds, editableColumnIds,
  }
}

function selectEditScope(scope: EditScope) {
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

function selectViewOther(permission: ViewOtherScope) {
  const draft = activeDraft.value
  if (!draft || draft.viewOther === permission) return
  draft.viewOther = permission
  draft.viewSelfRelated = selfRelated(permission === 'self')
  draft.viewFilters = []
}

function validateFilters(items: RowFilterCondition[], title: string) {
  if (!items.length || items.some((item) => !item.columnId || !item.value.length)) return `请补全「${title}」筛选条件`
  return ''
}

function validate(draft: SystemRoleDataPermItem, title: string) {
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

async function open(row: SystemRoleListItem) {
  role.value = row
  menus.value = []
  activeMenuName.value = ''
  drafts.value = {}
  loading.value = true
  visible.value = true
  try {
    const [detail, tree, allColumns, departments] = await Promise.all([
      getSystemRoleDetail(row.id), fetchSystemMenuTree(), fetchAllSystemMenuColumns(), fetchSystemDeptTree(),
    ])
    columns.value = Array.isArray(allColumns) ? allColumns : []
    deptTree.value = Array.isArray(departments) ? departments : []
    queryIds.value = detail.queryPermissionIds || []
    const menuTree = Array.isArray(tree) ? tree : []
    menus.value = detail.menuNames.map((name) => ({ name, title: findMenuTitle(menuTree, name) }))
    const existing = new Map((detail.dataPerms || []).map((item) => [item.menuName, item]))
    drafts.value = Object.fromEntries(menus.value.map((menu) => {
      const saved = existing.get(menu.name)
      const columnIds = (detail.columnPermissionIds || []).filter((id) => columns.value.some((item) => item.menuName === menu.name && item.id === id))
      const editableColumnIds = (detail.editPermissionIds || []).filter((id) => columnIds.includes(id))
      return [menu.name, saved ? structuredClone(saved) : emptyDraft(menu.name, columnIds, editableColumnIds)]
    }))
    activeMenuName.value = menus.value[0]?.name || ''
  } catch (error) {
    message.error(toMessage(error, '加载数据权限失败'))
    visible.value = false
  } finally {
    loading.value = false
  }
}

async function submit() {
  const id = role.value?.id
  if (!id) return
  const items: SystemRoleDataPermItem[] = []
  for (const menu of menus.value) {
    const draft = drafts.value[menu.name]
    const error = validate(draft, menu.title)
    if (error) {
      activeMenuName.value = menu.name
      message.warning(error)
      return
    }
    items.push({
      menuName: menu.name,
      editScope: draft.editScope,
      viewOther: draft.editScope === 'all' ? 'none' : draft.viewOther,
      deptIds: draft.editScope === 'custom' ? draft.deptIds : [],
      selfRelated: draft.editScope === 'self' ? draft.selfRelated : selfRelated(false),
      viewSelfRelated: draft.editScope !== 'all' && draft.viewOther === 'self' ? draft.viewSelfRelated : selfRelated(false),
      filters: draft.editScope === 'specified' ? draft.filters : [],
      viewFilters: draft.editScope !== 'all' && draft.viewOther === 'specified' ? draft.viewFilters : [],
      columnIds: draft.columnIds,
      editableColumnIds: draft.editableColumnIds,
    })
  }
  saving.value = true
  try {
    await saveSystemRoleDataPerm(id, items)
    message.success('数据权限已保存')
    visible.value = false
    emit('success')
  } catch (error) {
    message.error(toMessage(error, '保存数据权限失败'))
  } finally {
    saving.value = false
  }
}

defineExpose({ open })
</script>

<style scoped>
.role-data {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  min-height: 0;
  font-size: 13px;
  line-height: 1.5;
}

.role-data__aside {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 10px;
  border-right: 1px solid var(--el-border-color-lighter, var(--layout-border-color));
  background: var(--el-fill-color-lighter, var(--layout-color));
  min-height: 0;
}

.role-data__aside strong {
  padding: 0 10px;
  font-size: 12px;
  color: var(--text-color-secondary);
}

.role-data__aside-scroll {
  flex: 1;
  min-height: 0;
}

.role-data__menu {
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

.role-data__menu:hover {
  background: var(--el-fill-color-light, var(--layout-color));
}

.role-data__menu.is-active {
  background: var(--el-color-primary-light-9, var(--color-primary-a08));
  color: var(--el-color-primary);
  font-weight: 600;
}

.role-data__menu:focus-visible {
  outline: 2px solid var(--el-color-primary);
  outline-offset: -2px;
}

.role-data__main {
  min-width: 0;
  overflow: hidden;
}

.role-data__form {
  padding: 16px 24px 28px;
}

.role-data__form h3 {
  margin: 0 0 16px;
  font-size: 15px;
}

.role-data__form h4 {
  margin: 0 0 10px;
  font-size: 13px;
}

.role-data__form section {
  padding: 0 0 16px;
  margin-bottom: 18px;
}

.role-data__form section + section {
  padding-top: 18px;
  border-top: 1px solid var(--el-border-color-lighter, var(--layout-border-color));
}

.role-data__option {
  padding: 8px 10px;
  margin-top: 2px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.role-data__option.is-selected {
  background: var(--el-color-primary-light-9, var(--color-primary-a08));
}

.role-data__option > label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.role-data__option input {
  accent-color: var(--el-color-primary);
}

.role-data__sub {
  padding: 10px 0 8px 28px;
}

.role-data__dept-select {
  width: 100%;
  max-width: 360px;
}

.role-data__hint {
  padding: 12px;
  color: var(--text-color-secondary);
}
</style>

<style>
.role-drawer.el-drawer,
.role-drawer.n-drawer {
  display: flex;
  flex-direction: column;
}

.role-drawer .n-drawer-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.role-drawer .el-drawer__body,
.role-drawer .n-drawer-body,
.role-drawer .n-drawer-body-content-wrapper {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 0;
  min-height: 0;
  overflow: hidden;
  padding: 0;
}

.role-drawer__watch {
  flex: 1;
  height: 100%;
  min-height: 0;
}
</style>

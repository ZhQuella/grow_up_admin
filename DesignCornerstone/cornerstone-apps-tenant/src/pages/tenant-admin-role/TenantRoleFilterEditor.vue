<template>
  <div class="tenant-role-filter">
    <div class="tenant-role-filter__title">筛选</div>
    <div v-for="(row, index) in modelValue" :key="row.id" class="tenant-role-filter__row">
      <GrowSelect
        :model-value="row.columnId"
        :options="fieldOptions"
        label="label"
        value="value"
        filterable
        clearable
        placeholder="选择字段"
        @update:model-value="patch(index, { columnId: String($event || ''), operator: 'eq', value: [] })"
      />
      <GrowSelect
        :model-value="row.operator"
        :options="operatorOptions(row.columnId)"
        label="label"
        value="value"
        placeholder="条件"
        @update:model-value="onOperatorChange(index, $event)"
      />
      <GrowSelect
        v-if="columnType(row.columnId) === 'person' || columnType(row.columnId) === 'dept'"
        :model-value="row.value"
        :options="columnType(row.columnId) === 'dept' ? deptOptions : userOptions"
        label="label"
        value="value"
        multiple
        filterable
        clearable
        placeholder="选择值"
        @update:model-value="patch(index, { value: Array.isArray($event) ? $event.map(String) : [] })"
      />
      <GrowSelect
        v-else-if="columnType(row.columnId) === 'boolean'"
        :model-value="row.value[0] || ''"
        :options="[{ label: '是', value: 'true' }, { label: '否', value: 'false' }]"
        label="label"
        value="value"
        placeholder="选择值"
        @update:model-value="patch(index, { value: $event == null || $event === '' ? [] : [String($event)] })"
      />
      <GrowDatePicker
        v-else-if="columnType(row.columnId) === 'date'"
        :model-value="row.value[0] || ''"
        value-format="YYYY-MM-DD"
        placeholder="选择日期"
        @update:model-value="patch(index, { value: $event ? [String($event)] : [] })"
      />
      <GrowInput
        v-else
        :model-value="row.value[0] === '__current_user__' ? '当前用户' : row.value[0] || ''"
        :type="columnType(row.columnId) === 'number' ? 'number' : 'text'"
        placeholder="输入值或选当前用户"
        @update:model-value="patch(index, { value: $event ? [String($event)] : [] })"
      />
      <GrowButton v-if="columnType(row.columnId) === 'string'" link type="primary" @click="patch(index, { value: ['__current_user__'] })">当前用户</GrowButton>
      <GrowButton link type="danger" @click="emit('update:modelValue', modelValue.filter((_, position) => position !== index))">删除</GrowButton>
    </div>
    <GrowButton link type="primary" :disabled="!columns.length" @click="add">+ 添加条件</GrowButton>
    <p v-if="!columns.length">当前页面暂无已授权的可查询字段</p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { ApplicationFunctionColumn } from '../../types/applicationFunctionColumn'
import type { TenantRoleDeptOption, TenantRoleFilter, TenantRoleFilterOperator } from '../../types/systemTenantAdminRole'

const props = defineProps<{
  modelValue: TenantRoleFilter[]
  columns: ApplicationFunctionColumn[]
  depts: TenantRoleDeptOption[]
  users: Array<{ id: string; name: string }>
}>()
const emit = defineEmits<{ 'update:modelValue': [value: TenantRoleFilter[]] }>()

const fieldOptions = computed(() => props.columns.map((column) => ({ value: column.id, label: `${column.tableTitle} / ${column.title}` })))
const deptOptions = computed(() => [
  { value: '__current_user__', label: '当前用户所属部门' },
  ...props.depts.map((dept) => ({ value: dept.id, label: dept.title })),
])
const userOptions = computed(() => [
  { value: '__current_user__', label: '我（当前用户）' },
  ...props.users.map((user) => ({ value: user.id, label: user.name })),
])

function columnType(id: string) {
  return props.columns.find((column) => column.id === id)?.columnType || 'string'
}

const operators: Array<{ value: TenantRoleFilterOperator; label: string }> = [
  { value: 'eq', label: '等于' }, { value: 'neq', label: '不等于' },
  { value: 'contains', label: '包含' }, { value: 'not_contains', label: '不包含' },
  { value: 'gt', label: '大于' }, { value: 'gte', label: '大于等于' },
  { value: 'lt', label: '小于' }, { value: 'lte', label: '小于等于' },
]

function operatorOptions(id: string) {
  const type = columnType(id)
  const available = type === 'number' || type === 'date'
    ? ['eq', 'neq', 'gt', 'gte', 'lt', 'lte']
    : type === 'boolean' ? ['eq', 'neq'] : ['eq', 'neq', 'contains', 'not_contains']
  return operators.filter((item) => available.includes(item.value))
}

function patch(index: number, value: Partial<TenantRoleFilter>) {
  emit('update:modelValue', props.modelValue.map((row, position) => position === index ? { ...row, ...value } : row))
}

function onOperatorChange(index: number, value: unknown) {
  const operator = operators.find((item) => item.value === value)?.value || 'eq'
  patch(index, { operator })
}

function add() {
  emit('update:modelValue', [...props.modelValue, {
    id: `filter_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    columnId: '', operator: 'eq', value: [],
  }])
}
</script>

<style scoped>
.tenant-role-filter {
  padding: 10px 0 10px 28px;
}
.tenant-role-filter__title {
  margin-bottom: 10px;
}
.tenant-role-filter__row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}
.tenant-role-filter__row > :first-child { width: 180px; }
.tenant-role-filter__row > :nth-child(2) { width: 110px; }
.tenant-role-filter__row > :nth-child(3) { flex: 1; min-width: 130px; }
.tenant-role-filter p { color: var(--text-color-secondary); }
</style>

<template>
  <div class="tenant-role-self">
    <label>
      <GrowCheckbox :model-value="modelValue.createdBySelf" @update:model-value="patch({ createdBySelf: Boolean($event) })" />
      当前账号创建的记录
    </label>
    <label>
      <GrowCheckbox :model-value="modelValue.fieldContainsSelf" @update:model-value="onFieldContainsSelfChange(Boolean($event))" />
      字段包含当前用户的记录
    </label>
    <div v-if="modelValue.fieldContainsSelf" class="tenant-role-self__fields">
      <label v-for="column in columns" :key="column.id">
        <GrowCheckbox
          :model-value="modelValue.columnIds.includes(column.id)"
          @update:model-value="toggleColumn(column.id, Boolean($event))"
        />
        {{ column.tableTitle }} / {{ column.title }}
      </label>
      <span v-if="!columns.length">暂无已授权的可查询字段</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ApplicationFunctionColumn } from '../../types/applicationFunctionColumn'
import type { TenantRoleSelfRelated } from '../../types/systemTenantAdminRole'

const props = defineProps<{ modelValue: TenantRoleSelfRelated; columns: ApplicationFunctionColumn[] }>()
const emit = defineEmits<{ 'update:modelValue': [value: TenantRoleSelfRelated] }>()

function patch(value: Partial<TenantRoleSelfRelated>) {
  emit('update:modelValue', { ...props.modelValue, ...value })
}

function onFieldContainsSelfChange(checked: boolean) {
  patch({ fieldContainsSelf: checked, columnIds: checked ? props.modelValue.columnIds : [] })
}

function toggleColumn(id: string, checked: boolean) {
  const ids = new Set(props.modelValue.columnIds)
  if (checked) ids.add(id)
  else ids.delete(id)
  patch({ columnIds: [...ids] })
}
</script>

<style scoped>
.tenant-role-self,
.tenant-role-self__fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px 0 8px 28px;
}
.tenant-role-self label {
  display: flex;
  align-items: center;
  gap: 8px;
}
.tenant-role-self__fields {
  padding-left: 24px;
  color: var(--text-color-secondary);
}
</style>

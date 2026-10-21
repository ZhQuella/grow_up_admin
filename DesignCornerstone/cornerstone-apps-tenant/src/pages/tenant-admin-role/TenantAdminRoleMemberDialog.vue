<template>
  <GrowDialog
    :model-value="modelValue"
    :title="role?.builtIn || readonly ? '查看绑定账号' : '绑定账号'"
    width="560px"
    append-to-body
    destroy-on-close
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="tenant-role-members">
      <div v-if="role" class="tenant-role-members__tenant">
        <span>所属租户</span>
        <strong>{{ role.tenantName }}</strong>
        <span>（{{ role.tenantCode }}）</span>
      </div>
      <GrowInput v-if="!readonly && !role?.builtIn" v-model="keyword" clearable placeholder="搜索登录名或人员" />
      <div v-if="loading" class="tenant-role-members__empty">加载中…</div>
      <GrowScrollbar v-else height="360px">
        <div v-if="!filteredAccounts.length" class="tenant-role-members__empty">暂无账号</div>
        <div v-for="account in filteredAccounts" :key="account.accountId" class="tenant-role-members__item">
          <GrowCheckbox
            v-if="!readonly && !role?.builtIn"
            :model-value="selectedIds.includes(account.accountId)"
            @update:model-value="(value) => toggleAccount(account.accountId, Boolean(value))"
          />
          <span class="tenant-role-members__name">{{ account.username }}</span>
          <span v-if="account.personName" class="tenant-role-members__person">{{ account.personName }}</span>
          <GrowTag :type="account.enabled ? 'success' : 'danger'" size="small">{{ account.enabled ? '启用' : '停用' }}</GrowTag>
        </div>
      </GrowScrollbar>
      <div class="tenant-role-members__count">已绑定 {{ selectedIds.length }} 个账号</div>
    </div>
    <template #footer>
      <GrowSpace>
        <GrowButton @click="emit('update:modelValue', false)">{{ readonly || role?.builtIn ? '关闭' : '取消' }}</GrowButton>
        <GrowButton v-if="!readonly && !role?.builtIn" type="primary" :loading="saving" :disabled="!loaded" @click="submit">确定</GrowButton>
      </GrowSpace>
    </template>
  </GrowDialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useMsg } from '@grow-admin-rock/components'
import { fetchTenantAdminRoleAccounts, getTenantAdminRoleDetail, saveTenantAdminRoleMembers } from '../../api/systemTenantAdminRole'
import type { TenantAdminRoleAccount, TenantAdminRoleListItem } from '../../types/systemTenantAdminRole'
import { toMessage } from './use/useTenantAdminRole'

const props = defineProps<{ modelValue: boolean; role: TenantAdminRoleListItem | null; readonly?: boolean }>()
const emit = defineEmits<{ (event: 'update:modelValue', value: boolean): void; (event: 'saved'): void }>()
const message = useMsg()
const loading = ref(false)
const loaded = ref(false)
const saving = ref(false)
const keyword = ref('')
const accounts = ref<TenantAdminRoleAccount[]>([])
const selectedIds = ref<string[]>([])
const filteredAccounts = computed(() => accounts.value.filter((account) =>
  (!(props.readonly || props.role?.builtIn) || selectedIds.value.includes(account.accountId))
  && `${account.username} ${account.personName || ''}`.toLowerCase().includes(keyword.value.trim().toLowerCase()),
))

watch(() => [props.modelValue, props.role?.id], async () => {
  if (!props.modelValue || !props.role) return
  const role = props.role
  loading.value = true
  loaded.value = false
  keyword.value = ''
  accounts.value = []
  selectedIds.value = []
  try {
    const [detail, accountOptions] = await Promise.all([
      getTenantAdminRoleDetail(role.id),
      fetchTenantAdminRoleAccounts(role.tenantId),
    ])
    if (!props.modelValue || props.role?.id !== role.id) return
    accounts.value = accountOptions
    selectedIds.value = detail.members.map((member) => member.accountId)
    loaded.value = true
  } catch (error) {
    message.error(toMessage(error, '加载绑定账号失败'))
  } finally {
    loading.value = false
  }
})

function toggleAccount(accountId: string, checked: boolean) {
  selectedIds.value = checked
    ? [...selectedIds.value, accountId]
    : selectedIds.value.filter((id) => id !== accountId)
}

async function submit() {
  if (!props.role || props.role.builtIn || props.readonly || !loaded.value) return
  saving.value = true
  try {
    await saveTenantAdminRoleMembers(props.role.id, selectedIds.value)
    message.success('绑定成功')
    emit('update:modelValue', false)
    emit('saved')
  } catch (error) {
    message.error(toMessage(error, '保存失败'))
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.tenant-role-members { display: flex; flex-direction: column; gap: 12px; }
.tenant-role-members__tenant { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; padding: 10px 12px; border-radius: 6px; color: var(--text-color-secondary); background: var(--layout-container-background-color); font-size: 13px; }
.tenant-role-members__tenant strong { margin-left: 8px; color: var(--text-color); font-weight: 600; }
.tenant-role-members__item { display: flex; align-items: center; gap: 12px; padding: 10px 6px; border-bottom: 1px solid var(--layout-border-color); }
.tenant-role-members__name { flex: 1; min-width: 0; }
.tenant-role-members__person, .tenant-role-members__count { color: var(--text-color-secondary); font-size: 12px; }
.tenant-role-members__empty { padding: 24px; color: var(--text-color-secondary); text-align: center; }
</style>

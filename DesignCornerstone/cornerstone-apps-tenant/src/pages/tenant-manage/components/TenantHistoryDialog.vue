<template>
  <GrowDialog
    v-model="visible"
    class="tenant-history-dialog"
    title="租户变更历史"
    width="600px"
    append-to-body
    destroy-on-close
  >
    <div class="tenant-history-dialog__summary">
      <span>{{ target?.tenantName }}（{{ target?.tenantCode }}）</span>
      <GrowTag v-if="available" size="small" type="info">Mock 演示记录</GrowTag>
    </div>
    <GrowScrollbar :key="`${target?.id}-${page}`" height="100%" class="tenant-history-dialog__scrollbar">
      <div v-if="loading" class="tenant-history-dialog__state" role="status">加载变更历史…</div>
      <div v-else-if="error" class="tenant-history-dialog__state" role="alert">
        <p>{{ error }}</p>
        <GrowButton link type="primary" @click="load">重新加载</GrowButton>
      </div>
      <GrowEmpty v-else-if="!available" description="历史记录接口尚未接入，暂无法查询真实记录" />
      <GrowEmpty v-else-if="!items.length" description="暂无变更记录" />
      <GrowTimeline v-else class="tenant-history-dialog__timeline">
        <GrowTimelineItem
          v-for="item in items"
          :key="item.id"
          :timestamp="formatTime(item.operatedAt)"
          placement="top"
          type="primary"
        >
          <div class="tenant-history-dialog__action">{{ TENANT_HISTORY_ACTION_LABELS[item.action] || item.action }}</div>
          <div class="tenant-history-dialog__operator">操作人：{{ item.operatorName || '-' }}</div>
          <div v-if="item.remark" class="tenant-history-dialog__remark">备注：{{ item.remark }}</div>
        </GrowTimelineItem>
      </GrowTimeline>
    </GrowScrollbar>
    <template #footer>
      <div class="tenant-history-dialog__footer">
        <GrowPagination
          v-if="available && total > 0"
          v-model:current-page="page"
          :page-size="pageSize"
          :total="total"
          :disabled="loading"
          layout="total, prev, pager, next"
          @current-change="load"
        />
        <GrowButton @click="visible = false">关闭</GrowButton>
      </div>
    </template>
  </GrowDialog>
</template>

<script lang="ts" setup>
import { TENANT_HISTORY_ACTION_LABELS } from '../../../types/systemTenant'
import { formatTime } from '../use/helpers'
import { useTenantHistory } from '../use/useTenantHistory'

const { visible, target, loading, available, error, items, page, pageSize, total, load, open } = useTenantHistory()

defineExpose({ open })
</script>

<style scoped>
.tenant-history-dialog__summary {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  overflow-wrap: anywhere;
}

.tenant-history-dialog__scrollbar {
  flex: 1;
  min-height: 0;
}

.tenant-history-dialog__scrollbar :deep(.el-scrollbar__wrap) {
  overscroll-behavior: contain;
}

.tenant-history-dialog__timeline {
  padding: 4px 16px 0 4px;
  overflow-wrap: anywhere;
}

.tenant-history-dialog__action {
  margin-bottom: 6px;
  font-weight: 600;
}

.tenant-history-dialog__operator,
.tenant-history-dialog__remark,
.tenant-history-dialog__state {
  color: var(--text-color-secondary);
  line-height: 1.6;
}

.tenant-history-dialog__remark {
  margin-top: 4px;
  white-space: pre-wrap;
}

.tenant-history-dialog__state {
  padding: 40px 12px;
  text-align: center;
}

.tenant-history-dialog__footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}
</style>

<style>
.el-overlay-dialog:has(.tenant-history-dialog) {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.tenant-history-dialog.el-dialog {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: min(600px, calc(100vh - 48px));
  height: min(600px, calc(100dvh - 48px));
  max-width: calc(100vw - 32px);
  margin: 0;
  overflow: hidden;
}

.tenant-history-dialog .el-dialog__header,
.tenant-history-dialog .el-dialog__footer {
  flex-shrink: 0;
}

.tenant-history-dialog .el-dialog__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}
</style>

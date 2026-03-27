<script setup lang="ts">
import { NDataTable } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

defineProps<{
  columns: DataTableColumns<any>
  data: any[]
  loading?: boolean
  pagination?: false | { page: number; pageSize: number; itemCount: number }
  rowKey?: (row: any) => string | number
  striped?: boolean
  maxHeight?: string | number
}>()

defineEmits<{
  'update:page': [page: number]
  'update:pageSize': [pageSize: number]
}>()
</script>

<template>
  <NDataTable
    :columns="columns"
    :data="data"
    :loading="loading"
    bordered
    :single-line="false"
    :pagination="pagination !== false ? {
      ...pagination,
      pageSizes: [10, 20, 50],
      showSizePicker: true,
      prefix: ({ itemCount }: { itemCount: number | undefined }) => `共 ${itemCount ?? 0} 条`,
    } : false"
    :row-key="rowKey"
    :striped="striped ?? true"
    :max-height="maxHeight"
    :row-props="() => ({ class: 'h-12' })"
    size="medium"
    @update:page="$emit('update:page', $event)"
    @update:page-size="$emit('update:pageSize', $event)"
  />
</template>

<script setup lang="ts">
import DsPageHeader from '@/components/molecules/DsPageHeader.vue'
import DsFilterBar from '@/components/molecules/DsFilterBar.vue'
import DsDataTable from '@/components/organisms/DsDataTable.vue'
import type { DataTableColumns } from 'naive-ui'

defineProps<{
  title: string
  description?: string
  filters?: InstanceType<typeof DsFilterBar>['$props']['filters']
  columns: DataTableColumns<any>
  data: any[]
  loading?: boolean
  pagination?: false | { page: number; pageSize: number; itemCount: number }
  rowKey?: (row: any) => string | number
}>()

defineEmits<{
  search: [values: Record<string, any>]
  reset: []
  'update:page': [page: number]
  'update:pageSize': [pageSize: number]
}>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <DsPageHeader :title="title" :description="description">
      <template #actions>
        <slot name="actions" />
      </template>
    </DsPageHeader>

    <DsFilterBar
      v-if="filters?.length"
      :filters="filters"
      @search="$emit('search', $event)"
      @reset="$emit('reset')"
    />

    <DsDataTable
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      :row-key="rowKey"
      @update:page="$emit('update:page', $event)"
      @update:page-size="$emit('update:pageSize', $event)"
    />
  </div>
</template>

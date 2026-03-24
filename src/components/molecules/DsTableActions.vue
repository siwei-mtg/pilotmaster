<script setup lang="ts">
import { NButton, NPopconfirm } from 'naive-ui'
import DsIcon from '@/components/atoms/DsIcon.vue'

defineProps<{
  showView?: boolean
  showEdit?: boolean
  showDelete?: boolean
  deleteConfirmText?: string
}>()

defineEmits<{
  view: []
  edit: []
  delete: []
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <NButton v-if="showView !== false" quaternary circle size="small" @click="$emit('view')">
      <template #icon><DsIcon icon="lucide:eye" :size="14" color="var(--color-text-secondary)" /></template>
    </NButton>
    <NButton v-if="showEdit !== false" quaternary circle size="small" @click="$emit('edit')">
      <template #icon><DsIcon icon="lucide:pencil" :size="14" color="var(--color-primary)" /></template>
    </NButton>
    <NPopconfirm
      v-if="showDelete !== false"
      :positive-button-props="{ type: 'error' }"
      @positive-click="$emit('delete')"
    >
      <template #trigger>
        <NButton quaternary circle size="small">
          <template #icon><DsIcon icon="lucide:trash-2" :size="14" color="var(--color-danger)" /></template>
        </NButton>
      </template>
      {{ deleteConfirmText ?? '确认删除？此操作不可恢复' }}
    </NPopconfirm>
  </div>
</template>

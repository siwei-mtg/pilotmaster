<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  type?: 'success' | 'warning' | 'danger' | 'info' | 'default'
  label: string
  icon?: string
}>()
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-base font-medium whitespace-nowrap"
    :class="{
      'bg-danger/10 text-danger': type === 'danger',
      'bg-warning/10 text-warning': type === 'warning',
      'bg-success/10 text-success': type === 'success',
      'bg-info/10 text-info': type === 'info',
      'bg-bg-hover text-text-secondary': type === 'default' || !type,
    }"
  >
    <Icon v-if="icon" :icon="icon" class="text-sm shrink-0" />
    {{ label }}
  </span>
</template>

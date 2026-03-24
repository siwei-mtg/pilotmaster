<script setup lang="ts">
defineProps<{
  type?: 'success' | 'warning' | 'danger' | 'info' | 'default'
  label: string
}>()
</script>

<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
    :class="{
      'bg-success/15 text-success': type === 'success',
      'bg-warning/15 text-warning': type === 'warning',
      'bg-danger/15 text-danger': type === 'danger',
      'bg-info/15 text-info': type === 'info',
      'bg-bg-hover text-text-secondary': type === 'default' || !type,
    }"
  >
    {{ label }}
  </span>
</template>

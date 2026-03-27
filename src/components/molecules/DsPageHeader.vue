<script setup lang="ts">
import DsHudTitle from '@/components/atoms/DsHudTitle.vue'

defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="flex items-center justify-between py-4">
    <div>
      <DsHudTitle :text="title" />
      <p v-if="description" class="mt-1 text-base text-text-secondary">{{ description }}</p>
    </div>
    <div class="flex items-center gap-3">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  icon: string
  size?: number | string
  color?: string
}>()
</script>

<template>
  <Icon
    :icon="icon"
    :width="size ?? 20"
    :height="size ?? 20"
    :color="color"
    class="inline-block shrink-0"
  />
</template>

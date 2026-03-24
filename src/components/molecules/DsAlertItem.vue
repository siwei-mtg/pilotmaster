<script setup lang="ts">
import DsGlowDot from '@/components/atoms/DsGlowDot.vue'
import DsTimestamp from '@/components/atoms/DsTimestamp.vue'
import DsToken from '@/components/atoms/DsToken.vue'

defineProps<{
  time: string | number | Date
  type: string
  location: string
  level: 'high' | 'medium' | 'low'
}>()

defineEmits<{
  click: []
}>()

const levelMap = {
  high: { label: '高', type: 'danger' as const },
  medium: { label: '中', type: 'warning' as const },
  low: { label: '低', type: 'info' as const },
}
</script>

<template>
  <div
    class="flex items-center gap-3 h-14 px-4 rounded-lg cursor-pointer transition-colors hover:bg-bg-hover group"
    @click="$emit('click')"
  >
    <DsGlowDot :color="level === 'high' ? 'danger' : level === 'medium' ? 'warning' : 'primary'" :size="6" />
    <DsTimestamp :time="time" mode="relative" class="w-16 shrink-0" />
    <span class="text-sm text-text-primary truncate flex-1">{{ type }}</span>
    <span class="text-xs text-text-muted truncate max-w-[120px]">{{ location }}</span>
    <DsToken :label="levelMap[level].label" :type="levelMap[level].type" />
  </div>
</template>

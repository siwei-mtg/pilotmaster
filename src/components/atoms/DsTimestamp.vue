<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  time: string | number | Date
  mode?: 'relative' | 'absolute'
}>(), {
  mode: 'relative',
})

const formatted = computed(() => {
  const date = new Date(props.time)
  if (props.mode === 'absolute') {
    return date.toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }
  const now = Date.now()
  const diff = Math.floor((now - date.getTime()) / 1000)
  if (diff < 10) return '刚刚'
  if (diff < 60) return `${diff}秒前`
  if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`
  if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`
  return `${Math.floor(diff / 86400)}天前`
})
</script>

<template>
  <time
    :datetime="new Date(time).toISOString()"
    class="text-text-muted text-xs font-mono tabular-nums"
    :title="new Date(time).toLocaleString('zh-CN')"
  >
    {{ formatted }}
  </time>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DsAlertItem from '@/components/molecules/DsAlertItem.vue'
import DsHudTitle from '@/components/atoms/DsHudTitle.vue'

import type { AlertRecord } from '@/types/alert'

const props = defineProps<{
  alerts: AlertRecord[]
  title?: string
  maxItems?: number
}>()

defineEmits<{
  clickAlert: [alert: AlertRecord]
}>()

const lastUpdate = ref(new Date().toLocaleTimeString('zh-CN', { hour12: false }))

const displayAlerts = computed(() => {
  const max = props.maxItems ?? 20
  return props.alerts.slice(0, max)
})

// Update timestamp periodically
setInterval(() => {
  lastUpdate.value = new Date().toLocaleTimeString('zh-CN', { hour12: false })
}, 1000)
</script>

<template>
  <div class="flex flex-col h-full bg-[#050A14]/40 border border-[#0A1A3A] rounded-xl overflow-hidden backdrop-blur-sm">
    <div class="flex items-center justify-between px-5 py-3 border-b border-[#0A1A3A] bg-[#0A162B]/60 shrink-0 select-none">
      <DsHudTitle :text="title ?? '实时告警'" />
      <span class="text-[10px] text-cyan-500/60 font-mono tracking-widest flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-cyan-400/50 animate-pulse shadow-[0_0_5px_#00FFFF]"></span>
        SYNC
      </span>
    </div>
    <div class="flex-1 overflow-y-auto px-1">
      <TransitionGroup name="slide-in-right">
        <DsAlertItem
          v-for="alert in displayAlerts"
          :key="alert.id"
          :time="alert.time"
          :type="alert.type"
          :location="alert.location"
          :level="alert.level"
          @click="$emit('clickAlert', alert)"
        />
      </TransitionGroup>
      <div v-if="!displayAlerts.length" class="flex items-center justify-center h-32 text-cyan-500/50 text-sm tracking-widest">
        暂无告警 // NO ALERTS
      </div>
    </div>
  </div>
</template>

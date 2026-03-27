<script setup lang="ts">
import DsGlowDot from '@/components/atoms/DsGlowDot.vue'
import DsIcon from '@/components/atoms/DsIcon.vue'
import DsToken from '@/components/atoms/DsToken.vue'

interface Props {
  deviceId: string
  droneSn: string
  confidence: 'high' | 'low' | 'unknown'
  type: string
  level: 'high' | 'medium' | 'low'
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'notify-pilot'): void
  (e: 'notify-police'): void
}>()

function handleNotifyPilot(e: Event) {
  e.stopPropagation()
  emit('notify-pilot')
}

function handleNotifyPolice(e: Event) {
  e.stopPropagation()
  emit('notify-police')
}
</script>

<template>
  <div class="relative bg-bg-elevated border border-border-focus rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.8)] min-w-[280px] p-4 text-text-primary backdrop-blur-xl transition-all">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
      <h4 class="text-base font-semibold tracking-wide flex items-center gap-2 text-white/90">
        <DsGlowDot color="primary" :size="3" class="shadow-[0_0_8px_var(--color-primary)]" />
        飞手信息
      </h4>
      <button 
        class="text-text-muted hover:text-white transition-colors cursor-pointer p-1 rounded hover:bg-white/10"
        @click="emit('close')"
      >
        <DsIcon icon="lucide:x" :size="16" />
      </button>
    </div>
    
    <!-- Body -->
    <div class="flex flex-col gap-2.5 text-sm">
      <div class="flex items-start border-b border-white/5 pb-1.5">
        <span class="text-text-muted w-20 shrink-0">id:</span>
        <span class="text-white font-mono truncate max-w-[180px]" :title="deviceId">
          {{ deviceId }}
        </span>
      </div>
      
      <div class="flex items-center border-b border-white/5 pb-1.5">
        <span class="text-text-muted w-20 shrink-0">无人机SN:</span>
        <div class="flex items-center gap-2 overflow-hidden">
          <span class="text-white font-mono truncate max-w-[120px]" :title="droneSn">
            {{ droneSn }}
          </span>
          <DsToken 
            :label="confidence === 'high' ? '高' : confidence === 'low' ? '低' : '--'" 
            :type="confidence === 'high' ? 'success' : confidence === 'low' ? 'warning' : 'default'"
            :icon="confidence === 'high' ? 'lucide:shield-check' : confidence === 'low' ? 'lucide:alert-circle' : 'lucide:help-circle'"
            class="scale-[0.85] origin-left"
          />
        </div>
      </div>

      <div class="flex items-start pt-0.5">
        <span class="text-text-muted w-20 shrink-0">状态:</span>
        <span 
          :class="[
            'font-medium drop-shadow-sm',
            level === 'high' ? 'text-danger' : level === 'medium' ? 'text-warning' : 'text-primary'
          ]"
        >
          {{ type }}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-3 mt-4 pt-4 border-t border-white/10">
      <button 
        class="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-md bg-primary/20 text-primary border border-primary/20 text-sm font-medium transition-all hover:bg-primary/30 active:scale-95"
        @click="handleNotifyPilot"
      >
        <DsIcon icon="lucide:send" :size="14" />
        通知飞手
      </button>
      <button 
        class="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-md bg-warning/20 text-warning border border-warning/20 text-sm font-medium transition-all hover:bg-warning/30 active:scale-95"
        @click="handleNotifyPolice"
      >
        <DsIcon icon="lucide:shield-alert" :size="14" />
        通知警员
      </button>
    </div>
    
    <!-- Bottom Pointer -->
    <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-bg-elevated border-r border-b border-border-focus transform rotate-45 backdrop-blur-xl pointer-events-none"></div>
  </div>
</template>

<script setup lang="ts">
import DsStatNumber from '@/components/atoms/DsStatNumber.vue'
import DsTrend from '@/components/atoms/DsTrend.vue'
import DsHudTitle from '@/components/atoms/DsHudTitle.vue'

defineProps<{
  title: string
  description?: string
  value: number | string
  suffix?: string
  decimals?: number
  trend?: number
  trendLabel?: string
  bottomText?: string
}>()
</script>

<template>
  <div class="relative flex flex-col p-4 rounded-xl bg-bg-elevated border border-border-default transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(0,255,255,0.1)] shrink-0 overflow-hidden group">
    <!-- Subtle tech background grid -->
    <div class="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity" style="background: radial-gradient(circle at center, #00FFFF 1.5px, transparent 1.5px) 0 0/10px 10px;"></div>

    <DsHudTitle :text="title" />
    <p v-if="description" class="text-text-muted text-xs mt-1.5 leading-relaxed relative z-10">{{ description }}</p>

    <div class="relative z-10" :class="description ? 'mt-3' : 'mt-4'">
      <!-- Value -->
      <div class="flex items-end gap-3">
        <DsStatNumber
          v-if="typeof value === 'number'"
          :value="value"
          :suffix="suffix"
          :decimals="decimals ?? 0"
          size="xl"
          class="text-[32px] font-black font-mono tracking-tight text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]"
        />
        <div v-else class="flex items-baseline gap-1">
          <span class="text-[32px] font-black font-mono tracking-tight text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">{{ value }}</span>
          <span v-if="suffix" class="text-sm text-text-secondary ml-1">{{ suffix }}</span>
        </div>
      </div>

      <!-- Trend indicator (below value, bordered box style) -->
      <div v-if="trend != null" class="flex items-center gap-2 mt-2">
        <div class="flex items-center justify-center px-1.5 py-0.5 rounded border border-border-default bg-bg-surface-hover">
          <DsTrend :value="trend" />
        </div>
        <span v-if="trendLabel" class="text-text-muted text-xs">{{ trendLabel }}</span>
      </div>

      <!-- Bottom text (e.g. "4988架活跃") -->
      <div v-if="bottomText" class="mt-2 text-text-muted text-xs">
        {{ bottomText }}
      </div>
    </div>
  </div>
</template>

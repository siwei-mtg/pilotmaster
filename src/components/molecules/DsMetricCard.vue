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
  <div class="group/card relative flex flex-col p-4 rounded-xl bg-[rgba(17,24,39,0.5)] backdrop-blur-md border border-border-default transition-all duration-500 hover:bg-[rgba(26,34,53,0.75)] hover:backdrop-blur-2xl hover:border-border-focus hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] shrink-0 overflow-hidden">
    <!-- Tech Glow Decoration Lines on Hover -->
    <div 
      class="absolute bottom-0 left-0 h-[2px] w-0 group-hover/card:w-full transition-all duration-700 ease-out z-20 opacity-0 group-hover/card:opacity-100" 
      style="background-color: #38BDF8; box-shadow: 0 0 12px #38BDF8;"
    ></div>

    <DsHudTitle :text="title" />
    <p v-if="description" class="text-white text-xs mt-1.5 leading-relaxed relative z-10">{{ description }}</p>

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
        <span v-if="trendLabel" class="text-white text-xs">{{ trendLabel }}</span>
      </div>

      <!-- Bottom text (e.g. "4988架活跃") -->
      <div v-if="bottomText" class="mt-2 text-white text-xs">
        {{ bottomText }}
      </div>
    </div>
  </div>
</template>

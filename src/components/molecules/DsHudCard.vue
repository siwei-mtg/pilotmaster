<script setup lang="ts">
import DsHudTitle from '@/components/atoms/DsHudTitle.vue'
import DsIcon from '@/components/atoms/DsIcon.vue'

defineProps<{
  title: string
  tooltipText?: string
  /** 允许内容（如带外部标注的图表）溢出卡片边界。默认 false（保持 overflow-hidden）。 */
  allowOverflow?: boolean
}>()
</script>

<template>
  <div :class="['group/card relative flex flex-col p-4 rounded-xl bg-[rgba(17,24,39,0.5)] backdrop-blur-md border border-border-default transition-all duration-500 hover:bg-[rgba(26,34,53,0.75)] hover:backdrop-blur-2xl hover:border-border-focus hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)]', allowOverflow ? 'overflow-visible' : 'overflow-hidden']">

    <!-- Bottom Neon Glow Line on Hover -->
    <div
      class="absolute bottom-0 left-0 h-[2px] w-0 group-hover/card:w-full transition-all duration-700 ease-out z-20 opacity-0 group-hover/card:opacity-100"
      style="background-color: #38BDF8; box-shadow: 0 0 12px #38BDF8;"
    ></div>

    <!-- Header Row -->
    <div class="relative z-10 flex items-center justify-between mb-3">
      <div class="relative group/tooltip flex items-center gap-1 cursor-help w-max">
        <DsHudTitle :text="title" />
        <DsIcon v-if="tooltipText" icon="lucide:info" :size="14" class="ml-1 text-cyan-500/60 opacity-60 group-hover/tooltip:opacity-100 transition-opacity" />
        <div v-if="tooltipText" class="absolute left-0 top-full mt-2 w-max max-w-[220px] px-3 py-2 rounded-lg bg-[#050A14]/90 border border-cyan-500/40 text-xs text-cyan-300 opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all z-50 shadow-[0_4px_20px_rgba(0,255,255,0.2)] transform -translate-y-1 group-hover/tooltip:translate-y-0 whitespace-normal backdrop-blur">
          {{ tooltipText }}
        </div>
      </div>
      <!-- Actions slot (e.g. tab toggles) -->
      <slot name="actions" />
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

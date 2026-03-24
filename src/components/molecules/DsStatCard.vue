<script setup lang="ts">
import DsStatNumber from '@/components/atoms/DsStatNumber.vue'
import DsTrend from '@/components/atoms/DsTrend.vue'
import DsIcon from '@/components/atoms/DsIcon.vue'

defineProps<{
  title: string
  value: number
  suffix?: string
  trend?: number
  icon?: string
  iconColor?: string
  glow?: boolean
}>()
</script>

<template>
  <div
    class="relative flex items-start gap-4 p-5 rounded-xl bg-bg-surface border border-border-default transition-all duration-300 hover:border-border-focus"
    :class="{ 'shadow-[0_0_20px_var(--color-glow-cyan)]': glow }"
  >
    <div
      v-if="icon"
      class="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
      :style="{ backgroundColor: (iconColor ?? 'var(--color-primary)') + '20' }"
    >
      <DsIcon :icon="icon" :size="20" :color="iconColor ?? 'var(--color-primary)'" />
    </div>
    <div class="flex flex-col gap-1 min-w-0">
      <span class="text-text-secondary text-xs">{{ title }}</span>
      <div class="flex items-baseline gap-2">
        <DsStatNumber :value="value" :suffix="suffix" size="lg" />
        <DsTrend v-if="trend != null" :value="trend" />
      </div>
    </div>
    <slot />
  </div>
</template>

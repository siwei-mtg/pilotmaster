<script setup lang="ts">
import DsStatCard from '@/components/molecules/DsStatCard.vue'

defineProps<{
  stats: Array<{
    key: string
    title: string
    value: number
    suffix?: string
    trend?: number
    icon?: string
    iconColor?: string
    glow?: boolean
  }>
  columns?: number
}>()
</script>

<template>
  <div
    class="grid gap-4"
    :style="{ gridTemplateColumns: `repeat(${columns ?? stats.length}, minmax(0, 1fr))` }"
  >
    <DsStatCard
      v-for="stat in stats"
      :key="stat.key"
      :title="stat.title"
      :value="stat.value"
      :suffix="stat.suffix"
      :trend="stat.trend"
      :icon="stat.icon"
      :icon-color="stat.iconColor"
      :glow="stat.glow"
    />
  </div>
</template>

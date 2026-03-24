<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  data: number[]
  width?: number
  height?: number
  color?: string
  fill?: boolean
}>(), {
  width: 120,
  height: 32,
  color: '#38BDF8',
  fill: true,
})

const pathD = computed(() => {
  const { data, width, height } = props
  if (!data.length) return ''
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = width / (data.length - 1)
  const padding = 2

  return data.map((v, i) => {
    const x = i * step
    const y = padding + (height - 2 * padding) * (1 - (v - min) / range)
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
})

const areaD = computed(() => {
  if (!pathD.value) return ''
  return `${pathD.value} L${props.width},${props.height} L0,${props.height} Z`
})
</script>

<template>
  <svg :width="width" :height="height" class="block">
    <defs>
      <linearGradient :id="`spark-grad-${$.uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" :stop-color="color" stop-opacity="0.3" />
        <stop offset="100%" :stop-color="color" stop-opacity="0" />
      </linearGradient>
    </defs>
    <path v-if="fill" :d="areaD" :fill="`url(#spark-grad-${$.uid})`" />
    <path :d="pathD" fill="none" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { CountUp } from 'countup.js'

const props = withDefaults(defineProps<{
  value: number
  prefix?: string
  suffix?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  decimals?: number
}>(), {
  size: 'lg',
  decimals: 0,
})

const elRef = ref<HTMLSpanElement>()
let countUp: CountUp | null = null

onMounted(() => {
  if (elRef.value) {
    countUp = new CountUp(elRef.value, props.value, {
      startVal: 0,
      duration: 1.2,
      decimalPlaces: props.decimals,
      useEasing: true,
    })
    countUp.start()
  }
})

watch(() => props.value, (newVal) => {
  countUp?.update(newVal)
})
</script>

<template>
  <span class="inline-flex items-baseline gap-1 font-display tabular-nums tracking-tight">
    <span v-if="prefix" class="text-text-secondary" :class="{ 'text-sm': size === 'sm', 'text-base': size === 'md', 'text-lg': size === 'lg', 'text-xl': size === 'xl' }">{{ prefix }}</span>
    <span
      ref="elRef"
      :class="{
        'text-lg': size === 'sm',
        'text-xl': size === 'md',
        'text-[28px]': size === 'lg',
        'text-[36px]': size === 'xl',
      }"
      class="text-text-primary font-semibold"
    >{{ value }}</span>
    <span v-if="suffix" class="text-text-muted" :class="{ 'text-xs': size === 'sm', 'text-sm': size === 'md', 'text-base': size === 'lg', 'text-lg': size === 'xl' }">{{ suffix }}</span>
  </span>
</template>

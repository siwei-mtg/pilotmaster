<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number
}>()

const isUp = computed(() => props.value > 0)
const isDown = computed(() => props.value < 0)
const isZero = computed(() => props.value === 0)
const display = computed(() => `${Math.abs(props.value).toFixed(1)}%`)
</script>

<template>
  <span
    class="inline-flex items-center gap-0.5 text-xs font-medium"
    :class="{
      'text-danger': isUp,
      'text-success': isDown,
      'text-text-secondary': isZero,
    }"
  >
    <svg v-if="isUp" class="w-3 h-3" viewBox="0 0 12 12" fill="none">
      <path d="M6 2.5L10 7.5H2L6 2.5Z" fill="currentColor" />
    </svg>
    <svg v-else-if="isDown" class="w-3 h-3" viewBox="0 0 12 12" fill="none">
      <path d="M6 9.5L2 4.5H10L6 9.5Z" fill="currentColor" />
    </svg>
    <!-- Zero: horizontal dash indicator -->
    <svg v-else class="w-3 h-3" viewBox="0 0 12 12" fill="none">
      <rect x="2" y="5" width="8" height="2" rx="1" fill="currentColor" />
    </svg>
    {{ display }}
  </span>
</template>

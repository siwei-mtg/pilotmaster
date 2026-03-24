<script setup lang="ts">
withDefaults(defineProps<{
  color?: 'primary' | 'success' | 'warning' | 'danger'
  size?: number
}>(), {
  color: 'danger',
  size: 8,
})
</script>

<template>
  <span class="relative inline-flex items-center justify-center" :style="{ width: `${size * 2.5}px`, height: `${size * 2.5}px` }">
    <span
      class="absolute rounded-full animate-ping opacity-40"
      :class="{
        'bg-primary': color === 'primary',
        'bg-success': color === 'success',
        'bg-warning': color === 'warning',
        'bg-danger': color === 'danger',
      }"
      :style="{ width: `${size}px`, height: `${size}px` }"
    />
    <span
      class="relative rounded-full"
      :class="{
        'bg-primary': color === 'primary',
        'bg-success': color === 'success',
        'bg-warning': color === 'warning',
        'bg-danger': color === 'danger',
      }"
      :style="{ width: `${size}px`, height: `${size}px` }"
    />
  </span>
</template>

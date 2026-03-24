<script setup lang="ts">
withDefaults(defineProps<{
  width?: string
  position?: 'left' | 'right'
}>(), {
  width: '360px',
  position: 'right',
})
</script>

<template>
  <div
    class="absolute top-4 bottom-4 z-10 flex flex-col rounded-2xl border border-border-default overflow-hidden"
    :class="{ 'right-4': position === 'right', 'left-4': position === 'left' }"
    :style="{ width, backdropFilter: 'blur(16px)', background: 'rgba(17,24,39,0.85)' }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="inline-flex items-center gap-2 select-none">
    <!-- Neon Bar Indicator -->
    <div class="flex gap-[2px] items-end">
      <div class="w-[5px] h-[14px] bg-cyan-400 shadow-[0_0_8px_#00FFFF]" style="transform: skewX(-15deg);"></div>
      <div class="w-[3px] h-[8px] bg-cyan-400/60" style="transform: skewX(-15deg);"></div>
    </div>
    <!-- HUD Text -->
    <span 
      class="text-cyan-300 font-bold tracking-[0.15em] text-base drop-shadow-[0_0_6px_rgba(0,255,255,0.6)] uppercase leading-none ml-1"
    >
      <slot>{{ text }}</slot>
    </span>
  </div>
</template>

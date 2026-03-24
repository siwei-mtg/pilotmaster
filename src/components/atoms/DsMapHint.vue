<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div class="ds-map-hint">
    {{ text }}
  </div>
</template>

<style scoped>
.ds-map-hint {
  background: rgba(11, 14, 23, 0.85);
  color: #38BDF8;
  font-size: 12px;
  padding: 4px 10px;
  border: 1px solid rgba(56, 189, 248, 0.4);
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  backdrop-filter: blur(6px);
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.2), inset 0 0 6px rgba(56, 189, 248, 0.05);
  letter-spacing: 0.5px;
}
</style>

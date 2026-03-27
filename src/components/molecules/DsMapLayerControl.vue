<script setup lang="ts">
import { NSwitch } from 'naive-ui'
import DsIcon from '@/components/atoms/DsIcon.vue'

defineProps<{
  showNofly: boolean
}>()

const emit = defineEmits<{
  (e: 'update:showNofly', value: boolean): void
}>()

function handleToggle(value: boolean) {
  emit('update:showNofly', value)
}
</script>

<template>
  <div class="layer-control backdrop-blur-md bg-bg-elevated/80 border border-border-default rounded-lg p-2 flex flex-col gap-2 shadow-lg select-none">
    <div class="flex items-center gap-3 px-1 py-1 hover:bg-white/5 rounded transition-colors cursor-pointer" @click="handleToggle(!showNofly)">
      <div class="flex items-center gap-2 flex-1">
        <DsIcon icon="lucide:map-pin-off" :size="16" class="text-primary" />
        <span class="text-xs font-medium text-text-secondary">禁飞区图层</span>
      </div>
      <NSwitch :value="showNofly" size="small" @update:value="handleToggle" @click.stop />
    </div>
  </div>
</template>

<style scoped>
.layer-control {
  min-width: 140px;
}
</style>

<script setup lang="ts">
import DsTimestamp from '@/components/atoms/DsTimestamp.vue'
import DsToken from '@/components/atoms/DsToken.vue'

defineProps<{
  time: string | number | Date
  type: string
  location: string
  level: 'high' | 'medium' | 'low'
}>()

defineEmits<{
  click: []
}>()

const levelMap = {
  high: { label: '高', type: 'danger' as const, icon: 'lucide:triangle-alert' },
  medium: { label: '中', type: 'warning' as const, icon: 'lucide:triangle-alert' },
  low: { label: '低', type: 'info' as const, icon: 'lucide:info' },
}
</script>

<template>
  <div
    class="flex flex-col gap-2.5 p-5 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#101E3D]/60 group border border-white/5 hover:border-primary/30 bg-[#0A162B]/40 mb-3 shadow-lg"
    @click="$emit('click')"
  >
    <!-- Layer 1: Priority Indicator and Timestamp -->
    <div class="flex items-center gap-3">
      <DsToken 
        :label="levelMap[level].label" 
        :type="levelMap[level].type" 
        :icon="levelMap[level].icon"
        class="bg-opacity-20 backdrop-blur-md"
      />
      <DsTimestamp :time="time" mode="full" class="text-[13px] font-medium text-text-secondary/80 flex-1" />
    </div>

    <!-- Layer 2: Major Alert Type -->
    <div class="text-xl font-bold text-text-primary tracking-tight leading-tight group-hover:text-primary transition-colors">
      {{ type }}
    </div>

    <!-- Layer 3: Contextual Location -->
    <div class="text-sm text-white font-medium">
      {{ location }}
    </div>
  </div>
</template>

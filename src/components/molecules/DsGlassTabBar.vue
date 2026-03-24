<script setup lang="ts">
import DsGlassTab from '@/components/atoms/DsGlassTab.vue'

export interface TabItem {
  label: string
  value: string
}

const props = defineProps<{
  tabs: TabItem[]
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleTabChange(value: string) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="flex items-end gap-0.5 pl-0">
    <DsGlassTab
      v-for="tab in tabs"
      :key="tab.value"
      :label="tab.label"
      :value="tab.value"
      :model-value="modelValue"
      @update:model-value="handleTabChange"
    />
  </div>
</template>

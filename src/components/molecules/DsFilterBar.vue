<script setup lang="ts">
import { ref } from 'vue'
import { NInput, NDatePicker, NButton, NSelect } from 'naive-ui'
import DsIcon from '@/components/atoms/DsIcon.vue'

const props = defineProps<{
  filters: Array<{
    key: string
    label: string
    type: 'input' | 'date-range' | 'select'
    options?: Array<{ label: string; value: string | number }>
    placeholder?: string
    width?: string
    advanced?: boolean
    disabled?: boolean
  }>
}>()

const emit = defineEmits<{
  search: [values: Record<string, any>]
  reset: []
  change: [key: string, value: any]
}>()

const values = ref<Record<string, any>>({})
const showAdvanced = ref(false)

const hasAdvanced = props.filters.some(f => f.advanced)

function handleSearch() {
  emit('search', { ...values.value })
}

function handleReset() {
  values.value = {}
  emit('reset')
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap items-center gap-3">
      <template v-for="filter in filters.filter(f => !f.advanced)" :key="filter.key">
        <NInput
          v-if="filter.type === 'input'"
          v-model:value="values[filter.key]"
          :placeholder="filter.placeholder ?? filter.label"
          :disabled="filter.disabled"
          clearable
          :style="{ width: filter.width ?? '240px' }"
          @update:value="(val: string | null) => emit('change', filter.key, val)"
        />
        <NDatePicker
          v-else-if="filter.type === 'date-range'"
          v-model:value="values[filter.key]"
          type="daterange"
          :disabled="filter.disabled"
          clearable
          :style="{ width: filter.width ?? '280px' }"
          @update:value="(val: [number, number] | null) => emit('change', filter.key, val)"
        />
        <NSelect
          v-else-if="filter.type === 'select'"
          v-model:value="values[filter.key]"
          :options="filter.options"
          :placeholder="filter.placeholder ?? filter.label"
          :disabled="filter.disabled"
          clearable
          :style="{ width: filter.width ?? '160px' }"
          @update:value="(val: string | number | null) => emit('change', filter.key, val)"
        />
      </template>

      <NButton v-if="hasAdvanced" quaternary size="small" @click="showAdvanced = !showAdvanced">
        <template #icon><DsIcon :icon="showAdvanced ? 'lucide:chevron-up' : 'lucide:chevron-down'" :size="14" /></template>
        更多筛选
      </NButton>

      <div class="flex items-center gap-2 ml-auto">
        <NButton type="primary" @click="handleSearch">
          <template #icon><DsIcon icon="lucide:search" :size="14" /></template>
          查询
        </NButton>
        <NButton text class="text-text-muted!" @click="handleReset">重置</NButton>
      </div>
    </div>

    <Transition name="fade-slide">
      <div v-if="showAdvanced && hasAdvanced" class="flex flex-wrap items-center gap-3">
        <template v-for="filter in filters.filter(f => f.advanced)" :key="filter.key">
          <NSelect
            v-if="filter.type === 'select'"
            v-model:value="values[filter.key]"
            :options="filter.options"
            :placeholder="filter.placeholder ?? filter.label"
            clearable
            :style="{ width: filter.width ?? '160px' }"
          />
          <NInput
            v-else-if="filter.type === 'input'"
            v-model:value="values[filter.key]"
            :placeholder="filter.placeholder ?? filter.label"
            clearable
            :style="{ width: filter.width ?? '200px' }"
          />
        </template>
      </div>
    </Transition>
  </div>
</template>

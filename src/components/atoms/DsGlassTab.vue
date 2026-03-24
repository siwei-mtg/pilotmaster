<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  value: string
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isActive = computed(() => props.modelValue === props.value)

function handleClick() {
  emit('update:modelValue', props.value)
}
</script>

<template>
  <button
    class="group relative inline-flex items-center justify-center
           px-5 backdrop-blur-md
           text-sm font-medium
           transition-all duration-200 cursor-pointer
           select-none outline-none"
    :class="isActive ? [
      'pt-2 pb-[11px] mb-[-1px]',
      'rounded-t-xl',
      'border-l border-t border-r border-b-0',
      'border-[rgba(56,189,248,0.35)]',
      'bg-[rgba(17,24,39,0.75)]',
      'z-10 relative',
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]',
    ] : [
      'pt-1.5 pb-2 mt-[4px]',
      'rounded-t-lg',
      'border border-[rgba(56,189,248,0.10)]',
      'bg-[rgba(11,14,23,0.55)]',
      'hover:border-[rgba(56,189,248,0.22)]',
      'hover:bg-[rgba(17,24,39,0.55)]',
    ]"
    @click="handleClick"
  >
    <!-- Specular top-edge highlight (active only) -->
    <div
      v-if="isActive"
      class="absolute top-0 left-[15%] right-[15%] h-px rounded-full pointer-events-none
             bg-gradient-to-r from-transparent via-white/20 to-transparent"
    />

    <!-- Inner radial glow (active only) -->
    <div
      v-if="isActive"
      class="absolute inset-0 rounded-t-xl pointer-events-none"
      style="background: radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.12) 0%, transparent 70%);"
    />

    <!-- Label text -->
    <span
      class="relative z-10 transition-all duration-200 leading-none"
      :class="isActive
        ? 'text-white drop-shadow-[0_0_6px_rgba(56,189,248,0.7)]'
        : 'text-[#64748B] group-hover:text-[#94A3B8]'"
    >
      {{ label }}
    </span>
  </button>
</template>

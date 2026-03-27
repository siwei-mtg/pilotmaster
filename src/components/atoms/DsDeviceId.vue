<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  id: string
}>()

const showFull = ref(false)
const copied = ref(false)

const shortId = computed(() => {
  if (props.id.length <= 14) return props.id
  return `${props.id.slice(0, 8)}...${props.id.slice(-4)}`
})

async function copyId() {
  await navigator.clipboard.writeText(props.id)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1500)
}
</script>

<template>
  <span
    class="inline-flex items-center gap-1 font-mono text-base text-text-primary cursor-pointer group"
    @mouseenter="showFull = true"
    @mouseleave="showFull = false"
  >
    <span>{{ shortId }}</span>
    <Transition name="fade-slide">
      <span
        v-if="showFull"
        class="absolute z-50 px-3 py-2 text-xs rounded-lg bg-bg-elevated border border-border-default shadow-lg -translate-y-full -top-2 left-0 whitespace-nowrap"
      >
        <span class="text-text-primary">{{ id }}</span>
        <button
          class="ml-2 text-primary hover:text-primary-hover transition-colors"
          @click.stop="copyId"
        >
          {{ copied ? '已复制' : '复制' }}
        </button>
      </span>
    </Transition>
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, shallowRef } from 'vue'
import * as echarts from 'echarts'
import { echartsDarkTheme } from '@/design-system/theme/echarts-dark-theme'

import DsHudTitle from '@/components/atoms/DsHudTitle.vue'

const props = defineProps<{
  title: string
  description?: string
  option: echarts.EChartsOption
  height?: string
  /** 渲染器：'canvas'（默认）或 'svg'。
   *  SVG 模式下标签为真实 DOM 元素，可配合父容器 overflow-visible 溢出显示，
   *  适合带外部 callout 标注的环形/饼图。 */
  renderer?: 'canvas' | 'svg'
}>()

const chartRef = ref<HTMLDivElement>()
const chart = shallowRef<echarts.ECharts>()

onMounted(() => {
  if (!chartRef.value) return
  echarts.registerTheme('drone-dark', echartsDarkTheme)
  chart.value = echarts.init(chartRef.value, 'drone-dark')
  chart.value.setOption(props.option)
  window.addEventListener('resize', handleResize)
})

watch(() => props.option, (newOpt) => {
  chart.value?.setOption(newOpt, { notMerge: true })
}, { deep: true })

function handleResize() {
  chart.value?.resize()
}

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chart.value?.dispose()
})
</script>

<template>
  <div class="flex flex-col rounded-xl bg-bg-surface border border-border-default overflow-hidden">
    <div v-if="title || description || $slots.title || $slots.toolbar" class="flex items-center justify-between px-5 pt-4 pb-2">
      <slot name="title">
        <div class="flex flex-col gap-1">
          <DsHudTitle v-if="title" :text="title" />
          <p v-if="description" class="text-white text-xs mt-1">{{ description }}</p>
        </div>
      </slot>
      <div class="flex items-center gap-2">
        <slot name="toolbar" />
      </div>
    </div>
    <div class="flex-1 min-h-0 relative">
      <slot>
        <div ref="chartRef" class="w-full h-full" :style="{ height: height ?? '300px' }" />
      </slot>
    </div>
  </div>
</template>

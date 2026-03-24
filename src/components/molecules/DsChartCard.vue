<script setup lang="ts">
import { ref, onMounted, watch, shallowRef, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([LineChart, GridComponent, TooltipComponent, CanvasRenderer])

const props = defineProps<{
  chartTitle?: string
  chartColor?: string
  chartData: number[]
  xAxisData?: string[]
}>()

const chartRef = ref<HTMLElement | null>(null)
const chartInstance = shallowRef<echarts.ECharts | null>(null)

const initChart = () => {
  if (!chartRef.value) return
  
  if (!chartInstance.value) {
    chartInstance.value = echarts.init(chartRef.value)
  }

  const primaryColor = props.chartColor || '#38BDF8'
  
  const option = {
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: primaryColor,
      borderWidth: 1,
      padding: [8, 12],
      textStyle: { color: '#E2E8F0', fontSize: 13, fontFamily: 'monospace' },
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: primaryColor,
          width: 1,
          type: 'dashed',
          opacity: 0.5
        }
      }
    },
    grid: { left: 15, right: 15, top: 20, bottom: 5, containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xAxisData || props.chartData.map((_, i) => String(i)),
      axisLine: { lineStyle: { color: 'rgba(148, 163, 184, 0.2)' } },
      axisLabel: {
        color: '#94A3B8',
        fontSize: 11,
        margin: 10,
        fontFamily: 'monospace'
      },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      min: (value: { min: number }) => Math.max(0, value.min - (value.min * 0.1)),
      splitLine: {
        lineStyle: { color: 'rgba(148, 163, 184, 0.08)', type: 'dashed' }
      },
      axisLabel: {
        color: '#94A3B8',
        fontSize: 11,
        margin: 10,
        fontFamily: 'monospace'
      }
    },
    series: [
      {
        name: props.chartTitle || '数值',
        data: props.chartData,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 0,
        showSymbol: false,
        itemStyle: {
          color: primaryColor,
          borderColor: '#111827',
          borderWidth: 2
        },
        lineStyle: {
          color: primaryColor,
          width: 2,
          shadowColor: primaryColor,
          shadowBlur: 8
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: `${primaryColor}60` },
            { offset: 1, color: `${primaryColor}00` }
          ])
        }
      }
    ]
  }
  
  chartInstance.value.setOption(option)
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  initChart()
  
  if (chartRef.value) {
    resizeObserver = new ResizeObserver(() => {
      chartInstance.value?.resize()
    })
    resizeObserver.observe(chartRef.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver && chartRef.value) {
    resizeObserver.unobserve(chartRef.value)
  }
  chartInstance.value?.dispose()
})

watch([() => props.chartData, () => props.xAxisData], () => {
  nextTick(() => {
    initChart()
  })
}, { deep: true })
</script>

<template>
  <div class="relative flex flex-col rounded-xl bg-bg-elevated border border-border-default transition-all duration-300 hover:border-border-focus overflow-hidden">
    <div ref="chartRef" class="absolute inset-0 w-full h-full opacity-90 p-1"></div>
  </div>
</template>

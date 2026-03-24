<script setup lang="ts">
import { ref, onMounted, watch, shallowRef, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import DsStatNumber from '@/components/atoms/DsStatNumber.vue'
import DsTrend from '@/components/atoms/DsTrend.vue'
import DsIcon from '@/components/atoms/DsIcon.vue'
import DsHudTitle from '@/components/atoms/DsHudTitle.vue'

echarts.use([LineChart, GridComponent, TooltipComponent, CanvasRenderer])

const props = defineProps<{
  title: string
  tooltipText?: string
  value: number
  suffix?: string
  trend?: number
  trendLabel?: string
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
    grid: { left: 15, right: 15, top: 10, bottom: 5, containLabel: true },
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
        name: props.title,
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
  <div class="group/card relative flex flex-col p-4 rounded-xl bg-[rgba(17,24,39,0.5)] backdrop-blur-md border border-border-default transition-all duration-500 hover:bg-[rgba(26,34,53,0.75)] hover:backdrop-blur-2xl hover:border-border-focus hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden">
    
    <!-- Tech Glow Decoration Lines on Hover -->
    <div 
      class="absolute bottom-0 left-0 h-[2px] w-0 group-hover/card:w-full transition-all duration-700 ease-out z-20 opacity-0 group-hover/card:opacity-100" 
      style="background-color: #38BDF8; box-shadow: 0 0 12px #38BDF8;"
    ></div>

    <!-- Top Metric Section -->
    <div class="z-10 flex flex-col shrink-0 mb-4">
      <div class="relative group/tooltip flex items-center mb-2 w-max cursor-help">
        <DsHudTitle :text="title" />
        <DsIcon v-if="tooltipText" icon="lucide:info" :size="14" class="ml-1.5 text-cyan-500/60 opacity-60 group-hover/tooltip:opacity-100 transition-opacity" />
        
        <!-- Tooltip content -->
        <div v-if="tooltipText" class="absolute left-0 top-full mt-2 w-max max-w-[220px] px-3 py-2 rounded-lg bg-[#050A14]/90 border border-cyan-500/40 text-xs text-cyan-300 opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all z-50 shadow-[0_4px_20px_rgba(0,255,255,0.2)] transform -translate-y-1 group-hover/tooltip:translate-y-0 whitespace-normal backdrop-blur">
          {{ tooltipText }}
        </div>
      </div>
      
      <div class="flex items-end gap-3">
        <DsStatNumber 
          :value="value" 
          :suffix="suffix" 
          size="xl" 
          class="text-4xl font-bold font-mono tracking-tight text-white transition-all duration-300" 
          :style="{ textShadow: `0 0 16px ${chartColor || '#38BDF8'}80` }"
        />
        <div v-if="trend != null || trendLabel" class="flex items-center gap-2 pb-1.5">
          <div v-if="trend != null" class="flex items-center justify-center px-1.5 py-0.5 rounded border border-border-default bg-bg-surface-hover">
            <DsTrend :value="trend" />
          </div>
          <span v-if="trendLabel" class="text-text-muted text-xs">{{ trendLabel }}</span>
        </div>
      </div>
    </div>
    
    <!-- Bottom Chart Section -->
    <div class="relative flex-1 min-h-[80px] w-full mt-2">
      <div ref="chartRef" class="absolute inset-0 w-full h-full"></div>
    </div>
  </div>
</template>

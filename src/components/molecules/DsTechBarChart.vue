<script setup lang="ts">
import { ref, onMounted, watch, shallowRef, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// Register ECharts components
echarts.use([BarChart, GridComponent, TooltipComponent, CanvasRenderer])

interface DataItem {
  name: string
  value: number
}

const props = withDefaults(defineProps<{
  data: DataItem[]
  color?: string
}>(), {
  color: '#0ea5e9'
})

const emit = defineEmits<{
  (e: 'elementClick', name: string, value: number): void
}>()

const chartRef = ref<HTMLElement | null>(null)
const chartInstance = shallowRef<echarts.ECharts | null>(null)

const initChart = () => {
  if (!chartRef.value) return
  
  if (!chartInstance.value) {
    chartInstance.value = echarts.init(chartRef.value)
    
    // Add click event listener
    chartInstance.value.on('click', (params: any) => {
      emit('elementClick', params.name, params.value)
    })
  }

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(255, 255, 255, 0.05)'
        }
      },
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: props.color,
      borderWidth: 1,
      textStyle: { 
        color: '#fff',
        fontSize: 12
      }
    },
    grid: {
      top: 30,
      right: 10,
      bottom: 0,
      left: 10,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.data.map(d => d.name),
      axisLine: { 
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)' 
        }
      },
      axisTick: { show: false },
      axisLabel: {
        color: '#94a3b8',
        fontSize: 10,
        margin: 8,
        interval: 'auto' 
      },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.05)',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#94a3b8',
        fontSize: 10
      }
    },
    series: [
      {
        name: 'Count',
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: props.color },
            { offset: 1, color: `${props.color}33` }
          ]),
          borderRadius: [2, 2, 0, 0]
        },
        data: props.data.map(d => d.value),
        animationDelay: (idx: number) => idx * 10,
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

watch(() => props.data, () => {
  nextTick(() => {
    initChart()
  })
}, { deep: true })

watch(() => props.color, () => {
  nextTick(() => {
    initChart()
  })
})
</script>

<template>
  <div class="w-full h-full min-h-[150px]">
    <div ref="chartRef" class="w-full h-full"></div>
  </div>
</template>

<style scoped>
</style>

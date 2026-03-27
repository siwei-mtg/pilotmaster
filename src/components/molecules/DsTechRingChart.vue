<script setup lang="ts">
import { ref, onMounted, watch, shallowRef, onBeforeUnmount, nextTick, computed } from 'vue'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// Register ECharts components
echarts.use([PieChart, TooltipComponent, TitleComponent, LegendComponent, CanvasRenderer])

interface DataItem {
  name: string
  value: number
}

const props = withDefaults(defineProps<{
  data: DataItem[]
  centerTitle?: string
  totalValue?: number | string
  colors?: string[]
  showCenter?: boolean
}>(), {
  centerTitle: "总数",
  colors: () => ['#0ea5e9', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6'],
  showCenter: true
})

const emit = defineEmits<{
  (e: 'elementClick', name: string, value: number): void
}>()

const chartRef = ref<HTMLElement | null>(null)
const chartInstance = shallowRef<echarts.ECharts | null>(null)

const total = computed(() => {
  if (props.totalValue !== undefined) return props.totalValue
  return props.data.reduce((sum, item) => sum + item.value, 0)
})

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
      trigger: 'item',
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderColor: '#0ea5e9',
      borderWidth: 1,
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      show: false
    },
    title: {
      show: props.showCenter,
      text: `{title|${props.centerTitle}}\n{value|${total.value}}`,
      left: 'center',
      top: 'center',
      textStyle: {
        rich: {
          title: {
            color: 'rgba(255,255,255,0.7)',
            fontSize: 14,
            padding: [0, 0, 8, 0]
          },
          value: {
            color: '#fff',
            fontSize: 24,
            fontWeight: 'bold',
            textShadowColor: 'rgba(255,255,255,0.3)',
            textShadowBlur: 5
          }
        }
      }
    },
    series: [
      // Inner Glow Ring (Unified Glow)
      {
        name: 'Inner Glow',
        type: 'pie',
        radius: ['36%', '40%'],
        center: ['50%', '50%'],
        silent: true,
        label: { show: false },
        itemStyle: {
          color: 'rgba(14, 165, 233, 0.2)',
          shadowBlur: 20,
          shadowColor: '#0ea5e9'
        },
        data: [{ value: 1 }]
      },
      // Main Data Ring
      {
        name: props.centerTitle,
        type: 'pie',
        radius: ['45%', '65%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        padAngle: 5,
        itemStyle: {
          borderRadius: 6,
          borderColor: 'transparent',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}\n{d}%',
          color: 'inherit',
          fontSize: 12,
          lineHeight: 18,
          alignTo: 'labelLine'
        },
        labelLayout: {
          hideOverlap: false
        },
        emphasis: {
          scale: true,
          scaleSize: 8,
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        data: props.data,
        color: props.colors
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

watch(() => [props.showCenter, props.centerTitle, props.totalValue, props.colors], () => {
  nextTick(() => {
    initChart()
  })
})
</script>

<template>
  <div class="relative w-full h-full min-h-[200px]">
    <div ref="chartRef" class="w-full h-full"></div>
  </div>
</template>

<style scoped>
/* Add any specific styles here if needed */
</style>

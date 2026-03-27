<script setup lang="ts">
import { ref, onMounted, watch, shallowRef, onBeforeUnmount, nextTick } from 'vue'
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
  title?: string
  colors?: string[]
  unit?: string
}>(), {
  title: "",
  colors: () => ['#38BDF8', '#F472B6', '#94A3B8', '#10b981', '#8b5cf6'],
  unit: "%"
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
      trigger: 'item',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: 'rgba(56, 189, 248, 0.3)',
      borderWidth: 1,
      textStyle: {
        color: '#E2E8F0',
        fontSize: 12
      },
      formatter: `{b}: {c}${props.unit} ({d}%)`
    },
    legend: {
      show: true,
      orient: 'vertical',
      right: '10%',
      top: 'middle',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12
      }
    },
    series: [
      // Outer Glow Ring (Optional aesthetic)
      {
        name: 'Outer Glow',
        type: 'pie',
        radius: ['0%', '70%'],
        center: ['40%', '50%'],
        silent: true,
        label: { show: false },
        itemStyle: {
          color: 'rgba(56, 189, 248, 0.05)',
          shadowBlur: 30,
          shadowColor: 'rgba(56, 189, 248, 0.2)'
        },
        data: [{ value: 1 }]
      },
      // Main Pie Chart
      {
        name: props.title,
        type: 'pie',
        radius: ['10%', '65%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: 'rgba(15, 23, 42, 0.5)',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}\n{d}%',
          color: 'inherit',
          fontSize: 11,
          lineHeight: 16
        },
        emphasis: {
          scale: true,
          scaleSize: 10,
          itemStyle: {
            shadowBlur: 15,
            shadowOffsetX: 0,
            shadowColor: 'rgba(56, 189, 248, 0.5)'
          }
        },
        labelLine: {
          show: true,
          length: 5,
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

watch(() => [props.title, props.colors], () => {
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
</style>

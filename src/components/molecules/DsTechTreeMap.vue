<script setup lang="ts">
import { ref, onMounted, watch, shallowRef, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts/core'
import { TreemapChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// Register ECharts components
echarts.use([TreemapChart, TooltipComponent, CanvasRenderer])

interface DataItem {
  name: string
  value: number
}

const props = withDefaults(defineProps<{
  data: DataItem[]
  colors?: string[]
}>(), {
  colors: () => ['#10b981', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#f59e0b']
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
      formatter: '{b}: {c}',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: props.colors[0],
      borderWidth: 1,
      textStyle: {
        color: '#fff',
        fontSize: 12
      }
    },
    series: [
      {
        type: 'treemap',
        left: 'center',
        top: 'middle',
        width: '100%',
        height: '100%',
        roam: false, 
        nodeClick: false, 
        breadcrumb: { show: false },
        itemStyle: {
          borderColor: '#020617', // Match dashboard background for clean separation
          borderWidth: 1,
          gapWidth: 1,
          borderRadius: 4
        },
        label: {
          show: true,
          formatter: '{b}\n{c}',
          color: '#fff',
          fontSize: 11,
          fontWeight: 'bold'
        },
        data: props.data,
        levels: [
          {
            itemStyle: {
              borderColor: '#020617',
              borderWidth: 1,
              gapWidth: 1
            }
          }
        ],
        // Use the colors array for the treemap items
        color: props.colors, 
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

watch(() => props.colors, () => {
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

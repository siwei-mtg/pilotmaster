<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { mapDarkStyleId } from '@/design-system/theme/map-dark-style'

const mapRef = ref<HTMLDivElement>()
const map = ref<any>(null)
const loading = ref(true)
const error = ref('')

const emit = defineEmits<{
  ready: [map: any]
}>()

defineExpose({ map })

onMounted(async () => {
  if (!mapRef.value) return

  try {
    const AMapLoader = (window as any).AMapLoader
    if (!AMapLoader) {
      throw new Error('AMapLoader 未加载')
    }

    const apiKey = (import.meta.env.VITE_AMAP_API_KEY || 'YOUR_AMAP_API_KEY').trim()
    const AMap = await AMapLoader.load({
      key: apiKey,
      version: '2.0',
      plugins: [],
    })

    map.value = new AMap.Map(mapRef.value, {
      zoom: 12,
      center: [120.15507, 30.27408],
      mapStyle: mapDarkStyleId,
      viewMode: '2D',
      features: ['bg', 'road', 'building'] // Hides point layer minimizing subway stations and labels
    })

    emit('ready', map.value)

    loading.value = false
  } catch (e) {
    error.value = `地图加载失败: ${e instanceof Error ? e.message : String(e)}。请替换 API Key`
    console.error('高德地图加载失败:', e)
    loading.value = false
  }
})

onUnmounted(() => {
  map.value?.destroy()
})
</script>

<template>
  <div class="relative w-full h-full bg-bg-base" style="min-height: 100%;">
    <div ref="mapRef" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%;" />

    <!-- 加载提示 -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center z-50 bg-bg-base/80">
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-3 animate-pulse">
          <div class="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
        <p class="text-text-secondary text-sm">加载地图中...</p>
      </div>
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="absolute inset-0 flex items-center justify-center z-50 bg-bg-base/80">
      <div class="text-center p-4">
        <div class="text-danger text-lg mb-2">⚠️ 地图加载失败</div>
        <p class="text-text-secondary text-sm mb-3 max-w-xs">{{ error }}</p>
        <p class="text-text-muted text-xs">请在 <code class="bg-bg-surface px-1.5 py-0.5 rounded">src/components/organisms/DsMapContainer.vue</code> 中替换你的 API Key</p>
      </div>
    </div>

    <slot />
  </div>
</template>

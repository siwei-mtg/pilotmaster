<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { NModal } from 'naive-ui'
import DsMapContainer from '@/components/organisms/DsMapContainer.vue'

const props = defineProps<{
  show: boolean
  title?: string
  location: string
  lat: number
  lng: number
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
}>()

const mapInstance = ref<any>(null)
let AMap: any = null
let marker: any = null
let infoWindow: any = null

function handleMapReady(map: any) {
  mapInstance.value = map
  AMap = (window as any).AMap
  renderLocation()
}

function renderLocation() {
  if (!mapInstance.value || !AMap) return

  // Clean up previous marker & info window
  if (marker) {
    mapInstance.value.remove(marker)
    marker = null
  }
  if (infoWindow) {
    infoWindow.close()
    infoWindow = null
  }

  const color = '#EF4444'

  // Breathing dot marker (reuse RealTimePage pattern)
  const markerContent = `
    <div class="relative flex items-center justify-center w-10 h-10 group cursor-pointer transition-transform duration-500 hover:scale-125 hover:z-50 align-middle">
      <div class="absolute inset-0 rounded-full opacity-30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" style="background-color: ${color};"></div>
      <div class="absolute w-4 h-4 rounded-full opacity-[0.25] animate-pulse" style="background-color: ${color}; box-shadow: 0 0 12px ${color};"></div>
      <div class="z-10 w-2 h-2 rounded-full border-[0.5px] border-white/70" style="background-color: ${color}; box-shadow: 0 0 4px ${color};"></div>
    </div>
  `

  marker = new AMap.Marker({
    position: [props.lng, props.lat],
    content: markerContent,
    offset: new AMap.Pixel(-20, -20),
  })

  mapInstance.value.add(marker)
  mapInstance.value.setZoomAndCenter(14, [props.lng, props.lat])

  // Info window callout (light style per screenshot)
  infoWindow = new AMap.InfoWindow({
    isCustom: true,
    autoMove: false,
    anchor: 'bottom-center',
    offset: new AMap.Pixel(0, -24),
  })

  const infoDiv = document.createElement('div')
  infoDiv.className = 'relative bg-white rounded-lg shadow-lg min-w-[220px] p-3 text-gray-800'

  infoDiv.innerHTML = `
    <div class="flex items-center justify-between mb-2">
      <h4 class="text-sm font-semibold text-gray-900">操控者位置信息</h4>
      <button class="close-btn text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-0.5 rounded hover:bg-gray-100">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <div class="text-sm text-gray-600">
      坐标: ${props.lng}, ${props.lat}
    </div>
    <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 shadow-lg pointer-events-none"></div>
  `

  infoDiv.querySelector('.close-btn')?.addEventListener('click', () => {
    infoWindow.close()
  })

  infoWindow.setContent(infoDiv)

  setTimeout(() => {
    infoWindow.open(mapInstance.value, [props.lng, props.lat])
  }, 100)
}

watch(() => props.show, (val) => {
  if (!val) {
    // Clean up when modal closes
    if (infoWindow) {
      infoWindow.close()
      infoWindow = null
    }
    if (marker && mapInstance.value) {
      mapInstance.value.remove(marker)
      marker = null
    }
    mapInstance.value = null
    AMap = null
  }
})

onBeforeUnmount(() => {
  if (infoWindow) infoWindow.close()
})
</script>

<template>
  <NModal
    :show="show"
    preset="card"
    :title="title ?? '操控者位置'"
    :style="{ width: '800px', height: '600px' }"
    :mask-closable="true"
    @update:show="emit('update:show', $event)"
  >
    <div class="relative w-full" style="height: 480px;">
      <DsMapContainer v-if="show" @ready="handleMapReady" />
    </div>
  </NModal>
</template>

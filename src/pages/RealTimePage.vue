<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import DsMapContainer from '@/components/organisms/DsMapContainer.vue'
import DsMapOverlay from '@/components/molecules/DsMapOverlay.vue'
import DsTrendCard from '@/components/molecules/DsTrendCard.vue'
import DsAlertFeed from '@/components/organisms/DsAlertFeed.vue'
import type { AlertRecord } from '@/mock/realtime'
import { 
  droneCount, 
  alertCount, 
  droneTrendData, 
  alertTrendData, 
  timeLabels, 
  mockAlerts 
} from '@/mock/realtime'

const mapInstance = ref<any>(null)
let AMap: any = null
const markers: any[] = []
let infoWindow: any = null

function handleMapReady(map: any) {
  mapInstance.value = map
  AMap = (window as any).AMap
  renderMarkers()
}

function renderMarkers() {
  if (!mapInstance.value || !AMap) return

  // clean up existing markers
  markers.forEach(m => mapInstance.value.remove(m))
  markers.length = 0

  mockAlerts.forEach(alert => {
    if (!alert.lat || !alert.lng) return

    const colors: Record<string, string> = {
      high: '#EF4444', 
      medium: '#F59E0B', 
      low: '#3B82F6'
    }
    const color = colors[alert.level] || colors.low

    const markerContent = `
      <div class="relative flex items-center justify-center w-10 h-10 group cursor-pointer transition-transform duration-500 hover:scale-125 hover:z-50 align-middle">
        <!-- Subdued spreading wave background -->
        <div class="absolute inset-0 rounded-full opacity-30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" style="background-color: ${color};"></div>
        <!-- Inner subtle glow -->
        <div class="absolute w-4 h-4 rounded-full opacity-[0.25] animate-pulse" style="background-color: ${color}; box-shadow: 0 0 12px ${color};"></div>
        <!-- Center solid dot -->
        <div class="z-10 w-2 h-2 rounded-full border-[0.5px] border-white/70" style="background-color: ${color}; box-shadow: 0 0 4px ${color};"></div>
      </div>
    `

    const marker = new AMap.Marker({
      position: [alert.lng, alert.lat],
      content: markerContent,
      offset: new AMap.Pixel(-20, -20),
      extData: alert
    })

    marker.on('click', () => {
      handleAlertClick(alert)
    })

    markers.push(marker)
    mapInstance.value.add(marker)
  })
}

function handleAlertClick(alert: AlertRecord) {
  if (!mapInstance.value || !AMap || !alert.lat || !alert.lng) return

  // 1. Instantly close existing info window to prevent AMap from trying to calculate
  // its bounds during an active map pan animation.
  if (infoWindow) {
    infoWindow.close()
  }

  // 2. Start map pan animation
  mapInstance.value.setZoomAndCenter(16, [alert.lng, alert.lat])

  // Instantiate InfoWindow once if not created
  if (!infoWindow) {
    infoWindow = new AMap.InfoWindow({
      isCustom: true,
      autoMove: false, // Since we explicitly center the map above, autoMove creates a deadly race condition on subsequent clicks
      anchor: 'bottom-center',
      offset: new AMap.Pixel(0, -24)
    })
  }

  // Create tech-styled custom DOM popup corresponding to atomic design principles
  const infoDiv = document.createElement('div')
  infoDiv.className = 'relative bg-bg-elevated border border-border-focus rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.8)] min-w-[280px] p-4 text-text-primary backdrop-blur-xl transition-all'
  
  infoDiv.innerHTML = `
    <!-- Header -->
    <div class="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
      <h4 class="text-sm font-semibold tracking-wide flex items-center gap-2 text-white/90">
        <span class="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]"></span>
        飞手信息
      </h4>
      <button class="close-btn text-text-muted hover:text-white transition-colors cursor-pointer p-1 rounded hover:bg-white/10">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <!-- Body -->
    <div class="flex flex-col gap-2 text-xs">
      <div class="flex border-b border-white/5 pb-1">
        <span class="text-text-muted w-10 shrink-0">id:</span>
        <span class="text-text-secondary font-mono truncate max-w-[200px]" title="${alert.deviceId}">${alert.deviceId}</span>
      </div>
      <div class="flex pt-1">
        <span class="text-text-muted w-10 shrink-0">状态:</span>
        <span class="${alert.level === 'high' ? 'text-danger' : alert.level === 'medium' ? 'text-warning' : 'text-primary'} font-medium drop-shadow-sm">${alert.type}</span>
      </div>
    </div>
    <!-- Bottom Pointer -->
    <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-bg-elevated border-r border-b border-border-focus transform rotate-45 backdrop-blur-xl pointer-events-none"></div>
  `

  infoDiv.querySelector('.close-btn')?.addEventListener('click', () => {
    infoWindow.close()
  })
  
  infoWindow.setContent(infoDiv)
  
  // slightly delay opening to allow smooth map panning
  setTimeout(() => {
    infoWindow.open(mapInstance.value, [alert.lng, alert.lat])
  }, 100)
}

onBeforeUnmount(() => {
  if (infoWindow) {
    infoWindow.close()
  }
})
</script>

<template>
  <div class="relative -m-6" style="height: calc(100vh - 56px)">
    <DsMapContainer @ready="handleMapReady">
      <!-- Left Sidebar: KPIs with Trends -->
      <DsMapOverlay position="left" width="300px">
        <div class="flex flex-col h-full p-4 gap-4">
          <DsTrendCard
            class="flex-1"
            title="在飞无人机"
            tooltipText="当前在飞状态的无人机数量"
            :value="droneCount"
            suffix="架"
            :trend="12"
            trendLabel="同比"
            chartColor="#38BDF8"
            :chartData="droneTrendData"
            :xAxisData="timeLabels"
          />
          <DsTrendCard
            class="flex-1"
            title="实时预警"
            tooltipText="当前小时预警数"
            :value="alertCount"
            suffix="条"
            :trend="-5"
            trendLabel="同比"
            chartColor="#818CF8"
            :chartData="alertTrendData"
            :xAxisData="timeLabels"
          />
        </div>
      </DsMapOverlay>

      <!-- Right Sidebar: Real-time Activity Board -->
      <DsMapOverlay position="right" width="360px">
        <div class="flex flex-col h-full">
          <div class="flex-1 min-h-0">
            <DsAlertFeed title="实时活动看板" :alerts="mockAlerts" @click-alert="handleAlertClick" />
          </div>
        </div>
      </DsMapOverlay>
    </DsMapContainer>
  </div>
</template>

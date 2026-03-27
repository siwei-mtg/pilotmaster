<script setup lang="ts">
import { ref, watch, onBeforeUnmount, h, render } from 'vue'
import DsMapContainer from '@/components/organisms/DsMapContainer.vue'
import DsMapOverlay from '@/components/molecules/DsMapOverlay.vue'
import DsTrendCard from '@/components/molecules/DsTrendCard.vue'
import DsAlertFeed from '@/components/organisms/DsAlertFeed.vue'
import DsMapLayerControl from '@/components/molecules/DsMapLayerControl.vue'
import DsMapInfoWindow from '@/components/molecules/DsMapInfoWindow.vue'
import type { AlertRecord } from '@/mock/realtime'
import { mockNoFlyZones } from '@/mock/nofly-zones'
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
const noflyPolygons: any[] = []
const noflyLabels: any[] = []
let infoWindow: any = null
let infoWindowContainer: HTMLDivElement | null = null

const showNoflyLayer = ref(true)

function handleMapReady(map: any) {
  mapInstance.value = map
  AMap = (window as any).AMap
  renderMarkers()
  renderNoflyZones()
}

function renderNoflyZones() {
  if (!mapInstance.value || !AMap) return

  // Clean up existing polygons and labels
  noflyPolygons.forEach(p => mapInstance.value.remove(p))
  noflyLabels.forEach(l => mapInstance.value.remove(l))
  noflyPolygons.length = 0
  noflyLabels.length = 0

  mockNoFlyZones.forEach(zone => {
    if (!zone.path || zone.path.length === 0) return

    const polygon = new AMap.Polygon({
      path: zone.path,
      fillColor: '#F87171', // color-danger slightly lighter
      fillOpacity: 0.15,
      strokeColor: '#EF4444', 
      strokeWeight: 2,
      strokeOpacity: 0.8,
      strokeStyle: 'solid',
      zIndex: 10,
      bubble: true
    })

    if (!showNoflyLayer.value) {
      polygon.hide()
    }

    noflyPolygons.push(polygon)
    mapInstance.value.add(polygon)

    // Add label at center
    const bounds = polygon.getBounds()
    if (bounds) {
      const center = bounds.getCenter()
      const text = new AMap.Text({
        text: zone.name,
        position: center,
        anchor: 'center',
        style: {
          'background-color': 'rgba(239, 68, 68, 0.8)',
          'border-color': '#EF4444',
          'border-radius': '4px',
          'padding': '2px 6px',
          'color': '#fff',
          'font-size': '12px',
          'font-weight': '600',
          'box-shadow': '0 2px 8px rgba(0,0,0,0.4)',
          'pointer-events': 'none'
        },
        zIndex: 11
      })

      if (!showNoflyLayer.value) {
        text.hide()
      }

      noflyLabels.push(text)
      mapInstance.value.add(text)
    }
  })
}

watch(showNoflyLayer, (val: boolean) => {
  noflyPolygons.forEach(p => val ? p.show() : p.hide())
  noflyLabels.forEach(l => val ? l.show() : l.hide())
})

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
      <div class="relative flex items-center justify-center group cursor-pointer transition-all duration-300 hover:scale-125 hover:z-50">
        <!-- Spreading wave background (dimmed) -->
        <div class="absolute inset-0 w-10 h-10 -m-1 rounded-full opacity-10 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" style="background-color: ${color};"></div>
        
        <!-- Glow backing (subtle) -->
        <div class="absolute w-6 h-6 rounded-full opacity-30 blur-sm animate-pulse" style="background-color: ${color}; box-shadow: 0 0 12px 4px ${color};"></div>
        
        <!-- User-provided Map Icon (smaller) -->
        <svg viewBox="0 0 1024 1024" class="relative z-10 w-8 h-8 drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]" style="color: #fff; fill: currentColor;">
          <path d="M225.066667 620.586667c58.282667 46.805333 128.981333 78.08 206.933333 84.992A353.749333 353.749333 0 0 0 426.453333 768c0 101.12 42.24 192.256 109.781334 256H233.898667c-111.658667 0-189.909333-6.570667-233.898667-12.672 12.032-165.930667 99.456-309.162667 225.066667-390.741333z m449.834666 212.821333a385.92 385.92 0 0 1-16.768 19.072 57.472 57.472 0 0 0-60.245333 30.378667 57.045333 57.045333 0 0 0 10.496 66.56 57.6 57.6 0 0 0 66.730667 10.453333 57.173333 57.173333 0 0 0 30.549333-60.074667c6.613333-6.144 13.013333-11.733333 19.157333-16.682666a79.701333 79.701333 0 0 1-19.2 82.218666c-31.317333 31.146667-81.92 31.146667-113.28 0a79.701333 79.701333 0 0 1 0-112.853333 80.384 80.384 0 0 1 82.56-19.072z m289.066667 16.256a79.744 79.744 0 0 1 0 112.896c-31.317333 31.146667-81.92 31.146667-113.28 0a79.701333 79.701333 0 0 1-19.242667-81.834667c6.186667 4.864 12.586667 10.368 19.242667 16.469334a57.173333 57.173333 0 0 0 30.634667 59.946666 57.6 57.6 0 0 0 66.688-10.538666c17.578667-17.493333 21.845333-44.373333 10.538666-66.432a57.472 57.472 0 0 0-60.202666-30.549334 366.506667 366.506667 0 0 1-16.554667-19.114666 80.384 80.384 0 0 1 82.176 19.2z m-306.688-216.746667c2.261333 2.005333 4.352 4.181333 6.314667 6.485334 16.597333 17.834667 72.576 75.306667 106.88 76.672 2.218667 0.085333 11.221333 0.128 13.866666-0.085334 33.450667-2.56 86.442667-56.106667 104.32-75.178666 1.322667-1.408 4.608-5.12 5.290667-5.802667l0.298667-0.298667a3.413333 3.413333 0 0 1 0.597333-0.554666c7.978667-7.125333 19.456-7.68 26.154667-0.981334 6.272 6.272 6.186667 16.725333 0.256 24.533334a69.290667 69.290667 0 0 1-6.528 6.314666c-18.133333 16.725333-77.141333 73.813333-76.970667 107.818667v9.088c-1.194667 33.877333 58.624 91.733333 76.970667 108.672l1.408 1.28c1.792 1.578667 3.498667 3.242667 5.12 4.992 5.930667 7.850667 6.016 18.304-0.256 24.533333-6.698667 6.698667-18.176 6.144-26.154667-0.981333l-0.298667-0.256-0.64-0.597333a119.338667 119.338667 0 0 1-2.389333-2.602667l-2.858667-3.157333c-17.792-18.944-70.186667-71.978667-103.68-75.093334a154.965333 154.965333 0 0 0-16.981333 0c-34.474667 3.882667-88.192 59.093333-104.405333 76.501334l-1.28 1.493333a69.12 69.12 0 0 1-5.034667 5.034667c-7.850667 5.973333-18.346667 6.016-24.661333-0.256-6.698667-6.656-6.144-18.090667 1.024-26.026667a3.328 3.328 0 0 1 0.554666-0.597333l0.298667-0.341334c0.682667-0.682667 4.394667-3.925333 5.802667-5.248 18.218667-16.938667 67.541333-65.322667 74.666666-98.730666a117.76 117.76 0 0 0 0.469334-22.869334c-4.992-33.450667-56.448-83.925333-75.093334-101.333333l-5.12-4.565333-0.682666-0.682667-0.341334-0.341333a3.584 3.584 0 0 1-0.512-0.597334c-7.210667-7.936-7.722667-19.370667-1.024-26.026666 6.272-6.272 16.768-6.144 24.618667-0.256z m307.968-39.168a79.701333 79.701333 0 0 1 0 112.938667 80.384 80.384 0 0 1-82.346667 19.157333c4.778667-5.973333 10.325333-12.288 16.64-19.157333a57.472 57.472 0 0 0 60.202667-30.464 57.045333 57.045333 0 0 0-10.538667-66.517333 57.6 57.6 0 0 0-66.730666-10.453334 57.173333 57.173333 0 0 0-30.549334 59.989334 365.653333 365.653333 0 0 1-19.2 16.64 79.701333 79.701333 0 0 1 19.2-82.090667c31.36-31.146667 81.92-31.146667 113.322667 0z m-263.552-5.461333c21.76 21.674667 29.098667 53.845333 18.944 82.773333a446.037333 446.037333 0 0 1-18.986667-16.981333 57.173333 57.173333 0 0 0-30.378666-60.245333 57.6 57.6 0 0 0-66.858667 10.410666 57.045333 57.045333 0 0 0-10.453333 66.645334c11.434667 22.144 35.84 34.346667 60.416 30.293333 6.186667 6.485333 11.946667 12.842667 17.066666 18.944a80.426667 80.426667 0 0 1-83.029333-18.901333 79.744 79.744 0 0 1 0-112.938667c31.317333-31.146667 81.92-31.146667 113.28 0zM464.554667 0c172.16 0 312.277333 142.72 312.277333 318.08 0 30.848-4.352 60.714667-12.458667 88.96l-3.712 11.946667-1.92 0.085333c-138.837333 4.224-256.938667 92.586667-306.816 216.746667-166.4-6.741333-299.605333-146.773333-299.605333-317.738667C152.32 142.72 292.437333 0 464.554667 0z" fill="#ffffff"></path>
        </svg>
      </div>
    `

    const marker = new AMap.Marker({
      position: [alert.lng, alert.lat],
      content: markerContent,
      offset: new AMap.Pixel(-16, -16),
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

  // Open info window directly without pan/zoom animation

  // Instantiate InfoWindow once if not created
  if (!infoWindow) {
    infoWindow = new AMap.InfoWindow({
      isCustom: true,
      autoMove: false, // Since we explicitly center the map above, autoMove creates a deadly race condition on subsequent clicks
      anchor: 'bottom-center',
      offset: new AMap.Pixel(0, -24)
    })
  }

  // Create tech-styled custom DOM popup using DsMapInfoWindow molecule
  // Clean up previous vnode if exists
  if (infoWindowContainer) {
    render(null, infoWindowContainer)
  }
  
  infoWindowContainer = document.createElement('div')
  const vnode = h(DsMapInfoWindow, {
    deviceId: alert.deviceId,
    droneSn: alert.droneSn,
    confidence: alert.confidence,
    type: alert.type,
    level: alert.level,
    onClose: () => {
      infoWindow.close()
    },
    onNotifyPilot: () => {
      console.log('通知飞手:', alert.droneSn)
    },
    onNotifyPolice: () => {
      console.log('通知警员:', alert.droneSn)
    }
  })
  
  // Render the vnode into the div
  render(vnode, infoWindowContainer)
  
  infoWindow.setContent(infoWindowContainer)
  
  infoWindow.open(mapInstance.value, [alert.lng, alert.lat])
}


onBeforeUnmount(() => {
  if (infoWindow) {
    infoWindow.close()
  }
  if (infoWindowContainer) {
    render(null, infoWindowContainer)
    infoWindowContainer = null
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

      <!-- Layer Control HUD -->
      <div class="absolute top-4 right-[380px] z-10 animate-in fade-in slide-in-from-right-4 duration-500">
        <DsMapLayerControl v-model:show-nofly="showNoflyLayer" />
      </div>
    </DsMapContainer>
  </div>
</template>

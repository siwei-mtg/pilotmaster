<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { NModal, NAlert, NButton } from 'naive-ui'
import DsMapContainer from './DsMapContainer.vue'

interface Props {
  show: boolean
  initialLocation?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:show', 'confirm'])

const selectedLocation = ref(props.initialLocation || '120.15507,30.27408')
const mapInstance = ref<any>(null)
let AMap: any = null
let marker: any = null

function handleMapReady(map: any) {
  mapInstance.value = map
  AMap = (window as any).AMap
  
  // Set initial marker if location exists
  if (selectedLocation.value && selectedLocation.value.includes(',')) {
    const [lng, lat] = selectedLocation.value.split(',').map(Number)
    if (!isNaN(lng) && !isNaN(lat)) {
      updateMarker(lng, lat)
      map.setCenter([lng, lat])
    }
  }

  // Add click listener
  map.on('click', (e: any) => {
    const lng = e.lnglat.getLng()
    const lat = e.lnglat.getLat()
    selectedLocation.value = `${lng.toFixed(6)},${lat.toFixed(6)}`
    updateMarker(lng, lat)
  })
}

function updateMarker(lng: number, lat: number) {
  if (!mapInstance.value || !AMap) return

  if (marker) {
    marker.setPosition([lng, lat])
  } else {
    marker = new AMap.Marker({
      position: [lng, lat],
      icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
      offset: new AMap.Pixel(-13, -30)
    })
    mapInstance.value.add(marker)
  }
}

function handleConfirm() {
  emit('confirm', selectedLocation.value)
  emit('update:show', false)
}

function handleCancel() {
  emit('update:show', false)
}

watch(() => props.show, (val) => {
  if (!val) {
    if (marker && mapInstance.value) {
      mapInstance.value.remove(marker)
      marker = null
    }
    mapInstance.value = null
  }
})

onBeforeUnmount(() => {
  if (marker && mapInstance.value) {
    mapInstance.value.remove(marker)
  }
})
</script>

<template>
  <n-modal
    :show="show"
    preset="card"
    title="选择中心点位置"
    class="ds-location-picker-modal"
    style="width: 800px"
    @update:show="emit('update:show', $event)"
  >
    <div class="flex flex-col gap-4">
      <n-alert type="info" :bordered="false">
        请点击地图选择中心点位置
      </n-alert>

      <div class="relative overflow-hidden rounded-lg bg-slate-900 border border-slate-700" style="height: 400px">
        <DsMapContainer v-if="show" @ready="handleMapReady" />
      </div>

      <div class="bg-slate-100 p-3 rounded text-slate-600 text-sm">
        已选择位置：{{ selectedLocation }}
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3">
        <n-button @click="handleCancel">取消</n-button>
        <n-button type="primary" secondary @click="handleConfirm">确定</n-button>
      </div>
    </template>
  </n-modal>
</template>

<style scoped>
.ds-location-picker-modal :deep(.n-card-header__title) {
  font-size: 18px;
  font-weight: 600;
}
</style>

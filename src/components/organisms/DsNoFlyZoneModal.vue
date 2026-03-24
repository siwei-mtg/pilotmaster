<script setup lang="ts">
import { ref, h, render, watch } from 'vue'
import { NModal, NInput, NSelect, NSwitch, NButton } from 'naive-ui'
import DsMapContainer from '@/components/organisms/DsMapContainer.vue'
import DsMapHint from '@/components/atoms/DsMapHint.vue'
import { noFlyZoneStyle } from '@/design-system/theme/map-dark-style'

const props = defineProps<{
  show: boolean
  initialData?: {
    name: string
    type: string
    enabled: boolean
    path: number[][]
  } | null
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  confirm: [data: { name: string; type: string; enabled: boolean; path: number[][] }]
}>()

// ========== Form State ==========
const formName = ref('')
const formType = ref<string | null>(null)
const formEnabled = ref(true)

const typeOptions = [
  { label: '交通枢纽', value: '交通枢纽' },
  { label: '政府机构', value: '政府机构' },
  { label: '活动管控', value: '活动管控' },
  { label: '学校', value: '学校' },
  { label: '其他', value: '其他' },
]

// ========== Map & Polygon Drawing ==========
// State machine: idle → drawing → pending_confirm → confirmed ↔ editing
let AMap: any = null
let mapInstance: any = null
let polygonEditor: any = null
let polygon: any = null
let confirmMarker: any = null

// Manual drawing state
let drawPoints: number[][] = []
let vertexMarkers: any[] = []
let drawingPolyline: any = null
let hintMarker: any = null
let hintContainer: HTMLElement | null = null

// Event handler refs (for removal)
let onDrawClick: ((e: any) => void) | null = null
let onDrawRightClick: ((e: any) => void) | null = null
let onDrawMouseMove: ((e: any) => void) | null = null

const drawMode = ref<'idle' | 'drawing' | 'pending_confirm' | 'confirmed' | 'editing'>('idle')
const polygonPath = ref<number[][]>([])

function handleMapReady(map: any) {
  mapInstance = map
  AMap = (window as any).AMap

  AMap.plugin(['AMap.PolygonEditor'], () => {
    // Ready for editing
  })

  // If editing an existing zone, render the pre-existing polygon
  if (props.initialData?.path && props.initialData.path.length >= 3) {
    const path = props.initialData.path
    polygonPath.value = [...path]

    polygon = new AMap.Polygon({
      path: path.map((p: number[]) => new AMap.LngLat(p[0], p[1])),
      strokeColor: noFlyZoneStyle.strokeColor,
      strokeWeight: 2,
      strokeOpacity: 0.9,
      fillColor: noFlyZoneStyle.strokeColor,
      fillOpacity: 0.15,
    })
    mapInstance.add(polygon)

    // Fit map bounds to polygon
    mapInstance.setFitView([polygon], false, [60, 60, 60, 60])

    drawMode.value = 'confirmed'
  }
}

// Pre-fill form when modal opens with initialData
watch(() => props.show, (visible) => {
  if (visible && props.initialData) {
    formName.value = props.initialData.name
    formType.value = props.initialData.type
    formEnabled.value = props.initialData.enabled
  }
})

// ========== Vertex Marker Helper ==========
const VERTEX_HTML = '<div style="width:12px;height:12px;border-radius:50%;background:#38BDF8;border:2px solid white;box-shadow:0 0 6px rgba(56,189,248,0.6);pointer-events:none;"></div>'

function createVertexMarker(lnglat: number[]) {
  const m = new AMap.Marker({
    position: lnglat,
    content: VERTEX_HTML,
    offset: new AMap.Pixel(-6, -6),
    zIndex: 150,
  })
  mapInstance.add(m)
  vertexMarkers.push(m)
  return m
}

function removeVertexMarkers() {
  for (const m of vertexMarkers) {
    mapInstance?.remove(m)
  }
  vertexMarkers = []
}

// ========== Hint Marker Helper ==========
function createHintMarker(initialText: string) {
  hintContainer = document.createElement('div')
  const vnode = h(DsMapHint, { text: initialText })
  render(vnode, hintContainer)

  hintMarker = new AMap.Marker({
    position: mapInstance.getCenter(),
    content: hintContainer,
    offset: new AMap.Pixel(16, -14),
    zIndex: 999,
  })
  mapInstance.add(hintMarker)
}

function updateHintText(text: string) {
  if (!hintContainer) return
  render(h(DsMapHint, { text }), hintContainer)
}

function removeHintMarker() {
  if (hintContainer) {
    render(null, hintContainer) // unmount Vue component
    hintContainer = null
  }
  if (hintMarker && mapInstance) {
    mapInstance.remove(hintMarker)
    hintMarker = null
  }
}

// ========== Manual Drawing ==========
function startDraw() {
  if (!mapInstance || !AMap) return

  fullCleanup()
  drawMode.value = 'drawing'
  drawPoints = []

  // Create polyline for real-time preview
  drawingPolyline = new AMap.Polyline({
    path: [],
    strokeColor: noFlyZoneStyle.strokeColor,
    strokeWeight: 2,
    strokeOpacity: 0.9,
    strokeStyle: 'solid',
  })
  mapInstance.add(drawingPolyline)

  // Create hint marker
  createHintMarker('单击绘制下一个点')

  // Bind events
  onDrawClick = (e: any) => {
    const lnglat = [e.lnglat.lng, e.lnglat.lat]
    drawPoints.push(lnglat)

    // Add vertex marker
    createVertexMarker(lnglat)

    // Update polyline path (close the loop back to first point)
    const closedPath = [...drawPoints, ...(drawPoints.length >= 2 ? [drawPoints[0]] : [])]
    drawingPolyline.setPath(closedPath.map((p: number[]) => new AMap.LngLat(p[0], p[1])))

    // Update hint text
    if (drawPoints.length >= 3) {
      updateHintText('单击绘制下一个点，右键完成绘制')
    } else {
      updateHintText('单击绘制下一个点')
    }
  }

  onDrawRightClick = () => {
    if (drawPoints.length < 3) return // Need at least 3 points

    // Unbind events
    unbindDrawEvents()

    // Remove polyline & hint
    if (drawingPolyline) {
      mapInstance.remove(drawingPolyline)
      drawingPolyline = null
    }
    removeHintMarker()

    // Create filled polygon
    polygonPath.value = [...drawPoints]

    polygon = new AMap.Polygon({
      path: drawPoints.map((p: number[]) => new AMap.LngLat(p[0], p[1])),
      strokeColor: noFlyZoneStyle.strokeColor,
      strokeWeight: 2,
      strokeOpacity: 0.9,
      fillColor: noFlyZoneStyle.strokeColor,
      fillOpacity: 0.15,
    })
    mapInstance.add(polygon)

    // Transition to pending_confirm with ✓ ✗ overlay
    drawMode.value = 'pending_confirm'
    showConfirmOverlay(drawPoints)
  }

  onDrawMouseMove = (e: any) => {
    if (hintMarker) {
      hintMarker.setPosition([e.lnglat.lng, e.lnglat.lat])
    }
  }

  mapInstance.on('click', onDrawClick)
  mapInstance.on('rightclick', onDrawRightClick)
  mapInstance.on('mousemove', onDrawMouseMove)
}

function unbindDrawEvents() {
  if (onDrawClick) { mapInstance?.off('click', onDrawClick); onDrawClick = null }
  if (onDrawRightClick) { mapInstance?.off('rightclick', onDrawRightClick); onDrawRightClick = null }
  if (onDrawMouseMove) { mapInstance?.off('mousemove', onDrawMouseMove); onDrawMouseMove = null }
}

// ========== Confirm/Cancel Overlay ==========
function showConfirmOverlay(path: number[][]) {
  if (!AMap || !mapInstance) return

  let maxLng = -Infinity
  let minLat = Infinity
  for (const [lng, lat] of path) {
    if (lng > maxLng) maxLng = lng
    if (lat < minLat) minLat = lat
  }

  const content = document.createElement('div')
  content.style.cssText = 'display:flex;gap:6px;pointer-events:auto;'

  const confirmBtn = document.createElement('div')
  confirmBtn.style.cssText = 'width:28px;height:28px;border-radius:50%;background:#22C55E;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.4);transition:transform 0.15s;'
  confirmBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
  confirmBtn.onmouseenter = () => { confirmBtn.style.transform = 'scale(1.15)' }
  confirmBtn.onmouseleave = () => { confirmBtn.style.transform = 'scale(1)' }
  confirmBtn.onclick = (e) => { e.stopPropagation(); confirmDraw() }

  const cancelBtn = document.createElement('div')
  cancelBtn.style.cssText = 'width:28px;height:28px;border-radius:50%;background:#EF4444;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.4);transition:transform 0.15s;'
  cancelBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
  cancelBtn.onmouseenter = () => { cancelBtn.style.transform = 'scale(1.15)' }
  cancelBtn.onmouseleave = () => { cancelBtn.style.transform = 'scale(1)' }
  cancelBtn.onclick = (e) => { e.stopPropagation(); cancelDraw() }

  content.appendChild(confirmBtn)
  content.appendChild(cancelBtn)

  confirmMarker = new AMap.Marker({
    position: [maxLng, minLat],
    content: content,
    offset: new AMap.Pixel(4, 4),
    zIndex: 200,
  })

  mapInstance.add(confirmMarker)
}

function removeConfirmOverlay() {
  if (confirmMarker && mapInstance) {
    mapInstance.remove(confirmMarker)
    confirmMarker = null
  }
}

function confirmDraw() {
  removeConfirmOverlay()
  removeVertexMarkers()
  drawMode.value = 'confirmed'
}

function cancelDraw() {
  removeConfirmOverlay()
  removeVertexMarkers()
  if (polygon && mapInstance) {
    mapInstance.remove(polygon)
    polygon = null
  }
  polygonPath.value = []
  drawMode.value = 'idle'
}

// ========== Edit ==========
function startEdit() {
  if (!polygon || !AMap || !mapInstance) return

  drawMode.value = 'editing'
  polygonEditor = new AMap.PolygonEditor(mapInstance, polygon)
  polygonEditor.open()
}

function stopEdit() {
  if (polygonEditor) {
    polygonEditor.close()
    polygonEditor = null
  }
  if (polygon) {
    const path = polygon.getPath().map((p: any) => [p.lng, p.lat])
    polygonPath.value = path
  }
  drawMode.value = 'confirmed'
}

// ========== Clear ==========
function fullCleanup() {
  unbindDrawEvents()
  removeHintMarker()
  removeVertexMarkers()
  removeConfirmOverlay()

  if (drawingPolyline && mapInstance) {
    mapInstance.remove(drawingPolyline)
    drawingPolyline = null
  }
  if (polygonEditor) {
    polygonEditor.close()
    polygonEditor = null
  }
  if (polygon && mapInstance) {
    mapInstance.remove(polygon)
    polygon = null
  }

  drawPoints = []
  polygonPath.value = []
  drawMode.value = 'idle'
}

function clearPolygon() {
  fullCleanup()
}

// ========== Modal actions ==========
function handleConfirm() {
  if (drawMode.value === 'editing') {
    stopEdit()
  }
  emit('confirm', {
    name: formName.value,
    type: formType.value ?? '',
    enabled: formEnabled.value,
    path: polygonPath.value,
  })
  handleClose()
}

function handleClose() {
  fullCleanup()
  formName.value = ''
  formType.value = null
  formEnabled.value = true
  mapInstance = null
  AMap = null
  emit('update:show', false)
}
</script>

<template>
  <NModal
    :show="show"
    preset="card"
    title="禁飞区标绘"
    :style="{ width: '720px' }"
    :mask-closable="false"
    :closable="true"
    @update:show="handleClose"
  >
    <div class="flex flex-col gap-5">
      <!-- 禁飞区名称 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">
          <span class="text-danger mr-0.5">*</span>禁飞区名称
        </label>
        <NInput v-model:value="formName" placeholder="请输入禁飞区名称" />
      </div>

      <!-- 类型 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">
          <span class="text-danger mr-0.5">*</span>类型
        </label>
        <NSelect v-model:value="formType" :options="typeOptions" placeholder="请选择类型" />
      </div>

      <!-- 启用状态 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">启用状态</label>
        <NSwitch v-model:value="formEnabled" />
      </div>

      <!-- 禁飞区地图 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">
          <span class="text-danger mr-0.5">*</span>禁飞区
        </label>
        <div class="relative w-full rounded-lg overflow-hidden border border-border-default" style="height: 380px;">
          <DsMapContainer v-if="show" @ready="handleMapReady" />
        </div>

        <!-- Drawing toolbar -->
        <div class="flex items-center gap-3 mt-1">
          <NButton
            :type="drawMode === 'drawing' ? 'primary' : 'default'"
            size="small"
            :disabled="drawMode === 'drawing' || drawMode === 'pending_confirm' || drawMode === 'editing'"
            @click="startDraw"
          >
            绘制多边形
          </NButton>
          <NButton
            size="small"
            :type="drawMode === 'editing' ? 'primary' : 'default'"
            :disabled="drawMode !== 'confirmed' && drawMode !== 'editing'"
            @click="drawMode === 'editing' ? stopEdit() : startEdit()"
          >
            {{ drawMode === 'editing' ? '完成编辑' : '编辑多边形' }}
          </NButton>
          <NButton
            size="small"
            :disabled="drawMode !== 'confirmed'"
            @click="clearPolygon"
          >
            清空坐标
          </NButton>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <template #footer>
      <div class="flex justify-end gap-3">
        <NButton @click="handleClose">取消</NButton>
        <NButton
          type="primary"
          :disabled="!formName || !formType || drawMode !== 'confirmed'"
          @click="handleConfirm"
        >
          确定
        </NButton>
      </div>
    </template>
  </NModal>
</template>

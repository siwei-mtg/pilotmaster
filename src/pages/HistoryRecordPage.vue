<script setup lang="ts">
import { ref, h } from 'vue'
import { useMessage } from 'naive-ui'
import DsGlassTabBar from '@/components/molecules/DsGlassTabBar.vue'
import type { TabItem } from '@/components/molecules/DsGlassTabBar.vue'
import PageTableView from '@/components/templates/PageTableView.vue'
import DsToken from '@/components/atoms/DsToken.vue'
import DsDeviceId from '@/components/atoms/DsDeviceId.vue'
import DsIcon from '@/components/atoms/DsIcon.vue'
import DsLocationMapModal from '@/components/organisms/DsLocationMapModal.vue'

const activeTab = ref('flight')
const tabs: TabItem[] = [
  { label: '起降记录', value: 'flight' },
  { label: '预警记录', value: 'alert' },
]
const showMapModal = ref(false)
const selectedFlight = ref<{ pilotLocation: string; lat: number; lng: number } | null>(null)
const message = useMessage()

function handleLocationClick(row: any) {
  selectedFlight.value = { pilotLocation: row.pilotLocation, lat: row.lat, lng: row.lng }
  showMapModal.value = true
}

function generateRandomPhone() {
  const prefixes = ['138', '139', '135', '137', '188', '187', '131', '132', '156', '130']
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const suffix = Math.floor(Math.random() * 90000000 + 10000000).toString()
  return prefix + suffix
}

function handleTrace(row: any) {
  if (row.confidence === 'unknown') {
    message.info('正在积累数据，暂不支持溯源')
    return
  }
  
  const phone = generateRandomPhone()
  row.pilotTrace = phone
  row.needsUpdate = false
  message.success(`成功溯源飞手：${phone}`)
}

function handleUpdateTrace(row: any) {
  if (row.confidence === 'unknown') {
    message.info('正在积累数据，暂不支持溯源')
    return
  }
  
  // Simulate data backfill with a new phone number
  const newPhone = generateRandomPhone()
  row.pilotTrace = newPhone
  row.needsUpdate = false
  message.success(`成功溯源飞手：${newPhone}`)
}

// ========== 起降记录 ==========
const flightFilters = [
  { key: 'deviceId', label: '设备ID', type: 'input' as const, placeholder: '请输入设备ID', width: '180px' },
  { key: 'droneSn', label: '无人机SN', type: 'input' as const, placeholder: '请输入无人机SN', width: '180px' },
  { key: 'confidence', label: '人机关联置信度', type: 'select' as const, placeholder: '请选择人机关联置信度', 
    options: [
      { label: '高', value: 'high' },
      { label: '低', value: 'low' },
      { label: '--', value: 'unknown' },
    ], width: '160px' 
  },
  { key: 'pilotTrace', label: '飞手溯源', type: 'input' as const, placeholder: '请输入手机号', width: '180px' },
  { key: 'droneType', label: '无人机类型', type: 'select' as const, placeholder: '请选择无人机类型', 
    options: [
      { label: 'app控', value: 'app控' },
      { label: '屏控', value: '屏控' },
    ], width: '160px' 
  },
  { key: 'takeoffDateRange', label: '起飞时间', type: 'date-range' as const, width: '280px' },
  { key: 'landingDateRange', label: '降落时间', type: 'date-range' as const, width: '280px' },
  {
    key: 'duration',
    label: '飞行时长',
    type: 'select' as const,
    placeholder: '请选择飞行时长',
    options: [
      { label: '0-5分钟', value: '0-5' },
      { label: '5-10分钟', value: '5-10' },
      { label: '10-30分钟', value: '10-30' },
      { label: '30分钟以上', value: '30+' },
    ],
    width: '160px',
  },
  {
    key: 'status',
    label: '飞行状态',
    type: 'select' as const,
    placeholder: '请选择飞行状态',
    options: [
      { label: '在飞', value: 'flying' },
      { label: '已降落', value: 'landed' },
    ],
    width: '160px',
  },
  { key: 'customLocation', label: '自定义位置', type: 'input' as const, placeholder: '自定义位置', width: '180px' },
]

const commonTextClass = 'font-mono text-base text-text-primary'

const flightColumns = [
  {
    title: '序号',
    key: 'index',
    width: 60,
    align: 'center' as const,
    render: (_row: any, index: number) => h('span', { class: commonTextClass }, index + 1),
  },
  {
    title: '设备ID',
    key: 'deviceId',
    width: 220,
    align: 'center' as const,
    render: (row: any) => h(DsDeviceId, { id: row.deviceId }),
  },
  { 
    title: '无人机SN', 
    key: 'droneSn', 
    width: 180,
    align: 'center' as const,
    render: (row: any) => h('span', { class: commonTextClass }, row.droneSn) 
  },
  { 
    title: '人机关联置信度', 
    key: 'confidence', 
    width: 100,
    align: 'center' as const,
    render: (row: any) => h(DsToken, {
      label: row.confidence === 'high' ? '高' : row.confidence === 'low' ? '低' : '--',
      type: row.confidence === 'high' ? 'success' : row.confidence === 'low' ? 'warning' : 'default',
    })
  },
  { 
    title: '飞手溯源', 
    key: 'pilotTrace', 
    width: 200,
    align: 'center' as const,
    render: (row: any) => {
      const hasPhone = !!row.pilotTrace
      
      if (hasPhone) {
        // 有电话号码的情况
        return h('div', { class: 'flex items-center justify-center gap-2' }, [
          h('span', { class: commonTextClass }, row.pilotTrace),
          row.needsUpdate ? h('span', { 
            class: 'text-sm cursor-pointer border border-text-primary text-text-primary px-2 py-0.5 rounded hover:bg-white/10 transition-colors',
            onClick: (e: Event) => {
              e.stopPropagation()
              handleUpdateTrace(row)
            }
          }, '去更新') : null
        ])
      } else {
        // 没有电话号码的情况 -> "去溯源"
        const confidenceColorClass = row.confidence === 'high' 
          ? 'text-success border-success hover:bg-success/10' 
          : row.confidence === 'low' 
            ? 'text-warning border-warning hover:bg-warning/10' 
            : 'text-text-muted border-text-muted hover:bg-white/5'

        return h('div', { class: 'flex items-center justify-center' }, [
          h('span', { 
            class: `text-sm cursor-pointer border px-2 py-0.5 rounded transition-colors ${confidenceColorClass}`,
            onClick: (e: Event) => {
              e.stopPropagation()
              handleTrace(row)
            }
          }, '去溯源')
        ])
      }
    }
  },
  { 
    title: '无人机类型', 
    key: 'droneType', 
    width: 120,
    align: 'center' as const,
    render: (row: any) => h('span', { class: commonTextClass }, row.droneType) 
  },
  { 
    title: '起飞时间', 
    key: 'takeoffTime', 
    width: 170,
    align: 'center' as const,
    render: (row: any) => h('span', { class: commonTextClass }, row.takeoffTime) 
  },
  { 
    title: '降落时间', 
    key: 'landingTime', 
    width: 170,
    align: 'center' as const,
    render: (row: any) => h('span', { class: commonTextClass }, row.landingTime) 
  },
  { 
    title: '飞行时长', 
    key: 'duration', 
    width: 80,
    align: 'center' as const,
    render: (row: any) => h('span', { class: commonTextClass }, row.duration) 
  },
  {
    title: '操控者位置',
    key: 'pilotLocation',
    width: 250,
    ellipsis: { tooltip: true },
    align: 'center' as const,
    render: (row: any) => h('div', {
      class: 'flex items-center justify-center gap-1 cursor-pointer',
      onClick: () => handleLocationClick(row),
    }, [
      h(DsIcon, { icon: 'lucide:map-pin', size: 16, class: 'text-primary shrink-0' }),
      h('span', { class: 'text-primary' }, row.pilotLocation),
    ]),
  },
  { title: '与自定义位置的距离(米)', key: 'distanceToCustomLocation', width: 120, align: 'center' as const },
  {
    title: '状态',
    key: 'status',
    width: 90,
    align: 'center' as const,
    render: (row: any) => h(DsToken, {
      label: row.status === 'flying' ? '在飞' : '已降落',
      type: row.status === 'flying' ? 'success' : 'info',
    }),
  },
]

const flightData = ref([
  { deviceId: 'BBB21E6D0FECFC6525B102BAA59CAB7B', droneSn: 'SN-0021-X99', confidence: 'high', pilotTrace: '13812348888', newPilotTrace: '13812345678', needsUpdate: false, droneType: 'app控', takeoffTime: '2026-03-23 18:55:34', landingTime: '', duration: '2分', status: 'flying', pilotLocation: '台州市仙居县福应街道', distanceToCustomLocation: '', lat: 28.8497, lng: 120.7286 },
  { deviceId: '2CFC96E6460C4CC89702AE17AB1ECB71', droneSn: 'SN-0021-X10', confidence: 'unknown', pilotTrace: '', newPilotTrace: '', needsUpdate: true, droneType: '屏控', takeoffTime: '2026-03-23 18:55:12', landingTime: '', duration: '0分', status: 'flying', pilotLocation: '金华市永康市江南街道', distanceToCustomLocation: '', lat: 28.8883, lng: 120.0360 },
  { deviceId: 'DE905EAB93F5020F6C885E8FE5DA6908', droneSn: 'SN-0021-X11', confidence: 'high', pilotTrace: '13655667788', newPilotTrace: '13655667788', needsUpdate: true, droneType: 'app控', takeoffTime: '2026-03-23 18:55:02', landingTime: '2026-03-23 18:57:27', duration: '2分', status: 'landed', pilotLocation: '杭州市萧山区北干街道', distanceToCustomLocation: '', lat: 30.1836, lng: 120.2644 },
  { deviceId: '899256F0756799CD33EFAC679D804FEB', droneSn: 'SN-0021-X12', confidence: 'low', pilotTrace: '13188889988', newPilotTrace: '13188889999', needsUpdate: true, droneType: '屏控', takeoffTime: '2026-03-23 18:54:55', landingTime: '', duration: '0分', status: 'flying', pilotLocation: '温州市瓯海区新桥街道', distanceToCustomLocation: '', lat: 27.9630, lng: 120.6147 },
  { deviceId: '1DA70D6F3AD31CDA059A5F4533052C99', droneSn: 'SN-0021-X13', confidence: 'high', pilotTrace: '', newPilotTrace: '', needsUpdate: true, droneType: 'app控', takeoffTime: '2026-03-23 18:54:53', landingTime: '', duration: '0分', status: 'flying', pilotLocation: '金华市义乌市稠城街道', distanceToCustomLocation: '', lat: 29.3069, lng: 120.0750 },
  { deviceId: '7628DEF74141658l0E431F1B0920CB87', droneSn: 'SN-0021-X14', confidence: 'low', pilotTrace: '', newPilotTrace: '', needsUpdate: true, droneType: '屏控', takeoffTime: '2026-03-23 18:54:22', landingTime: '2026-03-23 18:56:47', duration: '2分', status: 'landed', pilotLocation: '湖州市南浔区双林镇', distanceToCustomLocation: '', lat: 30.8904, lng: 120.4185 },
  { deviceId: '6505420C31F7DD1DFEFF70C3B34F67A8', droneSn: 'SN-0021-X15', confidence: 'high', pilotTrace: '13611220099', newPilotTrace: '13600991122', needsUpdate: false, droneType: 'app控', takeoffTime: '2026-03-23 18:54:07', landingTime: '', duration: '0分', status: 'flying', pilotLocation: '温州市平阳县鳌江镇', distanceToCustomLocation: '', lat: 27.5878, lng: 120.5064 },
  { deviceId: '002CC06220EF4F97AAA0AD0D771235E5', droneSn: 'SN-0021-X16', confidence: 'high', pilotTrace: '13812340011', newPilotTrace: '13800112233', needsUpdate: false, droneType: 'app控', takeoffTime: '2026-03-23 18:54:06', landingTime: '', duration: '0分', status: 'flying', pilotLocation: '宁波市余姚市阳明街道', distanceToCustomLocation: '', lat: 29.3054, lng: 121.6264 },
])

// ========== 预警记录 ==========
const alertFilters = [
  { key: 'deviceId', label: '设备ID', type: 'input' as const, placeholder: '请输入设备id', width: '180px' },
  { key: 'droneSn', label: '无人机SN', type: 'input' as const, placeholder: '请输入无人机SN', width: '180px' },
  { key: 'droneType', label: '无人机类型', type: 'select' as const, placeholder: '请选择无人机类型', 
    options: [
      { label: 'app控', value: 'app控' },
      { label: '屏控', value: '屏控' },
    ], width: '160px' 
  },
  { key: 'alertDateRange', label: '预警时间', type: 'date-range' as const, width: '280px' },
  {
    key: 'zoneType',
    label: '禁飞区类型',
    type: 'select' as const,
    placeholder: '请选择禁飞区类型',
    options: [
      { label: '其他', value: 'other' },
      { label: '政府机构', value: 'government' },
      { label: '军事区域', value: 'military' },
      { label: '机场', value: 'airport' },
    ],
    width: '160px',
  },
  {
    key: 'alertType',
    label: '预警类型',
    type: 'select' as const,
    placeholder: '请选择预警类型',
    options: [
      { label: '闯禁', value: 'intrusion' },
      { label: '起飞', value: 'takeoff' },
    ],
    width: '160px',
  },
  {
    key: 'level',
    label: '等级',
    type: 'select' as const,
    placeholder: '请选择等级',
    options: [
      { label: '高', value: 'high' },
      { label: '中', value: 'medium' },
      { label: '低', value: 'low' },
    ],
    width: '120px',
  },
]

const alertColumns = [
  {
    title: '序号',
    key: 'index',
    width: 60,
    align: 'center' as const,
    render: (_row: any, index: number) => h('span', {}, index + 1),
  },
  {
    title: '设备ID',
    key: 'deviceId',
    width: 280,
    align: 'center' as const,
    render: (row: any) => h(DsDeviceId, { id: row.deviceId }),
  },
  { 
    title: '无人机SN', 
    key: 'droneSn', 
    width: 180,
    align: 'center' as const,
    render: (row: any) => h('span', { class: commonTextClass }, row.droneSn) 
  },
  { 
    title: '无人机类型', 
    key: 'droneType', 
    width: 120,
    align: 'center' as const,
    render: (row: any) => h('span', { class: commonTextClass }, row.droneType) 
  },
  { title: '预警时间', key: 'alertTime', width: 170, align: 'center' as const },
  { title: '禁飞区类型', key: 'zoneType', width: 100, align: 'center' as const },
  { title: '预警类型', key: 'alertType', width: 90, align: 'center' as const },
  {
    title: '操控者位置',
    key: 'pilotLocation',
    width: 250,
    ellipsis: { tooltip: true },
    align: 'center' as const,
    render: (row: any) => h('div', {
      class: 'flex items-center justify-center gap-1 cursor-pointer',
      onClick: () => handleLocationClick(row),
    }, [
      h(DsIcon, { icon: 'lucide:map-pin', size: 16, class: 'text-primary shrink-0' }),
      h('span', { class: 'text-primary' }, row.pilotLocation),
    ]),
  },
  {
    title: '等级',
    key: 'level',
    width: 70,
    align: 'center' as const,
    render: (row: any) => h(DsToken, {
      label: row.level === 'high' ? '高' : row.level === 'medium' ? '中' : '低',
      type: row.level === 'high' ? 'danger' : row.level === 'medium' ? 'warning' : 'info',
    }),
  },
]

const alertData = ref([
  { deviceId: '1E386EE3DEF49892794C7F7B630BD092', droneSn: 'SN-A991', droneType: 'app控', alertTime: '2026-03-23 19:14:15', zoneType: '其他', alertType: '闯禁', level: 'high', pilotLocation: '宁波市宁海县力洋镇', lat: 29.2455, lng: 121.5637 },
  { deviceId: '7E01AC19879726F15D81AC829E61DCA2', droneSn: 'SN-A992', droneType: '屏控', alertTime: '2026-03-23 19:14:11', zoneType: '其他', alertType: '起飞', level: 'high', pilotLocation: '舟山市普陀区东港街道', lat: 29.9528, lng: 122.3236 },
  { deviceId: '4700D53C41A72352F8B28F24C3552F40', droneSn: 'SN-A993', droneType: 'app控', alertTime: '2026-03-23 19:13:27', zoneType: '其他', alertType: '闯禁', level: 'high', pilotLocation: '宁波市镇海区庄市街道', lat: 29.9653, lng: 121.5544 },
  { deviceId: '8DDBC56B7D92340363E656E7C5C49626', droneSn: 'SN-A994', droneType: '屏控', alertTime: '2026-03-23 19:13:04', zoneType: '政府机构', alertType: '起飞', level: 'high', pilotLocation: '温州市瑞安市安阳街道', lat: 27.7794, lng: 120.6554 },
  { deviceId: '1F205972C681157ACF385DA6557CF4F0', droneSn: 'SN-A995', droneType: 'app控', alertTime: '2026-03-23 19:12:44', zoneType: '其他', alertType: '闯禁', level: 'high', pilotLocation: '宁波市镇海区骆驼街道', lat: 29.9785, lng: 121.5673 },
  { deviceId: '50297F49CAF97EFBF75EB786447AFE6D', droneSn: 'SN-A996', droneType: 'app控', alertTime: '2026-03-23 19:12:38', zoneType: '其他', alertType: '闯禁', level: 'high', pilotLocation: '宁波市慈溪市庵东镇', lat: 30.2587, lng: 121.1663 },
  { deviceId: '0ABE1C6F1DD75FA3C4E9C792F06FCF79', droneSn: 'SN-A997', droneType: '屏控', alertTime: '2026-03-23 19:12:35', zoneType: '其他', alertType: '起飞', level: 'high', pilotLocation: '绍兴市上虞区百官街道', lat: 30.0178, lng: 120.8687 },
  { deviceId: '6E3231C37F4350DCC923805633E5FD01', droneSn: 'SN-A998', droneType: 'app控', alertTime: '2026-03-23 19:12:20', zoneType: '其他', alertType: '闯禁', level: 'high', pilotLocation: '舟山市普陀区东港街道', lat: 29.9528, lng: 122.3236 },
  { deviceId: '8D94B9849A04FFD5E9E8A4A3C4B68F1B', droneSn: 'SN-A999', droneType: 'app控', alertTime: '2026-03-23 19:12:03', zoneType: '其他', alertType: '闯禁', level: 'high', pilotLocation: '宁波市鄞州区潘火街道', lat: 29.8342, lng: 121.5567 },
  { deviceId: 'B571EC3F0CDF02D38DCA142DA59B12BD', droneSn: 'SN-A100', droneType: '屏控', alertTime: '2026-03-23 19:11:23', zoneType: '其他', alertType: '起飞', level: 'high', pilotLocation: '宁波市慈溪市古塘街道', lat: 30.1696, lng: 121.2366 },
])
</script>

<template>
  <div class="flex flex-col gap-0">
    <DsGlassTabBar v-model="activeTab" :tabs="tabs" />

    <div
      v-show="activeTab === 'flight'"
      class="border border-[rgba(56,189,248,0.25)] rounded-b-xl rounded-tr-xl
             bg-[rgba(17,24,39,0.75)] backdrop-blur-md p-5"
    >
      <PageTableView
        title="起降记录"
        description="查看所有无人机起降历史数据"
        :filters="flightFilters"
        :columns="flightColumns"
        :data="flightData"
        :pagination="{ page: 1, pageSize: 10, itemCount: 7829 }"
      />
    </div>

    <div
      v-show="activeTab === 'alert'"
      class="border border-[rgba(56,189,248,0.25)] rounded-b-xl rounded-tr-xl
             bg-[rgba(17,24,39,0.75)] backdrop-blur-md p-5"
    >
      <PageTableView
        title="预警记录"
        description="查看所有飞行预警事件"
        :filters="alertFilters"
        :columns="alertColumns"
        :data="alertData"
        :pagination="{ page: 1, pageSize: 10, itemCount: 4 }"
      />
    </div>
  </div>

  <DsLocationMapModal
    v-if="selectedFlight"
    v-model:show="showMapModal"
    :location="selectedFlight.pilotLocation"
    :lat="selectedFlight.lat"
    :lng="selectedFlight.lng"
  />
</template>

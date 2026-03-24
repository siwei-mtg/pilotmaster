<script setup lang="ts">
import { ref, h } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import DsGlassTabBar from '@/components/molecules/DsGlassTabBar.vue'
import type { TabItem } from '@/components/molecules/DsGlassTabBar.vue'
import PageTableView from '@/components/templates/PageTableView.vue'
import DsToken from '@/components/atoms/DsToken.vue'
// DsTableActions removed as it was unused
import DsIcon from '@/components/atoms/DsIcon.vue'
import DsNoFlyZoneModal from '@/components/organisms/DsNoFlyZoneModal.vue'
import DsSmsTemplateModal from '@/components/organisms/DsSmsTemplateModal.vue'
import DsRealtimeActivityModal from '@/components/organisms/DsRealtimeActivityModal.vue'
import type { RealtimeActivityData } from '@/components/organisms/DsRealtimeActivityModal.vue'
import DsScheduledActivityModal from '@/components/organisms/DsScheduledActivityModal.vue'
import type { ScheduledActivityData } from '@/components/organisms/DsScheduledActivityModal.vue'
import DsUserModal from '@/components/organisms/DsUserModal.vue'
import type { UserData } from '@/components/organisms/DsUserModal.vue'
import DsPasswordModal from '@/components/organisms/DsPasswordModal.vue'
import { mockNoFlyZones, type NoFlyZone } from '@/mock/nofly-zones'

const activeTab = ref('nofly')
const tabs: TabItem[] = [
  { label: '禁飞区配置', value: 'nofly' },
  { label: '预警短信配置', value: 'sms' },
  { label: '用户管理', value: 'user' },
]
const message = useMessage()
const showNoflyModal = ref(false)
const editingZone = ref<NoFlyZone | null>(null)

function handleNoflyConfirm(data: { name: string; type: string; enabled: boolean; path: number[][] }) {
  if (editingZone.value) {
    // Update existing zone
    const idx = noflyData.value.findIndex(z => z.id === editingZone.value!.id)
    if (idx !== -1) {
      noflyData.value[idx] = {
        ...noflyData.value[idx],
        name: data.name,
        type: data.type,
        enabled: data.enabled,
        path: data.path,
      }
    }
    editingZone.value = null
  } else {
    // Add new zone
    noflyData.value.unshift({
      id: `nfz-${Date.now()}`,
      name: data.name,
      type: data.type,
      enabled: data.enabled,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      path: data.path,
    })
  }
}

function handleEditZone(row: NoFlyZone) {
  editingZone.value = row
  showNoflyModal.value = true
}

function handleDeleteZone(row: NoFlyZone) {
  noflyData.value = noflyData.value.filter(z => z.id !== row.id)
}

function handleAddZone() {
  editingZone.value = null
  showNoflyModal.value = true
}

// ========== 禁飞区 ==========
const noflyColumns = [
  { title: '禁飞区名称', key: 'name', minWidth: 140 },
  { title: '禁飞区类型', key: 'type', width: 120 },
  {
    title: '启用状态',
    key: 'enabled',
    width: 100,
    render: (row: any) => h(DsToken, {
      label: row.enabled ? '已启用' : '未启用',
      type: row.enabled ? 'success' : 'default',
    }),
  },
  { title: '创建时间', key: 'createdAt', width: 180 },
  {
    title: '操作',
    key: 'actions',
    width: 100,
    render: (row: any) => h('div', { class: 'flex items-center gap-2' }, [
      h(NButton, {
        quaternary: true,
        circle: true,
        size: 'small',
        onClick: () => handleEditZone(row),
      }, {
        icon: () => h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 14, height: 14, viewBox: '0 0 24 24',
          fill: 'none', stroke: 'var(--color-primary)',
          'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        }, [
          h('path', { d: 'M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' }),
          h('path', { d: 'm15 5 4 4' }),
        ]),
      }),
      h(NButton, {
        quaternary: true,
        circle: true,
        size: 'small',
        onClick: () => handleDeleteZone(row),
      }, {
        icon: () => h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 14, height: 14, viewBox: '0 0 24 24',
          fill: 'none', stroke: 'var(--color-danger)',
          'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        }, [
          h('path', { d: 'M3 6h18' }),
          h('path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' }),
          h('path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' }),
          h('line', { x1: '10', y1: '11', x2: '10', y2: '17' }),
          h('line', { x1: '14', y1: '11', x2: '14', y2: '17' }),
        ]),
      }),
    ]),
  },
]

const noflyData = ref<NoFlyZone[]>([...mockNoFlyZones])

// ========== 短信模板 ==========
interface SmsTemplate {
  id: string
  name: string
  content: string
  enabled: boolean
  createdAt: string
}

const showSmsTemplateModal = ref(false)
const editingSmsTemplate = ref<SmsTemplate | null>(null)

const smsTemplateColumns = [
  { title: '模板名称', key: 'name', width: 160 },
  { title: '模板内容', key: 'content', ellipsis: { tooltip: true } },
  {
    title: '启用状态',
    key: 'enabled',
    width: 100,
    render: (row: any) => h(DsToken, {
      label: row.enabled ? '已启用' : '未启用',
      type: row.enabled ? 'success' : 'default',
    }),
  },
  { title: '创建时间', key: 'createdAt', width: 180 },
  {
    title: '操作',
    key: 'actions',
    width: 100,
    render: (row: any) => h('div', { class: 'flex items-center gap-2' }, [
      h(NButton, {
        quaternary: true, circle: true, size: 'small',
        onClick: () => handleEditSmsTemplate(row),
      }, {
        icon: () => h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 14, height: 14, viewBox: '0 0 24 24',
          fill: 'none', stroke: 'var(--color-primary)',
          'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        }, [
          h('path', { d: 'M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' }),
          h('path', { d: 'm15 5 4 4' }),
        ]),
      }),
      h(NButton, {
        quaternary: true, circle: true, size: 'small',
        onClick: () => handleDeleteSmsTemplate(row),
      }, {
        icon: () => h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 14, height: 14, viewBox: '0 0 24 24',
          fill: 'none', stroke: 'var(--color-danger)',
          'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        }, [
          h('path', { d: 'M3 6h18' }),
          h('path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' }),
          h('path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' }),
          h('line', { x1: '10', y1: '11', x2: '10', y2: '17' }),
          h('line', { x1: '14', y1: '11', x2: '14', y2: '17' }),
        ]),
      }),
    ]),
  },
]

const smsTemplateData = ref<SmsTemplate[]>([
  {
    id: 'tpl-001',
    name: '禁飞区闯入通知',
    content: '【飞手管家】您的无人机（ID: {droneId}）已进入{zoneName}禁飞区域，请立即离开！当前位置：{location}，时间：{time}。',
    enabled: true,
    createdAt: '2025-05-07 10:30:00',
  },
])

function handleEditSmsTemplate(row: SmsTemplate) {
  editingSmsTemplate.value = row
  showSmsTemplateModal.value = true
}

function handleDeleteSmsTemplate(row: SmsTemplate) {
  smsTemplateData.value = smsTemplateData.value.filter(t => t.id !== row.id)
}

function handleAddSmsTemplate() {
  editingSmsTemplate.value = null
  showSmsTemplateModal.value = true
}

function handleSmsTemplateConfirm(data: { name: string; content: string; enabled: boolean }) {
  if (editingSmsTemplate.value) {
    const idx = smsTemplateData.value.findIndex(t => t.id === editingSmsTemplate.value!.id)
    if (idx !== -1) {
      smsTemplateData.value[idx] = { ...smsTemplateData.value[idx], ...data }
    }
    editingSmsTemplate.value = null
  } else {
    smsTemplateData.value.unshift({
      id: `tpl-${Date.now()}`,
      name: data.name,
      content: data.content,
      enabled: data.enabled,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
    })
  }
}

// ========== 实时活动 ==========
interface RealtimeActivity {
  id: string
  seq: number
  name: string
  createdAt: string
  deliveryCount: number
  dateRange: [number, number] | null
  timeRange: [string, string]
  content: string
  locationMode: string
  audienceTags: string[]
  extraNumbers: string
}

const showRealtimeModal = ref(false)
const editingRealtimeActivity = ref<RealtimeActivity | null>(null)

const smsRealtimeColumns = [
  { title: '活动编号', key: 'seq', width: 90 },
  { title: '活动名称', key: 'name', minWidth: 140 },
  { title: '创建日期', key: 'createdAt', width: 180 },
  { title: '累计投放人数', key: 'deliveryCount', width: 130 },
  {
    title: '操作',
    key: 'actions',
    width: 100,
    render: (row: any) => h('div', { class: 'flex items-center gap-2' }, [
      h(NButton, {
        quaternary: true, circle: true, size: 'small',
        onClick: () => handleEditRealtimeActivity(row),
      }, {
        icon: () => h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 14, height: 14, viewBox: '0 0 24 24',
          fill: 'none', stroke: 'var(--color-primary)',
          'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        }, [
          h('path', { d: 'M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' }),
          h('path', { d: 'm15 5 4 4' }),
        ]),
      }),
      h(NButton, {
        quaternary: true, circle: true, size: 'small',
        onClick: () => handleDeleteRealtimeActivity(row),
      }, {
        icon: () => h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 14, height: 14, viewBox: '0 0 24 24',
          fill: 'none', stroke: 'var(--color-danger)',
          'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        }, [
          h('path', { d: 'M3 6h18' }),
          h('path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' }),
          h('path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' }),
          h('line', { x1: '10', y1: '11', x2: '10', y2: '17' }),
          h('line', { x1: '14', y1: '11', x2: '14', y2: '17' }),
        ]),
      }),
    ]),
  },
]

const smsRealtimeData = ref<RealtimeActivity[]>([
  {
    id: 'rt-001',
    seq: 1,
    name: '马拉松管控',
    createdAt: '2025-05-23 10:36:22',
    deliveryCount: 17542,
    dateRange: [new Date('2026-03-24').getTime(), new Date('2026-03-31').getTime()],
    timeRange: ['08:00', '18:00'],
    content: '您已进入活动区域，请注意安全飞行。',
    locationMode: 'administrative',
    audienceTags: ['realtime', 'monthly'],
    extraNumbers: '',
  },
  {
    id: 'rt-002',
    seq: 2,
    name: '重要会议安保',
    createdAt: '2025-05-20 14:20:15',
    deliveryCount: 8056,
    dateRange: [new Date('2026-04-01').getTime(), new Date('2026-04-03').getTime()],
    timeRange: ['07:00', '20:00'],
    content: '重要会议期间，请勿在管控区域内飞行。',
    locationMode: 'administrative',
    audienceTags: ['realtime'],
    extraNumbers: '',
  },
])

function handleEditRealtimeActivity(row: RealtimeActivity) {
  editingRealtimeActivity.value = row
  showRealtimeModal.value = true
}

function handleDeleteRealtimeActivity(row: RealtimeActivity) {
  smsRealtimeData.value = smsRealtimeData.value.filter(a => a.id !== row.id)
}

function handleAddRealtimeActivity() {
  editingRealtimeActivity.value = null
  showRealtimeModal.value = true
}

function handleRealtimeActivityConfirm(data: RealtimeActivityData) {
  if (editingRealtimeActivity.value) {
    const idx = smsRealtimeData.value.findIndex(a => a.id === editingRealtimeActivity.value!.id)
    if (idx !== -1) {
      smsRealtimeData.value[idx] = { ...smsRealtimeData.value[idx], ...data }
    }
    editingRealtimeActivity.value = null
  } else {
    smsRealtimeData.value.push({
      ...data,
      id: `rt-${Date.now()}`,
      seq: smsRealtimeData.value.length + 1,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      deliveryCount: 0,
    })
  }
}

// ========== 定时活动 ==========
interface ScheduledActivity {
  id: string
  seq: number
  name: string
  createdAt: string
  deliveryCount: number
  scheduledTime: number | null
  content: string
  locationMode: string
  audienceTags: string[]
  extraNumbers: string
}

const showScheduledModal = ref(false)
const editingScheduledActivity = ref<ScheduledActivity | null>(null)

const smsScheduleColumns = [
  { title: '活动编号', key: 'seq', width: 90 },
  { title: '活动名称', key: 'name', minWidth: 140 },
  { title: '创建日期', key: 'createdAt', width: 180 },
  { title: '投放人数', key: 'deliveryCount', width: 110 },
  {
    title: '操作',
    key: 'actions',
    width: 100,
    render: (row: any) => h('div', { class: 'flex items-center gap-2' }, [
      h(NButton, {
        quaternary: true, circle: true, size: 'small',
        onClick: () => handleEditScheduledActivity(row),
      }, {
        icon: () => h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 14, height: 14, viewBox: '0 0 24 24',
          fill: 'none', stroke: 'var(--color-text-secondary)',
          'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        }, [
          h('path', { d: 'M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' }),
          h('path', { d: 'm15 5 4 4' }),
        ]),
      }),
      h(NButton, {
        quaternary: true, circle: true, size: 'small',
        onClick: () => handleDeleteScheduledActivity(row),
      }, {
        icon: () => h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 14, height: 14, viewBox: '0 0 24 24',
          fill: 'none', stroke: 'var(--color-danger)',
          'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        }, [
          h('path', { d: 'M3 6h18' }),
          h('path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' }),
          h('path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' }),
          h('line', { x1: '10', y1: '11', x2: '10', y2: '17' }),
          h('line', { x1: '14', y1: '11', x2: '14', y2: '17' }),
        ]),
      }),
    ]),
  },
]

const smsScheduleData = ref<ScheduledActivity[]>([
  {
    id: 'sc-001',
    seq: 1,
    name: '马拉松管控',
    createdAt: '2025-05-23 10:36:22',
    deliveryCount: 17542,
    scheduledTime: new Date('2025-05-23 11:00:00').getTime(),
    content: '【飞手管家】您已进入禁飞区，未经军队、民航部门许可操纵无人机，公安机关将以危险妨碍公共安全罪予以追究。',
    locationMode: 'administrative',
    audienceTags: ['realtime', 'monthly'],
    extraNumbers: '',
  },
  {
    id: 'sc-002',
    seq: 2,
    name: '重要活动预警',
    createdAt: '2025-05-22 16:45:30',
    deliveryCount: 5623,
    scheduledTime: new Date('2025-05-22 17:00:00').getTime(),
    content: '重要活动期间，请严格遵守飞行规定。',
    locationMode: 'administrative',
    audienceTags: ['realtime'],
    extraNumbers: '',
  },
])

function handleEditScheduledActivity(row: ScheduledActivity) {
  editingScheduledActivity.value = row
  showScheduledModal.value = true
}

function handleDeleteScheduledActivity(row: ScheduledActivity) {
  smsScheduleData.value = smsScheduleData.value.filter(a => a.id !== row.id)
}

function handleAddScheduledActivity() {
  editingScheduledActivity.value = null
  showScheduledModal.value = true
}

function handleScheduledActivityConfirm(data: ScheduledActivityData) {
  if (editingScheduledActivity.value) {
    const idx = smsScheduleData.value.findIndex(a => a.id === editingScheduledActivity.value!.id)
    if (idx !== -1) {
      smsScheduleData.value[idx] = { ...smsScheduleData.value[idx], ...data }
    }
    editingScheduledActivity.value = null
  } else {
    smsScheduleData.value.push({
      ...data,
      id: `sc-${Date.now()}`,
      seq: smsScheduleData.value.length + 1,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      deliveryCount: 0,
    })
  }
}

// ========== 用户管理 ==========
interface UserEntry extends UserData {
  id: string
  createdAt: string
  lastLogin: string
}

const showUserModal = ref(false)
const showPasswordModal = ref(false)
const editingUser = ref<UserEntry | null>(null)
const passwordResetUser = ref<string>('')

const userColumns = [
  { title: '用户名', key: 'username', width: 140 },
  {
    title: '用户角色',
    key: 'role',
    width: 100,
    render: (row: any) => h(DsToken, {
      label: row.role === 'admin' ? '管理员' : '普通用户',
      type: row.role === 'admin' ? 'success' : 'info',
    }),
  },
  { title: '创建时间', key: 'createdAt', width: 180 },
  { title: '最后登录时间', key: 'lastLogin', width: 180 },
  {
    title: '状态',
    key: 'enabled',
    width: 100,
    render: (row: any) => h(DsToken, {
      label: row.enabled ? '已启用' : '已停用',
      type: row.enabled ? 'success' : 'default',
    }),
  },
  {
    title: '操作',
    key: 'actions',
    width: 120,
    render: (row: any) => h('div', { class: 'flex items-center gap-2' }, [
      h(NButton, {
        quaternary: true, circle: true, size: 'small',
        onClick: () => handleEditUser(row),
      }, {
        icon: () => h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 14, height: 14, viewBox: '0 0 24 24',
          fill: 'none', stroke: 'var(--color-text-secondary)',
          'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        }, [
          h('path', { d: 'M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' }),
          h('path', { d: 'm15 5 4 4' }),
        ]),
      }),
      h(NButton, {
        quaternary: true, circle: true, size: 'small',
        onClick: () => handleResetPassword(row),
      }, {
        icon: () => h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 14, height: 14, viewBox: '0 0 24 24',
          fill: 'none', stroke: 'var(--color-text-secondary)',
          'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        }, [
          h('path', { d: 'M15 6a5 5 0 1 1-5 5 5 5 0 0 1 5-5z' }),
          h('path', { d: 'M8.94 11.06l-4.44 4.44a1.5 1.5 0 0 0 0 2l.5.5a1.5 1.5 0 0 0 2 0l1.14-1.14' }),
          h('path', { d: 'M10.06 13.94l2.12 2.12' }),
        ]),
      }),
      h(NButton, {
        quaternary: true, circle: true, size: 'small',
        onClick: () => handleDeleteUser(row),
      }, {
        icon: () => h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 14, height: 14, viewBox: '0 0 24 24',
          fill: 'none', stroke: 'var(--color-danger)',
          'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        }, [
          h('path', { d: 'M3 6h18' }),
          h('path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' }),
          h('path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' }),
          h('line', { x1: '10', y1: '11', x2: '10', y2: '17' }),
          h('line', { x1: '14', y1: '11', x2: '14', y2: '17' }),
        ]),
      }),
    ]),
  },
]

const userData = ref<UserEntry[]>([
  { id: '1', username: 'LSLDQ', role: 'user', createdAt: '2025-11-11 09:38:39', lastLogin: '2025-11-11 12:07:16', enabled: true, city: '丽水市', district: '莲都区', centerPoint: '', remarks: '' },
  { id: '2', username: 'SYJTJ', role: 'user', createdAt: '2025-10-24 16:22:56', lastLogin: '2025-11-11 09:37:33', enabled: true, city: '丽水市', district: '莲都区', centerPoint: '', remarks: '' },
  { id: '3', username: 'NBBL', role: 'user', createdAt: '2025-10-14 14:48:06', lastLogin: '2025-10-14 14:48:39', enabled: true, city: '杭州市', district: '上城区', centerPoint: '', remarks: '' },
  { id: '4', username: 'HZXTJ', role: 'user', createdAt: '2025-09-25 18:14:20', lastLogin: '2025-09-25 18:14:20', enabled: true, city: '杭州市', district: '上城区', centerPoint: '', remarks: '' },
  { id: '5', username: 'SXYD', role: 'user', createdAt: '2025-09-09 15:41:08', lastLogin: '2026-01-14 18:25:08', enabled: true, city: '绍兴市', district: '越城区', centerPoint: '', remarks: '' },
  { id: '6', username: 'LSYD', role: 'user', createdAt: '2025-09-02 14:50:48', lastLogin: '2025-09-09 15:41:33', enabled: true, city: '丽水市', district: '莲都区', centerPoint: '', remarks: '' },
  { id: '7', username: 'WZYD', role: 'user', createdAt: '2025-08-29 10:09:21', lastLogin: '2026-03-09 16:03:25', enabled: true, city: '温州市', district: '鹿城区', centerPoint: '', remarks: '' },
  { id: '8', username: 'HMH', role: 'user', createdAt: '2025-07-30 15:33:00', lastLogin: '2025-07-30 15:33:00', enabled: true, city: '杭州市', district: '余杭区', centerPoint: '', remarks: '' },
  { id: '9', username: '测试2', role: 'admin', createdAt: '2025-07-27 14:54:31', lastLogin: '2025-07-27 14:54:31', enabled: true, city: '杭州市', district: '西湖区', centerPoint: '', remarks: '' },
  { id: '10', username: 'ZSXTJ', role: 'user', createdAt: '2025-07-15 16:57:57', lastLogin: '2025-07-28 15:50:28', enabled: true, city: '舟山市', district: '定海区', centerPoint: '', remarks: '' },
])

function handleAddUser() {
  editingUser.value = null
  showUserModal.value = true
}

function handleEditUser(row: UserEntry) {
  editingUser.value = row
  showUserModal.value = true
}

function handleResetPassword(row: UserEntry) {
  passwordResetUser.value = row.username
  showPasswordModal.value = true
}

function handleDeleteUser(row: UserEntry) {
  userData.value = userData.value.filter(u => u.id !== row.id)
}

function handleUserConfirm(data: UserData) {
  if (editingUser.value) {
    const idx = userData.value.findIndex(u => u.id === editingUser.value!.id)
    if (idx !== -1) {
      userData.value[idx] = { ...userData.value[idx], ...data }
    }
    editingUser.value = null
  } else {
    userData.value.push({
      ...data,
      id: `u-${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      lastLogin: '-',
    })
  }
}

function handlePasswordConfirm(username: string, password: string) {
  console.log(`Password reset for ${username}: ${password}`)
  message.success(`用户 ${username} 的密码已成功修改`)
}
</script>

<template>
  <div class="flex flex-col gap-0">
    <DsGlassTabBar v-model="activeTab" :tabs="tabs" />

    <div
      v-show="activeTab === 'nofly'"
      class="border border-[rgba(56,189,248,0.25)] rounded-b-xl rounded-tr-xl
             bg-[rgba(17,24,39,0.75)] backdrop-blur-md p-5"
    >
      <PageTableView
        title="禁飞区列表"
        :columns="noflyColumns"
        :data="noflyData"
        :pagination="false"
      >
        <template #actions>
          <NButton type="primary" @click="handleAddZone">
            <template #icon><DsIcon icon="lucide:plus" :size="14" /></template>
            新增禁飞区
          </NButton>
        </template>
      </PageTableView>

      <DsNoFlyZoneModal
        v-model:show="showNoflyModal"
        :initial-data="editingZone"
        @confirm="handleNoflyConfirm"
      />
    </div>

    <div
      v-show="activeTab === 'sms'"
      class="flex flex-col gap-6 border border-[rgba(56,189,248,0.25)] rounded-b-xl rounded-tr-xl
             bg-[rgba(17,24,39,0.75)] backdrop-blur-md p-5"
    >
      <PageTableView
        title="短信模板列表"
        :columns="smsTemplateColumns"
        :data="smsTemplateData"
        :pagination="false"
      >
        <template #actions>
          <NButton type="primary" @click="handleAddSmsTemplate">
            <template #icon><DsIcon icon="lucide:plus" :size="14" /></template>
            新增模板
          </NButton>
        </template>
      </PageTableView>

      <DsSmsTemplateModal
        v-model:show="showSmsTemplateModal"
        :initial-data="editingSmsTemplate"
        @confirm="handleSmsTemplateConfirm"
      />

      <PageTableView
        title="实时活动配置"
        :columns="smsRealtimeColumns"
        :data="smsRealtimeData"
        :pagination="false"
      >
        <template #actions>
          <NButton type="primary" @click="handleAddRealtimeActivity">
            <template #icon><DsIcon icon="lucide:plus" :size="14" /></template>
            新建实时活动
          </NButton>
        </template>
      </PageTableView>

      <DsRealtimeActivityModal
        v-model:show="showRealtimeModal"
        :initial-data="editingRealtimeActivity"
        @confirm="handleRealtimeActivityConfirm"
      />

      <PageTableView
        title="定时活动配置"
        :columns="smsScheduleColumns"
        :data="smsScheduleData"
        :pagination="false"
      >
        <template #actions>
          <NButton type="primary" @click="handleAddScheduledActivity">
            <template #icon><DsIcon icon="lucide:plus" :size="14" /></template>
            新建定时活动
          </NButton>
        </template>
      </PageTableView>

      <DsScheduledActivityModal
        v-model:show="showScheduledModal"
        :initial-data="editingScheduledActivity"
        @confirm="handleScheduledActivityConfirm"
      />
    </div>

    <div
      v-show="activeTab === 'user'"
      class="border border-[rgba(56,189,248,0.25)] rounded-b-xl rounded-tr-xl
             bg-[rgba(17,24,39,0.75)] backdrop-blur-md p-5"
    >
      <PageTableView
        title="用户管理"
        :columns="userColumns"
        :data="userData"
        :pagination="false"
        :filters="[{ key: 'username', label: '搜索用户', type: 'input', placeholder: '请输入用户名', width: '240px' }]"
      >
        <template #actions>
          <NButton type="primary" @click="handleAddUser">
            <template #icon><DsIcon icon="lucide:user-plus" :size="14" /></template>
            新增用户
          </NButton>
        </template>
      </PageTableView>

      <DsUserModal
        v-model:show="showUserModal"
        :initial-data="editingUser"
        @confirm="handleUserConfirm"
      />

      <DsPasswordModal
        v-model:show="showPasswordModal"
        :username="passwordResetUser"
        @confirm="handlePasswordConfirm"
      />
    </div>
  </div>
</template>

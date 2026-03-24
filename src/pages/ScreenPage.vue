<script setup lang="ts">
import { ref, computed } from 'vue'
import DsHeader from '@/components/organisms/DsHeader.vue'
import DsMapContainer from '@/components/organisms/DsMapContainer.vue'
import DsStatNumber from '@/components/atoms/DsStatNumber.vue'
import DsChartCard from '@/components/organisms/DsChartCard.vue'
import DsGlowDot from '@/components/atoms/DsGlowDot.vue'
import DsToken from '@/components/atoms/DsToken.vue'
import DsIcon from '@/components/atoms/DsIcon.vue'
import DsHudCard from '@/components/molecules/DsHudCard.vue'
import DsRankList from '@/components/molecules/DsRankList.vue'
import DsRealtimeAlertBanner from '@/components/molecules/DsRealtimeAlertBanner.vue'
import type { EChartsOption } from 'echarts'

// ===== 左侧面板数据 =====
const totalAlertCount = ref(50686)
const realtimeAlertCount = ref(237)
const alertTrend = ref(-79)

// 告警分类（环形图数据）
// label 字段是 callout 显示的缩写，name 是 tooltip 全称
const alertDonutData = [
  { name: '禁飞区违规', label: '禁飞区', value: 22850, color: '#22D3EE' },
  { name: '超高飞行',   label: '超高飞', value: 12700, color: '#A855F7' },
  { name: '未授权飞行', label: '未授权', value: 7600,  color: '#818CF8' },
  { name: '夜间违规',   label: '夜间',   value: 5080,  color: '#60A5FA' },
  { name: '其他违规',   label: '其他',   value: 2456,  color: '#34D399' },
]

const topViolators = [
  { label: 'D1AB4BB910F...', value: 103 },
  { label: 'D5BFD8BB7A0...', value: 80 },
  { label: '2620002BEEE...', value: 46 },
  { label: '297B19C3A95...', value: 45 },
  { label: 'A8C3F21D09B...', value: 32 },
]
const realtimeAlerts = [
  { id: 1, time: '2026-03-23 13:57:35', location: '宁波市象山县西周镇', deviceId: '96FB1E210C7220B24D96FEA13F6E738B' },
  { id: 2, time: '2026-03-23 13:57:10', location: '宁波市北仑区薛洲坊镇', deviceId: '90F3916E5D5F0B203DAC090665AD274A' },
  { id: 3, time: '2026-03-23 13:57:02', location: '宁波市金城市八曹镇镇', deviceId: '3B3B617C6A02A521BA03E4CD29898743' },
  { id: 4, time: '2026-03-23 13:56:48', location: '杭州市萧山区城厢街道', deviceId: 'A1C2D3E4F5061728394A5B6C7D8E9F00' },
  { id: 5, time: '2026-03-23 13:56:31', location: '绍兴市诸暨市店口镇', deviceId: 'B2D3E4F506172839405B6C7D8E9F0011' },
]

// 告警统计 — 环形图（callout 标注 + 中心总数）
const alertPieOption = computed<EChartsOption>(() => ({
  backgroundColor: 'transparent',
  // 中心文字：用 graphic 避免与外部 label 冲突
  // 垂直居中于环形内圆（center y=50%=100px, inner r=30%*200=60px）
  graphic: [
    {
      type: 'text',
      left: 'center',
      top: '38%',
      style: {
        text: '告警总数',
        fill: '#64748B',
        fontSize: 10,
        fontFamily: 'PingFang SC, sans-serif',
        textAlign: 'center',
      },
    },
    {
      type: 'text',
      left: 'center',
      top: '48%',
      style: {
        text: totalAlertCount.value.toLocaleString(),
        fill: '#38BDF8',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        textAlign: 'center',
        shadowBlur: 14,
        shadowColor: 'rgba(56,189,248,0.55)',
      },
    },
  ],
  tooltip: {
    trigger: 'item',
    appendToBody: true,
    backgroundColor: 'rgba(5,10,20,0.92)',
    borderColor: 'rgba(34,211,238,0.35)',
    borderWidth: 1,
    padding: [10, 14],
    textStyle: { color: '#E2E8F0', fontSize: 12 },
    formatter: (params: any) =>
      `<div style="font-size:11px;color:#94A3B8;margin-bottom:4px">${params.name}</div>` +
      `<div style="font-size:15px;font-weight:bold;color:${params.color};font-family:monospace">` +
      `${(params.value as number).toLocaleString()}` +
      `<span style="font-size:11px;color:#CBD5E1;font-weight:normal;margin-left:6px">(${(params.percent as number).toFixed(2)}%)</span></div>`,
  },
  series: [{
    type: 'pie',
    // 半径：环形在 200px 高度画布内，callout 标注不裁剪
    radius: ['39%', '55%'],
    center: ['50%', '50%'],
    avoidLabelOverlap: true,
    label: {
      show: true,
      position: 'outside',
      // 缩写名 + 百分比，两行显示
      formatter: (params: any) => {
        const d = alertDonutData.find(x => x.name === params.name)
        const abbr = d?.label ?? params.name
        return `{nm|${abbr}}\n{pct|${(params.percent as number).toFixed(1)}%}`
      },
      rich: {
        nm:  { fontSize: 10, color: '#94A3B8', lineHeight: 13, fontFamily: 'PingFang SC, sans-serif' },
        pct: { fontSize: 11, fontWeight: 'bold', color: '#E2E8F0', lineHeight: 14, fontFamily: 'monospace' },
      },
      distanceToLabelLine: 2,
    },
    labelLine: {
      show: true,
      length: 5,
      length2: 8,
      smooth: false,
      lineStyle: { color: 'rgba(148,163,184,0.45)', width: 1 },
    },
    emphasis: { scale: true, scaleSize: 5 },
    data: alertDonutData.map(d => ({
      value: d.value,
      name: d.name,
      itemStyle: {
        color: d.color,
        shadowBlur: 14,
        shadowColor: d.color + '55',
      },
    })),
  }],
}))

// ===== 右侧面板数据 =====
const peakHour = ref('14:00')
const totalActivity = ref(96635)
const pilotCount = ref(27123)
const timeGranularity = ref<'hour' | 'day'>('hour')

const trendChartOption = computed<EChartsOption>(() => {
  const categories = timeGranularity.value === 'hour'
    ? ['00:05', '05:00', '10:00', '15:00', '20:00']
    : ['03/17', '03/18', '03/19', '03/20', '03/21', '03/22', '03/23']
  const data = timeGranularity.value === 'hour'
    ? [800, 1200, 4500, 5800, 3200]
    : [2800, 3500, 4200, 3100, 5100, 5600, 6200]
  return {
    grid: { top: 15, right: 15, bottom: 25, left: 45 },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: categories, axisLabel: { fontSize: 10 } },
    yAxis: { type: 'value', axisLabel: { fontSize: 10 } },
    series: [{
      type: 'line',
      data,
      smooth: true,
      showSymbol: false,
      areaStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(56,189,248,0.35)' }, { offset: 1, color: 'rgba(56,189,248,0)' }] },
      },
      lineStyle: { color: '#38BDF8', width: 2 },
      itemStyle: { color: '#38BDF8' },
    }],
  }
})

const realtimeTab = ref<'flying' | 'landed'>('flying')
const flyingDrones = [
  { id: '3B3B617C6A02A521BA03E4CD29898743', location: '绍兴市诸暨市店口镇', duration: '飞行时间0时15秒', time: '2026-03-23 13:57:36' },
  { id: '96FB1E210C7220B24D96FEA13F6E738B', location: '宁波市象山县西周镇', duration: '飞行时间0时37秒', time: '2026-03-23 13:57:35' },
  { id: '90F3916E5D5F0B203DAC090665AD274A', location: '宁波市北仑区薛洲坊镇', duration: '飞行时间0时38秒', time: '2026-03-23 13:57:34' },
]
const landedDrones = [
  { id: 'B7E2D1F08A3C6J1L1234567890ABCDEF', location: '杭州市西湖区文三路', duration: '02:05:11', time: '2026-03-23 13:50:22' },
  { id: 'C6D1E0F97B2D5I0K1234567890ABCDEF', location: '杭州市萧山区城厢街道', duration: '00:45:33', time: '2026-03-23 13:48:10' },
]
</script>

<template>
  <div class="flex flex-col h-screen w-screen overflow-hidden bg-bg-base">
    <DsHeader />
    <div class="relative flex-1 overflow-hidden">
    <DsMapContainer>
      <!-- ===== Center: Realtime alert banner ===== -->
      <div class="absolute top-4 left-1/2 -translate-x-1/2 z-20">
        <DsRealtimeAlertBanner :count="realtimeAlertCount" :trend="alertTrend" />
      </div>

      <!-- ===== Left Panel ===== -->
      <div class="absolute top-0 left-0 bottom-0 z-10 w-[380px] flex flex-col overflow-hidden"
        style="backdrop-filter: blur(20px); background: rgba(11,14,23,0.88);">
        <div class="flex flex-col gap-3 p-4 overflow-y-auto flex-1">

          <!-- 无人机告警统计 — 环形图，中心总数，callout 标注 -->
          <DsHudCard title="无人机告警统计" :allow-overflow="true">
            <DsChartCard title="" :option="alertPieOption" height="200px" class="border-0! bg-transparent! overflow-visible!" />
          </DsHudCard>

          <!-- 重复违规者统计 — 排名表 -->
          <DsHudCard title="无人机重复违规者统计">
            <DsRankList :items="topViolators" suffix="次" />
          </DsHudCard>

          <!-- 实时告警（可滚动） -->
          <DsHudCard title="无人机实时告警">
            <div class="flex flex-col gap-0.5 max-h-[260px] overflow-y-auto pr-1 scrollbar-thin">
              <div v-for="a in realtimeAlerts" :key="a.id"
                class="p-3 rounded-lg border-l-2 transition-colors hover:bg-bg-hover"
                :class="a === realtimeAlerts[0] ? 'border-l-danger bg-danger/5' : 'border-l-warning/40 bg-bg-surface/50'">
                <div class="flex items-center gap-2 mb-1">
                  <DsIcon icon="lucide:alert-triangle" :size="12" color="var(--color-warning)" />
                  <span class="text-text-primary text-xs">{{ a.time }}</span>
                  <DsToken v-if="a === realtimeAlerts[0]" label="高" type="danger" />
                </div>
                <div class="text-text-secondary text-[11px]">操控者位置：<span class="text-info">{{ a.location }}</span></div>
                <div class="text-text-muted text-[10px] font-mono mt-0.5">设备 ID: {{ a.deviceId }}</div>
              </div>
            </div>
          </DsHudCard>
        </div>
      </div>

      <!-- ===== Right Panel ===== -->
      <div class="absolute top-0 right-0 bottom-0 z-10 w-[380px] flex flex-col overflow-hidden"
        style="backdrop-filter: blur(20px); background: rgba(11,14,23,0.88);">
        <div class="flex flex-col gap-3 p-4 overflow-y-auto flex-1">

          <!-- 活动统计 — 指标卡带 hover 效果 -->
          <DsHudCard title="无人机活动统计">
            <div class="grid grid-cols-3 gap-3">
              <div class="flex flex-col items-center p-4 rounded-xl bg-bg-surface/60 border border-border-default cursor-default transition-all duration-300 hover:bg-[rgba(56,189,248,0.08)] hover:border-[rgba(56,189,248,0.3)] hover:shadow-[0_0_16px_rgba(56,189,248,0.15)] hover:scale-[1.04]">
                <span class="text-text-muted text-[10px] mb-1">高峰时段</span>
                <span class="text-primary font-display text-2xl font-bold">{{ peakHour }}</span>
              </div>
              <div class="flex flex-col items-center p-4 rounded-xl bg-bg-surface/60 border border-border-default cursor-default transition-all duration-300 hover:bg-[rgba(56,189,248,0.08)] hover:border-[rgba(56,189,248,0.3)] hover:shadow-[0_0_16px_rgba(56,189,248,0.15)] hover:scale-[1.04]">
                <span class="text-text-muted text-[10px] mb-1">总活动量</span>
                <DsStatNumber :value="totalActivity" size="md" />
              </div>
              <div class="flex flex-col items-center p-4 rounded-xl bg-bg-surface/60 border border-border-default cursor-default transition-all duration-300 hover:bg-[rgba(56,189,248,0.08)] hover:border-[rgba(56,189,248,0.3)] hover:shadow-[0_0_16px_rgba(56,189,248,0.15)] hover:scale-[1.04]">
                <span class="text-text-muted text-[10px] mb-1">飞手数量</span>
                <DsStatNumber :value="pilotCount" size="md" />
              </div>
            </div>
          </DsHudCard>

          <!-- 活动趋势 -->
          <DsHudCard title="无人机活动趋势">
            <template #actions>
              <div class="flex bg-bg-elevated rounded-md p-0.5">
                <button class="text-[10px] px-2.5 py-1 rounded transition-colors"
                  :class="timeGranularity === 'hour' ? 'bg-primary text-text-inverse' : 'text-text-muted'"
                  @click="timeGranularity = 'hour'">小时</button>
                <button class="text-[10px] px-2.5 py-1 rounded transition-colors"
                  :class="timeGranularity === 'day' ? 'bg-primary text-text-inverse' : 'text-text-muted'"
                  @click="timeGranularity = 'day'">日</button>
              </div>
            </template>
            <DsChartCard title="" :option="trendChartOption" height="160px" class="border-0! bg-transparent!" />
          </DsHudCard>

          <!-- 实时起降（可滚动） -->
          <DsHudCard title="无人机实时起降">
            <template #actions>
              <div class="flex bg-bg-elevated rounded-md p-0.5">
                <button class="text-[10px] px-3 py-1 rounded transition-colors"
                  :class="realtimeTab === 'flying' ? 'bg-primary text-text-inverse' : 'text-text-muted'"
                  @click="realtimeTab = 'flying'">在飞</button>
                <button class="text-[10px] px-3 py-1 rounded transition-colors"
                  :class="realtimeTab === 'landed' ? 'bg-primary text-text-inverse' : 'text-text-muted'"
                  @click="realtimeTab = 'landed'">已降落</button>
              </div>
            </template>
            <div class="flex flex-col gap-0.5 max-h-[260px] overflow-y-auto pr-1 scrollbar-thin">
              <template v-if="realtimeTab === 'flying'">
                <div v-for="d in flyingDrones" :key="d.id"
                  class="p-3 rounded-lg bg-bg-surface/50 border border-border-default hover:bg-bg-hover transition-colors">
                  <div class="flex items-center justify-between mb-1">
                    <div class="flex items-center gap-2">
                      <DsGlowDot color="success" :size="5" />
                      <span class="text-text-primary text-xs">{{ d.time }}</span>
                    </div>
                    <span class="text-success text-[10px]">{{ d.duration }}</span>
                  </div>
                  <div class="text-text-secondary text-[11px]">操控者位置：<span class="text-info">{{ d.location }}</span></div>
                  <div class="text-text-muted text-[10px] font-mono mt-0.5">设备 ID: {{ d.id }}</div>
                </div>
              </template>
              <template v-else>
                <div v-for="d in landedDrones" :key="d.id"
                  class="p-3 rounded-lg bg-bg-surface/50 border border-border-default hover:bg-bg-hover transition-colors">
                  <div class="flex items-center justify-between mb-1">
                    <div class="flex items-center gap-2">
                      <DsToken label="已降落" type="info" />
                      <span class="text-text-primary text-xs">{{ d.time }}</span>
                    </div>
                    <span class="text-text-muted text-[10px] font-mono">{{ d.duration }}</span>
                  </div>
                  <div class="text-text-secondary text-[11px]">操控者位置：{{ d.location }}</div>
                  <div class="text-text-muted text-[10px] font-mono mt-0.5">设备 ID: {{ d.id }}</div>
                </div>
              </template>
            </div>
          </DsHudCard>
        </div>
      </div>

    </DsMapContainer>
    </div>
  </div>
</template>

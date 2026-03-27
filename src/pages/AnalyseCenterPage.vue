<script setup lang="ts">
import { ref, computed } from 'vue'
import { NButton } from 'naive-ui'
import DsGlassTabBar from '@/components/molecules/DsGlassTabBar.vue'
import type { TabItem } from '@/components/molecules/DsGlassTabBar.vue'
import DsMetricCard from '@/components/molecules/DsMetricCard.vue'
import DsHudTitle from '@/components/atoms/DsHudTitle.vue'
import DsChartCard from '@/components/organisms/DsChartCard.vue'
import DsTechRingChart from '@/components/molecules/DsTechRingChart.vue'
import DsTechPieChart from '@/components/molecules/DsTechPieChart.vue'
import DsTechBarChart from '@/components/molecules/DsTechBarChart.vue'
import DsTechTreeMap from '@/components/molecules/DsTechTreeMap.vue'
import DsFilterBar from '@/components/molecules/DsFilterBar.vue'
import { ZHEJIANG_CITIES, CITY_DISTRICTS } from '@/data/zhejiang-regions'
import type { EChartsOption } from 'echarts'

const activeTab = ref('trend')
const tabs: TabItem[] = [
  { label: '无人机活动趋势', value: 'trend' },
  { label: '违规记录统计', value: 'violation' },
]
const timeGranularity = ref<'hour' | 'day'>('hour')

// ========== 活动趋势 - 级联筛选 ==========
const filterValues = ref<Record<string, any>>({})
const selectedCity = computed(() => filterValues.value.city)
const districtOptions = computed(() =>
  selectedCity.value ? (CITY_DISTRICTS[selectedCity.value] ?? []) : [],
)

const trendFilters = computed(() => [
  { key: 'dateRange', label: '时间范围', type: 'date-range' as const, width: '280px' },
  { key: 'city', label: '城市', type: 'select' as const, placeholder: '全部城市', options: ZHEJIANG_CITIES, width: '160px' },
  { key: 'district', label: '行政区划', type: 'select' as const, placeholder: '请选择行政区划', options: districtOptions.value, width: '180px', disabled: !selectedCity.value },
])

function handleFilterChange(key: string, value: any) {
  filterValues.value[key] = value
  if (key === 'city') {
    filterValues.value.district = null
  }
}

// ========== 活动趋势 - 图表 ==========
const trendChartOption = computed<EChartsOption>(() => {
  const isHour = timeGranularity.value === 'hour'
  const categories = isHour
    ? Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`)
    : ['03/17', '03/18', '03/19', '03/20', '03/21', '03/22', '03/23']
  const data = isHour
    ? [280, 150, 80, 50, 35, 20, 180, 1200, 2500, 3200, 3800, 4500, 4600, 4988, 4800, 4600, 4200, 3500, 2800, 2000, 1400, 1100, 800, 450]
    : [12500, 12800, 13200, 11800, 12600, 12400, 11500]
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: 'rgba(56, 189, 248, 0.3)',
      textStyle: { color: '#E2E8F0', fontSize: 12 },
    },
    grid: { left: 60, right: 30, top: 30, bottom: 40 },
    xAxis: { type: 'category', data: categories, boundaryGap: false },
    yAxis: { type: 'value', name: '数量' },
    series: [{
      type: 'line',
      data,
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 6,
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(56,189,248,0.3)' },
            { offset: 1, color: 'rgba(56,189,248,0)' },
          ],
        },
      },
      lineStyle: { color: '#38BDF8', width: 2 },
      itemStyle: { color: '#38BDF8', borderColor: '#0F172A', borderWidth: 2 },
    }],
  }
})

// ========== 违规统计 - 筛选 ==========
const violationFilterValues = ref<Record<string, any>>({})
const violationSelectedCity = computed(() => violationFilterValues.value.city)
const violationDistrictOptions = computed(() =>
  violationSelectedCity.value ? (CITY_DISTRICTS[violationSelectedCity.value] ?? []) : [],
)

const violationFilters = computed(() => [
  { key: 'dateRange', label: '时间范围', type: 'date-range' as const, width: '280px' },
  { key: 'city', label: '城市', type: 'select' as const, placeholder: '全部城市', options: ZHEJIANG_CITIES, width: '160px' },
  { key: 'district', label: '行政区划', type: 'select' as const, placeholder: '请选择行政区划', options: violationDistrictOptions.value, width: '180px', disabled: !violationSelectedCity.value },
])

function handleViolationFilterChange(key: string, value: any) {
  violationFilterValues.value[key] = value
  if (key === 'city') {
    violationFilterValues.value.district = null
  }
}

// ========== 违规统计 - 图表 ==========
const violationAnalysisMode = ref<'time' | 'repeat'>('time')

const barChartOption = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    textStyle: { color: '#E2E8F0', fontSize: 12 },
  },
  grid: { left: 60, right: 30, top: 30, bottom: 40 },
  xAxis: {
    type: 'category',
    data: ['其他', '政府机构', '交通枢纽', '活动管控'],
  },
  yAxis: { type: 'value', name: '次数' },
  series: [{
    type: 'bar',
    data: [278000, 65000, 800, 200],
    barWidth: '40%',
    itemStyle: {
      color: {
        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: '#38BDF8' },
          { offset: 1, color: '#1D4ED8' },
        ],
      },
      borderRadius: [4, 4, 0, 0],
    },
  }],
}))

const violationTimeOption = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    textStyle: { color: '#E2E8F0', fontSize: 12 },
  },
  grid: { left: 60, right: 30, top: 30, bottom: 40 },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
  },
  yAxis: { type: 'value', name: '数量' },
  series: [{
    type: 'line',
    data: [120, 80, 50, 30, 20, 15, 200, 2500, 8000, 15000, 22000, 26000, 28000, 32000, 30000, 27000, 24000, 20000, 15000, 11000, 8000, 5000, 3000, 1500],
    smooth: true,
    showSymbol: true,
    symbol: 'circle',
    symbolSize: 6,
    areaStyle: {
      color: {
        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(96,165,250,0.3)' },
          { offset: 1, color: 'rgba(96,165,250,0)' },
        ],
      },
    },
    lineStyle: { color: '#60A5FA', width: 2 },
    itemStyle: { color: '#60A5FA', borderColor: '#0F172A', borderWidth: 2 },
  }],
}))

const violationRepeatOption = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    textStyle: { color: '#E2E8F0', fontSize: 12 },
  },
  grid: { left: 60, right: 30, top: 30, bottom: 80 },
  xAxis: {
    type: 'category',
    data: [
      'C69D9AB342186315E6118731',
      '81F392036I7FE0964BD2190E',
      '98640F7C00E7DAD0CB88210F',
      'D5BFDB8B7A454FAC9A9AB900',
      'BAF13FA88F0A4D6B3F02E397',
    ],
    axisLabel: { rotate: 30, fontSize: 10 },
  },
  yAxis: { type: 'value', name: '数量' },
  series: [{
    type: 'bar',
    data: [1150, 1020, 930, 790, 650],
    barWidth: '35%',
    itemStyle: {
      color: {
        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: '#38BDF8' },
          { offset: 1, color: '#60A5FA' },
        ],
      },
      borderRadius: [4, 4, 0, 0],
    },
  }],
}))

const violationDetailOption = computed<EChartsOption>(() =>
  violationAnalysisMode.value === 'time'
    ? violationTimeOption.value
    : violationRepeatOption.value,
)

// ========== 违规统计 - 飞手画像数据 ==========
const genderData = [
  { value: 87.2, name: '男' },
  { value: 9.8, name: '女' },
  { value: 3.0, name: '未知' },
]
const genderColors = ['#38BDF8', '#F472B6', '#94A3B8']

const droneTypeData = [
  { value: 165034, name: 'App控' },
  { value: 112966, name: '屏控' },
]
const droneTypeColors = ['#38BDF8', '#818CF8']

const ageData = [
  { name: '<20', value: 1200 },
  { name: '20-30', value: 8560 },
  { name: '30-40', value: 10240 },
  { name: '40-50', value: 4320 },
  { name: '>50', value: 1140 },
]

const residenceData = [
  { name: '杭州', value: 12500 },
  { name: '绍兴', value: 7800 },
  { name: '宁波', value: 4200 },
  { name: '嘉兴', value: 2500 },
  { name: '其他', value: 1400 },
]

// genderDistOption removed as we're using DsTechPieChart component

// ageDistOption removed as we're using DsTechBarChart component

// residenceDistOption removed in favor of DsTechTreeMap
</script>

<template>
  <div class="flex flex-col gap-0">
    <DsGlassTabBar v-model="activeTab" :tabs="tabs" />

    <div
      v-show="activeTab === 'trend'"
      class="flex flex-col gap-5 border border-[rgba(56,189,248,0.25)] rounded-b-xl rounded-tr-xl
             bg-[rgba(17,24,39,0.75)] backdrop-blur-md p-5"
    >
      <DsFilterBar :filters="trendFilters" @search="() => {}" @reset="() => {}" @change="handleFilterChange" />

      <!-- 指标卡片 -->
      <div class="grid grid-cols-4 gap-4">
        <DsMetricCard
          title="总活动量"
          description="一台无人机起飞+降落算一次完整活动"
          :value="86816"
          :trend="0"
          trendLabel="较去年同比"
        />
        <DsMetricCard
          title="飞手数量"
          description="本周期内飞行过的无人机的手机端去重总数"
          :value="25340"
          :trend="0"
          trendLabel="较去年同比"
        />
        <DsMetricCard
          title="平均飞行时长"
          description="单次飞行平均持续时间"
          :value="8.6"
          suffix="分钟"
          :decimals="1"
          :trend="0"
          trendLabel="较去年同比"
        />
        <DsMetricCard
          title="高峰时段"
          description="无人机活动最频繁的时间段"
          value="14:00"
          bottomText="4988架活跃"
        />
      </div>

      <!-- 趋势图 -->
      <DsChartCard title="无人机活动趋势" description="展示不同时间维度下的无人机活动数量" :option="trendChartOption" height="360px">

        <template #toolbar>
          <div class="flex bg-bg-elevated rounded-lg p-0.5">
            <NButton
              :type="timeGranularity === 'hour' ? 'primary' : 'default'"
              size="tiny"
              quaternary
              @click="timeGranularity = 'hour'"
            >小时</NButton>
            <NButton
              :type="timeGranularity === 'day' ? 'primary' : 'default'"
              size="tiny"
              quaternary
              @click="timeGranularity = 'day'"
            >日</NButton>
          </div>
        </template>
      </DsChartCard>
    </div>

    <div
      v-show="activeTab === 'violation'"
      class="flex flex-col gap-5 border border-[rgba(56,189,248,0.25)] rounded-b-xl rounded-tr-xl
             bg-[rgba(17,24,39,0.75)] backdrop-blur-md p-5"
    >
      <DsFilterBar :filters="violationFilters" @search="() => {}" @reset="() => {}" @change="handleViolationFilterChange" />

      <!-- 指标卡片 -->
      <div class="grid grid-cols-2 gap-4">
        <DsMetricCard
          title="预警总数"
          description="本周期内记录的预警总数"
          :value="344607"
          :trend="0"
          trendLabel="较去年同比"
        />
        <DsMetricCard
          title="高发区域类型"
          description="预警事件最集中的区域类型"
          value="其他"
          bottomText="占总预警的 80.66%"
        />
      </div>

      <!-- 图表区域 -->
      <div class="grid grid-cols-2 gap-4">
        <!-- 闯禁区域统计 -->
        <DsChartCard title="闯禁区域统计" description="各区域闯禁次数" :option="barChartOption" height="360px" />


        <!-- 违规详细分析 -->
        <DsChartCard title="违规详细分析" description="按时段和重复违规者分析" :option="violationDetailOption" height="360px">

          <template #toolbar>
            <div class="flex bg-bg-elevated rounded-lg p-0.5">
              <NButton
                :type="violationAnalysisMode === 'time' ? 'primary' : 'default'"
                size="tiny"
                quaternary
                @click="violationAnalysisMode = 'time'"
              >时段分析</NButton>
              <NButton
                :type="violationAnalysisMode === 'repeat' ? 'primary' : 'default'"
                size="tiny"
                quaternary
                @click="violationAnalysisMode = 'repeat'"
              >重复违规者</NButton>
            </div>
          </template>
        </DsChartCard>
      </div>

      <!-- 新增统计区域 -->
      <div class="grid grid-cols-4 gap-4">
        <!-- 无人机类型统计 -->
        <div class="col-span-1">
          <DsChartCard title="无人机类型统计" description="控制方式比例分析" height="400px" :option="{}">

            <div class="w-full h-[320px]">
              <DsTechRingChart 
                :data="droneTypeData" 
                :show-center="false"
                :colors="droneTypeColors"
              />
            </div>
          </DsChartCard>
        </div>

        <!-- 飞手画像分析 -->
        <div class="col-span-3 flex flex-col gap-0 border border-border-default rounded-xl bg-bg-surface overflow-hidden">
          <div class="px-5 pt-4 pb-2 border-b border-border-default/30 flex items-center justify-between">
            <div>
              <DsHudTitle text="飞手画像分析" />
              <p class="text-white text-xs mt-1">飞手性别、年龄、地域分布透视</p>

            </div>
          </div>
          <div class="grid grid-cols-3 gap-0 flex-1">
            <div class="p-2 border-r border-border-default/20">
              <p class="text-[13px] font-medium text-white text-center mb-1 drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]">性别分布</p>
              <div class="h-[240px]">
                <DsTechPieChart 
                  :data="genderData" 
                  title="性别分布" 
                  :colors="genderColors"
                />
              </div>
            </div>
            <div class="p-2 border-r border-border-default/20">
              <p class="text-[13px] font-medium text-white text-center mb-1 drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]">年龄分布</p>
              <div class="h-[240px]">
                <DsTechBarChart 
                  :data="ageData" 
                  color="#818CF8" 
                />
              </div>
            </div>
            <div class="p-2">
              <p class="text-[13px] font-medium text-white text-center mb-1 drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]">常驻地分布</p>
              <div class="h-[240px]">
                <DsTechTreeMap 
                  :data="residenceData" 
                  :colors="['#10B981', '#34D399', '#3B82F6', '#60A5FA', '#6366F1']" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

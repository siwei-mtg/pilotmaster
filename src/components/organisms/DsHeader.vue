<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import DsHeaderBrand from '@/components/molecules/DsHeaderBrand.vue'
import DsHeaderNavItem from '@/components/molecules/DsHeaderNavItem.vue'
import DsHeaderTimePanel from '@/components/molecules/DsHeaderTimePanel.vue'

const router = useRouter()
const route = useRoute()

const mainNav = [
  { key: 'realtime', label: '实时监控', path: '/realtime' },
  { key: 'history',  label: '历史记录', path: '/history' },
  { key: 'analysis', label: '分析中心', path: '/analysis' },
]

const toolNav = [
  { key: 'settings', label: '管理配置', path: '/settings' },
  { key: 'screen',   label: '飞手大屏', path: '/screen' },
]

const allNavItems = [...mainNav, ...toolNav]

const activeKey = computed(() =>
  allNavItems.find(i => route.path.startsWith(i.path))?.key ?? ''
)

function navigate(item: { path: string; external?: boolean }) {
  if (item.external) {
    window.open(router.resolve(item.path).href, '_blank')
  } else {
    router.push(item.path)
  }
}
</script>

<template>
  <header class="relative flex h-[72px] bg-[#03060D] w-full overflow-hidden text-sm border-b border-[#0A1A3A] select-none">
    
    <!-- Deep grid texture (Carbon-fiber/Electronic grid) -->
    <div class="absolute inset-0 pointer-events-none opacity-30" 
         style="background-image: linear-gradient(#0A1A3A 1px, transparent 1px), linear-gradient(90deg, #0A1A3A 1px, transparent 1px); background-size: 10px 10px;">
    </div>
    
    <!-- Fine scan-lines -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.06]"
         style="background-image: repeating-linear-gradient(0deg, transparent, transparent 1px, #00FFFF 2px, transparent 3px);">
    </div>

    <!-- Data-stream / light sweep -->
    <div class="absolute inset-0 pointer-events-none opacity-30">
      <div class="w-[200%] h-full bg-gradient-to-r from-transparent via-[rgba(0,255,255,0.05)] to-transparent animate-[shimmer_4s_infinite]"></div>
    </div>

    <!-- Pulsating neon base line across the right side -->
    <div class="absolute bottom-[2px] right-0 left-[340px] h-[2px] bg-cyan-400 opacity-80 shadow-[0_0_10px_2px_rgba(0,255,255,0.8)] animate-pulse">
      <div class="absolute top-1/2 left-[10px] w-[6px] h-[6px] bg-cyan-200 -translate-y-1/2 rotate-45 shadow-[0_0_8px_#00FFFF]"></div>
      <div class="absolute top-1/2 right-[240px] w-[6px] h-[6px] bg-cyan-200 -translate-y-1/2 rotate-45 shadow-[0_0_8px_#00FFFF]"></div>
      <div class="absolute top-1/2 right-[10px] w-2 h-4 bg-cyan-200 -translate-y-1/2 shadow-[0_0_8px_#00FFFF]"></div>
    </div>

    <!-- 1. Left Title Block (Molecule) -->
    <DsHeaderBrand />

    <!-- 2. Middle Nav Blocks Container -->
    <div class="relative z-20 flex flex-1 items-center h-full -ml-[12px] pl-6 gap-[10px]">
      <DsHeaderNavItem 
        v-for="item in allNavItems"
        :key="item.key"
        :label="item.label"
        :is-active="activeKey === item.key"
        @click="navigate(item)"
      />
    </div>

    <!-- 3. Far Right Time Area (Molecule) -->
    <DsHeaderTimePanel />

  </header>
</template>

<style scoped>
@keyframes shimmer {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}
</style>


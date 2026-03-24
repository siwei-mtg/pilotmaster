<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import DsIcon from '@/components/atoms/DsIcon.vue'

const router = useRouter()
const route = useRoute()
const collapsed = ref(false)

const menuItems = [
  { key: 'realTime', label: '实时监控', icon: 'lucide:radar', path: '/realtime' },
  { key: 'history', label: '历史记录', icon: 'lucide:history', path: '/history' },
  { key: 'analysis', label: '分析中心', icon: 'lucide:bar-chart-3', path: '/analysis' },
  { key: 'settings', label: '管理配置', icon: 'lucide:settings', path: '/settings' },
  { key: 'screen', label: '飞手大屏', icon: 'lucide:monitor', path: '/screen' },
]

const activeKey = computed(() => {
  const path = route.path
  return menuItems.find(item => path.startsWith(item.path))?.key ?? ''
})

function navigate(item: typeof menuItems[number]) {
  router.push(item.path)
}

function toggleCollapse() {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <aside
    class="relative flex flex-col h-full bg-bg-base border-r border-border-default transition-all duration-300 shrink-0"
    :style="{ width: collapsed ? '64px' : '200px' }"
  >
    <!-- Logo -->
    <div class="flex items-center h-14 px-4 gap-3 shrink-0">
      <DsIcon icon="lucide:plane" :size="24" color="var(--color-primary)" />
      <Transition name="fade-slide">
        <span v-if="!collapsed" class="text-base font-semibold text-text-primary whitespace-nowrap">飞手管家</span>
      </Transition>
    </div>

    <!-- Menu -->
    <nav class="flex-1 flex flex-col gap-1 px-2 mt-4">
      <button
        v-for="item in menuItems"
        :key="item.key"
        class="relative flex items-center gap-3 h-10 rounded-lg transition-colors"
        :class="[
          collapsed ? 'justify-center px-0' : 'px-3',
          activeKey === item.key
            ? 'bg-primary-dim text-primary'
            : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
        ]"
        @click="navigate(item)"
      >
        <!-- Active indicator -->
        <span
          v-if="activeKey === item.key"
          class="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-primary"
        />
        <DsIcon
          :icon="item.icon"
          :size="18"
          :color="activeKey === item.key ? 'var(--color-primary)' : undefined"
        />
        <Transition name="fade-slide">
          <span v-if="!collapsed" class="text-sm whitespace-nowrap">{{ item.label }}</span>
        </Transition>
      </button>
    </nav>

    <!-- Collapse toggle -->
    <button
      class="flex items-center justify-center h-10 mx-2 mb-3 rounded-lg text-text-muted hover:bg-bg-hover hover:text-text-secondary transition-colors"
      @click="toggleCollapse"
    >
      <DsIcon :icon="collapsed ? 'lucide:chevron-right' : 'lucide:chevron-left'" :size="16" />
    </button>
  </aside>
</template>

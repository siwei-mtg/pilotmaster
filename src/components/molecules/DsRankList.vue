<script setup lang="ts">
/**
 * DsRankList — 排名列表 Molecule
 * 展示 TOP N 排名数据，支持高亮前三名。
 * 遵循 atomic design：仅依赖 atoms，不依赖其他 molecules。
 */

export interface RankItem {
  label: string
  value: number
}

defineProps<{
  items: RankItem[]
  /** 值的后缀，如 "次"、"起" */
  suffix?: string
}>()

/** 前三名排名徽章的渐变背景 */
const rankBadgeBg: Record<number, string> = {
  1: 'linear-gradient(135deg, #22D3EE, #0891B2)',
  2: 'linear-gradient(135deg, #818CF8, #6366F1)',
  3: 'linear-gradient(135deg, #A855F7, #7C3AED)',
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <div
      v-for="(item, idx) in items"
      :key="idx"
      class="group/row flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300"
      :class="[
        idx < 3
          ? 'bg-[rgba(56,189,248,0.06)] border border-[rgba(56,189,248,0.12)] hover:bg-[rgba(56,189,248,0.12)] hover:border-[rgba(56,189,248,0.25)]'
          : 'bg-bg-surface/40 border border-transparent hover:bg-bg-surface/70 hover:border-border-default',
      ]"
    >
      <!-- 排名徽章 -->
      <div
        class="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold shrink-0 transition-transform duration-200 group-hover/row:scale-110"
        :style="idx < 3 ? { background: rankBadgeBg[idx + 1] } : {}"
        :class="idx < 3 ? 'text-white shadow-[0_0_8px_rgba(56,189,248,0.3)]' : 'bg-bg-elevated text-text-muted'"
      >
        {{ idx + 1 }}
      </div>

      <!-- 标签（ID / 名称） -->
      <span class="flex-1 min-w-0 text-xs font-mono truncate" :class="idx < 3 ? 'text-text-primary' : 'text-text-secondary'">
        {{ item.label }}
      </span>

      <!-- 数值 -->
      <span class="shrink-0 text-sm font-display font-bold tabular-nums" :class="idx < 3 ? 'text-primary' : 'text-text-primary'">
        {{ item.value.toLocaleString() }}
      </span>
      <span v-if="suffix" class="shrink-0 text-[10px] text-text-muted -ml-1">{{ suffix }}</span>
    </div>
  </div>
</template>

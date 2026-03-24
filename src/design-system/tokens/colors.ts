export const colors = {
  bgBase: '#0B0E17',
  bgSurface: '#111827',
  bgElevated: '#1A2235',
  bgHover: '#243049',
  bgActive: '#2D3A52',

  border: 'rgba(56, 189, 248, 0.12)',
  borderFocus: 'rgba(56, 189, 248, 0.40)',

  textPrimary: '#E2E8F0',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textInverse: '#0B0E17',

  primary: '#38BDF8',
  primaryHover: '#7DD3FC',
  primaryDim: 'rgba(56, 189, 248, 0.15)',

  success: '#34D399',
  warning: '#FBBF24',
  danger: '#F87171',
  info: '#60A5FA',

  glowCyan: 'rgba(56, 189, 248, 0.25)',
  glowOrange: 'rgba(251, 191, 36, 0.20)',
} as const

/**
 * 图表配色体系 — 深色科技风（蓝色主调）
 *
 * 设计原则：
 *   1. 主色调统一在蓝-青色域（Hue 190°–220°），保证科技感一致性
 *   2. 通过明度/饱和度区分系列，而非使用暖色（红/橙/黄）
 *   3. 辅助色（紫、青绿）同为冷色调，保证整体和谐
 *   4. 所有渐变方向统一为从上到下（y: 0→1），浅色在上、深色在下
 *
 * 使用方式：
 *   - 单系列图表：使用 chartColors.series[0] 或 chartColors.gradients.primary
 *   - 多系列图表：按顺序取 chartColors.series
 *   - 柱状图渐变：使用 chartColors.gradients 中预定义的渐变对
 *   - 面积图填充：使用 chartColors.area 中的透明渐变
 */
export const chartColors = {
  /** 图表系列色板 — 6色，蓝色主调冷色系 */
  series: [
    '#38BDF8', // 天青 — 主系列（与 primary 一致）
    '#60A5FA', // 钴蓝 — 第二系列
    '#818CF8', // 靛紫 — 第三系列
    '#34D399', // 青绿 — 第四系列（冷色辅助）
    '#7DD3FC', // 浅天青 — 第五系列
    '#A78BFA', // 薰衣草紫 — 第六系列
  ],

  /** 柱状图渐变对 [顶部色, 底部色] */
  gradients: {
    /** 主渐变 — 天青→钴蓝 */
    primary: ['#38BDF8', '#1D4ED8'] as const,
    /** 次渐变 — 钴蓝→靛紫 */
    secondary: ['#60A5FA', '#4338CA'] as const,
    /** 强调渐变 — 浅天青→天青 */
    accent: ['#7DD3FC', '#0284C7'] as const,
    /** 辅助渐变 — 青绿→深青 */
    teal: ['#34D399', '#0D9488'] as const,
  },

  /** 面积图填充透明渐变 */
  area: {
    primary: ['rgba(56,189,248,0.30)', 'rgba(56,189,248,0)'] as const,
    secondary: ['rgba(96,165,250,0.30)', 'rgba(96,165,250,0)'] as const,
    accent: ['rgba(125,211,252,0.25)', 'rgba(125,211,252,0)'] as const,
  },

  /** 语义色 — 用于特殊状态标注（不用于常规数据系列） */
  semantic: {
    positive: '#34D399',
    negative: '#F87171',
    neutral: '#94A3B8',
  },
} as const

# Design Tokens 指引文档 — 飞手管家 (Pilot Master)

> 本文档定义了“飞手管家”项目的全局设计 Token，旨在帮助开发者在 React 18 + TypeScript + Vite 环境中高效复用该项目的深色科技感视觉风格。

---

## 1. 技术栈推荐 (Target Stack)

为了完美复刻该设计风格，建议目标应用使用以下技术栈：

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS v4 (CSS-first 配置)
- **图表**: Apache ECharts
- **图标**: Lucide React (推荐) 或 @iconify/react

---

## 2. 颜色体系 (Color Palette)

项目采用**深色科技风**，以天青色为主色调，配合深蓝色背景层级。

### 2.1 品牌与基础色

| Token 名称 | 色值 | 用途 |
|------------|------|------|
| `--color-primary` | `#38BDF8` | 品牌主色 (天青)，用于按钮、高亮、选中态 |
| `--color-primary-hover` | `#7DD3FC` | 主色悬停态 |
| `--color-primary-dim` | `rgba(56, 189, 248, 0.15)` | 主色浅淡背景 |
| `--color-bg-base` | `#0B0E17` | 页面最底层背景 |
| `--color-bg-surface` | `#111827` | 卡片、面板背景 |
| `--color-bg-elevated` | `#1A2235` | 弹窗、悬浮层背景 |
| `--color-bg-hover` | `#243049` | 列表项/按钮悬停背景 |

### 2.2 语义状态

| Token 名称 | 色值 | 用途 |
|------------|------|------|
| `--color-success` | `#34D399` | 正常、完成、在线 |
| `--color-warning` | `#FBBF24` | 预警、待定 |
| `--color-danger` | `#F87171` | 错误、离线、告警 |
| `--color-info` | `#60A5FA` | 提示、常规信息 |

### 2.3 文字与边框

| Token 名称 | 色值 | 用途 |
|------------|------|------|
| `--color-text-primary` | `#E2E8F0` | 主要正文、标题 |
| `--color-text-secondary` | `#94A3B8` | 次要描述、标签 |
| `--color-text-muted` | `#64748B` | 禁用文字、占位符 |
| `--color-border-default` | `rgba(56, 189, 248, 0.12)` | 默认边框，带微光感 |
| `--color-border-focus` | `rgba(56, 189, 248, 0.40)` | 聚焦态边框 |

---

## 3. 图表配色 (ECharts Colors)

专门针对数据可视化设计的冷色系色板。

### 3.1 系列色 (Series)
`['#38BDF8', '#60A5FA', '#818CF8', '#34D399', '#7DD3FC', '#A78BFA']`

### 3.2 渐变配置 (Gradients)
- **Primary**: `['#38BDF8', '#1D4ED8']` (天青 → 钴蓝)
- **Secondary**: `['#60A5FA', '#4338CA']`

---

## 4. 字体与间距

### 4.1 字体 (Typography)
- **Body**: `Inter, "PingFang SC", "Microsoft YaHei", sans-serif`
- **Display (数字/标题)**: `"DIN Alternate", "Oswald", sans-serif`

### 4.2 尺寸 (Scale)
- **Spacing**: `xs: 4px, sm: 8px, md: 12px, lg: 16px, xl: 24px`
- **Radius**: `sm: 4px, md: 8px, lg: 12px` (卡片建议使用 12px)

---

## 5. 技术实现 (React 18 + Tailwind v4)

### 5.1 全局样式定义 (`src/index.css`)

```css
@import "tailwindcss";

@theme {
  /* Colors - 映射到 Tailwind 类 */
  --color-primary: #38BDF8;
  --color-primary-hover: #7DD3FC;
  --color-primary-dim: rgba(56, 189, 248, 0.15);
  
  --color-bg-base: #0B0E17;
  --color-bg-surface: #111827;
  --color-bg-elevated: #1A2235;
  
  --color-text-primary: #E2E8F0;
  --color-text-secondary: #94A3B8;
  --color-text-muted: #64748B;
  
  --color-success: #34D399;
  --color-warning: #FBBF24;
  --color-danger: #F87171;
  --color-info: #60A5FA;

  --color-border-default: rgba(56, 189, 248, 0.12);
  --color-border-focus: rgba(56, 189, 248, 0.40);

  /* Fonts */
  --font-sans: Inter, "PingFang SC", sans-serif;
  --font-display: "DIN Alternate", sans-serif;

  /* Shadows */
  --shadow-glow: 0 0 15px rgba(56, 189, 248, 0.15);
}

:root {
  background-color: var(--color-bg-base);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
}
```

### 5.2 基础卡片组件示例 (`src/components/TechCard.tsx`)

```tsx
import React from 'react';

interface TechCardProps {
  title: string;
  children: React.ReactNode;
}

export const TechCard: React.FC<TechCardProps> = ({ title, children }) => {
  return (
    <div className="bg-bg-surface border border-border-default rounded-lg p-4 shadow-glow hover:border-border-focus transition-colors">
      <h3 className="text-primary font-display text-lg mb-3 border-b border-border-default pb-2">
        {title}
      </h3>
      <div className="text-text-secondary">
        {children}
      </div>
    </div>
  );
};
```

### 5.3 状态组件工具 (`src/utils/status.ts`)

```ts
export const getStatusConfig = (status: 'active' | 'warning' | 'error' | 'idle') => {
  const configs = {
    active:  { color: 'text-success', bg: 'bg-success/10', label: '运行中' },
    warning: { color: 'text-warning', bg: 'bg-warning/10', label: '待观察' },
    error:   { color: 'text-danger',  bg: 'bg-danger/10',  label: '异常' },
    idle:    { color: 'text-text-muted', bg: 'bg-bg-elevated', label: '空闲' },
  };
  return configs[status];
};
```

---

## 6. 设计原则 (Design Principles)

1. **呼吸感**: 保持较大的间距 (`gap-4` 或更多)，避免界面拥挤。
2. **微光感**: 边框和阴影应带有淡淡的蓝色半透明度 (`border-default`)，模拟屏幕发光效果。
3. **冷色调优先**: ECharts 图表应优先使用 `CHART_COLORS.series` 中的冷色系。
4. **数字强调**: 关键数据指标建议使用 `font-display` (DIN Alternate) 以增强科技感。

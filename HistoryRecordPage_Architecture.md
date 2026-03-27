# HistoryRecordPage 架构文档

`HistoryRecordPage.vue` 是系统的历史数据查询中心，采用分页表格的形式展示“起降记录”和“预警记录”。

## 1. 组件构成

页面采用 **Atomic Design (原子设计)** 架构进行组件拆分：

### 1.1 模板组件 (Templates)
- **PageTableView**: 通用表格模板，集成了标题、描述、过滤器（Filters）、数据表格（Data Table）和分页器（Pagination）。

### 1.2 核心组件 (Organisms)
- **DsLocationMapModal**: 地图定位弹窗，用于点击“操控者位置”时，在弹出窗口中显示具体的地理位置坐标。

### 1.3 功能组件 (Molecules)
- **DsGlassTabBar**: 科技感玻璃质感的标签切换组件，用于在“起降记录”与“预警记录”之间切换。

### 1.4 原子组件 (Atoms)
- **DsToken**: 标签状态组件，用于展示“飞行状态”（在飞/已降落）和“预警等级”（高/中/低）。
- **DsDeviceId**: 设备ID展示组件，统一设备ID的视觉格式。
- **DsIcon**: 图标组件，用于位置标记图标展示。

---

## 2. 数据管理

页面数据主要分为两大部分：**起降记录** 和 **预警记录**，通过 `activeTab` 进行状态隔离。

### 2.1 局部响应式状态 (Reactive State)
- `activeTab`: `ref<'flight' | 'alert'>`，控制当前展示的业务模块。
- `showMapModal`: `ref<boolean>`，控制地图弹窗的显示与隐藏。
- `selectedFlight`: `ref<any>`，当前选中的记录数据（包含经纬度和位置描述），用于地图透传。

### 2.2 业务配置与数据 (Business Config & Data)
#### A. 起降记录 (Flight Records)
- **flightFilters**: 定义了设备ID、无人机SN、人机关联置信度、飞手溯源（手机号）、无人机类型、起飞/降落时间范围、飞行时长和飞行状态的筛选逻辑。
- **flightColumns**: 定义了表格列，包含序号、设备ID（渲染 `DsDeviceId`）、无人机SN、人机关联置信度（渲染 `DsToken`）、飞手溯源、无人机类型、时间、时长、位置（交互跳转）及状态。
- **Typography Consistency**: 序号、设备ID、SN、时间及等宽数值字段统一采用 `font-mono` 且大小一致。
- **flightData**: 内置的 Mock 数据，包含 8 条初始记录。

#### B. 预警记录 (Alert Records)
- **alertFilters**: 定义了设备ID、预警时间范围、禁飞区类型、预警类型及等级的筛选逻辑。
- **alertColumns**: 定义了表格列，包含序号、设备ID、时间、分类、位置及告警等级（渲染 `DsToken`）。
- **alertData**: 内置的 Mock 数据，包含 10 条典型的预警告警记录。

---

## 3. 核心交互逻辑

### 3.1 模块切换
- 用户点击 `DsGlassTabBar` 更改 `activeTab` 的值。
- 使用 `v-show` 指令对不同表格模块进行样式切换，保持非活跃模块的 DOM 状态（避免重新加载带来的损耗）。

### 3.2 地图联动 (Location Click)
- 在表格的“操控者位置”列中定义了点击事件 `handleLocationClick`。
- 点击时，将行数据中的 `pilotLocation`, `lat`, `lng` 存入 `selectedFlight`。
- 随后将 `showMapModal` 设为 `true`，触发 `DsLocationMapModal` 的展示。

### 3.3 单元格渲染 (Render Functions)
- 采用 Vue 的 `h()` 函数（VNode）进行单元格的动态渲染，以实现复杂原子组件（如 `DsDeviceId`, `DsToken`）的嵌入，保持了表格逻辑的灵活性。

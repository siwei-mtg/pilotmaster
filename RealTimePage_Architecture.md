# RealTimePage 架构文档

`RealTimePage.vue` 是系统的实时监控核心页面，采用 AMap (高德地图) 作为底座，集成了 KPI 趋势分析和实时预警流展示。

## 1. 组件构成

页面采用 **Atomic Design (原子设计)** 架构进行组件拆分：

### 1.1 核心组件 (Organisms)
- **DsMapContainer**: 地图容器组件，封装了 AMap 的初始化逻辑，通过 `@ready` 事件暴露地图实例。
- **DsAlertFeed**: 实时活动看板，展示右侧侧边栏的预警记录列表，支持点击定位功能。

### 1.2 功能组件 (Molecules)
- **DsMapOverlay**: 悬浮图层组件，用于在地图上层定位侧边栏（支持 `left`, `right` 中位置）。
- **DsTrendCard**: 趋势指标卡片，包含标题、数值、同比趋势以及小型 ECharts 折线图。
- **DsMapLayerControl**: [NEW] 地图图层开关控制器（HUD 风格），目前支持“禁飞区图层”的显隐切换。
- **DsMapInfoWindow**: [NEW] 地图信息窗体分子组件，支持展示设备 ID、无人机 SN（含置信度标签）以及状态，并提供“通知飞手”和“通知警员”操作。

---

## 2. 数据管理

### 2.1 外部 Mock 数据 (`@/mock/realtime`)
- **KPI 数据**:
  - `droneCount`: 正在飞行的无人机总数。
  - `alertCount`: 实时预警总数。
- **趋势数据**:
  - `droneTrendData`: 无人机数量的历史趋势数组。
  - `alertTrendData`: 预警数量的历史趋势数组。
  - `timeLabels`: 对应 X 轴的时间刻度标签。
- **业务记录**:
  - `mockAlerts`: 预警原始记录数组，包含经纬度 (`lat`, `lng`)、设备 ID (`deviceId`)、预警等级 (`level`) 等。
- **禁飞区数据 (`@/mock/nofly-zones`)**:
  - `mockNoFlyZones`: 包含多边形路径 (`path`) 和区域名称 (`name`) 的禁飞区配置列表。

### 2.2 内部 响应式状态 (Reactive State)
- `mapInstance`: `ref<any>`，保存高德地图实例，供后续调用地图 API（如平移、缩放）。
- `showNoflyLayer`: `ref<boolean>`，控制禁飞区图层（多边形+标签）的显隐状态，默认开启。

### 2.3 局部 状态变量 (Variables)
- `AMap`: 全局高德对象引用。
- `markers`: 存储当前地图上所有 `AMap.Marker` 实例，用于清理 and 管理。
- `noflyPolygons`: 存储禁飞区多边形 (`AMap.Polygon`) 实例集合。
- `noflyLabels`: 存储禁飞区名称文字标签 (`AMap.Text`) 实例集合。
- `infoWindow`: 全局唯一的 `AMap.InfoWindow` 实例，用于展示设备详情弹窗。

---

## 3. 核心交互逻辑

### 3.1 地图标记 (Markers)
- 遍历 `mockAlerts` 为每个预警点生成自定义 HTML Marker。
- 支持呼吸灯动画 (`ping`) 和 等级色彩区分（高、中、低）。

### 3.2 联动详情展示
- 点击右侧 `DsAlertFeed` 中的记录或点击地图 Marker 时，触发 `handleAlertClick`：
  1. 使用 Vue 的 `h()` 和 `render()` 函数将 `DsMapInfoWindow` 分子组件挂载到动态创建的 DOM 节点（传入最新的 `droneSn` 和 `confidence` 数据）。
  2. 将该 DOM 节点设为 `AMap.InfoWindow` 的内容并立即开启（已移除原有的飞入动画以提升交互响应速度）。

### 3.3 图层控制与渲染 (Layers)
- **禁飞区 (NFZ)**:
  - 绘制：基于 `path` 坐标数组生成 `AMap.Polygon`（红色实线边框 + 浅色填充）。
  - 标签：计算多边形包围盒中心 (`getBounds().getCenter()`)，动态渲染 `AMap.Text` 展示区域名称。
  - 响应：通过 `watch(showNoflyLayer)` 实时切换所有相关图层实例的 `show()` 和 `hide()` 状态。

### 3.4 生命周期管理
- 在 `onBeforeUnmount` 中显式关闭 `infoWindow`，防止组件销毁后残留 DOM。

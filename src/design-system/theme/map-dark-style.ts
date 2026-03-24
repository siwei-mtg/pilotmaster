// 高德地图深色样式配置
// 使用方式: new AMap.Map(container, { mapStyle: 'amap://styles/dark' })
// 如需自定义，可在高德地图自定义样式平台生成后替换此 styleId
export const mapDarkStyleId = 'amap://styles/dark'

// 禁飞区多边形样式
export const noFlyZoneStyle = {
  strokeColor: '#38BDF8',
  strokeWeight: 1,
  strokeOpacity: 0.8,
  fillColor: 'rgba(56, 189, 248, 0.08)',
  fillOpacity: 0.8,
}

// 无人机 Marker 样式
export const droneMarkerStyle = {
  color: '#38BDF8',
  size: 6,
  glowColor: 'rgba(56, 189, 248, 0.4)',
}

// 告警 Marker 样式
export const alertMarkerStyle = {
  color: '#F87171',
  size: 8,
  glowColor: 'rgba(248, 113, 113, 0.4)',
}

export const echartsDarkTheme = {
  backgroundColor: 'transparent',
  textStyle: { color: '#94A3B8', fontFamily: '"Inter","PingFang SC",sans-serif' },
  title: { textStyle: { color: '#E2E8F0' } },
  line: {
    itemStyle: { borderWidth: 2 },
    lineStyle: { width: 2 },
    symbolSize: 0,
    smooth: true,
  },
  categoryAxis: {
    axisLine: { lineStyle: { color: '#334155' } },
    axisTick: { show: false },
    axisLabel: { color: '#64748B', fontSize: 12 },
    splitLine: { lineStyle: { color: 'rgba(56,189,248,0.06)' } },
  },
  valueAxis: {
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#64748B', fontSize: 12 },
    splitLine: { lineStyle: { color: 'rgba(56,189,248,0.06)', type: 'dashed' as const } },
  },
  tooltip: {
    backgroundColor: '#1A2235',
    borderColor: 'rgba(56,189,248,0.20)',
    textStyle: { color: '#E2E8F0' },
  },
  color: ['#38BDF8', '#60A5FA', '#818CF8', '#34D399', '#7DD3FC', '#A78BFA'],
}

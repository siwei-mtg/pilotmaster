export interface AlertRecord {
  id: string | number
  deviceId: string
  time: string | number | Date
  type: string
  location: string
  level: 'high' | 'medium' | 'low'
  lat?: number
  lng?: number
}

export const droneCount = 31
export const alertCount = 5

export const droneTrendData = [18, 22, 25, 28, 30, 29, 31, 35, 33, 31]
export const alertTrendData = [4, 6, 5, 8, 7, 9, 10, 8, 6, 5]
export const timeLabels = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

export const mockAlerts: AlertRecord[] = [
  { id: 1, deviceId: 'EBE33C658AA5A96D3A47CDBD6DE54980', time: Date.now() - 15000, type: '闯入禁飞区', location: '西湖景区 三潭印月', level: 'high', lat: 30.237, lng: 120.147 },
  { id: 2, deviceId: '1F4A5930BCD8271038D82A2B1110AD3E', time: Date.now() - 60000, type: '超高飞行', location: '滨江区 华为杭州研究所', level: 'medium', lat: 30.187, lng: 120.207 },
  { id: 3, deviceId: 'A8B9C1D2E3F45A6B7C8D9E0F1A2B3C4D', time: Date.now() - 150000, type: '偏离航线', location: '钱江新城 市民中心', level: 'low', lat: 30.244, lng: 120.215 },
  { id: 4, deviceId: '5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B', time: Date.now() - 400000, type: '黑飞预警', location: '拱墅区 运河广场', level: 'high', lat: 30.318, lng: 120.142 },
  { id: 5, deviceId: '1234567890ABCDEF1234567890ABCDEF', time: Date.now() - 900000, type: '低电量告警', location: '余杭区 未来科技城', level: 'medium', lat: 30.284, lng: 119.998 },
  { id: 6, deviceId: 'FEDCBA0987654321FEDCBA0987654321', time: Date.now() - 1200000, type: '超速飞行', location: '下沙 大学城', level: 'low', lat: 30.308, lng: 120.368 },
  { id: 7, deviceId: '9876543210FEDCBA9876543210FEDCBA', time: Date.now() - 1500000, type: '严重偏离', location: '萧山区 奥体中心', level: 'high', lat: 30.228, lng: 120.225 },
  { id: 8, deviceId: '1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D', time: Date.now() - 1800000, type: '信号微弱', location: '西湖区 灵隐寺', level: 'medium', lat: 30.242, lng: 120.103 },
  { id: 9, deviceId: '7E8F9A0B1C2D3E4F5A6B7C8D9E0F1A2B', time: Date.now() - 2100000, type: '违规悬停', location: '上城区 湖滨银泰', level: 'low', lat: 30.256, lng: 120.163 },
  { id: 10, deviceId: '3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F', time: Date.now() - 2400000, type: '闯入禁飞区', location: '江干区 杭州东站', level: 'high', lat: 30.292, lng: 120.215 },
  { id: 11, deviceId: '9A0B1C2D3E4F5A6B7C8D9E0F1A2B3C4D', time: Date.now() - 2700000, type: '超高飞行', location: '滨江区 星光大道', level: 'medium', lat: 30.207, lng: 120.211 },
  { id: 12, deviceId: '5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B', time: Date.now() - 3000000, type: '电池故障', location: '西湖区 浙江大学', level: 'high', lat: 30.306, lng: 120.086 },
  { id: 13, deviceId: '1C2D3E4F5A6B7C8D9E0F1A2B3C4D5E6F', time: Date.now() - 3300000, type: '偏离航线', location: '拱墅区 银泰百货', level: 'low', lat: 30.322, lng: 120.162 },
  { id: 14, deviceId: '7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C2D', time: Date.now() - 3600000, type: '低电量告警', location: '萧山区 杭州南站', level: 'medium', lat: 30.165, lng: 120.279 },
  { id: 15, deviceId: '3E4F5A6B7C8D9E0F1A2B3C4D5E6F7A8B', time: Date.now() - 3900000, type: '非法改装', location: '上城区 吴山广场', level: 'high', lat: 30.241, lng: 120.168 },
  { id: 16, deviceId: '9C0D1E2F3A4B5C6D7E8F9A0B1C2D3E4F', time: Date.now() - 4200000, type: '信号丢失', location: '西湖区 断桥残雪', level: 'high', lat: 30.259, lng: 120.150 },
  { id: 17, deviceId: '5A6B7C8D9E0F1A2B3C4D5E6F7A8B9C0D', time: Date.now() - 4500000, type: '超速飞行', location: '余杭区 良渚文化村', level: 'medium', lat: 30.385, lng: 119.987 },
  { id: 18, deviceId: '1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6B', time: Date.now() - 4800000, type: '偏离航线', location: '临安区 青山湖', level: 'low', lat: 30.247, lng: 119.789 },
  { id: 19, deviceId: '7C8D9E0F1A2B3C4D5E6F7A8B9C0D1E2F', time: Date.now() - 5100000, type: '低空飞行', location: '钱塘新区 金沙湖', level: 'high', lat: 30.315, lng: 120.332 },
  { id: 20, deviceId: '3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D', time: Date.now() - 5400000, type: '电池温度过高', location: '富阳区 银泰百货', level: 'medium', lat: 30.053, lng: 119.947 }
]


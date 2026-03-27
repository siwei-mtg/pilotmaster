import type { AlertRecord } from '@/types/alert'
export type { AlertRecord }

export const droneCount = 31
export const alertCount = 5

export const droneTrendData = [18, 22, 25, 28, 30, 29, 31, 35, 33, 31]
export const alertTrendData = [4, 6, 5, 8, 7, 9, 10, 8, 6, 5]
export const timeLabels = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

export const mockAlerts: AlertRecord[] = [
  { id: 1, deviceId: 'EBE33C658AA5A96D3A47CDBD6DE54980', droneSn: '1581F49G012AB', confidence: 'high', time: Date.now() - 15000, type: '无人机闯入禁飞区', location: '杭州市西湖区西湖街道', level: 'high', lat: 30.237, lng: 120.147 },
  { id: 2, deviceId: '1F4A5930BCD8271038D82A2B1110AD3E', droneSn: '1581F49G012CD', confidence: 'low', time: Date.now() - 60000, type: '无人机闯入禁飞区', location: '杭州市滨江区西兴街道', level: 'high', lat: 30.187, lng: 120.207 },
  { id: 3, deviceId: 'A8B9C1D2E3F45A6B7C8D9E0F1A2B3C4D', droneSn: '1581F49G012EF', confidence: 'unknown', time: Date.now() - 150000, type: '无人机闯入禁飞区', location: '杭州市上城区四季青街道', level: 'high', lat: 30.244, lng: 120.215 },
  { id: 4, deviceId: '5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B', droneSn: '1581F49G012GH', confidence: 'high', time: Date.now() - 400000, type: '无人机闯入禁飞区', location: '杭州市拱墅区拱宸桥街道', level: 'high', lat: 30.318, lng: 120.142 },
  { id: 5, deviceId: '1234567890ABCDEF1234567890ABCDEF', droneSn: '1581F49G012IJ', confidence: 'low', time: Date.now() - 900000, type: '无人机闯入禁飞区', location: '杭州市余杭区五常街道', level: 'high', lat: 30.284, lng: 119.998 },
  { id: 6, deviceId: 'FEDCBA0987654321FEDCBA0987654321', droneSn: '1581F49G012KL', confidence: 'high', time: Date.now() - 1200000, type: '无人机闯入禁飞区', location: '杭州市钱塘区白杨街道', level: 'high', lat: 30.308, lng: 120.368 },
  { id: 7, deviceId: '9876543210FEDCBA9876543210FEDCBA', droneSn: '1581F49G012MN', confidence: 'high', time: Date.now() - 1500000, type: '无人机闯入禁飞区', location: '杭州市萧山区盈丰街道', level: 'high', lat: 30.228, lng: 120.225 },
  { id: 8, deviceId: '1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D', droneSn: '1581F49G012OP', confidence: 'low', time: Date.now() - 1800000, type: '无人机闯入禁飞区', location: '杭州市西湖区灵隐街道', level: 'high', lat: 30.242, lng: 120.103 },
  { id: 9, deviceId: '7E8F9A0B1C2D3E4F5A6B7C8D9E0F1A2B', droneSn: '1581F49G012QR', confidence: 'high', time: Date.now() - 2100000, type: '无人机闯入禁飞区', location: '杭州市上城区湖滨街道', level: 'high', lat: 30.256, lng: 120.163 },
  { id: 10, deviceId: '3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F', droneSn: '1581F49G012ST', confidence: 'high', time: Date.now() - 2400000, type: '无人机闯入禁飞区', location: '杭州市上城区笕桥街道', level: 'high', lat: 30.292, lng: 120.215 },
  { id: 11, deviceId: '9A0B1C2D3E4F5A6B7C8D9E0F1A2B3C4D', droneSn: '1581F49G012UV', confidence: 'low', time: Date.now() - 2700000, type: '无人机闯入禁飞区', location: '杭州市滨江区长河街道', level: 'high', lat: 30.207, lng: 120.211 },
  { id: 12, deviceId: '5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B', droneSn: '1581F49G012WX', confidence: 'high', time: Date.now() - 3000000, type: '无人机闯入禁飞区', location: '杭州市西湖区西湖街道', level: 'high', lat: 30.306, lng: 120.086 },
  { id: 13, deviceId: '1C2D3E4F5A6B7C8D9E0F1A2B3C4D5E6F', droneSn: '1581F49G012YZ', confidence: 'high', time: Date.now() - 3300000, type: '无人机闯入禁飞区', location: '杭州市拱墅区武林街道', level: 'high', lat: 30.322, lng: 120.162 },
  { id: 14, deviceId: '7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C2D', droneSn: '1581F49G01301', confidence: 'unknown', time: Date.now() - 3600000, type: '无人机闯入禁飞区', location: '杭州市萧山区新塘街道', level: 'high', lat: 30.165, lng: 120.279 },
  { id: 15, deviceId: '3E4F5A6B7C8D9E0F1A2B3C4D5E6F7A8B', droneSn: '1581F49G01302', confidence: 'high', time: Date.now() - 3900000, type: '无人机闯入禁飞区', location: '杭州市上城区清波街道', level: 'high', lat: 30.241, lng: 120.168 },
  { id: 16, deviceId: '9C0D1E2F3A4B5C6D7E8F9A0B1C2D3E4F', droneSn: '1581F49G01303', confidence: 'unknown', time: Date.now() - 4200000, type: '无人机闯入禁飞区', location: '杭州市西湖区北山街道', level: 'high', lat: 30.259, lng: 120.150 },
  { id: 17, deviceId: '5A6B7C8D9E0F1A2B3C4D5E6F7A8B9C0D', droneSn: '1581F49G01304', confidence: 'low', time: Date.now() - 4500000, type: '无人机闯入禁飞区', location: '杭州市余杭区良渚街道', level: 'high', lat: 30.385, lng: 119.987 },
  { id: 18, deviceId: '1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6B', droneSn: '1581F49G01305', confidence: 'high', time: Date.now() - 4800000, type: '无人机闯入禁飞区', location: '杭州市临安区锦城街道', level: 'high', lat: 30.247, lng: 119.789 },
  { id: 19, deviceId: '7C8D9E0F1A2B3C4D5E6F7A8B9C0D1E2F', droneSn: '1581F49G01306', confidence: 'high', time: Date.now() - 5100000, type: '无人机闯入禁飞区', location: '杭州市钱塘区下沙街道', level: 'high', lat: 30.315, lng: 120.332 },
  { id: 20, deviceId: '3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D', droneSn: '1581F49G01307', confidence: 'low', time: Date.now() - 5400000, type: '无人机闯入禁飞区', location: '杭州市富阳区富春街道', level: 'high', lat: 30.053, lng: 119.947 }
]


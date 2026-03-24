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

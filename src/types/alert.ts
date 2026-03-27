export interface AlertRecord {
  id: string | number
  deviceId: string
  droneSn: string
  confidence: 'high' | 'low' | 'unknown'
  time: string | number | Date
  type: string
  location: string
  level: 'high' | 'medium' | 'low'
  lat?: number
  lng?: number
}

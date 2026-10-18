export type OccupationRecord = {
  name: string
  sector: string
  score: number
  direction: 'Rising' | 'Stable' | 'Falling'
  status: string
  color: string
}

export type DemandPoint = {
  month: string
  demand: number | null
  forecast: number | null
  low: number | null
  high: number | null
}

export const demandData: DemandPoint[] = [
  { month: 'Jan 25', demand: 61, forecast: null, low: null, high: null },
  { month: 'Feb', demand: 64, forecast: null, low: null, high: null },
  { month: 'Mar', demand: 63, forecast: null, low: null, high: null },
  { month: 'Apr', demand: 68, forecast: null, low: null, high: null },
  { month: 'May', demand: 71, forecast: null, low: null, high: null },
  { month: 'Jun', demand: 73, forecast: null, low: null, high: null },
  { month: 'Jul', demand: null, forecast: 76, low: 71, high: 81 },
  { month: 'Aug', demand: null, forecast: 79, low: 72, high: 86 },
  { month: 'Sep', demand: null, forecast: 82, low: 73, high: 91 },
  { month: 'Oct', demand: null, forecast: 85, low: 74, high: 96 },
  { month: 'Nov', demand: null, forecast: 88, low: 75, high: 101 },
]

export const occupations: OccupationRecord[] = [
  { name: 'Solar PV Technician', sector: 'Renewable Energy', score: 92, direction: 'Rising', status: 'High priority', color: '#DC2626' },
  { name: 'Data Analyst', sector: 'IT & Services', score: 86, direction: 'Rising', status: 'Review required', color: '#D97706' },
  { name: 'Healthcare Assistant', sector: 'Healthcare', score: 78, direction: 'Rising', status: 'Medium priority', color: '#D97706' },
  { name: 'Machine Operator', sector: 'Manufacturing', score: 64, direction: 'Stable', status: 'Low priority', color: '#1D7A46' },
]

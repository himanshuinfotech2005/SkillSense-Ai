export type AnalysisState = {
  region: string
  sector: string
  occupation: string
  period: string
  horizon: string
  source: string
  trainingAssumption: number
  scenario: number
}

export type ComparabilityGates = {
  geography: boolean
  period: boolean
  occupation: boolean
  units: boolean
}

export type AnalysisMetrics = {
  demand: number
  forecast: number
  gapCases: number
  validatedCases: number
  evidenceQuality: number
  sourceFreshness: number
  mapping: number
  geographicCoverage: number
  mismatch: 'Aligned' | 'Review' | 'Not Comparable'
  gapScore: number | null
  demandTrend: 'Rising' | 'Stable' | 'Falling'
}

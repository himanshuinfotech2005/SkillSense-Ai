export type { AnalysisMetrics, AnalysisState, ComparabilityGates } from '@/types/analysis'
export { calculateMetrics } from '@/lib/analytics/metrics'
import type { AnalysisState, ComparabilityGates } from '@/types/analysis'

export const defaultAnalysisState: AnalysisState = { region: 'Maharashtra pilot', sector: 'All sectors', occupation: 'All occupations', period: 'Jan–Jun 2025', horizon: '6 months', source: 'All sources', trainingAssumption: 0.75, scenario: 1 }
export const defaultGates: ComparabilityGates = { geography: true, period: true, occupation: true, units: true }

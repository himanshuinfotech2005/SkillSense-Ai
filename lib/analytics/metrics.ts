import type { AnalysisMetrics, AnalysisState, ComparabilityGates } from '@/types/analysis'

const regionFactor: Record<string, number> = { 'Maharashtra pilot': 1, 'Karnataka pilot': 1.08, 'National view': 0.94 }
const sectorFactor: Record<string, number> = { 'All sectors': 1, 'IT & Services': 1.1, 'Renewable Energy': 1.16, Healthcare: 0.92, Manufacturing: 0.88 }
const occupationFactor: Record<string, number> = { 'All occupations': 1, 'Solar PV Technician': 1.16, 'Data Analyst': 1.08, 'Healthcare Assistant': 0.96 }

export function calculateMetrics(state: AnalysisState, gates: ComparabilityGates): AnalysisMetrics {
  const factor = (regionFactor[state.region] ?? 1) * (sectorFactor[state.sector] ?? 1) * (occupationFactor[state.occupation] ?? 1)
  const periodFactor = state.period === 'Jan–Dec 2024' ? 0.96 : state.period === 'Jul–Dec 2024' ? 0.91 : 1
  const demand = Math.round(73 * factor * periodFactor * state.scenario)
  const forecast = Math.round(demand + ({ '3 months': 4, '6 months': 10, '12 months': 17 }[state.horizon] ?? 10) * state.scenario)
  const seats = Math.max(1, Math.round(64 * state.trainingAssumption))
  const derivedGates = {
    ...gates,
    geography: state.geographyAlignment === 'Aligned' && gates.geography,
    period: state.period === state.trainingPeriod && gates.period,
    occupation: state.occupationMapping === 'Mapped' && gates.occupation,
    units: state.measurementUnits === 'Index vs seats' && gates.units,
  }
  const comparable = Object.values(derivedGates).every(Boolean)
  const gapScore = comparable ? Math.max(0, Math.round(((demand - seats) / demand) * 100)) : null
  const evidenceQuality = Math.max(35, Math.min(98, Math.round(76 * factor * (state.source === 'All sources' ? 1 : 1.08))))
  return { demand, forecast, gapCases: comparable ? Math.max(0, Math.round((demand - seats) / 3)) : 0, validatedCases: comparable ? Math.max(0, Math.round((demand - seats) / 5)) : 0, evidenceQuality, sourceFreshness: state.source === 'All sources' ? 68 : 86, mapping: state.occupation === 'All occupations' ? 84 : 96, geographicCoverage: state.region === 'National view' ? 92 : 52, mismatch: comparable ? (gapScore && gapScore > 20 ? 'Review' : 'Aligned') : 'Not Comparable', gapScore, demandTrend: forecast > demand + 5 ? 'Rising' : forecast < demand - 5 ? 'Falling' : 'Stable' }
}

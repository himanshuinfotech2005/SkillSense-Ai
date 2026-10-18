import { calculateMetrics, defaultAnalysisState, defaultGates, type AnalysisState } from './analysis'

const assert = (condition: boolean, message: string) => { if (!condition) throw new Error(message) }
const state = (overrides: Partial<AnalysisState> = {}): AnalysisState => ({ ...defaultAnalysisState, ...overrides })

const base = calculateMetrics(state(), defaultGates)
const higherDemand = calculateMetrics(state({ sector: 'Renewable Energy' }), defaultGates)
assert(higherDemand.demand > base.demand, 'sector changes must recalculate demand')
assert(calculateMetrics(state({ horizon: '12 months' }), defaultGates).forecast > base.forecast, 'horizon changes must recalculate forecast')
assert(calculateMetrics(state({ trainingAssumption: 0.5 }), defaultGates).gapCases > base.gapCases, 'training assumptions must recalculate gaps')
assert(calculateMetrics(state({ scenario: 1.15 }), defaultGates).forecast > base.forecast, 'scenario changes must recalculate forecast')
assert(calculateMetrics(state(), { ...defaultGates, period: false }).gapScore === null, 'failed period gate must suppress gap score')
assert(calculateMetrics(state(), { ...defaultGates, geography: false }).mismatch === 'Not Comparable', 'failed geography gate must mark not comparable')
console.log('analysis dependency tests passed')

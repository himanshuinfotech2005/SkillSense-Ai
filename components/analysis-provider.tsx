'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { calculateMetrics, defaultAnalysisState, defaultGates } from '@/lib/analysis'
import type { AnalysisMetrics, AnalysisState } from '@/types/analysis'

type AnalysisContextValue = {
  analysis: AnalysisState
  metrics: AnalysisMetrics
  updateAnalysis: <K extends keyof AnalysisState>(key: K, value: AnalysisState[K]) => void
  resetAnalysis: () => void
}

const AnalysisContext = createContext<AnalysisContextValue | null>(null)

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analysis, setAnalysis] = useState<AnalysisState>(() => {
    if (typeof window === 'undefined') return defaultAnalysisState
    try {
      const stored = window.localStorage.getItem('skillsense-analysis-state')
      return stored ? { ...defaultAnalysisState, ...JSON.parse(stored) } : defaultAnalysisState
    } catch {
      return defaultAnalysisState
    }
  })
  useEffect(() => {
    window.localStorage.setItem('skillsense-analysis-state', JSON.stringify(analysis))
  }, [analysis])
  const value = useMemo(() => ({
    analysis,
    metrics: calculateMetrics(analysis, defaultGates),
    updateAnalysis: (key: keyof AnalysisState, value: string | number) => setAnalysis(current => ({ ...current, [key]: value })),
    resetAnalysis: () => {
      setAnalysis(defaultAnalysisState)
      window.localStorage.removeItem('skillsense-analysis-state')
    },
  }), [analysis])
  return <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>
}

export function useAnalysis() {
  const context = useContext(AnalysisContext)
  if (!context) throw new Error('useAnalysis must be used inside AnalysisProvider')
  return context
}

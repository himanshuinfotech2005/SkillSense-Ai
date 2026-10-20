'use client'

import { useEffect, useMemo, useState } from 'react'
import { Filter, RotateCcw, X } from 'lucide-react'
import { useAnalysis } from '@/components/analysis-provider'
import { SelectControl } from '@/components/dashboard-primitives'
import { horizonOptions, occupationOptions, periodOptions, regionOptions, scenarioOptions, sectorOptions, sourceOptions, trainingOptions } from '@/lib/filters/filter-options'

function Controls({ compact = false, onReset }: { compact?: boolean; onReset: () => void }) {
  const { analysis, updateAnalysis } = useAnalysis()
  const occupations = useMemo(() => {
    if (analysis.sector === 'All sectors') return [...occupationOptions]

    const sectorOccupations = new Set(
      occupationOptions.filter((occupation) => occupation === 'All occupations'),
    )
    return [
      ...sectorOccupations,
      ...occupationOptions.filter((occupation) => occupation !== 'All occupations'),
    ]
  }, [analysis.sector])
  const updateSector = (value: string) => {
    updateAnalysis('sector', value)
    if (analysis.occupation !== 'All occupations') updateAnalysis('occupation', 'All occupations')
  }
  return <div className={`grid gap-3 ${compact ? 'grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8'}`}>
    <SelectControl label="Region" value={analysis.region} onChange={(value) => updateAnalysis('region', value)} options={[...regionOptions]} />
    <SelectControl label="Sector" value={analysis.sector} onChange={updateSector} options={[...sectorOptions]} />
    <SelectControl label="Occupation" value={analysis.occupation} onChange={(value) => updateAnalysis('occupation', value)} options={occupations} />
    <SelectControl label="Reporting period" value={analysis.period} onChange={(value) => updateAnalysis('period', value)} options={[...periodOptions]} />
    <SelectControl label="Forecast horizon" value={analysis.horizon} onChange={(value) => updateAnalysis('horizon', value)} options={[...horizonOptions]} />
    <SelectControl label="Data sources" value={analysis.source} onChange={(value) => updateAnalysis('source', value)} options={[...sourceOptions]} />
    <SelectControl label="Training capacity" value={`${Math.round((Number.isFinite(analysis.trainingAssumption) ? analysis.trainingAssumption : 0.8) * 100)}%`} onChange={(value) => { const parsed = Number.parseInt(value.replace('%', ''), 10); updateAnalysis('trainingAssumption', Number.isFinite(parsed) ? parsed / 100 : 0.8) }} options={trainingOptions.map((value) => `${value}%`)} />
    <SelectControl label="Demand scenario" value={`${Math.round(analysis.scenario * 100)}%`} onChange={(value) => { const parsed = Number.parseInt(value.replace('%', ''), 10); updateAnalysis('scenario', Number.isFinite(parsed) ? parsed / 100 : 1) }} options={scenarioOptions.map((value) => `${value}%`)} />
    <button onClick={onReset} className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 text-[11px] font-semibold text-[#0B3C5D] transition hover:border-[#328CC1] hover:bg-[#F5FAFD] xl:col-span-8"><RotateCcw className="size-3.5" />Reset filters</button>
  </div>
}

export function GlobalAnalysisFilters() {
  const { analysis, resetAnalysis } = useAnalysis()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 72)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <div className={`sticky top-[72px] z-30 mb-7 transition-all duration-300 ${scrolled ? 'py-1' : ''}`}>
    <div className={`hidden rounded-2xl border border-[#D9E2E8] bg-white shadow-[0_4px_18px_rgba(11,60,93,0.08)] transition-all duration-300 lg:block ${scrolled ? 'p-3' : 'p-5'}`}><div className={`flex items-center justify-between ${scrolled ? 'mb-2' : 'mb-4'}`}><div><p className="text-xs font-bold text-[#0B3C5D]">Global analysis context</p>{!scrolled && <p className="mt-1 text-[10px] text-slate-500">Shared across every workspace view</p>}</div><span className="rounded-full bg-[#EAF5EE] px-2.5 py-1 text-[10px] font-bold text-[#1D7A46]">LIVE</span></div><Controls onReset={resetAnalysis} /></div>
    <div className="rounded-xl border border-[#B9D5E3] bg-white p-3 shadow-[0_6px_20px_rgba(11,60,93,0.12)] lg:hidden"><div className="flex items-center justify-between gap-3"><div className="min-w-0"><p className="flex items-center gap-2 text-[11px] font-bold text-[#0B3C5D]"><Filter className="size-3.5" />{analysis.region}</p><p className="truncate text-[10px] text-slate-500">{analysis.occupation} · {analysis.period}</p></div><button onClick={() => setOpen(true)} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#0B3C5D] px-3 py-2 text-[11px] font-semibold text-white"><Filter className="size-3.5" />Filters</button></div></div>
    {open && <div className="fixed inset-0 z-50 bg-[#0B3C5D]/30 lg:hidden"><section role="dialog" aria-label="Global analysis filters" className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-base font-bold text-[#0B3C5D]">Global filters</h2><p className="text-xs text-slate-500">Changes update all pages</p></div><button aria-label="Close filters" onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-slate-100"><X className="size-5" /></button></div><Controls compact onReset={() => { resetAnalysis(); setOpen(false) }} /><button onClick={() => setOpen(false)} className="mt-4 w-full rounded-lg bg-[#0B3C5D] py-3 text-xs font-semibold text-white">Apply filters</button></section></div>}
  </div>
}

import type { ComponentType, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import type { LucideProps } from 'lucide-react'

type Icon = ComponentType<LucideProps>

export function SelectControl({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="flex min-w-[132px] flex-1 flex-col gap-1.5 text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-500">{label}<span className="relative"><select value={value} onChange={e => onChange(e.target.value)} className="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-[12px] font-medium normal-case tracking-normal text-slate-700 outline-none transition focus:border-[#328CC1] focus:ring-2 focus:ring-[#328CC1]/15">{options.map(option => <option key={option}>{option}</option>)}</select><ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 size-3.5 text-slate-400" /></span></label>
}

export function KpiCard({ icon: Icon, label, value, detail, tone = 'blue', note }: { icon: Icon; label: string; value: string; detail: string; tone?: 'blue' | 'green' | 'orange' | 'red'; note: string }) {
  const tones = { blue: 'bg-[#EAF3F8] text-[#328CC1]', green: 'bg-[#EAF5EE] text-[#1D7A46]', orange: 'bg-amber-50 text-amber-700', red: 'bg-red-50 text-red-600' }
  return <div className="group rounded-2xl border border-[#D9E2E8] bg-white p-5 shadow-[0_4px_18px_rgba(11,60,93,0.05)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(11,60,93,0.10)]"><div className="flex items-start justify-between"><div className={`flex size-8 items-center justify-center rounded-lg ${tones[tone]}`}><Icon className="size-4" /></div><span className="rounded-full bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500">{note}</span></div><p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p><p className="mt-1 text-xl font-bold tracking-tight text-[#1D2731]">{value}</p><p className="mt-1 text-[11px] text-slate-500">{detail}</p></div>
}

export function Panel({ title, subtitle, children, action }: { title: string; subtitle?: string; children: ReactNode; action?: ReactNode }) {
  return <section className="rounded-2xl border border-[#D9E2E8] bg-white shadow-[0_4px_18px_rgba(11,60,93,0.05)] transition-shadow duration-200 hover:shadow-[0_12px_30px_rgba(11,60,93,0.08)]"><div className="flex items-start justify-between border-b border-[#E8EEF2] px-5 py-5"><div><h2 className="text-sm font-bold text-[#1D2731]">{title}</h2>{subtitle && <p className="mt-1 text-[11px] text-slate-500">{subtitle}</p>}</div>{action}</div><div className="p-5 sm:p-6">{children}</div></section>
}

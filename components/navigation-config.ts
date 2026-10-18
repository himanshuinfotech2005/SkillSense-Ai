import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  Download,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  Search,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'

export type NavigationItem = readonly [label: string, icon: LucideIcon, path: string]

export type NavigationGroup = {
  label: string
  items: readonly NavigationItem[]
}

export const navigationGroups = [
  {
    label: 'WORKSPACE',
    items: [
      ['Dashboard', LayoutDashboard, '/dashboard'],
      ['Explore Labour Market', Search, '/explore'],
      ['Demand Forecasting', TrendingUp, '/forecasting'],
      ['Training Capacity', GraduationCap, '/training-capacity'],
      ['Skill Gap Analysis', Target, '/gap-analysis'],
      ['Recommendations', Sparkles, '/recommendations'],
      ['What-If Simulator', SlidersHorizontal, '/scenario-simulator'],
    ],
  },
  {
    label: 'INTELLIGENCE',
    items: [
      ['Evidence Centre', FileCheck2, '/evidence-centre'],
      ['Reports & Exports', Download, '/reports'],
    ],
  },
  {
    label: 'MANAGEMENT',
    items: [
      ['Administration', Settings2, '/admin'],
      ['Research & Methodology', BookOpen, '/researcher'],
    ],
  },
] as const satisfies readonly NavigationGroup[]

export const routeLabels = Object.fromEntries(
  navigationGroups.flatMap(({ items }) => items.map(([label, , path]) => [path, label])),
) as Record<string, string>

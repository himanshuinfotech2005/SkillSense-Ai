import SkillsenseDashboard from '@/components/skillsense-dashboard'
import { AnalysisProvider } from '@/components/analysis-provider'

export default function Home() {
  return <AnalysisProvider><SkillsenseDashboard /></AnalysisProvider>
}

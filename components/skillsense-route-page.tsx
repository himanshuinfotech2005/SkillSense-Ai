import SkillsenseDashboard from '@/components/skillsense-dashboard'
import type { SkillsensePage } from '@/components/skillsense-section-content'

export default function SkillsenseRoutePage({ page = 'dashboard' }: { page?: SkillsensePage }) {
  return <SkillsenseDashboard page={page} />
}

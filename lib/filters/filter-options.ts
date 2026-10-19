import { occupations } from '@/data/skillsense'

export const regionOptions = ['Maharashtra pilot', 'Karnataka pilot', 'National view'] as const
export const sectorOptions = ['All sectors', ...Array.from(new Set(occupations.map((item) => item.sector)))] as const
export const occupationOptions = ['All occupations', ...Array.from(new Set(occupations.map((item) => item.name)))] as const
export const periodOptions = ['Jan–Jun 2025', 'Jul–Dec 2024', 'Jan–Dec 2024', 'Jan–Jun 2024', 'Jul–Dec 2023', 'Jan–Dec 2023'] as const
export const horizonOptions = ['1 month', '2 months', '3 months', '6 months', '9 months', '12 months', '18 months', '24 months'] as const
export const sourceOptions = ['All sources', 'Official survey indicators', 'Employer/job-posting signals', 'Worker registration indicators', 'Training provider records', 'Course and qualification mappings'] as const
export const trainingOptions = [25, 50, 60, 75, 80, 90, 100, 110, 125, 150, 200] as const
export const scenarioOptions = [70, 80, 90, 95, 100, 105, 110, 115, 120, 130, 150] as const

export const filterLabels = { region: 'Region', sector: 'Sector', occupation: 'Occupation', period: 'Reporting period', horizon: 'Forecast horizon', source: 'Data sources', trainingAssumption: 'Training capacity', scenario: 'Demand scenario' } as const

import CaseStudiesIndex from '@/components/home/CaseStudiesIndex'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Case studies',
  description:
    'Finance automation case studies: invoice processing, month-end close, budget vs actuals, and cash-flow forecasting — with interactive n8n, KNIME, and Pi Agent workflows.',
  path: '/case-studies',
})

export default function CaseStudiesPage() {
  return <CaseStudiesIndex />
}

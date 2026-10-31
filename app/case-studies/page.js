import CaseStudiesIndex from '@/components/home/CaseStudiesIndex'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Finance process case studies',
  description:
    'Four finance process engagements for controllers: invoice intake, month-end close, budget vs actuals, and cash forecasting. Company names withheld.',
  path: '/case-studies',
})

export default function CaseStudiesPage() {
  return <CaseStudiesIndex />
}

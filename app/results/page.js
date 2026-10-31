import ResultsView from '@/components/results/ResultsView'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Measured finance process results',
  description:
    'Measured outcomes from four finance process engagements: invoice time, a 12-to-4 day close, Monday variance packs, and cash forecast accuracy.',
  path: '/results',
})

export default function ResultsPage() {
  return <ResultsView />
}

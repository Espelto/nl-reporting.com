import ResultsView from '@/components/results/ResultsView'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Results',
  description:
    'Measured outcomes from NL Reporting implementations: 93% faster AP, 12→4 day close, Monday 7am variance packs, 91% cash forecast accuracy.',
  path: '/results',
})

export default function ResultsPage() {
  return <ResultsView />
}

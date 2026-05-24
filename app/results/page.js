import MetricsDashboard from '@/components/MetricsDashboard'

export const metadata = {
  title: 'Results | NL Reporting',
}

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-dark-900">
      <div className="py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Results</h1>
        <p className="text-dark-300 text-lg max-w-2xl mx-auto">
          Real metrics from live implementations. No estimates.
        </p>
      </div>
      <div className="section-divider" />
      <MetricsDashboard />
    </main>
  )
}

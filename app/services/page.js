import ProblemSolution from '@/components/ProblemSolution'
import N8NWorkflow from '@/components/N8NWorkflow'

export const metadata = {
  title: 'Services | NL Reporting',
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-dark-900">
      <div className="py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Services</h1>
        <p className="text-dark-300 text-lg max-w-2xl mx-auto">
          End-to-end workflow automation and AI integration for finance and operations teams.
        </p>
      </div>
      <div className="section-divider" />
      <ProblemSolution />
      <div className="section-divider" />
      <N8NWorkflow />
    </main>
  )
}

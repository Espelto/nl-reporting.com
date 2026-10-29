import { SITE } from '@/lib/site'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Terms',
  description: 'Terms of use for the NL Reporting website.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-dark-900 px-4 py-16 md:py-24">
      <article className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms</h1>
        <p className="text-dark-400 text-sm mb-8">Last updated October 27, 2026</p>
        <div className="space-y-5 text-dark-300 text-sm leading-relaxed">
          <p>
            This website describes independent consulting services offered by {SITE.founder.name} under
            the name {SITE.name}. Content is for information. It is not legal, tax, or investment advice.
          </p>
          <h2 className="text-xl font-semibold text-white pt-2">Engagements</h2>
          <p>
            Paid work is governed by a written agreement. The 60-day ROI guarantee applies only when it
            is included in that agreement, with metrics defined before go-live.
          </p>
          <h2 className="text-xl font-semibold text-white pt-2">Case studies</h2>
          <p>
            Case studies describe implementations and measured outcomes. Company names are withheld.
            Figures are specific to those engagements and are not a promise of identical results.
          </p>
          <h2 className="text-xl font-semibold text-white pt-2">Contact</h2>
          <p>
            <a href={`mailto:${SITE.email}`} className="text-primary-400">{SITE.email}</a>
          </p>
        </div>
      </article>
    </main>
  )
}

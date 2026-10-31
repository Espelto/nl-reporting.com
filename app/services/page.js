import { Check } from 'lucide-react'
import Button from '@/components/Button'
import { FaqJsonLd } from '@/components/JsonLd'
import { SITE } from '@/lib/site'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Finance process retainer',
  description:
    'Finance process ownership for controllers and heads of finance: one workflow live in about four weeks, then a retainer. Invoice intake, close, variance, cash.',
  path: '/services',
})

const workflows = [
  {
    title: 'Invoice / AP intake',
    body: 'Inbox to posted bill, with exceptions in Slack instead of a shared mailbox. Typical when AP volume outgrew the intern-and-spreadsheet model.',
    points: ['Extract, validate, post', 'Vendor and PO checks', 'Human in the loop on exceptions'],
    href: '/case-studies/invoice-automation',
  },
  {
    title: 'Month-end close',
    body: 'Checklist, reconciliations, and status in one place so close is a system, not a war room. Typical when close still takes two calendar weeks.',
    points: ['Orchestrated close tasks', 'Recon packs on a schedule', 'Coverage through first close'],
    href: '/case-studies/month-end-close',
  },
  {
    title: 'Variance and cash',
    body: 'Monday packs from GL + budget, or a 13-week cash view that updates itself. Typical when FP&A still rebuilds the same workbook every cycle.',
    points: ['Budget vs actuals packs', 'Material variance commentary', 'Daily cash brief'],
    links: [
      { href: '/case-studies/budget-vs-actuals', label: 'Variance case study' },
      { href: '/case-studies/cash-flow-forecasting', label: 'Cash case study' },
    ],
  },
]

const included = [
  'Discovery on the process you actually run',
  'Production build on your data',
  'Pilot, training, and go-live',
  'Dedicated Slack channel',
  '2-hour response once you are a client',
  'Coverage through first close',
  'Monthly retainer to run and extend',
  'ROI metrics defined in writing',
]

const notAFit = [
  {
    title: 'Five simple Zaps',
    body: 'Zapier or Make is enough. I will say so.',
  },
  {
    title: 'Microsoft 365 shop',
    body: 'Procurement already paid for Power Automate. Use it.',
  },
  {
    title: 'Enterprise iPaaS bake-off',
    body: 'Workato, Boomi, Tray — longer sales cycle, different buyer. Not my first niche.',
  },
]

const faq = [
  {
    question: 'Who is this for?',
    answer:
      'A controller or head of finance with no IT bench, who has already outgrown spreadsheets and Zapier. The four workflows are invoice and AP intake, month-end close, variance packs, and cash.',
  },
  {
    question: 'What does the starting fee cover?',
    answer: `Engagements start around $${SITE.engagementStart.toLocaleString()} for the first process. That figure is the starting build fee, not a monthly rate. The first process typically ships in four weeks. The retainer is what follows: I keep the live work running and we add the next process.`,
  },
  {
    question: 'What is the difference between 24 hours and 2 hours?',
    answer:
      'A new inquiry gets a reply within 24 hours. That clock is the sales reply. Once you are a client, the support commitment is 2 hours.',
  },
  {
    question: 'When are you the wrong hire?',
    answer:
      'If five simple Zaps would do it, if the company is a Microsoft 365 shop that should use Power Automate, or if the buyer wants an enterprise iPaaS bake-off. I will say so.',
  },
  {
    question: 'Do you name the clients in the case studies?',
    answer:
      'Company names are withheld. The figures are from those engagements and are not a promise of the same result on yours. Each study states what was counted.',
  },
  {
    question: 'What happens in the 45 minutes?',
    answer:
      'You describe the process. I tell you what is automatable, what is not, and whether a retainer makes sense. No deck.',
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-dark-900 overflow-x-hidden">
      <FaqJsonLd questions={faq} />
      <section className="px-4 pt-16 pb-12 md:pt-24 bg-radial-fade">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4">
            Controllers and heads of finance · no IT bench
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Finance process ownership</h1>
          <p className="text-dark-300 text-lg leading-relaxed">
            {SITE.tagline} The first process typically ships in four weeks. Engagements start around {'$'}{SITE.engagementStart.toLocaleString()} for that build. The retainer is what follows — I watch
            it when it breaks and we add the next process.
          </p>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">When I am not the right fit</h2>
          <p className="text-dark-400 text-sm mb-6">
            Past spreadsheets and Zapier is the line. If a simpler tool already fits, I will say so.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {notAFit.map(item => (
              <article
                key={item.title}
                className="rounded-xl p-5 border border-white/[0.08] bg-white/[0.02]"
              >
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-dark-300 text-sm leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
          {workflows.map(o => (
            <article
              key={o.title}
              className="rounded-2xl p-6 border border-white/[0.08] bg-white/[0.03] flex flex-col"
            >
              <h2 className="text-xl font-bold mb-3">{o.title}</h2>
              <p className="text-dark-300 text-sm leading-relaxed mb-4 flex-1">{o.body}</p>
              <ul className="space-y-2 mb-5">
                {o.points.map(p => (
                  <li key={p} className="flex gap-2 text-sm text-dark-300">
                    <Check size={14} className="text-primary-400 mt-0.5 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2">
                {(o.links || [{ href: o.href, label: 'See a case study' }]).map(link => (
                  <Button key={link.href} href={link.href} variant="secondary" className="w-full text-sm py-3">
                    {link.label}
                  </Button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-3">What you are buying</h2>
            <p className="text-dark-300 text-sm leading-relaxed mb-4">
              Not a one-off workflow gig. Those race to the bottom. I stay on the system — failures,
              credentials, the next process — so it survives the first close and the one after that.
            </p>
            <p className="text-dark-400 text-sm leading-relaxed mb-6">
              I usually build on n8n. KNIME when the work is a reporting pipeline. A small on-prem
              agent when ledgers cannot leave the LAN. Those are means. The product is the process,
              still running after go-live. ROI metrics are defined in writing before the build.
            </p>
            <Button href="/contact">Request a process audit</Button>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {included.map(item => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-dark-200 rounded-lg px-3 py-2.5 bg-white/[0.03] border border-white/[0.06]"
              >
                <Check size={14} className="text-accent-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Questions</h2>
          <div className="space-y-6">
            {faq.map(item => (
              <div key={item.question}>
                <h3 className="font-semibold text-white mb-2">{item.question}</h3>
                <p className="text-dark-300 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto rounded-2xl p-8 md:p-10 border border-primary-500/25 bg-primary-500/[0.08] text-center">
          <h2 className="text-2xl font-bold mb-3">Start with the process</h2>
          <p className="text-dark-300 mb-6">
            Describe the workflow. I will tell you what is automatable, what is not, and whether a
            retainer makes sense. 45 minutes. No deck. Reply within {SITE.replyHours} hours.
          </p>
          <Button href="/contact">Request a process audit</Button>
        </div>
      </section>
    </main>
  )
}

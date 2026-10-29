import { Check } from 'lucide-react'
import Button from '@/components/Button'
import { SITE } from '@/lib/site'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Services',
  description:
    'Finance process ownership on a retainer: ship one painful workflow, keep it running, then add the next. Invoice intake, close, variance, cash.',
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
    href: '/case-studies/budget-vs-actuals',
  },
]

const included = [
  'Discovery on the process you actually run',
  'Production build on your data',
  'Pilot, training, and go-live',
  'Dedicated Slack channel',
  '2-hour response commitment',
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

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-dark-900 overflow-x-hidden">
      <section className="px-4 pt-16 pb-12 md:pt-24 bg-radial-fade">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4">
            How I work
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">I own the process, not a platform</h1>
          <p className="text-dark-300 text-lg leading-relaxed">
            You hire me to take one painful finance workflow live and keep it running. The first one
            typically ships in four weeks. After that, a retainer: I watch it when it breaks and we
            add the next process. Engagements typically start around $
            {SITE.engagementStart.toLocaleString()}.
          </p>
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
              <Button href={o.href} variant="secondary" className="w-full text-sm py-3">
                See a case study
              </Button>
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
              agent when ledgers cannot leave the LAN. The skill is the APIs your team already lives
              in. The canvas is just the current interface.
            </p>
            <Button href="/contact">Request a scoped proposal</Button>
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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">When I am not the right fit</h2>
          <p className="text-dark-400 text-sm mb-6">
            I will tell you. Fighting the simpler tool is a waste of both of our time.
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

      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto rounded-2xl p-8 md:p-10 border border-primary-500/25 bg-primary-500/[0.08] text-center">
          <h2 className="text-2xl font-bold mb-3">Start with the process</h2>
          <p className="text-dark-300 mb-6">
            Describe the workflow. I will tell you what is automatable, what is not, and whether a
            retainer makes sense.
          </p>
          <Button href="/contact">Get in touch</Button>
        </div>
      </section>
    </main>
  )
}

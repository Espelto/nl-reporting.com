import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'
import LinkedInIcon from '@/components/LinkedInIcon'
import Button from '@/components/Button'
import { SITE } from '@/lib/site'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'About',
  description: `Alexey Kobzev is an FP&A operator who takes a painful finance process live and keeps it running. Based in New Jersey.`,
  path: '/about',
})

const timeline = [
  {
    years: '2013 — 2015',
    title: 'Financial analyst',
    place: 'Large infrastructure operator',
    detail:
      'Designed KPI policy, unified 15 management-accounting sources, and presented evaluation methods across departments.',
  },
  {
    years: '2016 — 2019',
    title: 'Senior financial analyst',
    place: 'Hospitality & real estate',
    detail:
      'Monthly reporting for ownership, budgets and reforecasts across 7 hotels and 50+ residential properties, plus energy-cost scenario models.',
  },
  {
    years: '2019 — present',
    title: 'FP&A leadership',
    place: 'Enterprise telecom',
    detail:
      'Business cases for product launches, Anaplan planning for 100+ users, labor planning, cash flow, EBITDA and margin analysis, KPI reporting to VPs.',
  },
  {
    years: 'NL Reporting',
    title: 'Independent practice',
    place: 'Finance automation',
    detail:
      'A small number of retainers: ship one finance workflow, stay on it after go-live, add the next process.',
  },
]

const stack = [
  'n8n',
  'KNIME',
  'Anaplan',
  'On-prem LLM agents',
  'Claude / structured extraction',
  'QuickBooks Online',
  'NetSuite',
  'Plaid',
  'Google Sheets',
  'Slack',
  'Next.js',
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-dark-900 overflow-x-hidden">
      <section className="px-4 pt-16 pb-12 md:pt-24 bg-radial-fade">
        <div className="max-w-3xl mx-auto">
          <p className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4">About</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{SITE.founder.name}</h1>
          <p className="text-xl text-dark-300 mb-6">{SITE.founder.title}</p>
          <div className="flex flex-wrap gap-4 text-sm text-dark-400 mb-8">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} /> {SITE.founder.location}
            </span>
            <a
              href={SITE.founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-primary-300"
            >
              <LinkedInIcon size={14} /> linkedin.com/in/{SITE.founder.linkedinHandle}
            </a>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-1.5 hover:text-primary-300">
              <Mail size={14} /> {SITE.email}
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact">Work with me</Button>
            <Button href={SITE.founder.linkedin} variant="secondary" external>
              LinkedIn profile
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-5 text-dark-300 leading-relaxed">
          <p>
            I am an FP&A operator. Forecasting, cash, labor, close, and variance packs are the work I have
            done for more than a decade — not slides I learned in a certification.
          </p>
          <p>
            NL Reporting is how I take that experience and own a process for teams that do not have an
            IT bench: ship the first workflow, watch it when it breaks, add the next one on a retainer.
            The platform is the vehicle. The outcome is the product.
          </p>
          <p>
            I currently lead FP&A work in enterprise telecom. Through NL Reporting I take a small number of
            outside engagements so I can stay close to each build after go-live. I usually build on n8n;
            KNIME when the work is a reporting pipeline; an on-prem agent when ledgers cannot leave the LAN.
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Background</h2>
          <ol className="space-y-6">
            {timeline.map(item => (
              <li key={item.years} className="grid sm:grid-cols-[9rem_1fr] gap-2 sm:gap-6">
                <p className="text-primary-400 text-sm font-semibold pt-0.5">{item.years}</p>
                <div>
                  <p className="font-semibold text-white">
                    {item.title}
                    <span className="text-dark-400 font-normal"> · {item.place}</span>
                  </p>
                  <p className="text-dark-300 text-sm mt-1 leading-relaxed">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">How I work</h2>
          <ul className="space-y-3 text-dark-300 text-sm leading-relaxed">
            <li className="flex gap-3">
              <span className="text-primary-400">1.</span>
              Map the real process, including the exceptions everyone skips on the discovery call.
            </li>
            <li className="flex gap-3">
              <span className="text-primary-400">2.</span>
              Build on the stack that fits the environment — not the one that is fashionable this quarter.
            </li>
            <li className="flex gap-3">
              <span className="text-primary-400">3.</span>
              Pilot on live data, then stay on Slack through the first close so the system survives contact with month-end.
            </li>
          </ul>
          <p className="mt-6">
            <Link href="/services" className="text-primary-400 hover:text-primary-300 text-sm font-semibold">
              See services and engagement shape →
            </Link>
          </p>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Stack</h2>
          <ul className="flex flex-wrap gap-2">
            {stack.map(item => (
              <li
                key={item}
                className="text-xs px-3 py-1.5 rounded-full text-dark-200 border border-white/10 bg-white/[0.04]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

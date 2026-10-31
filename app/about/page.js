import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'
import LinkedInIcon from '@/components/LinkedInIcon'
import Button from '@/components/Button'
import { SITE } from '@/lib/site'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'About Alexey Kobzev',
  description:
    'Alexey Kobzev is an FP&A operator who takes one finance process live for controllers and heads of finance, then stays on it. Based in New Jersey.',
  path: '/about',
})

const rules = [
  {
    title: 'Exceptions before the happy path',
    body: 'Map the cases everyone skips on the discovery call before writing the straight-through path.',
  },
  {
    title: 'The success metric is written first',
    body: 'Hours, days, or accuracy — defined in writing, with a baseline, before the build starts.',
  },
  {
    title: 'I stay through the first close',
    body: 'Go-live is not the handoff. I am on Slack when the system meets month-end.',
  },
]

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
    place: 'Finance process ownership',
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
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-dark-900 overflow-x-hidden">
      <section className="px-4 pt-16 pb-12 md:pt-24 bg-radial-fade">
        <div className="max-w-3xl mx-auto">
          <p className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4">About</p>
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 bg-primary-500/15 flex items-center justify-center shrink-0">
              {SITE.founder.photo ? (
                <img
                  src={SITE.founder.photo}
                  alt={SITE.founder.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg font-bold text-primary-300" aria-hidden="true">
                  AK
                </span>
              )}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{SITE.founder.name}</h1>
              <p className="text-xl text-dark-300 mt-1">{SITE.founder.title}</p>
            </div>
          </div>
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
            <Button href="/contact">Request a process audit</Button>
            <Button href={SITE.founder.linkedin} variant="secondary" external>
              LinkedIn profile
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-5 text-dark-300 leading-relaxed">
          <p>
            Finance workflows die after go-live. The person who built them has moved on, the first
            exception is nobody’s job, and the team is back in the spreadsheet by the next close.
          </p>
          <p>
            I take one process for a controller or head of finance who has no IT bench and has already
            outgrown spreadsheets and Zapier. I ship it, I stay on it, and the retainer is how the next
            process gets added. I still lead FP&A work in enterprise telecom. That is why the roster stays
            small, and why I can still be on the first close.
          </p>
          <p>
            Forecasting, cash, labor, close, and variance packs are the work I have done for more than a
            decade. The tool — n8n, KNIME, or an on-prem agent — is a choice about where the data is
            allowed to live. It is not the product.
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">How I work</h2>
          <ol className="space-y-5">
            {rules.map((rule, i) => (
              <li key={rule.title} className="flex gap-4">
                <span className="text-primary-400 font-semibold pt-0.5">{i + 1}.</span>
                <div>
                  <p className="font-semibold text-white">{rule.title}</p>
                  <p className="text-dark-300 text-sm mt-1 leading-relaxed">{rule.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6">
            <Link href="/services" className="text-primary-400 hover:text-primary-300 text-sm font-semibold">
              See services and engagement shape →
            </Link>
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Background</h2>
          <p className="text-dark-400 text-sm mb-6">
            Operating experience. Employer names stay at the level below.
          </p>
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

      <section className="px-4 pb-20 pt-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Tools, one layer down</h2>
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

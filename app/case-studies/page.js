'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const caseStudies = [
  {
    title: 'Invoice processing automation',
    context: 'B2B SaaS · ~200 invoices/month',
    metric: '93% faster',
    sub: '140h/month freed · $7k saved',
    tags: ['N8N', 'Claude AI', 'QuickBooks'],
    slug: 'invoice-automation',
    featured: true,
  },
  {
    title: 'Month-end close',
    context: 'Series B SaaS · 3-person accounting team',
    metric: '12 → 4 days',
    sub: 'Zero weekend close work since go-live',
    tags: ['N8N', 'Plaid', 'Slack', 'Notion'],
    slug: 'month-end-close',
  },
  {
    title: 'Budget vs actuals',
    context: 'Mid-market SaaS · 12 departments',
    metric: 'Monday 7am',
    sub: 'Reports ready before leadership meets',
    tags: ['N8N', 'NetSuite', 'SendGrid'],
    slug: 'budget-vs-actuals',
  },
  {
    title: 'Cash flow forecasting',
    context: 'E-commerce · CFO + 1 analyst',
    metric: '91% accuracy',
    sub: 'Daily forecast · 2 crises avoided in Q1',
    tags: ['N8N', 'Plaid', 'Bill.com', 'Gusto'],
    slug: 'cash-flow-forecasting',
  },
]

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-dark-900 overflow-x-hidden pb-16">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-24 px-4 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Case studies</h1>
        <p className="text-dark-300 max-w-2xl mx-auto text-lg">
          Deep dives with interactive workflow previews, technical detail, and measured results.
        </p>
      </motion.section>

      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto grid gap-6">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={`/case-studies/${study.slug}`}>
                <article
                  className="rounded-xl p-6 md:p-8 group transition-all"
                  style={{
                    background: study.featured ? 'rgba(26,123,174,0.06)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${study.featured ? 'rgba(26,123,174,0.25)' : 'rgba(255,255,255,0.08)'}`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(26,123,174,0.45)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = study.featured
                      ? 'rgba(26,123,174,0.25)'
                      : 'rgba(255,255,255,0.08)'
                  }}
                >
                  {study.featured && (
                    <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider mb-2 block">
                      Featured · Interactive workflow
                    </span>
                  )}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {study.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full text-dark-400"
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{study.title}</h2>
                  <p className="text-dark-400 text-sm mb-4">{study.context}</p>
                  <div className="flex flex-wrap items-baseline gap-4 mb-3">
                    <span className="text-3xl font-bold text-primary-400">{study.metric}</span>
                    <span className="text-dark-300 text-sm">{study.sub}</span>
                  </div>
                  <span className="text-primary-400 text-sm group-hover:text-primary-300 transition-colors">
                    Read case study →
                  </span>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="px-4 text-center pb-8">
        <Link href="/" className="text-primary-400 hover:text-primary-300 text-sm transition-colors">
          ← Back to home
        </Link>
      </div>
    </main>
  )
}

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const studies = [
  {
    href: '/case-studies/invoice-automation',
    platform: 'n8n',
    title: 'Invoice processing',
    metric: '93% faster',
    detail: '45 min → 3 min per invoice · 140 hours/month returned',
  },
  {
    href: '/case-studies/month-end-close',
    platform: 'n8n',
    title: 'Month-end close',
    metric: '12 → 4 days',
    detail: 'Reconciliations, journals, and Slack exceptions on a 3-person team',
  },
  {
    href: '/case-studies/budget-vs-actuals',
    platform: 'KNIME',
    title: 'Budget vs actuals',
    metric: 'Monday 7am',
    detail: 'Sunday-night variance pack with commentary · 8 analyst hours/week freed',
  },
  {
    href: '/case-studies/cash-flow-forecasting',
    platform: 'Pi Agent',
    title: 'Cash flow forecast',
    metric: '91% accuracy',
    detail: 'Daily 13-week model from four live sources · 4h → 20 min',
  },
]

export default function SelectedWork() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <span className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
              If you want the proof
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Four processes, shipped</h2>
          </div>
          <Link
            href="/case-studies"
            className="text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors"
          >
            All case studies →
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {studies.map((s, i) => (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={s.href} className="block h-full group">
                <article className="h-full rounded-xl p-6 border border-white/[0.08] bg-white/[0.03] hover:border-primary-500/40 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-200 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-2xl font-bold text-primary-400 mb-2">{s.metric}</p>
                  <p className="text-dark-400 text-sm leading-relaxed mb-3">{s.detail}</p>
                  <p className="text-dark-500 text-xs">{s.platform}</p>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

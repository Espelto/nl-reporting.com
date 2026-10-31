'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Button from '@/components/Button'

const headline = [
  { value: '8–45→3', label: 'minutes per invoice', href: '/case-studies/invoice-automation' },
  { value: '12→4', label: 'day close cycle', href: '/case-studies/month-end-close' },
  { value: '8h/wk', label: 'analyst rebuild returned', href: '/case-studies/budget-vs-actuals' },
  { value: '91%', label: 'cash forecast accuracy', href: '/case-studies/cash-flow-forecasting' },
]

const rows = [
  {
    name: 'Invoice automation',
    platform: 'n8n',
    before: '8–45 min / invoice',
    after: '3 min, with review',
    impact: '140h → ~8h / month',
    href: '/case-studies/invoice-automation',
  },
  {
    name: 'Month-end close',
    platform: 'n8n',
    before: '12-day close',
    after: '4-day close',
    impact: '$36k / year',
    href: '/case-studies/month-end-close',
  },
  {
    name: 'Budget vs actuals',
    platform: 'KNIME',
    before: 'Tue/Wed delivery',
    after: 'Monday 7am pack',
    impact: '8h / week',
    href: '/case-studies/budget-vs-actuals',
  },
  {
    name: 'Cash flow forecast',
    platform: 'Pi Agent',
    before: '4h weekly, 68% accurate',
    after: '20 min, 91% accurate',
    impact: 'Daily 13-week model',
    href: '/case-studies/cash-flow-forecasting',
  },
]

const timeData = [
  { name: 'Before', minutes: 45 },
  { name: 'After', minutes: 3 },
]

const closeData = [
  { name: 'Before', days: 12 },
  { name: 'After', days: 4 },
]

const tooltipStyle = {
  background: '#0c2233',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  fontSize: 12,
}

export default function ResultsView() {
  return (
    <main className="min-h-screen bg-dark-900 overflow-x-hidden">
      <section className="px-4 pt-16 pb-10 md:pt-24 text-center bg-radial-fade">
        <div className="max-w-3xl mx-auto">
          <p className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4">Results</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Measured finance process results</h1>
          <p className="text-dark-300 text-lg">
            Numbers below come from the four case studies on this site — not blended marketing averages.
          </p>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {headline.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={m.href}
                className="block rounded-xl p-5 border border-white/[0.08] bg-white/[0.03] hover:border-primary-500/40 transition-colors h-full"
              >
                <p className="text-3xl font-bold text-primary-400 mb-1">{m.value}</p>
                <p className="text-dark-400 text-xs">{m.label}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 border border-white/[0.08] bg-white/[0.03]">
            <h2 className="font-semibold mb-1">AP processing time</h2>
            <p className="text-dark-400 text-xs mb-4">
              Minutes per invoice. The before bar is the multi-line manual time. Simple bills were about 8 minutes. After is automated handling plus review.
            </p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="minutes" fill="#1a7bae" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-2xl p-6 border border-white/[0.08] bg-white/[0.03]">
            <h2 className="font-semibold mb-1">Close cycle</h2>
            <p className="text-dark-400 text-xs mb-4">Days from period-end</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={closeData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="days" fill="#10C2A8" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto overflow-x-auto rounded-2xl border border-white/[0.08]">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="bg-white/[0.04] text-dark-400">
                <th className="text-left font-medium px-4 py-3">Engagement</th>
                <th className="text-left font-medium px-4 py-3">Platform</th>
                <th className="text-left font-medium px-4 py-3">Before</th>
                <th className="text-left font-medium px-4 py-3">After</th>
                <th className="text-left font-medium px-4 py-3">Impact</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.name} className="border-t border-white/[0.06]">
                  <td className="px-4 py-3">
                    <Link href={row.href} className="text-white hover:text-primary-300 font-medium">
                      {row.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-primary-300">{row.platform}</td>
                  <td className="px-4 py-3 text-dark-400">{row.before}</td>
                  <td className="px-4 py-3 text-dark-200">{row.after}</td>
                  <td className="px-4 py-3 text-primary-400 font-semibold">{row.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="max-w-5xl mx-auto text-dark-500 text-xs mt-3 leading-relaxed">
          Company names are withheld. Invoice time is 8–45 minutes manual, depending on the bill, to about 3 minutes with review. Monthly AP hours were 140, then about 8 on exceptions. Close is calendar days, 12 to 4, on a separate engagement. Variance hours are the analyst’s weekly rebuild, now the Sunday run. Cash accuracy is the 4-week horizon. The two near-misses were in the prior year, and the first year live had none. Figures are not a promise of the same result.
        </p>
      </section>

      <section className="px-4 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-3">Want numbers like these on your close?</h2>
        <p className="text-dark-300 mb-6">45-minute process review. Current state, opportunities, estimated return.</p>
        <Button href="/contact">Request a process audit</Button>
      </section>
    </main>
  )
}

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import ROICalculator from '@/components/home/ROICalculator'
import CapabilityMap from '@/components/home/CapabilityMap'
import PartnerTimeline from '@/components/home/PartnerTimeline'
import Guarantee from '@/components/home/Guarantee'

const trustStats = [
  { value: '140+', label: 'hours freed per client monthly' },
  { value: '99.2%', label: 'automation accuracy' },
  { value: '3 weeks', label: 'average deployment' },
  { value: '60-day', label: 'ROI guarantee' },
]

const differentiators = [
  {
    icon: '⚙️',
    title: 'We build it',
    description: 'Custom N8N workflows designed around your exact process — not a template. We map every edge case before writing a single line.',
  },
  {
    icon: '🛡️',
    title: 'We support it',
    description: 'Dedicated Slack channel. 2-hour response guarantee. Monthly check-ins included. If something breaks at month-end, you have our personal number.',
  },
  {
    icon: '✦',
    title: 'We guarantee ROI',
    description: 'If you don\'t see positive ROI within 60 days of go-live, we keep working for free until you do. Not implied — in writing.',
  },
]

const faqs = [
  {
    q: 'What if something breaks during month-end close?',
    a: 'You message us directly on Slack. 2-hour response, guaranteed. We\'ve never had a client miss a close because of our automation.',
  },
  {
    q: 'We don\'t have an IT team.',
    a: 'You don\'t need one. We handle every technical aspect — setup, hosting, maintenance, updates. Your team just uses the outputs.',
  },
  {
    q: 'How is this different from hiring a consultant?',
    a: 'Consultants deliver a report and invoice you. We build automation that runs every day, and we stay to make sure it keeps working.',
  },
  {
    q: 'Our processes are very custom / weird.',
    a: 'The messier the better. Custom processes are exactly where automation creates the most value. Bring us your spreadsheet nightmares.',
  },
  {
    q: 'How long until we see results?',
    a: 'Most clients see ROI within the first 30 days of go-live. The average across all our implementations is 47 days to breakeven.',
  },
  {
    q: 'What does it actually cost?',
    a: 'Depends on scope, but our smallest implementation is $2,400. Use the calculator above — if the math works, we should talk.',
  },
]

function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-3 block">FAQ</span>
          <h2 className="text-4xl font-bold mb-4">The questions you're actually thinking</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl overflow-hidden cursor-pointer"
              style={{ border: `1px solid ${open === i ? 'rgba(26,123,174,0.4)' : 'rgba(255,255,255,0.08)'}`, background: open === i ? 'rgba(26,123,174,0.08)' : 'rgba(255,255,255,0.02)' }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex items-center justify-between px-6 py-4 gap-4">
                <span className="text-white font-medium text-sm">{faq.q}</span>
                <span className="text-primary-400 text-lg flex-shrink-0 transition-transform" style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
              </div>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-dark-300 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-900 overflow-x-hidden">

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-4 py-24 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: '#1a7bae' }} />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: '#4a9bc4' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div>
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-8"
              style={{ background: 'rgba(26,123,174,0.15)', border: '1px solid rgba(26,123,174,0.3)', color: '#7fbfd6' }}
            >
              N8N + AI Automation for FP&amp;A Teams
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
            We automate your<br />
            finance operations.<br />
            <span style={{ color: '#4a9bc4' }}>Then we stay.</span>
          </h1>

          <p className="text-lg md:text-xl text-dark-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Custom N8N workflows for small business finance teams. We build it, support it, and guarantee ROI in 60 days — or we work for free until you get there.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#calculator">
              <button
                className="px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #1a7bae, #0f4875)', boxShadow: '0 8px 32px rgba(26,123,174,0.35)' }}
              >
                Calculate my savings
              </button>
            </a>
            <Link href="/contact">
              <button
                className="px-8 py-4 rounded-xl font-semibold transition-all text-dark-200"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.09)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                Free process audit →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="py-10 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-dark-400 text-xs">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Differentiators */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Why NL Reporting</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Different from every other agency</h2>
            <p className="text-dark-300 text-lg">Most automation shops deliver a workflow and move on. We don't.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl p-8"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="text-3xl mb-5">{d.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{d.title}</h3>
                <p className="text-dark-300 text-sm leading-relaxed">{d.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ROICalculator />

      {/* Case study teasers */}
      <section className="py-24 px-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Proof</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Real companies. Real numbers.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: 'Invoice automation', metric: '93% faster', sub: '140h/month freed, $7k saved', slug: 'invoice-automation' },
              { title: 'Budget vs actuals', metric: '0 min', sub: 'Monday reports run themselves', slug: 'budget-vs-actuals' },
              { title: 'Month-end close', metric: '12 → 4 days', sub: 'Zero weekend work since go-live', slug: 'month-end-close' },
              { title: 'Cash flow forecasting', metric: '91% accuracy', sub: '2 cash crises avoided in Q1', slug: 'cash-flow-forecasting' },
            ].map((cs, i) => (
              <motion.div
                key={cs.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={`/case-studies/${cs.slug}`}>
                  <div
                    className="rounded-xl p-6 cursor-pointer group transition-all"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(26,123,174,0.4)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                  >
                    <p className="text-dark-400 text-xs uppercase tracking-wider mb-2">{cs.title}</p>
                    <p className="text-3xl font-bold text-white mb-1">{cs.metric}</p>
                    <p className="text-dark-300 text-sm mb-4">{cs.sub}</p>
                    <span className="text-primary-400 text-xs group-hover:text-primary-300 transition-colors">Read case study →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PartnerTimeline />
      <CapabilityMap />
      <Guarantee />
      <FAQ />

      {/* Final CTA */}
      <section className="py-24 px-4 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to get your time back?</h2>
            <p className="text-dark-300 text-lg mb-8">Start with a free 45-minute process audit. No pitch, no pressure — just a clear picture of what you could automate and what it's worth.</p>
            <Link href="/contact">
              <button
                className="px-10 py-4 rounded-xl font-semibold text-white text-lg transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #1a7bae, #0f4875)', boxShadow: '0 8px 32px rgba(26,123,174,0.3)' }}
              >
                Book your free audit
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  )
}

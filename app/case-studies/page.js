'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import CaseStudy from '@/components/CaseStudy'

export default function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
      title: 'SaaS Company: From 140 Hours to 5 Hours',
      subtitle: 'Invoice validation automation for a rapidly scaling B2B SaaS',
      tags: ['Invoice Automation', 'N8N', 'QuickBooks'],
      challenge:
        'A rapidly scaling B2B SaaS company was processing 200+ invoices monthly with manual data entry. The finance team spent 140+ hours per month on AP work, delaying close cycles and limiting strategic analysis. Their process: email inbox → manual extraction → spreadsheet validation → QuickBooks entry.',
      solution: {
        intro: 'We built an N8N workflow that captures invoices from email, extracts key fields using AI vision, validates against budget and PO rules, and auto-posts to QuickBooks. The system flags exceptions for manual review.',
        bullets: [
          'Email-to-QuickBooks automation with N8N',
          'AI vision extraction for invoice fields (vendor, amount, date, PO)',
          'Budget and PO validation rules',
          'Exception handling for manual review',
          'Real-time dashboard for invoice status',
          'Automated duplicate detection',
        ],
      },
      tech: [
        { label: 'Orchestration', value: 'N8N (self-hosted)' },
        { label: 'AI/Vision', value: 'Claude 3.5 Sonnet' },
        { label: 'Integrations', value: 'Gmail, QuickBooks, Slack' },
        { label: 'Hosting', value: 'AWS EC2' },
      ],
      timeline: [
        { week: 'Week 1', label: 'Process mapping, data audit, success metrics' },
        { week: 'Week 2', label: 'N8N workflow development, integration setup' },
        { week: 'Week 3', label: 'Pilot with 100 invoices, bug fixes, team training' },
        { week: 'Week 4', label: 'Full rollout, month-end monitoring, optimization' },
      ],
      results: [
        { metric: 'Processing Time', before: '45 min', after: '3 min', change: '-93%' },
        { metric: 'Accuracy', before: '87%', after: '99.2%', change: '+12.2%' },
        { metric: 'Monthly Hours', before: '140h', after: '5h', change: '-96%' },
        { metric: 'Error Rate', before: '15/100', after: '1/100', change: '-93%' },
        { metric: 'Monthly Cost', before: '$7,000', after: '$250', change: '-96%' },
      ],
      outcomes: [
        'Close cycle reduced by 5 days',
        'Zero duplicate invoices in 6 months',
        'Real-time invoice visibility for CFO dashboard',
        'Complete audit trail for compliance',
        'Finance team freed for analysis and forecasting',
        '47-day payback period',
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <main className="min-h-screen bg-dark-900 overflow-x-hidden">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-24 px-4 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Case Studies</h1>
        <p className="text-dark-300 max-w-2xl mx-auto text-lg">
          Real results from real finance teams. Here's what we've built and the impact it made.
        </p>
      </motion.section>

      {/* Case Studies Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-12 px-4"
      >
        <div className="max-w-6xl mx-auto space-y-12">
          {caseStudies.map((study, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <CaseStudy data={study} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* More Coming */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-16 px-4 text-center"
      >
        <p className="text-dark-300 mb-6">
          More case studies coming as we deploy new workflows. Want to be featured?
        </p>
        <Link href="/contact">
          <button className="px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #1a7bae, #0f4875)', boxShadow: '0 8px 32px rgba(26,123,174,0.35)' }}>
            Start Your Automation
          </button>
        </Link>
      </motion.section>

      {/* Back Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 px-4 text-center"
      >
        <Link href="/" className="text-primary-400 hover:text-primary-300 transition-colors">
          ← Back to home
        </Link>
      </motion.div>
    </main>
  )
}

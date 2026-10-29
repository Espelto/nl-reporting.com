'use client'

import { motion } from 'framer-motion'
import { Activity, Brain, FileText, GitBranch, Link2, Zap } from 'lucide-react'

const capabilities = [
  {
    category: 'Invoice automation',
    icon: FileText,
    items: ['Invoice extraction', 'Vendor matching', 'Duplicate detection', 'PO validation'],
  },
  {
    category: 'Data integration',
    icon: Link2,
    items: ['Email ingestion', 'API connectors', 'CSV / sheet uploads', 'PDF processing'],
  },
  {
    category: 'Smart routing',
    icon: GitBranch,
    items: ['Exception handling', 'Approval workflows', 'Budget checks', 'Compliance rules'],
  },
  {
    category: 'System sync',
    icon: Zap,
    items: ['QuickBooks', 'NetSuite', 'SAP', 'Custom integrations'],
  },
  {
    category: 'AI & document understanding',
    icon: Brain,
    items: ['Structured extraction', 'Variance commentary', 'Anomaly detection', 'Local or cloud models'],
  },
  {
    category: 'Monitoring',
    icon: Activity,
    items: ['Real-time dashboards', 'Error alerts', 'Performance metrics', 'Audit logs'],
  },
]

export default function CapabilityMap() {
  return (
    <section className="py-24 px-4 bg-dark-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
            What I build
          </span>
          <h2 className="text-4xl font-bold mb-4">The full system, not a single-tool pitch</h2>
          <p className="text-dark-300 max-w-2xl mx-auto">
            Orchestration (n8n), analytics pipelines (KNIME), or local agents (Pi) — configured to your process and supported after go-live.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={cap.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-effect rounded-xl p-6 hover:border-primary-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-500/15 text-primary-300 flex items-center justify-center mb-4">
                  <Icon size={18} />
                </div>
                <h3 className="text-lg font-bold mb-4">{cap.category}</h3>
                <ul className="space-y-2">
                  {cap.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-dark-300 text-sm">
                      <span className="text-primary-400 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl border border-primary-500/30 bg-primary-500/[0.08]"
        >
          <p className="text-dark-300 mb-5">
            <span className="font-bold text-white">Each build is configured to your process,</span> validated on your data, and supported after go-live — so teams see measurable results inside the first close cycle.
          </p>
          <div className="flex gap-8 flex-wrap">
            <div>
              <p className="font-bold text-primary-400">4 weeks</p>
              <p className="text-dark-400 text-sm">typical go-live</p>
            </div>
            <div>
              <p className="font-bold text-primary-400">99.2%</p>
              <p className="text-dark-400 text-sm">AP extraction accuracy</p>
            </div>
            <div>
              <p className="font-bold text-primary-400">2-hour</p>
              <p className="text-dark-400 text-sm">response commitment</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

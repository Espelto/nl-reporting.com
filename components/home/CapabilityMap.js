'use client'

import { motion } from 'framer-motion'

export default function CapabilityMap() {
  const capabilities = [
    {
      category: 'Invoice Automation',
      icon: '📄',
      items: ['Invoice extraction', 'Vendor matching', 'Duplicate detection', 'PO validation'],
    },
    {
      category: 'Data Integration',
      icon: '🔗',
      items: ['Email ingestion', 'API connectors', 'CSV uploads', 'PDF processing'],
    },
    {
      category: 'Smart Routing',
      icon: '🧭',
      items: ['Exception handling', 'Approval workflows', 'Budget checks', 'Compliance rules'],
    },
    {
      category: 'System Sync',
      icon: '⚡',
      items: ['QuickBooks', 'NetSuite', 'SAP', 'Custom integrations'],
    },
    {
      category: 'AI & Vision',
      icon: '🧠',
      items: ['Document understanding', 'Data extraction', 'Anomaly detection', 'Pattern learning'],
    },
    {
      category: 'Monitoring',
      icon: '📊',
      items: ['Real-time dashboards', 'Error alerts', 'Performance metrics', 'Audit logs'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-24 px-4 bg-dark-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-3 block">What We Build</span>
          <h2 className="text-4xl font-bold mb-4">Everything your automation needs</h2>
          <p className="text-dark-300 max-w-2xl mx-auto">
            We don't just build invoice automation. We build a complete system that handles your messiest workflows.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="glass-effect rounded-xl p-6 border border-dark-600 hover:border-primary-500/50 transition-all"
            >
              <div className="text-4xl mb-4">{cap.icon}</div>
              <h3 className="text-lg font-bold mb-4">{cap.category}</h3>
              <ul className="space-y-2">
                {cap.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-dark-300 text-sm">
                    <span className="text-primary-400 mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-8 rounded-2xl border border-primary-500/30" style={{ background: 'rgba(26,123,174,0.08)' }}
        >
          <p className="text-dark-300 mb-4">
            <span className="font-bold text-white">We don't just hand you code.</span> We build it to your exact process, test it with your data, and stay to make sure it keeps working. That's why our clients see results in weeks, not months.
          </p>
          <div className="flex gap-6 flex-wrap">
            <div>
              <p className="font-bold text-primary-400">47 days</p>
              <p className="text-dark-400 text-sm">average payback</p>
            </div>
            <div>
              <p className="font-bold text-primary-400">99.2%</p>
              <p className="text-dark-400 text-sm">accuracy rate</p>
            </div>
            <div>
              <p className="font-bold text-primary-400">2-hour</p>
              <p className="text-dark-400 text-sm">response SLA</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

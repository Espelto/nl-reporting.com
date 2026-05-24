'use client'

import { motion } from 'framer-motion'

export default function ProblemSolution() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The Finance Challenge
          </h2>
          <p className="text-lg text-dark-300">
            Manual processes are costing your team time, accuracy, and strategic focus.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-effect p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-red-400">Without Automation</h3>
            <ul className="space-y-4">
              {[
                '45+ minutes per invoice to validate & enter',
                '12-15% error rate in manual data entry',
                '140+ hours lost monthly on repetitive tasks',
                'Late reconciliations delay decision-making',
                'Prone to duplicate entries & compliance issues',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  <span className="text-dark-200">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-effect p-8 rounded-xl border border-primary-500/30"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary-400">With AI-Powered Automation</h3>
            <ul className="space-y-4">
              {[
                '3 minutes per invoice (93% faster)',
                '99.2% accuracy with AI validation',
                '140+ hours freed for strategy',
                'Real-time reconciliation & reporting',
                'Audit trail & zero compliance risk',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary-400 mt-1">✓</span>
                  <span className="text-dark-200">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-primary-300 font-semibold text-lg">
            See how it works →
          </p>
        </motion.div>
      </div>
    </section>
  )
}

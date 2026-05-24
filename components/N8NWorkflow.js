'use client'

import { motion } from 'framer-motion'

export default function N8NWorkflow() {
  const steps = [
    {
      title: 'Invoice Ingestion',
      description: 'Receive invoices from email, uploads, or API',
      icon: '📄',
    },
    {
      title: 'AI Classification',
      description: 'Extract vendor, amount, date using vision AI',
      icon: '🧠',
    },
    {
      title: 'Validation Rules',
      description: 'Check against budget, PO, and compliance rules',
      icon: '✓',
    },
    {
      title: 'QuickBooks Sync',
      description: 'Auto-post approved invoices to accounting system',
      icon: '📊',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 px-4 bg-dark-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-dark-300">
            N8N Automation + AI-Powered Invoice Validation
          </p>
        </motion.div>

        {/* Workflow Diagram */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <div className="glass-effect p-6 rounded-lg h-full flex flex-col justify-between">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-dark-300 text-sm">{step.description}</p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-primary-400 text-2xl"
                  >
                    →
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-effect p-8 rounded-lg border border-primary-500/30 mt-12"
        >
          <h3 className="text-xl font-bold mb-4 text-primary-300">Tech Stack</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-dark-300 mb-2"><span className="text-primary-400 font-semibold">Orchestration:</span> N8N (self-hosted or cloud)</p>
              <p className="text-dark-300 mb-2"><span className="text-primary-400 font-semibold">AI/Vision:</span> Claude 3.5, GPT-4V</p>
            </div>
            <div>
              <p className="text-dark-300 mb-2"><span className="text-primary-400 font-semibold">Connectors:</span> Email, APIs, Webhooks</p>
              <p className="text-dark-300 mb-2"><span className="text-primary-400 font-semibold">Output:</span> QuickBooks, NetSuite, SAP</p>
            </div>
          </div>
        </motion.div>

        {/* Implementation Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            { time: 'Week 1', label: 'Setup & Discovery', icon: '🎯' },
            { time: 'Week 2', label: 'Build & Test', icon: '⚙️' },
            { time: 'Week 3', label: 'Deploy & Train', icon: '🚀' },
          ].map((phase, i) => (
            <div key={i} className="glass-effect p-6 rounded-lg text-center">
              <div className="text-3xl mb-2">{phase.icon}</div>
              <div className="font-bold text-primary-400">{phase.time}</div>
              <div className="text-dark-300 text-sm mt-1">{phase.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

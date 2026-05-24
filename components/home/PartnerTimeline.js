'use client'

import { motion } from 'framer-motion'

export default function PartnerTimeline() {
  const phases = [
    {
      week: 'Week 1',
      title: 'Discovery & Planning',
      description: 'We map your entire process. Every exception, every rule, every edge case. You don\'t do discovery calls — we do.',
      icon: '🔍',
      color: 'from-blue-600 to-blue-500',
      details: ['Process mapping', 'Data audit', 'Pain point identification', 'Success metrics'],
    },
    {
      week: 'Week 2',
      title: 'Build & Test',
      description: 'We build your N8N workflow in parallel with your actual data. No mockups. Real tests with real complexity.',
      icon: '⚙️',
      color: 'from-primary-600 to-primary-500',
      details: ['N8N workflow development', 'Integration setup', 'Real data testing', 'Exception handling'],
    },
    {
      week: 'Week 3',
      title: 'Pilot & Optimization',
      description: 'We run 50-100 invoices through your new system. We find bugs. We fix them. Your team watches it work.',
      icon: '🚀',
      color: 'from-purple-600 to-purple-500',
      details: ['Pilot with real data', 'Live testing', 'Bug fixes', 'Team training'],
    },
    {
      week: 'Week 4',
      title: 'Go-Live & Support',
      description: 'Full deployment. Dedicated Slack channel. We monitor everything during your first close cycle.',
      icon: '✨',
      color: 'from-green-600 to-green-500',
      details: ['Full rollout', 'Real-time monitoring', 'Month-end support', 'Optimization review'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Our Process</span>
          <h2 className="text-4xl font-bold mb-4">From handshake to go-live in 3 weeks</h2>
          <p className="text-dark-300">We move fast. You get results fast. Your team stays involved the whole time.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative"
            >
              <div className="grid md:grid-cols-12 gap-6 items-center">
                {/* Timeline Marker */}
                <div className="md:col-span-2 flex md:justify-end">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}
                  >
                    {phase.icon}
                  </motion.div>
                </div>

                {/* Connector Line */}
                {i < phases.length - 1 && (
                  <div className="hidden md:block md:col-span-1 absolute left-1/2 transform -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-primary-500 to-dark-700 top-24" />
                )}

                {/* Content */}
                <div className="md:col-span-9">
                  <div className="glass-effect rounded-xl p-6 border border-dark-600 hover:border-primary-500/50 transition-all">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-4">
                      <div className="flex-1">
                        <span className="text-primary-400 font-bold text-sm">{phase.week}</span>
                        <h3 className="text-2xl font-bold mt-1 mb-2">{phase.title}</h3>
                        <p className="text-dark-300 mb-4">{phase.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {phase.details.map((detail, j) => (
                            <span
                              key={j}
                              className="text-xs px-3 py-1 rounded-full text-primary-300"
                              style={{ background: 'rgba(26,123,174,0.15)' }}
                            >
                              {detail}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-dark-300 mb-6">
            This timeline is our standard. We've done it 20+ times. It works.
          </p>
          <a href="/contact">
            <button className="px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #1a7bae, #0f4875)', boxShadow: '0 8px 32px rgba(26,123,174,0.35)' }}>
              Let's start your 3-week journey
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

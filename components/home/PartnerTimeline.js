'use client'

import { motion } from 'framer-motion'
import { Rocket, Search, Sparkles, Wrench } from 'lucide-react'
import Button from '@/components/Button'

const phases = [
  {
    week: 'Week 1',
    title: 'Discovery & planning',
    description:
      'I map the entire process — every exception, rule, and edge case — so the build reflects how the team actually works.',
    icon: Search,
    details: ['Process mapping', 'Data audit', 'Pain-point identification', 'Success metrics'],
  },
  {
    week: 'Week 2',
    title: 'Build & test',
    description:
      'I build on the stack we scoped — n8n, KNIME, or Pi Agent — using your real data. No mockups.',
    icon: Wrench,
    details: ['Workflow / pipeline build', 'Integration setup', 'Real-data testing', 'Exception handling'],
  },
  {
    week: 'Week 3',
    title: 'Pilot & optimization',
    description:
      'We run a live sample through the system, find the bugs, and fix them while your team watches it work.',
    icon: Rocket,
    details: ['Pilot with real data', 'Live testing', 'Bug fixes', 'Team training'],
  },
  {
    week: 'Week 4',
    title: 'Go-live & support',
    description:
      'Full deployment, dedicated Slack channel, and monitoring through your first close cycle.',
    icon: Sparkles,
    details: ['Full rollout', 'Real-time monitoring', 'Month-end support', 'Optimization review'],
  },
]

export default function PartnerTimeline() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Process
          </span>
          <h2 className="text-4xl font-bold mb-4">From handshake to go-live in 4 weeks</h2>
          <p className="text-dark-300">A fixed shape. Your team stays involved the whole time.</p>
        </motion.div>

        <div className="space-y-5">
          {phases.map((phase, i) => {
            const Icon = phase.icon
            return (
              <motion.div
                key={phase.week}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="grid md:grid-cols-12 gap-5 items-stretch"
              >
                <div className="md:col-span-2 flex md:justify-end items-start">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                    <Icon size={22} />
                  </div>
                </div>
                <div className="md:col-span-10">
                  <div className="glass-effect rounded-xl p-6 hover:border-primary-500/40 transition-colors">
                    <span className="text-primary-400 font-bold text-sm">{phase.week}</span>
                    <h3 className="text-2xl font-bold mt-1 mb-2">{phase.title}</h3>
                    <p className="text-dark-300 mb-4 text-sm md:text-base">{phase.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {phase.details.map(detail => (
                        <span
                          key={detail}
                          className="text-xs px-3 py-1 rounded-full text-primary-300 bg-primary-500/15"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-dark-300 mb-6">This is the standard engagement shape. Scope is written before week 1.</p>
          <Button href="/contact">Start a 4-week engagement</Button>
        </motion.div>
      </div>
    </section>
  )
}

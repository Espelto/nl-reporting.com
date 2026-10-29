'use client'

import { motion } from 'framer-motion'
import { BarChart3, FileCheck, Timer } from 'lucide-react'
import Button from '@/components/Button'

const pillars = [
  {
    icon: BarChart3,
    title: 'Measurable metrics',
    description: 'ROI is defined upfront: hours saved, errors eliminated, dollar value. Not vague promises.',
  },
  {
    icon: Timer,
    title: '60-day window',
    description: 'Enough time for the team to adopt the system and for savings to show up in the next close.',
  },
  {
    icon: FileCheck,
    title: 'In writing',
    description: 'The guarantee is in the agreement. Not a handshake. Not implied.',
  },
]

export default function Guarantee() {
  return (
    <section className="py-24 px-4 bg-dark-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-accent-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Promise
          </span>
          <h2 className="text-4xl font-bold mb-4">The 60-day ROI guarantee</h2>
          <p className="text-dark-300 text-lg">
            If I don&apos;t deliver positive ROI within 60 days of go-live, I keep working at no additional fee until you do.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-2xl border border-accent-400/20 bg-accent-400/[0.04]"
        >
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {pillars.map(item => {
              const Icon = item.icon
              return (
                <div key={item.title} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-accent-400/15 text-accent-400 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-dark-300 text-sm">{item.description}</p>
                </div>
              )
            })}
          </div>

          <div className="border-t border-accent-400/15 pt-8">
            <h3 className="font-bold text-lg mb-6">What &quot;positive ROI&quot; means</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'Hours freed', description: 'The team spends less time on the automated process than before.' },
                { label: 'Cost savings', description: 'Labor efficiency exceeds the implementation fee inside the window.' },
                { label: 'Error reduction', description: 'Measurable drop in manual-entry errors and duplicates.' },
                { label: 'Speed', description: 'Faster close or reporting cycles — more time for analysis.' },
              ].map(item => (
                <div key={item.label} className="p-4 rounded-lg bg-dark-800/70">
                  <p className="font-semibold text-primary-300 mb-1">{item.label}</p>
                  <p className="text-dark-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 p-6 rounded-xl bg-primary-500/10 border border-primary-500/20">
            <p className="text-xs text-dark-400 mb-2 uppercase font-semibold tracking-wider">Why this exists</p>
            <p className="text-base leading-relaxed text-dark-200">
              The guarantee aligns incentives: we define metrics before go-live, and I remain engaged until they are met.
              It is a contractual commitment, not a marketing line.
            </p>
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-dark-300 mb-6">Terms are defined in writing before go-live.</p>
          <Button href="/contact">Get the guarantee in writing</Button>
        </div>
      </div>
    </section>
  )
}

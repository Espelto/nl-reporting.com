'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CaseStudy({ data }) {
  return (
    <div className="rounded-xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {data.tags.map(tag => (
          <span key={tag} className="text-xs px-2.5 py-1 rounded-full text-dark-300" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Title & Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{data.title}</h2>
        <p className="text-dark-300 text-sm leading-relaxed">{data.subtitle}</p>
      </motion.div>

      {/* Results Summary */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
      >
        {data.results.map((row, i) => (
          <div key={i} className="rounded-lg p-4" style={{ background: 'rgba(26,123,174,0.08)' }}>
            <p className="text-primary-400 font-bold text-lg">{row.after}</p>
            <p className="text-dark-400 text-xs mt-1">{row.metric}</p>
            <p className="text-dark-500 text-xs mt-1">{row.change}</p>
          </div>
        ))}
      </motion.div>

      {/* Challenge & Solution */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <div className="mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-400 mb-3">The Challenge</h3>
          <p className="text-dark-300 text-sm leading-relaxed">{data.challenge}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-400 mb-3">Our Solution</h3>
          <p className="text-dark-300 text-sm leading-relaxed mb-3">{data.solution.intro}</p>
          <ul className="space-y-2">
            {data.solution.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-dark-300 text-sm leading-relaxed">
                <span className="text-primary-400 font-bold flex-shrink-0">✓</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Tech Stack & Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid md:grid-cols-2 gap-8 mb-8"
      >
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-400 mb-3">Tech Stack</h3>
          <div className="space-y-2">
            {data.tech.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-dark-400 text-xs">{item.label}</span>
                <span className="text-white text-xs font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-400 mb-3">Deployment Timeline</h3>
          <div className="space-y-2">
            {data.timeline.map((item, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-primary-400 font-bold text-xs flex-shrink-0">{item.week}</span>
                <span className="text-dark-300 text-xs">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Outcomes */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-400 mb-3">Business Impact</h3>
        <ul className="space-y-2">
          {data.outcomes.map((outcome, i) => (
            <li key={i} className="flex gap-3 text-dark-300 text-sm leading-relaxed">
              <span className="text-primary-400 font-bold flex-shrink-0">→</span>
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* CTA */}
      <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/contact">
          <button className="px-6 py-3 rounded-lg font-semibold text-white text-sm transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #1a7bae, #0f4875)' }}>
            Build Something Similar
          </button>
        </Link>
      </div>
    </div>
  )
}

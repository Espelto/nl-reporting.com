'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { HOMEPAGE_PLATFORMS } from '@/components/home/platformSummaries'

export default function UseCases() {
  return (
    <section id="use-cases" className="py-20 px-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Platforms
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Built on the stack that fits your environment</h2>
          <p className="text-dark-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            I implement on n8n, KNIME, or on-premise Pi Agent depending on your integrations, data volume, and security requirements. Each case study includes a full workflow walkthrough.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {HOMEPAGE_PLATFORMS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={p.caseStudyHref}>
                <article
                  className="rounded-xl p-5 h-full flex flex-col group transition-all"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(26,123,174,0.4)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  }}
                >
                  <p className="text-primary-400 text-xs font-semibold uppercase tracking-wider mb-2">{p.name}</p>
                  <p className="text-white font-semibold text-sm mb-2">{p.tagline}</p>
                  <p className="text-dark-300 text-sm leading-relaxed flex-1 mb-4">{p.hook}</p>
                  <p className="text-primary-400 text-lg font-bold mb-3">{p.metric}</p>
                  <span className="text-primary-400 text-xs font-medium group-hover:text-primary-300 transition-colors">
                    View case study →
                  </span>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center">
          <Link
            href="/case-studies"
            className="text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors"
          >
            Browse all case studies by platform →
          </Link>
        </p>
      </div>
    </section>
  )
}

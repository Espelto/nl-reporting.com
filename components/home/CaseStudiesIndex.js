'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { PLATFORM_LIST, CASE_STUDIES_BY_PLATFORM } from '@/components/home/platformSummaries'

export default function CaseStudiesIndex() {
  const [activeId, setActiveId] = useState(PLATFORM_LIST[0].id)
  const platform = PLATFORM_LIST.find(p => p.id === activeId) || PLATFORM_LIST[0]
  const group = CASE_STUDIES_BY_PLATFORM.find(g => g.platformId === activeId)

  return (
    <main className="min-h-screen bg-dark-900 overflow-x-hidden">
      <section className="py-20 px-4 text-center bg-radial-fade">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Case studies</h1>
        <p className="text-dark-300 max-w-2xl mx-auto text-lg leading-relaxed">
          Implementation detail, interactive workflow previews, and measured outcomes — organized by platform.
        </p>
      </section>

      <section className="px-4 pb-20 max-w-5xl mx-auto">
        <div
          className="flex flex-wrap justify-center gap-2 mb-8"
          role="tablist"
          aria-label="Automation platforms"
          onKeyDown={e => {
            if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
            e.preventDefault()
            const idx = PLATFORM_LIST.findIndex(p => p.id === activeId)
            const next =
              e.key === 'ArrowRight'
                ? (idx + 1) % PLATFORM_LIST.length
                : (idx - 1 + PLATFORM_LIST.length) % PLATFORM_LIST.length
            setActiveId(PLATFORM_LIST[next].id)
          }}
        >
          {PLATFORM_LIST.map(p => {
            const active = activeId === p.id
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                id={`platform-tab-${p.id}`}
                aria-selected={active}
                aria-controls={`platform-panel-${p.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => setActiveId(p.id)}
                className={`w-[7.125rem] shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all text-center ${
                  active
                    ? 'text-white bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/30'
                    : 'text-dark-400 bg-white/[0.06] border border-white/10'
                }`}
              >
                {p.name}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            id={`platform-panel-${activeId}`}
            role="tabpanel"
            aria-labelledby={`platform-tab-${activeId}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-8">
              <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-2">
                {platform.name}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{platform.tagline}</h2>
              <p className="text-dark-300 text-sm md:text-base leading-relaxed max-w-3xl mb-4">
                {platform.description}
              </p>
              <p className="text-dark-500 text-xs uppercase tracking-wider mb-2">Typical applications</p>
              <ul className="flex flex-wrap gap-2">
                {platform.bestFor.map(item => (
                  <li
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-full text-dark-300 bg-white/[0.05] border border-white/[0.08]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              {group?.studies.map(study => (
                <Link key={study.slug} href={`/case-studies/${study.slug}`} className="block">
                  <article className="rounded-xl p-6 md:p-7 group border border-white/[0.08] bg-white/[0.03] hover:border-primary-500/40 transition-colors">
                    <p className="text-dark-400 text-sm mb-1">{study.context}</p>
                    <h3 className="text-xl font-bold text-white mb-3">{study.title}</h3>
                    <div className="flex flex-wrap items-baseline gap-3 mb-3">
                      <span className="text-2xl font-bold text-primary-400">{study.metric}</span>
                      <span className="text-dark-300 text-sm">{study.sub}</span>
                    </div>
                    <span className="text-primary-400 text-sm font-medium group-hover:text-primary-300 transition-colors">
                      Read case study with interactive workflow →
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  )
}

'use client'

import { motion } from 'framer-motion'

const nodes = [
  { label: 'IMAP', sub: 'AP inbox', x: '4%', y: '18%', tone: '#3b82f6' },
  { label: 'Claude', sub: 'Extract JSON', x: '38%', y: '18%', tone: '#8b5cf6' },
  { label: 'Validate', sub: 'PO · vendor · total', x: '38%', y: '58%', tone: '#f59e0b' },
  { label: 'QuickBooks', sub: 'Create bill', x: '72%', y: '38%', tone: '#22c55e' },
]

export default function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative"
    >
      <div
        className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40"
        style={{ background: 'linear-gradient(180deg, #0c2233 0%, #07141f 100%)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400/80" />
            <span className="w-2 h-2 rounded-full bg-amber-400/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
            <span className="ml-2 text-[11px] text-dark-400 font-medium">invoice pipeline</span>
          </div>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            live
          </span>
        </div>

        <div className="relative h-[280px] md:h-[320px] bg-grid">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
            <path
              d="M 70 70 C 140 70, 160 70, 230 70"
              fill="none"
              stroke="rgba(74,155,196,0.45)"
              strokeWidth="1.5"
            />
            <path
              d="M 270 90 C 270 140, 270 160, 270 185"
              fill="none"
              stroke="rgba(74,155,196,0.35)"
              strokeWidth="1.5"
            />
            <path
              d="M 330 200 C 390 200, 410 150, 470 145"
              fill="none"
              stroke="rgba(34,197,94,0.45)"
              strokeWidth="1.5"
            />
          </svg>

          {nodes.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.08 }}
              className="absolute w-[132px] rounded-xl px-3 py-2.5 border border-white/10 bg-dark-800/90 backdrop-blur-sm"
              style={{ left: n.x, top: n.y }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full" style={{ background: n.tone }} />
                <span className="text-xs font-semibold text-white">{n.label}</span>
              </div>
              <p className="text-[10px] text-dark-400 pl-4">{n.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-px bg-white/[0.06] border-t border-white/[0.06]">
          {[
            { label: 'Per invoice', value: '45 → 3 min' },
            { label: 'Accuracy', value: '99.2%' },
            { label: 'Hours freed', value: '140 / mo' },
          ].map(stat => (
            <div key={stat.label} className="bg-dark-800/80 px-3 py-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-dark-500 mb-0.5">{stat.label}</p>
              <p className="text-sm font-semibold text-primary-300">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="hidden sm:block absolute -right-3 -bottom-5 rounded-xl px-4 py-3 border border-white/10 bg-dark-800 shadow-xl"
      >
        <p className="text-[10px] uppercase tracking-wider text-dark-500 mb-0.5">Month-end close</p>
        <p className="text-sm font-semibold text-white">12 → 4 days</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="hidden sm:block absolute -left-3 top-16 rounded-xl px-4 py-3 border border-white/10 bg-dark-800 shadow-xl"
      >
        <p className="text-[10px] uppercase tracking-wider text-dark-500 mb-0.5">Cash forecast</p>
        <p className="text-sm font-semibold text-accent-400">68% → 91%</p>
      </motion.div>
    </motion.div>
  )
}

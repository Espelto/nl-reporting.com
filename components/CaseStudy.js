'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import N8NCanvas from '@/components/N8NCanvas'
import KnimeCanvas from '@/components/KnimeCanvas'
import PiAgentCanvas from '@/components/PiAgentCanvas'
import { getPlatformSummary } from '@/components/home/platformSummaries'

const WORKFLOW_CANVAS = {
  n8n: N8NCanvas,
  knime: KnimeCanvas,
  KNIME: KnimeCanvas,
  pi: PiAgentCanvas,
  'pi-agent': PiAgentCanvas,
}

function SectionBody({ body }) {
  return (
    <div className="space-y-4">
      {body.map((block, i) => {
        if (typeof block === 'string') {
          return (
            <p key={i} className="text-dark-300 text-sm leading-relaxed">
              {block}
            </p>
          )
        }
        if (block.type === 'callout') {
          return (
            <div
              key={i}
              className="rounded-lg px-5 py-4 text-sm leading-relaxed text-dark-200"
              style={{
                background: 'rgba(26,123,174,0.1)',
                borderLeft: '3px solid #1a7bae',
              }}
            >
              {block.text}
            </div>
          )
        }
        if (block.type === 'list') {
          return (
            <ul key={i} className="space-y-2 pl-1">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3 text-dark-300 text-sm leading-relaxed">
                  <span className="text-primary-400 font-bold flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )
        }
        return null
      })}
    </div>
  )
}

export default function CaseStudy({ data }) {
  const isLegacy = Boolean(data.challenge && !data.sections)

  if (isLegacy) {
    return <CaseStudyLegacy data={data} />
  }

  const platform = data.workflowPlatform ? getPlatformSummary(data.workflowPlatform) : null

  return (
    <article className="min-h-screen bg-dark-900 overflow-x-hidden pb-16">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <Link
          href="/case-studies"
          className="inline-flex text-primary-400 hover:text-primary-300 text-sm mb-8 transition-colors"
        >
          ← All case studies
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {data.tags?.map(tag => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full text-dark-300"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{data.title}</h1>
          {data.context && <p className="text-dark-400 text-sm md:text-base">{data.context}</p>}
        </motion.header>

        {data.numbers?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mb-12"
          >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.numbers.map((n, i) => (
              <div
                key={i}
                className="rounded-xl p-5"
                style={{ background: 'rgba(26,123,174,0.08)', border: '1px solid rgba(26,123,174,0.15)' }}
              >
                <p className="text-2xl md:text-3xl font-bold text-primary-400">{n.value}</p>
                <p className="text-dark-400 text-xs mt-2">{n.label}</p>
              </div>
            ))}
          </div>
          {data.measurement && (
            <p className="text-dark-500 text-xs leading-relaxed mt-4 max-w-3xl">{data.measurement}</p>
          )}
          </motion.div>
        )}

        {platform && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 rounded-xl p-6"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p className="text-primary-400 text-xs font-semibold uppercase tracking-widest mb-2">
              Platform · {platform.name}
            </p>
            <p className="text-white font-semibold mb-2">{platform.exampleTitle}</p>
            <p className="text-dark-300 text-sm leading-relaxed mb-4">{platform.exampleBlurb}</p>
            <p className="text-dark-400 text-xs uppercase tracking-wider mb-2">Why {platform.name}</p>
            <ul className="space-y-1.5 mb-0">
              {platform.bestFor.map(item => (
                <li key={item} className="text-dark-300 text-sm flex gap-2">
                  <span className="text-primary-400 flex-shrink-0">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {data.workflow && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mb-14"
          >
            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary-400 mb-2">
              Workflow preview
            </h2>
            <p className="text-dark-400 text-sm mb-5 max-w-2xl">
              Simplified schematic. Node settings are examples, not a client’s live credentials. Select a node to see the shape of the configuration, or use the guided tour.
            </p>
            {(() => {
              const nodes = data.workflow.nodes
              const connections = data.workflow.connections
              if (!Array.isArray(nodes) || nodes.length === 0) return null
              const Canvas = WORKFLOW_CANVAS[data.workflowPlatform] || N8NCanvas
              return <Canvas nodes={nodes} connections={connections || []} />
            })()}
          </motion.section>
        )}

        {data.sections?.map((section, i) => (
          <motion.section
            key={section.heading}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: i * 0.03 }}
            className="mb-12"
          >
            <h2 className="text-xl font-bold text-white mb-5">{section.heading}</h2>
            <SectionBody body={section.body} />
          </motion.section>
        ))}

        {data.results?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary-400 mb-5">
              Results
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <th className="text-left px-4 py-3 text-dark-400 font-medium">Metric</th>
                    <th className="text-left px-4 py-3 text-dark-400 font-medium">Before</th>
                    <th className="text-left px-4 py-3 text-dark-400 font-medium">After</th>
                  </tr>
                </thead>
                <tbody>
                  {data.results.map((row, i) => (
                    <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <td className="px-4 py-3 text-dark-300">{row.metric}</td>
                      <td className="px-4 py-3 text-dark-400">{row.before}</td>
                      <td className="px-4 py-3 text-primary-400 font-semibold">{row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>
        )}

        <div className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #1a7bae, #0f4875)', boxShadow: '0 8px 32px rgba(26,123,174,0.3)' }}
          >
            Request a process audit
          </Link>
        </div>
      </div>
    </article>
  )
}

function CaseStudyLegacy({ data }) {
  return (
    <div className="rounded-xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex flex-wrap gap-2 mb-4">
        {data.tags?.map(tag => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full text-dark-300"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {tag}
          </span>
        ))}
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{data.title}</h2>
      <p className="text-dark-300 text-sm leading-relaxed mb-6">{data.subtitle}</p>
      {data.results && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {data.results.map((row, i) => (
            <div key={i} className="rounded-lg p-4" style={{ background: 'rgba(26,123,174,0.08)' }}>
              <p className="text-primary-400 font-bold text-lg">{row.after}</p>
              <p className="text-dark-400 text-xs mt-1">{row.metric}</p>
              <p className="text-dark-500 text-xs mt-1">{row.change}</p>
            </div>
          ))}
        </div>
      )}
      {data.challenge && (
        <>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-400 mb-3">The Challenge</h3>
          <p className="text-dark-300 text-sm leading-relaxed mb-6">{data.challenge}</p>
        </>
      )}
      {data.solution && (
        <>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-400 mb-3">Our Solution</h3>
          <p className="text-dark-300 text-sm leading-relaxed mb-3">{data.solution.intro}</p>
          <ul className="space-y-2 mb-8">
            {data.solution.bullets?.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-dark-300 text-sm">
                <span className="text-primary-400 font-bold">✓</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      <Link href="/contact">
        <button
          type="button"
          className="px-6 py-3 rounded-lg font-semibold text-white text-sm"
          style={{ background: 'linear-gradient(135deg, #1a7bae, #0f4875)' }}
        >
          Request a process audit
        </button>
      </Link>
    </div>
  )
}

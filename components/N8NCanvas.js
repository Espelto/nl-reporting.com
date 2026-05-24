'use client'

import { useEffect, useRef, useState, useId, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NW = 176
const NH = 58

const TYPE_META = {
  trigger: { color: '#e74c3c', icon: '⚡' },
  schedule: { color: '#f97316', icon: '⏱' },
  email: { color: '#3b82f6', icon: '✉' },
  webhook: { color: '#e74c3c', icon: '⚓' },
  merge: { color: '#64748b', icon: '⊕' },
  ai: { color: '#8b5cf6', icon: '✦' },
  code: { color: '#f97316', icon: '</>' },
  if: { color: '#eab308', icon: '◇' },
  quickbooks: { color: '#22c55e', icon: 'QB' },
  sheets: { color: '#10b981', icon: '▦' },
  drive: { color: '#4285f4', icon: '▲' },
  slack: { color: '#e01e5a', icon: 'S' },
  notion: { color: '#9ca3af', icon: 'N' },
  plaid: { color: '#00b233', icon: 'P' },
  billcom: { color: '#0066cc', icon: '⊕' },
  gusto: { color: '#f45d48', icon: 'G' },
  netsuite: { color: '#2563eb', icon: 'NS' },
  sendgrid: { color: '#1a82e2', icon: 'SG' },
  http: { color: '#06b6d4', icon: '↗' },
  brex: { color: '#ff6f00', icon: 'Bx' },
}

function bezierPath(fromNode, toNode) {
  const x1 = fromNode.x + NW
  const y1 = fromNode.y + NH / 2
  const x2 = toNode.x
  const y2 = toNode.y + NH / 2
  const dx = Math.max(60, (x2 - x1) * 0.5)
  return `M ${x1} ${y1} C ${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`
}

function walkOrder(nodes, connections) {
  const ids = new Set(nodes.map(n => n.id))
  const incoming = new Map([...ids].map(id => [id, 0]))
  connections.forEach(c => {
    if (incoming.has(c.to)) incoming.set(c.to, (incoming.get(c.to) || 0) + 1)
  })
  const queue = nodes
    .filter(n => (incoming.get(n.id) || 0) === 0)
    .sort((a, b) => a.x - b.x || a.y - b.y)
    .map(n => n.id)
  const order = []
  const seen = new Set()
  while (queue.length) {
    const id = queue.shift()
    if (seen.has(id)) continue
    seen.add(id)
    order.push(id)
    connections
      .filter(c => c.from === id && ids.has(c.to) && !seen.has(c.to))
      .sort((a, b) => {
        const na = nodes.find(n => n.id === a.to)
        const nb = nodes.find(n => n.id === b.to)
        return (na?.x || 0) - (nb?.x || 0)
      })
      .forEach(c => queue.push(c.to))
  }
  nodes.forEach(n => {
    if (!seen.has(n.id)) order.push(n.id)
  })
  return order
}

function NodeIcon({ type, active }) {
  const meta = TYPE_META[type] || TYPE_META.code
  const small = ['netsuite', 'sendgrid'].includes(type)
  return (
    <div
      style={{
        width: 30,
        height: 30,
        borderRadius: 6,
        background: meta.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: small ? 8 : 12,
        fontWeight: 700,
        color: 'white',
        fontFamily: 'monospace',
        flexShrink: 0,
        opacity: active ? 1 : 0.95,
      }}
    >
      {meta.icon}
    </div>
  )
}

function NodeDetailPanel({ node, tab, onTabChange, onClose }) {
  const meta = TYPE_META[node.type] || TYPE_META.code
  const parameters = node.parameters || node.settings || []
  const hasOutput = node.outputSample && Object.keys(node.outputSample).length > 0
  const hasAbout = Boolean(node.businessSummary)
  const tabs = ['Parameters', ...(hasOutput ? ['Output'] : []), ...(hasAbout ? ['Why'] : [])]

  const activeTab = tabs.includes(tab) ? tab : tabs[0]

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: '#13141f', minHeight: 280 }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          padding: '14px 14px 10px',
          background: `${meta.color}14`,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <NodeIcon type={node.type} active />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.95)' }}>{node.label}</div>
          {node.sub && (
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{node.sub}</div>
          )}
          <div style={{ fontSize: 9, color: meta.color, fontWeight: 600, letterSpacing: '0.06em', marginTop: 4 }}>
            {node.type.toUpperCase()} NODE
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close node details"
          className="text-dark-400 hover:text-white transition-colors text-lg leading-none px-1"
        >
          ×
        </button>
      </div>

      {node.credential && (
        <div
          style={{
            margin: '10px 14px 0',
            padding: '8px 10px',
            borderRadius: 6,
            background: 'rgba(34,197,94,0.12)',
            border: '1px solid rgba(34,197,94,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 11,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ color: 'rgba(255,255,255,0.75)' }}>
            {node.credential.name}
            <span style={{ color: '#22c55e', marginLeft: 6 }}>· {node.credential.status || 'Connected'}</span>
          </span>
        </div>
      )}

      <div
        className="flex gap-0 px-3 pt-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {tabs.map(t => (
          <button
            key={t}
            type="button"
            onClick={() => onTabChange(t)}
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '8px 12px',
              marginBottom: -1,
              color: activeTab === t ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.35)',
              borderBottom: activeTab === t ? `2px solid ${meta.color}` : '2px solid transparent',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto" style={{ maxHeight: 360 }}>
        {activeTab === 'Parameters' && (
          <div style={{ padding: '8px 0 12px' }}>
            {parameters.length > 0 ? (
              parameters.map((s, i) => (
                <div key={i} style={{ padding: '8px 14px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.38)',
                      marginBottom: 4,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {s.label}
                  </label>
                  <div
                    style={{
                      color: s.highlight ? meta.color : 'rgba(255,255,255,0.88)',
                      fontFamily: s.mono || s.expression ? '"SF Mono", "Fira Code", monospace' : 'inherit',
                      fontSize: s.mono || s.expression ? 10.5 : 11,
                      padding: '7px 9px',
                      borderRadius: 6,
                      background: 'rgba(0,0,0,0.25)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      wordBreak: 'break-word',
                      lineHeight: 1.45,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    {s.expression && (
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: meta.color,
                          background: `${meta.color}22`,
                          padding: '2px 5px',
                          borderRadius: 4,
                          flexShrink: 0,
                        }}
                      >
                        fx
                      </span>
                    )}
                    <span>{s.value}</span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ padding: '12px 14px', fontSize: 11, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
                No parameters configured
              </p>
            )}
          </div>
        )}

        {activeTab === 'Output' && hasOutput && (
          <div style={{ padding: 12 }}>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>
              Sample data from last execution (preview)
            </p>
            <pre
              style={{
                fontSize: 10,
                lineHeight: 1.5,
                color: 'rgba(255,255,255,0.75)',
                background: 'rgba(0,0,0,0.35)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                padding: 10,
                overflow: 'auto',
                maxHeight: 220,
                margin: 0,
                fontFamily: '"SF Mono", "Fira Code", monospace',
              }}
            >
              {JSON.stringify(node.outputSample, null, 2)}
            </pre>
          </div>
        )}

        {activeTab === 'Why' && hasAbout && (
          <div style={{ padding: '14px' }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6 }}>{node.businessSummary}</p>
          </div>
        )}
      </div>

      <div
        style={{
          padding: '10px 14px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          fontSize: 10,
          color: 'rgba(255,255,255,0.28)',
        }}
      >
        Interactive preview · configured &amp; maintained by NL Reporting
      </div>
    </div>
  )
}

export default function N8NCanvas({
  nodes,
  connections,
  showWalkthrough = true,
  hint = 'Click any node to see parameters and sample output',
}) {
  const uid = useId().replace(/:/g, '')
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [activeNodes, setActiveNodes] = useState(new Set())
  const [selectedId, setSelectedId] = useState(null)
  const [panelTab, setPanelTab] = useState('Parameters')
  const [walkIndex, setWalkIndex] = useState(-1)
  const [walking, setWalking] = useState(false)
  const walkTimer = useRef(null)

  const order = useMemo(() => walkOrder(nodes, connections), [nodes, connections])
  const selectedNode = nodes.find(n => n.id === selectedId) || null
  const highlightId = walking && walkIndex >= 0 ? order[walkIndex] : selectedId

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const timers = []
    const sortedIds = [...nodes].sort((a, b) => a.x - b.x || a.y - b.y).map(n => n.id)
    sortedIds.forEach((id, i) => {
      timers.push(setTimeout(() => setActiveNodes(p => new Set([...p, id])), 900 + i * 280))
      timers.push(
        setTimeout(() => {
          setActiveNodes(p => {
            const n = new Set(p)
            n.delete(id)
            return n
          })
        }, 900 + i * 280 + 480)
      )
    })
    return () => timers.forEach(clearTimeout)
  }, [inView, nodes])

  const stopWalk = useCallback(() => {
    setWalking(false)
    setWalkIndex(-1)
    if (walkTimer.current) clearInterval(walkTimer.current)
  }, [])

  const startWalk = useCallback(() => {
    stopWalk()
    if (order.length === 0) return
    setWalking(true)
    setWalkIndex(0)
    setSelectedId(order[0])
    setPanelTab('Parameters')
    let i = 0
    walkTimer.current = setInterval(() => {
      i += 1
      if (i >= order.length) {
        stopWalk()
        return
      }
      setWalkIndex(i)
      setSelectedId(order[i])
    }, 2800)
  }, [order, stopWalk])

  useEffect(() => () => {
    if (walkTimer.current) clearInterval(walkTimer.current)
  }, [])

  const selectNode = (node) => {
    stopWalk()
    setSelectedId(node.id)
    setPanelTab('Parameters')
  }

  const canvasW = Math.max(...nodes.map(n => n.x)) + NW + 40
  const canvasH = Math.max(...nodes.map(n => n.y)) + NH + 40

  const ifBranches = useMemo(() => {
    const map = new Map()
    connections.forEach(c => {
      const from = nodes.find(n => n.id === c.from)
      if (from?.type === 'if') {
        if (!map.has(c.from)) map.set(c.from, [])
        const to = nodes.find(n => n.id === c.to)
        map.get(c.from).push({ to, node: to })
      }
    })
    return map
  }, [nodes, connections])

  return (
    <div ref={ref} className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
      <div
        className="flex items-center gap-2 px-4 py-2.5 flex-wrap"
        style={{ background: '#0c0c12', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
        <span className="ml-2 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>
          n8n — workflow editor
        </span>
        <div className="ml-auto flex items-center gap-3 flex-wrap">
          {showWalkthrough && order.length > 1 && (
            <button
              type="button"
              onClick={walking ? stopWalk : startWalk}
              className="text-xs font-semibold px-3 py-1 rounded-md transition-opacity hover:opacity-90"
              style={{
                background: walking ? 'rgba(234,179,8,0.2)' : 'rgba(139,92,246,0.2)',
                color: walking ? '#eab308' : '#a78bfa',
                border: `1px solid ${walking ? 'rgba(234,179,8,0.35)' : 'rgba(139,92,246,0.35)'}`,
              }}
            >
              {walking ? 'Stop tour' : 'Walk the workflow'}
            </button>
          )}
          <span className="text-xs hidden sm:inline" style={{ color: 'rgba(255,255,255,0.22)' }}>
            {hint}
          </span>
          <div className="flex items-center gap-1.5">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>
              active
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row" style={{ background: '#10101a' }}>
        <div className="flex-1 min-w-0" style={{ overflowX: 'auto' }}>
          <div style={{ position: 'relative', width: canvasW, height: Math.max(canvasH, 200), minWidth: '100%' }}>
            <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <defs>
                <pattern id={`dots-${uid}`} width="22" height="22" patternUnits="userSpaceOnUse">
                  <circle cx="11" cy="11" r="0.85" fill="rgba(255,255,255,0.07)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#dots-${uid})`} />
            </svg>

            <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <marker id={`arr-${uid}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.22)" />
                </marker>
                <marker id={`arr-a-${uid}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="#a78bfa" />
                </marker>
              </defs>
              {connections.map((conn, i) => {
                const from = nodes.find(n => n.id === conn.from)
                const to = nodes.find(n => n.id === conn.to)
                if (!from || !to) return null
                const active = activeNodes.has(conn.to) || highlightId === conn.to || highlightId === conn.from
                const isIfBranch = from.type === 'if'
                const branches = ifBranches.get(from.id) || []
                const branchIdx = branches.findIndex(b => b.to === conn.to)
                const midX = (from.x + NW + to.x) / 2
                const midY = (from.y + to.y + NH) / 2

                return (
                  <g key={`${conn.from}→${conn.to}`}>
                    <motion.path
                      d={bezierPath(from, to)}
                      fill="none"
                      stroke={active ? '#a78bfa' : 'rgba(255,255,255,0.18)'}
                      strokeWidth={active ? 2 : 1.5}
                      markerEnd={active ? `url(#arr-a-${uid})` : `url(#arr-${uid})`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
                    />
                    {isIfBranch && branchIdx >= 0 && (
                      <text
                        x={midX}
                        y={midY}
                        fill={branchIdx === 0 ? '#22c55e' : '#f97316'}
                        fontSize="9"
                        fontWeight="700"
                        textAnchor="middle"
                        style={{ pointerEvents: 'none' }}
                      >
                        {branchIdx === 0 ? 'true' : 'false'}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>

            {nodes.map((node, i) => {
              const meta = TYPE_META[node.type] || TYPE_META.code
              const active = activeNodes.has(node.id)
              const selected = highlightId === node.id
              return (
                <motion.button
                  key={node.id}
                  type="button"
                  initial={{ opacity: 0, y: 6 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.055, ease: 'easeOut' }}
                  onClick={() => selectNode(node)}
                  style={{
                    position: 'absolute',
                    left: node.x,
                    top: node.y,
                    width: NW,
                    height: NH,
                    borderRadius: 8,
                    background: active ? `${meta.color}1a` : selected ? '#1e2340' : '#1a1d2e',
                    border: `2px solid ${selected ? meta.color : active ? meta.color : 'rgba(255,255,255,0.1)'}`,
                    display: 'flex',
                    alignItems: 'stretch',
                    overflow: 'hidden',
                    boxShadow: selected
                      ? `0 0 0 2px ${meta.color}44, 0 4px 20px rgba(0,0,0,0.55)`
                      : active
                        ? `0 0 20px ${meta.color}44`
                        : '0 2px 6px rgba(0,0,0,0.5)',
                    transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s',
                    cursor: 'pointer',
                    padding: 0,
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      background: active || selected ? meta.color : `${meta.color}33`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: ['netsuite', 'sendgrid'].includes(node.type) ? 9 : 12,
                      fontWeight: 700,
                      color: active || selected ? 'white' : meta.color,
                      fontFamily: 'monospace',
                    }}
                  >
                    {meta.icon}
                  </div>
                  <div
                    style={{
                      padding: '8px 10px',
                      overflow: 'hidden',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.9)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {node.label}
                    </div>
                    {node.sub && (
                      <div
                        style={{
                          fontSize: 9.5,
                          color: 'rgba(255,255,255,0.38)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          marginTop: 2,
                        }}
                      >
                        {node.sub}
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: selected || active ? meta.color : 'rgba(255,255,255,0.15)',
                      alignSelf: 'center',
                      marginRight: 7,
                      flexShrink: 0,
                    }}
                  />
                </motion.button>
              )
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedNode && (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.18 }}
              className="w-full lg:w-[min(100%,340px)] flex-shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderLeft: 'none' }}
            >
              <div className="lg:border-l lg:border-t-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <NodeDetailPanel
                  node={selectedNode}
                  tab={panelTab}
                  onTabChange={setPanelTab}
                  onClose={() => {
                    stopWalk()
                    setSelectedId(null)
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!selectedNode && (
        <p className="text-center text-xs py-2 lg:hidden" style={{ color: 'rgba(255,255,255,0.25)', background: '#0c0c12' }}>
          {hint}
        </p>
      )}
    </div>
  )
}

'use client'

import { useEffect, useRef, useState, useId } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NW = 176
const NH = 58

const TYPE_META = {
  trigger:     { color: '#e74c3c', icon: '⚡' },
  schedule:    { color: '#f97316', icon: '⏱' },
  email:       { color: '#3b82f6', icon: '✉'  },
  webhook:     { color: '#e74c3c', icon: '⚓'  },
  merge:       { color: '#64748b', icon: '⊕'  },
  ai:          { color: '#8b5cf6', icon: '✦'  },
  code:        { color: '#f97316', icon: '</>' },
  if:          { color: '#eab308', icon: '◇'  },
  quickbooks:  { color: '#22c55e', icon: 'QB' },
  sheets:      { color: '#10b981', icon: '▦'  },
  drive:       { color: '#4285f4', icon: '▲'  },
  slack:       { color: '#e01e5a', icon: 'S'  },
  notion:      { color: '#9ca3af', icon: 'N'  },
  plaid:       { color: '#00b233', icon: 'P'  },
  billcom:     { color: '#0066cc', icon: '⊕'  },
  gusto:       { color: '#f45d48', icon: 'G'  },
  netsuite:    { color: '#2563eb', icon: 'NS' },
  sendgrid:    { color: '#1a82e2', icon: 'SG' },
  http:        { color: '#06b6d4', icon: '↗'  },
  brex:        { color: '#ff6f00', icon: 'Bx' },
}

function bezierPath(fromNode, toNode) {
  const x1 = fromNode.x + NW
  const y1 = fromNode.y + NH / 2
  const x2 = toNode.x
  const y2 = toNode.y + NH / 2
  const dx = Math.max(60, (x2 - x1) * 0.5)
  return `M ${x1} ${y1} C ${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`
}

function SettingsPopover({ node, anchorRect, onMouseEnter, onMouseLeave }) {
  const meta = TYPE_META[node.type] || TYPE_META.code
  const settings = node.settings || []
  const popH = 44 + settings.length * 30 + 12
  const showBelow = anchorRect.top < popH + 20
  const left = Math.max(8, Math.min(
    anchorRect.left + anchorRect.width / 2 - 140,
    (typeof window !== 'undefined' ? window.innerWidth : 1200) - 288
  ))
  const top = showBelow
    ? anchorRect.bottom + 10
    : anchorRect.top - popH - 10

  return (
    <motion.div
      initial={{ opacity: 0, y: showBelow ? -6 : 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: showBelow ? -4 : 4, scale: 0.97 }}
      transition={{ duration: 0.14, ease: 'easeOut' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        zIndex: 9999,
        width: 280,
        left,
        top,
        borderRadius: 10,
        overflow: 'hidden',
        background: '#13141f',
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)',
        pointerEvents: 'auto',
      }}
    >
      {/* Arrow */}
      <div style={{
        position: 'absolute',
        [showBelow ? 'top' : 'bottom']: -7,
        left: Math.min(
          Math.max(anchorRect.left + anchorRect.width / 2 - left - 7, 16),
          264 - 16
        ),
        width: 14,
        height: 7,
        overflow: 'hidden',
        ...(showBelow ? {} : { transform: 'rotate(180deg)' }),
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          width: 10,
          height: 10,
          background: '#13141f',
          border: '1px solid rgba(255,255,255,0.14)',
        }} />
      </div>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 14px',
        background: `${meta.color}18`,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: 6,
          background: meta.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: node.type === 'netsuite' || node.type === 'sendgrid' ? 8 : 12,
          fontWeight: 700, color: 'white',
          fontFamily: 'monospace',
          flexShrink: 0,
        }}>
          {meta.icon}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.95)', lineHeight: 1.3 }}>{node.label}</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>Node settings</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 9, color: meta.color, fontWeight: 600, letterSpacing: '0.05em', flexShrink: 0 }}>
          {node.type.toUpperCase()}
        </div>
      </div>

      {/* Settings rows */}
      {settings.length > 0 ? (
        <div style={{ padding: '6px 0 6px' }}>
          {settings.map((s, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '5px 14px',
                gap: 10,
                borderBottom: i < settings.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}
            >
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', flexShrink: 0, lineHeight: 1.5, whiteSpace: 'nowrap' }}>
                {s.label}
              </span>
              <span style={{
                fontSize: 11,
                color: s.highlight ? meta.color : 'rgba(255,255,255,0.82)',
                textAlign: 'right',
                fontFamily: s.mono ? '"SF Mono", "Fira Code", monospace' : 'inherit',
                fontSize: s.mono ? 10.5 : 11,
                wordBreak: 'break-word',
                lineHeight: 1.5,
              }}>
                {s.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '12px 14px', fontSize: 11, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
          No settings configured
        </div>
      )}
    </motion.div>
  )
}

export default function N8NCanvas({ nodes, connections }) {
  const uid = useId().replace(/:/g, '')
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [activeNodes, setActiveNodes] = useState(new Set())
  const [popover, setPopover] = useState(null)
  const hideTimer = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const sortedIds = [...nodes].sort((a, b) => a.x - b.x || a.y - b.y).map(n => n.id)

  useEffect(() => {
    if (!inView) return
    const timers = []
    sortedIds.forEach((id, i) => {
      timers.push(setTimeout(() => setActiveNodes(p => new Set([...p, id])), 900 + i * 280))
      timers.push(setTimeout(() => setActiveNodes(p => { const n = new Set(p); n.delete(id); return n }), 900 + i * 280 + 480))
    })
    return () => timers.forEach(clearTimeout)
  }, [inView])

  const canvasW = Math.max(...nodes.map(n => n.x)) + NW + 30
  const canvasH = Math.max(...nodes.map(n => n.y)) + NH + 30

  const showPopover = (e, node) => {
    if (!node.settings?.length) return
    clearTimeout(hideTimer.current)
    const rect = e.currentTarget.getBoundingClientRect()
    setPopover({ node, anchorRect: rect })
  }

  const startHide = () => {
    hideTimer.current = setTimeout(() => setPopover(null), 140)
  }

  const cancelHide = () => clearTimeout(hideTimer.current)

  return (
    <div ref={ref} className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
      {/* Titlebar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: '#0c0c12', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
        <span className="ml-3 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>n8n — workflow editor</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>active</span>
        </div>
      </div>

      {/* Canvas */}
      <div style={{ overflowX: 'auto', overflowY: 'hidden', background: '#10101a' }}>
        <div style={{ position: 'relative', width: canvasW, height: Math.max(canvasH, 200), minWidth: '100%' }}>
          {/* Grid */}
          <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <pattern id={`dots-${uid}`} width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="11" cy="11" r="0.85" fill="rgba(255,255,255,0.07)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#dots-${uid})`} />
          </svg>

          {/* Connections */}
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
              const active = activeNodes.has(conn.to)
              return (
                <motion.path
                  key={`${conn.from}→${conn.to}`}
                  d={bezierPath(from, to)}
                  fill="none"
                  stroke={active ? '#a78bfa' : 'rgba(255,255,255,0.18)'}
                  strokeWidth={active ? 2 : 1.5}
                  markerEnd={active ? `url(#arr-a-${uid})` : `url(#arr-${uid})`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
                  style={{ transition: 'stroke 0.15s, stroke-width 0.15s' }}
                />
              )
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node, i) => {
            const meta = TYPE_META[node.type] || TYPE_META.code
            const active = activeNodes.has(node.id)
            const hovered = popover?.node.id === node.id
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: i * 0.055, ease: 'easeOut' }}
                onMouseEnter={e => showPopover(e, node)}
                onMouseLeave={startHide}
                style={{
                  position: 'absolute',
                  left: node.x, top: node.y,
                  width: NW, height: NH,
                  borderRadius: 8,
                  background: active ? `${meta.color}1a` : hovered ? '#1e2340' : '#1a1d2e',
                  border: `1px solid ${active ? meta.color : hovered ? `${meta.color}70` : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex', alignItems: 'stretch',
                  overflow: 'hidden',
                  boxShadow: active
                    ? `0 0 20px ${meta.color}44, 0 2px 8px rgba(0,0,0,0.5)`
                    : hovered
                      ? `0 0 0 1px ${meta.color}30, 0 4px 16px rgba(0,0,0,0.5)`
                      : '0 2px 6px rgba(0,0,0,0.5)',
                  transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s',
                  cursor: node.settings?.length ? 'default' : 'default',
                }}
              >
                <div style={{
                  width: 44, background: active ? meta.color : `${meta.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: ['netsuite', 'sendgrid'].includes(node.type) ? 9 : 12,
                  fontWeight: 700,
                  color: active ? 'white' : meta.color,
                  letterSpacing: '-0.5px', fontFamily: 'monospace',
                  transition: 'background 0.15s, color 0.15s',
                }}>
                  {meta.icon}
                </div>
                <div style={{ padding: '8px 10px', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.9)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.3 }}>
                    {node.label}
                  </div>
                  {node.sub && (
                    <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.38)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2, lineHeight: 1.3 }}>
                      {node.sub}
                    </div>
                  )}
                </div>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: active ? meta.color : 'rgba(255,255,255,0.15)',
                  border: `1px solid ${active ? meta.color : 'rgba(255,255,255,0.25)'}`,
                  alignSelf: 'center', marginRight: 7, flexShrink: 0,
                  transition: 'background 0.15s',
                }} />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Portal popover */}
      {mounted && createPortal(
        <AnimatePresence>
          {popover && (
            <SettingsPopover
              key={popover.node.id}
              node={popover.node}
              anchorRect={popover.anchorRect}
              onMouseEnter={cancelHide}
              onMouseLeave={startHide}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}

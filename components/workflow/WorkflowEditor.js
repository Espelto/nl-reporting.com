'use client'

import { useEffect, useRef, useState, useId, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NW, NH, bezierPath, walkOrder } from './workflowUtils'
import NodeDetailPanel from './NodeDetailPanel'

const EMPTY_ARR = []

function renderNodeContent(node, meta, variant, active, selected) {
  const labelStyle = {
    fontSize: 11,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
  const subStyle = {
    fontSize: 9.5,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: 2,
  }

  if (variant === 'knime') {
    return (
      <>
        <div style={{ height: 4, background: '#FFB800', flexShrink: 0 }} />
        <div style={{ padding: '8px 10px', flex: 1, overflow: 'hidden' }}>
          <div style={{ ...labelStyle, color: '#1a1a1a' }}>{node.label}</div>
          {node.sub && <div style={{ ...subStyle, color: '#666' }}>{node.sub}</div>}
        </div>
      </>
    )
  }

  if (variant === 'pi') {
    return (
      <>
        <div
          style={{
            width: 4,
            background: selected || active ? '#c51a4a' : '#22c55e',
            flexShrink: 0,
            transition: 'background 0.15s',
          }}
        />
        <div style={{ padding: '8px 10px', flex: 1, overflow: 'hidden' }}>
          <div style={{ ...labelStyle, color: 'rgba(255,255,255,0.92)' }}>{node.label}</div>
          {node.sub && <div style={{ ...subStyle, color: 'rgba(255,255,255,0.4)' }}>{node.sub}</div>}
        </div>
      </>
    )
  }

  return (
    <>
      <div
        style={{
          width: 44,
          background: active || selected ? meta.color : `${meta.color}33`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: 12,
          fontWeight: 700,
          color: active || selected ? 'white' : meta.color,
          fontFamily: 'monospace',
        }}
      >
        {meta.icon}
      </div>
      <div style={{ padding: '8px 10px', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ ...labelStyle, color: 'rgba(255,255,255,0.9)' }}>{node.label}</div>
        {node.sub && <div style={{ ...subStyle, color: 'rgba(255,255,255,0.38)' }}>{node.sub}</div>}
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
    </>
  )
}

function nodeSurfaceStyle(variant, meta, active, selected) {
  if (variant === 'knime') {
    return {
      background: selected ? '#fffef5' : active ? '#fff9e6' : '#ffffff',
      border: `2px solid ${selected ? '#FFB800' : active ? '#e6a800' : '#d4d4d4'}`,
      boxShadow: selected
        ? '0 4px 20px rgba(255,184,0,0.35)'
        : '0 2px 8px rgba(0,0,0,0.12)',
      flexDirection: 'column',
      alignItems: 'stretch',
    }
  }
  if (variant === 'pi') {
    return {
      background: selected ? '#1a2830' : active ? '#152028' : '#121a22',
      border: `2px solid ${selected ? '#22c55e' : active ? '#22c55e88' : 'rgba(34,197,94,0.25)'}`,
      boxShadow: selected ? '0 0 0 2px rgba(34,197,94,0.25)' : '0 2px 8px rgba(0,0,0,0.45)',
      flexDirection: 'row',
      alignItems: 'stretch',
    }
  }
  return {
    background: active ? `${meta.color}1a` : selected ? '#1e2340' : '#1a1d2e',
    border: `2px solid ${selected ? meta.color : active ? meta.color : 'rgba(255,255,255,0.1)'}`,
    boxShadow: selected
      ? `0 0 0 2px ${meta.color}44, 0 4px 20px rgba(0,0,0,0.55)`
      : active
        ? `0 0 20px ${meta.color}44`
        : '0 2px 6px rgba(0,0,0,0.5)',
    flexDirection: 'row',
    alignItems: 'stretch',
  }
}

export default function WorkflowEditor({
  nodes = EMPTY_ARR,
  connections = EMPTY_ARR,
  typeMeta = {},
  editorTitle,
  editorBadge,
  variant = 'n8n',
  accentColor = '#a78bfa',
  canvasBg = '#10101a',
  headerBg = '#0c0c12',
  dotColor = 'rgba(255,255,255,0.07)',
  showWalkthrough = true,
  walkthroughLabel = 'Walk the workflow',
  hint = 'Click any node to see parameters and sample output',
  footerNote,
  branchNodeTypes = ['if'],
  statusLabel = 'active',
}) {
  const uid = useId().replace(/:/g, '')
  const ref = useRef(null)
  const scrollerRef = useRef(null)
  const pan = useRef(null)
  const [inView, setInView] = useState(false)
  const [activeNodes, setActiveNodes] = useState(new Set())
  const [selectedId, setSelectedId] = useState(null)
  const [panelTab, setPanelTab] = useState('Parameters')
  const [walkIndex, setWalkIndex] = useState(-1)
  const [walking, setWalking] = useState(false)
  const walkTimer = useRef(null)

  const nodeList = Array.isArray(nodes) ? nodes : []
  const connList = Array.isArray(connections) ? connections : []
  const order = useMemo(() => walkOrder(nodeList, connList), [nodeList, connList])
  const selectedNode = nodeList.find(n => n.id === selectedId) || null
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
    const sortedIds = [...nodeList].sort((a, b) => a.x - b.x || a.y - b.y).map(n => n.id)
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
  }, [inView, nodeList])

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

  useEffect(() => {
    if (!highlightId) return
    const nodeEl = scrollerRef.current?.querySelector(`[data-node-id="${highlightId}"]`)
    nodeEl?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [highlightId])

  const selectNode = node => {
    stopWalk()
    setSelectedId(node.id)
    setPanelTab('Parameters')
  }

  const xs = nodeList.map(n => n.x ?? 0)
  const ys = nodeList.map(n => n.y ?? 0)
  const canvasW = (xs.length ? Math.max(...xs) : 0) + NW + 40
  const canvasH = (ys.length ? Math.max(...ys) : 0) + NH + 40

  const branchMap = useMemo(() => {
    const map = new Map()
    connList.forEach(c => {
      const from = nodeList.find(n => n.id === c.from)
      if (from && branchNodeTypes.includes(from.type)) {
        if (!map.has(c.from)) map.set(c.from, [])
        map.get(c.from).push(c.to)
      }
    })
    return map
  }, [nodeList, connList, branchNodeTypes])

  const edgeIdle = variant === 'knime' ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.18)'

  const onPanDown = e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    if (e.target.closest('button')) return
    const el = scrollerRef.current
    if (!el) return
    pan.current = { x: e.clientX, left: el.scrollLeft }
    el.setPointerCapture?.(e.pointerId)
  }
  const onPanMove = e => {
    if (!pan.current) return
    const el = scrollerRef.current
    if (!el) return
    el.scrollLeft = pan.current.left - (e.clientX - pan.current.x)
  }
  const onPanUp = () => {
    pan.current = null
  }

  return (
    <div ref={ref} className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
      <div
        className="flex items-center gap-2 px-4 py-2.5 flex-wrap"
        style={{ background: headerBg, borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        {variant === 'n8n' && (
          <>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
          </>
        )}
        {variant === 'knime' && (
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: '#FFB800', color: '#1a1a1a' }}
          >
            K
          </span>
        )}
        {variant === 'pi' && (
          <span style={{ fontSize: 14 }} aria-hidden>
            🥧
          </span>
        )}
        <span className="ml-1 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {editorTitle}
        </span>
        {editorBadge && (
          <span
            className="text-xs px-2 py-0.5 rounded-full hidden sm:inline"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}
          >
            {editorBadge}
          </span>
        )}
        <div className="ml-auto flex items-center gap-3 flex-wrap">
          {showWalkthrough && order.length > 1 && (
            <button
              type="button"
              onClick={walking ? stopWalk : startWalk}
              className="text-xs font-semibold px-3 py-1 rounded-md transition-opacity hover:opacity-90"
              style={{
                background: walking ? 'rgba(234,179,8,0.2)' : `${accentColor}33`,
                color: walking ? '#eab308' : accentColor,
                border: `1px solid ${walking ? 'rgba(234,179,8,0.35)' : `${accentColor}55`}`,
              }}
            >
              {walking ? 'Stop tour' : walkthroughLabel}
            </button>
          )}
          <span className="text-xs hidden sm:inline" style={{ color: 'rgba(255,255,255,0.22)' }}>
            {hint}
          </span>
          <div className="flex items-center gap-1.5">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>
              {statusLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row" style={{ background: canvasBg }}>
        <div
          ref={scrollerRef}
          className="flex-1 min-w-0"
          style={{ overflowX: 'auto', cursor: 'grab' }}
          onPointerDown={onPanDown}
          onPointerMove={onPanMove}
          onPointerUp={onPanUp}
          onPointerCancel={onPanUp}
        >
          <div style={{ position: 'relative', width: canvasW, height: Math.max(canvasH, 200), minWidth: '100%' }}>
            <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              <defs>
                <pattern id={`dots-${uid}`} width="22" height="22" patternUnits="userSpaceOnUse">
                  <circle cx="11" cy="11" r="0.85" fill={dotColor} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#dots-${uid})`} />
            </svg>

            <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
              <defs>
                <marker id={`arr-${uid}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill={edgeIdle} />
                </marker>
                <marker id={`arr-a-${uid}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill={accentColor} />
                </marker>
              </defs>
              {connList.map((conn, i) => {
                const from = nodeList.find(n => n.id === conn.from)
                const to = nodeList.find(n => n.id === conn.to)
                if (!from || !to) return null
                const active = activeNodes.has(conn.to) || highlightId === conn.to || highlightId === conn.from
                const branches = branchMap.get(conn.from) || []
                const branchIdx = branches.indexOf(conn.to)
                const isBranch = branchNodeTypes.includes(from.type) && branches.length >= 2 && branchIdx >= 0
                const midX = (from.x + NW + to.x) / 2
                const midY = (from.y + to.y + NH) / 2
                const branchLabels = from.branchLabels || ['true', 'false']

                return (
                  <g key={`${conn.from}→${conn.to}`}>
                    <motion.path
                      d={bezierPath(from, to)}
                      fill="none"
                      stroke={active ? accentColor : edgeIdle}
                      strokeWidth={active ? 2 : 1.5}
                      markerEnd={active ? `url(#arr-a-${uid})` : `url(#arr-${uid})`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
                    />
                    {isBranch && (
                      <text
                        x={midX}
                        y={midY}
                        fill={branchIdx === 0 ? '#22c55e' : '#f97316'}
                        fontSize="9"
                        fontWeight="700"
                        textAnchor="middle"
                        style={{ pointerEvents: 'none' }}
                      >
                        {branchLabels[branchIdx] || (branchIdx === 0 ? 'match' : 'else')}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>

            {nodeList.map((node, i) => {
              const meta = typeMeta[node.type] || typeMeta.default || { color: '#64748b', icon: '•' }
              const active = activeNodes.has(node.id)
              const selected = highlightId === node.id
              const surface = nodeSurfaceStyle(variant, meta, active, selected)

              return (
                <motion.button
                  key={node.id}
                  type="button"
                  data-node-id={node.id}
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
                    borderRadius: variant === 'pi' ? 10 : 8,
                    display: 'flex',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    padding: 0,
                    textAlign: 'left',
                    zIndex: 1,
                    transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s',
                    ...surface,
                  }}
                >
                  {renderNodeContent(node, meta, variant, active, selected)}
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
            >
              <div className="lg:border-l" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <NodeDetailPanel
                  node={selectedNode}
                  typeMeta={typeMeta}
                  tab={panelTab}
                  onTabChange={setPanelTab}
                  onClose={() => {
                    stopWalk()
                    setSelectedId(null)
                  }}
                  footerNote={footerNote}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!selectedNode && (
        <p className="text-center text-xs py-2 lg:hidden" style={{ color: 'rgba(255,255,255,0.25)', background: headerBg }}>
          {hint}
        </p>
      )}
    </div>
  )
}

'use client'

function NodeIcon({ type, typeMeta, active }) {
  const meta = typeMeta[type] || typeMeta.default || { color: '#64748b', icon: '•' }
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
        fontSize: 11,
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

export default function NodeDetailPanel({
  node,
  typeMeta,
  tab,
  onTabChange,
  onClose,
  footerNote = 'Interactive preview · configured & maintained by NL Reporting',
  panelBg = '#13141f',
}) {
  const meta = typeMeta[node.type] || typeMeta.default || { color: '#64748b', icon: '•' }
  const parameters = node.parameters || node.settings || []
  const hasOutput = node.outputSample && Object.keys(node.outputSample).length > 0
  const hasAbout = Boolean(node.businessSummary)
  const tabs = ['Parameters', ...(hasOutput ? ['Output'] : []), ...(hasAbout ? ['Why'] : [])]
  const activeTab = tabs.includes(tab) ? tab : tabs[0]

  return (
    <div className="flex flex-col h-full" style={{ background: panelBg, minHeight: 280 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          padding: '14px 14px 10px',
          background: `${meta.color}18`,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <NodeIcon type={node.type} typeMeta={typeMeta} active />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.95)' }}>{node.label}</div>
          {node.sub && (
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{node.sub}</div>
          )}
          <div style={{ fontSize: 9, color: meta.color, fontWeight: 600, letterSpacing: '0.06em', marginTop: 4 }}>
            {(node.typeLabel || node.type).toUpperCase()}
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

      <div className="flex gap-0 px-3 pt-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
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
          <div style={{ padding: 14 }}>
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
        {footerNote}
      </div>
    </div>
  )
}

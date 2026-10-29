'use client'

import WorkflowEditor from '@/components/workflow/WorkflowEditor'

const KNIME_TYPE_META = {
  schedule: { color: '#f97316', icon: '⏱' },
  reader: { color: '#FFB800', icon: '▤' },
  db: { color: '#2563eb', icon: 'DB' },
  joiner: { color: '#64748b', icon: '⊕' },
  rule: { color: '#eab308', icon: '◇' },
  groupby: { color: '#8b5cf6', icon: 'Σ' },
  math: { color: '#f97316', icon: 'fx' },
  ai: { color: '#8b5cf6', icon: '✦' },
  writer: { color: '#22c55e', icon: '▦' },
  email: { color: '#3b82f6', icon: '✉' },
  slack: { color: '#e01e5a', icon: 'S' },
  sheets: { color: '#10b981', icon: '▦' },
  default: { color: '#FFB800', icon: 'K' },
}

export default function KnimeCanvas(props) {
  return (
    <WorkflowEditor
      {...props}
      variant="knime"
      typeMeta={KNIME_TYPE_META}
      editorTitle="KNIME Analytics Platform"
      editorBadge="visual data pipeline"
      accentColor="#FFB800"
      canvasBg="#2a2a32"
      headerBg="#1e1e26"
      dotColor="rgba(255,255,255,0.05)"
      walkthroughLabel="Walk the pipeline"
      hint="Click a node to see KNIME node settings"
      branchNodeTypes={['rule']}
      footerNote="KNIME workflow preview · designed & deployed by NL Reporting"
    />
  )
}

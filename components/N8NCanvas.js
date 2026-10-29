'use client'

import WorkflowEditor from '@/components/workflow/WorkflowEditor'

const N8N_TYPE_META = {
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
  default: { color: '#64748b', icon: '•' },
}

export default function N8NCanvas(props) {
  return (
    <WorkflowEditor
      {...props}
      variant="n8n"
      typeMeta={N8N_TYPE_META}
      editorTitle="n8n — workflow editor"
      accentColor="#a78bfa"
      branchNodeTypes={['if']}
      footerNote="Interactive preview · configured & maintained by NL Reporting"
    />
  )
}

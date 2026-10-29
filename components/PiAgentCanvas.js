'use client'

import WorkflowEditor from '@/components/workflow/WorkflowEditor'

const PI_TYPE_META = {
  schedule: { color: '#22c55e', icon: '⏱' },
  files: { color: '#3b82f6', icon: '📁' },
  memory: { color: '#64748b', icon: 'M' },
  llm: { color: '#c51a4a', icon: 'AI' },
  ai: { color: '#c51a4a', icon: 'AI' },
  tools: { color: '#f97316', icon: '⚙' },
  code: { color: '#f97316', icon: '⚙' },
  slack: { color: '#e01e5a', icon: 'S' },
  guard: { color: '#eab308', icon: '◇' },
  if: { color: '#eab308', icon: '◇' },
  quickbooks: { color: '#22c55e', icon: 'QB' },
  billcom: { color: '#0066cc', icon: 'B' },
  gusto: { color: '#f45d48', icon: 'G' },
  plaid: { color: '#00b233', icon: 'P' },
  sheets: { color: '#10b981', icon: '▦' },
  default: { color: '#22c55e', icon: 'π' },
}

export default function PiAgentCanvas(props) {
  return (
    <WorkflowEditor
      {...props}
      variant="pi"
      typeMeta={PI_TYPE_META}
      editorTitle="Pi Agent · on-premise assistant"
      editorBadge="source data stays local"
      accentColor="#22c55e"
      canvasBg="#0a1210"
      headerBg="#060e0c"
      dotColor="rgba(34,197,94,0.08)"
      walkthroughLabel="Walk the agent loop"
      hint="Click a step to see prompts, tools, and local model settings"
      branchNodeTypes={['guard', 'if']}
      statusLabel="running locally"
      footerNote="Pi Agent preview · runs on your hardware · source ledgers stay on the LAN"
    />
  )
}

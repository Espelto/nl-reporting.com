'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import N8NCanvas from '@/components/N8NCanvas'

const invoiceTeaserWorkflow = {
  nodes: [
    {
      id: 'imap',
      type: 'email',
      label: 'IMAP Trigger',
      sub: 'AP inbox · every 2 min',
      x: 24,
      y: 72,
      businessSummary:
        'Watches your AP inbox and pulls in every new invoice attachment automatically — no one has to forward emails or drag files.',
      credential: { name: 'Gmail IMAP', status: 'Connected' },
      settings: [
        { label: 'Mailbox', value: 'ap@company.com' },
        { label: 'Poll every', value: '2 minutes' },
        { label: 'Filter', value: 'Has PDF/image attachment' },
      ],
    },
    {
      id: 'merge',
      type: 'merge',
      label: 'Merge',
      sub: 'Email + Drive + EDI',
      x: 220,
      y: 72,
      businessSummary: 'Combines invoices from email, shared folders, and your EDI supplier into one queue.',
      settings: [
        { label: 'Mode', value: 'Append (3 sources)' },
        { label: 'Sources', value: 'IMAP, Google Drive, Webhook' },
      ],
    },
    {
      id: 'claude',
      type: 'ai',
      label: 'Claude AI',
      sub: 'Extract invoice fields',
      x: 416,
      y: 72,
      businessSummary:
        'Reads each PDF and returns structured data — vendor, line items, totals, and suggested GL codes — ready for your books.',
      credential: { name: 'Anthropic API', status: 'Connected' },
      settings: [
        { label: 'Model', value: 'claude-3-5-sonnet', mono: true },
        { label: 'Response', value: 'JSON object', highlight: true },
        { label: 'Temperature', value: '0' },
      ],
      outputSample: {
        vendor_name: 'Acme Corporation',
        invoice_no: 'INV-2024-1042',
        invoice_date: '2024-03-15',
        due_date: '2024-04-14',
        currency: 'USD',
        line_items: [
          { description: 'SaaS subscription Q1', amount: 2400 },
          { description: 'Onboarding support', amount: 600 },
        ],
        subtotal: 3000,
        tax: 240,
        total: 3240,
        suggested_gl: '6100 · Software',
      },
    },
    {
      id: 'validate',
      type: 'code',
      label: 'Code',
      sub: 'Validate & dedupe',
      x: 612,
      y: 72,
      businessSummary:
        'Checks math, matches vendors to QuickBooks, verifies POs, and blocks duplicate bills before anything gets posted.',
      settings: [
        { label: 'Totals check', value: 'Line items ≈ invoice total (±$0.01)' },
        { label: 'Vendor', value: 'Fuzzy match to QB master' },
        { label: 'Duplicate', value: 'Same vendor + invoice # in 90 days' },
      ],
    },
    {
      id: 'if',
      type: 'if',
      label: 'IF',
      sub: 'All checks passed?',
      x: 808,
      y: 72,
      businessSummary:
        'Clean invoices post to QuickBooks automatically. Anything that fails a check goes to your team in Slack with the full context.',
      settings: [
        { label: 'Condition', value: '{{ $json.valid }} === true', mono: true, expression: true },
        { label: 'True branch', value: 'Create QuickBooks Bill', highlight: true },
        { label: 'False branch', value: 'Slack exception alert' },
      ],
    },
    {
      id: 'qb-bill',
      type: 'quickbooks',
      label: 'QuickBooks',
      sub: 'Create Bill',
      x: 1004,
      y: 24,
      businessSummary: 'Posts the approved bill to QuickBooks with the correct vendor, dates, and line items.',
      credential: { name: 'QuickBooks Online', status: 'Connected' },
      settings: [
        { label: 'Operation', value: 'Create Bill' },
        { label: 'Vendor', value: '{{ $json.vendor_id }}', mono: true, expression: true },
        { label: 'Line items', value: '{{ $json.line_items }}', mono: true, expression: true },
      ],
      outputSample: { Id: '1847', DocNumber: 'INV-2024-1042', TotalAmt: 3240, status: 'Open' },
    },
    {
      id: 'slack',
      type: 'slack',
      label: 'Slack',
      sub: 'Exception alert',
      x: 1004,
      y: 120,
      businessSummary:
        'Sends exceptions to #ap-exceptions with extracted data and a link to the PDF so review takes minutes, not a full re-key.',
      settings: [
        { label: 'Channel', value: '#ap-exceptions' },
        { label: 'Includes', value: 'JSON + fail reason + doc link' },
      ],
    },
  ],
  connections: [
    { from: 'imap', to: 'merge' },
    { from: 'merge', to: 'claude' },
    { from: 'claude', to: 'validate' },
    { from: 'validate', to: 'if' },
    { from: 'if', to: 'qb-bill' },
    { from: 'if', to: 'slack' },
  ],
}

const otherCases = [
  {
    title: 'Month-end close',
    metric: '12 → 4 days',
    sub: 'Bank recs overnight, journals auto-posted, live close dashboard',
    slug: 'month-end-close',
  },
  {
    title: 'Budget vs actuals',
    metric: 'Monday 7am',
    sub: 'Weekly variance report before leadership meets',
    slug: 'budget-vs-actuals',
  },
  {
    title: 'Cash flow forecasting',
    metric: '91% accuracy',
    sub: 'Daily 13-week forecast from 4 live data sources',
    slug: 'cash-flow-forecasting',
  },
]

export default function UseCases() {
  return (
    <section id="use-cases" className="py-24 px-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Use cases
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Where finance teams get their time back</h2>
          <p className="text-dark-300 text-lg max-w-2xl mx-auto">
            Real automations for small and mid-size businesses — built on n8n and the tools you already use. Click through a live workflow preview below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5">
            <div>
              <p className="text-dark-400 text-xs uppercase tracking-wider mb-1">Featured · Accounts payable</p>
              <h3 className="text-2xl font-bold text-white">Invoice email → QuickBooks in ~3 minutes</h3>
              <p className="text-dark-300 text-sm mt-2 max-w-xl">
                A B2B SaaS team went from 140 hours/month on AP to about 8 hours reviewing exceptions only.
              </p>
            </div>
            <Link
              href="/case-studies/invoice-automation"
              className="text-primary-400 text-sm font-semibold hover:text-primary-300 transition-colors whitespace-nowrap"
            >
              Full case study →
            </Link>
          </div>
          <N8NCanvas
            nodes={invoiceTeaserWorkflow.nodes}
            connections={invoiceTeaserWorkflow.connections}
            hint="Click a node — or use Walk the workflow"
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {otherCases.map((cs, i) => (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={`/case-studies/${cs.slug}`}>
                <div
                  className="rounded-xl p-6 h-full group transition-all"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(26,123,174,0.4)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  }}
                >
                  <p className="text-dark-400 text-xs uppercase tracking-wider mb-2">{cs.title}</p>
                  <p className="text-2xl font-bold text-white mb-2">{cs.metric}</p>
                  <p className="text-dark-300 text-sm mb-4">{cs.sub}</p>
                  <span className="text-primary-400 text-xs group-hover:text-primary-300 transition-colors">
                    See workflow &amp; results →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

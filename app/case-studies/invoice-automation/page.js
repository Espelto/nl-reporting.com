import CaseStudy from '@/components/CaseStudy'

export const metadata = { title: 'Invoice Processing Automation | NL Reporting' }

const data = {
  title: 'Invoice Processing Automation',
  context: 'B2B SaaS · 8-person company · Finance team of 2 · ~200 invoices/month',
  tags: ['N8N', 'Claude AI', 'QuickBooks Online', 'IMAP', 'Google Drive'],
  numbers: [
    { value: '140h', label: 'freed per month' },
    { value: '45 → 3 min', label: 'per invoice' },
    { value: '99.2%', label: 'accuracy rate' },
    { value: '$7k', label: 'monthly savings' },
  ],
  sections: [
    {
      heading: 'The situation',
      body: [
        'The company received invoices from roughly 40 active vendors. Delivery methods were inconsistent: most came via email as PDF attachments, some vendors uploaded to a shared portal that required manual download, and one EDI-connected supplier sent structured files. All of it landed in the same AP inbox.',
        'The AP clerk\'s process was to open each invoice in a PDF viewer, read the fields, and manually type them into QuickBooks: vendor name, invoice number, date, due date, each line item with its description and amount, the GL code, and any associated purchase order number. Simple pass-through invoices (single line, familiar vendor) took around 8 minutes. Multi-line invoices with PO matching took 30–45 minutes. At 200+ invoices per month, this consumed the equivalent of nearly one full-time employee.',
        'Errors showed up regularly. Duplicate invoices occasionally slipped through and were only caught during bank reconciliation. PO mismatches — where the invoiced amount didn\'t match the open PO balance — sometimes weren\'t noticed until the vendor followed up on a short payment. The close cycle was delayed because AP wasn\'t finished until day 7 or 8 of the following month.',
      ],
    },
    {
      heading: 'What we built',
      body: [
        'We set up an N8N workflow with three separate trigger nodes, each handling one of the three invoice sources.',
        'The first trigger monitors the AP inbox via IMAP, polling every 2 minutes. When a new email arrives with a PDF or image attachment, the node extracts the attachment and passes it downstream. The second trigger polls a Google Drive folder every 15 minutes — this is the folder where the vendor portal PDFs are manually dropped by the clerk once downloaded. The third is a webhook endpoint registered in the EDI system, which fires whenever a new document is pushed.',
        'All three paths converge at the extraction step. The PDF or image is sent to Claude (claude-3-5-sonnet) with a structured prompt. The prompt asks Claude to return a JSON object with: vendor name, invoice number, invoice date, due date, currency, an array of line items (each with description, quantity, unit price, and line total), subtotal, tax amount, and total. The prompt also embeds the company\'s full chart of accounts as a reference table and asks Claude to suggest the most likely GL code for each line item based on the vendor name and item description.',
        'After extraction, the workflow runs three validation checks. First, it sums the line item totals and checks that they match the stated total within a $0.01 rounding tolerance — this catches cases where Claude misread a digit. Second, it queries the QuickBooks vendor list to confirm the vendor name matches a known vendor. Third, if a PO number is present on the invoice, it calls the QuickBooks purchase orders endpoint to verify the PO exists, is in an open status, and that the invoice amount doesn\'t exceed the remaining PO balance.',
        { type: 'callout', text: 'If all three checks pass, the workflow creates a bill in QuickBooks via the API. If any check fails, it stops and posts a Slack message to the AP channel with the extracted JSON, the specific reason for the failure, and a link to the original document. A human reviews, corrects if needed, and clicks a button to continue.' },
        'Duplicate detection runs before bill creation: the workflow queries QuickBooks for existing bills from the same vendor with the same invoice number in the past 90 days. If a match is found, the invoice is flagged rather than posted.',
        'All processed documents — regardless of pass or fail — are logged to a Google Sheet with a timestamp, extraction output, validation result, and the final QuickBooks bill ID if created. The original file is moved to a "Processed" subfolder in Drive.',
      ],
    },
    {
      heading: 'Technical details',
      body: [
        {
          type: 'list',
          items: [
            'N8N self-hosted on a $10/month DigitalOcean droplet (1 vCPU, 1GB RAM — sufficient for this workload)',
            'IMAP node polls every 2 minutes; Google Drive node polls every 15 minutes',
            'Claude API call takes 3–6 seconds per invoice; average cost is approximately $0.003 per invoice processed',
            'QuickBooks Online REST API v3 for vendor lookup, PO verification, and bill creation',
            'Slack webhook for error notifications — messages include the full extracted JSON so the reviewer can see exactly what Claude read from the document',
            'Google Sheets logging via the Sheets API — one row per invoice, retained indefinitely for audit',
          ],
        },
      ],
    },
    {
      heading: 'Edge cases handled during build',
      body: [
        'Multi-page invoices were the first issue we hit during testing. Claude only sees what\'s in the first API call, and some invoices have line items that run across pages. We handled this by checking whether the sum of extracted line items is within 2% of the stated total. If not, the workflow fetches additional pages and sends them in a follow-up prompt asking Claude to find any remaining line items.',
        'Foreign currency invoices from two vendors were out of scope for automatic posting — the company\'s currency conversion process involves a manual rate lookup step. These are detected by checking the currency field Claude extracts against "USD" and routed to a separate Slack alert for manual handling.',
        'One vendor sends invoices formatted as Excel files rather than PDFs. We added a conversion step using a LibreOffice CLI call on the server to render the file to PDF before it hits the extraction step.',
        'Occasionally Claude returns a vendor name with slight differences from the QuickBooks master (e.g. "Acme Corp." vs "Acme Corporation"). We added fuzzy matching using a simple Levenshtein distance check before flagging a vendor as unrecognised — this reduced false positives significantly without requiring exact string matches.',
      ],
    },
  ],
  workflow: {
    nodes: [
      { id: 'imap', type: 'email', label: 'IMAP Trigger', sub: 'AP inbox · every 2 min', x: 30, y: 30,
        settings: [
          { label: 'Host', value: 'mail.company.com', mono: true },
          { label: 'Port', value: '993 (IMAPS)' },
          { label: 'Mailbox', value: 'INBOX' },
          { label: 'Filter', value: 'has attachment' },
          { label: 'Poll every', value: '2 minutes' },
          { label: 'Download attachments', value: 'Yes', highlight: true },
        ]},
      { id: 'drive', type: 'drive', label: 'Google Drive', sub: 'Poll AP folder · 15 min', x: 30, y: 116,
        settings: [
          { label: 'Folder ID', value: '1BxiM...nF8', mono: true },
          { label: 'File types', value: 'PDF, PNG, JPG, XLSX' },
          { label: 'Poll every', value: '15 minutes' },
          { label: 'After read', value: 'Move to /Processed' },
        ]},
      { id: 'edi', type: 'webhook', label: 'Webhook', sub: 'EDI supplier push', x: 30, y: 202,
        settings: [
          { label: 'Method', value: 'POST' },
          { label: 'Path', value: '/webhook/edi-invoice', mono: true },
          { label: 'Auth', value: 'Bearer token' },
          { label: 'Content-Type', value: 'application/json' },
        ]},
      { id: 'merge', type: 'merge', label: 'Merge', sub: 'Combine 3 sources', x: 246, y: 116,
        settings: [
          { label: 'Mode', value: 'Wait for all inputs' },
          { label: 'Inputs', value: '3 (IMAP, Drive, Webhook)' },
          { label: 'Output', value: 'Items from all inputs' },
        ]},
      { id: 'claude', type: 'ai', label: 'Claude AI', sub: 'Extract invoice fields', x: 446, y: 116,
        businessSummary: 'Reads each PDF and returns structured invoice data — vendor, line items, totals, and GL suggestions — ready for validation and posting.',
        credential: { name: 'Anthropic API', status: 'Connected' },
        settings: [
          { label: 'Model', value: 'claude-3-5-sonnet', mono: true },
          { label: 'Max tokens', value: '1024' },
          { label: 'Temperature', value: '0' },
          { label: 'Response', value: 'JSON object', highlight: true },
          { label: 'Extracts', value: 'vendor, invoice_no, date, due_date, line_items, tax, total, currency, GL codes' },
        ],
        outputSample: {
          vendor_name: 'Acme Corporation',
          invoice_no: 'INV-2024-1042',
          total: 3240,
          currency: 'USD',
          line_items: [{ description: 'SaaS Q1', amount: 3000 }],
          suggested_gl: '6100',
        }},
      { id: 'validate', type: 'code', label: 'Code', sub: 'Validate totals · fuzzy match', x: 646, y: 116,
        settings: [
          { label: 'Check 1', value: 'Sum(line_items) ≈ total (±$0.01)' },
          { label: 'Check 2', value: 'Vendor in QB master list' },
          { label: 'Check 3', value: 'PO number present? Verify balance' },
          { label: 'Duplicate', value: 'Query QB: same vendor+invoice_no 90d' },
          { label: 'Fuzzy match', value: 'Levenshtein distance ≤ 2' },
        ]},
      { id: 'qb-vendor', type: 'quickbooks', label: 'QuickBooks', sub: 'Check vendor master', x: 846, y: 44,
        settings: [
          { label: 'Resource', value: 'Vendor' },
          { label: 'Operation', value: 'Get Many' },
          { label: 'Filter', value: 'DisplayName eq "{{ vendor }}"', mono: true },
          { label: 'API version', value: 'v3' },
        ]},
      { id: 'qb-po', type: 'quickbooks', label: 'QuickBooks', sub: 'Verify PO balance', x: 846, y: 188,
        settings: [
          { label: 'Resource', value: 'Purchase Order' },
          { label: 'Operation', value: 'Get' },
          { label: 'Check', value: 'Status = Open' },
          { label: 'Validate', value: 'Remaining balance ≥ invoice amount' },
        ]},
      { id: 'if', type: 'if', label: 'IF', sub: 'All checks passed?', x: 1046, y: 116,
        businessSummary: 'Passes clean invoices straight to QuickBooks. Failures go to Slack with full context for a quick human review.',
        settings: [
          { label: 'Condition', value: '{{ $json.valid }} === true', mono: true, expression: true },
          { label: 'True →', value: 'QuickBooks Create Bill', highlight: true },
          { label: 'False →', value: 'Slack exception alert' },
        ]},
      { id: 'qb-bill', type: 'quickbooks', label: 'QuickBooks', sub: 'Create Bill', x: 1246, y: 44,
        settings: [
          { label: 'Resource', value: 'Bill' },
          { label: 'Operation', value: 'Create' },
          { label: 'Vendor', value: '{{ $json.vendor_id }}', mono: true },
          { label: 'Due date', value: '{{ $json.due_date }}', mono: true },
          { label: 'Line items', value: '{{ $json.line_items }}', mono: true },
        ]},
      { id: 'slack', type: 'slack', label: 'Slack', sub: 'Exception alert', x: 1246, y: 188,
        settings: [
          { label: 'Channel', value: '#ap-exceptions' },
          { label: 'Includes', value: 'Extracted JSON + fail reason + doc link' },
          { label: 'Interactive', value: 'Approve / Reject buttons' },
        ]},
      { id: 'sheets', type: 'sheets', label: 'Google Sheets', sub: 'Log audit trail', x: 1446, y: 116,
        settings: [
          { label: 'Operation', value: 'Append Row' },
          { label: 'Sheet', value: 'AP Audit Log' },
          { label: 'Columns', value: 'timestamp, vendor, invoice_no, amount, status, qb_bill_id' },
        ]},
    ],
    connections: [
      { from: 'imap',      to: 'merge'     },
      { from: 'drive',     to: 'merge'     },
      { from: 'edi',       to: 'merge'     },
      { from: 'merge',     to: 'claude'    },
      { from: 'claude',    to: 'validate'  },
      { from: 'validate',  to: 'qb-vendor' },
      { from: 'validate',  to: 'qb-po'    },
      { from: 'qb-vendor', to: 'if'        },
      { from: 'qb-po',     to: 'if'        },
      { from: 'if',        to: 'qb-bill'   },
      { from: 'if',        to: 'slack'     },
      { from: 'qb-bill',   to: 'sheets'   },
      { from: 'slack',     to: 'sheets'   },
    ],
  },
  results: [
    { metric: 'Time per invoice', before: '8–45 min (manual)', after: '3 min (automated + review)' },
    { metric: 'Accuracy rate', before: '87% (manual entry)', after: '99.2%' },
    { metric: 'Monthly AP hours', before: '140h', after: '~8h (exceptions only)' },
    { metric: 'Duplicate invoices posted', before: '~2–3/month', after: '0 since go-live' },
    { metric: 'Month-end close timing', before: 'Day 7–8', after: 'Day 3' },
    { metric: 'Cost per invoice', before: '~$35 (labour)', after: '~$2.10 (automation + review)' },
  ],
}

export default function Page() {
  return <CaseStudy data={data} />
}

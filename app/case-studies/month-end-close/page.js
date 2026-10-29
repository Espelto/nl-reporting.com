import CaseStudy from '@/components/CaseStudy'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Month-End Close Automation',
  description:
    'n8n close orchestration for a Series B SaaS team: 12-day close cut to 4 days, with automated reconciliations and Slack exceptions.',
  path: '/case-studies/month-end-close',
})

const data = {
  title: 'Month-End Close Automation',
  context: 'Series B SaaS · 3-person accounting team · 6 systems to reconcile · 12-day close cycle',
  tags: ['n8n', 'QuickBooks Online', 'Claude AI', 'Slack', 'Notion'],
  workflowPlatform: 'n8n',
  numbers: [
    { value: '12 → 4 days', label: 'close cycle' },
    { value: '87 → 34', label: 'manual steps' },
    { value: '3 days → 4h', label: 'reconciliation time' },
    { value: '$36k', label: 'annual saving' },
  ],
  sections: [
    {
      heading: 'The situation',
      body: [
        'The accounting team ran a 12-day close cycle. The process lived in a shared Excel workbook that had grown organically over two years — a mix of checklist tabs, reconciliation templates, and scratch calculations. It wasn\'t version-controlled and had no ownership assignments beyond informal verbal agreements about who did what.',
        'Reconciliations covered six systems: the main bank account, a secondary operating account, accounts receivable in QuickBooks, accounts payable in QuickBooks, payroll in Gusto, and a credit card account in Brex. Each reconciliation was done manually — exporting a statement from the source system, comparing it line by line against the QuickBooks GL, and noting any discrepancies in a separate tab. This work took three people roughly three days combined.',
        'Standard accrual journal entries — recurring items like prepaid amortisation, deferred revenue recognition, and accrued expenses — were typed manually into QuickBooks each month. There were 14 standard journals in total, and while most of the amounts were formulaic, each had to be entered individually.',
        'The CFO had no visibility into where the close stood at any given moment. The only signal was whether someone had sent an email saying they were done. Twice in the past year, the team had worked through a weekend to catch up after an error was found late in the process.',
      ],
    },
    {
      heading: 'What we built',
      body: [
        'We started by mapping the full close process before writing any automation. Over two days we worked through every step with the team, documented who does what, what system is involved, what the inputs and outputs are, and what can go wrong. That audit produced a list of 87 discrete steps. We categorised each as: can be fully automated, can be partially automated (human still needs to review the output), or must remain manual (requires judgement or external input).',
        'The orchestration layer is a Notion database used as the close checklist. Each row is a task with fields for: task name, owner (person), category, system, dependency (which task must be done before this one), status, and a due date relative to the close start date. N8N reads this database at the start of each close and builds the run sequence from the dependency graph.',
        'On day 1 of the close (triggered manually by the controller clicking a Slack button), N8N initiates all tasks with no dependencies simultaneously. For automated tasks, it executes them directly. For manual tasks, it sends the assigned owner a Slack message with the task description, any relevant links or data, and a sign-off button.',
        {
          type: 'callout',
          text: 'The bank and credit card reconciliations are the most complex automated tasks. For each account, the workflow fetches the statement via the institution\'s API (Plaid for the bank accounts, Brex API for the credit card), fetches the corresponding GL transactions from QuickBooks for the same period, and runs a matching algorithm that pairs transactions by amount and date proximity (within 2 days). Matched transactions are marked as reconciled automatically. Unmatched items on either side are collected into a list and sent to the preparer as a Slack message with a table of what didn\'t match.'
        },
        'For the 14 standard journal entries, we built a configuration table in Notion where each journal is defined: the debit account, credit account, description, and the calculation rule for the amount. Most amounts reference a QuickBooks balance or a fixed figure. On the scheduled date for each journal, N8N reads the configuration, calculates the amount, and posts the journal entry via the QuickBooks journal entry API. The controller receives a Slack confirmation with the posted amounts for review.',
        'Claude is used for anomaly detection during reconciliation. After the matching step, before the unmatched items are sent to the preparer, we pass the full transaction set to Claude and ask it to flag anything that looks unusual: amounts significantly larger than the historical average for that GL account, transactions posted to unexpected accounts, or patterns that suggest a duplicate. This runs as an additional check, not a replacement for human review.',
        'A Notion page updated in real time serves as the close dashboard. It shows every task, its status, who last updated it, and whether it\'s on schedule relative to the target close date. The CFO has this page bookmarked and checks it instead of asking the team for status updates.',
      ],
    },
    {
      heading: 'Technical details',
      body: [
        {
          type: 'list',
          items: [
            'N8N self-hosted on the same DigitalOcean server as the invoice automation — the two workflows share infrastructure',
            'Notion API for the close checklist and dashboard — Notion served as the task database because the team already used it and it has a reasonably capable API',
            'Plaid API for bank account statements — requires initial OAuth setup with each bank; took one hour per account to configure',
            'Brex API for credit card transactions — Brex has a well-documented REST API that was straightforward to connect',
            'QuickBooks Online API for GL transactions, AR/AP balances, and journal entry posting',
            'Slack Workflow Builder for the sign-off buttons — we used Slack\'s native block kit to create interactive messages that write back to the Notion database when clicked',
            'Claude API for anomaly detection — prompt includes the last 3 months of transaction history for each account as baseline context',
          ],
        },
      ],
    },
    {
      heading: 'What changed and what didn\'t',
      body: [
        'The 4-day close is achieved by eliminating waiting time (tasks start immediately when their dependency completes) and running reconciliations overnight rather than sequentially during business hours. The actual human effort didn\'t drop to zero — it dropped from about 87 steps to 34, where the remaining 34 are genuinely judgment-based: reviewing the anomaly report, approving non-standard journals, handling items that didn\'t reconcile automatically.',
        'The first automated close caught a $28,000 misposting — a vendor payment had been coded to the wrong cost center, a mistake that would normally have been caught only during the close review, after the reconciliation was already done. Claude flagged it during the automated transaction scan before the preparer even started their review.',
        'We did not automate everything that was technically automatable. Deferred revenue recognition was left manual because the rules change based on contract modifications and require reading the original agreement. Intercompany eliminations were also left manual — the company had two subsidiaries and the intercompany balances required a human to verify the offsetting entries were correct before posting.',
      ],
    },
  ],
  workflow: {
    nodes: [
      { id: 'slack-in', type: 'slack', label: 'Slack Trigger', sub: 'Controller clicks Start', x: 30, y: 116,
        settings: [
          { label: 'Trigger', value: 'Slash command /start-close' },
          { label: 'Workspace', value: 'company.slack.com' },
          { label: 'Auth check', value: 'Allowed users only' },
          { label: 'Passes', value: 'User ID + close month' },
        ]},
      { id: 'notion-r', type: 'notion', label: 'Notion', sub: 'Read close checklist', x: 230, y: 116,
        settings: [
          { label: 'Operation', value: 'Query Database' },
          { label: 'Database ID', value: 'close-checklist-db', mono: true },
          { label: 'Filter', value: 'Status ≠ Archived' },
          { label: 'Fields', value: 'task_name, owner, category, depends_on, due_offset' },
        ]},
      { id: 'graph', type: 'code', label: 'Code', sub: 'Build dependency graph', x: 430, y: 116,
        settings: [
          { label: 'Algorithm', value: 'Topological sort (Kahn\'s)' },
          { label: 'Output', value: 'Ordered task queue' },
          { label: 'Parallel', value: 'Tasks with no pending deps start immediately' },
          { label: 'Total tasks', value: '87 mapped, 34 remain manual' },
        ]},
      { id: 'plaid', type: 'plaid', label: 'Plaid', sub: 'Bank account statement', x: 630, y: 20,
        settings: [
          { label: 'Auth', value: 'access_token (OAuth one-time setup)' },
          { label: 'Endpoint', value: '/transactions/get', mono: true },
          { label: 'Accounts', value: 'checking-001, checking-002' },
          { label: 'Date range', value: 'Full close period' },
          { label: 'Type', value: 'Debits + Credits' },
        ]},
      { id: 'brex', type: 'brex', label: 'Brex API', sub: 'Credit card transactions', x: 630, y: 110,
        settings: [
          { label: 'Endpoint', value: '/v1/transactions/card/primary', mono: true },
          { label: 'Auth', value: 'Bearer token' },
          { label: 'Date range', value: 'Close month (start → end)' },
          { label: 'Pagination', value: '100 per page, auto-paginate' },
        ]},
      { id: 'qb-gl', type: 'quickbooks', label: 'QuickBooks', sub: 'GL transactions by period', x: 630, y: 200,
        settings: [
          { label: 'Report', value: 'GeneralLedger' },
          { label: 'date_macro', value: 'This Month', mono: true },
          { label: 'Accounts', value: 'All active accounts' },
          { label: 'Format', value: 'JSON via REST v3' },
        ]},
      { id: 'recon', type: 'code', label: 'Code', sub: 'Match transactions · ±2 days', x: 846, y: 110,
        settings: [
          { label: 'Match on', value: 'Amount (exact) + Date (±2 days)' },
          { label: 'Matched', value: 'Auto-mark as reconciled' },
          { label: 'Unmatched', value: 'Collect into exception list' },
          { label: 'Output', value: 'Matched pairs + unmatched arrays' },
        ]},
      { id: 'claude', type: 'ai', label: 'Claude AI', sub: 'Anomaly detection', x: 1046, y: 110,
        settings: [
          { label: 'Model', value: 'claude-3-5-sonnet', mono: true },
          { label: 'Baseline', value: 'Last 3 months of transactions' },
          { label: 'Flags', value: 'Unusual amounts, wrong accounts, duplicates' },
          { label: 'Output', value: 'Ranked list with reason per flag' },
        ]},
      { id: 'sign-off', type: 'slack', label: 'Slack', sub: 'Sign-off request to owner', x: 1246, y: 40,
        settings: [
          { label: 'Channel', value: 'DM to task owner' },
          { label: 'Buttons', value: '✓ Done  ✗ Blocked' },
          { label: 'Callback', value: 'Updates Notion status on click' },
          { label: 'Reminder', value: 'Re-ping after 4h if no response' },
        ]},
      { id: 'qb-je', type: 'quickbooks', label: 'QuickBooks', sub: 'Post journal entries', x: 1246, y: 180,
        settings: [
          { label: 'Resource', value: 'JournalEntry' },
          { label: 'Operation', value: 'Create' },
          { label: 'Source', value: 'Notion config table (14 standard journals)' },
          { label: 'Amount calc', value: 'Formula per journal type' },
          { label: 'Confirmation', value: 'Slack message to controller' },
        ]},
      { id: 'notion-w', type: 'notion', label: 'Notion', sub: 'Update close dashboard', x: 1246, y: 270,
        settings: [
          { label: 'Operation', value: 'Update Page' },
          { label: 'Fields', value: 'status, completed_at, signed_off_by' },
          { label: 'Dashboard', value: 'Live — CFO has link bookmarked' },
        ]},
    ],
    connections: [
      { from: 'slack-in', to: 'notion-r' },
      { from: 'notion-r', to: 'graph'    },
      { from: 'graph',    to: 'plaid'    },
      { from: 'graph',    to: 'brex'     },
      { from: 'graph',    to: 'qb-gl'   },
      { from: 'plaid',    to: 'recon'   },
      { from: 'brex',     to: 'recon'   },
      { from: 'qb-gl',    to: 'recon'   },
      { from: 'recon',    to: 'claude'  },
      { from: 'claude',   to: 'sign-off'},
      { from: 'claude',   to: 'qb-je'  },
      { from: 'claude',   to: 'notion-w'},
    ],
  },
  results: [
    { metric: 'Close cycle', before: '12 days', after: '4 days' },
    { metric: 'Manual steps in process', before: '87', after: '34' },
    { metric: 'Bank/credit card reconciliation time', before: '3 days (combined)', after: '~4 hours (review of exceptions)' },
    { metric: 'Weekend close work', before: 'Frequent (2+ per year)', after: 'None in 6 months' },
    { metric: 'Journal entry posting time', before: '~3 hours per close', after: '~20 minutes (review confirmations)' },
    { metric: 'CFO visibility during close', before: 'Email check-ins', after: 'Live Notion dashboard' },
  ],
}

export default function Page() {
  return <CaseStudy data={data} />
}

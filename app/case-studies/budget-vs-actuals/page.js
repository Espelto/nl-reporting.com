import CaseStudy from '@/components/CaseStudy'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Budget vs Actuals Monitoring',
  description:
    'KNIME budget vs actuals pipeline: Sunday-night run, Monday 7am variance pack with commentary, 8 analyst hours returned each week.',
  path: '/case-studies/budget-vs-actuals',
})

const data = {
  title: 'Budget vs Actuals Monitoring',
  context: 'Mid-market SaaS · 60-person company · Finance team of 4 · 12 departments tracked',
  tags: ['KNIME', 'NetSuite', 'Claude AI', 'SendGrid', 'Slack'],
  workflowPlatform: 'knime',
  numbers: [
    { value: '2 days → 0', label: 'report prep time' },
    { value: 'Monday 7am', label: 'delivery vs Tuesday (stale)' },
    { value: '8h/week', label: 'analyst time freed' },
    { value: '$4.2k', label: 'monthly labour saving' },
  ],
  measurement:
    'The 8 hours a week was the analyst’s estimate for export, reconciliation, commentary, and formatting. The Sunday run now produces the Monday 7am pack, which is why the results table shows 0 hours on that rebuild. It does not count time spent reading Slack alerts. The $4.2k is the published monthly labour figure for those 8 hours; this page does not publish the loaded rate.',
  sections: [
    {
      heading: 'The situation',
      body: [
        'The finance team produced a weekly budget vs actuals report covering all 12 departments. The data source was NetSuite — actuals pulled from the GL, compared against an annual budget that had been manually loaded into a separate Excel file at the start of the year.',
        'Every week, a financial analyst would export the current period\'s GL activity from NetSuite to CSV, open the budget spreadsheet, vlookup the actuals against budget by cost center and account code, calculate the dollar and percentage variance for each line, write a sentence or two of commentary for any line over 5% variance, format the whole thing into a table, and email it to the CFO and 12 department heads.',
        'The process started Monday morning and the report was typically sent Tuesday afternoon — occasionally Wednesday if something didn\'t reconcile. By the time department heads received it, the data was already 2–3 days old. The CFO\'s Monday leadership meeting happened without the report. Department heads who wanted to understand their spend had to wait for the analyst.',
        'The analyst estimated this process took about 8 hours per week including the export, reconciliation, commentary writing, and formatting. There was no alerting — a department could be 40% over budget mid-week and no one would know until the next weekly report.',
      ],
    },
    {
      heading: 'What we built',
      body: [
        'We built a KNIME analytics workflow that runs on a schedule every Sunday at 11pm, so the report is ready before the working week begins.',
        'The first step pulls actuals from NetSuite using their REST API. We query the Transaction Search endpoint filtered to the current accounting period, grouped by department (class in NetSuite terminology) and account. This returns a JSON payload of all GL activity. We then flatten it into a line-by-line structure: department, account code, account name, period actuals.',
        'Budget data lives in a Google Sheet that the finance team maintains — they update it once when the annual budget is set, and again if there\'s a re-forecast. The workflow fetches this sheet via the Sheets API and joins it to the actuals data on the combination of department + account code. Any account in the budget that has no actuals gets a zero actuals figure; any actuals line with no corresponding budget row is flagged as "unbudgeted spend."',
        'After joining, the workflow calculates for each line: dollar variance (actuals minus budget), percentage variance, and a flag for whether the variance exceeds the threshold for commentary (we set this at 5% and minimum $500 absolute, to avoid commentary on $10 variances).',
        { type: 'callout', text: 'Lines that exceed the commentary threshold are passed to Claude. The prompt gives Claude the department name, account name, dollar variance, percentage variance, and the current period (e.g. "Week 3 of November"). Claude is asked to write one sentence explaining the likely cause and one sentence on what the finance team should check. We spent time on prompt engineering here — early outputs were too generic ("spending was higher than budgeted"), and we iterated until the output read more like a competent analyst\'s commentary.' },
        'Once all commentary is generated, the workflow assembles an HTML email. The email has a summary section at the top (total spend vs budget for the company overall, and a count of lines in each variance band), followed by a department-by-department table. Each table shows every budget line with actuals, variance, and — for flagged lines — the Claude-generated commentary. The email is sent via SendGrid to the CFO and all department heads by 7am Monday.',
        'Separately, any individual line with a dollar variance over $10,000 also triggers an immediate Slack message to the finance-alerts channel, regardless of when it\'s detected. This part runs as a second KNIME workflow that fires every 6 hours throughout the week, not just Sunday night — so large variances are flagged as they accumulate, not after the fact.',
      ],
    },
    {
      heading: 'Technical details',
      body: [
        {
          type: 'list',
          items: [
            'KNIME Server (shared executor — this workflow is not latency-sensitive)',
            'NetSuite REST API — requires setting up a connected app with OAuth 2.0 credentials; the main complexity was getting the search filter syntax right for period-based GL queries',
            'Google Sheets as the budget source — the finance team already worked in Sheets, so this avoided building a separate budget input UI',
            'Claude API for commentary — the prompt is roughly 400 tokens; each weekly run processes between 15 and 40 flagged lines, so Claude cost is under $0.10 per weekly report',
            'SendGrid for HTML email delivery — report HTML assembled in a KNIME Component with a JavaScript snippet node',
            'Slack webhook for real-time alerts — messages include the department, account, budgeted amount, actual amount, and variance',
          ],
        },
      ],
    },
    {
      heading: 'Build process and challenges',
      body: [
        'The NetSuite API was the primary technical challenge. NetSuite\'s REST API documentation is dense and the search endpoint returns data in a structure that requires careful parsing. We spent most of week 1 on this — specifically getting the period filter to align correctly with NetSuite\'s internal accounting period IDs rather than calendar dates.',
        'Claude commentary quality required iteration. The first version of the prompt produced output that read too much like a disclaimer ("it is possible that spending increased due to higher vendor costs"). We rewrote the prompt three times, adding context about the company\'s business model and telling Claude to be specific about what to investigate rather than hedging. The final outputs are brief but actionable.',
        'We also discovered that some department heads wanted their section only, not the full company report. We added a configuration table in the Google Sheet where each department head\'s email address is listed with a flag indicating whether they receive the full report or a department-filtered version. The workflow generates both variants in the same run.',
      ],
    },
  ],
  workflow: {
    nodes: [
      { id: 'sched', type: 'schedule', label: 'Schedule', sub: 'Every Sunday 11pm', x: 30, y: 50,
        settings: [
          { label: 'Cron', value: '0 23 * * 0', mono: true },
          { label: 'Timezone', value: 'America/New_York' },
          { label: 'Trigger on', value: 'Sunday night' },
        ]},
      { id: 'ns', type: 'db', typeLabel: 'connector', label: 'NetSuite Connector', sub: 'GL actuals by dept', x: 246, y: 20,
        settings: [
          { label: 'Endpoint', value: '/record/v1/transaction', mono: true },
          { label: 'Auth', value: 'OAuth 2.0 (TBA)' },
          { label: 'Filter', value: 'postingPeriod = current' },
          { label: 'Group by', value: 'department (class), account' },
          { label: 'Output', value: 'JSON · actuals per line item' },
        ]},
      { id: 'budget', type: 'reader', typeLabel: 'reader', label: 'Google Sheets', sub: 'Annual budget table', x: 246, y: 116,
        settings: [
          { label: 'Operation', value: 'Read Range' },
          { label: 'Sheet', value: 'Budget_FY2024' },
          { label: 'Range', value: 'A:E (dept, account, q1–q4)', mono: true },
          { label: 'Refresh', value: 'Every run (live source)' },
        ]},
      { id: 'join', type: 'joiner', typeLabel: 'manipulator', label: 'Joiner', sub: 'Join · calc $ % variance', x: 460, y: 68,
        settings: [
          { label: 'Join key', value: 'department + account_code' },
          { label: '$ variance', value: 'actuals − budget' },
          { label: '% variance', value: '(actuals − budget) / budget' },
          { label: 'Flag if', value: '|%| > 5% AND |$| > $500' },
          { label: 'Unbudgeted', value: 'Flag rows with no budget match' },
        ]},
      { id: 'claude', type: 'ai', label: 'Claude AI', sub: 'Write variance commentary', x: 660, y: 68,
        settings: [
          { label: 'Model', value: 'claude-3-5-sonnet', mono: true },
          { label: 'Input', value: 'dept, account, $ variance, % variance, period' },
          { label: 'Output', value: '2 sentences per flagged line' },
          { label: 'Sentence 1', value: 'Likely cause of variance' },
          { label: 'Sentence 2', value: 'What to investigate' },
          { label: 'Cost/run', value: '~$0.08 (15–40 flagged lines)' },
        ]},
      { id: 'html', type: 'writer', typeLabel: 'sink', label: 'Report Builder', sub: 'Build HTML report', x: 860, y: 68,
        settings: [
          { label: 'Template', value: 'Inline HTML + CSS' },
          { label: 'Sections', value: 'Summary banner + dept-by-dept tables' },
          { label: 'Variant A', value: 'Full report (CFO)' },
          { label: 'Variant B', value: 'Dept-filtered (dept heads)' },
          { label: 'Recipients', value: 'Lookup from config sheet' },
        ]},
      { id: 'email', type: 'email', typeLabel: 'sink', label: 'Send Email', sub: 'CFO + dept heads', x: 1060, y: 68,
        settings: [
          { label: 'From', value: 'finance@company.com' },
          { label: 'Subject', value: 'Budget vs Actuals — {{ period }}' },
          { label: 'Content', value: 'text/html' },
          { label: 'Sent by', value: '7:00 AM Monday' },
        ]},
      { id: 'sched2', type: 'schedule', label: 'Schedule', sub: 'Every 6 hours', x: 30, y: 230,
        settings: [
          { label: 'Cron', value: '0 */6 * * 1-5', mono: true },
          { label: 'Runs', value: 'Mon–Fri, 4× per day' },
          { label: 'Purpose', value: 'Real-time large variance alerts' },
        ]},
      { id: 'ns2', type: 'db', typeLabel: 'connector', label: 'NetSuite Connector', sub: 'Pull latest GL', x: 246, y: 230,
        settings: [
          { label: 'Same endpoint', value: '/record/v1/transaction', mono: true },
          { label: 'Incremental', value: 'Since last run (lastModifiedDate)', mono: true },
        ]},
      { id: 'filter', type: 'rule', typeLabel: 'rule', label: 'Rule Engine', sub: 'Filter variances >$10k', x: 460, y: 230,
        settings: [
          { label: 'Threshold', value: '$10,000 absolute variance' },
          { label: 'Compare vs', value: 'Budget from config sheet' },
          { label: 'Dedup', value: 'Skip if alerted in past 24h' },
        ]},
      { id: 'slackalrt', type: 'slack', typeLabel: 'sink', label: 'Slack', sub: 'finance-alerts channel', x: 660, y: 230,
        settings: [
          { label: 'Channel', value: '#finance-alerts' },
          { label: 'Message', value: 'Dept · Account · Budget · Actual · Variance' },
          { label: 'Ping', value: '@finance-team' },
        ]},
    ],
    connections: [
      { from: 'sched',   to: 'ns'       },
      { from: 'sched',   to: 'budget'   },
      { from: 'ns',      to: 'join'     },
      { from: 'budget',  to: 'join'     },
      { from: 'join',    to: 'claude'   },
      { from: 'claude',  to: 'html'     },
      { from: 'html',    to: 'email'    },
      { from: 'sched2',  to: 'ns2'      },
      { from: 'ns2',     to: 'filter'   },
      { from: 'filter',  to: 'slackalrt'},
    ],
  },
  results: [
    { metric: 'Report delivery time', before: 'Tuesday PM (stale data)', after: 'Monday 7am (week-fresh data)' },
    { metric: 'Analyst hours on report', before: '8 hours/week', after: '0 on the weekly rebuild' },
    { metric: 'Large variance detection', before: 'Weekly (next report)', after: 'Within 6 hours of occurrence' },
    { metric: 'Department head self-service', before: 'Email analyst, wait for response', after: 'Report in inbox Monday' },
    { metric: 'Annual analyst hours recovered', before: '~400h/year on this task', after: '0 on this rebuild' },
  ],
}

export default function Page() {
  return <CaseStudy data={data} />
}

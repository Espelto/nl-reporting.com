import CaseStudy from '@/components/CaseStudy'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Cash Flow Forecasting',
  description:
    'On-premise Pi Agent cash forecast: daily 13-week model from four live sources, 4 hours to 20 minutes, 68% to 91% accuracy.',
  path: '/case-studies/cash-flow-forecasting',
})

const data = {
  title: 'Cash Flow Forecasting',
  context: 'Growth-stage e-commerce · CFO + 1 analyst · 4 data sources · Weekly manual process',
  tags: ['Pi Agent', 'Ollama', 'Claude (optional)', 'Plaid', 'QuickBooks', 'Bill.com', 'Gusto'],
  workflowPlatform: 'pi',
  numbers: [
    { value: '4h → 20min', label: 'weekly forecast time' },
    { value: '68% → 91%', label: 'forecast accuracy' },
    { value: 'Daily', label: 'vs weekly updates before' },
    { value: '2 → 0', label: 'near-misses, prior year to first year live' },
  ],
  measurement:
    'The 4 hours was the Friday manual build; 20 minutes is review of the weekday run. Accuracy is the 4-week horizon in the results table, about 68% to about 91%. CFO time is a separate count: about 12 hours a month down to about 1 hour of review. The two cash constraints were near-misses in the year before go-live. The results table records none in the first year live.',
  sections: [
    {
      heading: 'The situation',
      body: [
        'The company produced a 13-week rolling cash flow forecast manually every Friday. It was the CFO\'s most important planning tool and also the most painful part of their week.',
        'The data came from four systems, none of which talked to each other. AR aging lived in QuickBooks — exported to CSV, then pasted into a master Excel model. AP schedules were in Bill.com — another export, another paste. Payroll projections came from Gusto, exported as a payroll calendar. Bank balances were checked by logging into the bank website and reading the balance. Each week the analyst would spend Friday morning collecting these four exports, reconciling the opening balance against the actual bank balance, then building out the 13-week projection using a combination of the aged receivables, the payment schedule from Bill.com, and fixed assumptions about payroll and overhead.',
        'The forecast took about 4 hours to produce. It was done once a week, which meant the CFO was making decisions with data that was up to 7 days old. Twice in the preceding 12 months, the company had come closer to a cash constraint than was comfortable — once due to a large customer paying 30 days late, once because a vendor prepayment requirement wasn\'t visible in the forecast until too late. Both situations were identified only by chance during the manual weekly build.',
      ],
    },
    {
      heading: 'What we built',
      body: [
        'We built a forecasting pipeline that runs automatically every weekday morning at 6am and deposits an updated forecast into a Google Sheet before anyone arrives at their desk.',
        'The pipeline runs on a Raspberry Pi in the client\'s office network. A Pi Agent orchestrator pulls live data from all four sources in parallel — via REST where APIs are allowed, and from scheduled CSV exports dropped to a local folder where not. QuickBooks AR aging, Bill.com open bills, Gusto payroll dates, and Plaid bank balances are assembled on the device. Raw ledgers never leave the LAN.',
        'With the raw data assembled, the workflow runs the forecast calculation. AR is projected based on the due dates in the aging report, with a payment probability applied to each invoice by aging bucket: current invoices are assumed to collect at 95% on due date, 31–60 days is 75%, 61–90 is 50%, over 90 is 20%. These probability percentages were calibrated against 18 months of historical payment data during the initial setup and can be adjusted in a configuration sheet.',
        {
          type: 'callout',
          text: 'Customer-level payment probability is the one optional cloud step. Rather than sending the ledger, the agent posts a summarized payload (customer, invoice count, average days to pay, variance) to Claude and receives an expected week and probability. Teams that cannot send even summaries off-network swap this node for a local Ollama model — the rest of the pipeline never leaves the LAN. For customers with consistent payment behaviour the adjustment is small; for customers who are sometimes early and sometimes very late, it produces a more realistic range.'
        },
        'AP projections are taken directly from Bill.com scheduled payment dates with no adjustment — these are committed outflows. Payroll is taken from the Gusto schedule as a fixed outflow on each payroll date. Overhead expenses (rent, subscriptions, other recurring costs) are maintained in a configuration table in the Google Sheet and applied as fixed weekly outflows.',
        'The output is a week-by-week cash flow table for the next 13 weeks: opening balance, expected collections by week, scheduled AP payments, payroll, overhead, net cash movement, and closing balance. The model runs three scenarios — base (using the calibrated probabilities), conservative (all probabilities reduced by 15%), and optimistic (due dates taken at face value without probability discounting). All three are written to separate tabs in the Google Sheet.',
        'A Slack alert fires automatically if any week in the base scenario shows a projected closing balance below a threshold the CFO defined (in this case, a two-week operating expense buffer). The alert includes the projected low week, the projected balance, and which receivables or payables are driving it.',
      ],
    },
    {
      heading: 'Technical details',
      body: [
        {
          type: 'list',
          items: [
            'Pi Agent on Raspberry Pi 5 (8GB) — systemd service restarts the agent if the device reboots; UPS recommended for reliability',
            'QuickBooks Online REST API — AR aging report endpoint; the response structure required some parsing to extract the bucket breakdown by customer',
            'Bill.com API — session token refresh handled by a small Python tool the agent calls locally',
            'Gusto API — payroll schedules endpoint; the payroll data is the simplest of the four sources, returning fixed dates and amounts',
            'Plaid — connected to both bank accounts; returns previous-day closing balances; Plaid requires an initial link flow where the CFO authorised access once via a hosted link',
            'Claude API — customer payment probability step; prompt includes customer name, invoice history summary, and asks for a probability and expected collection week; output is structured JSON',
            'Google Sheets as the output — the CFO preferred Sheets over a custom dashboard because they could add their own annotations and share specific ranges with the board',
          ],
        },
      ],
    },
    {
      heading: 'Calibration and ongoing maintenance',
      body: [
        'The customer payment probability model was the most time-consuming part to set up correctly. We pulled 18 months of historical AR data from QuickBooks and calculated actual days-to-pay by customer. Claude\'s initial probability estimates were then back-tested against this history — we compared what the model would have predicted with what actually happened. The first version was overoptimistic on a few slow-paying customers. We adjusted the prompt to be more conservative for customers with high variance in their payment timing.',
        'The configuration file (forecast.yaml on the Pi) is designed so the finance team can adjust assumptions without touching code. Overhead expenses, probability buckets, and Slack alert thresholds are editable in one place.',
        'We also set up a monthly reconciliation step where the workflow compares what it predicted 4 weeks ago against what actually happened. The output goes to a tab in the Google Sheet labelled "accuracy log." This isn\'t used to auto-adjust the model — it\'s for the analyst to review and decide if any assumptions need updating.',
      ],
    },
  ],
  workflow: {
    nodes: [
      // Trigger
      { id: 'sched', type: 'schedule', label: 'Schedule', sub: 'Every weekday at 6am', x: 30, y: 150,
        settings: [
          { label: 'Cron', value: '0 6 * * 1-5', mono: true },
          { label: 'Timezone', value: 'America/New_York' },
          { label: 'Fires', value: 'Mon–Fri at 6:00 AM' },
          { label: 'Purpose', value: 'Daily forecast before workday begins' },
        ]},
      // Data sources
      { id: 'qb-ar', type: 'quickbooks', label: 'QuickBooks', sub: 'AR aging by customer', x: 230, y: 20,
        settings: [
          { label: 'Report', value: 'AgedReceivableDetail' },
          { label: 'Auth', value: 'OAuth 2.0' },
          { label: 'Grouped by', value: 'Customer + due date bucket' },
          { label: 'Buckets', value: 'Current, 1–30, 31–60, 61–90, 90+' },
          { label: 'Output', value: 'JSON · open invoices per customer' },
        ]},
      { id: 'billcom', type: 'billcom', label: 'Bill.com', sub: 'Open bills + due dates', x: 230, y: 110,
        settings: [
          { label: 'Endpoint', value: '/v2/List/Bill', mono: true },
          { label: 'Auth', value: 'Session token (auto-refresh)' },
          { label: 'Filter', value: 'paymentStatus = 1 (unpaid)' },
          { label: 'Fields', value: 'dueDate, amount, vendorId' },
          { label: 'Output', value: 'Scheduled outflows with exact dates' },
        ]},
      { id: 'gusto', type: 'gusto', label: 'Gusto', sub: 'Payroll schedule', x: 230, y: 200,
        settings: [
          { label: 'Endpoint', value: '/v1/companies/:id/payrolls', mono: true },
          { label: 'Auth', value: 'OAuth 2.0 (company-level)' },
          { label: 'Filter', value: 'processed = false (upcoming only)' },
          { label: 'Fields', value: 'pay_period, check_date, gross_pay' },
          { label: 'Horizon', value: '13 weeks forward' },
        ]},
      { id: 'plaid', type: 'plaid', label: 'Plaid', sub: 'Live bank balances', x: 230, y: 290,
        settings: [
          { label: 'Endpoint', value: '/accounts/balance/get', mono: true },
          { label: 'Auth', value: 'access_token per account' },
          { label: 'Accounts', value: '2 (operating + reserve)' },
          { label: 'Balance', value: 'Previous day closing balance' },
          { label: 'Setup', value: 'One-time OAuth link flow per bank' },
        ]},
      // AI step
      { id: 'claude', type: 'ai', label: 'Claude AI', sub: 'Customer payment probability', x: 450, y: 20,
        settings: [
          { label: 'Model', value: 'claude-3-5-sonnet', mono: true },
          { label: 'Input', value: 'Customer name, invoice history, avg days-to-pay, variance' },
          { label: 'Output', value: 'Expected collection date + probability %', highlight: true },
          { label: 'Baseline', value: '18 months historical AR data' },
          { label: 'Runs per', value: 'Each open invoice (customer-level)' },
        ]},
      // Processing
      { id: 'forecast', type: 'code', label: 'Code', sub: 'Build 13-week cash model', x: 650, y: 155,
        settings: [
          { label: 'Opening balance', value: 'From Plaid (prior day close)' },
          { label: 'AR inflows', value: 'Claude probability × invoice amount' },
          { label: 'AP outflows', value: 'Bill.com scheduled payment dates (exact)' },
          { label: 'Payroll', value: 'Gusto check dates (fixed)' },
          { label: 'Overhead', value: 'Config sheet (rent, subs, recurring)' },
          { label: 'Output', value: 'Week-by-week net cash + closing balance' },
        ]},
      { id: 'scenarios', type: 'code', label: 'Code', sub: 'Base / low / high scenarios', x: 850, y: 155,
        settings: [
          { label: 'Base', value: 'Calibrated collection probabilities' },
          { label: 'Conservative', value: 'All probabilities −15%' },
          { label: 'Optimistic', value: 'Due dates at face value (100%)' },
          { label: 'Output tabs', value: 'base_forecast, low_forecast, high_forecast' },
          { label: 'Written to', value: 'Separate Google Sheets tabs' },
        ]},
      // Outputs
      { id: 'sheets', type: 'sheets', label: 'Google Sheets', sub: 'Update forecast dashboard', x: 1050, y: 80,
        settings: [
          { label: 'Operation', value: 'Update Range (overwrite)' },
          { label: 'Tabs', value: 'base_forecast, low_forecast, high_forecast, accuracy_log' },
          { label: 'CFO access', value: 'Shared directly — can annotate and add rows' },
          { label: 'Accuracy log', value: 'Monthly: predicted vs actual (4-week lag)' },
        ]},
      { id: 'if', type: 'if', label: 'IF', sub: 'Cash below threshold?', x: 1050, y: 230,
        settings: [
          { label: 'Condition', value: 'min(base_closing_balance) < threshold', mono: true },
          { label: 'Threshold', value: '2× weekly operating expenses (CFO-set)' },
          { label: 'Check', value: 'All 13 weeks in base scenario' },
          { label: 'True →', value: 'Slack alert to CFO', highlight: true },
          { label: 'False →', value: 'No action' },
        ]},
      { id: 'alert', type: 'slack', label: 'Slack', sub: 'CFO cash alert', x: 1250, y: 230,
        settings: [
          { label: 'Channel', value: 'DM to CFO' },
          { label: 'Includes', value: 'Projected low week, balance, driving AR/AP items' },
          { label: 'Ping', value: '@cfo' },
          { label: 'Frequency', value: 'Once per day maximum (dedup)' },
        ]},
    ],
    connections: [
      { from: 'sched',    to: 'qb-ar'    },
      { from: 'sched',    to: 'billcom'  },
      { from: 'sched',    to: 'gusto'    },
      { from: 'sched',    to: 'plaid'    },
      { from: 'qb-ar',    to: 'claude'  },
      { from: 'claude',   to: 'forecast' },
      { from: 'billcom',  to: 'forecast' },
      { from: 'gusto',    to: 'forecast' },
      { from: 'plaid',    to: 'forecast' },
      { from: 'forecast', to: 'scenarios'},
      { from: 'scenarios',to: 'sheets'   },
      { from: 'scenarios',to: 'if'       },
      { from: 'if',       to: 'alert'    },
    ],
  },
  results: [
    { metric: 'Weekly forecast build time', before: '~4 hours (manual)', after: '20 minutes (review only)' },
    { metric: 'Forecast accuracy (4-week horizon)', before: '~68%', after: '~91%' },
    { metric: 'Update frequency', before: 'Once per week', after: 'Every weekday morning' },
    { metric: 'Proactive cash alerts', before: 'None', after: 'Slack alert when balance projected below threshold' },
    { metric: 'CFO time on forecasting', before: '~12 hours/month', after: '~1 hour/month (review)' },
    { metric: 'Unexpected cash events', before: '2 near-misses in prior year', after: '0 in first year live' },
  ],
}

export default function Page() {
  return <CaseStudy data={data} />
}

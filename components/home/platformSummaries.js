/** Lightweight platform copy — no workflow graphs (those live in platformExamples.js) */

export const HOMEPAGE_PLATFORMS = [
  {
    id: 'n8n',
    name: 'n8n',
    tagline: 'Integrations and event-driven workflows',
    hook: 'Connect email, ERP, and Slack with orchestrated AP automation and exception routing.',
    metric: '140h/month freed',
    caseStudyHref: '/case-studies/invoice-automation',
  },
  {
    id: 'knime',
    name: 'KNIME',
    tagline: 'Visual analytics and reporting pipelines',
    hook: 'Blend GL actuals with budget data, apply rules, and deliver scheduled management reports.',
    metric: '8h/week analyst time freed',
    caseStudyHref: '/case-studies/budget-vs-actuals',
  },
  {
    id: 'pi-agent',
    name: 'Pi Agent',
    tagline: 'On-premise AI automation',
    hook: 'Run forecasts and daily briefs on local hardware so source ledgers stay on your network.',
    metric: '4h → 20 min weekly',
    caseStudyHref: '/case-studies/cash-flow-forecasting',
  },
]

export const PLATFORM_LIST = [
  {
    id: 'n8n',
    name: 'n8n',
    tagline: 'Integrations & event-driven automation',
    description:
      'Best when you need applications connected with triggers, APIs, and alerts—email intake, ERP posting, Slack notifications. We deploy self-hosted or n8n Cloud based on your compliance requirements.',
    bestFor: ['AP / AR automation', 'Multi-system orchestration', 'Webhook & email triggers', 'Fast iteration on finance ops'],
    exampleTitle: 'Invoice email → QuickBooks in ~3 minutes',
    exampleBlurb: 'B2B SaaS team: three intake sources, AI extraction, validation, auto-post or Slack exception.',
  },
  {
    id: 'knime',
    name: 'KNIME',
    tagline: 'Visual analytics & reporting pipelines',
    description:
      'Best when the work is data preparation—blending exports, variance rules, departmental rollups, and scheduled report distribution. Each transformation step remains visible to the finance team.',
    bestFor: ['Budget vs actuals packs', 'Multi-source GL blending', 'Recurring management reports', 'Transparent audit trails'],
    exampleTitle: 'Sunday night → Monday 7am variance report',
    exampleBlurb: 'NetSuite actuals joined to budget sheet, rules flag >5% variances, HTML email to department heads.',
  },
  {
    id: 'pi-agent',
    name: 'Pi Agent',
    tagline: 'Local AI assistant on your hardware',
    description:
      'Best when source data must remain on your network—payroll, unreconciled GL, or other sensitive records. A Raspberry Pi or small server runs Ollama and agent tools on your LAN. Optional summarized cloud enrichment can be swapped for a fully local model.',
    bestFor: ['On-premise / air-gapped finance', 'Daily cash & runway Q&A', 'Slack copilot without cloud upload', 'Lower recurring API cost'],
    exampleTitle: 'Daily cash brief — no data leaves the building',
    exampleBlurb: 'Pi reads exports from a shared folder, local Llama drafts the brief, Slack delivery at 6am.',
  },
]

export const CASE_STUDIES_BY_PLATFORM = [
  {
    platformId: 'n8n',
    studies: [
      {
        slug: 'invoice-automation',
        title: 'Invoice processing automation',
        context: 'B2B SaaS · ~200 invoices/month',
        metric: '93% faster processing',
        sub: '140 hours/month returned to the team',
      },
      {
        slug: 'month-end-close',
        title: 'Month-end close',
        context: 'Series B SaaS · 3-person accounting team',
        metric: '12 → 4 day close',
        sub: 'Automated reconciliations and journal posting',
      },
    ],
  },
  {
    platformId: 'knime',
    studies: [
      {
        slug: 'budget-vs-actuals',
        title: 'Budget vs actuals monitoring',
        context: 'Mid-market SaaS · 12 departments',
        metric: 'Reports by Monday 7am',
        sub: 'Scheduled variance pack with AI commentary',
      },
    ],
  },
  {
    platformId: 'pi-agent',
    studies: [
      {
        slug: 'cash-flow-forecasting',
        title: 'Cash flow forecasting',
        context: 'E-commerce · CFO + 1 analyst',
        metric: '91% forecast accuracy',
        sub: 'Daily 13-week model from four live sources',
      },
    ],
  },
]

export function getPlatformSummary(platformKey) {
  const id = platformKey === 'pi' ? 'pi-agent' : platformKey
  return PLATFORM_LIST.find(p => p.id === id) || null
}

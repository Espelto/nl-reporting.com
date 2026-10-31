import { SITE } from '@/lib/site'

const UPDATED = '2026-10-31'

const routes = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/services', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/contact', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/case-studies', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/results', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/case-studies/invoice-automation', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/case-studies/month-end-close', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/case-studies/budget-vs-actuals', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/case-studies/cash-flow-forecasting', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
]

export default function sitemap() {
  return routes.map(route => ({
    url: `${SITE.url}${route.path}`,
    lastModified: UPDATED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}

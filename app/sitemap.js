import { SITE } from '@/lib/site'

export default function sitemap() {
  const routes = [
    '',
    '/about',
    '/services',
    '/results',
    '/contact',
    '/case-studies',
    '/case-studies/invoice-automation',
    '/case-studies/month-end-close',
    '/case-studies/budget-vs-actuals',
    '/case-studies/cash-flow-forecasting',
    '/privacy',
    '/terms',
  ]

  return routes.map(path => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path.startsWith('/case-studies') ? 'monthly' : 'weekly',
    priority: path === '' ? 1 : path === '/case-studies' || path === '/about' ? 0.9 : 0.7,
  }))
}

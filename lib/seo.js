import { SITE } from '@/lib/site'

export function pageMeta({ title, description, path = '/' }) {
  const url = `${SITE.url}${path}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: title.includes(SITE.name) ? title : `${title} | ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: title.includes(SITE.name) ? title : `${title} | ${SITE.name}`,
      description,
    },
  }
}

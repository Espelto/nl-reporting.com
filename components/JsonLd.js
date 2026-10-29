import { SITE } from '@/lib/site'

export default function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE.url}/#business`,
        name: SITE.name,
        url: SITE.url,
        email: SITE.email,
        description: SITE.description,
        image: `${SITE.url}/nl-icon.png`,
        areaServed: 'United States',
        founder: { '@id': `${SITE.url}/#person` },
        sameAs: [SITE.founder.linkedin],
        serviceType: [
          'Finance process automation',
          'Accounts payable automation',
          'Month-end close automation',
          'FP&A reporting automation',
        ],
      },
      {
        '@type': 'Person',
        '@id': `${SITE.url}/#person`,
        name: SITE.founder.name,
        jobTitle: SITE.founder.title,
        email: SITE.email,
        url: `${SITE.url}/about`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Morganville',
          addressRegion: 'NJ',
          addressCountry: 'US',
        },
        sameAs: [SITE.founder.linkedin],
        worksFor: { '@id': `${SITE.url}/#business` },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

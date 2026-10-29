import { SITE } from '@/lib/site'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Privacy',
  description: 'How NL Reporting handles information submitted through this site.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-dark-900 px-4 py-16 md:py-24">
      <article className="max-w-2xl mx-auto prose-invert">
        <h1 className="text-4xl font-bold mb-6">Privacy</h1>
        <p className="text-dark-400 text-sm mb-8">Last updated October 27, 2026</p>
        <div className="space-y-5 text-dark-300 text-sm leading-relaxed">
          <p>
            NL Reporting ({SITE.url}) is operated by {SITE.founder.name}. This page describes how
            information submitted through the site is used.
          </p>
          <h2 className="text-xl font-semibold text-white pt-2">What I collect</h2>
          <p>
            The contact form collects name, email, company, area of interest, and the message you write.
            I use that information only to reply and to scope a potential engagement.
          </p>
          <h2 className="text-xl font-semibold text-white pt-2">What I do not do</h2>
          <p>
            I do not sell personal data, run advertising pixels on this site, or use form submissions
            for unrelated marketing lists.
          </p>
          <h2 className="text-xl font-semibold text-white pt-2">Hosting</h2>
          <p>
            The site may be hosted on a platform such as Vercel. Server logs (IP, user agent, path) may
            be retained by the host for security and operations.
          </p>
          <h2 className="text-xl font-semibold text-white pt-2">Contact</h2>
          <p>
            Questions: <a href={`mailto:${SITE.email}`} className="text-primary-400">{SITE.email}</a>.
          </p>
        </div>
      </article>
    </main>
  )
}

import { Clock, Mail } from 'lucide-react'
import LinkedInIcon from '@/components/LinkedInIcon'
import ContactForm from '@/components/contact/ContactForm'
import { SITE } from '@/lib/site'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Contact',
  description:
    'Book a complimentary 45-minute finance process audit with Alexey Kobzev. Describe the workflow — get a scoped view of time, cost, and return.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-dark-900 overflow-x-hidden">
      <section className="px-4 pt-16 pb-8 md:pt-24 text-center bg-radial-fade">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Let&apos;s talk</h1>
          <p className="text-dark-300 text-lg">
            Describe the process. I will tell you what is automatable, what is not, and whether a
            retainer makes sense. 45 minutes. No deck.
          </p>
        </div>
      </section>

      <section className="px-4 py-8 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="glass-effect rounded-2xl p-6 md:p-8">
            <ContactForm />
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <Mail size={18} className="mx-auto mb-2 text-primary-400" />
              <p className="text-dark-500 text-xs mb-1">Email</p>
              <a href={`mailto:${SITE.email}`} className="text-sm text-primary-300 hover:text-primary-200">
                {SITE.email}
              </a>
            </div>
            <div>
              <LinkedInIcon size={18} className="mx-auto mb-2 text-primary-400" />
              <p className="text-dark-500 text-xs mb-1">LinkedIn</p>
              <a
                href={SITE.founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-300 hover:text-primary-200"
              >
                /in/{SITE.founder.linkedinHandle}
              </a>
            </div>
            <div>
              <Clock size={18} className="mx-auto mb-2 text-primary-400" />
              <p className="text-dark-500 text-xs mb-1">Response</p>
              <p className="text-sm text-white">Within 24 hours</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

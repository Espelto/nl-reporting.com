import Link from 'next/link'
import { Mail } from 'lucide-react'
import Logo from '@/components/Logo'
import LinkedInIcon from '@/components/LinkedInIcon'
import { SITE, NAV } from '@/lib/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark-800 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Logo size={36} />
              <span className="font-bold text-lg tracking-tight">{SITE.name}</span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed mb-5">
              {SITE.founder.name} takes one finance process live for a controller or head of finance, then stays on it.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SITE.founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-dark-300 hover:text-primary-300 hover:border-primary-500/40 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={16} />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-dark-300 hover:text-primary-300 hover:border-primary-500/40 transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Site</h4>
            <ul className="space-y-2.5 text-dark-300 text-sm">
              {NAV.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary-300 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Work</h4>
            <ul className="space-y-2.5 text-dark-300 text-sm">
              <li>
                <Link href="/case-studies/invoice-automation" className="hover:text-primary-300 transition-colors">
                  Invoice automation
                </Link>
              </li>
              <li>
                <Link href="/case-studies/month-end-close" className="hover:text-primary-300 transition-colors">
                  Month-end close
                </Link>
              </li>
              <li>
                <Link href="/case-studies/budget-vs-actuals" className="hover:text-primary-300 transition-colors">
                  Budget vs actuals
                </Link>
              </li>
              <li>
                <Link href="/case-studies/cash-flow-forecasting" className="hover:text-primary-300 transition-colors">
                  Cash flow forecasting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5 text-dark-300 text-sm">
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-primary-300 transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-300 transition-colors"
                >
                  LinkedIn · {SITE.founder.linkedinHandle}
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-300 transition-colors">
                  Request a process audit
                </Link>
              </li>
              <li className="text-dark-500">{SITE.founder.location}</li>
            </ul>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-dark-500 text-xs">
          <p>© {year} {SITE.name}. {SITE.founder.name}.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-dark-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-dark-300 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

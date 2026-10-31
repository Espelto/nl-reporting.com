'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ContactForm from '@/components/contact/ContactForm'
import SelectedWork from '@/components/home/SelectedWork'
import { SITE } from '@/lib/site'

const proof = [
  { value: '140h → ~8h', label: 'monthly AP hours' },
  { value: '12→4', label: 'day close' },
  { value: '4 weeks', label: 'typical go-live' },
]

const offer = [
  {
    title: 'Ship one painful workflow',
    body: 'Invoice intake, month-end close, variance packs, or cash. One process. Production in about four weeks.',
  },
  {
    title: 'I own it after go-live',
    body: 'Credentials, retries, exceptions, and Slack when it breaks. The first close is part of the work, not the handoff.',
  },
  {
    title: 'Then we add the next one',
    body: 'The retainer is the offer. Each month I keep the live work running and take on the next process.',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-dark-900 overflow-x-hidden">
      <section className="relative px-4 pt-14 pb-16 md:pt-20 md:pb-20 bg-radial-fade">
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" />
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-start">
          <div className="lg:pt-4">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6 border border-primary-500/30 bg-primary-500/15 text-primary-300">
              Controllers and heads of finance · no IT bench · past spreadsheets and Zapier
            </span>
            <p className="text-sm text-dark-300 mb-3">
              {SITE.founder.name}
              <span className="text-dark-500"> · {SITE.founder.title}</span>
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold mb-6 leading-[1.15] tracking-tight">
              {SITE.tagline}
            </h1>
            <p className="text-sm text-dark-400 mb-8 max-w-xl leading-relaxed">
              The first process typically ships in four weeks. Engagements start around {'$'}{SITE.engagementStart.toLocaleString()} for that build. The retainer is what follows.
              A new inquiry gets a reply within {SITE.replyHours} hours. Once you are a client, support
              is within {SITE.responseHours} hours.
            </p>
            <p className="text-xs text-dark-500">
              {SITE.founder.location} ·{' '}
              <a
                href={SITE.founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-300"
              >
                LinkedIn
              </a>
              {' · '}
              <a href={`mailto:${SITE.email}`} className="text-dark-400 hover:text-primary-300">
                {SITE.email}
              </a>
            </p>
          </div>

          <div id="talk" className="scroll-mt-24">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6 shadow-2xl shadow-black/30">
              <p className="text-sm font-semibold text-white mb-1">Request a process audit</p>
              <p className="text-xs text-dark-400 mb-5">
                45 minutes. No deck. I reply within {SITE.replyHours} hours from {SITE.email} with
                whether it is worth automating.
              </p>
              <ContactForm compact />
            </div>
          </div>
        </div>
      </section>

      <div className="py-8 px-4 border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6">
          {proof.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-dark-400 text-xs">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="max-w-3xl mx-auto text-center text-dark-500 text-xs mt-4">
          From the case studies. Company names are withheld. Each figure is defined on its study.
        </p>
      </div>

      <section className="py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 max-w-xl">
            You are hiring the person who stays on the work after go-live.
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {offer.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl p-6 border border-white/[0.08] bg-white/[0.03]"
              >
                <p className="text-primary-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-dark-300 text-sm leading-relaxed">{item.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <SelectedWork />

      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-dark-400 mb-4">If you want the detail</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/services" className="text-primary-300 hover:text-primary-200">
              How an engagement works
            </Link>
            <Link href="/case-studies" className="text-primary-300 hover:text-primary-200">
              Case studies
            </Link>
            <Link href="/results" className="text-primary-300 hover:text-primary-200">
              Numbers
            </Link>
            <Link href="/about" className="text-primary-300 hover:text-primary-200">
              About
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

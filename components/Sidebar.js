'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BarChart2,
  Briefcase,
  Home,
  LineChart,
  Mail,
  Menu,
  User,
  X,
} from 'lucide-react'
import Logo from '@/components/Logo'

const navLinks = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Work', href: '/case-studies', icon: BarChart2 },
  { label: 'Services', href: '/services', icon: Briefcase },
  { label: 'Results', href: '/results', icon: LineChart },
  { label: 'About', href: '/about', icon: User },
  { label: 'Contact', href: '/contact', icon: Mail },
]

function isActive(pathname, href) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = e => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  return (
    <>
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-16 bg-dark-800/90 backdrop-blur-md border-r border-white/[0.06] flex-col items-center py-6 gap-6 z-40">
        <Link
          href="/"
          className="rounded-lg hover:shadow-lg hover:shadow-primary-500/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          aria-label="NL Reporting home"
        >
          <Logo size={40} />
        </Link>

        <nav className="flex flex-col gap-2 flex-1" aria-label="Primary">
          {navLinks.map(link => {
            const Icon = link.icon
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                title={link.label}
                aria-current={active ? 'page' : undefined}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  active
                    ? 'bg-primary-500/20 text-primary-300 ring-1 ring-primary-500/40'
                    : 'text-dark-400 hover:bg-white/[0.06] hover:text-primary-300'
                }`}
              >
                <Icon size={18} />
              </Link>
            )
          })}
        </nav>

        <Link
          href="/contact"
          className="w-12 min-h-10 px-1 py-1.5 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex flex-col items-center justify-center text-white hover:shadow-lg hover:shadow-primary-500/40 transition-all"
          aria-label="Request a process audit"
        >
          <ArrowRight size={14} />
          <span className="text-[9px] font-semibold leading-none mt-0.5 tracking-wide">Talk</span>
        </Link>
      </aside>

      <button
        type="button"
        onClick={() => setIsOpen(open => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        suppressHydrationWarning
        className="md:hidden fixed bottom-6 right-6 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white z-50 shadow-lg shadow-primary-500/30"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              key="mobile-overlay"
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              key="mobile-nav"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              className="md:hidden fixed bottom-20 right-6 left-6 sm:left-auto sm:w-64 bg-dark-800 border border-white/10 rounded-2xl p-3 flex flex-col gap-1 z-50 shadow-2xl"
              aria-label="Mobile"
            >
              {navLinks.map(link => {
                const Icon = link.icon
                const active = isActive(pathname, link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all ${
                      active
                        ? 'bg-primary-500/20 text-white'
                        : 'text-dark-200 hover:text-white hover:bg-white/[0.06]'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={16} />
                    {link.label}
                  </Link>
                )
              })}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

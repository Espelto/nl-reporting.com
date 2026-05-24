'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Home, BarChart2, Mail, ArrowRight } from 'lucide-react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Case Studies', href: '/case-studies', icon: BarChart2 },
    { label: 'Contact', href: '/contact', icon: Mail },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen w-16 bg-dark-800 border-r border-dark-700 flex-col items-center py-8 gap-8 z-40">
        {/* Logo */}
        <Link href="/" className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center font-bold text-white hover:shadow-lg hover:shadow-primary-500/50 transition-all">
          NL
        </Link>

        {/* Nav Icons */}
        <nav className="flex flex-col gap-4 flex-1">
          {navLinks.map((link, i) => {
            const Icon = link.icon
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  title={link.label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-dark-300 hover:bg-dark-700 hover:text-primary-400 transition-all"
                >
                  <Icon size={18} />
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Bottom CTA */}
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary-500/50 transition-all"
          title="Get Started"
        >
          <ArrowRight size={16} />
        </motion.a>
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white z-50 shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="md:hidden fixed bottom-20 right-6 bg-dark-800 border border-dark-700 rounded-lg p-4 flex flex-col gap-3 z-40"
        >
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="px-4 py-2 text-sm text-dark-200 hover:text-primary-400 hover:bg-dark-700 rounded transition-all"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </>
  )
}

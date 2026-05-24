'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    invoicesPerMonth: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, send to your email service
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <main className="min-h-screen bg-dark-900 overflow-x-hidden pt-12">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 px-4 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's talk</h1>
        <p className="text-dark-300 max-w-2xl mx-auto text-lg">
          Tell us about your process. We'll tell you exactly how much time and money you're leaving on the table.
        </p>
      </motion.section>

      {/* Form */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="py-12 px-4"
      >
        <div className="max-w-2xl mx-auto">
          <div className="glass-effect rounded-2xl p-8 border border-primary-500/20">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-5xl mb-4">✓</div>
                <h2 className="text-2xl font-bold mb-2">Got it!</h2>
                <p className="text-dark-300">We'll be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary-300 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Alexey"
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary-300 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary-300 mb-2">Invoices per Month</label>
                    <input
                      type="number"
                      name="invoicesPerMonth"
                      value={formData.invoicesPerMonth}
                      onChange={handleChange}
                      placeholder="200"
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-300 mb-2">Tell us about your process</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="What's your biggest pain point with invoice processing?"
                    rows="5"
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 rounded-xl font-semibold text-white transition-all"
                  style={{ background: 'linear-gradient(135deg, #1a7bae, #0f4875)', boxShadow: '0 8px 32px rgba(26,123,174,0.35)' }}
                >
                  Schedule Your Free Audit
                </motion.button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 grid md:grid-cols-2 gap-8 text-center"
          >
            <div>
              <p className="text-dark-400 text-sm mb-2">Email</p>
              <a href="mailto:alexey@nl-reporting.com" className="text-primary-400 hover:text-primary-300 transition-colors">
                alexey@nl-reporting.com
              </a>
            </div>
            <div>
              <p className="text-dark-400 text-sm mb-2">Response Time</p>
              <p className="text-white">Within 24 hours</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Back Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="py-12 px-4 text-center"
      >
        <Link href="/" className="text-primary-400 hover:text-primary-300 transition-colors">
          ← Back to home
        </Link>
      </motion.div>
    </main>
  )
}

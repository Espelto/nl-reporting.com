'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { SITE } from '@/lib/site'

const initial = {
  name: '',
  email: '',
  company: '',
  focus: 'Invoice / AP',
  message: '',
  gotcha: '',
}

export default function ContactForm({ compact = false }) {
  const [formData, setFormData] = useState(initial)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const mailtoHref = () => {
    const subject = encodeURIComponent(`NL Reporting inquiry — ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nFocus: ${formData.focus}\n\n${formData.message}`,
    )
    return `mailto:${SITE.email}?subject=${subject}&body=${body}`
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    const tryJsonPost = async (url, body) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))
      const ok = res.ok && (data.ok === true || data.success === true || data.success === 'true')
      return { ok, data, res }
    }

    try {
      const result = await tryJsonPost('/api/contact', formData)
      if (!result.ok) {
        setStatus('error')
        setError(result.data.error || result.data.message || 'Could not send')
        return
      }
      setStatus('sent')
      setFormData(initial)
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong')
    }
  }

  const fieldClass = compact
    ? 'w-full px-3.5 py-2.5 bg-dark-800 border border-white/10 rounded-lg text-white text-sm placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors'
    : 'w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors'
  const labelClass = compact
    ? 'block text-xs font-semibold text-primary-300 mb-1.5'
    : 'block text-sm font-semibold text-primary-300 mb-2'

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center ${compact ? 'py-6' : 'py-12'}`}
      >
        <div className="w-14 h-14 rounded-full bg-accent-400/15 text-accent-400 text-2xl flex items-center justify-center mx-auto mb-4">
          ✓
        </div>
        <h2 className="text-2xl font-bold mb-2">Request received</h2>
        <p className="text-dark-300 max-w-md mx-auto">
          I will reply from{' '}
          <a href={`mailto:${SITE.email}`} className="text-primary-400">
            {SITE.email}
          </a>{' '}
          within {SITE.replyHours} hours. You will get a straight answer on whether the process is worth
          automating, and whether a retainer makes sense. The conversation is 45 minutes. No deck.
        </p>
        <p className="text-dark-500 text-xs max-w-md mx-auto mt-4">
          The {SITE.replyHours}-hour clock is the sales reply. The {SITE.responseHours}-hour response
          applies after you are a client.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'space-y-4' : 'space-y-6'}>
      <input
        type="text"
        name="gotcha"
        value={formData.gotcha}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className={`grid md:grid-cols-2 ${compact ? 'gap-3' : 'gap-6'}`}>
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Jordan Chen"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@company.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className={`grid md:grid-cols-2 ${compact ? 'gap-3' : 'gap-6'}`}>
        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input
            id="company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Finance"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="focus" className={labelClass}>
            Where it hurts
          </label>
          <select
            id="focus"
            name="focus"
            value={formData.focus}
            onChange={handleChange}
            className={`${fieldClass} [color-scheme:dark]`}
          >
            <option>Invoice / AP</option>
            <option>Month-end close</option>
            <option>Budget vs actuals</option>
            <option>Cash forecasting</option>
            <option>Something else</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell me about the process
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Volume, systems, what you want back…"
          rows={compact ? 3 : 5}
          className={`${fieldClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-400">
          {error}.{' '}
          <a href={mailtoHref()} className="underline text-primary-300">
            Open your email app instead
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className={`w-full rounded-xl font-semibold text-white transition-all disabled:opacity-60 bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/25 ${compact ? 'py-3 text-sm' : 'py-4'}`}
      >
        {status === 'sending' ? 'Sending…' : 'Request a process audit'}
      </button>
      <p className="text-center text-xs text-dark-500">
        Or email{' '}
        <a href={`mailto:${SITE.email}`} className="text-primary-400 hover:text-primary-300">
          {SITE.email}
        </a>
      </p>
    </form>
  )
}

'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ROICalculator() {
  const [invoices, setInvoices] = useState(200)
  const [timePerInvoice, setTimePerInvoice] = useState(45)
  const [hourlyRate, setHourlyRate] = useState(50)

  // Calculations
  const monthlyHours = (invoices * timePerInvoice) / 60
  const currentMonthlyCost = monthlyHours * hourlyRate
  const automatedTimePerInvoice = 3
  const automatedMonthlyHours = (invoices * automatedTimePerInvoice) / 60
  const automatedMonthlyCost = automatedMonthlyHours * hourlyRate
  const monthlySavings = currentMonthlyCost - automatedMonthlyCost
  const implementationCost = 2400
  const paybackDays =
    monthlySavings > 0 ? Math.round((implementationCost / monthlySavings) * 30) : null
  const annualSavings = monthlySavings * 12
  const savingsPct =
    currentMonthlyCost > 0 ? ((monthlySavings / currentMonthlyCost) * 100).toFixed(0) : '0'
  const money = n =>
    n.toLocaleString(undefined, { maximumFractionDigits: 0 })

  return (
    <section id="calculator" className="py-24 px-4 bg-gradient-to-b from-dark-900 to-dark-800 scroll-mt-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Calculate Your ROI</span>
          <h2 className="text-4xl font-bold mb-4">See your savings in real time</h2>
          <p className="text-dark-300">Invoice-processing example. Adjust the sliders to match your volume.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-effect rounded-2xl p-8 border border-primary-500/20"
        >
          {/* Inputs */}
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {/* Monthly Invoices */}
            <div>
              <label className="block text-sm font-semibold text-primary-300 mb-3">Monthly Invoices</label>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={invoices}
                onChange={(e) => setInvoices(Number(e.target.value))}
                className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="text-2xl font-bold text-white mt-2">{invoices}</div>
              <p className="text-dark-400 text-xs mt-1">invoices/month</p>
            </div>

            {/* Time per Invoice */}
            <div>
              <label className="block text-sm font-semibold text-primary-300 mb-3">Manual Time per Invoice</label>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={timePerInvoice}
                onChange={(e) => setTimePerInvoice(Number(e.target.value))}
                className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="text-2xl font-bold text-white mt-2">{timePerInvoice} min</div>
              <p className="text-dark-400 text-xs mt-1">per invoice</p>
            </div>

            {/* Hourly Rate */}
            <div>
              <label className="block text-sm font-semibold text-primary-300 mb-3">Hourly Rate</label>
              <input
                type="range"
                min="25"
                max="150"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="text-2xl font-bold text-white mt-2">${hourlyRate}/hr</div>
              <p className="text-dark-400 text-xs mt-1">average cost</p>
            </div>
          </div>

          {/* Results */}
          <div className="border-t border-dark-600 pt-10">
            <h3 className="text-lg font-bold mb-6">Your Financial Impact</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                {
                  label: 'Current Monthly Cost',
                  value: `$${money(currentMonthlyCost)}`,
                  subtext: `${monthlyHours.toFixed(0)} hours/month`,
                  color: 'text-red-400',
                },
                {
                  label: 'After Automation',
                  value: `$${money(automatedMonthlyCost)}`,
                  subtext: `${automatedMonthlyHours.toFixed(1)} hours/month`,
                  color: 'text-primary-400',
                },
                {
                  label: 'Monthly Savings',
                  value: `$${money(monthlySavings)}`,
                  subtext: `${(monthlyHours - automatedMonthlyHours).toFixed(0)} hours freed`,
                  color: 'text-green-400',
                },
                {
                  label: 'Payback Period',
                  value: paybackDays == null ? '—' : paybackDays > 0 ? `${paybackDays} days` : 'Immediate',
                  subtext: `Implementation: $${implementationCost.toLocaleString()}`,
                  color: 'text-primary-400',
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="bg-dark-800 rounded-lg p-4 border border-dark-600"
                >
                  <p className="text-dark-400 text-xs font-semibold mb-2">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                  <p className="text-dark-500 text-xs">{stat.subtext}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Annual Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-10 p-6 rounded-lg" style={{ background: 'rgba(26,123,174,0.1)', border: '1px solid rgba(26,123,174,0.3)' }}
          >
            <p className="text-dark-300 text-sm mb-2">Annual Impact</p>
            <p className="text-4xl font-bold text-primary-400">${money(annualSavings)}</p>
            <p className="text-dark-400 text-sm mt-2">
              That&apos;s {savingsPct}% of current invoice-processing cost. Starting implementation fee: ${implementationCost.toLocaleString()}.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

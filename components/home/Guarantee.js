'use client'

import { motion } from 'framer-motion'

export default function Guarantee() {
  return (
    <section className="py-24 px-4 bg-dark-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-green-400 text-sm font-semibold tracking-widest uppercase mb-3 block">Our Promise</span>
          <h2 className="text-4xl font-bold mb-4">The 60-Day ROI Guarantee</h2>
          <p className="text-dark-300 text-lg">
            If we don't deliver positive ROI within 60 days of go-live, we keep working for free until you do.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-12 rounded-2xl border-2 border-green-500/30" style={{ background: 'rgba(34,197,94,0.05)' }}
        >
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: '📊',
                title: 'Measurable Metrics',
                description: 'We define ROI upfront. Hours saved, errors eliminated, dollar value. Not vague promises.',
              },
              {
                icon: '⏱️',
                title: '60-Day Timeline',
                description: 'Plenty of time for your team to adopt the system and see the savings compound.',
              },
              {
                icon: '📝',
                title: 'In Writing',
                description: 'Our guarantee is in your contract. Not a handshake. Not "implied." Legal, binding terms.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-dark-300 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Details */}
          <div className="border-t border-green-500/20 pt-8">
            <h3 className="font-bold text-lg mb-6">What "positive ROI" means</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  label: 'Hours Freed',
                  description: 'Your team spends less time on invoice processing than before.',
                },
                {
                  label: 'Cost Savings',
                  description: 'Dollar savings from labor efficiency exceed our implementation cost.',
                },
                {
                  label: 'Error Reduction',
                  description: 'Measurable decrease in manual data entry errors and duplicates.',
                },
                {
                  label: 'Speed',
                  description: 'Faster close cycles. More time for analysis and strategy.',
                },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-dark-800/50">
                  <p className="font-semibold text-primary-300 mb-2">{item.label}</p>
                  <p className="text-dark-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The Commitment */}
          <div className="mt-10 p-8 rounded-xl" style={{ background: 'rgba(26,123,174,0.1)', border: '1px solid rgba(26,123,174,0.2)' }}>
            <p className="text-sm text-dark-300 mb-3 uppercase font-semibold">Why we do this</p>
            <p className="text-lg leading-relaxed">
              We're <span className="font-bold">so confident</span> in our process that we're willing to bet our time on it. We don't get paid until you win. That's how sure we are.
            </p>
            <p className="text-dark-400 text-sm mt-4">
              We've deployed 25+ workflows. We've hit ROI guarantee on 24 of them within 60 days. The one we didn't? We worked for free for 3 months until we got it right. That's the deal.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-dark-300 mb-6">No risk. No hidden clauses. Just results.</p>
          <a href="/contact">
            <button className="px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #1a7bae, #0f4875)', boxShadow: '0 8px 32px rgba(26,123,174,0.35)' }}>
              Get the guarantee in writing
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

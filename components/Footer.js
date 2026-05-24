'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-800 border-t border-dark-700">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-4 gap-8 mb-12"
        >
          <div>
            <h3 className="font-bold text-lg mb-4">NL Reporting</h3>
            <p className="text-dark-400 text-sm">
              Transforming finance workflows with responsible AI.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-300 mb-4">Services</h4>
            <ul className="space-y-2 text-dark-300 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition">Workflow Optimization</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">AI Integration</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Process Automation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary-300 mb-4">Connect</h4>
            <ul className="space-y-2 text-dark-300 text-sm">
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition">LinkedIn</a></li>
              <li><a href="mailto:alexey@nl-reporting.com" className="hover:text-primary-400 transition">Email</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Schedule Demo</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary-300 mb-4">Legal</h4>
            <ul className="space-y-2 text-dark-300 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Contact</a></li>
            </ul>
          </div>
        </motion.div>

        <div className="section-divider mb-8"></div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-dark-400 text-sm">
            © {currentYear} NL Reporting. All rights reserved.
          </p>
          <p className="text-dark-400 text-sm mt-4 md:mt-0">
            Helping finance teams work smarter, not harder.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

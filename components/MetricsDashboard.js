'use client'

import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export default function MetricsDashboard() {
  const timeData = [
    { name: 'Before', value: 45, fill: '#ef4444' },
    { name: 'After', value: 3, fill: '#1a7bae' },
  ]

  const accuracyData = [
    { name: 'Manual Process', value: 87, fill: '#ef4444' },
    { name: 'AI Automation', value: 99.2, fill: '#1a7bae' },
  ]

  const monthlyImpactData = [
    { month: 'Week 1', hours: 28, errors: 12 },
    { month: 'Week 2', hours: 35, errors: 8 },
    { month: 'Week 3', hours: 42, errors: 2 },
    { month: 'Week 4', hours: 46, errors: 1 },
  ]

  const roiData = [
    { name: 'Implementation\nCost', value: 2000 },
    { name: 'Monthly\nSavings', value: 7000 },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-dark-800 to-dark-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Proven Results
          </h2>
          <p className="text-lg text-dark-300">
            Real metrics from invoice validation implementation
          </p>
        </motion.div>

        {/* Key Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: 'Processing Time', value: '93%', change: 'Faster', color: 'from-primary-600 to-primary-500' },
            { label: 'Accuracy', value: '99.2%', change: '+12%', color: 'from-green-600 to-green-500' },
            { label: 'Monthly Hours Saved', value: '140', change: 'Strategic work', color: 'from-blue-600 to-blue-500' },
            { label: 'Monthly ROI', value: '$7k', change: '35x annually', color: 'from-purple-600 to-purple-500' },
          ].map((metric, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={`glass-effect p-6 rounded-lg border border-primary-500/20 bg-gradient-to-br ${metric.color} bg-opacity-5`}
            >
              <p className="text-dark-400 text-sm mb-2">{metric.label}</p>
              <p className="text-4xl font-bold text-white mb-1">{metric.value}</p>
              <p className="text-primary-300 text-sm">{metric.change}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Processing Time Reduction */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-effect p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-4">Processing Time per Invoice</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} >
                  {timeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-dark-300 text-sm mt-4">⏱️ From 45 minutes to 3 minutes = 93% reduction</p>
          </motion.div>

          {/* Accuracy Improvement */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-effect p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-4">Data Accuracy</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" width={120} />
                <YAxis stroke="rgba(255,255,255,0.5)" label={{ value: '%', angle: -90, position: 'insideLeft' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {accuracyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-dark-300 text-sm mt-4">✓ From 87% to 99.2% accuracy = 12% improvement</p>
          </motion.div>

          {/* Time Saved Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-effect p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-4">Hours Freed Up (Monthly)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyImpactData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Legend />
                <Line type="monotone" dataKey="hours" stroke="#1a7bae" strokeWidth={3} dot={{ fill: '#1a7bae', r: 5 }} name="Hours Saved" />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-dark-300 text-sm mt-4">📈 Ramp-up shows increasing efficiency over 4 weeks</p>
          </motion.div>

          {/* ROI Analysis */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-effect p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-4">Return on Investment</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" width={120} />
                <YAxis stroke="rgba(255,255,255,0.5)" label={{ value: '$', angle: -90, position: 'insideLeft' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Bar dataKey="value" fill="#1a7bae" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-dark-300 text-sm mt-4">💰 Payback period: 3 days | Annual savings: $84,000</p>
          </motion.div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 glass-effect p-8 rounded-lg border border-primary-500/30"
        >
          <h3 className="text-2xl font-bold mb-6">Implementation Impact Summary</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-primary-400 font-bold text-3xl">200</p>
              <p className="text-dark-300 mt-2">Invoices processed per month</p>
            </div>
            <div>
              <p className="text-primary-400 font-bold text-3xl">140h</p>
              <p className="text-dark-300 mt-2">Monthly hours for strategic work</p>
            </div>
            <div>
              <p className="text-primary-400 font-bold text-3xl">$7k</p>
              <p className="text-dark-300 mt-2">Monthly cost savings (labor)</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

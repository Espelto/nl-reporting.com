import './globals.css'
import Sidebar from '@/components/Sidebar'

export const metadata = {
  title: 'NL Reporting | Workflow Optimization & Responsible AI',
  description: 'Transform your workflows with responsible AI integration. Optimize processes, reduce manual work, drive results.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-dark-900 text-dark-100 antialiased" style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: 64, flex: 1, minHeight: '100vh' }}>
          {children}
        </div>
      </body>
    </html>
  )
}

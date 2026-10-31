import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import { SITE } from '@/lib/site'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Finance process ownership for controllers`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'finance process ownership',
    'FP&A',
    'controller',
    'head of finance',
    'invoice automation',
    'month-end close',
    'cash flow forecasting',
    'Alexey Kobzev',
  ],
  authors: [{ name: SITE.founder.name, url: SITE.founder.linkedin }],
  creator: SITE.founder.name,
  openGraph: {
    title: `${SITE.name} | Finance process ownership for controllers`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | Finance process ownership for controllers`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className={`${jakarta.className} bg-dark-900 text-dark-100 antialiased`}>
        <JsonLd />
        <Sidebar />
        <div className="flex min-h-screen flex-col md:ml-16 pb-24 md:pb-0">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}

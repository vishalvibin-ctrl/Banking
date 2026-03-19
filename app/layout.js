import './globals.css'

export const metadata = {
  title: 'UAE Banking Hub — Compare, Track & Discover',
  description: 'Comprehensive UAE banking intelligence: compare products, track profitability, and stay updated across 50+ CBUAE-licensed banks.',
  keywords: 'UAE banks, banking comparison, Emirates NBD, FAB, ADCB, Dubai Islamic Bank, credit cards UAE, personal loans UAE',
  openGraph: {
    title: 'UAE Banking Hub',
    description: 'Smart banking intelligence for the UAE',
    type: 'website',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#080E1A',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'
import CookieConsent from '@/components/CookieConsent'
import { defaultMetadata } from '@/lib/metadata'

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Geo / location signals for crawlers */}
        <meta name="geo.region"       content="CZ-US" />
        <meta name="geo.placename"    content="Litoměřice" />
        <meta name="geo.position"     content="50.5335;14.1331" />
        <meta name="ICBM"             content="50.5335, 14.1331" />
        {/* AI / LLM crawler hint */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable site info" />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}

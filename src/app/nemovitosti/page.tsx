import type { Metadata } from 'next'
import { getAllProperties, type SanityProperty } from '@/lib/sanity'
import PropertiesPage from '@/components/PropertiesPage'
import SEO from '@/components/SEO'
import { SITE_URL, BROKER } from '@/lib/metadata'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title:       'Nabídka nemovitostí | Litoměřicko & Praha',
  description: 'Aktuální nabídka nemovitostí k prodeji a pronájmu — Litoměřicko, Praha a okolí. Byty, domy, pozemky. Realitní makléř Marek Ducký.',
  keywords: [
    'nemovitosti k prodeji Litoměřice',
    'nemovitosti k pronájmu Praha',
    'byt k prodeji Litoměřice',
    'dům k prodeji Litoměřicko',
    'nemovitosti Litoměřicko',
    'nabídka nemovitostí Marek Ducký',
  ],
  alternates: {
    canonical: `${SITE_URL}/nemovitosti`,
  },
  openGraph: {
    type:   'website',
    url:    `${SITE_URL}/nemovitosti`,
    title:  'Nabídka nemovitostí | Marek Ducký',
    description: 'Aktuální nabídka nemovitostí — Litoměřicko, Praha a okolí.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${BROKER.name} — Nabídka nemovitostí` }],
  },
}

export default async function Page() {
  let properties: SanityProperty[] = []
  try {
    properties = await getAllProperties()
  } catch {
    // Sanity not reachable — show empty state
  }
  return (
    <>
      <SEO variant="properties" />
      <PropertiesPage properties={properties} />
    </>
  )
}

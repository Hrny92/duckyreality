import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import AboutMe from '@/components/AboutMe'
import Offer from '@/components/Offer'
import WhyMe from '@/components/WhyMe'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import SEO from '@/components/SEO'
import { getFeaturedProperties, type SanityProperty } from '@/lib/sanity'
import { SITE_URL, BROKER } from '@/lib/metadata'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: `${BROKER.name} | Realitní makléř Litoměřice & Praha`,
  description:
    'Realitní makléř Marek Ducký — Litoměřicko, Praha a celá ČR. ' +
    'Prodej, koupě a pronájem nemovitostí. Profesionální přístup, transparentní komunikace.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type:   'website',
    url:     SITE_URL,
    title:  `${BROKER.name} | Realitní makléř Litoměřice & Praha`,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${BROKER.name} — Realitní makléř` }],
  },
}

export default async function Home() {
  let properties: SanityProperty[] = []
  try {
    properties = await getFeaturedProperties()
  } catch {
    // Sanity unavailable — section simply won't render
  }

  return (
    <main>
      <SEO variant="home" />
      <Navbar />
      <Hero />
      <AboutMe />
      <Offer properties={properties} />
      <WhyMe />
      <Services />
      <Testimonials />
      <CTA />
      <Footer />
      <ContactModal />
    </main>
  )
}

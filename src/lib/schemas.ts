/**
 * JSON-LD schema factory functions
 * Used by <SEO> component to generate structured data for search engines and AI crawlers.
 * Spec: https://schema.org  |  Testing: https://validator.schema.org
 */

import { SITE_URL, BROKER, SITE_NAME } from './metadata'

// ─── WebSite ──────────────────────────────────────────────────────────────────
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    '@id':      `${SITE_URL}/#website`,
    url:         SITE_URL,
    name:        SITE_NAME,
    description: 'Realitní makléř Marek Ducký — Litoměřicko, Praha a celá ČR.',
    publisher: {
      '@id': `${SITE_URL}/#person`,
    },
    inLanguage:  'cs-CZ',
    potentialAction: {
      '@type':       'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/nemovitosti?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ─── Organization (Bidli) ─────────────────────────────────────────────────────
export function organizationSchema() {
  return {
    '@context':    'https://schema.org',
    '@type':       'Organization',
    '@id':         `${SITE_URL}/#organization`,
    name:           BROKER.company,
    url:           'https://www.bidli.cz',
    legalName:     `${BROKER.company} s.r.o.`,
    taxID:          BROKER.ico,
    areaServed: [
      { '@type': 'City', name: 'Litoměřice' },
      { '@type': 'City', name: 'Praha' },
      { '@type': 'Country', name: 'Česká republika' },
    ],
    contactPoint: {
      '@type':        'ContactPoint',
      telephone:       BROKER.phone,
      email:           BROKER.email,
      contactType:    'customer service',
      availableLanguage: 'Czech',
    },
  }
}

// ─── Person / RealEstateAgent ─────────────────────────────────────────────────
export function personSchema() {
  return {
    '@context':   'https://schema.org',
    '@type':      ['Person', 'RealEstateAgent'],
    '@id':        `${SITE_URL}/#person`,
    name:          BROKER.name,
    givenName:    'Marek',
    familyName:   'Ducký',
    jobTitle:      BROKER.title,
    description:  'Profesionální realitní makléř s více než 12 lety zkušeností. Působí v Litoměřicích, Praze a po celé České republice. Člen sítě Bidli.',
    url:           SITE_URL,
    image: {
      '@type': 'ImageObject',
      url:      BROKER.photo,
    },
    telephone:  BROKER.phone,
    email:      BROKER.email,
    sameAs: [
      BROKER.instagram,
      BROKER.facebook,
      BROKER.linkedin,
    ],
    worksFor: {
      '@id': `${SITE_URL}/#organization`,
    },
    address: {
      '@type':           'PostalAddress',
      addressLocality:    BROKER.city,
      addressRegion:      BROKER.region,
      addressCountry:     BROKER.country,
    },
    areaServed: [
      { '@type': 'City',    name: 'Litoměřice' },
      { '@type': 'City',    name: 'Praha' },
      { '@type': 'Country', name: 'Česká republika' },
    ],
    knowsAbout: [
      'prodej nemovitostí',
      'pronájem nemovitostí',
      'koupě nemovitostí',
      'realitní trh',
      'ocenění nemovitostí',
      'hypoteční financování',
    ],
  }
}

// ─── LocalBusiness (used on homepage) ────────────────────────────────────────
export function localBusinessSchema() {
  return {
    '@context':    'https://schema.org',
    '@type':       ['LocalBusiness', 'RealEstateAgent'],
    '@id':         `${SITE_URL}/#localbusiness`,
    name:           SITE_NAME,
    alternateName: [`${BROKER.name} Realitní makléř`, `${BROKER.name} Bidli`],
    description:   'Profesionální realitní makléř Marek Ducký. Prodej, koupě a pronájem nemovitostí na Litoměřicku, v Praze a po celé ČR.',
    url:            SITE_URL,
    telephone:      BROKER.phone,
    email:          BROKER.email,
    image: {
      '@type': 'ImageObject',
      url:     `${SITE_URL}/og-image.png`,
    },
    logo: {
      '@type': 'ImageObject',
      url:     `${SITE_URL}/Ducky-logo.svg`,
    },
    priceRange:    '$$',
    currenciesAccepted: 'CZK',
    paymentAccepted:    'Hotově, převodem',
    openingHoursSpecification: [
      {
        '@type':     'OpeningHoursSpecification',
        dayOfWeek:   ['Monday','Tuesday','Wednesday','Thursday','Friday'],
        opens:       '08:00',
        closes:      '18:00',
      },
    ],
    address: {
      '@type':           'PostalAddress',
      addressLocality:    BROKER.city,
      addressRegion:      BROKER.region,
      addressCountry:     BROKER.country,
    },
    geo: {
      '@type':    'GeoCoordinates',
      latitude:    50.5335,
      longitude:   14.1331,
    },
    areaServed: [
      { '@type': 'City',    name: 'Litoměřice' },
      { '@type': 'City',    name: 'Praha' },
      { '@type': 'Country', name: 'Česká republika' },
    ],
    sameAs: [
      BROKER.instagram,
      BROKER.facebook,
      BROKER.linkedin,
      'https://www.bidli.cz',
    ],
    founder: {
      '@id': `${SITE_URL}/#person`,
    },
    employee: {
      '@id': `${SITE_URL}/#person`,
    },
    aggregateRating: {
      '@type':       'AggregateRating',
      ratingValue:   '5',
      bestRating:    '5',
      worstRating:   '1',
      ratingCount:   '25',
      reviewCount:   '25',
    },
  }
}

// ─── FAQ (used on homepage) ───────────────────────────────────────────────────
export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name:    'Jak probíhá spolupráce s realitním makléřem Markem Duckým?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:    'Spolupráce začíná bezplatnou konzultací, kde probereme vaše požadavky a možnosti. Poté zajistím ocenění nemovitosti, přípravu podkladů, fotodokumentaci, marketing a kompletní průběh prodeje nebo pronájmu až do předání klíčů.',
        },
      },
      {
        '@type': 'Question',
        name:    'V jakých lokalitách realitní makléř Marek Ducký působí?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:    'Primárně působím v Litoměřicích a na Litoměřicku, dále v Praze a okolí. Jsem schopen zajistit prodej nebo pronájem nemovitosti po celé České republice díky síti Bidli.',
        },
      },
      {
        '@type': 'Question',
        name:    'Kolik stojí služby realitního makléře?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:    'Výše provize závisí na typu a hodnotě nemovitosti. Vše transparentně projednáme na úvodní konzultaci, která je zdarma. Neplatíte nic předem.',
        },
      },
      {
        '@type': 'Question',
        name:    'Jak rychle se nemovitost prodá?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:    'Doba prodeje závisí na lokalitě, stavu a ceně nemovitosti. Díky profesionálnímu marketingu, kvalitní fotodokumentaci a síti klientů se průměrná doba od nabídky k podpisu smlouvy pohybuje v řádech týdnů.',
        },
      },
    ],
  }
}

// ─── BreadcrumbList (for inner pages) ────────────────────────────────────────
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context':      'https://schema.org',
    '@type':         'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type':   'ListItem',
      position:  index + 1,
      name:      item.name,
      item:      item.url,
    })),
  }
}

// ─── Real estate listing (property detail page) ───────────────────────────────
export interface PropertySchemaInput {
  title:           string
  description?:    string
  price?:          string
  location?:       string
  imageUrl?:       string
  slug:            string
  transactionType: string   // 'prodej' | 'pronajem'
  category:        string   // 'byt' | 'dum' | ...
}

export function propertySchema(p: PropertySchemaInput) {
  const url = `${SITE_URL}/nemovitosti/${p.slug}`
  return {
    '@context': 'https://schema.org',
    '@type':    'Product',
    name:        p.title,
    description: p.description ?? `${p.transactionType} nemovitosti — ${p.location}`,
    url,
    image:       p.imageUrl ? [p.imageUrl] : undefined,
    offers: {
      '@type':       'Offer',
      priceCurrency: 'CZK',
      price:          p.price ?? '',
      availability:  'https://schema.org/InStock',
      seller: {
        '@id': `${SITE_URL}/#person`,
      },
    },
    brand: {
      '@type': 'Brand',
      name:    BROKER.company,
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Typ transakce', value: p.transactionType },
      { '@type': 'PropertyValue', name: 'Kategorie',     value: p.category },
      { '@type': 'PropertyValue', name: 'Lokalita',      value: p.location ?? '' },
    ],
  }
}

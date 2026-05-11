import type { Metadata } from 'next'

// ─── Site constants ────────────────────────────────────────────────────────────
// TODO: Change SITE_URL to your actual domain before going live
export const SITE_URL   = 'https://duckyreality.cz'
export const SITE_NAME  = 'Ducky Realit'

export const BROKER = {
  name:      'Marek Ducký',
  phone:     '+420 728 111 836',
  phoneTel:  '+420728111836',
  email:     'marek.ducky@bidli.cz',
  title:     'Realitní makléř',
  company:   'Bidli',
  ico:       '07637276',
  city:      'Litoměřice',
  region:    'Ústecký kraj',
  country:   'CZ',
  area:      'Litoměřicko · Praha · celá ČR',
  instagram: 'https://www.instagram.com/marekducky/',
  facebook:  'https://www.facebook.com/profile.php?id=61567288976002',
  youtube:   'https://www.youtube.com/@marekducky8034',
  photo:     `${SITE_URL}/Ducky.png`,
}

// ─── Primary keywords ──────────────────────────────────────────────────────────
export const PRIMARY_KEYWORDS = [
  'realitní makléř Litoměřice',
  'realitní makléř Praha',
  'Marek Ducký realitní makléř',
  'nemovitosti Litoměřice',
  'prodej nemovitostí Litoměřicko',
  'pronájem nemovitostí Praha',
  'realitní makléř Litoměřicko',
  'Bidli realitní makléř',
  'koupě nemovitosti Litoměřice',
  'byt k prodeji Litoměřice',
  'dům k prodeji Litoměřicko',
  'realitní kancelář Litoměřice',
  'Ducky Realit',
  'realitní makléř celá ČR',
  'prodej bytu Praha',
]

// ─── Default metadata (used in layout.tsx) ────────────────────────────────────
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${BROKER.name} | Realitní makléř Litoměřice & Praha`,
    template: `%s | ${BROKER.name}`,
  },

  description:
    'Realitní makléř Marek Ducký — Litoměřicko, Praha a celá ČR. ' +
    'Prodej, koupě a pronájem nemovitostí. ' +
    'Profesionální přístup, transparentní komunikace, výsledky.',

  keywords: PRIMARY_KEYWORDS,

  authors:   [{ name: BROKER.name, url: SITE_URL }],
  creator:   BROKER.name,
  publisher: BROKER.company,

  // ── Indexing ────────────────────────────────────────────────────────────────
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:              true,
      follow:             true,
      'max-snippet':      -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  // ── Canonical + hreflang ───────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
    languages: { 'cs-CZ': SITE_URL },
  },

  // ── Open Graph ─────────────────────────────────────────────────────────────
  openGraph: {
    type:        'website',
    locale:      'cs_CZ',
    url:          SITE_URL,
    siteName:     SITE_NAME,
    title:       `${BROKER.name} | Realitní makléř Litoměřice & Praha`,
    description: 'Realitní makléř Marek Ducký — Litoměřicko, Praha a celá ČR. Prodej, koupě a pronájem nemovitostí.',
    images: [
      {
        url:    '/og-image.png',
        width:   1200,
        height:  630,
        alt:    `${BROKER.name} — Realitní makléř`,
      },
    ],
  },

  // ── Twitter / X ────────────────────────────────────────────────────────────
  twitter: {
    card:        'summary_large_image',
    title:       `${BROKER.name} | Realitní makléř Litoměřice & Praha`,
    description: 'Realitní makléř Marek Ducký — Litoměřicko, Praha a celá ČR.',
    images:      ['/og-image.png'],
  },

  // ── Category hint for search engines ──────────────────────────────────────
  category: 'real estate',
}

// ─── Helper: build page-level metadata ────────────────────────────────────────
export function buildMeta(overrides: Partial<Metadata>): Metadata {
  return { ...defaultMetadata, ...overrides }
}

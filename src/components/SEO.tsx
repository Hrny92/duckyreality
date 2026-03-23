/**
 * SEO component — renders JSON-LD structured data as <script> tags.
 * This is a SERVER component (no 'use client').
 *
 * Usage:
 *   <SEO variant="home" />                         ← homepage
 *   <SEO variant="properties" />                   ← listing page
 *   <SEO variant="property" property={...} />      ← detail page
 *   <SEO schemas={[customSchema]} />               ← any custom schemas
 *
 * The global schemas (WebSite, Organization, Person) are always injected.
 * Additional page-specific schemas are added based on `variant`.
 */

import {
  webSiteSchema,
  organizationSchema,
  personSchema,
  localBusinessSchema,
  faqSchema,
  breadcrumbSchema,
  propertySchema,
  type PropertySchemaInput,
} from '@/lib/schemas'
import { SITE_URL } from '@/lib/metadata'

interface SEOProps {
  /** Page variant — controls which extra schemas are injected */
  variant?: 'home' | 'properties' | 'property'
  /** Property data (required when variant === 'property') */
  property?: PropertySchemaInput
  /** Additional arbitrary JSON-LD objects to inject alongside the defaults */
  schemas?: object[]
}

export default function SEO({ variant = 'home', property, schemas = [] }: SEOProps) {
  // ── Always-present global schemas ──────────────────────────────────────────
  const globalSchemas: object[] = [
    webSiteSchema(),
    organizationSchema(),
    personSchema(),
  ]

  // ── Page-specific schemas ───────────────────────────────────────────────────
  const pageSchemas: object[] = []

  if (variant === 'home') {
    pageSchemas.push(localBusinessSchema())
    pageSchemas.push(faqSchema())
  }

  if (variant === 'properties') {
    pageSchemas.push(
      breadcrumbSchema([
        { name: 'Úvod',        url: SITE_URL },
        { name: 'Nemovitosti', url: `${SITE_URL}/nemovitosti` },
      ])
    )
  }

  if (variant === 'property' && property) {
    pageSchemas.push(
      propertySchema(property),
      breadcrumbSchema([
        { name: 'Úvod',          url: SITE_URL },
        { name: 'Nemovitosti',   url: `${SITE_URL}/nemovitosti` },
        { name: property.title,  url: `${SITE_URL}/nemovitosti/${property.slug}` },
      ])
    )
  }

  const all = [...globalSchemas, ...pageSchemas, ...schemas]

  return (
    <>
      {all.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
        />
      ))}
    </>
  )
}

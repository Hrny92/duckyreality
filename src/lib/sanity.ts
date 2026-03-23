import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'cjm6dnlt',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: SanityImageSource) => builder.image(source)

// ── Types ──────────────────────────────────────────────────────────────────
export type SanityProperty = {
  _id: string
  title: string
  slug: { current: string }
  transactionType: 'prodej' | 'pronajem'
  category: 'byt' | 'dum' | 'pozemek' | 'komerce'
  location: string
  price: string
  area: string
  layout: string
  status: 'active' | 'reserved' | 'sold'
  mainImage?: { asset: { _ref: string }; hotspot?: unknown }
  gallery?: { asset: { _ref: string } }[]
  videoUrl?: string
  matterportUrl?: string
  description?: unknown[]      // Portable Text blocks
  accessories?: string
  energyEfficiency?: string
  buildingInfo?: string
  infrastructure?: string
  mapLink?: string
  history?: string
}

// ── GROQ queries ───────────────────────────────────────────────────────────

/** All properties for listing page */
export const allPropertiesQuery = `*[_type == "property"] | order(_createdAt desc) {
  _id, title, slug,
  transactionType, category, location, price, area, layout, status,
  mainImage
}`

/** First N for homepage teaser */
export const featuredPropertiesQuery = `*[_type == "property"] | order(_createdAt desc)[0...4] {
  _id, title, slug,
  transactionType, category, location, price, area, layout, status,
  mainImage
}`

/** Single property by slug */
export const propertyBySlugQuery = `*[_type == "property" && slug.current == $slug][0] {
  _id, title, slug,
  transactionType, category, location, price, area, layout, status,
  mainImage, gallery, videoUrl, matterportUrl,
  description,
  accessories, energyEfficiency, buildingInfo, infrastructure, mapLink, history
}`

// ── Fetch helpers (server-side) ────────────────────────────────────────────
export async function getAllProperties(): Promise<SanityProperty[]> {
  return client.fetch(allPropertiesQuery)
}

export async function getFeaturedProperties(): Promise<SanityProperty[]> {
  return client.fetch(featuredPropertiesQuery)
}

export async function getPropertyBySlug(slug: string): Promise<SanityProperty | null> {
  return client.fetch(propertyBySlugQuery, { slug })
}

// ── Label helpers ──────────────────────────────────────────────────────────
export const TRANSACTION_LABELS: Record<string, string> = {
  prodej: 'Prodej',
  pronajem: 'Pronájem',
}
export const CATEGORY_LABELS: Record<string, string> = {
  byt: 'Byt',
  dum: 'Dům',
  pozemek: 'Pozemek',
  komerce: 'Komerční',
}
export const STATUS_LABELS: Record<string, string> = {
  active:   'Dostupné',
  reserved: 'Rezervováno',
  sold:     'Prodáno',
}
export const STATUS_COLORS: Record<string, string> = {
  active:   '#4ade80',
  reserved: '#e94e1b',
  sold:     'rgba(0,43,64,0.2)',
}

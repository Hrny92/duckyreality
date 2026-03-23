import type { MetadataRoute } from 'next'
import { getAllProperties } from '@/lib/sanity'
import { SITE_URL } from '@/lib/metadata'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Static routes ────────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url:              SITE_URL,
      lastModified:     new Date(),
      changeFrequency: 'weekly',
      priority:         1.0,
    },
    {
      url:              `${SITE_URL}/nemovitosti`,
      lastModified:     new Date(),
      changeFrequency: 'daily',
      priority:         0.9,
    },
    {
      url:              `${SITE_URL}/gdpr`,
      lastModified:     new Date('2024-01-01'),
      changeFrequency: 'yearly',
      priority:         0.2,
    },
  ]

  // ── Dynamic property routes ──────────────────────────────────────────────────
  let propertyRoutes: MetadataRoute.Sitemap = []
  try {
    const properties = await getAllProperties()
    propertyRoutes = properties.map((p) => ({
      url:              `${SITE_URL}/nemovitosti/${p.slug.current}`,
      lastModified:     new Date(),
      changeFrequency:  'weekly' as const,
      priority:         0.8,
    }))
  } catch {
    // Sanity unreachable — return static routes only
  }

  return [...staticRoutes, ...propertyRoutes]
}

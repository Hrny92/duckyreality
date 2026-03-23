import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPropertyBySlug, TRANSACTION_LABELS, CATEGORY_LABELS } from '@/lib/sanity'
import PropertyDetail from '@/components/PropertyDetail'
import SEO from '@/components/SEO'
import { SITE_URL, BROKER } from '@/lib/metadata'
import { urlFor } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const property = await getPropertyBySlug(slug)
    if (!property) return { title: 'Nemovitost | Marek Ducký' }

    const type = TRANSACTION_LABELS[property.transactionType] ?? ''
    const cat  = CATEGORY_LABELS[property.category] ?? ''
    const desc = `${type} — ${cat}, ${property.location}. ${property.price}. Realitní makléř ${BROKER.name}.`
    const url  = `${SITE_URL}/nemovitosti/${slug}`

    // Build OG image URL from Sanity if available, otherwise fallback
    let ogImage = '/og-image.png'
    if (property.mainImage) {
      try {
        ogImage = urlFor(property.mainImage).width(1200).height(630).fit('crop').url()
      } catch { /* keep fallback */ }
    }

    return {
      title:       `${property.title} | ${BROKER.name}`,
      description:  desc,
      keywords: [
        `${cat} ${type.toLowerCase()} ${property.location}`,
        `nemovitosti ${property.location}`,
        `${BROKER.name} nemovitosti`,
        type,
        cat,
      ],
      alternates: { canonical: url },
      openGraph: {
        type:        'website',
        url,
        title:       `${property.title} | ${BROKER.name}`,
        description:  desc,
        images: [{
          url:    ogImage,
          width:  1200,
          height: 630,
          alt:    property.title,
        }],
      },
      twitter: {
        card:        'summary_large_image',
        title:       `${property.title} | ${BROKER.name}`,
        description:  desc,
        images:      [ogImage],
      },
    }
  } catch {
    return { title: 'Nemovitost | Marek Ducký' }
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  let property = null
  try {
    property = await getPropertyBySlug(slug)
  } catch {
    // Sanity unavailable
  }
  if (!property) notFound()

  // Build property schema input
  let imageUrl: string | undefined
  if (property.mainImage) {
    try {
      imageUrl = urlFor(property.mainImage).width(1200).height(630).fit('crop').url()
    } catch { /* keep undefined */ }
  }

  return (
    <>
      <SEO
        variant="property"
        property={{
          title:           property.title,
          description:     property.description ? 'realitní nabídka' : undefined,
          price:           property.price,
          location:        property.location,
          imageUrl,
          slug,
          transactionType: TRANSACTION_LABELS[property.transactionType] ?? property.transactionType,
          category:        CATEGORY_LABELS[property.category] ?? property.category,
        }}
      />
      <PropertyDetail property={property} />
    </>
  )
}

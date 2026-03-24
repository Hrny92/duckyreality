'use client'
import Link from 'next/link'
import { openContactModal } from '@/lib/openModal'
import {
  urlFor,
  type SanityProperty,
  TRANSACTION_LABELS, STATUS_LABELS, STATUS_COLORS,
} from '@/lib/sanity'

export default function Offer({ properties }: { properties: SanityProperty[] }) {
  return (
    <section id="nabidka" style={{ background: '#111111', padding: '8rem 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '2rem', marginBottom: '5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A542' }} />
              <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.35)' }}>Moje nabídka</span>
            </div>
            <h2 className="display-md" style={{ color: '#fff' }}>
              Aktuální<br/>
              <span className="orange-word">nemovitosti.</span>
            </h2>
          </div>
          <Link href="/nemovitosti" className="hover-arrow"
            style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: 600,
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
              gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.15)',
              paddingBottom: '0.25rem', transition: 'color 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color='#fff'; el.style.borderColor='rgba(255,255,255,0.4)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color='rgba(255,255,255,0.4)'; el.style.borderColor='rgba(255,255,255,0.15)' }}>
            Zobrazit vše
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Empty state */}
        {properties.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 2rem',
            border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1.5rem',
            background: 'rgba(255,255,255,0.02)', marginBottom: '4rem' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                  stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M9 22V12h6v10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <p style={{ fontSize: '1rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)',
              marginBottom: '0.5rem' }}>
              Zatím žádné nabídky
            </p>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.25)',
              maxWidth: 320, margin: '0 auto 2rem', lineHeight: 1.65 }}>
              Aktuálně připravuji nové nabídky. Napište mi — rád vám pomohu najít přesně to, co hledáte.
            </p>
            <button onClick={openContactModal}
              style={{ background: '#C9A542', color: '#fff', border: 'none',
                borderRadius: 999, padding: '0.75rem 2rem', cursor: 'pointer',
                fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em',
                textTransform: 'uppercase', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#B8922F'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#C9A542'}>
              Nezávazná poptávka
            </button>
          </div>
        )}

        {/* List */}
        {properties.map((p, i) => {
          const status      = p.status ?? 'active'
          const statusLabel = STATUS_LABELS[status]   ?? 'Dostupné'
          const statusColor = STATUS_COLORS[status]   ?? '#4ade80'
          const transLabel  = TRANSACTION_LABELS[p.transactionType] ?? p.transactionType
          const thumbUrl    = p.mainImage
            ? urlFor(p.mainImage).width(144).height(112).fit('crop').url()
            : null

          return (
            <div key={p._id}>
              {i > 0 && <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />}

              <Link href={`/nemovitosti/${p.slug.current}`}
                style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '2rem 0',
                  gap: '2rem', cursor: 'pointer', transition: 'padding-left 0.25s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft='1rem' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft='0' }}>

                  {/* Number */}
                  <div style={{ width: 40, flexShrink: 0, fontSize: '0.7rem', fontWeight: 700,
                    color: 'rgba(255,255,255,0.2)', fontVariantNumeric: 'tabular-nums' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Thumbnail */}
                  <div style={{ width: 72, height: 56, borderRadius: '0.75rem', flexShrink: 0,
                    background: 'rgba(255,255,255,0.06)', overflow: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {thumbUrl ? (
                      <img src={thumbUrl} alt={p.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M2 15l4-5 3 3 3-4 6 6" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>

                  {/* Title + location */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff',
                      marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden',
                      textOverflow: 'ellipsis' }}>
                      {p.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
                      {p.location}{p.area ? ` · ${p.area} m²` : ''}{p.layout ? ` · ${p.layout}` : ''}
                    </div>
                  </div>

                  {/* Type pill */}
                  <div className="pill"
                    style={{ background: p.transactionType === 'prodej' ? 'rgba(201,165,66,0.15)' : 'rgba(255,255,255,0.08)',
                      color: p.transactionType === 'prodej' ? '#C9A542' : 'rgba(255,255,255,0.5)',
                      flexShrink: 0 }}>
                    {transLabel}
                  </div>

                  {/* Status */}
                  <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: statusColor }} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 600,
                      color: status === 'active' ? 'rgba(255,255,255,0.4)' : statusColor,
                      textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {statusLabel}
                    </span>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 160 }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff',
                      letterSpacing: '-0.02em', opacity: status === 'sold' ? 0.3 : 1 }}>
                      {p.price}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.12)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.3)', transition: 'all 0.2s' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}

        {/* Bottom CTA */}
        <div style={{ marginTop: '4rem', padding: '3rem', background: 'rgba(255,255,255,0.03)',
          borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1.5rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', maxWidth: 400 }}>
            Hledáte něco jiného? Mám přístup k nabídkám, které nejsou veřejně inzerovány.
          </p>
          <button onClick={openContactModal}
            style={{ border: '1px solid rgba(201,165,66,0.5)', color: '#C9A542',
              fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '0.875rem 2rem', background: 'transparent',
              borderRadius: 999, cursor: 'pointer', transition: 'all 0.25s' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='#C9A542'; el.style.color='#fff' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='transparent'; el.style.color='#C9A542' }}>
            Nezávazná poptávka
          </button>
        </div>
      </div>
    </section>
  )
}

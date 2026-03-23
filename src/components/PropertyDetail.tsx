'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import { openContactModal } from '@/lib/openModal'
import {
  urlFor,
  type SanityProperty,
  TRANSACTION_LABELS, CATEGORY_LABELS, STATUS_LABELS, STATUS_COLORS,
} from '@/lib/sanity'

// ── Portable Text minimal renderer ────────────────────────────────────────
function PortableText({ blocks }: { blocks: unknown[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {(blocks as Record<string, unknown>[]).map((block, i) => {
        if (block._type !== 'block') return null
        const children = (block.children as Record<string, unknown>[]) ?? []
        const text = children.map(c => c.text as string).join('')
        const style = block.style as string

        const base: React.CSSProperties = {
          fontSize: '0.95rem', lineHeight: 1.85,
          color: 'rgba(0,43,64,0.7)', fontWeight: 400,
        }
        if (style === 'h2') return <h2 key={i} style={{ ...base, fontSize: '1.4rem', fontWeight: 800, color: '#002b40', letterSpacing: '-0.02em' }}>{text}</h2>
        if (style === 'h3') return <h3 key={i} style={{ ...base, fontSize: '1.1rem', fontWeight: 700, color: '#002b40' }}>{text}</h3>
        return <p key={i} style={base}>{text}</p>
      })}
    </div>
  )
}

// ── Gallery lightbox ─────────────────────────────────────────────────────
function Gallery({ images }: { images: SanityProperty['gallery'] }) {
  const [active, setActive] = useState<number | null>(null)
  if (!images?.length) return null

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '0.75rem' }}>
        {images.map((img, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ border: 'none', padding: 0, cursor: 'pointer', borderRadius: '0.75rem',
              overflow: 'hidden', aspectRatio: '4/3', background: 'rgba(0,43,64,0.06)',
              display: 'block', width: '100%' }}>
            <img
              src={urlFor(img).width(400).height(300).fit('crop').url()}
              alt={`Fotografie ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover',
                transition: 'transform 0.3s', display: 'block' }}
              onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'}
              onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'}
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          onClick={() => setActive(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem' }}>
          <img
            src={urlFor(images[active]).width(1400).fit('max').url()}
            alt=""
            style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain',
              borderRadius: '0.75rem' }}
            onClick={e => e.stopPropagation()}
          />
          {/* Prev / Next */}
          {active > 0 && (
            <button onClick={e => { e.stopPropagation(); setActive(active - 1) }}
              style={navBtn('left')}>‹</button>
          )}
          {active < images.length - 1 && (
            <button onClick={e => { e.stopPropagation(); setActive(active + 1) }}
              style={navBtn('right')}>›</button>
          )}
          <button onClick={() => setActive(null)}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem',
              background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
              width: 40, height: 40, borderRadius: '50%', cursor: 'pointer',
              fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ✕
          </button>
          <div style={{ position: 'absolute', bottom: '1.5rem',
            color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
            {active + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  )
}

const navBtn = (side: 'left' | 'right'): React.CSSProperties => ({
  position: 'absolute', [side]: '1rem', top: '50%', transform: 'translateY(-50%)',
  background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
  width: 48, height: 48, borderRadius: '50%', cursor: 'pointer',
  fontSize: '1.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
})

// ── Main component ────────────────────────────────────────────────────────
export default function PropertyDetail({ property: p }: { property: SanityProperty }) {
  const heroUrl = p.mainImage
    ? urlFor(p.mainImage).width(1600).height(700).fit('crop').url()
    : null

  const transLabel  = TRANSACTION_LABELS[p.transactionType] ?? ''
  const catLabel    = CATEGORY_LABELS[p.category] ?? ''
  const statusLabel = STATUS_LABELS[p.status] ?? ''
  const statusColor = STATUS_COLORS[p.status] ?? 'rgba(0,43,64,0.2)'

  const stats = [
    { label: 'Cena',       value: p.price },
    { label: 'Plocha',     value: p.area ? `${p.area} m²` : null },
    { label: 'Dispozice',  value: p.layout },
    { label: 'Kategorie',  value: catLabel },
    { label: 'Lokalita',   value: p.location },
    { label: 'Energie',    value: p.energyEfficiency },
  ].filter(s => s.value)

  const techRows = [
    { label: 'Stavba a podlaží',   value: p.buildingInfo },
    { label: 'Příslušenství',      value: p.accessories },
    { label: 'Infrastruktura',     value: p.infrastructure },
    { label: 'Energetická třída',  value: p.energyEfficiency },
    { label: 'Historie / Rekonstrukce', value: p.history },
  ].filter(r => r.value)

  return (
    <>
      <Navbar />

      {/* ── HERO IMAGE ────────────────────────────────────── */}
      <div style={{ position: 'relative', height: 'clamp(360px, 55vh, 680px)',
        background: '#002b40', overflow: 'hidden', marginTop: 0 }}>
        {heroUrl ? (
          <img src={heroUrl} alt={p.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center' }}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <path d="M6 48l16-20 10 10 10-14 16 24H6z"
                stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        {/* Gradient overlay bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(to top, rgba(0,27,40,0.85), transparent)',
          pointerEvents: 'none' }} />
        {/* Back link */}
        <Link href="/nemovitosti"
          style={{ position: 'absolute', top: '5.5rem', left: '2rem',
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
            background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)',
            borderRadius: 999, padding: '0.5rem 1rem', transition: 'color 0.2s' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 1L3 6l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Všechny nemovitosti
        </Link>
        {/* Status badge */}
        <div style={{ position: 'absolute', bottom: '1.75rem', left: '2rem',
          display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)',
            textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {statusLabel}
          </span>
        </div>
      </div>

      {/* ── CONTENT ───────────────────────────────────────── */}
      <main style={{ background: '#f4f3f0', paddingBottom: '8rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>

          {/* ── TITLE + PRICE HEADER ─────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto',
            gap: '2rem', alignItems: 'flex-start',
            padding: '3rem 0 2.5rem', borderBottom: '1px solid rgba(0,43,64,0.08)',
            flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem',
                marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                {/* Transaction pill */}
                <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em',
                  textTransform: 'uppercase', borderRadius: 999, padding: '0.25rem 0.7rem',
                  background: p.transactionType === 'prodej' ? 'rgba(233,78,27,0.1)' : 'rgba(0,43,64,0.07)',
                  color: p.transactionType === 'prodej' ? '#e94e1b' : 'rgba(0,43,64,0.5)' }}>
                  {transLabel}
                </span>
                <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'rgba(0,43,64,0.3)' }}>
                  {catLabel}
                </span>
                <span style={{ color: 'rgba(0,43,64,0.2)' }}>·</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(0,43,64,0.45)', fontWeight: 500 }}>
                  {p.location}
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900,
                letterSpacing: '-0.03em', lineHeight: 1.05, color: '#002b40' }}>
                {p.title}
              </h1>
            </div>

            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 900,
                color: '#002b40', letterSpacing: '-0.03em',
                opacity: p.status === 'sold' ? 0.35 : 1 }}>
                {p.price}
              </div>
              <button onClick={openContactModal}
                style={{ marginTop: '1rem', background: '#e94e1b', color: '#fff',
                  border: 'none', borderRadius: 999, padding: '0.75rem 1.75rem',
                  fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  transition: 'all 0.25s', boxShadow: '0 0 24px rgba(233,78,27,0.25)',
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='#d63e0d'; el.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='#e94e1b'; el.style.transform='translateY(0)' }}>
                Mám zájem
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── KEY STATS STRIP ─────────────────────── */}
          {stats.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0,
              borderBottom: '1px solid rgba(0,43,64,0.08)', marginBottom: '4rem' }}>
              {stats.map((s, i) => (
                <div key={i} style={{ padding: '1.5rem 2rem',
                  borderRight: i < stats.length - 1 ? '1px solid rgba(0,43,64,0.08)' : 'none' }}>
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: 'rgba(0,43,64,0.3)', marginBottom: '0.3rem' }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#002b40',
                    letterSpacing: '-0.01em' }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── TWO-COLUMN LAYOUT ───────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px',
            gap: '5rem', alignItems: 'flex-start' }}>

            {/* LEFT — main content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

              {/* Description */}
              {p.description && p.description.length > 0 && (
                <Section title="Popis nemovitosti">
                  <PortableText blocks={p.description} />
                </Section>
              )}

              {/* Gallery */}
              {p.gallery && p.gallery.length > 0 && (
                <Section title={`Fotogalerie (${p.gallery.length})`}>
                  <Gallery images={p.gallery} />
                </Section>
              )}

              {/* 3D Tour */}
              {p.matterportUrl && (
                <Section title="3D prohlídka">
                  <div style={{ borderRadius: '1rem', overflow: 'hidden',
                    aspectRatio: '16/9', background: '#002b40' }}>
                    <iframe
                      src={p.matterportUrl}
                      width="100%" height="100%"
                      style={{ border: 'none', display: 'block' }}
                      allowFullScreen
                      title="3D prohlídka"
                    />
                  </div>
                </Section>
              )}

              {/* YouTube video */}
              {p.videoUrl && (
                <Section title="Video">
                  <div style={{ borderRadius: '1rem', overflow: 'hidden',
                    aspectRatio: '16/9', background: '#002b40' }}>
                    <iframe
                      src={youtubeEmbed(p.videoUrl)}
                      width="100%" height="100%"
                      style={{ border: 'none', display: 'block' }}
                      allowFullScreen
                      title="Video nemovitosti"
                    />
                  </div>
                </Section>
              )}

              {/* Map */}
              {p.mapLink && (
                <Section title="Poloha na mapě">
                  <div style={{ borderRadius: '1rem', overflow: 'hidden',
                    aspectRatio: '16/9', background: 'rgba(0,43,64,0.06)' }}>
                    <iframe
                      src={p.mapLink}
                      width="100%" height="100%"
                      style={{ border: 'none', display: 'block' }}
                      title="Mapa"
                    />
                  </div>
                </Section>
              )}

              {/* Technical details */}
              {techRows.length > 0 && (
                <Section title="Technické informace">
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {techRows.map((row, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 1fr',
                        gap: '1rem', padding: '1rem 0',
                        borderBottom: i < techRows.length - 1
                          ? '1px solid rgba(0,43,64,0.06)' : 'none' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700,
                          color: 'rgba(0,43,64,0.35)', letterSpacing: '0.04em' }}>
                          {row.label}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: '#002b40',
                          fontWeight: 500, lineHeight: 1.6 }}>
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </Section>
              )}
            </div>

            {/* RIGHT — sticky contact card */}
            <div style={{ position: 'sticky', top: 80 }}>
              <div style={{ background: '#002b40', borderRadius: '1.5rem',
                padding: '2rem', overflow: 'hidden', position: 'relative' }}>
                {/* Glow */}
                <div style={{ position: 'absolute', bottom: -60, right: -60,
                  width: 200, height: 200, borderRadius: '50%', pointerEvents: 'none',
                  background: 'radial-gradient(circle, rgba(233,78,27,0.2) 0%, transparent 70%)' }} />

                {/* Broker */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem',
                  marginBottom: '1.5rem', paddingBottom: '1.5rem',
                  borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%',
                    overflow: 'hidden', flexShrink: 0, background: 'rgba(255,255,255,0.1)' }}>
                    <img src="/Ducky-omne.png" alt="Marek Ducký"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff',
                      letterSpacing: '-0.01em' }}>Marek Ducký</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)',
                      fontWeight: 500, marginTop: '0.1rem' }}>Realitní makléř · Bidli</div>
                  </div>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  Máte zájem o tuto nemovitost nebo chcete více informací? Kontaktujte mě — odpovím obratem.
                </p>

                {/* Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button onClick={openContactModal}
                    style={{ background: '#e94e1b', color: '#fff', border: 'none',
                      borderRadius: 999, padding: '0.875rem 1.5rem',
                      fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      transition: 'all 0.25s', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: '0.5rem',
                      boxShadow: '0 4px 24px rgba(233,78,27,0.35)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background='#d63e0d'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background='#e94e1b'}>
                    Mám zájem o nemovitost
                  </button>
                  <a href="tel:+420728111836"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: '0.5rem', border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.65)', borderRadius: 999,
                      padding: '0.875rem 1.5rem', fontSize: '0.78rem', fontWeight: 700,
                      letterSpacing: '0.06em', textDecoration: 'none', textTransform: 'uppercase',
                      transition: 'all 0.2s' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='rgba(255,255,255,0.3)'; el.style.color='#fff' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='rgba(255,255,255,0.12)'; el.style.color='rgba(255,255,255,0.65)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M13 10.3v1.8a1.2 1.2 0 0 1-1.3 1.2A11.87 11.87 0 0 1 .7 3.3 1.2 1.2 0 0 1 1.9 2h1.8a1.2 1.2 0 0 1 1.2 1 7.7 7.7 0 0 0 .42 1.68 1.2 1.2 0 0 1-.27 1.27L4.27 6.73A9.6 9.6 0 0 0 7.27 9.73l.78-.78a1.2 1.2 0 0 1 1.27-.27 7.7 7.7 0 0 0 1.68.42A1.2 1.2 0 0 1 12 10.3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                    </svg>
                    +420 728 111 836
                  </a>
                </div>

                {/* Info badges */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem',
                  paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)',
                  flexWrap: 'wrap' }}>
                  {[{ label: 'Bez závazků' }, { label: 'Bezplatná konzultace' }, { label: '12+ let zkušeností' }].map(b => (
                    <span key={b.label} style={{ fontSize: '0.6rem', fontWeight: 700,
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)',
                      borderRadius: 999, padding: '0.25rem 0.6rem' }}>
                      {b.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <ShareButton title={`${p.title} — ${p.price}`} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ContactModal />
    </>
  )
}

// ── Section wrapper ────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
        textTransform: 'uppercase', color: '#e94e1b', marginBottom: '1.5rem' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

// ── Share button ───────────────────────────────────────────────────────────
function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button onClick={copy}
      style={{ marginTop: '1rem', width: '100%', background: 'none',
        border: '1px solid rgba(0,43,64,0.1)', borderRadius: 999,
        padding: '0.65rem 1rem', fontSize: '0.72rem', fontWeight: 700,
        color: copied ? '#4ade80' : 'rgba(0,43,64,0.4)', cursor: 'pointer',
        letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'all 0.2s',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Odkaz zkopírován
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 4H9a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h1M5 1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
          Sdílet odkaz
        </>
      )}
    </button>
  )
}

// ── YouTube embed helper ───────────────────────────────────────────────────
function youtubeEmbed(url: string): string {
  const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  if (match) return `https://www.youtube.com/embed/${match[1]}`
  return url
}

'use client'
import { useState, useMemo } from 'react'
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

type SortKey = 'default' | 'price_asc' | 'price_desc' | 'area_asc' | 'area_desc'

const ALL_DISTRICTS = ['Litoměřice','Lovosice','Roudnice n. L.','Ústí n. L.','Praha','Středočeský kraj']
const ALL_CATEGORIES = ['byt','dum','pozemek','komerce']

export default function PropertiesPage({ properties }: { properties: SanityProperty[] }) {
  const [search,       setSearch]       = useState('')
  const [transType,    setTransType]    = useState<'vse' | 'prodej' | 'pronajem'>('vse')
  const [district,     setDistrict]     = useState('Vše')
  const [category,     setCategory]     = useState('Vše')
  const [statusFilter, setStatusFilter] = useState<'vse' | 'active' | 'reserved'>('vse')
  const [sort,         setSort]         = useState<SortKey>('default')
  const [filtersOpen,  setFiltersOpen]  = useState(false)

  // Dynamically collect districts from data
  const districts = useMemo(() => {
    const set = new Set<string>()
    properties.forEach(p => {
      if (!p.location) return
      // Match "Praha X", "Litoměřice", "Lovosice" etc. — first word/city before " –" or ","
      const d = p.location.split(/\s*[–,-]\s*/)[0].trim()
      if (d) set.add(d)
    })
    return ['Vše', ...Array.from(set).sort()]
  }, [properties])

  const filtered = useMemo(() => {
    let list = [...properties]

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.layout?.toLowerCase().includes(q)
      )
    }
    if (transType !== 'vse')    list = list.filter(p => p.transactionType === transType)
    if (statusFilter !== 'vse') list = list.filter(p => p.status === statusFilter)
    if (category !== 'Vše')     list = list.filter(p => CATEGORY_LABELS[p.category] === category || p.category === category)
    if (district !== 'Vše')     list = list.filter(p => p.location?.split(/\s*[–,-]\s*/)[0].trim() === district)

    switch (sort) {
      case 'price_asc':  list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price)); break
      case 'price_desc': list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price)); break
      case 'area_asc':   list.sort((a, b) => parseArea(a.area)   - parseArea(b.area));   break
      case 'area_desc':  list.sort((a, b) => parseArea(b.area)   - parseArea(a.area));   break
    }
    return list
  }, [properties, search, transType, statusFilter, category, district, sort])

  const resetFilters = () => {
    setSearch(''); setTransType('vse'); setDistrict('Vše')
    setCategory('Vše'); setStatusFilter('vse'); setSort('default')
  }

  const activeCount = [
    transType !== 'vse', district !== 'Vše', category !== 'Vše',
    statusFilter !== 'vse', search.trim() !== '',
  ].filter(Boolean).length

  const countLabel = filtered.length === 1 ? 'nemovitost'
    : filtered.length < 5 ? 'nemovitosti' : 'nemovitostí'

  return (
    <>
      <Navbar />

      {/* ── PAGE HEADER ────────────────────────────────────── */}
      <section style={{ background: '#111111', paddingTop: '9rem', paddingBottom: '5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
          <Link href="/#nabidka"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
              marginBottom: '2rem', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)'}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8 1L3 6l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Zpět
          </Link>

          <div style={{ display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4AF37',
                  animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                  Moje nabídka
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 900,
                letterSpacing: '-0.03em', lineHeight: 1.0, color: '#fff' }}>
                Aktuální<br/>
                <span style={{ color: '#D4AF37' }}>nemovitosti.</span>
              </h1>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)',
              fontWeight: 400, maxWidth: 320, lineHeight: 1.7 }}>
              {filtered.length} {countLabel}
              {activeCount > 0 ? ' odpovídá filtru' : ' v nabídce'}
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────────── */}
      <section style={{ background: '#141414', minHeight: '60vh', paddingBottom: '8rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>

          {/* ── FILTER BAR ──────────────────────────── */}
          <div style={{ position: 'sticky', top: 64, zIndex: 40, background: '#141414',
            paddingTop: '2rem', paddingBottom: '1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '3rem' }}>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center',
              flexWrap: 'wrap', marginBottom: filtersOpen ? '1rem' : 0 }}>

              {/* Search */}
              <div style={{ flex: '1 1 240px', position: 'relative' }}>
                <svg style={{ position: 'absolute', left: '0.9rem', top: '50%',
                  transform: 'translateY(-50%)', pointerEvents: 'none',
                  color: 'rgba(255,255,255,0.3)' }}
                  width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <input type="text" placeholder="Hledat (název, lokalita, dispozice…)"
                  value={search} onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', paddingLeft: '2.25rem', paddingRight: '1rem',
                    paddingTop: '0.65rem', paddingBottom: '0.65rem',
                    fontSize: '0.82rem', fontWeight: 500, color: '#fff',
                    background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 999, outline: 'none',
                    boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>

              {/* Filter toggle */}
              <button onClick={() => setFiltersOpen(o => !o)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem',
                  background: activeCount > 0 ? '#D4AF37' : '#fff',
                  color: activeCount > 0 ? '#fff' : '#111111',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 999, padding: '0.65rem 1.1rem',
                  fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                  letterSpacing: '0.06em', transition: 'all 0.2s', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Filtry
                {activeCount > 0 && (
                  <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: '50%',
                    width: 18, height: 18, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '0.65rem', fontWeight: 900 }}>
                    {activeCount}
                  </span>
                )}
              </button>

              {/* Sort */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <select value={sort} onChange={e => setSort(e.target.value as SortKey)}
                  style={{ appearance: 'none', background: '#1C1C1C',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 999, padding: '0.65rem 2.2rem 0.65rem 1rem',
                    fontSize: '0.78rem', fontWeight: 600, color: '#fff',
                    cursor: 'pointer', fontFamily: 'inherit', outline: 'none' }}>
                  <option value="default">Řadit: výchozí</option>
                  <option value="price_asc">Cena: nejnižší</option>
                  <option value="price_desc">Cena: nejvyšší</option>
                  <option value="area_asc">Plocha: nejmenší</option>
                  <option value="area_desc">Plocha: největší</option>
                </select>
                <svg style={{ position: 'absolute', right: '0.75rem', top: '50%',
                  transform: 'translateY(-50%)', pointerEvents: 'none' }}
                  width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 3.5l3 3 3-3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>

              {activeCount > 0 && (
                <button onClick={resetFilters}
                  style={{ background: 'none', border: 'none', padding: 0,
                    fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.3)',
                    cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase',
                    transition: 'color 0.2s', flexShrink: 0 }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#D4AF37'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'}>
                  Zrušit filtry
                </button>
              )}
            </div>

            {/* Expanded chips */}
            {filtersOpen && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 2rem',
                paddingTop: '1rem' }}>

                <FilterGroup label="Transakce">
                  {(['vse','prodej','pronajem'] as const).map(v => (
                    <Chip key={v}
                      label={v === 'vse' ? 'Vše' : TRANSACTION_LABELS[v] ?? v}
                      active={transType === v}
                      onClick={() => setTransType(v)} />
                  ))}
                </FilterGroup>

                <FilterGroup label="Stav">
                  {(['vse','active','reserved'] as const).map(v => (
                    <Chip key={v}
                      label={v === 'vse' ? 'Vše' : STATUS_LABELS[v] ?? v}
                      active={statusFilter === v}
                      onClick={() => setStatusFilter(v)} />
                  ))}
                </FilterGroup>

                <FilterGroup label="Kategorie">
                  {['Vše', ...ALL_CATEGORIES.map(c => CATEGORY_LABELS[c])].map(v => (
                    <Chip key={v} label={v} active={category === v}
                      onClick={() => setCategory(v)} />
                  ))}
                </FilterGroup>

                {districts.length > 1 && (
                  <FilterGroup label="Oblast">
                    {districts.map(v => (
                      <Chip key={v} label={v} active={district === v}
                        onClick={() => setDistrict(v)} />
                    ))}
                  </FilterGroup>
                )}
              </div>
            )}
          </div>

          {/* ── PROPERTY LIST ─────────────────────── */}
          {properties.length === 0 ? (
            <EmptyState type="no-data" onReset={resetFilters} />
          ) : filtered.length === 0 ? (
            <EmptyState type="no-results" onReset={resetFilters} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {filtered.map((p, i) => (
                <PropertyRow key={p._id} p={p} index={i} total={filtered.length} />
              ))}
            </div>
          )}

          {/* ── CTA BOTTOM ─────────────────────────── */}
          <div style={{ marginTop: '5rem', padding: '3rem 3.5rem',
            background: '#111111', borderRadius: '1.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem',
                marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
                Nenašli jste, co hledáte?
              </p>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', maxWidth: 380 }}>
                Mám přístup k nabídkám, které nejsou veřejně inzerovány. Napište mi, co hledáte.
              </p>
            </div>
            <button onClick={openContactModal}
              style={{ background: '#D4AF37', color: '#fff', border: 'none',
                borderRadius: 999, padding: '0.9rem 2.25rem',
                fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                transition: 'all 0.25s', boxShadow: '0 0 30px rgba(212,175,55,0.3)', flexShrink: 0 }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='#B8960D'; el.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='#D4AF37'; el.style.transform='translateY(0)' }}>
              Nezávazná poptávka
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <ContactModal />
    </>
  )
}

// ── Property Row ───────────────────────────────────────────────────────────
function PropertyRow({ p, index, total }: { p: SanityProperty; index: number; total: number }) {
  const [hovered, setHovered] = useState(false)
  const status = p.status ?? 'active'
  const statusLabel = STATUS_LABELS[status] ?? 'Dostupné'
  const statusColor = STATUS_COLORS[status] ?? '#4ade80'

  const thumbUrl = p.mainImage
    ? urlFor(p.mainImage).width(160).height(120).fit('crop').url()
    : null

  return (
    <div>
      {index > 0 && <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />}

      <Link href={`/nemovitosti/${p.slug.current}`}
        style={{ textDecoration: 'none', display: 'block' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        <div className="prop-row" style={{
          paddingLeft: hovered ? '0.75rem' : '0',
        }}>

          {/* Index */}
          <span className="prop-col-index" style={{ fontSize: '0.68rem', fontWeight: 700,
            color: 'rgba(255,255,255,0.2)', fontVariantNumeric: 'tabular-nums' }}>
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Thumbnail */}
          <div style={{ width: 80, height: 60, borderRadius: '0.6rem', flexShrink: 0,
            background: 'rgba(255,255,255,0.06)', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {thumbUrl ? (
              <img src={thumbUrl} alt={p.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M2 17l5-6 3.5 3.5L15 9l5 8H2z" stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
            )}
          </div>

          {/* Title + meta */}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff',
              letterSpacing: '-0.01em', marginBottom: '0.2rem',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              transition: 'color 0.2s',
              ...(hovered ? { color: '#D4AF37' } : {}) }}>
              {p.title}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)',
              fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{p.location}</span>
              {p.area && <><span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span><span>{p.area} m²</span></>}
              {p.layout && <><span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span><span>{p.layout}</span></>}
            </div>
          </div>

          {/* Type pill */}
          <div className="prop-col-type" style={{ flexShrink: 0, fontSize: '0.65rem', fontWeight: 800,
            letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 999,
            padding: '0.3rem 0.75rem',
            background: p.transactionType === 'prodej' ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.07)',
            color: p.transactionType === 'prodej' ? '#D4AF37' : 'rgba(255,255,255,0.5)' }}>
            {TRANSACTION_LABELS[p.transactionType] ?? p.transactionType}
          </div>

          {/* Category */}
          <div className="prop-col-cat" style={{ flexShrink: 0, fontSize: '0.65rem', fontWeight: 700,
            color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {CATEGORY_LABELS[p.category] ?? p.category}
          </div>

          {/* Status */}
          <div className="prop-col-status" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: statusColor, flexShrink: 0 }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 700,
              color: status === 'active' ? 'rgba(255,255,255,0.4)' : statusColor,
              textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {statusLabel}
            </span>
          </div>

          {/* Price */}
          <div className="prop-col-price" style={{ textAlign: 'right', flexShrink: 0, minWidth: 170 }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff',
              letterSpacing: '-0.02em',
              opacity: status === 'sold' ? 0.3 : 1 }}>
              {p.price}
            </div>
          </div>
        </div>
      </Link>

      {index === total - 1 && <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />}
    </div>
  )
}

// ── Empty states ───────────────────────────────────────────────────────────
function EmptyState({ type, onReset }: { type: 'no-data' | 'no-results'; onReset: () => void }) {
  return (
    <div style={{ textAlign: 'center', paddingTop: '6rem', paddingBottom: '6rem' }}>
      {type === 'no-data' ? (
        <>
          <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
            Žádné nemovitosti
          </p>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
            Sanity CMS ještě neobsahuje žádné záznamy nebo se nepodařilo načíst data.
          </p>
          <button onClick={openContactModal}
            style={{ marginTop: '1.5rem', background: '#D4AF37', color: '#fff',
              border: 'none', borderRadius: 999, padding: '0.75rem 2rem',
              fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
              letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Kontaktovat makléře
          </button>
        </>
      ) : (
        <>
          <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
            Žádné výsledky
          </p>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
            Zkuste upravit nebo zrušit filtry.
          </p>
          <button onClick={onReset}
            style={{ marginTop: '1.5rem', background: '#D4AF37', color: '#fff',
              border: 'none', borderRadius: 999, padding: '0.75rem 2rem',
              fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
              letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Zrušit filtry
          </button>
        </>
      )}
    </div>
  )
}

// ── Filter helpers ─────────────────────────────────────────────────────────
function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginRight: '0.25rem', flexShrink: 0 }}>
        {label}
      </span>
      {children}
    </div>
  )
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em',
        borderRadius: 999, padding: '0.35rem 0.85rem', cursor: 'pointer',
        border: active ? 'none' : '1px solid rgba(255,255,255,0.1)',
        background: active ? '#D4AF37' : '#1C1C1C',
        color: active ? '#fff' : 'rgba(255,255,255,0.5)',
        transition: 'all 0.15s' }}>
      {label}
    </button>
  )
}

// ── Parse helpers for sorting ──────────────────────────────────────────────
function parsePrice(val?: string): number {
  if (!val) return 0
  return parseInt(val.replace(/\D/g, ''), 10) || 0
}
function parseArea(val?: string): number {
  if (!val) return 0
  return parseInt(val.replace(/\D/g, ''), 10) || 0
}

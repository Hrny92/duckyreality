'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { openContactModal } from '@/lib/openModal'

const NAV_LINKS = [
  { label: 'O mně',        anchor: 'o-mne' },
  { label: 'Nabídka',      anchor: 'nabidka' },
  { label: 'Proč se mnou', anchor: 'proc' },
  { label: 'Služby',       anchor: 'sluzby' },
  { label: 'Reference',    anchor: 'reference' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  // On non-home pages links must go back to homepage sections
  const links = NAV_LINKS.map(l => ({
    label: l.label,
    href: isHome ? `#${l.anchor}` : `/#${l.anchor}`,
  }))

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    fn() // init
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Barvy podle stavu scrollu
  const linkColor     = scrolled ? '#002b40'              : 'rgba(255,255,255,0.85)'
  const linkHover     = '#e94e1b'
  const linkLeave     = scrolled ? '#002b40'              : 'rgba(255,255,255,0.85)'
  const burgerColor   = scrolled ? '#002b40'              : '#ffffff'
  const ctaBg         = scrolled ? '#e94e1b'              : 'rgba(255,255,255,0.15)'
  const ctaBorder     = scrolled ? 'none'                 : '1px solid rgba(255,255,255,0.35)'
  const ctaColor      = '#ffffff'
  const ctaHoverBg    = scrolled ? '#d63e0d'              : 'rgba(255,255,255,0.25)'
  // Logo: originální barvy když je bílá navbar, bílé přes fotku
  const logoFilter    = scrolled ? 'none'                 : 'brightness(0) invert(1)'

  return (
    <header
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      style={{ padding: scrolled ? '1rem 0' : '1.75rem 0' }}
    >
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* ── Logo ── */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img
            src="/logo.svg"
            alt="Ducky Realit"
            style={{
              height: 28, width: 'auto',
              filter: logoFilter,
              transition: 'filter 0.4s ease',
            }}
          />
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '2.5rem' }}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em',
                color: linkColor, textDecoration: 'none',
                transition: 'color 0.25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = linkHover)}
              onMouseLeave={e => (e.currentTarget.style.color = linkLeave)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* ── CTA tlačítko ── */}
        <button
          onClick={openContactModal}
          className="hidden md:inline-flex"
          style={{
            background: ctaBg,
            border: ctaBorder,
            color: ctaColor,
            fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '0.65rem 1.5rem', borderRadius: 999,
            cursor: 'pointer',
            transition: 'background 0.25s, transform 0.2s, border-color 0.25s',
            backdropFilter: scrolled ? 'none' : 'blur(8px)',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = ctaHoverBg
            el.style.transform   = 'scale(1.03)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = ctaBg
            el.style.transform   = 'scale(1)'
          }}
        >
          Kontakt
        </button>

        {/* ── Hamburger ── */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
          aria-label="Menu"
        >
          <div style={{ width: 22, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              open ? 'rotate(45deg) translateY(6.5px)' : 'none',
              '',
              open ? 'rotate(-45deg) translateY(-6.5px)' : 'none',
            ].map((transform, i) => (
              <span
                key={i}
                style={{
                  display: 'block', height: 1.5,
                  background: burgerColor,
                  transition: 'all 0.3s, background 0.4s',
                  transform: transform || 'none',
                  opacity: i === 1 && open ? 0 : 1,
                }}
              />
            ))}
          </div>
        </button>
      </div>

      {/* ── Mobile menu (vždy bílé pozadí) ── */}
      <div style={{
        overflow: 'hidden',
        maxHeight: open ? 420 : 0,
        transition: 'max-height 0.4s ease',
        background: '#fff',
        borderTop: open ? '1px solid rgba(0,43,64,0.06)' : 'none',
      }}>
        <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ fontSize: '1rem', fontWeight: 600, color: '#002b40', textDecoration: 'none' }}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); openContactModal() }}
            style={{
              background: '#e94e1b', color: '#fff', textAlign: 'center',
              padding: '0.875rem', borderRadius: 999, fontWeight: 700,
              fontSize: '0.8rem', border: 'none', cursor: 'pointer', width: '100%',
              letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.5rem',
            }}
          >
            Kontakt
          </button>
        </div>
      </div>
    </header>
  )
}

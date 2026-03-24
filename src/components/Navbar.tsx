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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Barvy podle stavu scrollu
  const linkColor     = scrolled ? '#111111'              : 'rgba(255,255,255,0.85)'
  const linkHover     = '#C9A542'
  const linkLeave     = scrolled ? '#111111'              : 'rgba(255,255,255,0.85)'
  const burgerColor   = scrolled ? '#111111'              : '#ffffff'
  const ctaBg         = scrolled ? '#C9A542'              : 'rgba(255,255,255,0.15)'
  const ctaBorder     = scrolled ? 'none'                 : '1px solid rgba(255,255,255,0.35)'
  const ctaColor      = '#ffffff'
  const ctaHoverBg    = scrolled ? '#B8922F'              : 'rgba(255,255,255,0.25)'
  // Logo: originální barvy když je bílá navbar, bílé přes fotku
  const logoFilter    = scrolled ? 'none'                 : 'brightness(0) invert(1)'

  return (
    <>
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
                filter: open ? 'brightness(0) invert(1)' : logoFilter,
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
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 8, zIndex: 110, position: 'relative',
            }}
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
                    background: open ? '#ffffff' : burgerColor,
                    transition: 'all 0.3s, background 0.3s',
                    transform: transform || 'none',
                    opacity: i === 1 && open ? 0 : 1,
                  }}
                />
              ))}
            </div>
          </button>
        </div>
      </header>

      {/* ── Mobile menu — full screen, slides in from right ── */}
      <div
        className={`mobile-nav${open ? ' mobile-nav--open' : ''}`}
        aria-hidden={!open}
      >
        {/* Background accent glow */}
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-10%',
          width: '60vw', height: '60vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,165,66,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="mobile-nav__inner">

          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Zavřít menu"
            style={{
              position: 'absolute', top: '1.5rem', right: '1.5rem',
              background: 'rgba(255,255,255,0.07)', border: 'none',
              borderRadius: '50%', width: 44, height: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
              transition: 'background 0.2s, color 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='rgba(255,255,255,0.14)'; el.style.color='#fff' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='rgba(255,255,255,0.07)'; el.style.color='rgba(255,255,255,0.7)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Nav links */}
          <nav className="mobile-nav__links">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="mobile-nav__link"
                style={{ transitionDelay: open ? `${0.12 + i * 0.06}s` : '0s' }}
              >
                <span className="mobile-nav__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mobile-nav__label">{l.label}</span>
                <svg className="mobile-nav__arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}
          </nav>

          {/* Footer */}
          <div
            className="mobile-nav__footer"
            style={{ transitionDelay: open ? `${0.12 + links.length * 0.06}s` : '0s' }}
          >
            <button
              onClick={() => { setOpen(false); openContactModal() }}
              className="mobile-nav__cta"
            >
              Napsat zprávu
            </button>
            <div className="mobile-nav__contact">
              <a href="tel:+420728111836" className="mobile-nav__phone">
                +420 728 111 836
              </a>
              <a href="mailto:marek.ducky@bidli.cz" className="mobile-nav__email">
                marek.ducky@bidli.cz
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

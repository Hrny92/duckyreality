'use client'
import { openContactModal } from '@/lib/openModal'

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/marekducky/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/marekducky/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/marekducky/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#001a29', borderTop: '1px solid rgba(255,255,255,0.04)', padding: '4rem 0 2.5rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>

        {/* Top row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start',
          justifyContent: 'space-between', gap: '3rem', marginBottom: '3rem' }}>

          {/* Logo + tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <img src="/logo.svg" alt="Ducky Realit"
              style={{ height: 22, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.4, alignSelf: 'flex-start' }} />
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', fontWeight: 400,
              maxWidth: 220, lineHeight: 1.6 }}>
              Litoměřicko · Praha · celá ČR<br/>IČ: 07637276
            </p>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            {[['O mně','#o-mne'],['Nabídka','#nabidka'],['Proč se mnou','#proc'],
              ['Služby','#sluzby'],['Reference','#reference']].map(([l,h]) => (
              <a key={h} href={h}
                style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
                  textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.7)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.25)'}>
                {l}
              </a>
            ))}
            <button onClick={openContactModal}
              style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.7)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.25)'}>
              Kontakt
            </button>
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                aria-label={s.label}
                style={{ width: 38, height: 38, borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.3)', textDecoration: 'none',
                  transition: 'all 0.2s' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = '#e94e1b'
                  el.style.color = '#e94e1b'
                  el.style.background = 'rgba(233,78,27,0.08)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.1)'
                  el.style.color = 'rgba(255,255,255,0.3)'
                  el.style.background = 'transparent'
                }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: '1.75rem' }} />

        {/* Bottom row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: '1rem' }}>

          <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.18)', fontWeight: 500 }}>
            © {new Date().getFullYear()} Marek Ducký — Ducky Realit. Všechna práva vyhrazena.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/gdpr"
              style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.06em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
                textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.6)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.2)'}>
              Ochrana osobních údajů
            </a>
            <button
              onClick={() => window.dispatchEvent(new Event('openCookieSettings'))}
              style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.06em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.6)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.2)'}>
              Nastavení cookies
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}

'use client'
import { openContactModal } from '@/lib/openModal'
import Reveal from '@/components/Reveal'

export default function CTA() {
  return (
    <section id="kontakt" style={{ background: '#002b40', padding: '10rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Orange glow */}
      <div style={{ position: 'absolute', bottom: 0, right: '15%',
        width: 600, height: 600, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(233,78,27,0.12) 0%, transparent 70%)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>

        {/* Eyebrow */}
        <Reveal duration={600}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
            <div className="pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#e94e1b' }} />
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.3)' }}>Bezplatná konzultace</span>
          </div>
        </Reveal>

        {/* Big headline */}
        <Reveal delay={80} duration={700}>
          <h2 style={{ fontSize: 'clamp(3rem,7vw,6.5rem)', fontWeight: 900, letterSpacing: '-0.03em',
            lineHeight: 0.95, color: '#fff', marginBottom: '3rem', maxWidth: 800 }}>
            Pojďme to<br/>
            <span className="orange-word">rozjet společně.</span>
          </h2>
        </Reveal>

        <Reveal delay={160} duration={700}>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)', maxWidth: 480,
            lineHeight: 1.75, fontWeight: 400, marginBottom: '5rem' }}>
            Ať prodáváte, kupujete nebo jen zvažujete — rád se potkám, poslechnu vás
            a upřímně poradím. Bez závazků, bez tlaku.
          </p>
        </Reveal>

        {/* Contact methods */}
        <Reveal delay={240} duration={700}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start',
            paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>

            {[
              { label: 'E-mail',     value: 'marek.ducky@bidli.cz',   href: 'mailto:marek.ducky@bidli.cz' },
              { label: 'Telefon',    value: '+420 728 111 836',         href: 'tel:+420728111836' },
              { label: 'Působnost',  value: 'Litoměřicko · Praha · celá ČR', href: '#' },
            ].map(c => (
              <div key={c.label}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '0.5rem' }}>
                  {c.label}
                </div>
                <a href={c.href}
                  style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#e94e1b'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#fff'}>
                  {c.value}
                </a>
              </div>
            ))}

            {/* CTA button */}
            <div className="cta-btn-wrap" style={{ marginLeft: 'auto', alignSelf: 'center' }}>
              <button onClick={openContactModal}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.875rem',
                  background: '#e94e1b', color: '#fff', fontWeight: 800,
                  fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '1.1rem 2.5rem', borderRadius: 999, border: 'none',
                  cursor: 'pointer', transition: 'all 0.25s', boxShadow: '0 0 40px rgba(233,78,27,0.3)',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='#d63e0d'; el.style.transform='translateY(-2px)'; el.style.boxShadow='0 8px 50px rgba(233,78,27,0.5)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='#e94e1b'; el.style.transform='translateY(0)'; el.style.boxShadow='0 0 40px rgba(233,78,27,0.3)' }}>
                Napsat zprávu
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 8h14M8 1l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

'use client'
import { openContactModal } from '@/lib/openModal'
import Reveal from '@/components/Reveal'

const services = [
  {
    n: '01',
    title: 'Prodej nemovitosti',
    desc: 'Od přípravy přes marketing po právní servis. Získám pro vaši nemovitost maximální cenu v co nejkratším čase.',
    items: ['Bezplatná tržní analýza', 'Profesionální fotografie & video', 'Home staging poradenství', 'Právní podpora v ceně'],
    links: [] as { label: string; href: string }[],
  },
  {
    n: '02',
    title: 'Koupě nemovitosti',
    desc: 'Najdu vám ideální nemovitost, vyjednám nejlepší cenu a ochráním vás před skrytými riziky.',
    items: ['Průzkum trhu na míru', 'Prověření právního stavu', 'Vyjednávání ceny', 'Doprovodný servis'],
    links: [] as { label: string; href: string }[],
  },
  {
    n: '03',
    title: 'Pronájem',
    desc: 'Ať pronajímáte nebo hledáte nájemníka — postarám se o celý proces včetně smlouvy.',
    items: ['Screening nájemníků', 'Nájemní smlouva', 'Předávací protokol', 'Správa nemovitosti'],
    links: [] as { label: string; href: string }[],
  },
  {
    n: '04',
    title: 'Investiční poradenství',
    desc: 'Analyzuji výnosnost, lokalitu i trendy a pomůžu vám učinit informované rozhodnutí.',
    items: ['Analýza výnosnosti', 'Výběr lokality', 'Financování & hypotéky', 'Dlouhodobá strategie'],
    links: [
      { label: 'Rentia Estate', href: 'https://www.rentiaestate.com/marek-ducky' },
      { label: 'Rentia Group', href: 'https://www.rentiagroup.com/m/marek-ducky' },
    ],
  },
]

export default function Services() {
  return (
    <section id="sluzby" style={{ background: '#0A0A0A', padding: '8rem 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
            <span className="eyebrow" style={{ color: '#D4AF37', flexShrink: 0 }}>Moje služby</span>
            <div className="h-rule" style={{ flexGrow: 1 }} />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="display-md" style={{ color: '#fff', marginBottom: '5rem', maxWidth: 600 }}>
            Kompletní péče<br/>
            <span className="orange-word">od A do Z</span>
          </h2>
        </Reveal>

        {/* Services list — každý řádek se samostatně nabíhá */}
        {services.map((s, i) => (
          <Reveal key={s.n} direction="up" delay={0} duration={700}>
            <div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
              <div className="service-row">

                {/* Number */}
                <div className="service-num" style={{
                  fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.1em', paddingTop: '0.3rem',
                }}>
                  {s.n}
                </div>

                {/* Title + desc */}
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff',
                    letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.5)',
                    fontWeight: 400, maxWidth: 360 }}>
                    {s.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginTop: '1.75rem' }}>
                    <button onClick={openContactModal}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        color: '#D4AF37', fontWeight: 700, fontSize: '0.75rem',
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        background: 'none', border: 'none', padding: 0,
                        cursor: 'pointer', transition: 'gap 0.3s',
                      }}>
                      Zjistit více
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {s.links.map(link => (
                      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                          fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em',
                          textTransform: 'uppercase', textDecoration: 'none',
                          color: 'rgba(255,255,255,0.55)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: 999, padding: '0.35rem 0.85rem',
                          transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                        }}
                        onMouseEnter={e => {
                          const el = e.currentTarget
                          el.style.color = '#D4AF37'
                          el.style.borderColor = 'rgba(212,175,55,0.4)'
                          el.style.background = 'rgba(212,175,55,0.06)'
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget
                          el.style.color = 'rgba(255,255,255,0.55)'
                          el.style.borderColor = 'rgba(255,255,255,0.15)'
                          el.style.background = 'transparent'
                        }}
                      >
                        {link.label}
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 8.5l7-7M8.5 8.5V1.5H1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Features — stagger */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingTop: '0.25rem' }}>
                  {s.items.map((item, j) => (
                    <Reveal key={item} direction="left" delay={j * 60} duration={400}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#D4AF37', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.75)' }}>{item}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
      </div>
    </section>
  )
}

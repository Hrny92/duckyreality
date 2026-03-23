'use client'
import { openContactModal } from '@/lib/openModal'

const services = [
  {
    n: '01',
    title: 'Prodej nemovitosti',
    desc: 'Od přípravy přes marketing po právní servis. Získám pro vaši nemovitost maximální cenu v co nejkratším čase.',
    items: ['Bezplatná tržní analýza', 'Profesionální fotografie & video', 'Home staging poradenství', 'Právní podpora v ceně'],
  },
  {
    n: '02',
    title: 'Koupě nemovitosti',
    desc: 'Najdu vám ideální nemovitost, vyjednám nejlepší cenu a ochráním vás před skrytými riziky.',
    items: ['Průzkum trhu na míru', 'Prověření právního stavu', 'Vyjednávání ceny', 'Doprovodný servis'],
  },
  {
    n: '03',
    title: 'Pronájem',
    desc: 'Ať pronajímáte nebo hledáte nájemníka — postarám se o celý proces včetně smlouvy.',
    items: ['Screening nájemníků', 'Nájemní smlouva', 'Předávací protokol', 'Správa nemovitosti'],
  },
  {
    n: '04',
    title: 'Investiční poradenství',
    desc: 'Analyzuji výnosnost, lokalitu i trendy a pomůžu vám učinit informované rozhodnutí.',
    items: ['Analýza výnosnosti', 'Výběr lokality', 'Financování & hypotéky', 'Dlouhodobá strategie'],
  },
]

export default function Services() {
  return (
    <section id="sluzby" style={{ background: '#f4f3f0', padding: '8rem 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
          <span className="eyebrow" style={{ color: '#e94e1b', flexShrink: 0 }}>Moje služby</span>
          <div className="h-rule" style={{ flexGrow: 1 }} />
        </div>

        <h2 className="display-md" style={{ color: '#002b40', marginBottom: '5rem', maxWidth: 600 }}>
          Kompletní péče<br/>
          <span className="orange-word">od A do Z.</span>
        </h2>

        {/* Services list — alternating layout */}
        {services.map((s, i) => (
          <div key={s.n}>
            <div style={{ height: 1, background: 'rgba(0,43,64,0.08)' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr',
              gap: '3rem', padding: '3.5rem 0', alignItems: 'start' }}>

              {/* Number */}
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(0,43,64,0.25)',
                letterSpacing: '0.1em', paddingTop: '0.3rem' }}>
                {s.n}
              </div>

              {/* Title + desc */}
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#002b40',
                  letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(0,43,64,0.5)',
                  fontWeight: 400, maxWidth: 360 }}>
                  {s.desc}
                </p>
                <button onClick={openContactModal}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    color: '#e94e1b', fontWeight: 700, fontSize: '0.75rem',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    background: 'none', border: 'none', padding: 0,
                    cursor: 'pointer', marginTop: '1.75rem',
                    transition: 'gap 0.3s' }}>
                  Zjistit více
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem',
                paddingTop: '0.25rem' }}>
                {s.items.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%',
                      background: '#e94e1b', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#002b40' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div style={{ height: 1, background: 'rgba(0,43,64,0.08)' }} />
      </div>
    </section>
  )
}

'use client'
import Reveal from '@/components/Reveal'

const items = [
  { n:'01', title:'Transparentnost', text:'Jasné podmínky od první schůzky až po podpis smlouvy. Žádné skryté poplatky, žádná překvapení.' },
  { n:'02', title:'Rychlost',        text:'Průměrná doba prodeje mých nemovitostí je 34 dní. Vy nečekáte — já jednám.' },
  { n:'03', title:'Osobní přístup',  text:'Nejednáte s kanceláří ani asistentem. Jsem zde pro vás osobně — telefon, WhatsApp, schůzka.' },
  { n:'04', title:'Znalost trhu',    text:'Pražský trh znám do hloubky. Poradím správnou cenu — ne tu, která vám lichotí, ale tu, která funguje.' },
  { n:'05', title:'Marketing',       text:'Profesionální fotografie, 3D vizualizace, video a cílená reklama tam, kde kupující skutečně jsou.' },
  { n:'06', title:'Výsledky',        text:'98 % klientů by mě doporučilo dál. Nejde o PR — jde o čísla, která mám na papíře.' },
]

export default function WhyMe() {
  return (
    <section id="proc" style={{ background: '#fff', padding: '8rem 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
            <span className="eyebrow" style={{ color: '#e94e1b', flexShrink: 0 }}>Proč se mnou</span>
            <div className="h-rule" style={{ flexGrow: 1 }} />
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={100}>
          <h2 className="display-md" style={{ color: '#002b40', marginBottom: '5rem', maxWidth: 700 }}>
            Šest důvodů,<br/>
            <span className="orange-word">proč vybrat si mě.</span>
          </h2>
        </Reveal>

        {/* Grid — každá karta se nabíhá s offset */}
        <div className="why-grid">
          {items.map((item, i) => {
            const isLastRow = i >= 3
            const isRightCol = (i % 3) === 2
            return (
              <Reveal key={item.n} direction="scale" delay={i * 75} duration={600}>
                <div
                  className="why-item"
                  style={{
                    padding: '2.5rem', position: 'relative', height: '100%',
                    borderRight: isRightCol ? 'none' : '1px solid rgba(0,43,64,0.07)',
                    borderBottom: isLastRow ? 'none' : '1px solid rgba(0,43,64,0.07)',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f4f3f0'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  {/* Big number */}
                  <div style={{
                    fontSize: '4rem', fontWeight: 900, color: 'rgba(0,43,64,0.06)',
                    lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '1.5rem',
                    transition: 'color 0.3s',
                  }}>
                    {item.n}
                  </div>

                  {/* Orange dot */}
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#e94e1b', marginBottom: '1rem' }} />

                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#002b40',
                    marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(0,43,64,0.5)', fontWeight: 400 }}>
                    {item.text}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

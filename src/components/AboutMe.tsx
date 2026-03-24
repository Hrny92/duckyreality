'use client'
import { openContactModal } from '@/lib/openModal'
import Reveal from '@/components/Reveal'
import Counter from '@/components/Counter'

export default function AboutMe() {
  return (
    <section id="o-mne" style={{ background: '#f4f3f0', padding: '8rem 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>

        {/* Eyebrow */}
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
            <span className="eyebrow" style={{ color: '#C9A542', flexShrink: 0 }}>O mně</span>
            <div className="h-rule" style={{ flexGrow: 1 }} />
          </div>
        </Reveal>

        {/* Grid */}
        <div className="about-grid">
          {/* Levý sloupec — foto přijíždí zleva (Reveal je grid cell) */}
          <Reveal
            direction="left"
            delay={0}
            duration={800}
            className="about-photo"
          style={{ borderRadius: '2rem', overflow: 'hidden', position: 'relative', minHeight: 400 }}
          >
            <div style={{ position: 'absolute', inset: 0 }}>
              <img
                src="/Ducky-omne.png"
                alt="Marek Ducký"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center top',
                  display: 'block',
                }}
              />

              {/* Badge vpravo nahoře */}
              <div
                style={{
                  position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 2,
                  background: 'rgba(17,17,17,0.88)', backdropFilter: 'blur(12px)',
                  color: '#fff', borderRadius: '1rem', padding: '0.875rem 1.25rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                }}
              >
                <div style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.15em',
                  textTransform: 'uppercase', opacity: 0.5, marginBottom: '0.5rem' }}>
                  Realitní makléř
                </div>
                <img src="/Bidli-logo-wh.svg" alt="Bidli"
                  style={{ height: 18, width: 'auto', display: 'block', opacity: 0.9 }} />
              </div>

              {/* Badge vlevo dole — counter "12+" */}
              <div
                style={{
                  position: 'absolute', bottom: '1.25rem', left: '1.25rem', zIndex: 2,
                  background: '#C9A542', color: '#fff', borderRadius: '1rem',
                  padding: '0.875rem 1.25rem',
                  boxShadow: '0 8px 24px rgba(201,165,66,0.45)',
                }}
              >
                <div style={{ fontSize: '1.9rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em' }}>
                  <Counter to={12} suffix="+" duration={1200} delay={400} />
                </div>
                <div style={{ fontSize: '0.55rem', fontWeight: 700, opacity: 0.85,
                  letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                  let v oboru
                </div>
              </div>
            </div>
          </Reveal>

          {/* Pravý sloupec — text přijíždí zprava */}
          <Reveal direction="right" delay={150} duration={800}>
            <div style={{ paddingTop: '1rem' }}>
              <h2 className="display-md" style={{ color: '#111111', marginBottom: '2rem' }}>
                Makléř,&nbsp;<br />
                <span className="orange-word">kterému záleží.</span>
              </h2>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(17,17,17,0.6)',
                marginBottom: '1.25rem', fontWeight: 400 }}>
                Nemovitosti jsou má vášeň. Obchoduji s nimi již několik let, a proto
                jsem se rozhodl tento sen uskutečnit a stát se realitním makléřem.
                Mám letitou zkušenost s obchodem a touto cestou chci pomoci lidem
                realizovat jejich sny.
              </p>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(17,17,17,0.6)',
                marginBottom: '3rem', fontWeight: 400 }}>
                V realitách věřím, že úspěch stojí na důvěře a osobním přístupu.
                Klienti oceňují, že jsem jim k dispozici od začátku až do konce
                a že hledám řešení i v těžkých situacích. Proto se ke mně rádi
                vracejí a doporučují mě dál.
              </p>

              {/* Klíčové body — stagger */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '3rem' }}>
                {[
                  'Osobní přístup od první schůzky po předání klíčů',
                  'Zkušenosti s obchodem a vyjednáváním',
                  'Tržní analýza a home staging poradenství zdarma',
                  'Právní servis v ceně spolupráce',
                ].map((item, i) => (
                  <Reveal key={item} direction="up" delay={300 + i * 70} duration={500}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#C9A542',
                        flexShrink: 0, marginTop: '0.55rem' }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#111111', lineHeight: 1.6 }}>
                        {item}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>

              <button
                onClick={openContactModal}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                  background: '#C9A542', color: '#fff', fontWeight: 700, fontSize: '0.75rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '0.9rem 2rem', borderRadius: 999, border: 'none',
                  cursor: 'pointer', transition: 'all 0.25s',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#B8922F'; el.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#C9A542'; el.style.transform = 'translateY(0)' }}
              >
                Domluvit konzultaci
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

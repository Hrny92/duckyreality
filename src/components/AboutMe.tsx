'use client'
import { openContactModal } from '@/lib/openModal'

export default function AboutMe() {
  return (
    <section id="o-mne" style={{ background: '#f4f3f0', padding: '8rem 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>

        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
          <span className="eyebrow" style={{ color: '#e94e1b', flexShrink: 0 }}>O mně</span>
          <div className="h-rule" style={{ flexGrow: 1 }} />
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6rem',
            alignItems: 'stretch',
          }}
        >
          {/* Levý sloupec — foto s badges uvnitř rámečku */}
          <div
            style={{
              borderRadius: '2rem',
              overflow: 'hidden',
              position: 'relative',
              minHeight: 400,
            }}
          >
            {/* ── Fotka ── */}
            <img
              src="/Ducky-omne.png"
              alt="Marek Ducký"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
            />

            {/* ── Badge vpravo nahoře — Bidli ── */}
            <div
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(0,43,64,0.88)',
                backdropFilter: 'blur(12px)',
                color: '#fff',
                borderRadius: '1rem',
                padding: '0.875rem 1.25rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              }}
            >
              <div
                style={{
                  fontSize: '0.55rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  opacity: 0.5,
                  marginBottom: '0.5rem',
                }}
              >
                Realitní makléř
              </div>
              <img
                src="/Bidli-logo-wh.svg"
                alt="Bidli"
                style={{ height: 18, width: 'auto', display: 'block', opacity: 0.9 }}
              />
            </div>

            {/* ── Badge vlevo dole — roky ── */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                background: '#e94e1b',
                color: '#fff',
                borderRadius: '1rem',
                padding: '0.875rem 1.25rem',
                boxShadow: '0 8px 24px rgba(233,78,27,0.45)',
              }}
            >
              <div
                style={{
                  fontSize: '1.9rem',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                }}
              >
                12+
              </div>
              <div
                style={{
                  fontSize: '0.55rem',
                  fontWeight: 700,
                  opacity: 0.85,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginTop: '0.2rem',
                }}
              >
                let v oboru
              </div>
            </div>
          </div>

          {/* Pravý sloupec — text */}
          <div style={{ paddingTop: '1rem' }}>
            <h2
              className="display-md"
              style={{ color: '#002b40', marginBottom: '2rem' }}
            >
              Makléř,&nbsp;<br />
              <span className="orange-word">kterému záleží.</span>
            </h2>

            {/* První odstavec */}
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.8,
                color: 'rgba(0,43,64,0.6)',
                marginBottom: '1.25rem',
                fontWeight: 400,
              }}
            >
              Nemovitosti jsou má vášeň. Obchoduji s nimi již několik let, a proto
              jsem se rozhodl tento sen uskutečnit a stát se realitním makléřem.
              Mám letitou zkušenost s obchodem a touto cestou chci pomoci lidem
              realizovat jejich sny.
            </p>

            {/* Druhý odstavec */}
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.8,
                color: 'rgba(0,43,64,0.6)',
                marginBottom: '3rem',
                fontWeight: 400,
              }}
            >
              V realitách věřím, že úspěch stojí na důvěře a osobním přístupu.
              Klienti oceňují, že jsem jim k dispozici od začátku až do konce
              a že hledám řešení i v těžkých situacích. Proto se ke mně rádi
              vracejí a doporučují mě dál.
            </p>

            {/* Klíčové body */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.875rem',
                marginBottom: '3rem',
              }}
            >
              {[
                'Osobní přístup od první schůzky po předání klíčů',
                'Zkušenosti s obchodem a vyjednáváním',
                'Tržní analýza a home staging poradenství zdarma',
                'Právní servis v ceně spolupráce',
              ].map(item => (
                <div
                  key={item}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}
                >
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: '#e94e1b',
                      flexShrink: 0,
                      marginTop: '0.55rem',
                    }}
                  />
                  <span
                    style={{ fontSize: '0.9rem', fontWeight: 500, color: '#002b40', lineHeight: 1.6 }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={openContactModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: '#e94e1b',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.9rem 2rem',
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#d63e0d'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#e94e1b'
                el.style.transform = 'translateY(0)'
              }}
            >
              Domluvit konzultaci

              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h12M7 1l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

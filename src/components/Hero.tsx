'use client'
import Counter from '@/components/Counter'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        backgroundColor: '#001a29',
      }}
    >
      {/* ── Pozadí – fotka s entrance scale ── */}
      <div
        className="hero-scale-in"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/ducky-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ── Tmavý přechod ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,26,41,0.0) 30%, rgba(0,26,41,0.5) 80%, rgba(0,26,41,0.93) 100%)',
        }}
      />

      {/* ── Obsah ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 2rem 5rem',
          width: '100%',
        }}
      >
        {/* Makléř / firma — delay 150ms */}
        <div
          className="hero-in"
          style={{
            animationDelay: '0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.875rem',
            marginBottom: '1.75rem',
          }}
        >
          <div
            className="pulse"
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#e94e1b', flexShrink: 0 }}
          />
          <span
            className="eyebrow"
            style={{
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.22em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            Realitní makléř&nbsp;·
            <img src="/Bidli-logo-wh.svg" alt="Bidli"
              style={{ height: 24, width: 'auto', opacity: 1, display: 'inline-block' }} />
          </span>
        </div>

        {/* "Marek" — delay 300ms */}
        <h1
          className="hero-in"
          style={{
            animationDelay: '0.3s',
            fontSize: 'clamp(4rem, 11vw, 9.5rem)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: '#fff',
            marginBottom: '0.15em',
          }}
        >
          Marek
        </h1>

        {/* "Ducký." — delay 440ms */}
        <h1
          className="hero-in"
          style={{
            animationDelay: '0.44s',
            fontSize: 'clamp(4rem, 11vw, 9.5rem)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            marginBottom: '2.5rem',
          }}
        >
          <span className="orange-word">Ducký.</span>
        </h1>

        {/* ── Spodní lišta — delay 620ms ── */}
        <div
          className="hero-bottom hero-in"
          style={{ animationDelay: '0.62s' }}
        >
          {/* Perex */}
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.5)',
              maxWidth: 420,
              fontWeight: 400,
            }}
          >
            Nemovitosti jsou má vášeň. Pomáhám lidem realizovat jejich sny
            s osobním přístupem a letitou zkušeností z obchodu.
          </p>

          {/* Tlačítka */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="#nabidka"
              style={{
                background: '#e94e1b', color: '#fff', fontWeight: 700,
                fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '0.9rem 2rem', borderRadius: 999, textDecoration: 'none',
                transition: `all 0.25s ${EASE}`,
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#d63e0d'; el.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#e94e1b'; el.style.transform = 'translateY(0)' }}
            >
              Prohlédnout nabídku
            </a>
            <a
              href="#o-mne"
              style={{
                border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.75)',
                fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '0.9rem 2rem', borderRadius: 999, textDecoration: 'none',
                transition: `all 0.25s ${EASE}`,
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.6)'; el.style.color = '#fff' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.25)'; el.style.color = 'rgba(255,255,255,0.75)' }}
            >
              O mně
            </a>
          </div>

          {/* Statistiky — čísla nabíhají jako counter */}
          <div className="hero-stats">
            {[
              { to: 150, suffix: '+', label: 'obchodů' },
              { to: 12,  suffix: '',  label: 'let praxe' },
              { to: 98,  suffix: '%', label: 'spokojenost' },
            ].map(s => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    fontWeight: 900,
                    color: '#fff',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  <Counter to={s.to} suffix={s.suffix} duration={1600} delay={800} />
                </div>
                <div
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.35)',
                    marginTop: '0.3rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indikátor — delay 1.4s, pak plynulý bob ── */}
      <div
        className="scroll-bob"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'heroIn 0.7s cubic-bezier(0.22,1,0.36,1) both 1.4s, scrollBob 2.2s ease-in-out infinite 2.2s',
          opacity: 0,    /* heroIn přebírá řízení */
        }}
      >
        <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, #fff, transparent)' }} />
        <span className="eyebrow" style={{ color: '#fff', fontSize: '0.55rem', writingMode: 'vertical-rl' }}>
          scroll
        </span>
      </div>
    </section>
  )
}

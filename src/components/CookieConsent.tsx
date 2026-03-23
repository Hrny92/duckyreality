'use client'
import { useState, useEffect } from 'react'

type Prefs = { analytics: boolean; marketing: boolean }

const STORAGE_KEY = 'cookie_consent_v1'

function loadPrefs(): Prefs | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function savePrefs(prefs: Prefs) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)) } catch {}
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [panel, setPanel] = useState<'banner' | 'settings'>('banner')
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    // Show banner if no saved prefs
    if (!loadPrefs()) {
      setTimeout(() => setVisible(true), 1200)
    }
    // Listen for "re-open settings" from Footer
    const open = () => { setPanel('settings'); setVisible(true) }
    window.addEventListener('openCookieSettings', open)
    return () => window.removeEventListener('openCookieSettings', open)
  }, [])

  const acceptAll = () => {
    savePrefs({ analytics: true, marketing: true })
    setVisible(false)
  }

  const rejectAll = () => {
    savePrefs({ analytics: false, marketing: false })
    setVisible(false)
  }

  const saveCustom = () => {
    savePrefs({ analytics, marketing })
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      {/* Backdrop (settings panel only) */}
      {panel === 'settings' && (
        <div
          onClick={() => setVisible(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,27,40,0.55)',
            backdropFilter: 'blur(4px)', zIndex: 9998 }}
        />
      )}

      {/* Banner / Settings panel */}
      <div style={{
        position: 'fixed',
        ...(panel === 'banner'
          ? { bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
              width: 'min(680px, calc(100vw - 3rem))' }
          : { bottom: '50%', left: '50%',
              transform: 'translate(-50%, 50%)',
              width: 'min(520px, calc(100vw - 3rem))' }),
        zIndex: 9999,
        background: '#002b40',
        borderRadius: '1.25rem',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
        padding: '1.75rem 2rem',
        animation: 'slideUp 0.35s cubic-bezier(.16,1,.3,1) both',
      }}>

        {panel === 'banner' ? (
          /* ── BANNER ────────────────────────────────── */
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start',
              justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff',
                  letterSpacing: '-0.01em', marginBottom: '0.4rem' }}>
                  Tento web používá cookies 🍪
                </p>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.65, maxWidth: 440 }}>
                  Používáme technické cookies (nutné pro provoz webu) a volitelné analytické
                  & marketingové cookies pro lepší zážitek. Více v&nbsp;
                  <a href="/gdpr" style={{ color: '#e94e1b', textDecoration: 'none', fontWeight: 600 }}>
                    zásadách ochrany osobních údajů
                  </a>.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
              alignItems: 'center' }}>
              {/* Accept all */}
              <button onClick={acceptAll}
                style={{ background: '#e94e1b', color: '#fff', border: 'none',
                  borderRadius: 999, padding: '0.65rem 1.5rem',
                  fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em',
                  textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background='#d63e0d'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background='#e94e1b'}>
                Přijmout vše
              </button>

              {/* Reject all */}
              <button onClick={rejectAll}
                style={{ background: 'transparent', color: 'rgba(255,255,255,0.45)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 999, padding: '0.65rem 1.5rem',
                  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'all 0.2s' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.3)'
                  el.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.12)'
                  el.style.color = 'rgba(255,255,255,0.45)'
                }}>
                Odmítnout vše
              </button>

              {/* Settings */}
              <button onClick={() => setPanel('settings')}
                style={{ background: 'none', border: 'none', padding: 0,
                  fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                  cursor: 'pointer', marginLeft: 'auto', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.7)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.3)'}>
                Nastavit →
              </button>
            </div>
          </div>
        ) : (
          /* ── SETTINGS PANEL ────────────────────────── */
          <div>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff',
                letterSpacing: '-0.01em' }}>
                Nastavení cookies
              </p>
              <button onClick={() => setVisible(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.3)', padding: '0.25rem',
                  transition: 'color 0.2s', lineHeight: 1 }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color='#fff'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.3)'}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Cookie rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem',
              marginBottom: '1.75rem' }}>
              {/* Technical — always on */}
              <CookieRow
                title="Technické cookies"
                desc="Nezbytné pro fungování webu. Nelze vypnout."
                checked={true}
                disabled={true}
                onChange={() => {}}
              />
              <CookieRow
                title="Analytické cookies"
                desc="Pomáhají nám pochopit, jak návštěvníci web používají (Google Analytics apod.)."
                checked={analytics}
                disabled={false}
                onChange={setAnalytics}
              />
              <CookieRow
                title="Marketingové cookies"
                desc="Slouží k personalizaci reklamy a měření kampaní."
                checked={marketing}
                disabled={false}
                onChange={setMarketing}
              />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={saveCustom}
                style={{ background: '#e94e1b', color: '#fff', border: 'none',
                  borderRadius: 999, padding: '0.65rem 1.5rem',
                  fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em',
                  textTransform: 'uppercase', cursor: 'pointer', flex: 1,
                  transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background='#d63e0d'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background='#e94e1b'}>
                Uložit nastavení
              </button>
              <button onClick={acceptAll}
                style={{ background: 'transparent', color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 999, padding: '0.65rem 1.5rem',
                  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'all 0.2s' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.3)'
                  el.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.12)'
                  el.style.color = 'rgba(255,255,255,0.5)'
                }}>
                Přijmout vše
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

// ── Helper sub-component ────────────────────────────────────────────────
function CookieRow({
  title, desc, checked, disabled, onChange,
}: {
  title: string; desc: string; checked: boolean;
  disabled: boolean; onChange: (v: boolean) => void
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      gap: '1rem', padding: '1rem 1.25rem', borderRadius: '0.75rem',
      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff',
          marginBottom: '0.2rem' }}>{title}</p>
        <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>{desc}</p>
      </div>
      {/* Toggle */}
      <button
        onClick={() => !disabled && onChange(!checked)}
        aria-pressed={checked}
        style={{
          flexShrink: 0, width: 40, height: 22, borderRadius: 999, border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          background: checked ? '#e94e1b' : 'rgba(255,255,255,0.1)',
          position: 'relative', transition: 'background 0.25s',
          opacity: disabled ? 0.5 : 1,
        }}>
        <span style={{
          position: 'absolute', top: 3, left: checked ? 21 : 3,
          width: 16, height: 16, borderRadius: '50%',
          background: '#fff', transition: 'left 0.25s',
        }} />
      </button>
    </div>
  )
}

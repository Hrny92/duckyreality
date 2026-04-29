'use client'
import { useState, useEffect, useRef } from 'react'

type Field = { name: string; email: string; phone: string; message: string }
const empty: Field = { name: '', email: '', phone: '', message: '' }

export default function ContactModal() {
  const [open, setOpen]       = useState(false)
  const [fields, setFields]   = useState<Field>(empty)
  const [sent, setSent]       = useState(false)
  const [sending, setSending] = useState(false)
  const overlayRef            = useRef<HTMLDivElement>(null)
  const firstRef              = useRef<HTMLInputElement>(null)

  // Poslouchá globální event z jakéhokoliv tlačítka
  useEffect(() => {
    const open = () => setOpen(true)
    window.addEventListener('openContactModal', open)
    return () => window.removeEventListener('openContactModal', open)
  }, [])

  // Focus při otevření + blokování scrollu
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => firstRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Escape = zavřít
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  const close = () => { setOpen(false); setSent(false); setFields(empty) }

  const set = (k: keyof Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error('Chyba při odesílání')
      setSent(true)
    } catch {
      alert('Nepodařilo se odeslat zprávu. Zkuste to prosím znovu nebo volejte přímo.')
    } finally {
      setSending(false)
    }
  }

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) close() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes spin    { to { transform: rotate(360deg) } }
        .modal-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.75rem;
          padding: 0.875rem 1rem;
          font-size: 0.9rem;
          color: #fff;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          font-family: inherit;
          box-sizing: border-box;
        }
        .modal-input:focus {
          border-color: #D4AF37;
          box-shadow: 0 0 0 3px rgba(212,175,55,0.12);
          background: rgba(255,255,255,0.07);
        }
        .modal-input::placeholder { color: rgba(255,255,255,0.25); }
        textarea.modal-input { resize: vertical; min-height: 110px; }
      `}</style>

      {/* Dialog */}
      <div style={{
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1.75rem',
        width: '100%',
        maxWidth: 560,
        padding: '2.75rem',
        position: 'relative',
        boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
        animation: 'slideUp 0.28s ease',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>

        {/* Gold accent line at top */}
        <div style={{
          position: 'absolute', top: 0, left: '2.75rem', right: '2.75rem',
          height: 2, background: 'linear-gradient(90deg, transparent, #D4AF37 40%, #E8CC6A 60%, transparent)',
          borderRadius: '0 0 2px 2px',
        }} />

        {/* Zavřít */}
        <button
          onClick={close}
          style={{
            position: 'absolute', top: '1.5rem', right: '1.5rem',
            width: 36, height: 36, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.05)',
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: 'rgba(255,255,255,0.4)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.background = 'rgba(212,175,55,0.15)'
            el.style.borderColor = 'rgba(212,175,55,0.4)'
            el.style.color = '#D4AF37'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.background = 'rgba(255,255,255,0.05)'
            el.style.borderColor = 'rgba(255,255,255,0.12)'
            el.style.color = 'rgba(255,255,255,0.4)'
          }}
          aria-label="Zavřít"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        {sent ? (
          /* ── Potvrzení odeslání ── */
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{
              width: 68, height: 68, borderRadius: '50%',
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M5 14l6 6L23 8" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '1.4rem', fontWeight: 900, color: '#fff',
              letterSpacing: '-0.02em', marginBottom: '0.75rem',
            }}>
              Zpráva odeslána!
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Děkuji za váš zájem. Ozvu se vám co nejdříve, obvykle do 24 hodin.
            </p>
            <button onClick={close} style={{
              background: '#D4AF37', color: '#0A0A0A', fontWeight: 800,
              fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '0.875rem 2rem', borderRadius: 999, border: 'none', cursor: 'pointer',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#E8CC6A')}
              onMouseLeave={e => (e.currentTarget.style.background = '#D4AF37')}
            >
              Zavřít
            </button>
          </div>
        ) : (
          /* ── Formulář ── */
          <>
            {/* Hlavička */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#D4AF37' }} />
                <span style={{
                  fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: '#D4AF37',
                }}>
                  Bezplatná konzultace
                </span>
              </div>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 900,
                color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1,
              }}>
                Napište mi.
              </h2>
              <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                Ozveme se vám do 24 hodin. Bez závazků.
              </p>
            </div>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Jméno + telefon */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{
                    fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem',
                  }}>
                    Jméno *
                  </label>
                  <input ref={firstRef} required className="modal-input" type="text"
                    placeholder="Jan Novák" value={fields.name} onChange={set('name')} />
                </div>
                <div>
                  <label style={{
                    fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem',
                  }}>
                    Telefon
                  </label>
                  <input className="modal-input" type="tel"
                    placeholder="+420 777 000 000" value={fields.phone} onChange={set('phone')} />
                </div>
              </div>

              {/* E-mail */}
              <div>
                <label style={{
                  fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem',
                }}>
                  E-mail *
                </label>
                <input required className="modal-input" type="email"
                  placeholder="jan@email.cz" value={fields.email} onChange={set('email')} />
              </div>

              {/* Zpráva */}
              <div>
                <label style={{
                  fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem',
                }}>
                  Zpráva *
                </label>
                <textarea required className="modal-input" rows={4}
                  placeholder="Čím vám mohu pomoci?" value={fields.message}
                  onChange={set('message')} />
              </div>

              {/* Odeslat */}
              <button
                type="submit"
                disabled={sending}
                style={{
                  background: sending ? 'rgba(212,175,55,0.5)' : '#D4AF37',
                  color: '#0A0A0A', fontWeight: 800, fontSize: '0.8rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '1rem 2rem', borderRadius: 999, border: 'none',
                  cursor: sending ? 'not-allowed' : 'pointer', marginTop: '0.5rem',
                  transition: 'all 0.2s', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '0.75rem',
                }}
                onMouseEnter={e => { if (!sending) (e.currentTarget as HTMLElement).style.background = '#E8CC6A' }}
                onMouseLeave={e => { if (!sending) (e.currentTarget as HTMLElement).style.background = '#D4AF37' }}
              >
                {sending ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                      style={{ animation: 'spin 0.8s linear infinite' }}>
                      <circle cx="8" cy="8" r="6" stroke="rgba(0,0,0,0.3)" strokeWidth="2"/>
                      <path d="M8 2a6 6 0 016 6" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Odesílám…
                  </>
                ) : (
                  <>
                    Odeslat zprávu
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

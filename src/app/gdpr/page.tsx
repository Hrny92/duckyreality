import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ochrana osobních údajů | Marek Ducký',
  description: 'Zásady ochrany osobních údajů ve smyslu GDPR — Marek Ducký, realitní makléř Litoměřicko & Praha.',
}

export default function GdprPage() {
  return (
    <>
      {/* Navbar placeholder — just a back link on this standalone page */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: '#fff', borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '1.25rem 2rem', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem',
          textDecoration: 'none', color: '#111111', fontSize: '0.75rem',
          fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 1L3 7l6 6" stroke="currentColor" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Zpět na web
        </Link>
        <img src="/logo.svg" alt="Ducky Realit"
          style={{ height: 20, width: 'auto',
            filter: 'brightness(0) saturate(100%) invert(12%) sepia(78%) saturate(700%) hue-rotate(174deg)' }} />
      </nav>

      <main style={{ paddingTop: '6rem', paddingBottom: '8rem',
        background: '#f4f3f0', minHeight: '100vh' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 2rem' }}>

          {/* Header */}
          <div style={{ marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#D4AF37' }}>
              GDPR
            </span>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900,
              letterSpacing: '-0.03em', lineHeight: 1.05, color: '#111111',
              marginTop: '0.75rem' }}>
              Ochrana osobních&nbsp;údajů
            </h1>
            <p style={{ marginTop: '1.25rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.75 }}>
              Informace o zpracování osobních údajů dle nařízení Evropského parlamentu a Rady (EU) 2016/679 (GDPR).
            </p>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(17,17,17,0.1)', marginBottom: '3rem' }} />

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem',
            fontSize: '0.9rem', lineHeight: 1.85, color: 'rgba(17,17,17,0.7)' }}>

            <section>
              <h2 style={h2}>1. Správce osobních údajů</h2>
              <p>
                Správcem osobních údajů je fyzická osoba podnikající:
              </p>
              <div style={{ margin: '1rem 0', padding: '1.25rem 1.5rem',
                background: '#fff', borderRadius: '0.75rem',
                border: '1px solid rgba(255,255,255,0.08)' }}>
                <strong style={{ color: '#111111', display: 'block', marginBottom: '0.5rem' }}>
                  Marek Ducký
                </strong>
                Sídlo podnikání: Býčkovice 31, 412 01, Česká republika<br/>
                IČ: 07637276<br/>
                E-mail: <a href="mailto:marek.ducky@bidli.cz" style={link}>marek.ducky@bidli.cz</a><br/>
                Telefon: <a href="tel:+420728111836" style={link}>+420 728 111 836</a>
              </div>
            </section>

            <section>
              <h2 style={h2}>2. Účely a právní základ zpracování</h2>
              <p>Vaše osobní údaje zpracovávám na základě:</p>
              <ul style={ul}>
                <li><strong style={strong}>Plnění smlouvy</strong> (čl. 6 odst. 1 písm. b GDPR) — při sjednávání a realizaci zprostředkovatelské smlouvy.</li>
                <li><strong style={strong}>Oprávněného zájmu</strong> (čl. 6 odst. 1 písm. f GDPR) — pro ochranu práv a právních nároků.</li>
                <li><strong style={strong}>Souhlasu</strong> (čl. 6 odst. 1 písm. a GDPR) — pro zasílání marketingových sdělení (souhlas lze kdykoli odvolat).</li>
                <li><strong style={strong}>Zákonné povinnosti</strong> (čl. 6 odst. 1 písm. c GDPR) — daňová, účetní a archivační povinnost.</li>
              </ul>
            </section>

            <section>
              <h2 style={h2}>3. Rozsah zpracovávaných údajů</h2>
              <p>
                Zpracovávám zejména: jméno a příjmení, kontaktní e-mail, telefonní číslo, adresu, případně informace o nemovitosti, jíž se poptávka týká. Citlivé údaje ve smyslu čl. 9 GDPR nezpracovávám.
              </p>
            </section>

            <section>
              <h2 style={h2}>4. Doba uchovávání</h2>
              <p>
                Osobní údaje uchovávám po dobu nezbytně nutnou pro naplnění účelu zpracování, nejdéle však:
              </p>
              <ul style={ul}>
                <li>Po dobu trvání smluvního vztahu a 3 roky po jeho ukončení (oprávněný zájem / nároky).</li>
                <li>Po dobu 10 let, vyžaduje-li to zákon (daňové a účetní doklady).</li>
                <li>Do odvolání souhlasu v případě marketingové komunikace.</li>
              </ul>
            </section>

            <section>
              <h2 style={h2}>5. Příjemci osobních údajů</h2>
              <p>
                Osobní údaje mohu sdílet s realitní kanceláří <strong style={strong}>Bidli</strong>, právními zástupci, účetními poradci, poskytovateli IT služeb a orgány veřejné správy (jsou-li povinni ze zákona). Údaje nepředávám mimo EHP.
              </p>
            </section>

            <section>
              <h2 style={h2}>6. Vaše práva</h2>
              <p>Máte právo:</p>
              <ul style={ul}>
                <li><strong style={strong}>Na přístup</strong> k osobním údajům, které o vás zpracovávám.</li>
                <li><strong style={strong}>Na opravu</strong> nepřesných nebo neúplných údajů.</li>
                <li><strong style={strong}>Na výmaz</strong> („právo být zapomenut"), pokud odpadl účel zpracování.</li>
                <li><strong style={strong}>Na omezení</strong> zpracování za podmínek čl. 18 GDPR.</li>
                <li><strong style={strong}>Na přenositelnost</strong> údajů ve strojově čitelném formátu.</li>
                <li><strong style={strong}>Vznést námitku</strong> proti zpracování na základě oprávněného zájmu.</li>
                <li><strong style={strong}>Odvolat souhlas</strong> kdykoli, aniž by tím byla dotčena zákonnost zpracování před odvoláním.</li>
              </ul>
              <p style={{ marginTop: '0.75rem' }}>
                Svá práva uplatněte písemně na adrese sídla nebo e-mailem: <a href="mailto:marek.ducky@bidli.cz" style={link}>marek.ducky@bidli.cz</a>.
                Máte rovněž právo podat stížnost u dozorového orgánu —&nbsp;
                <a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer" style={link}>
                  Úřadu pro ochranu osobních údajů
                </a>.
              </p>
            </section>

            <section>
              <h2 style={h2}>7. Cookies</h2>
              <p>
                Webová stránka používá soubory cookies. Technické cookies jsou nezbytné pro fungování webu a nevyžadují souhlas. Analytické a marketingové cookies nasazujeme pouze s vaším souhlasem, který lze kdykoli změnit prostřednictvím odkazu <em>Nastavení cookies</em> v patičce webu.
              </p>
            </section>

            <section>
              <h2 style={h2}>8. Zabezpečení</h2>
              <p>
                Přijal jsem odpovídající technická a organizační opatření k ochraně osobních údajů před neoprávněným přístupem, ztrátou nebo zneužitím (šifrování přenosu HTTPS, omezený přístup k datům, pravidelná záloha).
              </p>
            </section>

            <section>
              <h2 style={h2}>9. Změny tohoto dokumentu</h2>
              <p>
                Tento dokument mohu průběžně aktualizovat. Aktuální verze je vždy dostupná na této stránce. Datum poslední aktualizace: <strong style={strong}>1. 1. 2025</strong>.
              </p>
            </section>

          </div>

          {/* Back link */}
          <div style={{ marginTop: '4rem', paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Link href="/"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                color: '#D4AF37', fontWeight: 700, fontSize: '0.8rem',
                letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 1L3 7l6 6" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Zpět na hlavní stránku
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

// Reusable inline styles
const h2: React.CSSProperties = {
  fontSize: '1.05rem', fontWeight: 800, color: '#111111',
  letterSpacing: '-0.01em', marginBottom: '0.75rem',
}
const ul: React.CSSProperties = {
  paddingLeft: '1.25rem', marginTop: '0.5rem',
  display: 'flex', flexDirection: 'column', gap: '0.4rem',
}
const strong: React.CSSProperties = { color: '#111111', fontWeight: 700 }
const link: React.CSSProperties = {
  color: '#D4AF37', textDecoration: 'none', fontWeight: 600,
}

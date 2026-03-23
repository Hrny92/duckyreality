'use client'
import { useState, useRef } from 'react'

const reviews = [
  { name: 'Michaela Smetanová', date: '21. 01. 2026', text: 'S panem Markem Duckým z Bidli mám naprosto skvělou zkušenost a s čistým svědomím ho vřele doporučuji všem, kdo chtějí prodat nebo koupit nemovitost bez stresu. Postaral se o všechno — právní servis, focení, videozáznamy, reklamu, konzultace s právníky, podpisy i advokátní úschovu. Kupce na byt se mu podařilo sehnat už během 12 hodin od zveřejnění nabídky!' },
  { name: 'Martin Mrkvička', date: '16. 01. 2026', text: 'Od začátku až do konce byl naprosto profesionální, spolehlivý, ale zároveň velmi přátelský a lidský. Vždy byl ochotný poradit, vše srozumitelně vysvětlit a postaral se o to, aby celý prodej proběhl hladce a bez zbytečného stresu. Bylo vidět, že svou práci dělá s opravdovým nasazením a zájmem o klienta.' },
  { name: 'Šárka Petriková', date: '08. 12. 2025', text: 'Vřele doporučuji Marka. Je to nejlepší makléř. Se vším poradí, vyřídí, strašně ochotný. Jsem ráda, že ho mám a pomohl mi prodat zahradu. Maximální spokojenost.' },
  { name: 'Jan Vaďura', date: '22. 10. 2025', text: 'Všem doporučuji pana Duckého, o vše bylo perfektně postaráno, neměl jsem s ním žádný problém. Celá spolupráce probíhala naprosto perfektně.' },
  { name: 'Lenka Pekárková', date: '20. 10. 2025', text: 'Profesionální a nadstandardní přístup pana Duckého ke klientovi. Doporučuji.' },
  { name: 'Lucie Štýbrová', date: '17. 10. 2025', text: 'Chtěla bych velmi pochválit realitního makléře pana Marka Duckého. Pomohl nám prodat náš rodinný dům, se vším pomohl, vysvětlil a udělal vše proto, abychom byly všichni spokojeni. Za mě velmi schopný, milý a šikovný člověk, který své práci rozumí.' },
  { name: 'Jan Bezměnov', date: '15. 10. 2025', text: 'Velmi dobrá zkušenost, pan Marek Ducký je snaživý a ochotný. Mohu jen doporučit.' },
  { name: 'Jaroslava Šefrová', date: '09. 10. 2025', text: 'Chtěla bych poděkovat panu Duckému za skvělou a profesionálně odvedenou práci. Zprostředkoval nám prodej domu, vše zařídil a na nás bylo jen podepsat smlouvy. Pokud někdo potřebuje koupit či prodat nemovitost, můžeme jen doporučit.' },
  { name: 'Michal Dostál', date: '08. 10. 2025', text: 'Mohu jen doporučit pana Duckého. Řešil jsem s ním koupi domu a byl maximálně ochotný, zařídil vše, co se koupě týkalo. Velmi seriózní, příjemné a vstřícné chování. Je znát, že ví, co dělá.' },
  { name: 'Michaela Žáčková', date: '03. 10. 2025', text: 'Děkuji panu Duckému za kvalitní pomoc při koupi bytu. Měl profesionální a vstřícný přístup. Doporučuji ho i dalším klientům. Budete určitě spokojeni.' },
  { name: 'Helena Kotová', date: '04. 09. 2025', text: 'S realitní kanceláří Bidli mám výbornou zkušenost. Pan Marek Ducký vyšel vstříc ve všem, spolupráce a komunikace bez problémů. Naše nemovitost byla hůře prodejná, ale přesto se našel kupec a výsledná cena byla ku spokojenosti všech.' },
  { name: 'Martin Šebesta', date: '02. 09. 2025', text: 'Řešili jsme s panem Duckým koupi naší nové nemovitosti. I přes mnohé komplikace způsobené bývalým majitelem se nám podařilo zdárně koupi uskutečnit. Pan Ducký řešil prakticky 99 % věcí za majitele, aby obchod proběhl zcela v pořádku a v co nejkratším možném termínu.' },
  { name: 'Zděňka Kaněrová', date: '01. 09. 2025', text: 'Kupovala jsem byt a pan Ducký zprostředkovával tento obchod. I přes značné komplikace, které ovšem nebyly jeho vinou, se povedlo vše zdárně dokončit. Komunikace byla v pořádku, takže mohu doporučit.' },
  { name: 'Věra Hamplová', date: '30. 08. 2025', text: 'Maximální spokojenost se službami při prodeji zahrady. Makléř Marek Ducký má profesionální přístup, který obohatil příjemným vystupováním, ochotou vždy poradit a pomoci. Je radost s takovými lidmi spolupracovat. Jeho služby mohu opravdu upřímně doporučit.' },
  { name: 'Veronika Akchiche Dohnalová', date: '30. 10. 2024', text: 'Prodej bytu mi zprostředkoval pan Ducký. Byl maximálně ochotný a zařídil vše, co se prodeje týkalo. Z mé strany nebylo potřeba v podstatě nic, než jen umožnit prohlídku a podepsat smlouvu — o vše ostatní se postaral on. Velmi seriózní chování a jde vidět, že ví, co dělá.' },
  { name: 'Jana Hášová', date: '22. 08. 2024', text: 'Věděli jsme, že to bude oříšek, ale pan Ducký to opravdu zvládl na jedničku. Ohromil nás jeho profesionalitou a klidným duchem. Jeho přístup byl osobní a proaktivní. Má neuvěřitelný přehled o trhu a dokázal skvěle poradit. Pana Duckého vřele doporučujeme každému, kdo hledá efektivního a spolehlivého realitního makléře.' },
  { name: 'Zdeňka Hrubá', date: '22. 08. 2024', text: 'Při prodeji bytu v Praze a koupi v Litoměřicích jsme byli velmi spokojeni. Vždycky byl ochotný nám ve všem pomáhat a poradit. Můžeme jenom doporučit, vše probíhalo na výbornou.' },
  { name: 'Michal Grabař', date: '21. 08. 2024', text: 'Velice děkuji za spolupráci panu Duckému. Mohu vřele doporučit zejména pro skvělé komunikační a vyjednávací schopnosti. Je schopen nalézt řešení i v situacích, které se jeví jako neřešitelné.' },
  { name: 'Eva Kosíková', date: '21. 08. 2024', text: 'Doporučuji pana Duckého. Pomohl nám s manželem na 100 %. Vše zařídil a ještě psychicky podržel, což nemusel. Moc děkujeme.' },
  { name: 'Lukáš Pištěk', date: '13. 09. 2023', text: 'S Bidli reality jsem byl naprosto spokojený. Pan Marek Ducký se postaral o kompletní servis s administrativou — od koupě až po předání, včetně přepisu energií a řešení s katastrálním úřadem. Díky makléři jsme se nestarali absolutně o nic. Hlavně lidskost a nečekaně navázané přátelství s makléřem osobně.' },
  { name: 'Irena Hafijčuková', date: '25. 05. 2023', text: 'Oslovila jsem pana Marka Duckého a setkala jsem se s ochotou, vstřícností, lidským a velmi profesionálním přístupem. Vše proběhlo v pořádku a včas ke spokojenosti všech stran. Tímto bych ráda poděkovala za spolupráci.' },
  { name: 'Lucie Kalová', date: '23. 01. 2023', text: 'Chtěla bych touto cestou poděkovat panu Duckému za pomoc s prodejem bytu. Spolupráce s ním byla na 100 %, vždy jsem byla informována o každém kroku. Pana Duckého jako realitního makléře doporučuji, stejně jako vaši firmu.' },
  { name: 'Martina Kindl', date: '03. 10. 2022', text: 'V Bidli kromě toho, že nabídka byla nejvyšší, se starají o každého zákazníka jako o nejlepšího kamaráda. Nic je neobtěžuje, co neví zjistí a pomohou komplexně řešit celou situaci pomalu ve dne v noci. Je pro mě potěšením vědět, že provize šla do dobrých rukou.' },
  { name: 'Helena Beránková', date: '03. 08. 2022', text: 'Pan Ducký naplnil slova v logu společnosti „bidli se vším všudy". Opravdu spolupráce se vším všudy ve všem. Ochota, vstřícnost, spolupráce skvělá. Byla jsem maximálně spokojená. BIDLI doporučuji všem.' },
  { name: 'Petr Weikert', date: '03. 08. 2022', text: 'Oceňuji vstřícné a profesionální jednání, žádné zbytečné prodlevy a dodržení daného slova.' },
]

function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  const go = (dir: number) => {
    const next = Math.max(0, Math.min(reviews.length - 1, active + dir))
    setActive(next)
    // Scroll the list item into view
    const el = listRef.current?.children[next] as HTMLElement
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }

  const r = reviews[active]

  return (
    <section id="reference" style={{ background: '#fff', padding: '8rem 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
          <span className="eyebrow" style={{ color: '#e94e1b', flexShrink: 0 }}>Reference</span>
          <div className="h-rule" style={{ flexGrow: 1 }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(0,43,64,0.35)',
            flexShrink: 0, letterSpacing: '0.05em' }}>
            {reviews.length} hodnocení
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'stretch' }}>

          {/* ── Levý panel — aktivní citace ── */}
          <div style={{ position: 'sticky', top: '7rem', alignSelf: 'start' }}>
            {/* Uvozovka */}
            <div style={{ fontSize: '7rem', fontWeight: 900, color: '#e94e1b',
              lineHeight: 0.8, marginBottom: '1.5rem', fontFamily: 'Georgia, serif',
              userSelect: 'none' }}>"</div>

            {/* Text */}
            <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', lineHeight: 1.7,
              fontWeight: 500, color: '#002b40', letterSpacing: '-0.01em',
              marginBottom: '2rem', minHeight: 180 }}>
              {r.text}
            </p>

            {/* Autor */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%',
                background: '#002b40', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700,
                color: '#fff', flexShrink: 0 }}>
                {initials(r.name)}
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#002b40' }}>{r.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(0,43,64,0.4)',
                  fontWeight: 500, marginTop: '0.1rem' }}>{r.date}</div>
              </div>
              {/* Hvězdy */}
              <div style={{ display: 'flex', gap: 3, marginLeft: 'auto' }}>
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="14" height="14" viewBox="0 0 14 14" fill="#e94e1b">
                    <path d="M7 1.5l1.5 3.5 3.8.5-2.8 2.6.7 3.8L7 10.1l-3.2 1.8.7-3.8-2.8-2.6 3.8-.5L7 1.5z"/>
                  </svg>
                ))}
              </div>
            </div>

            {/* Šipky */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button onClick={() => go(-1)} disabled={active === 0}
                style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(0,43,64,0.15)',
                  background: 'none', cursor: active === 0 ? 'default' : 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                  opacity: active === 0 ? 0.25 : 1, color: '#002b40' }}
                onMouseEnter={e => { if (active > 0) { (e.currentTarget as HTMLElement).style.background='#002b40'; (e.currentTarget as HTMLElement).style.color='#fff' }}}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='none'; (e.currentTarget as HTMLElement).style.color='#002b40' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 1L3 7l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button onClick={() => go(1)} disabled={active === reviews.length - 1}
                style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(0,43,64,0.15)',
                  background: 'none', cursor: active === reviews.length - 1 ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                  opacity: active === reviews.length - 1 ? 0.25 : 1, color: '#002b40' }}
                onMouseEnter={e => { if (active < reviews.length - 1) { (e.currentTarget as HTMLElement).style.background='#002b40'; (e.currentTarget as HTMLElement).style.color='#fff' }}}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='none'; (e.currentTarget as HTMLElement).style.color='#002b40' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 1l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(0,43,64,0.3)',
                marginLeft: '0.5rem', letterSpacing: '0.05em' }}>
                {active + 1} / {reviews.length}
              </span>
            </div>
          </div>

          {/* ── Pravý panel — scrollovatelný seznam ── */}
          <div style={{ position: 'relative' }}>
          <div
            ref={listRef}
            style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingRight: '0.5rem',
              scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,43,64,0.2) transparent' }}>
            {reviews.map((rev, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  gap: '1rem', width: '100%', padding: '1.1rem 0',
                  borderBottom: '1px solid rgba(0,43,64,0.06)',
                  transition: 'background 0.15s', boxSizing: 'border-box' }}>

                {/* Aktivní indikátor */}
                <div style={{ width: 3, height: 32, borderRadius: 2, flexShrink: 0,
                  background: i === active ? '#e94e1b' : 'transparent',
                  transition: 'background 0.25s' }} />

                {/* Iniciály */}
                <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  background: i === active ? '#002b40' : 'rgba(0,43,64,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.65rem', fontWeight: 700, transition: 'all 0.25s',
                  color: i === active ? '#fff' : 'rgba(0,43,64,0.4)' }}>
                  {initials(rev.name)}
                </div>

                {/* Jméno + datum */}
                <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap',
                    overflow: 'hidden', textOverflow: 'ellipsis',
                    color: i === active ? '#002b40' : 'rgba(0,43,64,0.45)',
                    transition: 'color 0.25s' }}>
                    {rev.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 500, marginTop: '0.1rem',
                    color: i === active ? 'rgba(0,43,64,0.45)' : 'rgba(0,43,64,0.25)',
                    transition: 'color 0.25s' }}>
                    {rev.date}
                  </div>
                </div>

                {/* Hvězdy */}
                <div style={{ display: 'flex', gap: 2, flexShrink: 0,
                  opacity: i === active ? 1 : 0.3, transition: 'opacity 0.25s' }}>
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="10" height="10" viewBox="0 0 14 14" fill="#e94e1b">
                      <path d="M7 1.5l1.5 3.5 3.8.5-2.8 2.6.7 3.8L7 10.1l-3.2 1.8.7-3.8-2.8-2.6 3.8-.5L7 1.5z"/>
                    </svg>
                  ))}
                </div>
              </button>
            ))}
          </div>
          </div>
        </div>

        {/* ── Spodní stats ── */}
        <div style={{ display: 'flex', gap: '3rem', paddingTop: '4rem',
          marginTop: '4rem', borderTop: '1px solid rgba(0,43,64,0.07)' }}>
          {[['98%','spokojenost klientů'], ['150+','úspěšných obchodů'], ['25','ověřených recenzí']].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#002b40',
                letterSpacing: '-0.03em', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'rgba(0,43,64,0.35)',
                textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.3rem' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

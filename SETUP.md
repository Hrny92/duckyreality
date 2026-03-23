# Ducky Realit — Setup

## 1. Instalace závislostí

```bash
cd ducky-realit
npm install
```

## 2. Spuštění vývojového serveru

```bash
npm run dev
```
Otevřete http://localhost:3000

## 3. Napojení Sanity CMS

### a) Vytvoření Sanity projektu (ve složce projektu)
```bash
npm create sanity@latest
```
Zadejte název projektu `ducky-realit`, dataset `production`.

### b) Konfigurace environment proměnných
Zkopírujte `.env.local.example` → `.env.local` a doplňte:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=váš-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### c) Sanity Studio
Po nastavení běží studio na http://localhost:3333 (příkaz `npx sanity dev`).

## 4. Přizpůsobení

- **Fotka makléře** → přidejte `foto.jpg` do `/public/` a v `src/components/AboutMe.tsx` nahraďte placeholder za `<img src="/foto.jpg" ... />`
- **Kontaktní info** → `src/components/CTA.tsx` a `src/components/Footer.tsx`
- **Statistiky** → `src/components/Hero.tsx` a `src/components/AboutMe.tsx`

## Struktura projektu

```
src/
  app/
    layout.tsx        # Root layout, metadata
    page.tsx          # Hlavní stránka (složena z komponent)
    globals.css       # Barvy, animace, utility třídy
  components/
    Navbar.tsx        # Navigace — sticky, responsive, hamburger menu
    Hero.tsx          # Hero sekce — animace, stats, property cards
    AboutMe.tsx       # O mně — foto frame, plovoucí bubliny
    Offer.tsx         # Nabídka nemovitostí (placeholder → Sanity)
    WhyMe.tsx         # Proč se mnou — 6 důvodů s hover efekty
    Services.tsx      # Moje služby — 4 karty
    Testimonials.tsx  # Reference — interaktivní karty
    CTA.tsx           # Kontaktní sekce — glowing efekty
    Footer.tsx        # Patička
  lib/
    sanity.ts         # Sanity client + GROQ queries
sanity/
  schemaTypes.ts      # Sanity schema (Property, Testimonial)
  config.ts           # Sanity konfigurace
```

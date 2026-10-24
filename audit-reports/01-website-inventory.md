# 01 — Website Architecture & Complete URL Inventory

**Project:** D-VIEW Solutions (`https://www.dviewsolutions.com/`)  
**Repository:** `https://github.com/wavenoxx/D-view.git`  
**Audit Date:** 2026-10-17  
**Audited Branch:** `main` (Commit `c9d7f19f7b9cb103f477b0d4236a29b44d87ea1d`)  
**Comparison Branch (PR #1):** `origin/audit/ads-trust-privacy-loader-20261017` (Commit `469cb5b9d4d6a25140bf6f0be006947e9abf2abc`)

---

## 1. Git State & Pull Request #1 Forensic Comparison

### 1.1 Current Repository State
- **Active Branch:** `main`
- **Latest Commit on `main`:** `c9d7f19f7b9cb103f477b0d4236a29b44d87ea1d` (`"updated data"`, authored `2026-10-15 12:09:08 +0530`)
- **Working Tree Status:** Clean (no tracked files modified; uncommitted state preserved)
- **Live Production Verification (`https://www.dviewsolutions.com/`):** Hosted on **Vercel** (`server: Vercel`, region `bom1`). Live HTML inspection confirms production is currently serving `main` (e.g., `/contact` still renders the `"Connect with Google account"` checkbox and links `"Privacy Policy"` to `/about`; `<link rel="canonical">` on `/` is `https://dviewsolutions.com` without trailing slash; `#page-loader` from PR #1 is not present in live HTML).

### 1.2 Comparison: `main` vs `audit/ads-trust-privacy-loader-20261017` (PR #1)
Branch `origin/audit/ads-trust-privacy-loader-20261017` (Pull Request #1) is **11 commits ahead** of `main` and modifies **11 files** (`+464` lines, `-164` lines):

| File Modified in PR #1 | Summary of Changes in PR #1 (Not Yet in Production) |
| :--- | :--- |
| `AUDIT-2026-10-17.md` | Adds a 266-line summary audit report documenting 14 issues addressed in PR #1. |
| `public/sitemap.xml` | Removes 9 alias URLs (`/vizag/`, `/rajamahendravaram/`, `/amaravati/`, `/vijayawada-amaravati/`, `/locations/vizag/`, `/locations/rajamahendravaram/`, `/locations/amaravati/`, `/locations/vijayawada-amaravati/`, `/safety-pillars/vizag/`), reducing `<url>` entries from **38 to 29**. Still uses `https://dviewsolutions.com/...` (non-`www`) with trailing slashes. |
| `src/components/DViewWebsite.tsx` | 1. Replaces external QR image request (`https://api.qrserver.com/v1/create-qr-code/?...`) with local client-side `qrcode` (`QRCode.toDataURL`) generation.<br>2. Adds 10-digit Indian mobile validation (`/^[6-9]\d{9}$/`) before opening WhatsApp in the modal.<br>3. Fixes dead footer links (`/contact#faq` → `/#faq`, `/about#maintenance` → `/solutions#maintenance`, `/about#warranty` → `/privacy#legal`, `/about#metallurgy` → `/about`, `/about#standards` → `/about`, `/about#fire-safety` → `/solutions`). |
| `src/components/Footer.astro` | Fixes the same 6 dead footer anchor links (`/contact#faq`, `/about#maintenance`, `/about#warranty`, `/about#metallurgy`, `/about#standards`, `/about#fire-safety`) to match `DViewWebsite.tsx`. |
| `src/components/SiteVisitForm.tsx` | 1. Parses `?city=` URL query parameter on mount to pre-select the matching city.<br>2. Removes fake `"Connect with Google account"` checkbox (`connectGoogle`).<br>3. Changes `consentAgreed` default state from `true` (pre-checked) to `false` (unchecked).<br>4. Fixes Privacy Policy link from `href="/about"` to `href="/privacy"`.<br>5. Replaces deceptive `"Free Site Visit Request Sent! ... Our verified installer ... has been notified"` message with `"WhatsApp Inquiry Ready — We opened WhatsApp with your site visit details..."`. |
| `src/layouts/Layout.astro` | 1. Normalizes `canonicalUrl` to always end with a trailing slash (`/`).<br>2. **Introduces a new defect/risk:** Adds a full-screen fixed overlay `<div id="page-loader">` (`position:fixed;inset:0;z-index:99999;opacity:1`) that blocks the entire viewport for 420ms on every page load before fading out. |
| `src/pages/index.astro` | Updates `canonicalUrl` prop from `"https://dviewsolutions.com"` to `"https://dviewsolutions.com/"`. |
| `src/pages/[city].astro` | Maps alias slugs (`vizag`, `rajamahendravaram`, `amaravati`, `vijayawada-amaravati`) to primary city canonical URLs (`https://dviewsolutions.com/${primaryCitySlug}/`). |
| `src/pages/locations/[location].astro` | Points all `/locations/[location]` canonical URLs to `https://dviewsolutions.com/${primaryCitySlug}/` to consolidate duplicate templates. |
| `src/pages/safety-pillars/[city].astro` | Consolidates alias canonical URLs to `https://dviewsolutions.com/safety-pillars/${primaryCitySlug}/`. |
| `src/styles/global.css` | Removes unused `.font-playfair`, `.font-cormorant`, and `.font-montserrat` utility classes whose Google Fonts were never loaded. |

---

## 2. Complete Source Code Architecture

### 2.1 Build, Configuration & Deployment Files
- **`package.json`:** Defines Astro static site build scripts (`dev`, `build`, `preview`, `astro`). Dependencies: `@astrojs/react` (`^7.0.0`), `@tailwindcss/vite` (`^4.3.3`), `astro` (`^7.3.5`), `lucide-react` (`^1.49.0`), `qrcode` (`^1.5.4`), `react` (`^19.3.0`), `react-dom` (`^19.3.0`), `tailwindcss` (`^4.3.3`). **No automated test runner (`vitest`, `playwright`, `jest`) or linting script is configured in `package.json`, and no `package-lock.json` is committed.**
- **`astro.config.mjs`:** Configures `site: 'https://dviewsolutions.com'` (non-`www`, contradicting live Vercel redirect to `https://www.dviewsolutions.com`), `@astrojs/react()` integration, and `@tailwindcss/vite()` plugin. Does not use `@astrojs/sitemap` (relying on a manually maintained `public/sitemap.xml`) and does not set `trailingSlash`.
- **`tsconfig.json`:** Extends `astro/tsconfigs/strict` with React JSX transform (`"jsx": "react-jsx"`).
- **`public/robots.txt`:** Allows all crawlers (`User-agent: * / Allow: /`) and points to `Sitemap: https://dviewsolutions.com/sitemap.xml` (non-`www` URL which 308-redirects on Vercel).
- **`public/sitemap.xml`:** Static XML file listing 38 `<url>` entries on `main` (all using non-`www` `https://dviewsolutions.com/...` with trailing slashes and `<lastmod>2026-10-07</lastmod>`).

### 2.2 Global Layout & Styles
- **`src/layouts/Layout.astro` (175 lines):**
  - Renders `<head>` with SEO title, meta description, canonical tag (`canonicalUrl`), Open Graph tags, Twitter Card tags, Geo meta tags (`IN-AP`), and Google Fonts (`Inter` and `Plus Jakarta Sans`).
  - Injects up to 3 JSON-LD `<script type="application/ld+json">` blocks:
    1. `HomeAndConstructionBusiness` (`name: "D-VIEW Invisible Safety Grills"`, `telephone: "+916281620716"`, `email: "dviewsolutions32@gmail.com"`, address in Rajahmundry `533103`, `aggregateRating` hardcoded to `4.9` / `320` reviews).
    2. `BreadcrumbList` (2 items: Home + current page).
    3. Optional `FAQPage` schema when `faqs` prop is passed (`[city].astro` and `locations/[location].astro`).
  - Renders floating Bottom-Left Direct Call (`tel:+916281620716`) and Bottom-Right WhatsApp (`https://wa.me/916281620716?...`) buttons unless `hideFloatingButtons={true}` is passed (used on `/` and `/safety-pillars/[city]`, where `DViewWebsite.tsx` renders its own floating buttons).
- **`src/styles/global.css` (131 lines):**
  - Imports Tailwind v4 (`@import "tailwindcss";`), sets `font-family: 'Inter'` for body and `'Plus Jakarta Sans'` for headings, defines keyframe animations (`fadeUp`, `slowZoom`, `shimmer`, `marquee`), and hides scrollbars via `.no-scrollbar`.

### 2.3 Page Templates (`src/pages/` — 11 Files Generating 41 Static HTML Pages)
1. **`src/pages/index.astro` → `/`:**
   - Renders a visually hidden `<h1 class="sr-only">` and mounts `<DViewWebsite client:load tier="tier1" />` with `hideFloatingButtons={true}`.
2. **`src/pages/about.astro` → `/about`:**
   - Renders `<Navbar client:load />`, static hero and narrative paragraphs (`"From High-Rise Anxiety to Architectural Peace"`), `<WhyDView />`, a CTA section linking to `/contact#book-visit` and `/solutions`, and `<Footer />`.
3. **`src/pages/contact.astro` → `/contact`:**
   - Renders `<Navbar client:load />`, 3 contact cards (Call `+91 62816 20716`, WhatsApp `+91 62816 20716`, Email `dviewsolutions32@gmail.com`), `<SiteVisitForm client:visible defaultCitySlug="rajahmundry" cityName="Andhra Pradesh" />`, an AP Service Hub Directory card grid, and `<Footer />`.
4. **`src/pages/privacy.astro` → `/privacy`:**
   - Renders `<Navbar client:load />`, three anchor sections (`#privacy` Customer Data & Privacy Policy, `#legal` 10-Year Warranty Terms & Service Agreement, `#cookies` Cookie & Tracking Policy), and `<Footer />`.
5. **`src/pages/sitemap.astro` → `/sitemap`:**
   - Renders `<Navbar client:load />`, an HTML Sitemap organized into 4 cards (Core Pages, Primary City Hubs, Safety Pillars & Sub-Corridors, Customer Support & Legal), and `<Footer />`.
6. **`src/pages/solutions/index.astro` → `/solutions`:**
   - Renders `<Navbar client:load />`, hero section, `<ServicesGrid cityName="Andhra Pradesh" />`, `<PhotoGallery cityName="Andhra Pradesh" />`, `<SiteVisitForm client:visible defaultCitySlug="visakhapatnam" cityName="Andhra Pradesh" />`, and `<Footer />`.
7. **`src/pages/projects/index.astro` → `/projects`:**
   - Renders `<Navbar client:load />`, hero section, a 17-card grid of completed installations flattened from `ALL_LOCATIONS` (`src/data/locations.ts`), and `<Footer />`.
8. **`src/pages/locations/index.astro` → `/locations`:**
   - Renders `<Navbar client:load />`, hero section, a 7-card city directory mapped from `ALL_LOCATIONS` linking to `/locations/${loc.slug}`, a helpline CTA banner, and `<Footer />`.
9. **`src/pages/[city].astro` → 11 Root City & Alias Pages:**
   - Uses `getStaticPaths()` with `cityAliases` to generate 11 routes (`/vizag`, `/visakhapatnam`, `/rajahmundry`, `/rajamahendravaram`, `/vijayawada`, `/amaravati`, `/vijayawada-amaravati`, `/guntur`, `/kakinada`, `/nellore`, `/ongole`) backed by `CITIES_DATA` (`src/data/citiesData.ts`).
   - Uses its own inline sticky `<header>` (NOT `Navbar.tsx`), hero section, `<BeforeAfterSlider client:visible />`, `<HorizontalProblemSlider client:visible />`, 3-pillar engineering grid, local neighborhoods & projects grid, FAQ `<details>` accordion, bottom CTA banner, and `<Footer />`.
10. **`src/pages/locations/[location].astro` → 11 Location Hub & Alias Pages:**
    - Uses the exact same `cityAliases` map and `CITIES_DATA` to generate 11 routes under `/locations/*`.
    - **100% template duplicate of `src/pages/[city].astro`** (identical 400 lines of markup, differing only in `canonicalUrl` on `main`).
11. **`src/pages/safety-pillars/[city].astro` → 11 Safety Pillar Pages:**
    - Generates 11 routes under `/safety-pillars/*` for the same 11 city/alias slugs.
    - Mounts `<DViewWebsite client:load initialCitySlug={slug} initialCorridor={corridorParam} tier="tier3" />` and injects a custom `Service` JSON-LD block.
    - **SSR Static Trap:** Line 36 reads `const corridorParam = Astro.url.searchParams.get('corridor') || undefined;` during static build (`output: "static"`), where `searchParams` is always empty, so `initialCorridor` is always `undefined` in static HTML; corridor selection only happens client-side after React hydration in `DViewWebsite.tsx` (`useEffect` reading `window.location.search`).

### 2.4 Component Inventory (`src/components/` — 27 Files: 9 Active, 18 Unused Dead Code)

#### Active Components (9 Files Used by Pages)
| Component | Type & Hydration | Used On | Purpose & Key Behavior |
| :--- | :--- | :--- | :--- |
| `DViewWebsite.tsx` | React (`client:load`, 2,773 lines) | `/`, `/safety-pillars/[city]` | Monolithic SPA-style component containing its own header, city/corridor switcher, hero slider, interactive price calculator, society portfolio filter, before/after comparison, FAQ accordion, footer, floating buttons, and WhatsApp QR lead modal. Supports `tier1`, `tier2` (unused), and `tier3`. |
| `Navbar.tsx` | React (`client:load`, 356 lines) | `/about`, `/contact`, `/privacy`, `/sitemap`, `/solutions`, `/projects`, `/locations` | Sticky top navigation bar with Locations dropdown, hash links (`#solutions`, `#projects`, `#faq`, `#book-visit`), and mobile drawer menu. |
| `Footer.astro` | Astro (Static, 281 lines) | All pages except `/` and `/safety-pillars/[city]` | 6-column footer with 7 city hub cards, 37 sub-corridor links (`/safety-pillars/{slug}?corridor={area}`), solutions links, company links, and copyright bar. |
| `SiteVisitForm.tsx` | React (`client:visible`, 374 lines) | `/contact`, `/solutions` | Lead capture form collecting name, phone, city, area, application type, and timeline; builds a `wa.me` URL and calls `window.open(..., '_blank')`. |
| `BeforeAfterSlider.tsx` | React (`client:visible`, 219 lines) | `/[city]`, `/locations/[location]` | Interactive drag/touch comparison slider showing balcony before (rusted iron grill) vs after (D-VIEW invisible grill). |
| `HorizontalProblemSlider.tsx` | React (`client:visible`, 418 lines) | `/[city]`, `/locations/[location]` | 12-card horizontal problem/solution carousel with category tabs and a `1000ms` (`1s`) auto-scroll interval; cards link to `/contact?reason={category}`. |
| `ServicesGrid.astro` | Astro (Static, 232 lines) | `/solutions` | 6-card grid of invisible grill applications (`Balcony`, `Windows`, `Staircase`, `Dry Balcony`, `Pigeon Netting`, `Custom Commercial`) + material comparison table (`SS316` vs `SS304` vs `MS Iron`). |
| `PhotoGallery.astro` | Astro (Static, 180 lines) | `/solutions` | 6-photo gallery grid of residential installations with technical badges. |
| `WhyDView.astro` | Astro (Static, 161 lines) | `/about` | 6-reason feature grid and coastal vs inland specification breakdown. |

#### Orphaned / Dead-Code Components (18 Files Never Imported Anywhere)
The following **18 components** exist in `src/components/` but are **never imported by any page or active component**:
1. `AreasServed.astro`
2. `DynamicQRCode.tsx`
3. `EmotionalCardSlider.tsx`
4. `EmotionalSafetyCards.astro`
5. `FaqAccordion.tsx`
6. `FormulaSection.astro`
7. `Hero.astro`
8. `HeroPriceCalculator.tsx`
9. `HeroVisualSlider.tsx`
10. `LandmarkSection.astro`
11. `LuxuryCitySlider.tsx`
12. `MaterialSection.astro`
13. `OtherLocations.astro`
14. `PriceCalculator.tsx`
15. `ProblemSolutionGrid.astro`
16. `ProjectsGrid.astro`
17. `TechnicalGuide.astro`
18. `TrustBadges.astro`

### 2.5 Data Layer (`src/data/` — 4 Files)
1. **`src/data/citiesData.ts` (373 lines):** Exports `CITIES_DATA` keyed by 7 slugs (`visakhapatnam`, `rajahmundry`, `vijayawada-amaravati`, `guntur`, `kakinada`, `nellore`, `ongole`), powering `src/pages/[city].astro` and `src/pages/locations/[location].astro`.
2. **`src/data/locations.ts` (805 lines):** Exports `ALL_LOCATIONS` array (7 cities, 17 projects, FAQs, localized descriptions), powering `/locations`, `/projects`, `Navbar.tsx`, and `SiteVisitForm.tsx`.
3. **`src/data/corridors.ts` (606 lines):** Exports `CORRIDORS_BY_CITY` (Wait: **never imported by any active page or component**—`DViewWebsite.tsx` hardcodes its own `CITY_SLIDES`, `CORRIDOR_ASSETS`, and `SOCIETY_INSTALLATIONS` internally!).
4. **`src/data/emotionalCards.ts` (200 lines):** Exports `EMOTIONAL_SAFETY_CARDS` (only imported by unused `EmotionalCardSlider.tsx` and `EmotionalSafetyCards.astro`).

---

## 3. Complete Website URL Inventory

### 3.1 All 41 Generated Static HTML Routes (`dist/`)

| # | Public Route | Built HTML File | Source Template | Route Category | In `sitemap.xml` (`main`)? | In `sitemap.xml` (PR #1)? |
| :- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `/` | `dist/index.html` | `src/pages/index.astro` | Core Static | Yes (`/`) | Yes (`/`) |
| 2 | `/about` | `dist/about/index.html` | `src/pages/about.astro` | Core Static | Yes (`/about/`) | Yes (`/about/`) |
| 3 | `/contact` | `dist/contact/index.html` | `src/pages/contact.astro` | Core Static | Yes (`/contact/`) | Yes (`/contact/`) |
| 4 | `/privacy` | `dist/privacy/index.html` | `src/pages/privacy.astro` | Core Static | Yes (`/privacy/`) | Yes (`/privacy/`) |
| 5 | `/sitemap` | `dist/sitemap/index.html` | `src/pages/sitemap.astro` | Core Static | **No (Missing)** | **No (Missing)** |
| 6 | `/solutions` | `dist/solutions/index.html` | `src/pages/solutions/index.astro` | Core Static | Yes (`/solutions/`) | Yes (`/solutions/`) |
| 7 | `/projects` | `dist/projects/index.html` | `src/pages/projects/index.astro` | Core Static | Yes (`/projects/`) | Yes (`/projects/`) |
| 8 | `/locations` | `dist/locations/index.html` | `src/pages/locations/index.astro` | Core Static | Yes (`/locations/`) | Yes (`/locations/`) |
| 9 | `/vizag` | `dist/vizag/index.html` | `src/pages/[city].astro` | Root City (Primary) | Yes (`/vizag/`) | **Removed in PR #1** |
| 10 | `/visakhapatnam` | `dist/visakhapatnam/index.html` | `src/pages/[city].astro` | Root City (Alias) | Yes (`/visakhapatnam/`) | Yes (`/visakhapatnam/`) |
| 11 | `/rajahmundry` | `dist/rajahmundry/index.html` | `src/pages/[city].astro` | Root City (Primary) | Yes (`/rajahmundry/`) | Yes (`/rajahmundry/`) |
| 12 | `/rajamahendravaram` | `dist/rajamahendravaram/index.html` | `src/pages/[city].astro` | Root City (Alias) | Yes (`/rajamahendravaram/`) | **Removed in PR #1** |
| 13 | `/vijayawada` | `dist/vijayawada/index.html` | `src/pages/[city].astro` | Root City (Primary) | Yes (`/vijayawada/`) | Yes (`/vijayawada/`) |
| 14 | `/amaravati` | `dist/amaravati/index.html` | `src/pages/[city].astro` | Root City (Alias) | Yes (`/amaravati/`) | **Removed in PR #1** |
| 15 | `/vijayawada-amaravati` | `dist/vijayawada-amaravati/index.html` | `src/pages/[city].astro` | Root City (Alias) | Yes (`/vijayawada-amaravati/`) | **Removed in PR #1** |
| 16 | `/guntur` | `dist/guntur/index.html` | `src/pages/[city].astro` | Root City (Primary) | Yes (`/guntur/`) | Yes (`/guntur/`) |
| 17 | `/kakinada` | `dist/kakinada/index.html` | `src/pages/[city].astro` | Root City (Primary) | Yes (`/kakinada/`) | Yes (`/kakinada/`) |
| 18 | `/nellore` | `dist/nellore/index.html` | `src/pages/[city].astro` | Root City (Primary) | Yes (`/nellore/`) | Yes (`/nellore/`) |
| 19 | `/ongole` | `dist/ongole/index.html` | `src/pages/[city].astro` | Root City (Primary) | Yes (`/ongole/`) | Yes (`/ongole/`) |
| 20 | `/locations/vizag` | `dist/locations/vizag/index.html` | `src/pages/locations/[location].astro` | Location Hub (Alias) | Yes (`/locations/vizag/`) | **Removed in PR #1** |
| 21 | `/locations/visakhapatnam` | `dist/locations/visakhapatnam/index.html` | `src/pages/locations/[location].astro` | Location Hub (Primary) | Yes (`/locations/visakhapatnam/`) | Yes (`/locations/visakhapatnam/`) |
| 22 | `/locations/rajahmundry` | `dist/locations/rajahmundry/index.html` | `src/pages/locations/[location].astro` | Location Hub (Primary) | Yes (`/locations/rajahmundry/`) | Yes (`/locations/rajahmundry/`) |
| 23 | `/locations/rajamahendravaram` | `dist/locations/rajamahendravaram/index.html` | `src/pages/locations/[location].astro` | Location Hub (Alias) | Yes (`/locations/rajamahendravaram/`) | **Removed in PR #1** |
| 24 | `/locations/vijayawada` | `dist/locations/vijayawada/index.html` | `src/pages/locations/[location].astro` | Location Hub (Alias) | Yes (`/locations/vijayawada/`) | Yes (`/locations/vijayawada/`) |
| 25 | `/locations/amaravati` | `dist/locations/amaravati/index.html` | `src/pages/locations/[location].astro` | Location Hub (Alias) | Yes (`/locations/amaravati/`) | **Removed in PR #1** |
| 26 | `/locations/vijayawada-amaravati` | `dist/locations/vijayawada-amaravati/index.html` | `src/pages/locations/[location].astro` | Location Hub (Primary) | Yes (`/locations/vijayawada-amaravati/`) | **Removed in PR #1** |
| 27 | `/locations/guntur` | `dist/locations/guntur/index.html` | `src/pages/locations/[location].astro` | Location Hub (Primary) | Yes (`/locations/guntur/`) | Yes (`/locations/guntur/`) |
| 28 | `/locations/kakinada` | `dist/locations/kakinada/index.html` | `src/pages/locations/[location].astro` | Location Hub (Primary) | Yes (`/locations/kakinada/`) | Yes (`/locations/kakinada/`) |
| 29 | `/locations/nellore` | `dist/locations/nellore/index.html` | `src/pages/locations/[location].astro` | Location Hub (Primary) | Yes (`/locations/nellore/`) | Yes (`/locations/nellore/`) |
| 30 | `/locations/ongole` | `dist/locations/ongole/index.html` | `src/pages/locations/[location].astro` | Location Hub (Primary) | Yes (`/locations/ongole/`) | Yes (`/locations/ongole/`) |
| 31 | `/safety-pillars/vizag` | `dist/safety-pillars/vizag/index.html` | `src/pages/safety-pillars/[city].astro` | Safety Pillar (Primary) | Yes (`/safety-pillars/vizag/`) | **Removed in PR #1** |
| 32 | `/safety-pillars/visakhapatnam` | `dist/safety-pillars/visakhapatnam/index.html` | `src/pages/safety-pillars/[city].astro` | Safety Pillar (Alias) | Yes (`/safety-pillars/visakhapatnam/`) | Yes (`/safety-pillars/visakhapatnam/`) |
| 33 | `/safety-pillars/rajahmundry` | `dist/safety-pillars/rajahmundry/index.html` | `src/pages/safety-pillars/[city].astro` | Safety Pillar (Primary) | Yes (`/safety-pillars/rajahmundry/`) | Yes (`/safety-pillars/rajahmundry/`) |
| 34 | `/safety-pillars/rajamahendravaram` | `dist/safety-pillars/rajamahendravaram/index.html` | `src/pages/safety-pillars/[city].astro` | Safety Pillar (Alias) | **No (Missing)** | **No (Missing)** |
| 35 | `/safety-pillars/vijayawada` | `dist/safety-pillars/vijayawada/index.html` | `src/pages/safety-pillars/[city].astro` | Safety Pillar (Primary) | Yes (`/safety-pillars/vijayawada/`) | Yes (`/safety-pillars/vijayawada/`) |
| 36 | `/safety-pillars/amaravati` | `dist/safety-pillars/amaravati/index.html` | `src/pages/safety-pillars/[city].astro` | Safety Pillar (Alias) | **No (Missing)** | **No (Missing)** |
| 37 | `/safety-pillars/vijayawada-amaravati` | `dist/safety-pillars/vijayawada-amaravati/index.html` | `src/pages/safety-pillars/[city].astro` | Safety Pillar (Alias) | Yes (`/safety-pillars/vijayawada-amaravati/`) | **Removed in PR #1** |
| 38 | `/safety-pillars/guntur` | `dist/safety-pillars/guntur/index.html` | `src/pages/safety-pillars/[city].astro` | Safety Pillar (Primary) | Yes (`/safety-pillars/guntur/`) | Yes (`/safety-pillars/guntur/`) |
| 39 | `/safety-pillars/kakinada` | `dist/safety-pillars/kakinada/index.html` | `src/pages/safety-pillars/[city].astro` | Safety Pillar (Primary) | Yes (`/safety-pillars/kakinada/`) | Yes (`/safety-pillars/kakinada/`) |
| 40 | `/safety-pillars/nellore` | `dist/safety-pillars/nellore/index.html` | `src/pages/safety-pillars/[city].astro` | Safety Pillar (Primary) | Yes (`/safety-pillars/nellore/`) | Yes (`/safety-pillars/nellore/`) |
| 41 | `/safety-pillars/ongole` | `dist/safety-pillars/ongole/index.html` | `src/pages/safety-pillars/[city].astro` | Safety Pillar (Primary) | Yes (`/safety-pillars/ongole/`) | Yes (`/safety-pillars/ongole/`) |

### 3.2 Parameterized Internal Link Variants Discovered in Source
1. **37 Sub-Corridor Query Links (`Footer.astro` lines 47–83 & `DViewWebsite.tsx` lines 1605–1635):**
   - **Visakhapatnam (6):** `/safety-pillars/vizag?corridor=Rushikonda`, `?corridor=Madhurawada`, `?corridor=Yendada`, `?corridor=PM%20Palem`, `?corridor=Anandapuram`, `?corridor=Gajuwaka`
   - **Rajamahendravaram (6):** `/safety-pillars/rajahmundry?corridor=Morampudi`, `?corridor=Bommuru`, `?corridor=Diwancheruvu`, `?corridor=Vemagiri`, `?corridor=Danavaipeta`, `?corridor=Tilak%20Road`
   - **Vijayawada & Amaravati (6):** `/safety-pillars/vijayawada?corridor=Benz%20Circle`, `?corridor=Tadepalli`, `?corridor=Kanuru`, `?corridor=Moghalrajpuram`, `?corridor=Gunadala`, `?corridor=Happy%20Nest`
   - **Guntur (5):** `/safety-pillars/guntur?corridor=Brodipet`, `?corridor=Arundelpet`, `?corridor=Amaravati%20Road`, `?corridor=Kaza`, `?corridor=Namburu`
   - **Kakinada (5):** `/safety-pillars/kakinada?corridor=Sarpavaram`, `?corridor=Vakalapudi`, `?corridor=Ramanayyapeta`, `?corridor=Jagannaickpur`, `?corridor=Madhavapatnam`
   - **Nellore (5):** `/safety-pillars/nellore?corridor=Magunta%20Layout`, `?corridor=Vedayapalem`, `?corridor=Balaji%20Nagar`, `?corridor=Podalakur%20Road`, `?corridor=Dargamitta`
   - **Ongole (4):** `/safety-pillars/ongole?corridor=Kurnool%20Road`, `?corridor=Lawyer%20Pet`, `?corridor=Bhagya%20Nagar`, `?corridor=Santhapet` (plus `/sitemap` line 139 links to `/safety-pillars/ongole?corridor=Mangamuru%20Road`)
2. **City Booking Query Links (`[city].astro` & `locations/[location].astro` lines 151, 385):**
   - `/contact?city={slug}#book-visit` and `/contact?city={slug}` for all 11 slugs.
3. **Problem Category Query Links (`HorizontalProblemSlider.tsx` line 364):**
   - `/contact?reason={encodeURIComponent(card.category)}` (`Child Safety`, `Pet Protection`, `Pigeon Control`, `Weather Durability`, `Aesthetics & View`, `Emergency Fire Exit`, `Elderly Safety`, `Society Compliance`).

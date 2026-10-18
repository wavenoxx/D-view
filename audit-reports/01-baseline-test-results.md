# 01 — Baseline Build, HTTP, Browser & Interactive Test Results

**Project:** D-VIEW Solutions (`https://www.dviewsolutions.com/`)  
**Audited Branch:** `main` (`c9d7f19f7b9cb103f477b0d4236a29b44d87ea1d`)  
**Audit Date:** 2026-10-17

---

## 1. Local Environment & Build Baseline

### 1.1 Runtime & Tooling Versions
- **OS:** macOS (`zsh`)
- **Node.js:** `v26.4.0`
- **npm:** `11.17.0`
- **Browser Engine:** Google Chrome (`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`) driven via `playwright-core`

### 1.2 Dependency Installation (`npm install`)
- **Command Executed:** `npm install --no-package-lock` (used `--no-package-lock` to preserve a clean Git working tree on `main`, as `package-lock.json` is not tracked in the repository)
- **Exit Code:** `0` (Success)
- **Packages Installed:** `242 packages added, 0 vulnerabilities`
- **Resolved Top-Level Versions (`npm list --depth=0`):**
  ```text
  d-view@0.0.1
  ├── @astrojs/react@7.1.0
  ├── @tailwindcss/vite@4.3.3
  ├── @types/qrcode@1.5.6
  ├── @types/react-dom@19.3.0
  ├── @types/react@19.3.0
  ├── astro@7.4.0
  ├── lucide-react@1.59.0
  ├── qrcode@1.5.4
  ├── react-dom@19.3.1
  ├── react@19.3.1
  └── tailwindcss@4.3.3
  ```

### 1.3 Production Static Build (`npm run build`)
- **Command Executed:** `npm run build` (`astro build`)
- **Exit Code:** `0` (Success)
- **Errors:** `0`
- **Warnings:** `0`
- **Build Duration:** `1.30s` (`41 page(s) built in 1.30s`)
- **Exact Build Output:**
  ```text
  > d-view@0.0.1 build
  > astro build

  19:21:32 [types] Generated 63ms
  19:21:32 [build] output: "static"
  19:21:32 [build] mode: "static"
  19:21:32 [build] directory: /Users/bunny/.gemini/antigravity/scratch/D-view/dist/
  19:21:32 [build] Collecting build info...
  19:21:32 [build] ✓ Completed in 87ms.
  19:21:32 [build] Building static entrypoints...
  19:21:32 [vite] ✓ built in 238ms
  19:21:33 [vite] ✓ built in 797ms
  19:21:33 [build] Rearranging server assets...
   generating static routes (41 files)
  19:21:33 ✓ Completed in 163ms.
  19:21:33 [build] ✓ Completed in 1.21s.
  19:21:33 [build] 41 page(s) built in 1.30s
  19:21:33 [build] Complete!
  ```

### 1.4 Automated Unit / E2E Test Suite Check
- **Configured Test Scripts in `package.json`:** **NONE** (`package.json` only defines `dev`, `build`, `preview`, and `astro`).

---

## 2. Live Production HTTP & Redirect Chain Baseline (`dviewsolutions.com`)

Executed via `/usr/bin/curl -sI -L` against the live Vercel deployment:

| Tested URL | Hop 1 | Hop 2 | Final Response | Verdict |
| :--- | :--- | :--- | :--- | :---: |
| `http://dviewsolutions.com/` | `308 Permanent Redirect` → `https://dviewsolutions.com/` | `308 Permanent Redirect` → `https://www.dviewsolutions.com/` | `HTTP/2 200` (`https://www.dviewsolutions.com/`) | **FAIL (2-Hop Redirect + Canonical Loop `SEO-01`)** |
| `https://dviewsolutions.com/` | `308 Permanent Redirect` → `https://www.dviewsolutions.com/` | — | `HTTP/2 200` (`https://www.dviewsolutions.com/`) | **FAIL (Contradicts `<link rel="canonical">` `SEO-01`)** |
| `http://www.dviewsolutions.com/` | `308 Permanent Redirect` → `https://www.dviewsolutions.com/` | — | `HTTP/2 200` (`https://www.dviewsolutions.com/`) | **PASS (1-Hop HTTPS Upgrade)** |
| `https://www.dviewsolutions.com/` | — | — | `HTTP/2 200` (`server: Vercel`) | **PASS** |
| `https://www.dviewsolutions.com/about` | — | — | `HTTP/2 200` | **WARN (Both `/about` and `/about/` return `200` `SEO-02`)** |
| `https://www.dviewsolutions.com/about/` | — | — | `HTTP/2 200` | **WARN (Duplicate slash resolution `SEO-02`)** |
| `https://www.dviewsolutions.com/robots.txt` | — | — | `HTTP/2 200` (`text/plain; charset=utf-8`) | **WARN (`Sitemap:` points to redirecting non-`www` URL)** |
| `https://www.dviewsolutions.com/sitemap.xml` | — | — | `HTTP/2 200` (`application/xml`) | **FAIL (All 38 `<loc>` URLs use redirecting non-`www` host)** |

---

## 3. Clickable Elements & Interactive Component Audit Results

All interactive tests were executed safely against the local preview server (`http://localhost:4321`) with `window.open` intercepted and `api.qrserver.com` recorded/aborted so **zero real WhatsApp messages or production enquiries were sent**.

| # | Component / Element Group | Pages Tested | Test Performed | Result | Defect IDs / Details |
| :- | :--- | :--- | :--- | :---: | :--- |
| **1** | **Top Navbar (`Navbar.tsx`)** | `/about`, `/contact`, `/privacy`, `/sitemap`, `/solutions`, `/projects`, `/locations` | Clicked `Solutions`, `Locations` dropdown (all 7 cities), `Projects`, `FAQ`, `Book Free Site Visit` (desktop & mobile drawer) | **FAIL** | `Locations` dropdown links (`/locations/{slug}`) work, but `#projects` and `#faq` fail on **all 7 pages**, and `#book-visit` fails on **5 of 7 pages** (`/about`, `/privacy`, `/sitemap`, `/projects`, `/locations`) (`NAV-01`). |
| **2** | **City / Location Sticky Header** | All 22 `/[city]` and `/locations/[location]` routes | Clicked `Solutions` (`#services`), `About` (`#formula`), `Local Projects` (`#local-projects`), `FAQ` (`#faq`), `Call` (`tel:`), and `Free Visit` (`/contact?city=...#book-visit`) on desktop (`1440×900`) and mobile (`390×844`) | **FAIL** | 1. `About` (`href="#formula"`) is broken on all 22 pages (`NAV-03`).<br>2. Entire `<nav>` is hidden on mobile (`<768px`) with no menu button (`MOB-02`).<br>3. Header overflows horizontally (`392px > 390px`) on `/rajahmundry`, `/rajamahendravaram`, `/locations/rajahmundry`, `/locations/rajamahendravaram` (`MOB-01`). |
| **3** | **Homepage & Safety-Pillar Header (`DViewWebsite.tsx`)** | `/` and all 11 `/safety-pillars/[city]` routes | Tested 7 city selector tabs, sub-corridor pills, `CONTACT US` modal trigger, and direct phone link (`tel:+916281620716`) | **PARTIAL** | City tabs, corridor pills, and modal trigger work on `/`, but `/safety-pillars/rajahmundry` overflows horizontally on mobile (`395px > 390px`, `MOB-01`). |
| **4** | **Interactive Price Calculator (`DViewWebsite.tsx`)** | `/`, `/safety-pillars/[city]` | Adjusted width/height range sliders, toggled `2-Inch Toddler Safe` vs `3-Inch Standard` cable gap, toggled `Nylon-12` vs `Teflon` coating | **PASS** | Live sq.ft. calculation and estimated price range update accurately in real time. |
| **5** | **WhatsApp Lead & QR Modal (`DViewWebsite.tsx`)** | `/`, `/safety-pillars/[city]` | Opened modal via `Book Free Laser Survey`, typed Name `Test Auditor` and Phone `9876543210`, tested empty submission and `Escape` key | **FAIL on `main`** | 1. Sends live GET request to `https://api.qrserver.com/v1/create-qr-code/?...` with Name & Phone on every keystroke (`PRIV-01` — fixed in PR #1).<br>2. Allows empty/invalid phone number on `main` (`FORM-03` — fixed in PR #1).<br>3. No `role="dialog"`, `aria-modal`, or `Escape` key close (`A11Y-01`). |
| **6** | **Site Visit Enquiry Form (`SiteVisitForm.tsx`)** | `/contact`, `/solutions`, `/contact?city=vizag#book-visit`, `/contact?reason=Child%20Safety` | Tested query param pre-selection, checkbox initial states, Privacy Policy link, input validation, and mocked `window.open` submit | **FAIL on `main` (Partial in PR #1)** | 1. Ignores `?city=vizag` on `main` (`FORM-01` — fixed in PR #1).<br>2. Ignores `?reason=Child%20Safety` on both `main` and PR #1 (`FORM-02`).<br>3. Renders fake `"Connect with Google account / Verified"` checkbox on `main` (`ADS-01` — fixed in PR #1).<br>4. Pre-checks consent (`consentAgreed = true`) and links `"Privacy Policy"` to `/about` on `main` (`PRIV-02` — fixed in PR #1).<br>5. Displays false `"Free Site Visit Request Sent! ... installer ... notified"` message on `main` (`ADS-02` — fixed in PR #1). |
| **7** | **Before / After Comparison Slider (`BeforeAfterSlider.tsx`)** | All 22 `/[city]` and `/locations/[location]` routes | Tested `<input type="range" min="0" max="100">` drag slider and keyboard arrow adjustment | **PASS** | Clip-path width (`inset(0 ${100 - sliderPosition}% 0 0)`) and divider handle respond smoothly to mouse, touch, and keyboard input. |
| **8** | **Horizontal Problem Slider (`HorizontalProblemSlider.tsx`)** | All 22 `/[city]` and `/locations/[location]` routes | Tested category filter pills, prev/next buttons, auto-scroll timer, and card CTA links (`/contact?reason=...`) | **FAIL** | 1. Auto-scroll timer fires every `1000ms` (`1s`), jumping `320px` per second (`UX-01`).<br>2. Card CTAs link to `/contact?reason=...` without city slug or `#book-visit`, and `?reason=` is ignored (`FORM-02`). |
| **9** | **Project Card CTAs (`/projects`)** | `/projects` | Clicked all 7 city variations of `Book Similar in {City} →` (`/locations/{slug}#book-visit`) | **FAIL** | Target pages `/locations/{slug}` do not have any element with `id="book-visit"` (`NAV-04`). |
| **10** | **Footer & Sitemap Links (`Footer.astro`, `DViewWebsite.tsx`, `sitemap.astro`)** | All 41 routes | Tested all 7 city links, 37 `?corridor=` links, 6 solution/engineering anchor links, and legal links (`/privacy#privacy`, `#legal`, `#cookies`) | **FAIL** | 6 cross-page anchor links (`/contact#faq`, `/about#maintenance`, `/about#warranty`, `/about#metallurgy`, `/about#standards`, `/about#fire-safety`) have no matching target `id` on `/contact` or `/about` (`NAV-02`). |
| **11** | **Direct Phone (`tel:`), WhatsApp (`wa.me`), and Email (`mailto:`) Links** | All 41 routes | Inspected all `tel:`, `wa.me`, and `mailto:` `href` values across all 41 pages | **PASS** | All `tel:` links consistently dial `tel:+916281620716`, all WhatsApp links target `https://wa.me/916281620716?text=...`, and all email links target `mailto:dviewsolutions32@gmail.com`. |

---

## 4. No-JavaScript (`javaScriptEnabled: false`) Baseline Test

Executed in Headless Chrome with `javaScriptEnabled: false` to simulate non-JS crawlers or restricted ad-verification fetches:

| Route Tested | Visible Text Length (`innerText`) | Visible `<form>` Count | Visible `<h1>` Count | Pre-Hydration / No-JS Behavior on `main` | Pre-Hydration / No-JS Behavior in PR #1 |
| :--- | :-: | :-: | :-: | :--- | :--- |
| `/` | `7,117` chars | `0` | `0` (`1` `.sr-only`) | Astro SSR pre-renders the full `DViewWebsite` HTML; interactive tabs/modals do not open without JS, but direct `tel:` and `wa.me` links work. | PR #1 injects `<noscript><style>#page-loader{display:none!important}</style></noscript>` to hide `#page-loader` when JS is disabled, but when JS is enabled, `#page-loader` blocks the screen for `420ms` (`PERF-01`). |
| `/about` | `4,676` chars | `0` | `1` | 100% static content visible immediately. | Blocked for `420ms` by `#page-loader` when JS is enabled. |
| `/contact` | `3,813` chars | `1` | `1` | Static contact cards (`tel:`, `wa.me`, `mailto:`) and SSR form HTML are visible, though `SiteVisitForm` requires JS to open `wa.me` on submit. | Blocked for `420ms` by `#page-loader` when JS is enabled. |
| `/vizag` | `6,462` chars | `0` | `1` | Full city page, native `<details>` FAQs, and `tel:`/`wa.me` links work without JS. | Blocked for `420ms` by `#page-loader` when JS is enabled. |
| `/safety-pillars/vizag` | `7,411` chars | `0` | `1` | Full 6-pillar grid and society cards render in SSR HTML; `?corridor=` query parameter requires JS hydration to switch the hero banner (`SEO-06`). | Blocked for `420ms` by `#page-loader` when JS is enabled. |

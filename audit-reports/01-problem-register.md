# 01 — Forensic Problem Register (Sorted by Severity)

**Project:** D-VIEW Solutions (`https://www.dviewsolutions.com/`)  
**Audited Branch:** `main` (`c9d7f19f7b9cb103f477b0d4236a29b44d87ea1d`)  
**Comparison Branch:** `origin/audit/ads-trust-privacy-loader-20261017` (PR #1)  
**Total Confirmed Problems:** **28** (**4 Critical**, **11 High**, **10 Medium**, **3 Low**)

---

## Executive Summary Table of Confirmed Problems

| Issue ID | Severity | Category | Summary of Confirmed Defect | Exact File Path(s) | Addressed in PR #1? |
| :--- | :---: | :--- | :--- | :--- | :---: |
| `PRIV-01` | **Critical** | Privacy / Security | Lead modal embeds user name & phone into external `api.qrserver.com` image URL on every keystroke | `src/components/DViewWebsite.tsx:2745` | **Yes** |
| `ADS-01` | **Critical** | Google Ads / Trust | Fake `"Connect with Google account / Verified"` checkbox in lead form (`connectGoogle` unused) | `src/components/SiteVisitForm.tsx:30, 301-325` | **Yes** |
| `ADS-02` | **Critical** | Google Ads / Conversion | Lead form displays `"Free Site Visit Request Sent! ... installer ... notified"` when only opening a WhatsApp tab | `src/components/SiteVisitForm.tsx:80-82, 363-369` | **Yes** |
| `SEO-01` | **Critical** | SEO / Google Ads Destination | All 41 canonicals, `astro.config.mjs`, `robots.txt`, and `sitemap.xml` use non-`www` (`https://dviewsolutions.com`), which 308-redirects to `https://www.dviewsolutions.com` | `astro.config.mjs:8`, `public/robots.txt:4`, `public/sitemap.xml`, `src/layouts/Layout.astro:19`, all `src/pages/*` | **No** |
| `NAV-01` | **High** | Navigation / Conversion | `Navbar.tsx` uses relative hash links (`#projects`, `#faq`, `#book-visit`, `#solutions`) that fail on `/about`, `/contact`, `/privacy`, `/sitemap`, `/solutions`, `/projects`, `/locations` | `src/components/Navbar.tsx:138, 204, 210, 222, 242, 277, 325, 331, 340` | **No** |
| `NAV-02` | **High** | Navigation / UX | 6 broken cross-page anchor links (`/contact#faq`, `/about#maintenance`, `/about#warranty`, `/about#metallurgy`, `/about#standards`, `/about#fire-safety`) across all 41 pages | `src/components/Footer.astro:146-189`, `src/components/DViewWebsite.tsx:1656-1689`, `src/pages/sitemap.astro:164, 169, 202` | **Partial** (`sitemap.astro` & `#maintenance` unfixed) |
| `NAV-03` | **High** | Navigation / UX | Broken `<a href="#formula">About</a>` header link on all 22 city and location pages | `src/pages/[city].astro:77`, `src/pages/locations/[location].astro:77` | **No** |
| `NAV-04` | **High** | Conversion / Navigation | All 17 `"Book Similar in {City}"` project card CTAs on `/projects` link to `/locations/{slug}#book-visit`, which has no `#book-visit` element | `src/pages/projects/index.astro:76` | **No** |
| `SEO-03` | **High** | SEO / Architecture | 22 identical city/location pages + 11 safety-pillar pages for 7 actual cities (up to 6 duplicate URLs per city self-canonicalizing on `main`) | `src/pages/[city].astro:9-32`, `src/pages/locations/[location].astro:9-32`, `src/pages/safety-pillars/[city].astro:13-85` | **Partial** (Canonicals updated; internal links still split) |
| `PRIV-02` | **High** | Privacy / Compliance | `SiteVisitForm` pre-checks consent (`consentAgreed = true`) and links `"Privacy Policy"` to `/about` instead of `/privacy` | `src/components/SiteVisitForm.tsx:29, 337` | **Yes** |
| `FORM-01` | **High** | Conversion / UX | `/contact?city={slug}#book-visit` ignores `?city=` parameter on `main`, defaulting to `Rajahmundry` | `src/components/SiteVisitForm.tsx:18` | **Yes** |
| `FORM-02` | **High** | Conversion / UX | `/contact?reason={category}` from all 12 `HorizontalProblemSlider` cards on 22 city pages ignores `?reason=`, loses city context, and omits `#book-visit` | `src/components/HorizontalProblemSlider.tsx:364`, `src/components/SiteVisitForm.tsx:18-26` | **No** |
| `TRUST-01` | **High** | Schema / Google Ads Trust | Global `HomeAndConstructionBusiness` JSON-LD hardcodes `aggregateRating` (`4.9` / `320` reviews) on all 41 pages without third-party review verification | `src/layouts/Layout.astro:62-67` | **No** |
| `TRUST-02` | **High** | Trust / Misrepresentation | Contradictory warranty terms: `"10-Year Replacement Warranty"` vs `"5 to 10-year warranty depending on coastal or inland installation"` | `src/components/WhyDView.astro:33`, `src/data/locations.ts:702, 797`, `src/pages/privacy.astro:59` | **No** |
| `PERF-01` | **High** | Performance / Ads Bot Risk | PR #1 introduces a full-screen fixed `#page-loader` (`z-index:99999`) blocking every page load for `420ms` | `src/layouts/Layout.astro` (PR #1 lines `147-184`) | **Introduced in PR #1** |
| `SEO-02` | **Medium** | Technical SEO | Trailing slash mismatch between `<link rel="canonical">` (no slash on `main`) and `public/sitemap.xml` (trailing slash) | `src/layouts/Layout.astro:19`, `public/sitemap.xml` | **Yes** |
| `SEO-04` | **Medium** | Technical SEO | `safety-pillars/[city].astro` defines `cityMeta.canonical` for aliases (lines 42–72) but ignores it on line 83 | `src/pages/safety-pillars/[city].astro:42-72, 83` | **Yes** |
| `SEO-05` | **Medium** | On-Page SEO | Homepage (`/`) renders 8 `<h1>` tags in the DOM (0 visible on desktop `1440×900`, 7 visible on mobile `390×844`) | `src/pages/index.astro:32`, `src/components/DViewWebsite.tsx:2148` | **No** |
| `SEO-06` | **Medium** | Technical SEO / SSR | `safety-pillars/[city].astro` reads `Astro.url.searchParams.get('corridor')` in static build mode (`output: "static"`), where `searchParams` is always empty | `src/pages/safety-pillars/[city].astro:36` | **No** |
| `MOB-01` | **Medium** | Mobile Usability | Horizontal viewport overflow (`392px–395px` > `390px`) on `/rajahmundry`, `/rajamahendravaram`, `/locations/rajahmundry`, `/locations/rajamahendravaram`, `/safety-pillars/rajahmundry` | `src/pages/[city].astro:58-96`, `src/pages/locations/[location].astro:58-96`, `src/components/DViewWebsite.tsx:1945-2003` | **No** |
| `MOB-02` | **Medium** | Mobile Usability | Top navigation bar (`<nav class="hidden md:flex">`) is completely hidden on mobile (`<768px`) with no menu toggle across all 22 city/location pages | `src/pages/[city].astro:74`, `src/pages/locations/[location].astro:74` | **No** |
| `FORM-03` | **Medium** | Conversion / Data Quality | Lead modal in `DViewWebsite.tsx` on `main` allows launching WhatsApp with empty or invalid phone numbers | `src/components/DViewWebsite.tsx:2732-2762` | **Yes** |
| `TRUST-03` | **Medium** | Trust / Consistency | Contradictory site-visit response commitments (`within 2 hours` vs `same-day` vs `within 24 hours`) | `src/pages/locations/index.astro:110`, `src/components/Footer.astro:133, 224`, `src/pages/[city].astro:380`, `src/components/WhyDView.astro:39` | **No** |
| `UX-01` | **Medium** | UX / Readability | `HorizontalProblemSlider.tsx` auto-advances cards every `1000ms` (`1s`), making cards unreadable before scrolling away | `src/components/HorizontalProblemSlider.tsx:232` | **No** |
| `A11Y-01` | **Medium** | Accessibility | Modal and forms lack `role="dialog"`, `aria-modal="true"`, Escape key handler, and `htmlFor`/`id` label associations | `src/components/DViewWebsite.tsx:2658-2740`, `src/components/SiteVisitForm.tsx:147-298` | **No** |
| `SEO-07` | **Low** | Semantic HTML | `/projects` skips `<h2>` (jumping from `<h1>` to 17 `<h3>` cards); `BeforeAfterSlider.tsx` duplicates section heading | `src/pages/projects/index.astro:36-70`, `src/components/BeforeAfterSlider.tsx:160` | **No** |
| `SEO-08` | **Low** | Technical SEO | Static `public/sitemap.xml` uses hardcoded `<lastmod>2026-10-07</lastmod>` and omits `/sitemap` | `public/sitemap.xml:1-232` | **Partial** |
| `MAINT-01` | **Low** | Code Hygiene / QA | 18 unused components in `src/components/`, 2 unused data files in `src/data/`, unused `tier2` branch in `DViewWebsite.tsx`, no `package-lock.json` or test suite | `src/components/*`, `src/data/corridors.ts`, `src/data/emotionalCards.ts`, `src/components/DViewWebsite.tsx:2246-2361` | **No** |

---

## Detailed Forensic Problem Reports

### 1. CRITICAL SEVERITY PROBLEMS

---

#### `PRIV-01` — Real-Time PII Leakage to External Third-Party Server (`api.qrserver.com`) on Every Keystroke
- **Exact URL(s):** `/`, `/safety-pillars/vizag`, `/safety-pillars/visakhapatnam`, `/safety-pillars/rajahmundry`, `/safety-pillars/rajamahendravaram`, `/safety-pillars/vijayawada`, `/safety-pillars/amaravati`, `/safety-pillars/vijayawada-amaravati`, `/safety-pillars/guntur`, `/safety-pillars/kakinada`, `/safety-pillars/nellore`, `/safety-pillars/ongole`
- **Exact File Path & Line Numbers:** `src/components/DViewWebsite.tsx`, lines `1252–1260` (`getWhatsAppMessage()`) and lines `2720–2753` (specifically line `2745`)
- **Component Name:** `DViewWebsite`
- **Description of Defect:** When the booking modal (`isModalOpen`) is open, the `<img>` tag on line 2745 binds its `src` directly to `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://wa.me/916281620716?text=${getWhatsAppMessage()}`. Because `getWhatsAppMessage()` reads React states `customerName`, `customerPhone`, `selectedHub`, and `selectedCorridor` directly without debouncing or local rendering, every single character typed by the visitor in the Name or Phone fields triggers an immediate HTTP GET request to third-party domain `api.qrserver.com` containing the user's personal data in the URL query string. Additionally, `getWhatsAppMessage()` is only URL-encoded once, so the `data=` parameter sent to `api.qrserver.com` is decoded on receipt, leaving spaces and newlines unescaped inside the QR payload.
- **Reproduction Steps:**
  1. Open `http://localhost:4321/` (or `https://www.dviewsolutions.com/`).
  2. Open DevTools Network tab.
  3. Click `CONTACT US` in the top bar or `Book Free Laser Survey →` in the footer banner to open the modal.
  4. Type `Test Auditor` into the Name input and `9876543210` into the Phone input.
  5. Observe network requests to `https://api.qrserver.com/v1/create-qr-code/...`.
- **Browser / Code Evidence:**
  - Playwright captured DOM attribute:
    ```text
    MODAL QR SRC: https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://wa.me/916281620716?text=Hello%20D-view%20invisible%20grills%2C%20I%20am%20interested%20in%20invisible%20safety%20grills%20for%20my%20balcony.%20Please%20share%20details.%0A%0A%F0%9F%93%8D%20City%3A%20Visakhapatnam%20(Madhurawada%2027-Floor%20High-Rises)%0A%F0%9F%91%A4%20Name%3A%20Test%20Auditor%0A%F0%9F%93%9E%20Phone%3A%209876543210
    ```
  - Contradicts `/privacy` (`src/pages/privacy.astro` line 45): *"We do not sell, rent, or trade your personal phone number or residential address to third-party telemarketers, real estate brokers, or external agencies."*
- **Root Cause:** Confirmed — external QR image API used directly in reactive JSX `<img src={...}>` instead of local client-side QR generation.
- **Severity:** **Critical** | **Confidence:** **100% (Verified)**
- **Impact:** **Privacy, Legal/DPDP Compliance & Google Ads Policy** — Undisclosed transmission of PII (name, phone number, city/locality) to an external third-party server before user consent or submission.
- **Addressed in PR #1?** **Yes** (`src/components/DViewWebsite.tsx` in PR #1 imports `QRCode` from `'qrcode'` and generates a local `data:image/png;base64,...` data URL on the client).
- **Recommended Fix:** Merge or apply the local `QRCode.toDataURL` implementation from PR #1 so zero external requests are made for QR generation.
- **Verification Still Required:** Verify after deployment that network logs show zero requests to `api.qrserver.com`.

---

#### `ADS-01` — Deceptive "Connect with Google account / Verified" UI Control in Lead Form
- **Exact URL(s):** `/contact`, `/solutions`
- **Exact File Path & Line Numbers:** `src/components/SiteVisitForm.tsx`, line `30` and lines `301–325`
- **Component Name:** `SiteVisitForm`
- **Description of Defect:** `SiteVisitForm.tsx` renders a clickable checkbox card with an official multi-color Google `"G"` SVG logo, the label `"Connect with Google account"`, subtext `"Share your Google email so D-VIEW can email your written quote"`, and a green `"Verified"` badge. However, there is no Google OAuth integration anywhere in the application—the `connectGoogle` boolean state on line 30 is completely unused dead state.
- **Reproduction Steps:**
  1. Navigate to `/contact` or `/solutions` and scroll to `#book-visit`.
  2. Observe the `"Connect with Google account / Verified"` checkbox with the Google `"G"` logo above the consent checkbox.
- **Browser / Code Evidence:**
  - `src/components/SiteVisitForm.tsx` lines `30` & `301–325`:
    ```tsx
    const [connectGoogle, setConnectGoogle] = useState(false);
    // ...
    <span className="text-xs font-bold text-slate-800">Connect with Google account</span>
    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#16A34A] border border-emerald-200 shrink-0">Verified</span>
    ```
  - Verified present on live production (`https://www.dviewsolutions.com/contact`).
- **Root Cause:** Confirmed — decorative/mock UI element left in production lead form.
- **Severity:** **Critical** | **Confidence:** **100% (Verified)**
- **Impact:** **Google Ads Misrepresentation / Phishing Risk & User Trust** — Impersonating a Google account connection or displaying a false `"Verified"` Google badge without actual OAuth functionality is a severe Google Ads destination/misrepresentation trigger.
- **Addressed in PR #1?** **Yes** (removed in PR #1).
- **Recommended Fix:** Remove `connectGoogle` state and the entire `"Connect with Google account"` JSX block from `src/components/SiteVisitForm.tsx`.
- **Verification Still Required:** Confirm removal in production HTML after deployment.

---

#### `ADS-02` — False "Free Site Visit Request Sent! ... Installer Notified" Confirmation Before Any Message Is Sent
- **Exact URL(s):** `/contact`, `/solutions`
- **Exact File Path & Line Numbers:** `src/components/SiteVisitForm.tsx`, lines `80–82` and `363–369`
- **Component Name:** `SiteVisitForm`
- **Description of Defect:** On form submission (`handleSubmit`), `SiteVisitForm.tsx` has no backend API or database submission. It simply calls `setIsSubmitted(true)` and `window.open(buildWhatsAppUrl(), '_blank')`. If the user's browser blocks popups, or if the user closes the WhatsApp tab without pressing Send, no lead is ever received by D-VIEW. Yet the page immediately displays: *"Free Site Visit Request Sent! Thank you, {name}. Our verified installer for {activeCity.name} ({finalArea}) has been notified."*
- **Reproduction Steps:**
  1. Navigate to `/contact#book-visit`.
  2. Enter Name `Audit User` and Phone `9876543210`, select an area, and click `SEND REQUEST ON WHATSAPP →`.
  3. Close or block the new WhatsApp tab and read the confirmation message on `/contact`.
- **Browser / Code Evidence:**
  - `src/components/SiteVisitForm.tsx` lines `80–82` & `363–367`:
    ```tsx
    setIsSubmitted(true);
    window.open(buildWhatsAppUrl(), '_blank', 'noopener,noreferrer');
    // ...
    <h3>Free Site Visit Request Sent!</h3>
    <p>Thank you, <strong>{name}</strong>. Our verified installer for <strong>{activeCity.name} ({finalArea})</strong> has been notified.</p>
    ```
- **Root Cause:** Confirmed — client-only `window.open` treated as a completed server-side notification.
- **Severity:** **Critical** | **Confidence:** **100% (Verified)**
- **Impact:** **Conversion Loss & Google Ads Trust** — Customers believe their request was already transmitted to an installer and may not press "Send" inside WhatsApp, losing real leads and misleading users.
- **Addressed in PR #1?** **Yes** (PR #1 changes the message to *"WhatsApp Inquiry Ready — We opened WhatsApp with your site visit details for {city} ({area}). Please press Send in WhatsApp to complete your inquiry"*).
- **Recommended Fix:** Apply PR #1's honest post-click messaging and provide a fallback direct clickable `wa.me` link in the confirmation view in case `window.open` was blocked by a popup blocker.
- **Verification Still Required:** Verify post-click state and fallback link in browser.

---

#### `SEO-01` — Canonical Domain, `astro.config.mjs`, `robots.txt`, and `sitemap.xml` Use Non-`www` (`https://dviewsolutions.com`) Which 308-Redirects to `https://www.dviewsolutions.com`
- **Exact URL(s):** All 41 routes, `/robots.txt`, `/sitemap.xml`
- **Exact File Path & Line Numbers:**
  - `astro.config.mjs` line `8` (`site: 'https://dviewsolutions.com'`)
  - `public/robots.txt` line `4` (`Sitemap: https://dviewsolutions.com/sitemap.xml`)
  - `public/sitemap.xml` lines `5–230` (all `<loc>` entries use `https://dviewsolutions.com/...`)
  - `src/layouts/Layout.astro` lines `19, 36, 39, 86, 95, 106`
  - All 11 page templates in `src/pages/*` (`canonicalUrl` props and JSON-LD URLs)
- **Component Name:** Global (`astro.config.mjs`, `Layout.astro`, all pages, `robots.txt`, `sitemap.xml`)
- **Description of Defect:** Live production on Vercel (`https://www.dviewsolutions.com/`) is configured with `www.dviewsolutions.com` as the primary domain: requesting `https://dviewsolutions.com/` returns `HTTP/2 308 Permanent Redirect` to `https://www.dviewsolutions.com/`, and requesting `http://dviewsolutions.com/` goes through a **2-hop redirect chain** (`http://dviewsolutions.com/` → `308` → `https://dviewsolutions.com/` → `308` → `https://www.dviewsolutions.com/` → `200`). However, every `<link rel="canonical">`, `og:url`, `og:image`, JSON-LD `url`, `robots.txt` Sitemap directive, and every `<loc>` in `public/sitemap.xml` points to non-`www` `https://dviewsolutions.com`!
- **Reproduction Steps:**
  1. Run `curl -sI -L http://dviewsolutions.com/` and `curl -sI https://dviewsolutions.com/`.
  2. Inspect `<link rel="canonical">` on `https://www.dviewsolutions.com/` (`<link rel="canonical" href="https://dviewsolutions.com">`).
- **Browser / Code Evidence:**
  ```text
  === http://dviewsolutions.com/ ===
  HTTP/1.0 308 Permanent Redirect -> Location: https://dviewsolutions.com/
  HTTP/2 308 -> location: https://www.dviewsolutions.com/
  HTTP/2 200
  ```
- **Root Cause:** Confirmed — codebase hardcodes `https://dviewsolutions.com` while Vercel DNS/domain settings enforce `https://www.dviewsolutions.com`.
- **Severity:** **Critical** | **Confidence:** **100% (Verified)**
- **Impact:** **Technical SEO & Google Ads Destination Policy** — Every page on `https://www.dviewsolutions.com` declares a canonical URL (`https://dviewsolutions.com/...`) that 308-redirects back to `www`, creating a canonical-redirect loop across 100% of pages and causing every URL in `sitemap.xml` to be a redirecting URL. In Google Ads, destination/canonical host mismatches can trigger destination mismatch or crawler friction.
- **Addressed in PR #1?** **No (UNFIXED in PR #1)** — PR #1 kept `https://dviewsolutions.com` (non-`www`) across all files.
- **Recommended Fix:** Either update `astro.config.mjs`, `public/robots.txt`, `public/sitemap.xml`, `src/layouts/Layout.astro`, and all `src/pages/*` canonical/schema URLs to `https://www.dviewsolutions.com` (matching live Vercel and the Google Ads destination URL), OR switch Vercel's primary domain to apex `dviewsolutions.com` (updating `https://www.dviewsolutions.com` everywhere is strongly recommended since Google Ads campaigns already use `https://www.dviewsolutions.com/`).
- **Verification Still Required:** Confirm whether Google Ads final URLs are configured with `https://www.dviewsolutions.com/`.

---

### 2. HIGH SEVERITY PROBLEMS

---

#### `NAV-01` — Top Navigation Bar (`Navbar.tsx`) Has Broken Hash Links (`#projects`, `#faq`, `#book-visit`, `#solutions`) Across 7 Core Pages
- **Exact URL(s):** `/about`, `/contact`, `/privacy`, `/sitemap`, `/solutions`, `/projects`, `/locations`
- **Exact File Path & Line Numbers:** `src/components/Navbar.tsx`, lines `138` (`href="#solutions"`), `204` (`href="#projects"`), `210` (`href="#faq"`), `222` (`href="#book-visit"`), `242` (`href="#book-visit"`), `277` (`href="#solutions"`), `325` (`href="#projects"`), `331` (`href="#faq"`), `340` (`href="#book-visit"`)
- **Component Name:** `Navbar`
- **Description of Defect:** `Navbar.tsx` was originally written for a single-page layout and uses same-page hash anchors (`#solutions`, `#projects`, `#faq`, `#book-visit`). However, `Navbar.tsx` is only mounted on the 7 standalone secondary pages (`/about`, `/contact`, `/privacy`, `/sitemap`, `/solutions`, `/projects`, `/locations`):
  - `#projects` and `#faq` do not exist on **any** of those 7 pages (100% dead clicks on both desktop and mobile navbars).
  - `#book-visit` (used by the primary `"Book Free Site Visit"` desktop CTA button, `"Free Visit"` mobile header button, and mobile drawer CTA button) does **not** exist on `/about`, `/privacy`, `/sitemap`, `/projects`, or `/locations`—clicking `"Book Free Site Visit"` in the top navbar on those 5 pages does nothing!
  - `#solutions` on desktop accidentally points to `<div id="solutions" className="relative group">` inside `Navbar.tsx` itself (line 135), and on `/solutions` the actual services section has `id="services"` (`ServicesGrid.astro` line 43), not `id="solutions"`.
- **Reproduction Steps:**
  1. Open `/about`, `/locations`, `/projects`, `/privacy`, or `/sitemap`.
  2. Click `Projects`, `FAQ`, or the green `Book Free Site Visit` button in the top navigation bar.
  3. Observe that the URL appends `#projects`, `#faq`, or `#book-visit`, and the page does not navigate or scroll anywhere.
- **Browser / Code Evidence:**
  - Playwright `brokenSamePageAnchors` on `/about`, `/privacy`, `/sitemap`, `/projects`, `/locations`:
    ```json
    [{"href":"#projects","text":"Projects"},{"href":"#faq","text":"FAQ"},{"href":"#book-visit","text":"Book Free Site Visit"},{"href":"#book-visit","text":"Free Visit"}]
    ```
- **Root Cause:** Confirmed — relative hash links (`#...`) used in shared multi-page `Navbar.tsx` component instead of routed paths (`/solutions`, `/projects`, `/#faq`, `/contact#book-visit`).
- **Severity:** **High** | **Confidence:** **100% (Verified)**
- **Impact:** **Conversion, Google Ads Destination Quality & UX** — Primary conversion CTA (`Book Free Site Visit`) and top nav links in the header are dead on 5 of the 7 core pages.
- **Addressed in PR #1?** **No (UNFIXED in PR #1)**.
- **Recommended Fix:** Update `src/components/Navbar.tsx` links to full routes: `href="/solutions"` for Solutions, `href="/projects"` for Projects, `href="/#faq"` for FAQ, and `href="/contact#book-visit"` (or `#book-visit` when already on `/contact` or `/solutions`) for the booking CTA buttons. Also remove `id="solutions"` from the navbar dropdown `<div>` on line 135.
- **Verification Still Required:** Re-test all `Navbar.tsx` links across all 7 pages on desktop and mobile after fixing.

---

#### `NAV-02` — 6 Broken Cross-Page Footer & Sitemap Anchor Links (`/contact#faq`, `/about#maintenance`, `/about#warranty`, `/about#metallurgy`, `/about#standards`, `/about#fire-safety`) Across All 41 Pages
- **Exact URL(s):** All 41 routes (via `Footer.astro`, `DViewWebsite.tsx`, and `src/pages/sitemap.astro`)
- **Exact File Path & Line Numbers:**
  - `src/components/Footer.astro` lines `146, 151, 156, 179, 184, 189`
  - `src/components/DViewWebsite.tsx` lines `1656, 1661, 1666, 1679, 1684, 1689`
  - `src/pages/sitemap.astro` lines `164, 169, 202`
- **Component Name:** `Footer`, `DViewWebsite`, `sitemap.astro`
- **Description of Defect:** On `main`, the footer on all 41 pages and the HTML sitemap on `/sitemap` link to 6 section anchors that do not exist on their target pages:
  - `/contact#faq` (`#faq` does not exist on `/contact`)
  - `/about#maintenance`, `/about#warranty`, `/about#metallurgy`, `/about#standards`, `/about#fire-safety` (none of these IDs exist on `/about`).
  - Furthermore, while PR #1 updated `Footer.astro` and `DViewWebsite.tsx`, PR #1 changed `/about#maintenance` to `/solutions#maintenance`—and `#maintenance` **does not exist on `/solutions` either**! And PR #1 completely missed `src/pages/sitemap.astro` lines `164, 169, 202`, which still link to `/about#standards`, `/about#fire-safety`, and `/contact#faq`.
- **Reproduction Steps:**
  1. Scroll to the footer on any page or visit `/sitemap`.
  2. Click `Balcony Safety FAQ` (`/contact#faq`), `10-Year Anti-Rust Warranty` (`/about#warranty`), `ASTM B117 Certification` (`/about#standards`), etc.
  3. Verify via `document.getElementById(...)` on the destination page that the target anchor ID returns `null`.
- **Browser / Code Evidence:**
  - Playwright cross-page anchor audit (`audit_output.json`):
    ```json
    {"link": "/contact#faq", "exists": false, "foundOnCount": 42},
    {"link": "/about#maintenance", "exists": false, "foundOnCount": 41},
    {"link": "/about#warranty", "exists": false, "foundOnCount": 41},
    {"link": "/about#metallurgy", "exists": false, "foundOnCount": 41},
    {"link": "/about#standards", "exists": false, "foundOnCount": 42},
    {"link": "/about#fire-safety", "exists": false, "foundOnCount": 42}
    ```
- **Root Cause:** Confirmed — target pages (`/about`, `/contact`, `/solutions`) were built without matching `id` attributes on their sections.
- **Severity:** **High** | **Confidence:** **100% (Verified)**
- **Impact:** **UX, SEO & Google Ads Destination Quality** — Broken anchor targets across all 41 pages and on `/sitemap`.
- **Addressed in PR #1?** **Partially** (`Footer.astro` and `DViewWebsite.tsx` updated in PR #1, but `/solutions#maintenance` still has no matching `id="maintenance"` on `/solutions`, and `src/pages/sitemap.astro` was not updated).
- **Recommended Fix:** Add explicit `id` attributes (`id="metallurgy"`, `id="standards"`, `id="maintenance"`, etc.) to the corresponding sections on `/about` and `/solutions`, and update `Footer.astro`, `DViewWebsite.tsx`, and `src/pages/sitemap.astro` so every hash link resolves to an existing DOM `id`.
- **Verification Still Required:** Re-run cross-page anchor verification script to confirm 0 missing target IDs.

---

#### `NAV-03` — Broken `#formula` ("About") Header Link on All 22 City & Location Pages
- **Exact URL(s):** `/vizag`, `/visakhapatnam`, `/rajahmundry`, `/rajamahendravaram`, `/vijayawada`, `/amaravati`, `/vijayawada-amaravati`, `/guntur`, `/kakinada`, `/nellore`, `/ongole`, and all 11 `/locations/*` equivalents
- **Exact File Path & Line Numbers:** `src/pages/[city].astro` line `77`; `src/pages/locations/[location].astro` line `77`
- **Component Name:** `[city].astro`, `locations/[location].astro`
- **Description of Defect:** Both templates render `<a href="#formula" class="text-xs font-bold text-slate-600 hover:text-[#16A34A] transition uppercase tracking-wider">About</a>` in the desktop header navigation. Neither page renders `FormulaSection.astro` or any element with `id="formula"`, making the `"About"` link in the header completely non-functional on all 22 city/location pages.
- **Reproduction Steps:**
  1. Open `/vizag` or `/locations/vizag` on desktop (`1440×900`).
  2. Click `About` in the top navigation bar.
  3. Observe that `#formula` is appended to the URL, but no scroll or navigation occurs.
- **Browser / Code Evidence:**
  - Playwright `brokenSamePageAnchors` on all 22 city/location routes: `[{"href":"#formula","text":"About"}]`.
- **Root Cause:** Confirmed — `FormulaSection.astro` (which had `id="formula"`) was removed from the page template, leaving a dangling `#formula` link.
- **Severity:** **High** | **Confidence:** **100% (Verified)**
- **Impact:** **Navigation & UX** — Broken top-level navigation item across 22 landing pages.
- **Addressed in PR #1?** **No (UNFIXED in PR #1)**.
- **Recommended Fix:** Change `href="#formula"` to `href="/about"` (or point to the engineering section on the same page) in `src/pages/[city].astro` and `src/pages/locations/[location].astro`.
- **Verification Still Required:** Verify click behavior on desktop and mobile after fix.

---

#### `NAV-04` — All 17 "Book Similar in {City}" Project Card CTAs on `/projects` Target Non-Existent `#book-visit` Anchor on `/locations/{slug}`
- **Exact URL(s):** `/projects`
- **Exact File Path & Line Numbers:** `src/pages/projects/index.astro`, line `76`
- **Component Name:** `projects/index.astro`
- **Description of Defect:** All 17 project cards on `/projects` render a CTA link `<a href={\`/locations/${project.citySlug}#book-visit\`}>Book Similar in {project.cityName}</a>`. However, `src/pages/locations/[location].astro` does not contain a form or any element with `id="book-visit"`.
- **Reproduction Steps:**
  1. Open `/projects` and click `Book Similar in Visakhapatnam →` on any project card.
  2. The browser navigates to `/locations/visakhapatnam#book-visit`, landing at the top of the page because `#book-visit` does not exist.
- **Browser / Code Evidence:**
  - Playwright cross-page anchor audit confirmed `exists: false` for `/locations/rajahmundry#book-visit`, `/locations/visakhapatnam#book-visit`, `/locations/vijayawada-amaravati#book-visit`, `/locations/kakinada#book-visit`, `/locations/guntur#book-visit`, `/locations/nellore#book-visit`, and `/locations/ongole#book-visit`.
- **Root Cause:** Confirmed — `/locations/[location].astro` does not mount `SiteVisitForm` or define `id="book-visit"`.
- **Severity:** **High** | **Confidence:** **100% (Verified)**
- **Impact:** **Conversion Friction** — High-intent users clicking `"Book Similar"` on a project card are dropped at the top of a generic city page instead of a booking form.
- **Addressed in PR #1?** **No (UNFIXED in PR #1)**.
- **Recommended Fix:** Either link `"Book Similar in {project.cityName}"` to `/contact?city=${project.citySlug}#book-visit` or add `id="book-visit"` to the bottom booking CTA section (or mount `SiteVisitForm`) on `[city].astro` / `locations/[location].astro`.
- **Verification Still Required:** Verify CTA lands directly on an active booking section/form.

---

#### `SEO-03` — Massive Duplicate Content & Self-Canonicalizing Alias/Location Pages (22 City/Location Pages + 11 Safety Pillar Pages for 7 Actual Cities)
- **Exact URL(s):** All 11 `/[city]` routes, all 11 `/locations/[location]` routes, and all 11 `/safety-pillars/[city]` routes
- **Exact File Path & Line Numbers:** `src/pages/[city].astro` (lines `1–400`), `src/pages/locations/[location].astro` (lines `1–400`), `src/pages/safety-pillars/[city].astro` (lines `1–125`)
- **Component Name:** `[city].astro`, `locations/[location].astro`, `safety-pillars/[city].astro`
- **Description of Defect:**
  1. `src/pages/[city].astro` and `src/pages/locations/[location].astro` are **100% identical templates** rendering the exact same `CITIES_DATA` content.
  2. Because both templates also generate all alias slugs (`vizag`, `visakhapatnam`, `rajahmundry`, `rajamahendravaram`, `vijayawada`, `amaravati`, `vijayawada-amaravati`), the site generates:
     - **6 identical pages for Vijayawada-Amaravati:** `/vijayawada`, `/amaravati`, `/vijayawada-amaravati`, `/locations/vijayawada`, `/locations/amaravati`, `/locations/vijayawada-amaravati`
     - **4 identical pages for Visakhapatnam:** `/vizag`, `/visakhapatnam`, `/locations/vizag`, `/locations/visakhapatnam`
     - **4 identical pages for Rajahmundry:** `/rajahmundry`, `/rajamahendravaram`, `/locations/rajahmundry`, `/locations/rajamahendravaram`
     - **2 identical pages each for Guntur, Kakinada, Nellore, Ongole:** `/{city}` and `/locations/{city}`
  3. On `main`, every single one of these 22 URLs self-canonicalizes (`canonicalUrl: https://dviewsolutions.com/...`) and is listed in `public/sitemap.xml`.
  4. Internal links are split across these duplicate URLs: `Navbar.tsx` and `/locations` link to `/locations/{slug}` (e.g. `/locations/visakhapatnam`), while `Footer.astro`, `DViewWebsite.tsx`, and `/sitemap` link to `/{slug}` (e.g. `/vizag`)! Even in PR #1, `/vizag` is canonicalized to `/visakhapatnam/`, while `Footer.astro` still links every user and crawler to `/vizag` and `/safety-pillars/vizag?corridor=...`!
- **Reproduction Steps:**
  1. Compare `diff -u src/pages/\[city\].astro src/pages/locations/\[location\].astro` (only the `canonicalUrl` string on line 32 differs on `main`).
  2. Visit `/vizag`, `/visakhapatnam`, `/locations/vizag`, and `/locations/visakhapatnam` and observe identical titles, H1s, copy, images, and FAQs.
- **Browser / Code Evidence:**
  - `diff -u src/pages/[city].astro src/pages/locations/[location].astro` shows 1 line difference out of 400 lines.
- **Root Cause:** Confirmed — duplicate Astro route templates and alias proliferation without redirects or unified internal linking.
- **Severity:** **High** | **Confidence:** **100% (Verified)**
- **Impact:** **SEO Index Bloat / Doorway Page Risk & Crawl Dilution** — Having 4 to 6 identical URLs per city with split internal links dilutes ranking signals and risks triggering Google's doorway/duplicate content filters.
- **Addressed in PR #1?** **Partially** (PR #1 consolidates `<link rel="canonical">` tags to `/{primaryCitySlug}/` and removes 9 aliases from `sitemap.xml`, but leaves all `/locations/*` URLs in `sitemap.xml` even though their canonical in PR #1 points to `/{primaryCitySlug}/`—putting non-canonical URLs inside `sitemap.xml`!—and leaves internal links pointing to `/vizag` and `/locations/*`).
- **Recommended Fix:** Decide on ONE canonical URL pattern per city (e.g., `/visakhapatnam/`, `/rajahmundry/`, `/vijayawada/`, `/guntur/`, `/kakinada/`, `/nellore/`, `/ongole/`), ensure `sitemap.xml` contains **only** the canonical URLs (never include non-canonical `/locations/*` URLs in `sitemap.xml` if they canonicalize to `/{city}/`), and update internal links in `Navbar.tsx`, `Footer.astro`, `DViewWebsite.tsx`, and `/locations` to point consistently to the primary canonical URLs.
- **Verification Still Required:** Verify `sitemap.xml` `<loc>` list matches `<link rel="canonical">` 1:1.

---

#### `PRIV-02` — Pre-Checked Consent Checkbox and Misdirected Privacy Policy Link (`href="/about"`) in `SiteVisitForm.tsx`
- **Exact URL(s):** `/contact`, `/solutions`
- **Exact File Path & Line Numbers:** `src/components/SiteVisitForm.tsx`, lines `29` and `337`
- **Component Name:** `SiteVisitForm`
- **Description of Defect:**
  1. Line 29 initializes `const [consentAgreed, setConsentAgreed] = useState(true);`, pre-checking the user consent checkbox by default instead of requiring affirmative opt-in.
  2. Line 337 links `"Privacy Policy"` inside the consent statement to `<a href="/about">` instead of `<a href="/privacy">`.
- **Reproduction Steps:**
  1. Open `/contact` or `/solutions` and scroll to `#book-visit`.
  2. Inspect the consent checkbox (already checked on page load) and click `"Privacy Policy"` (navigates to `/about`).
- **Browser / Code Evidence:**
  - Playwright `contactFormAudit.initialState`:
    ```json
    {"checked": true, "parentText": "I agree that D-VIEW may share my project details... See the Privacy Policy."},
    "privacyLink": "/about"
    ```
- **Root Cause:** Confirmed — hardcoded `useState(true)` and wrong `href="/about"`.
- **Severity:** **High** | **Confidence:** **100% (Verified)**
- **Impact:** **Privacy Compliance (India DPDP Act / Google Ads Consent Standards) & User Trust** — Pre-checked consent is invalid under modern privacy standards, and linking Privacy Policy to `/about` misleads users looking for data terms.
- **Addressed in PR #1?** **Yes** (`useState(false)` and `href="/privacy"` in PR #1).
- **Recommended Fix:** Apply PR #1's changes (`useState(false)` and `href="/privacy"`).
- **Verification Still Required:** Verify unchecked initial state and `/privacy` destination after deployment.

---

#### `FORM-01` — `/contact?city={slug}#book-visit` Ignores `?city=` Query Parameter and Defaults to Rajahmundry
- **Exact URL(s):** `/contact?city=vizag#book-visit`, `/contact?city=vijayawada#book-visit`, etc. (linked from all 22 `/[city]` and `/locations/[location]` pages)
- **Exact File Path & Line Numbers:** `src/components/SiteVisitForm.tsx` line `18`; `src/pages/[city].astro` lines `151, 385`; `src/pages/locations/[location].astro` lines `151, 385`
- **Component Name:** `SiteVisitForm`
- **Description of Defect:** All 22 city and location pages link their primary hero and footer CTAs (`Book Free Site Visit`) to `/contact?city=${slug}#book-visit`. However, on `main`, `SiteVisitForm.tsx` never reads `window.location.search`, so a user clicking from `/vizag` or `/nellore` lands on `/contact` with `Rajahmundry (East Godavari)` selected in the city dropdown.
- **Reproduction Steps:**
  1. Navigate to `/contact?city=vizag#book-visit`.
  2. Check the value of `SELECT CITY HUB *` in `#book-visit`.
- **Browser / Code Evidence:**
  - Playwright `contactFormAudit.initialState.selects`:
    ```json
    [{"value": "rajahmundry", "selectedText": "Rajahmundry (East Godavari)"}, {"value": "", "selectedText": "Select your area in Rajahmundry"}]
    ```
- **Root Cause:** Confirmed — missing `URLSearchParams` reader in `SiteVisitForm.tsx` on `main`.
- **Severity:** **High** | **Confidence:** **100% (Verified)**
- **Impact:** **Conversion Accuracy & UX** — Users from Visakhapatnam, Vijayawada, Guntur, Kakinada, Nellore, or Ongole can accidentally submit leads tagged for Rajahmundry.
- **Addressed in PR #1?** **Yes** (PR #1 adds a `useEffect` in `SiteVisitForm.tsx` mapping `?city=` aliases and slugs to `ALL_LOCATIONS`).
- **Recommended Fix:** Apply PR #1's `?city=` query parameter parsing in `SiteVisitForm.tsx`.
- **Verification Still Required:** Test `/contact?city=vizag#book-visit` and `/contact?city=amaravati#book-visit` in browser.

---

#### `FORM-02` — `/contact?reason={category}` From All 12 Problem Slider Cards on 22 City Pages Ignores `?reason=`, Loses City Context, and Lacks `#book-visit` Scroll Anchor
- **Exact URL(s):** `/contact?reason=Child%20Safety`, `/contact?reason=Pet%20Protection`, `/contact?reason=Pigeon%20Control`, `/contact?reason=Weather%20Durability`, `/contact?reason=Aesthetics%20%26%20View`, `/contact?reason=Emergency%20Fire%20Exit`, `/contact?reason=Elderly%20Safety`, `/contact?reason=Society%20Compliance`
- **Exact File Path & Line Numbers:** `src/components/HorizontalProblemSlider.tsx` line `364`; `src/components/SiteVisitForm.tsx` lines `18–26`
- **Component Name:** `HorizontalProblemSlider`, `SiteVisitForm`
- **Description of Defect:** On all 22 city/location pages, `HorizontalProblemSlider.tsx` renders 12 cards where each card's CTA button links to `href={\`/contact?reason=${encodeURIComponent(card.category)}\`}` (line 364). Three defects occur when clicked:
  1. It omits `city=${cityName}` (so a user on `/vizag` loses their Visakhapatnam city selection and defaults to Rajahmundry on `/contact`).
  2. It omits `#book-visit` (so the user lands at the top of `/contact` instead of scrolling to the form).
  3. `SiteVisitForm.tsx` (both on `main` AND in PR #1) completely ignores `?reason=`, neither pre-filling the note nor displaying the selected safety concern in the WhatsApp message.
- **Reproduction Steps:**
  1. Visit `/vizag` and scroll to the `"Everyday Balcony Risks Solved Permanently"` horizontal slider.
  2. Click any card CTA (e.g., `Get Child Safety Quote →`).
  3. Observe navigation to `/contact?reason=Child%20Safety` at the top of the page, with Rajahmundry selected and `Child Safety` completely ignored.
- **Browser / Code Evidence:**
  - `src/components/HorizontalProblemSlider.tsx` line 364:
    ```tsx
    href={`/contact?reason=${encodeURIComponent(card.category)}`}
    ```
- **Root Cause:** Confirmed — incomplete query parameter passing in `HorizontalProblemSlider.tsx` and missing `?reason=` handler in `SiteVisitForm.tsx`.
- **Severity:** **High** | **Confidence:** **100% (Verified)**
- **Impact:** **Conversion & UX** — Affects 12 interactive CTA cards across all 22 city/location landing pages (264 CTA instances total).
- **Addressed in PR #1?** **No (UNFIXED in PR #1)**.
- **Recommended Fix:** Update `HorizontalProblemSlider.tsx` to include city context and `#book-visit` (`href={\`/contact?city=${encodeURIComponent(cityName.toLowerCase())}&reason=${encodeURIComponent(card.category)}#book-visit\`}`), and update `SiteVisitForm.tsx` to read `?reason=` and include it in the inquiry note/WhatsApp payload.
- **Verification Still Required:** Test clicking a problem card on `/vizag` and verifying both city and reason populate `#book-visit`.

---

#### `TRUST-01` — Unverified `AggregateRating` (`4.9` Stars / `320` Reviews) Hardcoded in Global `HomeAndConstructionBusiness` JSON-LD Schema Across All 41 Pages
- **Exact URL(s):** All 41 routes
- **Exact File Path & Line Numbers:** `src/layouts/Layout.astro`, lines `62–67`
- **Component Name:** `Layout.astro`
- **Description of Defect:** `Layout.astro` injects a `HomeAndConstructionBusiness` JSON-LD block on all 41 pages containing:
  ```json
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "320",
    "bestRating": "5"
  }
  ```
  There are no customer reviews, rating widgets, or links to a verified Google Business Profile with 320 reviews anywhere on the website. Furthermore, Google Search Central guidelines explicitly forbid self-serving `AggregateRating` markup on `LocalBusiness` / `HomeAndConstructionBusiness` entities controlled by the business itself unless backed by visible, verifiable reviews on the page.
- **Reproduction Steps:**
  1. View page source on any of the 41 routes.
  2. Inspect the first `<script type="application/ld+json">` block.
- **Browser / Code Evidence:**
  - `src/layouts/Layout.astro` lines `62–67`.
- **Root Cause:** Confirmed — hardcoded `aggregateRating` in global schema template without visible review evidence.
- **Severity:** **High** | **Confidence:** **100% (Verified)**
- **Impact:** **Google Search Structured Data Spam Risk & Google Ads Misrepresentation Risk** — Self-serving unverified `AggregateRating` schema can trigger a Google Search Manual Action for structured data spam and reinforces misrepresentation concerns during ad destination reviews.
- **Addressed in PR #1?** **No (UNFIXED in PR #1)**.
- **Recommended Fix:** Remove the hardcoded `aggregateRating` block from `src/layouts/Layout.astro` unless and until verifiable, genuine customer reviews are displayed and documented.
- **Verification Still Required:** Confirm with business owner whether an official Google Business Profile exists and what its actual review count is.

---

#### `TRUST-02` — Contradictory Warranty Claims Across Pages (`10-Year Replacement Warranty` vs `5 to 10-year warranty`)
- **Exact URL(s):** `/`, `/about`, `/privacy`, `/locations`, `/nellore`, `/ongole`, `/locations/nellore`, `/locations/ongole`
- **Exact File Path & Line Numbers:**
  - `src/components/WhyDView.astro` line `33` (rendered on `/about`): `"5 to 10-year warranty depending on coastal or inland installation"`
  - `src/data/locations.ts` lines `702` (Nellore) and `797` (Ongole): `"Yes, D-VIEW provides a 5 to 10-year warranty on coastal and inland installations..."`
  - `src/pages/privacy.astro` line `59`: `"10-Year Replacement Warranty"`
  - `src/components/DViewWebsite.tsx` lines `1402, 1567`: `"10-Year Anti-Rust Guaranteed"` / `"10-Year Replacement Warranty"`
- **Component Name:** `WhyDView.astro`, `locations.ts`, `privacy.astro`, `DViewWebsite.tsx`
- **Description of Defect:** The homepage, `/privacy#legal`, and city hero sections promise an unconditional `"10-Year Anti-Rust & Tension Warranty"` / `"10-Year Replacement Warranty"`, whereas `/about` (`WhyDView.astro` line 33) and the FAQ data for Nellore and Ongole (`src/data/locations.ts` lines 702, 797) state that the warranty is `"5 to 10-year warranty depending on coastal or inland installation"`.
- **Reproduction Steps:**
  1. Visit `/about` and read the `"Warranty Backed"` card (`5 to 10-year warranty depending on coastal or inland installation`).
  2. Visit `/privacy#legal` or `/` and read `"10-Year Replacement Warranty"`.
- **Browser / Code Evidence:**
  - Exact text mismatch verified across `WhyDView.astro:33`, `locations.ts:702,797`, and `privacy.astro:59`.
- **Root Cause:** Confirmed — inconsistent copy across older and newer data/component files.
- **Severity:** **High** | **Confidence:** **100% (Verified)**
- **Impact:** **Google Ads Misrepresentation & Customer Trust** — Contradictory warranty durations (`5 to 10-year` vs `10-Year Replacement`) on the same website undermine commercial clarity.
- **Addressed in PR #1?** **No (UNFIXED in PR #1)**.
- **Recommended Fix:** Confirm the exact written warranty policy with the business owner and align all pages (`/about`, `/privacy#legal`, `locations.ts`, `DViewWebsite.tsx`, `[city].astro`) to the single accurate warranty statement.
- **Verification Still Required:** Business owner confirmation of exact warranty terms (5-year vs 10-year for coastal vs inland).

---

#### `PERF-01` — PR #1 Regression Risk: Full-Viewport Fixed `#page-loader` (`z-index: 99999`) Blocks Every Page Navigation for `420ms`
- **Exact URL(s):** All 41 routes (in branch `origin/audit/ads-trust-privacy-loader-20261017` / PR #1)
- **Exact File Path & Line Numbers:** `src/layouts/Layout.astro` (in PR #1, lines `147–184`)
- **Component Name:** `Layout.astro`
- **Description of Defect:** PR #1 adds a full-screen opaque white loading overlay (`<div id="page-loader" style="position:fixed;inset:0;z-index:99999;...background:#FFFFFF;opacity:1;">`) to `Layout.astro` that artificially waits `setTimeout(dismiss, 420)` after `DOMContentLoaded` (plus a `280ms` CSS opacity transition = **`700ms` total delay**) on **every single page load and link click** across all 41 static pages!
- **Reproduction Steps:**
  1. Inspect `git diff main..origin/audit/ads-trust-privacy-loader-20261017 -- src/layouts/Layout.astro`.
  2. Observe `<div id="page-loader">` with `setTimeout(dismiss, 420)`.
- **Browser / Code Evidence:**
  - `git diff main..origin/pr/1/head -- src/layouts/Layout.astro`:
    ```html
    <div id="page-loader" aria-hidden="true" style="position:fixed;inset:0;z-index:99999;display:flex;...background:#FFFFFF;opacity:1;transition:opacity 0.28s ease;">
    ```
- **Root Cause:** Confirmed — artificial `420ms` `setTimeout` full-screen overlay added in PR #1 on a fast static Astro site that needs no loader at all.
- **Severity:** **High** | **Confidence:** **100% (Verified)**
- **Impact:** **Performance (LCP/FCP Perception), Mobile UX & Google Ads Landing Page Experience** — Delays visual content display by `420ms–700ms` on every page navigation and risks blank-screen snapshots in automated ad-review screenshots.
- **Addressed in PR #1?** **Introduced by PR #1** (not present on `main`).
- **Recommended Fix:** Do **not** include the `#page-loader` overlay when merging or applying fixes from PR #1; static Astro pages render instantaneously without a blocking overlay.
- **Verification Still Required:** None (code confirmed in PR #1 diff).

---

### 3. MEDIUM SEVERITY PROBLEMS

---

#### `SEO-02` — Trailing Slash Mismatch Between `<link rel="canonical">` (No Slash on `main`) and `public/sitemap.xml` (Trailing Slash)
- **Exact URL(s):** All 40 non-root routes
- **Exact File Path & Line Numbers:** `src/layouts/Layout.astro` line `19`; `public/sitemap.xml` lines `12–228`; `astro.config.mjs`
- **Component Name:** `Layout.astro`, `public/sitemap.xml`
- **Description of Defect:** On `main`, every page passes `canonicalUrl` without a trailing slash (e.g., `https://dviewsolutions.com/about`), while `public/sitemap.xml` lists every URL with a trailing slash (e.g., `https://dviewsolutions.com/about/`). On live Vercel, both `/about` and `/about/` return `HTTP 200` without redirecting one to the other.
- **Reproduction Steps:**
  1. Compare `<link rel="canonical" href="https://dviewsolutions.com/about">` on `/about` with `<loc>https://dviewsolutions.com/about/</loc>` in `/sitemap.xml`.
- **Root Cause:** Confirmed — manual `canonicalUrl` strings omitted trailing slashes while `sitemap.xml` included them, and `astro.config.mjs` did not set `trailingSlash`.
- **Severity:** **Medium** | **Confidence:** **100% (Verified)**
- **Impact:** **Technical SEO** — Split canonical vs sitemap signals across all 40 subpages.
- **Addressed in PR #1?** **Yes** (normalized in `Layout.astro` in PR #1, though `astro.config.mjs` still lacks an explicit `trailingSlash` setting and uses non-`www`).
- **Recommended Fix:** Normalize all canonicals, internal links, and `sitemap.xml` to a single trailing-slash convention on `https://www.dviewsolutions.com`.
- **Verification Still Required:** Check `<link rel="canonical">` across all 41 built HTML files after fix.

---

#### `SEO-04` — `safety-pillars/[city].astro` Defines Consolidated `cityMeta.canonical` on Lines 42–72 But Never Uses It on Line 83
- **Exact URL(s):** `/safety-pillars/visakhapatnam`, `/safety-pillars/rajamahendravaram`, `/safety-pillars/amaravati`, `/safety-pillars/vijayawada-amaravati`
- **Exact File Path & Line Numbers:** `src/pages/safety-pillars/[city].astro`, lines `42–72` and line `83`
- **Component Name:** `safety-pillars/[city].astro`
- **Description of Defect:** In `src/pages/safety-pillars/[city].astro` on `main`, the `CITY_SEO` dictionary defines a `canonical` field on every entry (lines `45, 49, 53, 57, 61, 65, 69`), mapping aliases to primary slugs. However, line `83` ignores `cityMeta.canonical` and passes `canonicalUrl={\`https://dviewsolutions.com/safety-pillars/${slug}\`}` to `<Layout>`.
- **Reproduction Steps:**
  1. Inspect `src/pages/safety-pillars/[city].astro` lines `42–85`.
  2. Visit `/safety-pillars/visakhapatnam` and observe `<link rel="canonical" href="https://dviewsolutions.com/safety-pillars/visakhapatnam">` instead of the value in `cityMeta.canonical`.
- **Root Cause:** Confirmed — coding oversight on line 83 of `src/pages/safety-pillars/[city].astro`.
- **Severity:** **Medium** | **Confidence:** **100% (Verified)**
- **Impact:** **Technical SEO** — Duplicate alias pages under `/safety-pillars/*` self-canonicalize on `main`.
- **Addressed in PR #1?** **Yes** (fixed in PR #1).
- **Recommended Fix:** Use the consolidated canonical URL (with `https://www.dviewsolutions.com`) in `src/pages/safety-pillars/[city].astro`.
- **Verification Still Required:** Verify built HTML `<link rel="canonical">` on all 11 `/safety-pillars/*` routes.

---

#### `SEO-05` — Homepage (`/`) Has 8 `<h1>` Tags in the DOM (0 Visible on Desktop, 7 Visible on Mobile)
- **Exact URL(s):** `/`
- **Exact File Path & Line Numbers:** `src/pages/index.astro` line `32`; `src/components/DViewWebsite.tsx` line `2148` (mobile slide `<h1>`) vs line `2222` (desktop slide `<h2>`)
- **Component Name:** `index.astro`, `DViewWebsite`
- **Description of Defect:**
  1. `src/pages/index.astro` line 32 renders `<h1 class="sr-only">D-VIEW Solutions — Certified SS-316 Marine-Grade Invisible Balcony Grills in Andhra Pradesh</h1>`.
  2. Inside `DViewWebsite.tsx`, the 7-city hero slider renders a mobile layout (`sm:hidden`) where each of the 7 slides uses an `<h1>` tag (`<h1 className="text-lg sm:text-xl font-black text-white uppercase...">Invisible Grills in {slide.cityShort}</h1>`, line 2148), while the desktop layout (`hidden sm:flex`) uses an `<h2>` tag (line 2222).
  3. Consequently, `/` has **8 `<h1>` tags in the DOM**, **0 visible `<h1>` tags on desktop (`1440×900`)**, and **7 visible `<h1>` tags on mobile (`390×844`)**!
- **Reproduction Steps:**
  1. Load `/` in browser and run `document.querySelectorAll('h1')` (returns 8 elements).
  2. At `1440×900`, filter by `el.offsetParent !== null && !el.classList.contains('sr-only')` (returns `0` visible `<h1>`s).
  3. At `390×844`, filter by `el.offsetParent !== null && !el.classList.contains('sr-only')` (returns `7` visible `<h1>`s).
- **Browser / Code Evidence:**
  - Playwright `/` audit: `h1=8 (D=0, M=7)`.
- **Root Cause:** Confirmed — mobile slide loop uses `<h1>` while desktop slide loop uses `<h2>`, combined with a hidden `sr-only` `<h1>` in `index.astro`.
- **Severity:** **Medium** | **Confidence:** **100% (Verified)**
- **Impact:** **On-Page SEO & Accessibility** — Ambiguous primary heading hierarchy on the homepage.
- **Addressed in PR #1?** **No (UNFIXED in PR #1)**.
- **Recommended Fix:** Change line 2148 of `DViewWebsite.tsx` from `<h1>` to `<h2>` (matching desktop line 2222), and render a single visible primary `<h1>` on the homepage (or only render `<h1>` on the active slide).
- **Verification Still Required:** Verify `document.querySelectorAll('h1').length === 1` on `/` across both viewports.

---

#### `SEO-06` — `safety-pillars/[city].astro` Reads `Astro.url.searchParams.get('corridor')` in Static Build Mode (`output: "static"`), Always Producing `undefined` in SSR HTML
- **Exact URL(s):** All 37 `/safety-pillars/{city}?corridor={area}` URLs
- **Exact File Path & Line Numbers:** `src/pages/safety-pillars/[city].astro`, line `36`
- **Component Name:** `safety-pillars/[city].astro`
- **Description of Defect:** Line 36 of `src/pages/safety-pillars/[city].astro` executes `const corridorParam = Astro.url.searchParams.get('corridor') || undefined;`. Because the Astro project builds static files (`output: "static"`), `Astro.url.searchParams` is evaluated only once at build time when no query string exists. Therefore, the pre-rendered HTML for `/safety-pillars/vizag?corridor=Rushikonda` always has `initialCorridor={undefined}` and generic city metadata; the corridor only updates client-side after React hydrates (`DViewWebsite.tsx` lines `1157–1175`).
- **Reproduction Steps:**
  1. Fetch raw HTML of `/safety-pillars/vizag?corridor=Rushikonda` via `curl` and compare with `/safety-pillars/vizag`.
  2. Observe identical static HTML (`Focused Corridor: Visakhapatnam`).
- **Root Cause:** Confirmed — `Astro.url.searchParams` cannot read runtime query strings in a static (`SSG`) build.
- **Severity:** **Medium** | **Confidence:** **100% (Verified)**
- **Impact:** **SEO & Crawlability** — Search engine crawlers indexing the 37 `?corridor=` footer links receive identical pre-hydration HTML to the parent `/safety-pillars/{city}` page.
- **Addressed in PR #1?** **No (UNFIXED in PR #1)**.
- **Recommended Fix:** Keep canonical tags pointing to the parent `/safety-pillars/{city}/` route (so crawlers do not treat `?corridor=` query parameters as 37 duplicate indexable pages) and remove the misleading build-time `Astro.url.searchParams.get('corridor')` call in `safety-pillars/[city].astro` (since `DViewWebsite.tsx` already reads `window.location.search` on mount).
- **Verification Still Required:** None.

---

#### `MOB-01` — Mobile Horizontal Viewport Overflow (`392px–395px` > `390px`) on 5 Rajahmundry / Rajamahendravaram Routes
- **Exact URL(s):** `/rajahmundry`, `/rajamahendravaram`, `/locations/rajahmundry`, `/locations/rajamahendravaram`, `/safety-pillars/rajahmundry`
- **Exact File Path & Line Numbers:**
  - `src/pages/[city].astro` lines `58–96` (specifically line `66`: service area pill in header)
  - `src/pages/locations/[location].astro` lines `58–96`
  - `src/components/DViewWebsite.tsx` lines `1945–2003` (header bar on `/safety-pillars/rajahmundry`)
- **Component Name:** `[city].astro`, `locations/[location].astro`, `DViewWebsite.tsx`
- **Description of Defect:** At a standard `390×844` mobile viewport (iPhone 12/13/14/15), the long city name `"Rajamahendravaram"` (17 characters) inside the top sticky header badge (`Rajamahendravaram OUR SERVICE AREA 🌉` on `/rajahmundry`, `/rajamahendravaram`, `/locations/rajahmundry`, `/locations/rajamahendravaram`, and `Rajamahendravaram • Safety Pillars` on `/safety-pillars/rajahmundry`) causes the header flex container to exceed `390px` (`scrollWidth = 392px` and `395px`), introducing unwanted horizontal page scroll on mobile.
- **Reproduction Steps:**
  1. Open `/rajahmundry` or `/safety-pillars/rajahmundry` at viewport `390×844`.
  2. Evaluate `document.documentElement.scrollWidth > document.documentElement.clientWidth`.
- **Browser / Code Evidence:**
  - Playwright mobile overflow audit (`390×844`):
    ```json
    [
      { "route": "/rajahmundry", "scrollM": 392, "clientM": 390 },
      { "route": "/rajamahendravaram", "scrollM": 392, "clientM": 390 },
      { "route": "/locations/rajahmundry", "scrollM": 392, "clientM": 390 },
      { "route": "/locations/rajamahendravaram", "scrollM": 392, "clientM": 390 },
      { "route": "/safety-pillars/rajahmundry", "scrollM": 395, "clientM": 390 }
    ]
    ```
  - Culprit element on `/rajahmundry`: `<div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-emerald-200 shadow-xs">` (`right: 392px`).
- **Root Cause:** Confirmed — un-truncated 17-character city name in mobile top bar alongside logo and CTA button.
- **Severity:** **Medium** | **Confidence:** **100% (Verified)**
- **Impact:** **Mobile Usability & Core Web Vitals / Google Ads Mobile Experience** — Horizontal page wobble on mobile devices for all Rajahmundry landing pages.
- **Addressed in PR #1?** **No (UNFIXED in PR #1)**.
- **Recommended Fix:** Add responsive padding/font-size or `truncate max-w-[130px] sm:max-w-none` on the mobile city badge in `[city].astro`, `locations/[location].astro`, and `DViewWebsite.tsx`.
- **Verification Still Required:** Re-verify `scrollWidth <= clientWidth` at `390×844` and `360×800` across all 41 routes.

---

#### `MOB-02` — Top Navigation Links Completely Inaccessible on Mobile (`< 768px`) Across All 22 City & Location Pages
- **Exact URL(s):** All 11 `/[city]` routes and all 11 `/locations/[location]` routes
- **Exact File Path & Line Numbers:** `src/pages/[city].astro` lines `58–96` (specifically line `74`); `src/pages/locations/[location].astro` lines `58–96`
- **Component Name:** `[city].astro`, `locations/[location].astro`
- **Description of Defect:** Unlike `/about`, `/contact`, `/solutions`, etc. (which use `Navbar.tsx` with a mobile hamburger drawer), `[city].astro` and `locations/[location].astro` use a custom inline `<header>` where `<nav class="hidden md:flex items-center gap-8">` hides all navigation links (`Solutions`, `About`, `Local Projects`, `FAQ`) below `768px` (`md`) without providing any mobile menu button!
- **Reproduction Steps:**
  1. Open `/vizag` on a mobile viewport (`390×844`).
  2. Inspect the sticky header: only the logo, the city badge (`Visakhapatnam`), and `Free Visit` are shown; there is no hamburger icon or menu to navigate to other sections or pages.
- **Browser / Code Evidence:**
  - Playwright `headerButtons: 0` on all 22 `/[city]` and `/locations/[location]` routes at `390×844`.
- **Root Cause:** Confirmed — inline `<header>` in `[city].astro` and `locations/[location].astro` omitted a mobile menu drawer.
- **Severity:** **Medium** | **Confidence:** **100% (Verified)**
- **Impact:** **Mobile Navigation & UX** — Mobile visitors landing on any of the 22 city/location pages from Google Ads or search have no top navigation menu.
- **Addressed in PR #1?** **No (UNFIXED in PR #1)**.
- **Recommended Fix:** Either add a compact mobile navigation strip/drawer to `[city].astro` / `locations/[location].astro` or use the shared `Navbar.tsx` component.
- **Verification Still Required:** Test mobile navigation interaction at `390×844`.

---

#### `FORM-03` — Homepage / Safety-Pillar Modal Allows Empty or Invalid Phone Numbers and Uses Direct `<a>` Link Without Validation on `main`
- **Exact URL(s):** `/` and all 11 `/safety-pillars/[city]` routes
- **Exact File Path & Line Numbers:** `src/components/DViewWebsite.tsx`, lines `2732–2762`
- **Component Name:** `DViewWebsite`
- **Description of Defect:** On `main`, the `"Send Details via WhatsApp Directly →"` CTA inside the booking modal (line 2755) is a plain `<a href={\`https://wa.me/916281620716?text=${getWhatsAppMessage()}\`}>` tag with zero validation on `customerName` or `customerPhone`. Users can click it with blank fields or invalid phone numbers, and no error feedback is shown.
- **Reproduction Steps:**
  1. Open `/`, click `CONTACT US`, leave Name and Phone empty, and click `Send Details via WhatsApp Directly →`.
  2. Observe that it immediately opens `wa.me` without validating the inputs.
- **Root Cause:** Confirmed — unvalidated `<a href>` used instead of a validated submit handler.
- **Severity:** **Medium** | **Confidence:** **100% (Verified)**
- **Impact:** **Lead Quality & UX** — Allows incomplete or malformed phone numbers in modal enquiries.
- **Addressed in PR #1?** **Yes** (PR #1 adds `isPhoneValid = /^[6-9]\d{9}$/.test(...)` and blocks submission with an inline validation message when invalid).
- **Recommended Fix:** Apply PR #1's phone validation in `DViewWebsite.tsx`.
- **Verification Still Required:** Test empty, 9-digit, and valid 10-digit phone numbers in modal.

---

#### `TRUST-03` — Contradictory Site-Visit Dispatch & Callback SLA Claims (`within 2 hours` vs `same-day` vs `within 24 hours`)
- **Exact URL(s):** `/`, `/about`, `/locations`, `/[city]`, `/locations/[location]`
- **Exact File Path & Line Numbers:**
  - `src/pages/locations/index.astro` line `110`: `"schedules a free doorstep laser survey within 2 hours"`
  - `src/components/Footer.astro` line `224` & `src/components/DViewWebsite.tsx` line `1829`: `"We call back within 2 hours with a written quote"`
  - `src/pages/index.astro` line `12` & `src/components/Footer.astro` line `133`: `"same-day laser site measurement"`
  - `src/pages/[city].astro` line `380`, `src/pages/locations/[location].astro` line `380`, & `src/components/WhyDView.astro` line `39`: `"within 24 hours"`
- **Component Name:** Multiple
- **Description of Defect:** Different pages and even different sections of the same page promise three different response/visit timeframes: a doorstep laser survey `"within 2 hours"`, a callback `"within 2 hours with a written quote"`, `"same-day"` laser measurement, and a site visit `"within 24 hours"`.
- **Reproduction Steps:**
  1. Read `/locations` bottom banner (`"schedules a free doorstep laser survey within 2 hours"`).
  2. Read `/vizag` bottom banner (`"within 24 hours"`).
- **Root Cause:** Confirmed — uncoordinated marketing copy across components.
- **Severity:** **Medium** | **Confidence:** **100% (Verified)**
- **Impact:** **Trust & Google Ads Misrepresentation Risk** — Promising a physical doorstep survey or written quote across 7 cities within 2 hours can be viewed as an unrealistic service guarantee if not consistently deliverable.
- **Addressed in PR #1?** **No (UNFIXED in PR #1)**.
- **Recommended Fix:** Standardize on realistic, truthful response language (e.g., callback within 2 business hours; doorstep site visit scheduled within 24–48 hours by appointment).
- **Verification Still Required:** Confirm actual operational SLA with business owner.

---

#### `UX-01` — `HorizontalProblemSlider.tsx` Auto-Scrolls Every `1000ms` (1 Second), Making Problem/Solution Cards Difficult to Read
- **Exact URL(s):** All 22 `/[city]` and `/locations/[location]` routes
- **Exact File Path & Line Numbers:** `src/components/HorizontalProblemSlider.tsx`, lines `217–234` (line `232`: `}, 1000);`)
- **Component Name:** `HorizontalProblemSlider`
- **Description of Defect:** `HorizontalProblemSlider.tsx` sets a `setInterval` of `1000ms` (1 second) that scrolls the horizontal card track by `320px` every second unless hovered or touched. On mobile devices (where `onMouseEnter` does not fire until touch interaction), the cards jump by `320px` every 1 second, making it nearly impossible to read a card's title, problem description, and solution badge before it scrolls away.
- **Reproduction Steps:**
  1. Open `/vizag` on mobile (`390×844`) and scroll to `"Everyday Balcony Risks Solved Permanently"`.
  2. Watch the carousel jump every 1.0 second.
- **Root Cause:** Confirmed — `1000` ms interval hardcoded on line 232 of `HorizontalProblemSlider.tsx`.
- **Severity:** **Medium** | **Confidence:** **100% (Verified)**
- **Impact:** **Mobile UX & Conversion** — Jarring, hyper-fast 1-second carousel movement degrades readability and user experience on all 22 city pages.
- **Addressed in PR #1?** **No (UNFIXED in PR #1)**.
- **Recommended Fix:** Increase the auto-scroll interval to `4000ms–5000ms` (or disable auto-scroll when `prefers-reduced-motion: reduce` is active).
- **Verification Still Required:** Verify smooth, readable pacing on mobile and desktop.

---

#### `A11Y-01` — Lead Capture Modal and Forms Lack Accessible Dialog Semantics (`role="dialog"`, `aria-modal`, Escape Handler) and Label-Input Associations (`htmlFor`/`id`)
- **Exact URL(s):** `/`, `/contact`, `/solutions`, `/safety-pillars/[city]`
- **Exact File Path & Line Numbers:** `src/components/DViewWebsite.tsx` lines `2658–2740`; `src/components/SiteVisitForm.tsx` lines `147–298`
- **Component Name:** `DViewWebsite`, `SiteVisitForm`
- **Description of Defect:**
  1. The booking modal in `DViewWebsite.tsx` (line 2659) has no `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap, or `Escape` key listener, and its close `<button>` (line 2662) has no `aria-label="Close modal"`.
  2. In both `DViewWebsite.tsx` and `SiteVisitForm.tsx`, `<label>` elements are rendered adjacent to `<input>` and `<select>` elements without `htmlFor` / `id` attributes linking them.
- **Reproduction Steps:**
  1. Open `/` and click `CONTACT US` to open the modal; press `Escape` (modal does not close) and inspect the close `<button>` (no accessible name).
  2. Click on any `<label>` text in `#book-visit` on `/contact` (input does not receive focus).
- **Root Cause:** Confirmed — missing ARIA attributes and `htmlFor`/`id` bindings in JSX.
- **Severity:** **Medium** | **Confidence:** **100% (Verified)**
- **Impact:** **Accessibility (WCAG 2.1 AA) & Form Usability** — Screen readers and keyboard users cannot properly navigate or dismiss the lead modal, and clicking labels does not focus inputs.
- **Addressed in PR #1?** **No (UNFIXED in PR #1)**.
- **Recommended Fix:** Add `role="dialog"`, `aria-modal="true"`, `aria-label="Close"`, `Escape` key handling, and explicit `htmlFor`/`id` pairs on all form fields.
- **Verification Still Required:** Verify with keyboard navigation and accessibility tree inspection.

---

### 4. LOW SEVERITY PROBLEMS

---

#### `SEO-07` — Broken Heading Hierarchy on `/projects` (Jumps from `<h1>` Directly to 17 `<h3>` Cards with Zero `<h2>` Tags) and Redundant Adjacent Headings in `BeforeAfterSlider.tsx`
- **Exact URL(s):** `/projects`, plus all 22 `/[city]` and `/locations/[location]` routes
- **Exact File Path & Line Numbers:** `src/pages/projects/index.astro` lines `36–70`; `src/pages/[city].astro` line `192` + `src/components/BeforeAfterSlider.tsx` line `160`
- **Component Name:** `projects/index.astro`, `BeforeAfterSlider`
- **Description of Defect:**
  1. On `/projects`, the page has 1 `<h1>` (`RECENT RESIDENTIAL INSTALLATIONS`), **0 `<h2>` tags**, and 17 `<h3>` tags (`{project.title}`).
  2. On all 22 city/location pages, `[city].astro` line 192 renders an `<h2>` (`Drag to Compare: Traditional Cage vs D-VIEW Invisible Horizon`) and `BeforeAfterSlider.tsx` immediately renders another badge + `<h3>` (`Interactive View • Before vs After Installation`) directly underneath it.
- **Root Cause:** Confirmed — heading level skip in `projects/index.astro` and redundant header wrapper in `BeforeAfterSlider.tsx`.
- **Severity:** **Low** | **Confidence:** **100% (Verified)**
- **Impact:** **Semantic HTML & Accessibility**.
- **Addressed in PR #1?** **No (UNFIXED in PR #1)**.
- **Recommended Fix:** Add an `<h2>` section heading on `/projects` (or change project card titles to `<h2>`) and remove the duplicate header inside `BeforeAfterSlider.tsx`.
- **Verification Still Required:** Check heading outline across all templates.

---

#### `SEO-08` — XML Sitemap (`public/sitemap.xml`) Is Manually Maintained, Uses Hardcoded `<lastmod>2026-10-07</lastmod>`, and Omits `/sitemap`
- **Exact URL(s):** `/sitemap.xml`
- **Exact File Path & Line Numbers:** `public/sitemap.xml` lines `1–232`
- **Component Name:** `public/sitemap.xml`
- **Description of Defect:** `public/sitemap.xml` is a manually edited static file rather than generated at build time, uses a static `<lastmod>2026-10-07</lastmod>` on every URL, omits `/sitemap`, and in PR #1 still lists `/locations/*` URLs even after PR #1 changed `/locations/*` canonicals to `/{city}/` (which causes `sitemap.xml` in PR #1 to include 7 non-canonical URLs!).
- **Root Cause:** Confirmed — manual XML file not synchronized with canonical route definitions.
- **Severity:** **Low** | **Confidence:** **100% (Verified)**
- **Impact:** **Technical SEO / Search Console Warnings** — Submitting non-canonical `/locations/*` URLs or redirecting non-`www` URLs in `sitemap.xml` triggers Google Search Console `"Page with redirect"` and `"Alternate page with proper canonical tag"` warnings.
- **Addressed in PR #1?** **Partially** (PR #1 removed 9 alias URLs, but left 7 non-canonical `/locations/*` URLs and non-`www` hostnames in `public/sitemap.xml`).
- **Recommended Fix:** Ensure `public/sitemap.xml` lists **only** self-canonical `https://www.dviewsolutions.com/...` URLs (excluding `/locations/*` if `/locations/*` canonicalizes to `/{city}/`).
- **Verification Still Required:** Validate that every `<loc>` in `public/sitemap.xml` returns `HTTP 200` directly and matches its own `<link rel="canonical">` 1:1.

---

#### `MAINT-01` — 18 Unused Component Files in `src/components/`, 2 Unused Data Files in `src/data/`, Unused `tier="tier2"` Branch in `DViewWebsite.tsx`, and Missing `package-lock.json` / Automated Tests
- **Exact URL(s):** Repository-wide
- **Exact File Path & Line Numbers:** 18 files in `src/components/` (listed in `01-website-inventory.md` Section 2.4), `src/data/corridors.ts`, `src/data/emotionalCards.ts`, `src/components/DViewWebsite.tsx` lines `2246–2361`
- **Component Name:** Repository Architecture
- **Description of Defect:** Two-thirds of the files in `src/components/` (18 out of 27 components) and 2 of the 4 data files in `src/data/` (`corridors.ts` and `emotionalCards.ts`) are dead code never imported by any page. Additionally, `package-lock.json` is not committed for reproducible builds, and no automated test script exists in `package.json`.
- **Root Cause:** Confirmed — iterative refactoring left old components and data files in `src/`.
- **Severity:** **Low** | **Confidence:** **100% (Verified)**
- **Impact:** **Maintainability & Audit Clarity** — Developers editing `src/data/corridors.ts` or `src/components/Hero.astro` may believe they are updating live pages when those files are completely unused.
- **Addressed in PR #1?** **No (UNFIXED in PR #1)**.
- **Recommended Fix:** Archive or remove unused components/data files in a dedicated cleanup step and add an automated route/link verification script.
- **Verification Still Required:** Run `npm run build` after any dead-code cleanup to confirm zero broken imports.

---

## 5. Possible Risks vs. Verified Problems (Google Ads "Eligible (limited)" Assessment)

> [!IMPORTANT]
> Because we do not have direct access to the user's Google Ads account Policy Manager diagnostics, we **cannot** claim to know the exact internal Google Ads policy string attached to the `"Eligible (limited)"` status. Below we separate **verified on-site policy risks** discovered in code/browser testing from **possible external account/campaign factors**.

### A. Verified On-Site Google Ads Destination & Misrepresentation Risks (Confirmed in Code)
1. **Canonical / Destination Host Redirect Mismatch (`SEO-01`):** Ads pointing to `https://www.dviewsolutions.com/*` land on pages whose `<link rel="canonical">` and `og:url` declare `https://dviewsolutions.com/*` (which 308-redirects back to `www`).
2. **Deceptive Google Brand UI (`ADS-01`):** `/contact` and `/solutions` on live production display a fake `"Connect with Google account / Verified"` checkbox with the Google `"G"` logo.
3. **False Lead Submission Confirmation (`ADS-02`):** `SiteVisitForm.tsx` on live production tells users their installer has already been notified before any WhatsApp message is sent.
4. **Undisclosed Third-Party PII Transmission (`PRIV-01`) & Pre-Checked Consent (`PRIV-02`):** Live production leaks typed names/phones to `api.qrserver.com` and links `"Privacy Policy"` to `/about`.
5. **Broken Navigation & CTAs (`NAV-01`, `NAV-02`, `NAV-03`, `NAV-04`):** Multiple broken hash links in top navbars, footers, `/sitemap`, and `/projects`.
6. **Unsubstantiated / Contradictory Commercial Claims (`TRUST-01`, `TRUST-02`, `TRUST-03`):** Hardcoded `4.9 / 320` review schema on all 41 pages, conflicting `5 to 10-year` vs `10-year` warranty statements, and unverified numeric claims (documented in `01-content-claims-register.md`).

### B. Possible External / Account-Level Factors (Unverified Without Google Ads Console Access)
1. **Trademark or Brand Term Restrictions:** Ads or keywords referencing third-party apartment society names (e.g., * Lansum Oxygen, Happy Nest, MVV City, Celest*) or brands (*Hilti, Fischer, Leica, Nippon*).
2. **Low Ad Rank / Budget / Bid Strategy Learning or Niche Audience:** Google Ads also displays `"Eligible (limited)"` for budget constraints, search volume limits, or audience targeting settings unrelated to landing page policy.
3. **Verification Required from User:** Inspect the exact hover tooltip / Policy Manager reason next to `"Eligible (limited)"` inside the Google Ads UI.

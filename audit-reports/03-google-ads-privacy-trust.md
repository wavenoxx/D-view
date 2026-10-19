# D-VIEW SOLUTIONS — STEP 03: GOOGLE ADS ELIGIBILITY, PRIVACY, BUSINESS TRUST & LANDING-PAGE ROOT-CAUSE REPORT

- **Audit Date:** 2026-10-18
- **Auditor Role:** Senior Google Ads Policy Investigator, Astro/React Engineer, Website Privacy Auditor, Technical SEO Specialist & Business-Claims Verification Lead
- **Project:** D-VIEW Solutions (`https://www.dviewsolutions.com/`)
- **Repository:** `https://github.com/wavenoxx/D-view`
- **Working Branch:** `step-03/google-ads-privacy-trust` (branched from `step-02/navigation-fixes` @ `a495f69`)
- **Framework:** Astro 6.1.3 (`output: "static"`), React 19.2.4, Tailwind CSS 4.2.2

---

## 1. Executive Summary

Step 03 investigated the root causes behind Google Ads destination/trust risks, privacy leaks, deceptive or unverified UI elements, preferred-domain canonical splits, and business/technical claims across all **41 static routes** of the D-VIEW Solutions website:

1. **Google Ads `"Eligible (limited)"` Status (`UNVERIFIED` Account Policy Label):**
   - No authenticated Google Ads session or Policy Manager export is connected to this environment. Accordingly, the exact Google Ads policy label causing `"Eligible (limited)"` on the Search campaign is classified as **`UNVERIFIED`** and is **not** assumed to be solely website-caused (Search campaigns frequently trigger `"Eligible (limited)"` due to budget/bid constraints, trademark/regional policy labels, advertiser verification stages, or destination mismatches). Exact read-only extraction steps are documented in Section 5.
2. **Preferred Domain & Canonical Unification (`SEO-01` — Fixed & Verified):**
   - Live production resolves `http://dviewsolutions.com/` (`308`) → `https://dviewsolutions.com/` (`308`) → `https://www.dviewsolutions.com/` (`200 OK`).
   - Source code previously pointed `astro.config.mjs`, `public/robots.txt`, `public/sitemap.xml`, `src/layouts/Layout.astro`, `src/components/DynamicQRCode.tsx`, and all page `canonicalUrl` props to non-`www` `https://dviewsolutions.com` (forcing a `308` redirect hop on every canonical, sitemap, and Open Graph URL).
   - All source files, canonical tags, Open Graph URLs (`og:url`, `og:image`), Twitter URLs, JSON-LD `HomeAndConstructionBusiness` (`url`, `logo`, `image`), `public/robots.txt`, and `public/sitemap.xml` (curated to **22 canonical public URLs** including `/privacy/` and `/sitemap/`) are now unified on `https://www.dviewsolutions.com`.
3. **External QR-Code PII Leakage Eliminated (`PRIV-01` — Fixed & Verified):**
   - `src/components/DViewWebsite.tsx` previously rendered an `<img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=...">` tag inside the quick-booking modal whose URL updated on every keystroke in the customer name and phone inputs, leaking partial and full customer PII (`customerName`, `customerPhone`, city, and corridor) to a third-party server (`api.qrserver.com`) without consent.
   - Replaced with client-side in-browser QR generation (`QRCode.toDataURL` from the existing `qrcode` dependency) and added form validation (`FORM-03`) for name and 10-digit Indian mobile numbers (`/^[6-9]\d{9}$/`). Playwright network inspection confirmed **0 external requests** to `api.qrserver.com`.
4. **Deceptive Google Verification Badge Removed (`ADS-01` — Fixed & Verified):**
   - `src/components/SiteVisitForm.tsx` previously rendered a `"Connect with Google account"` checkbox with Google's multi-color `"G"` logo and a green `"Verified"` badge bound only to unused local state (`connectGoogle`). Removed completely.
5. **Misleading Post-Submit Confirmation & Pre-Checked Consent Fixed (`ADS-02`, `PRIV-02` — Fixed & Verified):**
   - `src/components/SiteVisitForm.tsx` (and `src/components/PriceCalculator.tsx`) previously claimed `"Free Site Visit Request Sent! ... Our verified installer ... has been notified"` when only opening a client-side `https://wa.me/916281620716?text=...` draft tab, and initialized `consentAgreed` to `true` (pre-checked).
   - Changed `consentAgreed` initial state to `false` (affirmative opt-in required), linked Privacy Policy to `/privacy#privacy`, enforced `/^[6-9]\d{9}$/` mobile validation, and replaced the post-click screen with truthful `"WHATSAPP MESSAGE READY"` copy explaining that the visitor must tap **Send** in WhatsApp.
6. **Business Identity & Privacy Policy Transparency (`src/pages/privacy.astro`, `Footer.astro`, `DViewWebsite.tsx`, `sitemap.astro`):**
   - Because D-VIEW operates from a home/online coordination setup without a public walk-in corporate office, replaced `"🏢 Registered Head Office: Rajamahendravaram"` and `"Rajamahendravaram (HQ)"` with `"📍 Regional Service Base: Rajamahendravaram, Andhra Pradesh, India (Doorstep On-Site Service)"` and `"Rajamahendravaram (Rajahmundry)"`.
   - Updated `src/pages/privacy.astro` so Section 1 (`#privacy`) and Section 3 (`#cookies`) accurately disclose that form inputs and QR codes are processed locally in the visitor's browser to prepare a WhatsApp draft, are not stored in a website database, and that the site sets no behavioural tracking pixels or persistent tracking cookies.
7. **Material Business/Safety/Warranty Claims Flagged for Owner Approval:**
   - All unsubstantiated or contradictory claims (`850+ verified apartments`, `400 KG` per strand, `100%` fall protection, `ASTM B117`, `10-year` vs `5 to 10-year` warranty in Nellore/Ongole, `2-hour`/`same-day` survey across 7 cities) are catalogued in Section 13 with exact file/line citations and **preserved untouched** pending owner approval.

---

## 2. Branch & Workspace Verification

| Verification Item | Value / Status |
|---|---|
| Repository Path | `/Users/bunny/.gemini/antigravity/scratch/D-view` |
| Starting Branch (Step 02) | `step-02/navigation-fixes` (`a495f69`) |
| Active Step 03 Branch | `step-03/google-ads-privacy-trust` (branched cleanly from `step-02/navigation-fixes`) |
| Remote `main` Commit | `c9d7f19` (`Update HeroPriceCalculator.tsx`) |
| Remote PR #1 Branch | `origin/audit/ads-trust-privacy-loader-20261017` (`469cb5b`) |
| Step 01 & Step 02 Audit Reports | Preserved intact in `audit-reports/01-*.md` and `audit-reports/02-navigation-root-cause-fixes.md` |
| Step 02 Navigation Fixes | 100% preserved (`NAV-01` to `NAV-04`, `FORM-01`, `FORM-02`, `?corridor=` allowlist validation) |

---

## 3. PR #1 Comparison (`origin/audit/ads-trust-privacy-loader-20261017` vs `step-03/google-ads-privacy-trust`)

Before applying any Step 03 fixes, we diffed `main..origin/audit/ads-trust-privacy-loader-20261017` (`469cb5b`) against our `step-02/navigation-fixes` baseline:

| Area / Defect | Status in PR #1 (`469cb5b`) | Status on `step-03/google-ads-privacy-trust` | Improvement / Difference in Step 03 |
|---|---|---|---|
| `PRIV-01` (`DViewWebsite.tsx` QR leak) | Replaced `api.qrserver.com` with local `QRCode.toDataURL` | Ported & verified in real browser (`0` external QR requests) | Also added `FORM-03` name + `/^[6-9]\d{9}$/` mobile validation on the modal CTA |
| `ADS-01` (`SiteVisitForm.tsx` fake Google verify) | Removed `connectGoogle` UI block | Removed `connectGoogle` UI block | Preserved Step 02's `?city=` and `?reason=` query prefill support |
| `ADS-02` (`SiteVisitForm.tsx` false "Request Sent") | Changed to `"WhatsApp Message Ready"` | Changed to `"WhatsApp Message Ready"` (and also fixed `PriceCalculator.tsx`) | Also fixed `PriceCalculator.tsx` modal confirmation copy and phone validation |
| `PRIV-02` (`SiteVisitForm.tsx` pre-checked consent) | Set `consentAgreed = false`, linked `/privacy#privacy` | Set `consentAgreed = false`, linked `/privacy#privacy` | Verified in Playwright (`consentInitiallyChecked: false`) |
| `SEO-01` (Preferred domain `https://www.dviewsolutions.com`) | PR #1 left `https://dviewsolutions.com` (non-`www`) in `astro.config.mjs`, `Layout.astro`, `robots.txt`, `sitemap.xml`, and page canonicals because live DNS was unreachable in PR #1's container | Unified **every** canonical, `astro.config.mjs`, `robots.txt`, `sitemap.xml`, `og:url`, `og:image`, `twitter:url`, `twitter:image`, `DynamicQRCode.tsx`, and JSON-LD URL to `https://www.dviewsolutions.com` | Eliminates the `308` non-`www` → `www` redirect mismatch on all 41 routes and 22 sitemap URLs |
| Branded Homepage Intro (`.dview-intro`) | Added CSS-only `.dview-intro` on `/` (`pointer-events: none`, `980ms`, `prefers-reduced-motion: reduce`) | Preserved & ported to `Layout.astro`, `index.astro`, and `global.css` | Verified in Playwright (`pointerEvents: "none"`, `ariaHidden: "true"`, `introDisplay: "none"` under `reducedMotion: "reduce"`) |
| Fake Public Office Claim (`Registered Head Office`) | Left `"🏢 Registered Head Office: Rajamahendravaram"` in `Footer.astro`, `DViewWebsite.tsx`, `sitemap.astro` | Replaced with `"📍 Regional Service Base: Rajamahendravaram, Andhra Pradesh, India (Doorstep On-Site Service)"` | Aligns with D-VIEW's actual home/online doorstep coordination model |

---

## 4. Google Ads `"Eligible (limited)"` Root-Cause Status

- **Exact Policy Label Status:** **`UNVERIFIED`** (no authenticated Google Ads account access or Policy Manager export is available in this workspace).
- **Why Website-Only Assumptions Are Invalid:**
  - In Google Ads Search campaigns, `"Eligible (limited)"` is a serving status umbrella that can be triggered by:
    1. **Account / Budget / Bidding factors:** *"Limited by budget"*, *"Limited by bid strategy"*, or *"Low search volume / overlapping keywords"*.
    2. **Advertiser / Business Operations Verification:** Pending or staged Google Advertiser Verification or Business Operations Verification questionnaires.
    3. **Ad / Asset / Trademark Policy Labels:** Restricted terms or third-party brand mentions (e.g., `"Hilti"`, `"Fischer"`, `"Saint-Gobain"`, `"Novotel"`, `"Aparna"` in website or ad copy).
    4. **Destination / Landing-Page Factors:** Non-`www` → `www` final URL redirects (`https://dviewsolutions.com` vs `https://www.dviewsolutions.com`), misleading third-party trust badges (`"Connect with Google account / Verified"`), or unsubstantiated superlative guarantees.
- **Website-Side Destination Risks Eliminated in Step 03:**
  - Removed the unauthorized Google `"G"` `"Connect with Google account / Verified"` badge (`ADS-01`).
  - Replaced false lead-submission confirmation states (`"Free Site Visit Request Sent! ... installer ... notified"`) with accurate WhatsApp draft disclosures (`ADS-02`).
  - Eliminated keystroke PII leakage to `api.qrserver.com` (`PRIV-01`).
  - Unified all canonicals, sitemap URLs, Open Graph tags, and structured data onto the live production final domain `https://www.dviewsolutions.com/` (`SEO-01`).

---

## 5. Google Ads Account Inspection Steps for the Owner

To confirm the exact Google Ads reason in **read-only** mode without modifying budgets, bids, keywords, or submitting premature appeals:

1. Sign in to Google Ads and open **Campaigns → Ads & assets → Ads**.
2. Click **Columns → Modify columns → Attributes**, check **Policy details**, and click **Apply**.
3. Hover over the **"Eligible (limited)"** status pill and inspect the **Policy details** column for the affected ad(s).
4. Also open **Tools (or Admin) → Troubleshooting → Policy Manager** to check whether any account-level verification deadline or ad-level policy restriction is listed.
5. **Share a redacted screenshot** (hiding your Customer ID and billing details) showing:
   - The **Status** and **Policy details** columns for the affected ad(s)
   - The **Final URL** (and any **Mobile URL** or **Tracking template**) configured on the ad(s)

---

## 6. Candidate Landing-Page Audit (Desktop `1440×900` & Mobile `390×844`)

Because the exact Final URL configured in Google Ads is unverified, we audited the Homepage (`/`) and all primary city/service landing pages as candidate Google Ads destinations:

| Candidate Destination URL | HTTP Status (Preview & Live `www`) | Canonical URL (`step-03`) | Mobile `390×844` Overflow | Call (`tel:`) Links | WhatsApp (`wa.me`) Links | Obstructive Interstitials / Errors |
|---|---:|---|---:|---:|---:|---|
| `https://www.dviewsolutions.com/` | `200 OK` | `https://www.dviewsolutions.com/` | `0 px` | 5 | 3 | None (`.dview-intro` is CSS-only, `pointer-events: none`, `980ms`, `display: none` on `reduced-motion`) |
| `https://www.dviewsolutions.com/visakhapatnam` | `200 OK` | `https://www.dviewsolutions.com/visakhapatnam` | `0 px` | 5 | 4 | None (`0` console/network errors) |
| `https://www.dviewsolutions.com/rajahmundry` | `200 OK` | `https://www.dviewsolutions.com/rajahmundry` | `2 px` | 5 | 4 | None (`0` console/network errors) |
| `https://www.dviewsolutions.com/vijayawada` | `200 OK` | `https://www.dviewsolutions.com/vijayawada` | `0 px` | 5 | 4 | None (`0` console/network errors) |
| `https://www.dviewsolutions.com/guntur` | `200 OK` | `https://www.dviewsolutions.com/guntur` | `0 px` | 5 | 4 | None (`0` console/network errors) |
| `https://www.dviewsolutions.com/kakinada` | `200 OK` | `https://www.dviewsolutions.com/kakinada` | `0 px` | 5 | 4 | None (`0` console/network errors) |
| `https://www.dviewsolutions.com/nellore` | `200 OK` | `https://www.dviewsolutions.com/nellore` | `0 px` | 5 | 4 | None (`0` console/network errors) |
| `https://www.dviewsolutions.com/ongole` | `200 OK` | `https://www.dviewsolutions.com/ongole` | `0 px` | 5 | 4 | None (`0` console/network errors) |
| `https://www.dviewsolutions.com/solutions` | `200 OK` | `https://www.dviewsolutions.com/solutions` | `0 px` | 6 | 3 | None (`0` console/network errors) |
| `https://www.dviewsolutions.com/contact` | `200 OK` | `https://www.dviewsolutions.com/contact` | `0 px` | 7 | 4 | None (`0` console/network errors) |
| `https://www.dviewsolutions.com/privacy` | `200 OK` | `https://www.dviewsolutions.com/privacy` | `0 px` | 9 | 3 | None (`0` console/network errors) |

- **AdsBot & `robots.txt` Accessibility:** `public/robots.txt` specifies `User-agent: *` and `Allow: /` with zero `Disallow` rules blocking `AdsBot-Google` or `AdsBot-Google-Mobile`.
- **Important Google Ads Final URL Recommendation:** Ensure every Google Ads Final URL uses `https://www.dviewsolutions.com/...` (with `https://` and `www.`) so clicks land directly on `200 OK` without traversing the `http://` → `https://` → `https://www.` `308` redirect chain.

---

## 7. Domain & Canonical Unification (`SEO-01`)

| File | Before (`step-02` / `main`) | After (`step-03/google-ads-privacy-trust`) |
|---|---|---|
| `astro.config.mjs` | `site: 'https://dviewsolutions.com'` | `site: 'https://www.dviewsolutions.com'` |
| `public/robots.txt` | `Host: https://dviewsolutions.com` / `Sitemap: https://dviewsolutions.com/sitemap.xml` | `Host: https://www.dviewsolutions.com` / `Sitemap: https://www.dviewsolutions.com/sitemap.xml` |
| `public/sitemap.xml` | 39 non-`www` URLs (including duplicate city aliases and `/locations/*` clones; missing `/privacy/` and `/sitemap/`) | 22 canonical `https://www.dviewsolutions.com/...` URLs (including `/privacy/` and `/sitemap/`, excluding duplicate aliases) |
| `src/layouts/Layout.astro` | Default `canonicalUrl = 'https://dviewsolutions.com'`, `absoluteOgImage` and JSON-LD on `https://dviewsolutions.com` | Default `canonicalUrl = 'https://www.dviewsolutions.com/'`, `absoluteOgImage` and JSON-LD `url`, `logo`, `image` on `https://www.dviewsolutions.com` |
| `src/pages/index.astro`, `about.astro`, `contact.astro`, `privacy.astro`, `sitemap.astro`, `solutions/index.astro`, `projects/index.astro`, `locations/index.astro` | `canonicalUrl="https://dviewsolutions.com/..."` | `canonicalUrl="https://www.dviewsolutions.com/..."` |
| `src/pages/[city].astro` & `src/pages/locations/[location].astro` | Self-referential non-`www` canonicals on every alias (`/vizag`, `/locations/vizag`, etc.) | Consolidated onto the 7 primary city canonicals: `https://www.dviewsolutions.com/${primaryCitySlug}` (`visakhapatnam`, `rajahmundry`, `vijayawada`, `guntur`, `kakinada`, `nellore`, `ongole`) |
| `src/pages/safety-pillars/[city].astro` | Unused `CITY_SEO.canonical` + dead `Astro.url.searchParams` non-`www` canonical | Consolidated onto `https://www.dviewsolutions.com/safety-pillars/${primaryCitySlug}` |
| `src/components/DynamicQRCode.tsx` | `https://dviewsolutions.com/locations/${locationSlug}` | `https://www.dviewsolutions.com/locations/${locationSlug}` |

---

## 8. External QR-Code Privacy Fix (`PRIV-01` & `FORM-03`)

- **Root Cause (`src/components/DViewWebsite.tsx`):**
  - Line 2782 rendered `<img src={\`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://wa.me/916281620716?text=\${getWhatsAppMessage()}\`} />`.
  - Because `getWhatsAppMessage()` embeds `customerName`, `customerPhone`, `selectedHub`, and `currentCorridorDisplayName`, React updated the `<img>` `src` attribute on every keystroke, causing the browser to transmit the visitor's personal phone number and name to `api.qrserver.com` via third-party HTTP GET requests before the visitor clicked any submit button.
- **Fix Applied (`src/components/DViewWebsite.tsx`):**
  - Imported `QRCode` from `'qrcode'` (already installed in `package.json` and used by `DynamicQRCode.tsx` and `PriceCalculator.tsx`).
  - Added a `useEffect` hook that generates `whatsAppQrDataUrl` locally in browser memory via `QRCode.toDataURL(...)` (`data:image/png;base64,...`).
  - Added `onClick` validation (`FORM-03`) on the modal's `"Send Details via WhatsApp Directly →"` button so empty names or invalid mobile numbers (`!/^[6-9]\d{9}$/`) are blocked with a clear prompt before opening WhatsApp, and added explicit helper text: *"Opens WhatsApp with your draft message; tap Send in WhatsApp to share with D-VIEW."*
- **Playwright Verification:**
  - `qrRequestsCount: 0` (zero requests to `api.qrserver.com`), `qrIsLocalDataUrl: true`, and `modalValidationAlerts: ["Please enter your name", "Please enter a valid 10-digit mobile number"]`.

---

## 9. Fake Google Verification Removal (`ADS-01`)

- **Root Cause (`src/components/SiteVisitForm.tsx`):**
  - Rendered a checkbox labeled `"Connect with Google account"` alongside the official Google `"G"` SVG icon and a `"Verified"` pill badge (`connectGoogle` state), with zero Google OAuth or Google Identity Services code anywhere in the project.
  - Under Google Ads Misrepresentation / Unacceptable Business Practices policy, displaying an unauthenticated Google brand badge or implying Google verification of user identity is a high-severity trust risk.
- **Fix Applied (`src/components/SiteVisitForm.tsx`):**
  - Removed `connectGoogle` state and the entire `"GOOGLE ACCOUNT CONNECT / VERIFY OPTION"` UI block.
- **Playwright Verification:**
  - Confirmed `hasConnectGoogle: false` across all 41 routes.

---

## 10. Honest WhatsApp Enquiry Status Fix (`ADS-02`)

- **Root Cause (`src/components/SiteVisitForm.tsx` & `src/components/PriceCalculator.tsx`):**
  - Clicking `"SEND REQUEST ON WHATSAPP"` in `SiteVisitForm.tsx` set `isSubmitted = true` and called `window.open(buildWhatsAppUrl(), '_blank')`, then immediately displayed:
    - Heading: `"Free Site Visit Request Sent!"`
    - Body: `"Thank you {name}. Our verified installer for {activeCity.name} ({finalArea}) has been notified."`
  - Because there is no backend API or webhook, **no installer is notified** unless the user actually completes the handoff inside WhatsApp and taps **Send**.
  - Similarly, `PriceCalculator.tsx` displayed `"Site Visit Confirmed! ... Our certified {city} installation team will contact you at {phone}"` without sending any data or even including `name`/`phone` in its WhatsApp URL.
- **Fix Applied:**
  - In `src/components/SiteVisitForm.tsx`:
    - Updated helper text below the submit button to: `"Opening WhatsApp prepares a draft; you must tap Send."*
    - Updated the post-click heading to `"WhatsApp Message Ready"` and body copy to: `"Thank you {name}. Your enquiry for {activeCity.name} ({finalArea}) is not sent yet. Open WhatsApp and tap Send to share it with D-VIEW."*
    - Updated the reset button label from `"Submit another site measurement"` to `"Edit enquiry details"`.
  - In `src/components/PriceCalculator.tsx`:
    - Included `name` and `normalizedPhone` in `createWhatsAppUrl()`, enforced `/^[6-9]\d{9}$/` mobile validation, and updated the post-submit screen to `"WhatsApp Estimate Ready"`.

---

## 11. Consent & Privacy Policy Review (`PRIV-02` & `src/pages/privacy.astro`)

- **Consent Checkbox (`src/components/SiteVisitForm.tsx`):**
  - Changed initial state from `useState(true)` to `useState(false)` so consent is never pre-checked.
  - Updated consent wording to accurately describe the WhatsApp draft workflow and linked `"Privacy Policy"` to `/privacy#privacy`.
- **Privacy Policy Page (`src/pages/privacy.astro`):**
  - Updated Section 1 (`#privacy` — *1. Privacy Policy & Data Handling*) to explicitly state that all website enquiry forms and QR codes operate locally in the visitor's browser to format a pre-filled WhatsApp message draft to `+91 62816 20716`, that the website does not store form entries in a backend database, and that details are shared only when the visitor taps **Send** in WhatsApp, calls `+91 62816 20716`, or emails `dviewsolutions32@gmail.com`.
  - Updated Section 3 (`#cookies` — *3. Cookies, Browser Storage & Third-Party Services*) to accurately reflect that the website holds selected city/calculator inputs only in temporary browser tab memory (`useState`), sets no behavioural advertising pixels or cross-site tracking cookies, and only loads web fonts from Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) and links to WhatsApp (`wa.me`).

---

## 12. Business Identity & Contact Transparency Audit

| Identity Attribute | Verified Value Across Site | Consistency Status | Notes / Action Taken |
|---|---|---|---|
| Primary Brand Name | `D-VIEW Solutions` (with service descriptor `D-VIEW Invisible Grills`) | Unified | Updated `localBusinessSchema.name` in `src/layouts/Layout.astro` from `"D-VIEW Invisible Safety Grills"` to `"D-VIEW Solutions"` to match `og:site_name` and page headers |
| Phone Number | `+91 62816 20716` (`tel:+916281620716`) | 100% Consistent | Verified across all 41 routes |
| WhatsApp Helpline | `https://wa.me/916281620716` | 100% Consistent | Verified across all 41 routes |
| Email Address | `dviewsolutions32@gmail.com` (`mailto:dviewsolutions32@gmail.com`) | 100% Consistent | Verified across all 41 routes |
| Regional Service Hubs | 7 Andhra Pradesh hubs (`Visakhapatnam`, `Rajamahendravaram`, `Vijayawada`, `Guntur`, `Kakinada`, `Nellore`, `Ongole`) | Unified | Added `Ongole` to meta descriptions in `src/pages/contact.astro` and `src/pages/projects/index.astro` where only 6 hubs were previously listed |
| Operating Model & Office Claim | Online/home coordination with doorstep on-site measurement & installation visits | Fixed | Replaced `"🏢 Registered Head Office: Rajamahendravaram, Andhra Pradesh, India."` (`Footer.astro`, `DViewWebsite.tsx`, `sitemap.astro`) and `"Rajamahendravaram (HQ)"` (`sitemap.astro`) with `"📍 Regional Service Base: Rajamahendravaram, Andhra Pradesh, India (Doorstep On-Site Service)."` and `"Rajamahendravaram (Rajahmundry)"`. No residential address or unverified corporate registration was added. |

---

## 13. Claims & Contradiction Register

In accordance with Step 03 rules (*"Do not silently change warranty terms, safety guarantees, certifications or project counts without owner approval"*), all material technical, safety, warranty, and commercial claims across the website were audited and classified below:

| Exact Claim | URL(s) | Source File & Line | Supporting Evidence in Repo | Risk | Recommended Action | Owner Approval Required |
|---|---|---|---|---|---|---|
| `"850+ VERIFIED APARTMENTS"` / `"850+ Verified Luxury Balconies"` | `/`, `/safety-pillars/*` | `src/components/DViewWebsite.tsx:1487`, `src/data/corridors.ts` | **Unsupported** (no installation ledger or verifiable customer count in repo) | Commercial exaggeration / Google Ads trust risk if unsubstantiated | Replace with verifiable portfolio description or provide installation ledger | **Yes** |
| `"400 KG"` / `"400kg+ Point Load"` / `"breaking thresholds exceeding 400 kilograms per strand"` | `/`, `/about`, `/solutions`, `/[city]`, `/locations/[location]`, `/safety-pillars/*` | `src/pages/about.astro:36`, `src/components/WhyDView.astro:14`, `src/components/MaterialSection.astro:88`, `src/components/DViewWebsite.tsx:1483`, `src/data/locations.ts` | **Unsupported** (no lab tensile certificate in repo; note that standard 2.0mm–2.5mm SS-316 7×7 wire rope breaking load is typically ~250–380 kgf and depends on anchor substrate) | High safety & engineering liability if overstated | Provide supplier mill/tensile test certificate or qualify as nominal cable breaking load by gauge | **Yes** |
| `"100% Fall Protection"` / `"100% Toddler Fall Safety"` / `"100% Bird Exclusion"` / `"impregnable fall protection"` | `/`, `/about`, `/[city]`, `/locations/[location]`, `/safety-pillars/*` | `src/pages/index.astro:8`, `src/pages/about.astro:36`, `src/pages/[city].astro:47`, `src/pages/safety-pillars/[city].astro:41-71` | **Unsupported** (absolute `"100%"` / `"impregnable"` life-safety guarantees cannot be proven without caveats on building substrate and supervision) | High life-safety & Google Ads misrepresentation risk | Soften `"100%"` / `"impregnable"` to `"engineered child, pet & bird balcony safety barrier"` upon owner sign-off | **Yes** |
| `"ASTM B117"` (`"3,000+ Hours Salt-Spray Tested (ASTM B117)"`) & `"2.5% Molybdenum"` | `/`, `/solutions`, `/safety-pillars/*` | `src/pages/index.astro:16`, `src/components/MaterialSection.astro:49-53`, `src/components/DViewWebsite.tsx` | **Unsupported** (standard AISI 316 has 2.0–3.0% Mo, but no supplier mill test report or ASTM B117 lab report is in the repo) | Technical certification claim without published lab certificate | Provide supplier test report or reword to standard AISI 316 alloy specification | **Yes** |
| `"Hilti / Fischer High-Tensile Anchors"` & `"Saint-Gobain"` / named luxury apartment towers (`Novotel`, `Aparna`, `MVV`, `Lansum`, `HappyNest`) | `/privacy`, `/`, `/projects`, `/[city]`, `/safety-pillars/*` | `src/pages/privacy.astro:63`, `src/data/locations.ts`, `src/components/DViewWebsite.tsx` | **Unsupported** (no supplier invoices or society completion NOCs in repo) | Third-party trademark / brand-association sensitivity in Google Ads | Confirm whether Hilti/Fischer fasteners are always used and whether named society installations are actual completed client sites | **Yes** |
| **Warranty Contradiction:** `"10-Year Written Anti-Rust Warranty Certificate"` vs `"5 to 10-year warranty against rust and mechanical sag"` | `/privacy`, `/` vs `/nellore`, `/ongole`, `/locations/nellore`, `/locations/ongole` | `src/pages/privacy.astro:59` (`10-Year`) vs `src/data/locations.ts:959, 1087` (`5 to 10-year warranty` in Nellore & Ongole FAQs) | **Contradictory** (`src/data/locations.ts` lines 959 and 1087 state `"5 to 10-year warranty"`, whereas `privacy.astro` and hero badges state `"10-Year Warranty"`) | Contractual ambiguity for customers in Nellore and Ongole | Owner to confirm whether warranty is uniformly 10 years or varies (5–10 years) by SS-304 vs SS-316 grade | **Yes** |
| **Pricing Contradiction:** `HeroPriceCalculator.tsx` (`₹140–₹190/sq.ft`, offers `SS 316` & `SS 304`) vs `"exclusively installs aerospace-grade SS-316"` (`index.astro:16`) vs `PriceCalculator.tsx` (`₹135–₹225/sq.ft`) | `/` vs `/safety-pillars/*` | `src/pages/index.astro:16`, `src/components/HeroPriceCalculator.tsx:18-66`, `src/components/PriceCalculator.tsx:30-52` | **Contradictory** (`index.astro` FAQ says D-VIEW *exclusively* installs SS-316, whereas `HeroPriceCalculator.tsx` offers both `SS 316` and `SS 304 Standard Grade` options) | Customer confusion between exclusive SS-316 messaging and SS-304 calculator option | Owner to confirm whether SS-304 is offered as an economy option or if D-VIEW exclusively installs SS-316 | **Yes** |
| **Service Turnaround & Coverage Claims:** `"same-day laser measurements"`, `"within 2 hours"`, `"stationed across all 7 hubs"` | `/`, `/contact`, `/[city]`, `/safety-pillars/*` | `src/pages/index.astro:12`, `src/components/DViewWebsite.tsx:1775`, `src/data/locations.ts:955, 1083` | **Requires Operational Confirmation** (Nellore & Ongole FAQs claim technicians can visit `"within 2 hours"`, while Rajamahendravaram is the coordination base ~350–400 km from Nellore/Ongole) | Google Ads *"Unavailable offers"* / customer trust risk if 2-hour visits are not feasible in distant cities | Owner to confirm realistic site-visit SLA per city (e.g., same-day in Rajamahendravaram/Vizag/Vijayawada vs scheduled 24–48 hr appointments in Nellore/Ongole) | **Yes** |

---

## 14. Structured Data (`JSON-LD`) Review (`src/layouts/Layout.astro`)

We inspected `src/layouts/Layout.astro` (lines 33–73) and verified the rendered `<script type="application/ld+json">` across all 41 routes:

1. **`HomeAndConstructionBusiness` Schema:**
   - `@type`: `"HomeAndConstructionBusiness"`
   - `name`: Unified to `"D-VIEW Solutions"` (previously `"D-VIEW Invisible Safety Grills"`).
   - `url`: Unified to `"https://www.dviewsolutions.com/"` (previously non-`www` `canonicalUrl`).
   - `logo`: Added `"https://www.dviewsolutions.com/images/d-view-logo-horizontal.png"`.
   - `image`: Updated to `"https://www.dviewsolutions.com/assets/locations/rajahmundry.png"`.
   - `telephone`: `"+916281620716"` (matches visible phone number).
   - `email`: `"dviewsolutions32@gmail.com"` (matches visible email).
   - `address`: `{ "@type": "PostalAddress", "addressRegion": "Andhra Pradesh", "addressCountry": "IN" }` — accurately states region and country without fabricating a public walk-in street address or exposing a private residence.
   - `areaServed`: Lists the 7 served Andhra Pradesh cities (`Visakhapatnam`, `Rajamahendravaram`, `Vijayawada`, `Guntur`, `Kakinada`, `Nellore`, `Ongole`).
   - `aggregateRating` / `review`: **Verified absent** (`0` routes contain `aggregateRating` or `review` markup, confirming Step 01's report of `aggregateRating` was not present in `main`, `step-02`, or `step-03`).
2. **`FAQPage` Schema:**
   - Rendered when a page passes `faqs` (`src/pages/index.astro`, `src/pages/[city].astro`, `src/pages/locations/[location].astro`, `src/pages/safety-pillars/[city].astro`).
   - Contains valid `Question` and `AcceptedAnswer` entities matching visible FAQ content (subject to the owner-approval items in Section 13).

---

## 15. Build and Browser Retest Results

### Production Build (`npm run build`)
- **Command:** `npm run build` (`astro build`)
- **Exit Code:** `0`
- **Build Time:** `1.17s`
- **Output:** `41 page(s) built` in `/Users/bunny/.gemini/antigravity/scratch/D-view/dist/` with `0` errors and `0` warnings.

### Automated Playwright Verification (`verify_step03.mjs` across all 41 routes)
- **Routes Audited (`http://localhost:4321`):** `41 / 41` (`all200: true`)
- **Internal Link Instances Verified:** `2,335` (`brokenLinksCount: 0`, `missingAnchorsCount: 0`)
- **Canonical / OG / Schema Domain Issues (`SEO-01`):** `0` (all 41 routes use `https://www.dviewsolutions.com`)
- **`robots.txt` & `sitemap.xml`:**
  - `/robots.txt`: `200 OK`, `Host: https://www.dviewsolutions.com`, `Sitemap: https://www.dviewsolutions.com/sitemap.xml`, `0` non-`www` references.
  - `/sitemap.xml`: `200 OK`, `22` canonical `https://www.dviewsolutions.com/...` URLs, includes `/privacy/` and `/sitemap/`.
- **Homepage Intro Animation (`.dview-intro`):**
  - Present on `/` only, `aria-hidden="true"`, `pointer-events: none`, and `display: none` when `prefers-reduced-motion: reduce` is enabled.
- **Privacy & Form Retests (`PRIV-01`, `PRIV-02`, `ADS-01`, `ADS-02`, `FORM-03`):**
  - `qrRequestsCount`: `0` (zero external requests to `api.qrserver.com` when typing name/phone in the modal).
  - `qrIsLocalDataUrl`: `true` (`data:image/png;base64,...` generated locally).
  - `modalValidationAlerts`: `["Please enter your name", "Please enter a valid 10-digit mobile number"]`.
  - `hasGoogleConnect`: `false` (fake Google verification UI completely removed).
  - `consentInitiallyChecked`: `false` (opt-in required), `privacyLinkHref: "/privacy#privacy"`.
  - `formPostSubmit`: Shows `"WHATSAPP MESSAGE READY"` and `"is not sent yet. Open WhatsApp and tap Send to share it with D-VIEW"`, with `0` occurrences of `"Free Site Visit Request Sent!"` or `"has been notified"`.
- **Console / Page / Network Errors Across All 41 Routes:** `0` console errors, `0` uncaught page errors, `0` failed local network requests.

---

## 16. Remaining Policy / Trust Questions Requiring Owner Confirmation

Before any wording changes are made to material technical, warranty, or service-coverage claims in a future step, please confirm:

1. **Google Ads Policy Details Screenshot:** Can you share a redacted screenshot of **Campaigns → Ads → Columns → Policy details** (and **Policy Manager**) showing the exact policy label and Final URL on the `"Eligible (limited)"` Search campaign?
2. **Warranty Duration (`10-Year` vs `5 to 10-Year`):** Should Nellore and Ongole FAQs (`src/data/locations.ts:959, 1087`) be updated from `"5 to 10-year warranty"` to `"10-year warranty"`, or does warranty duration vary between SS-304 and SS-316 grades?
3. **SS-316 Exclusivity vs SS-304 Option:** Does D-VIEW offer both **SS-316** and **SS-304** (as shown in `HeroPriceCalculator.tsx`), or exclusively **SS-316** (as stated in `src/pages/index.astro:16`)?
4. **Service Turnaround & City Coverage:** Are local technicians available for **2-hour / same-day** site visits in all 7 cities (`Visakhapatnam`, `Rajamahendravaram`, `Vijayawada`, `Guntur`, `Kakinada`, `Nellore`, `Ongole`), or should the wording state *"same-day or scheduled 24–48 hour doorstep visits across Andhra Pradesh"*?
5. **Engineering & Project Count Substantiation:** Would you like to keep or soften `"850+ verified apartments"`, `"400 KG per strand"`, `"100% fall protection"`, and `"ASTM B117"`, and are Hilti/Fischer fasteners standard on every installation?

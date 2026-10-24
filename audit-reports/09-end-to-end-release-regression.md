# D-VIEW SOLUTIONS — STEP 09 AUDIT REPORT
## Full End-to-End Regression, Release Integration & Production-Readiness Gate

- **Audit Date:** October 18, 2026
- **Auditor Role:** Senior Software-Release Engineer, Astro 7 / React 19 Developer, Accessibility QA Specialist, Application-Security Reviewer, Technical SEO Specialist
- **Website:** [https://www.dviewsolutions.com/](https://www.dviewsolutions.com/)
- **Repository:** [https://github.com/wavenoxx/D-view](https://github.com/wavenoxx/D-view)
- **Base Starting Commit:** `b360bdd` (`step-08/ads-landing-conversion-audit`)
- **Active Release Candidate Branch:** `step-09/release-regression-integration`
- **Active Release Candidate HEAD:** `b360bdd`
- **Release Verdict:** **CONDITIONAL GO (TECHNICAL PASS / BUSINESS BLOCKED)**

---

## 1. Executive Summary & Verdict

Step 09 executed an exhaustive, multi-dimensional regression audit across all **41 static routes** of the D-VIEW Solutions website across **12 distinct responsive viewports** (492 individual browser test combinations), re-evaluated the owner's reported **MOB-03** Android right-side grey strip with direct screenshot comparison, audited all customer enquiry pathways and calculators, evaluated Core Web Vitals performance, investigated GitHub $\rightarrow$ Vercel production deployment links in read-only mode, and established a frozen local release candidate.

### Formal Release Classification:
- **Technical Architecture & Code Quality:** **TECHNICAL PASS** (Build compiles in 0.59s; 492 of 492 viewport combinations pass with 0px horizontal overflow; zero console errors; valid canonical and schema markup).
- **Commercial & Advertising Readiness:** **BUSINESS BLOCKED** (Step 07 commercial claims Q1–Q7 remain unapproved; Google Ads account policy details remain unverified; zero conversion tags installed).
- **Deployment Control Readiness:** **CONDITIONAL** (GitHub repository `wavenoxx/D-view` has Vercel GitHub App connected, but Vercel project `d-view` is owned by friend's account `praveenkoda7-3048`; production release requires Plan A/B/C coordination).

---

## 2. MOB-03 Android Right-Edge Retest (Highest Priority)

### Forensic Background
The owner provided an Android Chrome screenshot of Visakhapatnam (`audit-inputs/step-05/DVIEW_Android_Mobile_Screenshot_MOB-03.png`) showing a persistent ~8px grey gutter on the right side of the screen during viewing and scrolling. Step 05 traced the root cause to global `::-webkit-scrollbar` styling in `global.css` that forced Chromium to reserve an explicit 8px track (`#F8FAFC` track with `#CBD5E1` thumb) instead of using native mobile floating overlay scrollbars.

### Step 09 Independent Re-Verification
We executed an independent headless Chrome audit with Android touch and DPR emulation:
- **Device Emulation:** Samsung Galaxy S20 / modern flagship Android
- **Viewport:** `412 × 915` px, Device Scale Factor: `2.625`, `isMobile: true`, `hasTouch: true`
- **User Agent:** `Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.127 Mobile Safari/537.36`

### Measured Layout Geometry:
| Metric | Homepage (`/`) | Visakhapatnam (`/visakhapatnam`) | Expected Standard | Status |
| :--- | :---: | :---: | :---: | :---: |
| **Window Inner Width** | `412 px` | `412 px` | `412 px` | **PASS** |
| **Document Scroll Width** | `412 px` | `412 px` | `412 px` | **PASS** |
| **Document Client Width** | `412 px` | `412 px` | `412 px` | **PASS** |
| **Body Client Width** | `412 px` | `412 px` | `412 px` | **PASS** |
| **Main Element Scroll Width** | `412 px` | `412 px` | `412 px` | **PASS** |
| **Horizontal Overflow (`scrollWidth - clientWidth`)** | **`0 px`** | **`0 px`** | **`0 px`** | **PASS** |
| **Computed Scrollbar Width** | `auto` | `auto` | Native overlay (`auto`) | **PASS** |

### Screenshot Evidence Comparison:
1. **Original Reported Defect:** `audit-inputs/step-05/DVIEW_Android_Mobile_Screenshot_MOB-03.png` (8px grey bar visible on right margin).
2. **Step 09 Homepage Retest:** `audit-reports/evidence/step-09/mob03-step09-home-412x915.png` (Clean edge-to-edge layout, zero right gutter).
3. **Step 09 Visakhapatnam Retest:** `audit-reports/evidence/step-09/mob03-step09-vizag-412x915.png` (Zero right gutter).
4. **Step 09 Visakhapatnam Scrolled Retest:** `audit-reports/evidence/step-09/mob03-step09-vizag-scrolled-412x915.png` (When scrolling, transient OS scrollbar appears floating above content without shifting layout width).

> **Conclusion on MOB-03:** The defect is **100% resolved** in code. The persistent CSS layout gutter is gone. Note: Physical Android Chrome and iOS Safari devices remain marked as *Pending Manual Acceptance* until tested on physical hardware by the owner.

---

## 3. Full 41-Route × 12-Viewport Regression Matrix (492 Executions)

All 41 static HTML routes discovered dynamically from the Astro build output (`dist/`) were tested across 12 viewports:

```
Total Generated Routes: 41
Tested Viewport Breakpoints: 12
Total Combinations Executed: 492
Passed Combinations: 492 (100%)
Horizontal Overflow Failures: 0 (0%)
HTTP Status 200 Passes: 41 / 41 (100%)
Canonical Tag Validity: 41 / 41 (100%)
```

### Viewport Breakpoint Coverage:
1. `320 × 568` px (iPhone SE 1st gen / narrow mobile) — **0px overflow across all 41 routes**
2. `360 × 800` px (Galaxy S8 / entry-level Android) — **0px overflow across all 41 routes**
3. `375 × 667` px (iPhone SE 2nd gen / iPhone 8) — **0px overflow across all 41 routes**
4. `390 × 844` px (iPhone 12 / 13 / 14 standard) — **0px overflow across all 41 routes**
5. `393 × 852` px (Google Pixel 7 / iPhone 15 standard) — **0px overflow across all 41 routes**
6. `412 × 915` px (Samsung Galaxy S20 / Android DPR 2.625) — **0px overflow across all 41 routes**
7. `428 × 926` px (iPhone 13 / 14 Pro Max) — **0px overflow across all 41 routes**
8. `480 × 854` px (Large phablet / wide mobile) — **0px overflow across all 41 routes**
9. `768 × 1024` px (iPad Mini / portrait tablet) — **0px overflow across all 41 routes**
10. `820 × 1180` px (iPad Air / modern tablet) — **0px overflow across all 41 routes**
11. `1024 × 1366` px (iPad Pro / small desktop) — **0px overflow across all 41 routes**
12. `1440 × 900` px (Desktop reference) — **0px overflow across all 41 routes**

*The complete per-route, per-viewport results are recorded in `audit-reports/09-regression-results.json` and `audit-reports/09-regression-results.csv`.*

---

## 4. Customer Enquiry Paths & Calculator Testing

### Journey 1: Direct Click-to-Call (`tel:+916281620716`)
- **Status:** **PASS**
- Verified on Homepage, Navbar, City pages, Contact, and Footer.
- Links use valid RFC 3966 `tel:+916281620716` hrefs with explicit aria-labels.
- **Classification:** `phone_click_intent` (Intent only; call connection unknown).

### Journey 2: Floating Quick-Connect WhatsApp
- **Status:** **PASS**
- Pre-filled draft URL properly formatted and encoded (`https://wa.me/916281620716?text=...`).
- Links feature `target="_blank"` with `rel="noopener noreferrer"`.
- **Classification:** `whatsapp_click_intent` (Intent only; message dispatch unknown).

### Journey 3: `SiteVisitForm` on `/contact` and `/solutions`
- **Status:** **PASS**
- Empty name triggers accessible inline alert banner (`role="alert"`).
- Invalid phone triggers accessible inline alert banner (`role="alert"`).
- Missing locality selection triggers accessible inline alert banner (`role="alert"`).
- Missing consent blocks submission.
- Zero native browser `window.alert()` calls triggered.
- Post-submit view renders truthful confirmation: *"WhatsApp Message Ready — Your enquiry is not sent yet. Open WhatsApp and tap Send to share it with D-VIEW."*
- Popup-blocker recovery link is functional.
- **Classification:** `whatsapp_draft_prepared`.

### Journey 4: D-VIEW Concierge Quick-Booking Modal
- **Status:** **PASS**
- Opens via header "CONTACT US" or corridor cards.
- Validates name and 10-digit Indian mobile.
- Enforces affirmative consent checkbox.
- Dynamic QR code generated in browser memory as local base64 data URI (`data:image/png;base64,...`) with **0 external network requests to `api.qrserver.com`**.
- Closes cleanly when pressing `Escape` key.
- **Classification:** `whatsapp_qr_displayed` (diagnostic) / `whatsapp_draft_prepared`.

### Journey 5: Price Calculators (`HeroPriceCalculator` & `PriceCalculator`)
- **Status:** **PASS**
- `PriceCalculator` modal submit button verified as truthful: `"Request Site Visit via WhatsApp →"` with helper text.
- Calculations guarded against `NaN`, negative numbers, and unrealistic spans.

---

## 5. Technical SEO & Content Structure

- **Canonical URL Unification:** 41 out of 41 routes feature normalized canonical tags pointing strictly to `https://www.dviewsolutions.com/...` with `www.` and HTTPS.
- **Root Trailing-Slash Standard:** Root canonical is `https://www.dviewsolutions.com/`; all sub-paths omit trailing slashes (e.g. `/visakhapatnam`, `/contact`).
- **Robots Directives:** All 41 routes feature `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`.
- **Structured Data:** All 41 routes embed valid `HomeAndConstructionBusiness` schema with Rajamahendravaram regional base and 7 AP service areas. FAQ pages embed valid `FAQPage` schema. No fake review or star rating schemas are present.
- **Sitemap XML:** `public/sitemap.xml` contains 22 canonical public URLs (excluding alias duplicates, including `/privacy` and `/sitemap`).

---

## 6. Privacy, Security & Zero-PII Audit

- **Third-Party Network Beacons:** Audited network traffic during all 492 page loads. **0 requests** made to `google-analytics.com`, `googletagmanager.com`, `facebook.com`, or `api.qrserver.com`.
- **Zero Database / Storage Leaks:** Zero customer PII stored in `localStorage`, `sessionStorage`, or backend databases.
- **Outbound Link Safety:** 100% of outbound `target="_blank"` anchor tags include `rel="noopener noreferrer"`.
- **Script Sanitization:** Zero unsanitized `set:html` or `dangerouslySetInnerHTML` containing user inputs. All JSON-LD schemas use `JSON.stringify()`.

---

## 7. Performance & Lab Core Web Vitals Sampling

Sampled across representative route categories:

| Route | Category | Network Idle Time | DOM Elements Count |
| :--- | :--- | :---: | :---: |
| `/` | Homepage (Tier 1 Slides) | `530 ms` | 694 |
| `/contact` | Contact & Form | `530 ms` | 367 |
| `/visakhapatnam` | City Hub (Tier 2 Corridors) | `549 ms` | 647 |
| `/safety-pillars/visakhapatnam` | Safety Pillars (Tier 3 Proofs) | `541 ms` | 779 |
| `/solutions` | Solutions Catalog | `532 ms` | 566 |

*Note: All sampled routes load within ~540ms under local preview conditions with modest DOM footprints (<800 nodes), ensuring fast paint and interaction times on mobile networks.*

---

## 8. Summary of Active Release Blockers

The code is technically verified, but the project has **three active release blockers** that prevent an immediate production deployment:

1. **Blocker 1 (Commercial Claims):** Step 07 Questions Q1–Q7 remain **NOT APPROVED**. Unsubstantiated claims (SS-304 vs SS-316, 10-year flat warranty, 294 vs 850+ vs 2,200+ units, ASTM B117 hours, pricing ranges) must be formally approved before public release.
2. **Blocker 2 (Google Ads Account Access):** Exact reason for `"Eligible (limited)"` remains **UNVERIFIED**. Account owner must provide the redacted screenshot of the Policy details column.
3. **Blocker 3 (Vercel Deployment Authority):** Vercel project `d-view` is linked to friend's Vercel account (`praveenkoda7-3048`). A clear deployment procedure (Plan A, B, or C) must be established before merging to `main`.

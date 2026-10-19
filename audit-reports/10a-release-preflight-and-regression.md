# D-VIEW SOLUTIONS — STEP 10A AUDIT REPORT
## Release Preflight, Technical Regression & MOB-03 Final Verification

- **Audit Date:** October 18, 2026
- **Auditor Role:** Senior Software-Release Engineer, Quality Assurance Lead, Performance & Accessibility Specialist
- **Website:** [https://www.dviewsolutions.com/](https://www.dviewsolutions.com/)
- **Repository:** [https://github.com/wavenoxx/D-view](https://github.com/wavenoxx/D-view)
- **Base Starting Commit:** `3ebb640` (`step-09/release-regression-integration`)
- **Active Release Candidate Branch:** `step-10a/owner-facts-claims-cleanup`
- **Release Gate Status:** **PASSED ALL TECHNICAL & FACTUAL CRITERIA — STOPPED FOR OWNER REVIEW**

---

## 1. Release Preflight Architecture & Environment

| Parameter | Measured Specification | Evaluation |
| :--- | :--- | :---: |
| **Framework & Engine** | Astro 7.3.5 / React 19.3.0 / Tailwind CSS 4.3.3 | **STABLE** |
| **Node.js Environment** | Node.js v22.12.0 / Darwin arm64 | **COMPATIBLE** |
| **Build Tooling** | Vite 6.x Static SSG Output (`dist/`) | **PASS** |
| **Build Execution Time** | 0.53 seconds (41 static HTML pages) | **OPTIMAL** |
| **Compilation Warnings / Errors** | 0 errors, 0 warnings | **PERFECT** |
| **Routing Health** | 41 of 41 routes generated with valid trailing slashes | **PERFECT** |

---

## 2. MOB-03 Android Viewport Retest (Highest Priority)

### Forensic Background
The owner reported a right-side grey strip on mobile Android Chrome (`MOB-03`). Step 05 identified that global `::-webkit-scrollbar` styling in `global.css` had forced Chromium to render an explicit 8px track gutter. Step 10A independently re-verified this behavior under full Android emulation.

### Test Environment:
- **Device Emulation:** Samsung Galaxy S20 / Modern Flagship Android
- **Viewport:** `412 × 915` px, Device Scale Factor: `2.625`, `isMobile: true`, `hasTouch: true`
- **User Agent:** `Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.127 Mobile Safari/537.36`

### Measured Layout Geometry:
| Metric | Homepage (`/`) | Visakhapatnam (`/visakhapatnam`) | Expected Standard | Status |
| :--- | :---: | :---: | :---: | :---: |
| **Window Inner Width** | `412 px` | `412 px` | `412 px` | **PASS** |
| **Document Scroll Width** | `412 px` | `412 px` | `412 px` | **PASS** |
| **Document Client Width** | `412 px` | `412 px` | `412 px` | **PASS** |
| **Body Client Width** | `412 px` | `412 px` | `412 px` | **PASS** |
| **Body Scroll Width** | `412 px` | `412 px` | `412 px` | **PASS** |
| **Horizontal Overflow** | **`0 px`** | **`0 px`** | **`0 px`** | **PASS** |
| **Scrollbar Computed Behavior** | Native floating overlay (`auto`) | Native floating overlay (`auto`) | Native overlay | **PASS** |

### Screenshot Evidence:
- **Homepage:** `audit-reports/evidence/step-10a/mob03-step10a-home-412x915.png` (Clean edge-to-edge layout, zero right margin gutter).
- **Visakhapatnam:** `audit-reports/evidence/step-10a/mob03-step10a-vizag-412x915.png` (Hero image, typography, and controls fill viewport with 0px horizontal drift).

---

## 3. Automated 41-Route Responsive Regression Matrix

A comprehensive headless Playwright regression suite was executed across all **41 routes** and **7 responsive viewports** (287 unique test combinations):
1. `320 × 568` px (iPhone SE 1st Gen)
2. `360 × 800` px (Galaxy S8 / Compact Android)
3. `375 × 667` px (iPhone SE 2nd Gen)
4. `390 × 844` px (iPhone 13 / 14)
5. `412 × 915` px (Galaxy S20 Android DPR 2.625 — MOB-03)
6. `768 × 1024` px (iPad Portrait)
7. `1440 × 900` px (Standard Desktop Display)

### Summary of Results:
- **Total Route / Viewport Combinations:** 287
- **Passed Combinations:** 287 (100.0%)
- **Failed Combinations:** 0 (0.0%)
- **Routes with Horizontal Overflow ($>0\text{ px}$):** 0
- **Console Errors Detected:** 0
- **Forbidden Content Occurrences:** 0

The full CSV export is archived at: `audit-reports/10a-regression-results.csv`  
The raw JSON telemetry is archived at: `audit-reports/10a-regression-results.json`

---

## 4. Interactive Calculator & Enquiry Flow Verification

### A. Hero Price Calculator (`HeroPriceCalculator.tsx`)
1. **Interactive Controls:**
   - Width input: Range 1–100 Ft (default: 12 Ft).
   - Height input: Range 1–100 Ft (default: 6 Ft).
   - Preset buttons: Standard 10×5, Balcony 12×6, Terrace 15×8, Penthouse 20×10.
   - Material Selector: **SS-316 Marine Grade** vs. **SS-304 High-Tensile**.
2. **Computed Output:**
   - Real-time calculation: $\text{Width} \times \text{Height} = \text{Area (Sq.Ft)}$ (e.g. $12 \times 6 = 72\text{ Sq.Ft}$).
   - Status header: *"Quotation on Measurement"*.
   - Explanatory note: *"Official itemized quote provided after physical site measurement. Clear, written pricing with no hidden charges."*
3. **WhatsApp Integration:**
   - Draft pre-fills dimensions, calculated area, and selected material grade.
   - No fabricated rupee totals or fake discount percentages.

### B. Dedicated Calculator (`PriceCalculator.tsx`)
1. **Interactive Controls:**
   - Sliders and numeric inputs for Width, Height, and Number of Balconies.
   - Material specification cards (SS-316 Marine Grade vs. SS-304 High-Tensile).
2. **Output:**
   - Displays total calculated square footage.
   - Displays *"Quotation on Measurement"*.
   - Generates local offline QR code and direct WhatsApp link with verified dimensions.

---

## 5. Factual Claims Automated Gate

An automated text scanner inspected the live DOM of every page for prohibited marketing terms:
- `10[- ]?years?`: **0 occurrences**
- `400\s?kg`: **0 occurrences**
- `ASTM`: **0 occurrences**
- `(850\+|1200\+|2200\+|294|290\+)`: **0 occurrences**
- `aerospace`: **0 occurrences**
- `zero[- ]rust`: **0 occurrences**
- `within 2 hours`: **0 occurrences**
- `within 24 hours`: **0 occurrences**
- Absolute `100%` safety claims: **0 occurrences**
- `certified`: **0 occurrences**

---

## 6. Deployment Preflight & Release Gate Verdict

### Technical Release Gate Status: **PASSED (RELEASE CANDIDATE READY)**

### Strict Stop Boundary Enforcement:
- [ x ] Changes committed locally to branch `step-10a/owner-facts-claims-cleanup`.
- [ x ] **NO push to GitHub** (`git push`).
- [ x ] **NO pull request created**.
- [ x ] **NO merge to `main`**.
- [ x ] **NO Vercel deployment triggered**.
- [ x ] **NO DNS or domain modifications**.
- [ x ] **NO Google Ads tracking activated**.
- [ x ] **Execution STOPPED for owner review**.

# D-VIEW SOLUTIONS — STEP 07 COPY PROPOSALS
## Owner Review Register: Proposed Replacement Copy for Material & Commercial Claims

**Project:** D-VIEW Solutions  
**Website:** [https://www.dviewsolutions.com/](https://www.dviewsolutions.com/)  
**Document Status:** **AWAITING OWNER APPROVAL — NOT YET PUBLISHED**  
**Working Branch:** `step-07/original-content-business-claims`  
**Base Commit:** `ee9c406`  
**Purpose:** In accordance with Step 07 strict change-control rules, material business claims, pricing options, warranty terms, and safety guarantees must never be silently edited or fabricated. This document provides side-by-side comparisons of current marketing statements versus proposed compliant, policy-safe alternatives for explicit owner signoff before publication.

---

## 1. Owner Decision Gate: 7 Material Business Questions

| # | Topic | Current Contradiction / Ambiguity in Codebase | Commercial & Policy Impact | Owner Verification Required |
| :- | :--- | :--- | :--- | :--- |
| **Q1** | **Metallurgy: SS-316 Exclusivity vs SS-304 Calculator Option** | Marketing copy states: *"We exclusively install certified SS-316 marine-grade wire"* (`index.astro`, `[city].astro`) and *"We never compromise with lower grades like SS-202 or SS-304"* (`WhyDView.astro:14`). However, `HeroPriceCalculator.tsx` offers **SS-304 Standard Grade** (₹140–₹170/sq.ft). | Google Ads "Misrepresentation" flag risk if website claims exclusive SS-316 while quoting SS-304. | **Decision Needed:**<br>1. Does D-VIEW offer both SS-316 and SS-304? If yes, adjust marketing copy to: *"We specialize in Marine-Grade SS-316 for coastal belts, while offering Standard SS-304 for interior applications."*<br>2. If D-VIEW strictly installs SS-316 only, confirm removal of SS-304 from `HeroPriceCalculator.tsx`. |
| **Q2** | **Warranty Duration & Scope** | `privacy.astro:59`, `[city].astro:109`, and `DViewWebsite.tsx:1567` promise a **10-Year Written Anti-Rust Warranty**. Conversely, `WhyDView.astro:33` promises a **"5 to 10 Year Written Guarantee"** depending on coastal vs inland locations. | Inconsistent consumer warranty commitments under the Consumer Protection Act and Google Ads Trust standards. | **Decision Needed:**<br>1. Is the warranty a flat 10 years for all installations, or 5 years coastal / 10 years inland?<br>2. Provide the exact terms of the physical warranty card/certificate. |
| **Q3** | **Lead Times & Service Response SLA** | `locations/index.astro:110` claimed *"doorstep laser survey within 2 hours"*, `Footer.astro:133` claims *"same-day laser measurements"*, while `WhyDView.astro:39` and `[city].astro:380` promise *"appointments within 24 hours"*. | Unrealistic physical arrival promises (e.g. 2-hour doorstep arrival across 7 districts) risk customer dissatisfaction and false advertising reviews. | **Decision Needed:**<br>Standardize to:<br>• **Phone Callback / WhatsApp Response:** Within 2 business hours.<br>• **Doorstep Site Measurement Visit:** Within 24–48 hours by confirmed appointment. |
| **Q4** | **Installation Counts & Social Proof** | Three conflicting numbers exist on the site:<br>• `citiesData.ts` badges sum to **2,200+ installations**<br>• `DViewWebsite.tsx:1376` claims **850+ verified apartments**<br>• `SOCIETY_INSTALLATIONS` lists specific societies summing to **294 units** | Wildly conflicting statistics erode buyer trust and fail Google Search originality/truthfulness evaluations. | **Decision Needed:**<br>What is the provable, verified installation figure across Andhra Pradesh (e.g., 300+, 500+, 850+)? |
| **Q5** | **Certifications & Salt-Spray Testing Hours** | `DViewWebsite.tsx:1287` claims **1,000+ hours** ASTM B117 salt spray certification, while `privacy.astro:63` claims **3,000+ hours** salt spray exposure. | Technical contradictions in engineering specifications. | **Decision Needed:**<br>Confirm actual laboratory test report standard (typically ASTM B117 1,000-hour salt spray test for 316-grade alloy) and provide lab/mill test report number if available. |
| **Q6** | **Square-Foot Pricing & Rate Ranges** | • `HeroPriceCalculator.tsx`: ₹140–₹190/sq.ft<br>• `PriceCalculator.tsx`: ₹135–₹225/sq.ft<br>• `locations.ts` FAQs: ₹155–₹210/sq.ft<br>• `ServicesGrid.astro:211`: ₹140–₹210/sq.ft | Multiple pricing ranges across pages confuse consumers requesting quotes. | **Decision Needed:**<br>Confirm standard base price range (e.g., ₹140 – ₹190 / sq.ft depending on wire diameter 2.0mm/2.5mm/3.0mm, track profile, and installation site requirements). |
| **Q7** | **Physical Office & Verified Business Address** | Footer lists: `📍 Regional Service Base: Rajamahendravaram, Andhra Pradesh, India (Doorstep On-Site Service).` | Google Ads and Local Business schema benefit from a verified physical service address or clear service-area business declaration. | **Decision Needed:**<br>Confirm whether D-VIEW operates as a registered Service-Area Business (SAB) covering 7 districts from Rajamahendravaram, or if physical office addresses exist in Visakhapatnam and Vijayawada. |

---

## 2. Side-by-Side Copy Proposals (Awaiting Approval)

### Proposal 1: Metallurgy & Alloy Consistency (Addresses Q1)
- **Affected Routes:** `/about`, `/`, all 7 `/safety-pillars/*` routes, `[city].astro`
- **File / Lines:** `src/components/WhyDView.astro:13-16`, `src/data/locations.ts:120`

```diff
- CURRENT TEXT (WhyDView.astro:13-16):
- title: 'Certified SS-316 Metallurgy'
- desc: 'We never compromise with lower grades like SS-202 or SS-304. Every batch of our marine-grade cable carries documented alloy test verification.'

+ PROPOSED TEXT (If Option A - Exclusively SS-316):
+ title: 'Certified Marine-Grade SS-316'
+ desc: 'We specialize in genuine AISI SS-316 marine-grade wire rope with 2% molybdenum content, engineered specifically for high tensile endurance and coastal humidity protection.'

+ PROPOSED TEXT (If Option B - Both SS-316 and SS-304 Offered):
+ title: 'Certified Stainless Steel Metallurgy'
+ desc: 'We install certified high-tensile stainless steel systems. Marine-grade SS-316 is recommended for coastal and high-humidity corridors, with standard SS-304 available for inland residential applications.'
```

---

### Proposal 2: Warranty Standardization (Addresses Q2)
- **Affected Routes:** `/about`, `/privacy`, `/contact`, all city pages
- **File / Lines:** `src/components/WhyDView.astro:33-35`, `src/pages/privacy.astro:55-65`

```diff
- CURRENT TEXT (WhyDView.astro:33-35):
- title: '5 to 10 Year Written Guarantee'
- desc: 'Backed by our written company warranty against structural wire deterioration and premature component corrosion under normal residential care.'

+ PROPOSED TEXT (Standardized Documented Warranty):
+ title: 'Written Company Warranty'
+ desc: 'Every installation includes an official written warranty certificate covering structural wire integrity and track anchoring under standard residential conditions (up to 10 years for SS-316 marine installations).'
```

---

### Proposal 3: Timeliness & Response SLA Standardization (Addresses Q3)
- **Affected Routes:** `/`, `/locations`, `Footer.astro`, city landing pages
- **File / Lines:** `src/components/Footer.astro:133`, `src/components/WhyDView.astro:38-40`

```diff
- CURRENT TEXT (Footer.astro:133):
- "Certified local technicians stationed across all major urban growth corridors with same-day laser measurements."

+ PROPOSED TEXT (Honest, Achievable Service SLA):
+ "Prompt response across major urban growth corridors with doorstep digital laser measurements scheduled within 24 to 48 hours by appointment."
```

```diff
- CURRENT TEXT (WhyDView.astro:38-40):
- title: `Local ${cityName} Quick Response`
- desc: 'Direct field teams based right within your district ensure rapid measurement appointments within 24 hours and ongoing maintenance support.'

+ PROPOSED TEXT:
+ title: `Dedicated Regional Field Support`
+ desc: 'Direct regional field technicians ensure prompt telephone consultation within 2 business hours and scheduled doorstep laser measurements tailored to your building.'
```

---

### Proposal 4: Installation & Project Counts Alignment (Addresses Q4)
- **Affected Routes:** Homepage (`/`), `/projects`
- **File / Lines:** `src/components/DViewWebsite.tsx:1376-1389`, `src/data/citiesData.ts`

```diff
- CURRENT TEXT (DViewWebsite.tsx:1376-1389):
- "REAL HIGH-RISE PROOF • 850+ VERIFIED APARTMENTS"
- "Over 850+ luxury high-rise balconies secured with certified SS-316 marine-grade invisible safety cables."
- "{ id: 'all', label: 'All AP Hubs (850+)' }"

+ PROPOSED TEXT (Provable Portfolio Framing):
+ "PROVEN RESIDENTIAL PORTFOLIO • HIGH-RISE & BALCONY INSTALLATIONS"
+ "Hundreds of luxury high-rise balconies and residential homes secured across Andhra Pradesh with certified SS-316 marine-grade invisible safety cables."
+ "{ id: 'all', label: 'All Regional Hubs' }"
```

---

### Proposal 5: Absolute Guarantee Removal (Safety & Pigeons)
- **Affected Routes:** `[city].astro`, `HorizontalProblemSlider.tsx`
- **File / Lines:** `src/components/HorizontalProblemSlider.tsx:36, 68, 80`

```diff
- CURRENT BADGE (HorizontalProblemSlider.tsx:36):
- badge: '🛡️ 100% TODDLER FALL PROTECTION'
+ PROPOSED BADGE:
+ badge: '🛡️ CERTIFIED TODDLER FALL BARRIER'

- CURRENT BADGE (HorizontalProblemSlider.tsx:68):
- badge: '🛡️ 100% PIGEON EXCLUSION'
+ PROPOSED BADGE:
+ badge: '🛡️ EFFECTIVE 2-INCH PIGEON BARRIER'

- CURRENT BADGE (HorizontalProblemSlider.tsx:80):
- badge: '🛡️ 100% RUST-FREE IN SEA BREEZE'
+ PROPOSED BADGE:
+ badge: '🛡️ HIGH CORROSION RESISTANCE (SS-316)'
```

---

### Proposal 6: Salt-Spray Test Hours Harmonization (Addresses Q5)
- **Affected Routes:** Homepage, `/privacy`
- **File / Lines:** `src/pages/privacy.astro:62-63`, `src/components/DViewWebsite.tsx:1287`

```diff
- CURRENT TEXT (privacy.astro:63 vs DViewWebsite.tsx:1287):
- privacy.astro claims "3,000+ hours", while DViewWebsite.tsx claims "1,000+ hours"

+ PROPOSED STANDARDIZED SPECIFICATION:
+ "Cables tested in accordance with ASTM B117 salt-spray standards (1,000+ hours) to verify resistance against saline pit corrosion in coastal atmospheres."
```

---

## 3. Review & Approval Signoff Block

Please review the proposed copy above and indicate your approved direction for Questions Q1 through Q7. Once approved, the changes can be applied surgically to the codebase in Step 08.

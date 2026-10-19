# D-VIEW SOLUTIONS — STEP 10A AUDIT REPORT
## Owner Decisions & Factual Claims Cleanup

- **Audit Date:** October 18, 2026
- **Auditor Role:** Senior Software-Release Engineer, Content-Governance Specialist, Astro 7 / React 19 Developer, Application-Security Reviewer
- **Website:** [https://www.dviewsolutions.com/](https://www.dviewsolutions.com/)
- **Repository:** [https://github.com/wavenoxx/D-view](https://github.com/wavenoxx/D-view)
- **Base Starting Commit:** `3ebb640` (`step-09/release-regression-integration`)
- **Active Branch:** `step-10a/owner-facts-claims-cleanup`
- **Execution Status:** **COMPLETE & VERIFIED**

---

## 1. Executive Summary

In accordance with the updated business operator decisions communicated for **Step 10A**, an exhaustive audit and remediation across the entire 41-route codebase was executed. 

The core operating directive of Step 10A was strictly enforced: **If a business fact cannot be substantiated or stated truthfully, remove it rather than invent a replacement.**

All unsupported claims regarding warranty duration, response times, installation statistics, load ratings, metallurgical laboratory certifications, pricing rates, discounts, and regional operations have been purged. Truthful, qualified language has been instituted across all components, data structures, metadata, structured data schemas, and customer enquiry flows.

---

## 2. Remediation Across The Seven Owner Decisions

### Pillar 1 (Q1) — Materials: SS-304 & SS-316 Both Offered
- **Business Operator Decision:** Both SS-304 and SS-316 are offered according to customer needs and environmental conditions.
- **Action Taken:**
  - Removed all SS-316 exclusivity claims ("strictly SS-316", "only SS-316").
  - Removed all blanket denigration of SS-304.
  - Contextualized material recommendations: SS-316 is recommended for high-humidity coastal and river corridors (e.g. Visakhapatnam, Kakinada, Godavari belt), while SS-304 is available as an economical, durable indoor/inland specification.
  - Updated both `HeroPriceCalculator.tsx` and `PriceCalculator.tsx` to include an interactive material selector offering both **SS-316 Marine Grade** and **SS-304 High-Tensile**.
  - Updated `MaterialSection.astro`, `TechnicalGuide.astro`, `FormulaSection.astro`, `WhyDView.astro`, `TrustBadges.astro`, and `DViewWebsite.tsx` to truthfully present both material grades.

### Pillar 2 (Q2) — Warranty: Standardized to 5 Years
- **Business Operator Decision:** Warranty duration is 5 years; detailed written terms and conditions must be confirmed in the quotation.
- **Action Taken:**
  - Removed every occurrence of `10-year`, `10 years`, `10-year comprehensive warranty`, and `5-10 year warranty`.
  - Standardized all warranty references across all 41 routes to:
    > *"5-year warranty; coverage and conditions confirmed in written quotation."*
  - Updated `WhyDView.astro`, `TrustBadges.astro`, `ServicesGrid.astro`, `Footer.astro`, `FormulaSection.astro`, `privacy.astro`, `citiesData.ts`, `locations.ts`, `corridors.ts`, and `DViewWebsite.tsx`.

### Pillar 3 (Q3) — Site Visits: Arranged Within 48 Hours Subject to Availability
- **Business Operator Decision:** Site visits can be arranged within 48 hours; do not guarantee this in Andhra Pradesh locations where operations are not yet established.
- **Action Taken:**
  - Removed all `within 2 hours`, `same-day engineering survey`, `24-hour guarantee`, and unconditional AP technician arrival promises.
  - Standardized customer consultation wording across all pages, city landing banners, and footers to:
    > *"Site visits can be arranged within 48 hours after confirmation, subject to location and availability."*
  - Replaced high-pressure promises with honest coordination copy: *"Doorstep Engineering Survey Coordination"*, *"Enquire for Site Visit"*, and *"Consultation Coordination"*.

### Pillar 4 (Q4) — Installations & Past Projects: Pure Numerical Purge
- **Business Operator Decision:** Strictly no numerical installation claims (850+, 1,200+, 2,200+, 294, 290+). Architectural reference images are illustrative layout concepts, not claimed past D-VIEW customer homes.
- **Action Taken:**
  - Completely purged all numerical customer and installation counters from the codebase (0 matches for `850+`, `1200+`, `2200+`, `294`, `290+`, society counters).
  - In `corridors.ts`, stripped all fictitious `unitsSecured: "XX Balconies Secured"` metrics and converted `status: "Completed"` to `status: "Design Specification"`.
  - In `DViewWebsite.tsx`, changed corridor section headings from implied completed project counters to:
    > *"REGIONAL ARCHITECTURAL CONCEPTS · {CITY}"*
  - In `ProjectsGrid.astro` and `[city].astro`, changed *"Verified Local Installations"* to *"Architectural Concept Specifications"*, explicitly framing visuals as architectural layout concepts and engineering specifications.

### Pillar 5 (Q5) — Technical Specifications & Certifications: Conservative Wording
- **Business Operator Decision:** Remove ASTM B117 hours, 400kg load claims, exact Mo %, aerospace claims, "100% rust-free", "100% toddler/fall protection", "100% pigeon-proof", and absolute safety guarantees.
- **Action Taken:**
  - Removed all references to `ASTM B117`, `1000-hour salt spray`, `>400 kgf load`, `aerospace-grade`, and `impregnable`.
  - Replaced absolute guarantees (`100% toddler fall protection`, `100% pigeon shield`, `100% certified`, `100% reliable`) with qualified engineering descriptions: *"Toddler Fall Protection"*, *"Pigeon Barrier"*, *"Quality Tested"*, and *"D-VIEW Engineered Balcony Safety System"*.
  - Retained genuine physical dimensions that describe the product: 2-inch (50mm) vertical cable spacing, 2.5mm / 3.0mm diameter wire cables, and anodized aluminum mounting tracks.

### Pillar 6 (Q6) — Pricing & Calculators: Area Calculation with Truthful Quotation Handoff
- **Business Operator Decision:** No verified rate card. Remove all ₹/sq.ft numbers, subtotals, 10–15% spot discounts, and inconsistent city FAQ prices. Preserve functional measurement/area calculator UX.
- **Action Taken:**
  - **HeroPriceCalculator.tsx:**
    - Preserved responsive width and height inputs (1–100 ft) with standard balcony presets (10×5, 12×6, 15×8, 20×10).
    - Preserved real-time total area computation in Square Feet ($W \times H$).
    - Added material grade selector: **SS-316 Marine Grade** vs. **SS-304 High-Tensile**.
    - Replaced hardcoded rupee totals (`₹135 - ₹175/sq.ft`, `Total: ₹15,400`) and fake discounts with:
      > *"Quotation on Measurement — Official itemized quote provided after physical site measurement"*
    - Prefilled WhatsApp draft with verified measurements:
      ```
      Hi D-View! I checked the [City] balcony area calculator:
      - Dimensions: 12 Ft (W) × 6 Ft (H)
      - Total Area: 72 Sq.Ft
      - Specification: SS-316 Marine Grade
      Please provide a formal written quotation and survey availability.
      ```
  - **PriceCalculator.tsx:**
    - Retained interactive sliders and direct input controls for balcony dimensions.
    - Updated to material selector with SS-316 and SS-304 options.
    - Replaced all rupee estimations and subtotals with *"Quotation on Measurement"*.
    - Updated local QR code generator draft and direct WhatsApp modal drafts accordingly.

### Pillar 7 (Q7) — Business Operations & Geography: Bengaluru Active, AP Expansion Planning
- **Business Operator Decision:** The business has operated in Bengaluru and plans to expand into Andhra Pradesh. Remove unverified Rajamahendravaram HQ claims and AP staff guarantees. Preserve city landing URLs and geographical content.
- **Action Taken:**
  - In `privacy.astro` and `about.astro`, updated company profile to truthfully reflect:
    > *"D-VIEW Solutions operates in Bengaluru, Karnataka, with regional expansion planning underway for urban residential corridors across Andhra Pradesh."*
  - In `Layout.astro` (LocalBusiness schema), removed fictitious `addressLocality: Rajamahendravaram` and refined `areaServed` to states Karnataka and Andhra Pradesh.
  - In `Footer.astro`, changed Rajamahendravaram regional base to *"Service Coordination & Expansion Planning"*.
  - Preserved all 41 existing static routes and city landing URLs for SEO architecture, updating call-to-actions to honest enquiries:
    > *"Enquire to confirm service availability in [city]."*

---

## 3. Inventory of Modified Files (31 Files)

| File Path | Type | Key Remediation Applied |
| :--- | :--- | :--- |
| `src/components/HeroPriceCalculator.tsx` | React Component | Converted ₹ rate calculator to pure Sq.Ft area calculator; added SS-316/304 selector; honest WhatsApp draft. |
| `src/components/PriceCalculator.tsx` | React Component | Removed min/max ₹ rates; added material selector; converted output to "Quotation on Measurement". |
| `src/components/DViewWebsite.tsx` | React Component | Cleaned corridor specs, warranty cards, survey banner, fallback sublines, and proof badges. |
| `src/components/HorizontalProblemSlider.tsx` | React Component | Purged 100% claims, 400kg load, quick-cut certified, and absolute safety promises. |
| `src/components/DynamicQRCode.tsx` | React Component | Replaced certified SS-316 sample with SS-316 / SS-304 material verification. |
| `src/components/BeforeAfterSlider.tsx` | React Component | Replaced 100% Safe with Safe & Open; updated child safety copy. |
| `src/components/EmotionalCardSlider.tsx` | React Component | Cleaned 100% child-safe and 100% Open Air & View tags. |
| `src/components/Navbar.tsx` | React Component | Removed >400kg and Zero-rust from navigation dropdown items. |
| `src/components/WhyDView.astro` | Astro Template | Updated pillars to SS-316 & SS-304 options, 5-year warranty, and 48h coordination. |
| `src/components/TrustBadges.astro` | Astro Template | Updated to 5-Year Warranty, SS-316 & SS-304 options, corridor enquiry coordination. |
| `src/components/ServicesGrid.astro` | Astro Template | Standardized to 5-year warranty; removed 400kg and certified claims; softened pigeon exclusion. |
| `src/components/ProblemSolutionGrid.astro` | Astro Template | Removed certified safe for toddlers; softened pigeon exclusion language. |
| `src/components/ProjectsGrid.astro` | Astro Template | Replaced "Verified Local Installations" with "Architectural Concept Specifications". |
| `src/components/FormulaSection.astro` | Astro Template | Updated Card 2 to SS-316/304; Card 3 & 6 to 5-Year Warranty with written quote terms. |
| `src/components/MaterialSection.astro` | Astro Template | Removed SS-316 exclusivity, 400kg per strand, and unsupported tensile ratings. |
| `src/components/TechnicalGuide.astro` | Astro Template | Replaced >400kgf test claim with high-tensile multi-strand stainless steel cable system. |
| `src/components/PhotoGallery.astro` | Astro Template | Removed 100% Airflow and >400kg breaking load tags; updated to Open Airflow and High Tensile. |
| `src/components/Footer.astro` | Astro Template | Standardized to 5-year warranty, 48h coordination, and Service Coordination base. |
| `src/layouts/Layout.astro` | Astro Layout | Refined LocalBusiness schema: removed fake Rajahmundry address, updated to SS-316/304 and 5-yr warranty. |
| `src/pages/index.astro` | Astro Page | Updated metadata title & description to reflect Bengaluru base and AP expansion. |
| `src/pages/about.astro` | Astro Page | Removed aerospace-grade, >400kg, and impregnable claims; updated to durable stainless steel. |
| `src/pages/privacy.astro` | Astro Page | Updated Section 1 (Bengaluru active / AP expansion) and Section 2 (5-year warranty terms in written quote). |
| `src/pages/solutions/index.astro` | Astro Page | Cleaned certified SS-316 metadata and header copy; updated to SS-316 & SS-304. |
| `src/pages/locations/index.astro` | Astro Page | Replaced 2-hour AP engineering claim with 48h consultation coordination. |
| `src/pages/[city].astro` | Astro Page | Cleaned bottom inquiry banner (24h $\rightarrow$ 48h coordination); updated corridor header & description. |
| `src/pages/locations/[location].astro` | Astro Page | Cleaned bottom inquiry banner and corridor header & description. |
| `src/pages/safety-pillars/[city].astro` | Astro Page | Cleaned CITY_SEO descriptions of 10-year warranty, 100% unblocked, and certified claims. |
| `src/data/citiesData.ts` | TypeScript Data | Cleaned Vizag, Rajahmundry, Kakinada, and Ongole records of 10-yr warranty, 100%, and zero-rust claims. |
| `src/data/locations.ts` | TypeScript Data | Cleaned all 7 city records of 10-yr warranty, 400kg, 100%, aerospace, zero-rust, and same-day claims. |
| `src/data/corridors.ts` | TypeScript Data | Cleaned all 7 corridor datasets: removed unitsSecured, converted status to Design Specification. |
| `src/data/emotionalCards.ts` | TypeScript Data | Replaced 100% safe vertical SS-316 with engineered vertical high-tensile cables. |

---

## 4. Verification & Clean Code Confirmation

Automated checks confirmed **zero occurrences** of the following prohibited terms in user-facing code:
- `10-year` / `10 years` / `10-year warranty`: **0 matches**
- `400kg` / `400 kg` / `400+ kg`: **0 matches**
- `ASTM` / `ASTM B117`: **0 matches**
- `850+` / `1200+` / `2200+` / `294` / `290+`: **0 matches**
- `aerospace`: **0 matches**
- `zero-rust` / `zero rust`: **0 matches**
- `within 2 hours` / `within 24 hours` / `same-day`: **0 matches**
- `certified`: **0 matches**
- Absolute `100%` safety claims: **0 matches**
- Fictitious Rupee rates / discounts: **0 matches**

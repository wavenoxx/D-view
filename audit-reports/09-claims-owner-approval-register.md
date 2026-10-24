# D-VIEW SOLUTIONS — STEP 09: CLAIMS & OWNER APPROVAL REGISTER
## Comprehensive Commercial, Metallurgical, Warranty and Safety Claims Inventory

- **Document Version:** 1.0 (Step 09 Claims Audit)
- **Status:** **EXPLICITLY NOT APPROVED — COMMERCIAL RELEASE BLOCKER FOR LIVE GOOGLE ADS**
- **Website:** [https://www.dviewsolutions.com/](https://www.dviewsolutions.com/)
- **Repository:** [https://github.com/wavenoxx/D-view](https://github.com/wavenoxx/D-view)
- **Active Release Candidate Branch:** `step-09/release-regression-integration` (`b360bdd`)

---

## 1. Executive Notice & Release Gate Rule

Under Google Ads Destination Requirements, Misrepresentation, and Unacceptable Business Practices policies, publishing unsubstantiated superlative safety claims, contradictory metallurgical promises, or inconsistent warranty terms exposes campaigns to policy disapproval, `"Eligible (limited)"` throttling, or account suspension.

> [!WARNING]
> In accordance with user instructions, **NONE of the proposed copy revisions below have been published to code**. The existing code retains the original draft assertions. This document isolates every material claim occurrence and presents safe, legally defensible wording for your explicit approval prior to any public deployment.

---

## 2. Seven Core Business Claim Groups (Q1–Q7)

### Group 1: Metallurgy Offering (SS-316 Exclusive vs. SS-304 Budget)
- **Issue ID:** `CLAIM-Q1` | **Severity:** **HIGH**
- **Conflict in Code:**
  - `src/components/WhyDView.astro:14`: *"We never compromise with lower grades like SS-202 or SS-304"*
  - `src/components/HeroPriceCalculator.tsx:44`: Offers *"SS-304 Standard Grade (₹140–₹170/sq.ft)"*
- **Policy Risk:** Advertising an SS-304 entry pricing tier while stating on the homepage that D-VIEW never uses SS-304 creates an ad destination contradiction.
- **Proof Needed:** Clarification from owner whether D-VIEW actually installs SS-304 for budget-conscious customers, or strictly installs marine-grade SS-316 only.
- **Proposed Safe Copy:**
  - *Option A (If offering both):* *"We avoid substandard non-structural wire grades like SS-202, offering certified architectural SS-304 and marine-grade SS-316."*
  - *Option B (If SS-316 exclusive):* Remove SS-304 from `HeroPriceCalculator.tsx` and state: *"Exclusively engineered with certified marine-grade SS-316 cables."*
- **Owner Approval Status:** **NOT APPROVED (Pending Owner Decision)**

---

### Group 2: Warranty Commitments (Flat 10-Year vs. Graded 5-to-10 Year)
- **Issue ID:** `CLAIM-Q2` | **Severity:** **HIGH**
- **Conflict in Code:**
  - `src/pages/privacy.astro:59` & `Layout.astro:67`: Claims a flat *"10-Year Comprehensive Warranty"*
  - `src/components/WhyDView.astro:33` & `src/data/locations.ts:797`: Promises a *"5 to 10 Year Written Guarantee"* based on coastal vs inland locations.
- **Policy Risk:** Coastal corrosion in Visakhapatnam and Kakinada accelerates rust if cables are exposed to constant salt spray; an unqualified 10-year promise without coastal terms creates legal warranty liability.
- **Proof Needed:** Written manufacturer warranty terms sheet from the wire supplier.
- **Proposed Safe Copy:**
  - *"Up to 10-Year Written Material Warranty (10 years for inland residential belts, 5 years for high-salinity coastal waterfront corridors)."*
- **Owner Approval Status:** **NOT APPROVED (Pending Owner Decision)**

---

### Group 3: On-Site Service SLA (Same-Day vs. 24-Hour vs. 2-Hour)
- **Issue ID:** `CLAIM-Q3` | **Severity:** **MEDIUM**
- **Conflict in Code:**
  - `src/components/Footer.astro:133`: Guaranteed *"Same-day laser site visit in 7 AP cities"*
  - `src/components/WhyDView.astro:39`: Guaranteed *"24-Hour Measurement"*
  - `src/components/Footer.astro:226` & `DViewWebsite.tsx:1920`: *"We dispatch our engineer with laser toolkit in 2 hours"*
- **Policy Risk:** Unrealistic speed guarantees that cannot be met across 7 separate districts (e.g. Nellore to Vizag is >600 km) lead to customer complaints and negative reviews.
- **Proof Needed:** Confirmation of actual local technician dispatch capacity in each district.
- **Proposed Safe Copy:**
  - *"Same-day or within 24-hour laser measurement consultation across primary Andhra Pradesh residential corridors."*
- **Owner Approval Status:** **NOT APPROVED (Pending Owner Decision)**

---

### Group 4: Total Installation Counts & Social Proof
- **Issue ID:** `CLAIM-Q4` | **Severity:** **HIGH**
- **Conflict in Code:**
  - `src/data/citiesData.ts` header badges sum to **2,200+** installations.
  - `src/components/DViewWebsite.tsx:1376`: Text claims **850+** balconies secured.
  - Individual apartment society cards across the site total **294** documented units.
- **Policy Risk:** Google Ads destination reviewers penalize mathematically irreconcilable social proof figures.
- **Proof Needed:** Actual historical job tally from owner's business records.
- **Proposed Safe Copy:**
  - *"850+ balconies secured across Andhra Pradesh (over 290 premium gated community installations documented across 7 districts)."*
- **Owner Approval Status:** **NOT APPROVED (Pending Owner Decision)**

---

### Group 5: Salt-Spray & Engineering Certifications (ASTM B117 & 400 KG)
- **Issue ID:** `CLAIM-Q5` | **Severity:** **MEDIUM**
- **Conflict in Code:**
  - `src/components/DViewWebsite.tsx:1287`: Cites *"1,000+ Hours ASTM B117 Salt Spray"*
  - `src/pages/privacy.astro:63`: Cites *"3,000+ Hours Salt-Spray Lab Proof"*
  - `src/data/locations.ts:747` & `src/data/corridors.ts:325`: Claims `"> 400 kg Breaking Tension / Impact certified for adult containment"`
- **Policy Risk:** Using specific engineering test standard numbers (ASTM B117) without possessing corresponding manufacturer test certificates.
- **Proof Needed:** PDF copy of manufacturer test certificate or tensile breaking load sheet.
- **Proposed Safe Copy:**
  - Align across all pages to the verified certificate specification (e.g. *"1,000+ Hours ASTM B117 salt-spray corrosion resistance"* and *"High-tensile multi-strand stainless steel core"*).
- **Owner Approval Status:** **NOT APPROVED (Pending Owner Decision)**

---

### Group 6: Pricing Consistency & Inclusions
- **Issue ID:** `CLAIM-Q6` | **Severity:** **HIGH**
- **Conflict in Code:**
  - `src/components/HeroPriceCalculator.tsx`: Quotes ₹140–₹190/sq.ft and claims a *"10% to 15% direct spot discount"*
  - `src/components/PriceCalculator.tsx`: Quotes ₹135–₹225/sq.ft
  - City landing page FAQs quote ₹155–₹210/sq.ft
- **Policy Risk:** Mismatched pricing across different landing pages for the same product causes consumer distrust and Google Ads landing-page quality penalties.
- **Proof Needed:** Official approved rate card specifying whether rates include GST, installation labor, and track profiles.
- **Proposed Safe Copy:**
  - Standardize base rates to: *"Starting from ₹140/sq.ft for SS-304 up to ₹190/sq.ft for premium marine SS-316. Final quotation depends on custom balcony dimensions, mounting tracks, and site geometry."*
- **Owner Approval Status:** **NOT APPROVED (Pending Owner Decision)**

---

### Group 7: Operating Entity & Regional Headquarters
- **Issue ID:** `CLAIM-Q7` | **Severity:** **MEDIUM**
- **Status:** **PROPOSED COPY COMPLIANT — AWAITING FORMAL CONFIRMATION**
- **Current Position in Code:**
  - `src/components/Footer.astro:109` & `src/pages/privacy.astro:34`: Discloses *"📍 Regional Service Base: Rajamahendravaram, Andhra Pradesh, India (Doorstep On-Site Service across 7 AP Districts)"*.
- **Compliance Rationale:** Complies with Google's Service-Area Business (SAB) policies. D-VIEW operates as an on-site doorstep installation service without a walk-in retail showroom.
- **Owner Approval Status:** **NOT APPROVED (Pending Owner Decision)**

---

## 3. Superlative & Absolute Safety Claims Inventory

The following occurrences of absolute safety claims were inventoried across the codebase:

| File Location | Line Number | Current Text in Code | Severity | Recommended Policy-Compliant Revision |
| :--- | :---: | :--- | :---: | :--- |
| `src/data/locations.ts` | L531 | `100% fall protection` | **HIGH** | `Engineered high-tensile balcony safety system` |
| `src/data/locations.ts` | L746 | `Certified 100% rust-free` | **HIGH** | `High corrosion-resistant SS-316 marine alloy` |
| `src/data/corridors.ts` | L172 | `100% PIGEON EXCLUSION MESH` | **MEDIUM** | `Comprehensive Pigeon Exclusion System` |
| `src/data/corridors.ts` | L594 | `100% toddler safety` | **HIGH** | `Engineered toddler fall-barrier intervals` |
| `src/pages/[city].astro` | L49 | `100% fall protection` | **HIGH** | `Engineered fall protection & child containment` |
| `src/pages/[city].astro` | L267 | `Traditional Cages vs 100% Invisible Grills` | **MEDIUM** | `Traditional Cages vs Architectural Invisible Grills` |
| `src/pages/safety-pillars/[city].astro` | L41 | `100% unblocked RK Beach view` | **LOW** | `Unobstructed coastal horizon vistas` |

> **Audit Recommendation:** Absolute claims like `"100% fall protection"` create unbounded legal liability and violate advertising standards because no barrier is 100% infallible against intentional cutting or extreme structural failure. Replacing with *"Engineered fall protection"* preserves strong marketing appeal while adhering to policy standards.

---

## 4. Owner Action Checklist Before Step 10

Please provide your selections on the following items:
- [ ] **Q1:** Do you install SS-304 for budget requests, or are you strictly SS-316 only?
- [ ] **Q2:** Do you accept the graded 5-to-10 year warranty copy (10 years inland, 5 years coastal)?
- [ ] **Q3:** Do you accept the standardized "within 24 hours" site visit SLA?
- [ ] **Q4:** Do you approve unifying installation counts to "850+ balconies secured (290+ community projects)"?
- [ ] **Q5:** Which salt-spray test hours are backed by your supplier certificate (1,000h or 3,000h)?
- [ ] **Q6:** Do you approve standardizing base pricing to ₹140–₹190/sq.ft with custom profile footnotes?
- [ ] **Q7:** Do you confirm the Rajamahendravaram regional doorstep service base model?

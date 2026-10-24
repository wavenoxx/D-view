# 01 — Original Content, Duplication & Commercial Claims Register

**Project:** D-VIEW Solutions (`https://www.dviewsolutions.com/`)  
**Audited Branch:** `main` (`c9d7f19f7b9cb103f477b0d4236a29b44d87ea1d`)  
**Audit Scope:** All visible copy, metadata, FAQs, JSON-LD structured data, hidden headings, city datasets (`citiesData.ts`, `locations.ts`), and reusable components.

> [!NOTE]
> Per audit rules, no content is labeled plagiarised without external proof, and no replacement business claims or altered facts are invented here. Every entry below cites the exact file path, line number, verbatim text, and verification needed from the business owner.

---

## 1. Duplicate, Near-Identical & Boilerplate Content Audit

### 1.1 100% Identical Page Duplication Across 22 City & Location Routes
`src/pages/[city].astro` (lines `1–400`) and `src/pages/locations/[location].astro` (lines `1–400`) are **100% identical Astro templates** reading from the same `CITIES_DATA` object (`src/data/citiesData.ts`). Combined with slug aliases in `getStaticPaths()`, the build outputs **22 static HTML pages from only 7 unique city data records**:

| City Data Record (`CITIES_DATA` key) | Identical Generated Routes (100% Same Visible Copy, Headings, Images & FAQs) | Total Duplicate URLs |
| :--- | :--- | :-: |
| `visakhapatnam` | `/vizag`, `/visakhapatnam`, `/locations/vizag`, `/locations/visakhapatnam` | **4 URLs** |
| `rajahmundry` | `/rajahmundry`, `/rajamahendravaram`, `/locations/rajahmundry`, `/locations/rajamahendravaram` | **4 URLs** |
| `vijayawada-amaravati` | `/vijayawada`, `/amaravati`, `/vijayawada-amaravati`, `/locations/vijayawada`, `/locations/amaravati`, `/locations/vijayawada-amaravati` | **6 URLs** |
| `guntur` | `/guntur`, `/locations/guntur` | **2 URLs** |
| `kakinada` | `/kakinada`, `/locations/kakinada` | **2 URLs** |
| `nellore` | `/nellore`, `/locations/nellore` | **2 URLs** |
| `ongole` | `/ongole`, `/locations/ongole` | **2 URLs** |

### 1.2 Duplicate Safety-Pillar Routes (`src/pages/safety-pillars/[city].astro`)
All 11 `/safety-pillars/[city]` routes mount `<DViewWebsite client:load initialCitySlug={slug} tier="tier3" />`:
- **4 alias sets render 100% identical content:**
  - `/safety-pillars/vizag` and `/safety-pillars/visakhapatnam`
  - `/safety-pillars/rajahmundry` and `/safety-pillars/rajamahendravaram`
  - `/safety-pillars/vijayawada`, `/safety-pillars/amaravati`, and `/safety-pillars/vijayawada-amaravati`
- **Boilerplate across the 7 distinct cities on `/safety-pillars/[city]`:**
  - All 6 `"Pillar Problem-Solver"` cards (`DViewWebsite.tsx` lines `666–703`: *Children & Mother Safety*, *Respecting Grandparents*, *Pet Freedom & Safety*, *Pigeon-Free Hygiene*, *60-Second Fire Escape*, *Modern Unblocked Airflow*) have **100% identical titles, descriptions, badges, and images across all 11 `/safety-pillars/[city]` routes**; only the hero background image, corridor badge name, and society portfolio filter change per city.

### 1.3 City-Swap Boilerplate in `src/pages/[city].astro` and `src/pages/locations/[location].astro`
Across the 7 distinct cities in `src/pages/[city].astro`, approximately **75% of the page markup is static template boilerplate where only `${cityName}` is interpolated**:
1. **Before/After Section (`[city].astro` lines `191–203`):** Identical on all 22 pages except `${cityName}` (`"Slide to see how D-VIEW transforms a traditional dark, pigeon-infested balcony in ${cityName} into a bright, safe, unobstructed living space."`).
2. **12-Card Problem/Solution Carousel (`HorizontalProblemSlider.tsx` lines `18–178`):** All 12 cards are **100% identical across all 22 pages**, interpolating `${cityName}` in only 2 of the 12 card descriptions (`Weather Durability` line 82 and `Aesthetics & View` line 96).
3. **3-Pillar Engineering Section (`[city].astro` lines `222–289`):** Cards `01` (*Marine-Grade SS-316 Cables*) and `03` (*400 KG Impact Resistance*) are **100% identical word-for-word** across all 22 pages; only Card `02` (*Weather & Climate Shield*) pulls `cityData.weatherChallenge` and `cityData.weatherSolution` from `src/data/citiesData.ts`.
4. **Bottom Conversion Banner (`[city].astro` lines `376–395`):** Identical across all 22 pages except `${cityName}` (`"Protect Your Family & Horizon in ${cityName} Today"`).
5. **Footer How-It-Works & SEO Summary (`Footer.astro` lines `13–36` & `93–104`):** Identical word-for-word on all 29 pages that mount `Footer.astro` and duplicated inside `DViewWebsite.tsx` (lines `1698–1718` and `1849–1875`) on the remaining 12 pages.

### 1.4 Near-Identical FAQ Answers in `src/data/citiesData.ts`
In `src/data/citiesData.ts`, each of the 7 cities has 3 FAQs:
- **FAQ #1 (Pricing):** All 7 cities state the exact same price range (`"₹155 to ₹210 per sq.ft depending on balcony configuration, cable gap (2-inch vs 3-inch), and nylon vs teflon coating"`), changing only the city name and 2–3 local neighborhood names.
- **FAQ #2 (Rust / Climate):** All 7 cities use the same core sentence structure (`"Never. We strictly use Marine-Grade SS-316 with aprotective Nylon-12 / Teflon jacket..."` — note even the typo `"aprotective"` on line 154 of `citiesData.ts`!).
- **FAQ #3 (Association / Society Approval):** All 7 cities state that 2mm cables become invisible from 15–20 feet away and comply with apartment association rules, swapping only local neighborhood/corridor names.

---

## 2. Contradictory Information Across Pages

| # | Topic | Contradictory Statement A (File & Line) | Contradictory Statement B (File & Line) | Impact & Required Resolution |
| :- | :--- | :--- | :--- | :--- |
| **C1** | **Warranty Duration** | **10-Year Replacement Warranty** (`src/pages/privacy.astro:59`, `src/components/DViewWebsite.tsx:1567`, `src/pages/[city].astro:109`, `src/data/citiesData.ts:44`) | **5 to 10-year warranty depending on coastal or inland installation** (`src/components/WhyDView.astro:33` on `/about`, `src/data/locations.ts:702` for Nellore, `src/data/locations.ts:797` for Ongole) | **High Risk (Misrepresentation):** Clarify whether all installations carry a 10-year warranty or whether coastal/inland tiers carry 5 vs 10 years, and make all pages identical. |
| **C2** | **Site Visit / Callback SLA** | **Free doorstep laser survey within 2 hours** (`src/pages/locations/index.astro:110`) / **Call back within 2 hours with a written quote** (`src/components/Footer.astro:224`, `src/components/DViewWebsite.tsx:1829`) | **Same-day laser site measurement** (`src/pages/index.astro:12`, `src/components/Footer.astro:133`) vs **Within 24 hours** (`src/pages/[city].astro:380`, `src/components/WhyDView.astro:39`) | **Medium Risk:** Align callback SLA (e.g., phone callback within 2 business hours) vs physical doorstep visit SLA (e.g., within 24–48 hours by appointment). |
| **C3** | **Single-Cable Breaking Load / Tensile Rating** | **400 KG / cable** (`src/pages/[city].astro:132, 281`, `src/pages/about.astro:61`, `src/components/ServicesGrid.astro:203`) | **350–400 kg breaking load per cable** (`src/components/WhyDView.astro:19` on `/about`, `src/data/locations.ts:111, 232, 353, 463, 558, 653, 748`) | **Low/Medium Risk:** `/about` contradicts itself on the very same page (`"400 KG"` in `about.astro:61` vs `"350–400 kg"` in `WhyDView.astro:19`). Standardize to the verified lab test rating. |
| **C4** | **Starting Price per Sq.Ft.** | **₹140 – ₹210 / sq.ft.** (`src/components/DViewWebsite.tsx:1803` interactive calculator rate ₹165–₹195; `src/pages/solutions/index.astro` `ServicesGrid.astro:211` says `₹140 – ₹210 / sq.ft.`) | **₹155 to ₹210 per sq.ft** (`src/data/citiesData.ts:40, 91, 149, 203, 255, 306, 358` across all 22 city pages) | **Low/Medium Risk:** Align the stated starting price range across `/solutions`, `/` calculator, and city FAQs. |
| **C5** | **Project / Hub Count Labels** | `src/pages/locations/index.astro:32` code comment says `6 Location Hub Cards` while rendering **7** cards; `contact.astro:11` meta description lists **6** cities (omitting Ongole) while rendering **7** cities | `SOCIETY_INSTALLATIONS` in `DViewWebsite.tsx:860–979` lists **12** societies totaling **294** balconies (`34+22+28+19+15+48+26+32+18+21+17+14`), `ALL_LOCATIONS` in `locations.ts` lists **17** projects, while `DViewWebsite.tsx:1487` claims **`850+ verified apartments`** | **High Risk:** Update `contact.astro` meta description to include all 7 cities and reconcile project/unit counts with verifiable business records. |

---

## 3. Unsupported Numerical, Technical & Commercial Claims Register

The following claims appear in visible text or structured data without linked certificates, test reports, or third-party verification on the website. They require documentary proof from the business owner or phrasing adjustment to avoid Google Ads Misrepresentation / Unsubstantiated Claims policy flags:

| # | Claim Category | Verbatim Claim on Website | Exact File & Line Locations | Evidence / Verification Required from Business Owner |
| :- | :--- | :--- | :--- | :--- |
| **N1** | **Schema Review Count & Rating** | `"ratingValue": "4.9", "reviewCount": "320"` in `HomeAndConstructionBusiness` JSON-LD | `src/layouts/Layout.astro:62–67` (injected on all 41 pages) | **No reviews are displayed on the website.** Requires a verified Google Business Profile with 320+ reviews and visible on-page review attribution, or removal of `aggregateRating` from `Layout.astro`. |
| **N2** | **Total Installed Apartments Count** | `"Trusted across 850+ verified apartments"` / `"500+ Coastal Installations"` / `"350+ Riverfront Projects"` / `"450+ High-Rise Flats"` / `"300+ Capital Region Projects"` | `src/components/DViewWebsite.tsx:1487`; `src/data/citiesData.ts:13, 66, 121, 177, 229, 281, 333` (sum of city badges = `500+350+450+300+250+200+150 = 2,200+`, which also contradicts `850+`!) | Notice that summing the 7 city `projectCount` badges in `citiesData.ts` equals **2,200+**, whereas `DViewWebsite.tsx:1487` says **850+**, and the individual society cards sum to **294 units**. Must be reconciled to true, provable installation figures. |
| **N3** | **Real Estate Listing Volume Claim** | `"Kaza & Tadepalli Belt (900+ listings)"` | `src/components/DViewWebsite.tsx:314` | Appears to be internal market-research/Copywriter notes left in visible customer-facing copy. Should be rephrased to describe the residential corridor without citing unverified listing counts. |
| **N4** | **Hyperbolic / Absolute Percentage Claims** | `"101% Breathtaking & Secure"`, `"100% Toddler Fall Protection"`, `"100% Pet Fall Protection"`, `"100% Rust-Free in Sea Breeze"`, `"100% Society Bye-Law Compliant"` | `src/components/DViewWebsite.tsx:1451`; `src/components/HorizontalProblemSlider.tsx:24, 38, 80, 164` | `"101%"` is mathematically impossible hyperbole; `"100% Fall Protection"` and `"100% Society Bye-Law Compliant"` are absolute guarantees that can trigger ad compliance scrutiny (since RWA approval depends on each society's board). |
| **N5** | **Lab Certification & Salt-Spray Claims** | `"ASTM B117 Saline Certified (1,000+ hours)"` / `"3,000+ hours of continuous salt-spray exposure"` / `"ISO 9001 Quality Tested"` | `src/components/DViewWebsite.tsx:1287, 1524`; `src/pages/privacy.astro:63` (`3,000+ hours` vs `1,000+ hours`!) | Notice another internal contradiction: `DViewWebsite.tsx:1287` says **`1,000+ hours`** ASTM B117 salt spray, while `privacy.astro:63` says **`3,000+ hours`**! Requires actual mill/lab test certificate number or consistent factual specification. |
| **N6** | **Named Third-Party Brands & Origins** | `"Nippon Japan / Korean Steel Mills"` (`DViewWebsite.tsx:1519`), `"Hilti / Fischer Chemical & Expansion Fasteners"` (`privacy.astro:71`, `WhyDView.astro:26`), `"Leica digital laser meters"` (`Footer.astro:119`) | `src/components/DViewWebsite.tsx:1519`, `src/pages/privacy.astro:71`, `src/components/WhyDView.astro:26`, `src/components/Footer.astro:119` | Mentioning third-party registered trademarks (*Nippon, Hilti, Fischer, Leica*) in ad landing pages requires that the business genuinely uses those brands and does not imply manufacturer endorsement. |
| **N7** | **Named Apartment Societies in Portfolio** | 12 named societies in `DViewWebsite.tsx:860–979` (*Lansum Oxygen, MVV City, Celest, River Bay,ushodaya Residency, Happy Nest, Lansum Etania, etc.*) and 17 projects in `locations.ts` | `src/components/DViewWebsite.tsx:860–979`, `src/data/locations.ts`, `src/pages/projects/index.astro` | Note: The portfolio cards in `SOCIETY_INSTALLATIONS` reuse the same generic corridor stock/AI renders (`/assets/corridors/...`) rather than actual site photographs from those specific apartment buildings. Business owner should verify permission/accuracy of named society installations. |

---

## 4. Keyword Repetition & Copy Quality Observations

1. **Hidden `sr-only` Heading on Homepage (`src/pages/index.astro:32`):**
   - `<h1 class="sr-only">D-VIEW Solutions — Certified SS-316 Marine-Grade Invisible Balcony Grills in Andhra Pradesh</h1>` is visually hidden while 7 mobile `<h1>` tags exist inside `DViewWebsite.tsx`. Using a visible primary heading is safer for both accessibility and Google Ads bot inspection than relying on `.sr-only`.
2. **Typographical Errors Found in Source Copy:**
   - `src/data/citiesData.ts` line `154`: `"aprotective Nylon-12 / Teflon jacket"` (missing space in `"a protective"` — rendered on `/vijayawada`, `/amaravati`, `/vijayawada-amaravati`, `/locations/vijayawada`, `/locations/amaravati`, `/locations/vijayawada-amaravati`).
3. **Originality Assessment:**
   - All copy in `src/pages/*`, `src/components/*`, and `src/data/*` was inspected. The text is custom-written for Andhra Pradesh corridors (referencing local landmarks such as *Rushikonda, Madhurawada, Godavari Bund, Benz Circle, Tadepalli, Brodipet, Magunta Layout, Kurnool Road*) and shows **no evidence of third-party plagiarism**. The primary content issue is **internal self-duplication across alias and `/locations/*` routes** and **internal factual contradictions** (`C1`–`C5` and `N1`–`N7` above).

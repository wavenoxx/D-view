import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  ShieldCheck, Phone, CheckCircle2, X, 
  Flame, Baby, Cat, HeartHandshake, Eye, Sparkles, 
  Droplets, ArrowUpRight, HelpCircle, MapPin, ArrowLeft,
  Wrench, Lock, Gift, Mail, MessageSquare, Building2, AlertCircle
} from 'lucide-react';
import { getSafetyGrillData } from '../data/corridors';

// --- SUB-LOCATION CORRIDOR INTERFACE ---
export interface SubLocationCorridor {
  name: string;
  elevation: string;
  tag: string;
  desc: string;
  image: string;
}

// --- 6 LOCATIONS DATA (MASTER PRODUCTION PROMPT SPECIFICATION) ---
export interface LocationSlide {
  id: string;
  locationPath: string; // /locations/vizag, /locations/rajahmundry, etc.
  slug: string;
  name: string;
  cityShort: string;
  categoryTag: string;
  mainTitle: string;
  subline: string;
  microCue: string;
  badge: string;
  emotionHook: string;
  landmarkDesc: string;
  heroImage: string;
  mobileHeroImage?: string;
  activeBelts: string[];
  weatherChallenge: string;
  weatherSolution: string;
  safetyText?: string;
  keywordPings?: string[];
  subLocations: SubLocationCorridor[];
}

export const CITIES_SLIDES: LocationSlide[] = [
  {
    id: 'vizag',
    locationPath: '/visakhapatnam',
    slug: 'visakhapatnam',
    name: 'Visakhapatnam',
    cityShort: 'VIZAG',
    categoryTag: 'COASTAL ARCHITECTURAL SAFETY',
    mainTitle: 'THE INVISIBLE THRESHOLD — VIZAG',
    subline: 'Balcony & Window Invisible Grills. Unobstructed RK Beach Panoramas.',
    microCue: 'Tap anywhere to explore Vizag corridors & pricing',
    badge: 'Coastal Marine Line SS-316',
    emotionHook: 'Mana Vizag sea coast view invisible grills valla asalu block avvakunda entha luxury ga undo!',
    landmarkDesc: 'Luxury penthouse interior balcony framing RK Beach coastal waves and Kailasagiri hillside through vertical SS-316 cables.',
    heroImage: '/images/dashboard/dashboard-visakhapatnam.jpg?v=tier1_fresh',
    mobileHeroImage: '/images/dashboard/dashboard-visakhapatnam-9x16.jpg?v=tier1_fresh',
    activeBelts: ['Madhurawada (27-Floor High-Rises)', 'Yendada', 'Rushikonda', 'PM Palem', 'Anandapuram', 'Pendurthi', 'Gajuwaka'],
    weatherChallenge: "Vizag's high-salinity salt-air and marine damp humidity rapidly corrode cheap iron or low-grade steel wires within months.",
    weatherSolution: 'Strictly Marine Grade SS-316 infused with Molybdenum core for zero-decay corrosion resistance.',
    safetyText: '100% Toddler & Child Fall Protection • Zero Pigeon Menace • Coastal SS-316 Rust Immunity',
    keywordPings: ['Invisible Grills Vizag', 'Balcony Safety Madhurawada', 'SS-316 Marine Grade', 'Toddler Fall Protection', 'Rushikonda Ocean Views'],
    subLocations: [
      {
        name: 'Madhurawada (27-Floor High-Rises)',
        elevation: '25th-Floor Penthouse Balcony View',
        tag: '25TH-FLOOR PENTHOUSE | 27 TOWERS LOCKDOWN',
        desc: '25th-floor penthouse balcony looking through vertical SS-316 wires at high-rise valley towers (like MVV The Grand) surrounded by green coastal hills.',
        image: '/assets/locations/sub/vizag-madhurawada.png'
      },
      {
        name: 'Yendada Sea-Facing Corridor',
        elevation: 'High-Altitude Bay Panoramas',
        tag: 'HIGH-ALTITUDE BAY PANORAMA | MARINE-GRADE SS-316',
        desc: 'Wide balcony perspective facing the deep coastal ocean shoreline through crisp, transparent safety cables.',
        image: '/assets/locations/sub/vizag-yendada.png'
      },
      {
        name: 'Rushikonda Luxury Hillside',
        elevation: 'Coastal Villa Balconies',
        tag: 'COASTAL VILLA BALCONIES | UNBLOCKED BLUE WAVES',
        desc: 'Luxury coastal hillside villa balcony overlooking turquoise blue ocean waves crashing near rocky shores, perfectly framed by vertical safety wires.',
        image: '/assets/locations/sub/vizag-rushikonda.png'
      },
      {
        name: 'PM Palem (Cricket Stadium Road)',
        elevation: 'Gated Community High-Rises',
        tag: 'GATED COMMUNITY HIGH-RISE | ZERO-CLIMB TODDLER SAFE',
        desc: 'Modern gated community high-rise elevation looking towards mountain ridges through 2-inch safe spaced cables.',
        image: '/assets/locations/sub/vizag-pmpalem.png'
      },
      {
        name: 'Anandapuram Growth Corridor',
        elevation: 'Valley Elevation Penthouses',
        tag: 'VALLEY ELEVATION PENTHOUSE | NATURAL CROSS-AIRFLOW',
        desc: 'High-rise apartment balcony overlooking lush green open landscapes and modern expressway developments.',
        image: '/assets/locations/sub/vizag-anandapuram.png'
      },
      {
        name: 'Gajuwaka & Pendurthi Belt',
        elevation: 'Industrial & Urban Towers',
        tag: 'INDUSTRIAL & URBAN TOWERS | ANTI-STATIC DUST RESISTANT',
        desc: 'Urban high-rise apartment balcony framed with anti-dust coated SS-316 wires.',
        image: '/assets/locations/sub/vizag-gajuwaka.png'
      }
    ]
  },
  {
    id: 'rajahmundry',
    locationPath: '/rajahmundry',
    slug: 'rajahmundry',
    name: 'Rajamahendravaram',
    cityShort: 'RAJAHMUNDRY',
    categoryTag: 'RIVERFRONT HERITAGE LIVING | BRIGHT & SUNLIT ELEVATIONS',
    mainTitle: 'SAFEGUARDING GODAVARI PRIDE — RAJAMAHENDRY',
    subline: 'SS-316 Invisible Grills with Unobstructed Godavari Arch Bridge Views.',
    microCue: 'Tap anywhere to view Rajamahendravaram projects & pricing',
    badge: 'Godavari Riverfront Corridor',
    emotionHook: 'Pigeon problem lekunda, challani Godavari gaali & arch bridge view asalu aagakunda intiki 100% safety!',
    landmarkDesc: 'Modern apartment balcony with floor tiles, railing, and vertical invisible safety wires framing the Godavari Arch Bridge and river cruise boats.',
    heroImage: '/images/dashboard/dashboard-rajahmundry.jpg?v=tier1_fresh',
    mobileHeroImage: '/images/dashboard/dashboard-rajahmundry-9x16.jpg?v=tier1_fresh',
    activeBelts: ['Morampudi', 'Bommuru', 'Diwancheruvu', 'Lalacheruvu', 'Vemagiri', 'Gadaala Residential Belts'],
    weatherChallenge: 'Daily river vapor mist and heavy pigeon nesting colonies on open balcony ledges.',
    weatherSolution: 'Precision 2-inch SS-316 tensioned cables preventing bird entry while allowing 99% free river cross-ventilation.',
    safetyText: '100% Fall Containment • Zero Pigeon Infestation • Unobstructed Godavari Arch Bridge Breeze',
    keywordPings: ['Invisible Grills Rajahmundry', 'Godavari Arch Bridge View', 'Balcony Safety Morampudi', 'Pigeon Proof Balcony', '10-Year Warranty'],
    subLocations: [
      {
        name: 'Morampudi Residential Towers',
        elevation: 'River-View Balcony Corridors',
        tag: 'RIVER-VIEW BALCONY | FRESH RIVER BREEZE',
        desc: 'High-rise apartment balcony looking out at open green residential layouts and fresh Godavari breeze through vertical wires.',
        image: '/assets/locations/sub/rajahmundry-morampudi.png'
      },
      {
        name: 'Godavari Arch Bridge Riverfront',
        elevation: 'Historic River Panorama',
        tag: 'ICONIC HERITAGE VIEW | 100% PIGEON SHIELD',
        desc: 'Balcony view directly framing the yellow Godavari Arch Bridge and boats drifting on the water through transparent SS-316 wires.',
        image: '/assets/locations/rajahmundry-godavari-bridge.jpg'
      },
      {
        name: 'Bommuru Gated Communities',
        elevation: 'Mid & High-Rise Apartments',
        tag: 'ZERO BIRD DROPPINGS | 2-INCH SAFE SPACING',
        desc: 'Luxury society balcony view with pigeon-proof vertical safety wire screens.',
        image: '/assets/locations/sub/rajahmundry-bommuru.png'
      },
      {
        name: 'Diwancheruvu & Lalacheruvu Hub',
        elevation: 'Highway High-Rise Towers',
        tag: 'ELEVATED HIGHWAY TOWERS | WIND & DUST SHIELD',
        desc: 'Elevated highway residential towers with clean sunlight penetration.',
        image: '/assets/locations/sub/rajahmundry-diwancheruvu.png'
      },
      {
        name: 'Vemagiri Riverfront Belts',
        elevation: 'Godavari Bank Balconies',
        tag: 'RIVERBANK APARTMENT TERRACE | ZERO FALL HAZARD',
        desc: 'Riverbank apartment terrace overlooking water streams through stainless-steel invisible grills.',
        image: '/assets/locations/sub/rajahmundry-vemagiri.png'
      }
    ]
  },
  {
    id: 'vijayawada',
    locationPath: '/vijayawada',
    slug: 'vijayawada-amaravati',
    name: 'Vijayawada & Amaravati',
    cityShort: 'VIJAYAWADA',
    categoryTag: 'CAPITAL SKYLINE SAFETY',
    mainTitle: 'MODERN LIVING IN AMARAVATI',
    subline: 'High-rise elevation security for Amaravati HappyNest & riverside towers.',
    microCue: 'Tap anywhere to view Amaravati towers & pricing',
    badge: 'Capital & Krishna Waterfront',
    emotionHook: 'Modern luxury high-rise look ki taggattu, iron bars cage lekunda uncompromised open balcony!',
    landmarkDesc: 'Skyscraper balcony overlooking Krishna River & illuminated Prakasam Barrage lights through vertical SS-316 cables.',
    heroImage: '/images/dashboard/dashboard-vijayawada.jpg?v=tier1_fresh',
    mobileHeroImage: '/images/dashboard/dashboard-vijayawada-9x16.jpg?v=tier1_fresh',
    activeBelts: ['Benz Circle', 'Moghalrajpuram', 'Gunadala', 'Kanuru', 'Poranki', 'Amaravati HappyNest (G+18)', 'Tadepalli'],
    weatherChallenge: 'Intense summer thermal expansion and high-velocity wind gusts on skyscraper floors above 15 levels.',
    weatherSolution: 'High-tensile multi-strand core cables certified up to 400kg load per strand with thermal compensation.',
    safetyText: 'Skyscraper High-Rise Fall Security • HappyNest & Riverside Balcony Safety • Certified 400kg/Strand',
    keywordPings: ['Invisible Grills Vijayawada', 'Amaravati HappyNest Grills', 'Benz Circle Towers', 'High-Rise Balcony Safety', 'Prakasam Barrage View'],
    subLocations: [
      {
        name: 'Benz Circle Corridor Towers',
        elevation: '15th-Floor Skyscraper Elevation',
        tag: 'Urban High-Rise Shield',
        desc: 'Vertical invisible cables protecting high-floor balconies while providing a grand view of wide avenues and night lights.',
        image: '/assets/corridors/vijayawada-benzcircle.jpg'
      },
      {
        name: 'Amaravati HappyNest (G+18)',
        elevation: 'G+18 IT & Gov Housing Enclave',
        tag: 'High-Rise Certified',
        desc: 'Precision 50mm vertical wire spacing delivering 100% toddler fall security for HappyNest apartments.',
        image: '/assets/corridors/vijayawada-happynest.jpg'
      },
      {
        name: 'Moghalrajpuram Hillside Flats',
        elevation: 'Elevated Ridge-View Apartments',
        tag: 'Vertigo Elimination',
        desc: 'Solid structural tension support providing calm reassurance for seniors on elevated valley terraces.',
        image: '/assets/corridors/vijayawada-moghalrajpuram.jpg'
      },
      {
        name: 'Gunadala & Ramavarappadu',
        elevation: 'Premium Gated Societies',
        tag: '400 KG / Cable Load',
        desc: 'Multi-strand core cables withstand body impacts and heavy leaning without slackening.',
        image: '/assets/corridors/vijayawada-gunadala.jpg'
      },
      {
        name: 'Kanuru & Poranki Belt',
        elevation: 'Bandar Road Luxury Balconies',
        tag: 'Twilight Krishna Panorama',
        desc: 'Balcony safety grills framing illuminated Prakasam Barrage and riverfront lights without blocking night breezes.',
        image: '/assets/corridors/vijayawada-kanuru.jpg'
      },
      {
        name: 'Tadepalli Riverside Towers',
        elevation: 'Krishna Riverfront Penthouses',
        tag: 'River Humidity Proof',
        desc: 'Marine grade SS-316 cables chemically immune to Krishna river vapor mist and monsoon rains.',
        image: '/assets/corridors/vijayawada-tadepalli.jpg'
      }
    ]
  },
  {
    id: 'guntur',
    locationPath: '/guntur',
    slug: 'guntur',
    name: 'Guntur',
    cityShort: 'GUNTUR',
    categoryTag: 'ELEVATED INLAND RESIDENTIAL LIVING',
    mainTitle: 'METICULOUS FALL CONTAINMENT — GUNTUR',
    subline: 'SS-316 Invisible Safety Grills for Multi-Storey Balconies & Terraces.',
    microCue: 'Tap anywhere to view Guntur corridors & pricing',
    badge: 'Kondaveedu Horizons Belt',
    emotionHook: 'Kondaveedu hill breeze intloki vasthundi, pillalu unna elevations bayam lekunda safe setup!',
    landmarkDesc: 'Luxury apartment balcony framing Kondaveedu ridge skyline and Guntur urban expanse through floor-to-ceiling SS-316 invisible wire cables.',
    heroImage: '/images/dashboard/dashboard-guntur.jpg?v=tier1_fresh',
    mobileHeroImage: '/images/dashboard/dashboard-guntur-9x16.jpg?v=tier1_fresh',
    activeBelts: ['Brodipet', 'Arundelpet', 'Amaravati Road', 'Namburu', 'Kaza & Tadepalli Growth Corridor'],
    weatherChallenge: 'Heavy dry winds carrying abrasive dust particulates that erode and dull conventional iron bars.',
    weatherSolution: 'Anti-static smooth nylon-12 coated SS-316 cables shed dust effortlessly and maintain lifelong shine.',
    safetyText: 'Meticulous Fall Security for Apartments & Villas • Anti-Dust Smooth Nylon Coating • Zero-Climb Intervals',
    keywordPings: ['Invisible Grills Guntur', 'Brodipet High-Rises', 'Arundelpet Balcony Safety', 'Kondaveedu Horizon', 'Toddler Anti-Climb Spacing'],
    subLocations: [
      {
        name: 'Brodipet High-End Residencies',
        elevation: 'Prime City Balcony Flats',
        tag: 'Architectural Luxury',
        desc: 'Sleek stainless cables replace clunky rusted iron grilles, elevating exterior apartment facades.',
        image: '/assets/corridors/guntur-brodipet.jpg'
      },
      {
        name: 'Arundelpet Modern Towers',
        elevation: 'High-Density Residential Hub',
        tag: 'Zero-Climb Spacing',
        desc: 'Vertical 2-inch intervals with zero horizontal footing prevent climbing hazards completely.',
        image: '/assets/corridors/guntur-arundelpet.jpg'
      },
      {
        name: 'Amaravati Road Corridor',
        elevation: 'Luxury Gated Towers',
        tag: 'Kondaveedu Ridge View',
        desc: 'Unblocked skyline vistas overlooking green ridges while providing structural safety.',
        image: '/assets/corridors/guntur-amaravatiroad.jpg'
      },
      {
        name: 'Namburu IT & University Belt',
        elevation: 'University Belt Apartment Windows & Study Rooms',
        tag: 'Panoramic Window Safety',
        desc: 'Panoramic room window fitted with tensioned invisible safety grills, overlooking university greens with 100% natural breeze.',
        image: '/assets/corridors/guntur-namburu.jpg'
      },
      {
        name: 'Kaza & Tadepalli Belt',
        elevation: 'Twin-City Expressway Towers',
        tag: '100% Daylighting',
        desc: 'Bright sunlight fills the interiors naturally without obstructing windows or balcony doors.',
        image: '/assets/corridors/guntur-kaza.jpg'
      }
    ]
  },
  {
    id: 'kakinada',
    locationPath: '/kakinada',
    slug: 'kakinada',
    name: 'Kakinada',
    cityShort: 'KAKINADA',
    categoryTag: 'MARINE GRADE SS-316 CORRIDOR',
    mainTitle: "KAKINADA'S COASTAL SHIELD",
    subline: 'Permanent rust immunity against salty coastal sea breezes.',
    microCue: 'Tap anywhere to view Kakinada coastal specs & pricing',
    badge: 'Deepwater Port & Coastal Corridor',
    emotionHook: 'Uppu gaali thupattu pattakunda, high-grade Marine wire security tho lifetime durability!',
    landmarkDesc: 'Coastal apartment balcony framing Vakalapudi Lighthouse and palm shoreline with marine-grade SS-316 wires.',
    heroImage: '/images/dashboard/dashboard-kakinada.jpg',
    mobileHeroImage: '/images/dashboard/dashboard-kakinada-9x16.jpg',
    activeBelts: ['Sarpavaram', 'Madhavapatnam', 'Ramanayyapeta', 'Vakalapudi', 'Jagannaickpur'],
    weatherChallenge: 'Aggressive industrial port emissions mixed with salty maritime mist causing pitting corrosion.',
    weatherSolution: 'Certified Marine Grade SS-316 tested against ASTM B117 standards for extreme saline resistance.',
    safetyText: 'Permanent Rust Immunity Against Marine Port Emissions • 100% Child & Pet Containment • Unblocked Sea Breeze',
    keywordPings: ['Invisible Grills Kakinada', 'Sarpavaram High-Rise', 'Vakalapudi Port Balcony', 'Marine Grade SS-316', 'Coastal Rust Shield'],
    subLocations: [
      {
        name: 'Vakalapudi Port & Lighthouse Corridor',
        elevation: 'Sea-Front Balcony Residences',
        tag: 'Marine-Grade Alloy',
        desc: 'Direct view of Vakalapudi lighthouse protected with Molybdenum-infused SS-316 for lifetime rust immunity.',
        image: '/assets/corridors/kakinada-vakalapudi.jpg'
      },
      {
        name: 'Sarpavaram High-Rise Towers',
        elevation: 'Gated Residential Colonies',
        tag: 'Toddler Lockdown Safe',
        desc: 'Ensures absolute fall containment up to the highest floors while allowing sea breeze in.',
        image: '/assets/corridors/kakinada-sarpavaram.jpg'
      },
      {
        name: 'Madhavapatnam Residential Hub',
        elevation: 'Family Apartment Windows & Balconies',
        tag: 'Bird & Fall Safe',
        desc: 'Invisible grills fitted securely across open room windows and balconies, preventing bird entry while preserving natural airflow.',
        image: '/assets/corridors/kakinada-madhavapatnam.jpg'
      },
      {
        name: 'Ramanayyapeta Urban Flatted Living',
        elevation: 'City Center Elevations',
        tag: '1-Min Safe Fire Egress',
        desc: 'Standard manual wire cutters sever cables easily during emergency evacuation.',
        image: '/assets/corridors/kakinada-ramanayyapeta.jpg'
      },
      {
        name: 'Jagannaickpur Waterfront Enclaves',
        elevation: 'Canal & Coastal Flats',
        tag: 'Corrosion-Free Tracks',
        desc: 'Heavy-gauge anodized aluminum tracks anchored firmly into structural RCC concrete.',
        image: '/assets/corridors/kakinada-jagannaickpur.jpg'
      }
    ]
  },
  {
    id: 'nellore',
    locationPath: '/nellore',
    slug: 'nellore',
    name: 'Nellore',
    cityShort: 'NELLORE',
    categoryTag: 'RIVER BARRAGE TRANQUILITY',
    mainTitle: 'TRANQUILITY & TRUST — NELLORE',
    subline: 'Safe haven for children and elders on high-elevation balconies.',
    microCue: 'Tap anywhere to view Nellore projects & pricing',
    badge: 'Penna Riverfront Horizon',
    emotionHook: 'Pedda vallu, pillalu unna balcony lo nilabadataniki absolute strong and safe support!',
    landmarkDesc: 'High-rise balcony sunset view over Nellore Barrage and Penna River through vertical safety cables.',
    heroImage: '/images/dashboard/dashboard-nellore.jpg?v=tier1_fresh',
    mobileHeroImage: '/images/dashboard/dashboard-nellore-9x16.jpg?v=tier1_fresh',
    activeBelts: ['Magunta Layout', 'Balaji Nagar', 'Dargamitta', 'Vedayapalem', 'Podalakur Road', 'Kavali Road'],
    weatherChallenge: 'Continuous seasonal monsoon dampness loosening weak anchor points and corroding inferior wires.',
    weatherSolution: 'Precision aluminum track tensioners anchored deep in structural concrete with non-corrosive fasteners.',
    safetyText: 'Tranquil Balcony Living for Elders & Children • 60-Sec Fire Escape System • Penna Riverfront Protection',
    keywordPings: ['Invisible Grills Nellore', 'Magunta Layout Flats', 'Balaji Nagar Balcony Safety', 'Penna Riverfront View', 'Fire Escape Safety'],
    subLocations: [
      {
        name: 'Magunta Layout Premium Flats',
        elevation: 'Central Luxury Balconies',
        tag: 'Penna River Sunset View',
        desc: 'Framing peaceful sunset horizons over the river while providing solid edge perimeter protection.',
        image: '/assets/corridors/nellore-maguntalayout.jpg'
      },
      {
        name: 'Balaji Nagar Elevated Residencies',
        elevation: 'High-Floor Family Apartments',
        tag: '400 KG / Cable Strength',
        desc: 'Solid cable structural reassurance preventing vertigo and loss-of-balance fears.',
        image: '/assets/corridors/nellore-balajinagar.jpg'
      },
      {
        name: 'Dargamitta Corridors',
        elevation: 'Terrace & High Balcony Flats',
        tag: 'Anti-Sag Anchoring',
        desc: 'Calibrated tension turnbuckles prevent any cable sagging or loosening over time.',
        image: '/assets/corridors/nellore-dargamitta.jpg'
      },
      {
        name: 'Vedayapalem Riverfront Belt',
        elevation: 'Penna Riverfront Windows & Flats',
        tag: 'Panoramic Window Safety',
        desc: 'Seamless invisible grill installation across wide bedroom window, framing peaceful Penna river views while keeping children 100% safe.',
        image: '/assets/corridors/nellore-vedayapalem.jpg'
      },
      {
        name: 'Podalakur Road & Kavali Belt',
        elevation: 'Expanding Gated Communities',
        tag: 'Pest & Pigeon Control',
        desc: '50mm spacing physically keeps pigeons out, ensuring clean and enjoyable morning tea sessions.',
        image: '/assets/corridors/nellore-podalakur.jpg'
      }
    ]
  },
  {
    id: 'ongole',
    locationPath: '/ongole',
    slug: 'ongole',
    name: 'Ongole',
    cityShort: 'ONGOLE',
    categoryTag: 'PRAKASAM INLAND SKYLINE & HIGH-RISE SAFETY',
    mainTitle: 'PRAKASAM PRIDE — ONGOLE',
    subline: 'SS-316 Invisible Safety Grills across Bhagyanagar, Lawyerpet & Kurnool Road.',
    microCue: 'Tap anywhere to view Ongole projects & pricing',
    badge: 'Prakasam High-Tension SS-316',
    emotionHook: 'Bhagyanagar & Lawyerpet high-rises lo open breeze view asalu block avvakunda pillalu mariyu peddavallaki 100% safety!',
    landmarkDesc: 'High-rise apartment balcony overlooking Kurnool Road Ridge and Ongole cityscape through vertical SS-316 invisible safety grills.',
    heroImage: '/images/dashboard/dashboard-ongole.jpg?v=tier1_fresh',
    mobileHeroImage: '/images/dashboard/dashboard-ongole-9x16.jpg?v=tier1_fresh',
    activeBelts: ['Bhagyanagar', 'Lawyerpet', 'Kurnool Road Belt', 'Santhapet', 'Mangamuru Road', 'Housing Board Colony'],
    weatherChallenge: 'Inland summer heat and dry highway dust wearing down traditional painted grills and causing frequent rust.',
    weatherSolution: 'Certified SS-316 high-tensile wire rope coated with UV-resistant transparent nylon sheath and heavy-duty 6063-T6 aluminum tracks.',
    safetyText: 'Prakasam High-Tension SS-316 Cable Lock • Zero Cage Feeling • 100% Fall Containment on High Floors',
    keywordPings: ['Invisible Grills Ongole', 'Bhagyanagar High-Rises', 'Lawyerpet Balcony Safety', 'Kurnool Road Towers', 'Child & Pet Shield'],
    subLocations: [
      {
        name: 'Bhagyanagar Prime High-Rises',
        elevation: 'High-Floor Balconies',
        tag: '100% Toddler Fall Protection',
        desc: 'Uncompromised skyline views and absolute fall protection for children and families.',
        image: '/assets/corridors/ongole-bhagyanagar.jpg'
      },
      {
        name: 'Lawyerpet Central Residences',
        elevation: 'Central Society Living',
        tag: 'Pigeon & Bird Exclusion',
        desc: '2-inch precision vertical cables physically preventing pigeons from nesting without dark nylon nets.',
        image: '/assets/corridors/ongole-lawyerpet.jpg'
      },
      {
        name: 'Kurnool Road Growth Belt',
        elevation: 'Highway High-Rise Towers',
        tag: 'High-Tension Tensile Strength',
        desc: 'Calibrated tension turnbuckles and high-load cables ensuring zero sag and lifetime durability.',
        image: '/assets/corridors/ongole-kurnoolroad.jpg'
      },
      {
        name: 'Santhapet Established Zone',
        elevation: 'Urban Commercial & Living',
        tag: 'Modern Facade | Zero Cage',
        desc: 'Eliminating rusted iron bars with sleek architectural invisible safety wiring.',
        image: '/assets/corridors/ongole-santhapet.jpg'
      },
      {
        name: 'Mangamuru Road Gated Belts',
        elevation: 'Gated Society Residences',
        tag: 'Senior & Pet Protection',
        desc: 'Spacious balcony and utility safety containment for family peace of mind.',
        image: '/assets/corridors/ongole-mangamuru.jpg'
      }
    ]
  }
];

// --- CORRIDOR SPECIFIC ASSET REGISTRY (BRIGHT BALCONY PERSPECTIVES) ---
export interface CorridorAssetInfo {
  image: string;
  title: string;
  spec: string;
  cityId?: string;
}

export const CORRIDOR_ASSETS: Record<string, CorridorAssetInfo> = {
  // Vizag Corridors
  "Madhurawada": {
    image: "/assets/corridors/vizag-madhurawada.jpg",
    title: "Madhurawada 27-Floor High-Rises",
    spec: "Valley Elevation | 27 Towers Lockdown",
    cityId: "vizag"
  },
  "Madhurawada (27-Floor High-Rises)": {
    image: "/assets/corridors/vizag-madhurawada.jpg",
    title: "Madhurawada 27-Floor High-Rises",
    spec: "Valley Elevation | 27 Towers Lockdown",
    cityId: "vizag"
  },
  "Yendada": {
    image: "/assets/corridors/vizag-yendada.jpg",
    title: "Yendada Sea-Facing Corridor",
    spec: "High-Altitude Bay Panoramas",
    cityId: "vizag"
  },
  "Yendada Sea-Facing Corridor": {
    image: "/assets/corridors/vizag-yendada.jpg",
    title: "Yendada Sea-Facing Corridor",
    spec: "High-Altitude Bay Panoramas",
    cityId: "vizag"
  },
  "Rushikonda": {
    image: "/assets/corridors/vizag-rushikonda.jpg",
    title: "Rushikonda Luxury Hillside",
    spec: "Coastal Villa Balconies | Unblocked Waves",
    cityId: "vizag"
  },
  "Rushikonda Luxury Hillside": {
    image: "/assets/corridors/vizag-rushikonda.jpg",
    title: "Rushikonda Luxury Hillside",
    spec: "Coastal Villa Balconies | Unblocked Waves",
    cityId: "vizag"
  },
  "PM Palem": {
    image: "/assets/corridors/vizag-pmpalem.jpg",
    title: "PM Palem (Cricket Stadium Road)",
    spec: "Gated Community High-Rise | Toddler Safe",
    cityId: "vizag"
  },
  "PM Palem (Cricket Stadium Road)": {
    image: "/assets/corridors/vizag-pmpalem.jpg",
    title: "PM Palem (Cricket Stadium Road)",
    spec: "Gated Community High-Rise | Toddler Safe",
    cityId: "vizag"
  },
  "Anandapuram": {
    image: "/assets/corridors/vizag-anandapuram.jpg",
    title: "Anandapuram Growth Corridor",
    spec: "Valley Elevation Penthouses | Cross-Airflow",
    cityId: "vizag"
  },
  "Anandapuram Growth Corridor": {
    image: "/assets/corridors/vizag-anandapuram.jpg",
    title: "Anandapuram Growth Corridor",
    spec: "Valley Elevation Penthouses | Cross-Airflow",
    cityId: "vizag"
  },
  "Gajuwaka": {
    image: "/assets/corridors/vizag-gajuwaka.jpg",
    title: "Gajuwaka & Pendurthi Belt",
    spec: "Industrial & Urban Towers | Anti-Dust",
    cityId: "vizag"
  },
  "Gajuwaka & Pendurthi Belt": {
    image: "/assets/corridors/vizag-gajuwaka.jpg",
    title: "Gajuwaka & Pendurthi Belt",
    spec: "Industrial & Urban Towers | Anti-Dust",
    cityId: "vizag"
  },

  // Rajahmundry Corridors
  "Morampudi": {
    image: "/assets/corridors/rajahmundry-morampudi.jpg",
    title: "Morampudi Residential Towers",
    spec: "Riverfront Airflow | High-Rise Shield",
    cityId: "rajahmundry"
  },
  "Morampudi Residential Towers": {
    image: "/assets/corridors/rajahmundry-morampudi.jpg",
    title: "Morampudi Residential Towers",
    spec: "Riverfront Airflow | High-Rise Shield",
    cityId: "rajahmundry"
  },
  "Godavari Arch Bridge": {
    image: "/assets/locations/rajahmundry-godavari-bridge.jpg",
    title: "Godavari Arch Bridge Riverfront",
    spec: "Iconic Heritage View | 100% Pigeon Shield",
    cityId: "rajahmundry"
  },
  "Godavari Arch Bridge Riverfront": {
    image: "/assets/locations/rajahmundry-godavari-bridge.jpg",
    title: "Godavari Arch Bridge Riverfront",
    spec: "Iconic Heritage View | 100% Pigeon Shield",
    cityId: "rajahmundry"
  },
  "Bommuru": {
    image: "/assets/corridors/rajahmundry-bommuru.jpg",
    title: "Bommuru Gated Communities",
    spec: "Zero Bird Droppings | 2-Inch Safe Spacing",
    cityId: "rajahmundry"
  },
  "Bommuru Gated Communities": {
    image: "/assets/corridors/rajahmundry-bommuru.jpg",
    title: "Bommuru Gated Communities",
    spec: "Zero Bird Droppings | 2-Inch Safe Spacing",
    cityId: "rajahmundry"
  },
  "Diwancheruvu": {
    image: "/assets/corridors/rajahmundry-diwancheruvu.jpg",
    title: "Diwancheruvu & Lalacheruvu Hub",
    spec: "Elevated Highway Towers | Wind & Dust Shield",
    cityId: "rajahmundry"
  },
  "Diwancheruvu & Lalacheruvu Hub": {
    image: "/assets/corridors/rajahmundry-diwancheruvu.jpg",
    title: "Diwancheruvu & Lalacheruvu Hub",
    spec: "Elevated Highway Towers | Wind & Dust Shield",
    cityId: "rajahmundry"
  },
  "Vemagiri": {
    image: "/assets/corridors/rajahmundry-vemagiri.jpg",
    title: "Vemagiri Riverfront Belts",
    spec: "Riverbank Apartment Terrace | Zero Fall Hazard",
    cityId: "rajahmundry"
  },
  "Vemagiri Riverfront Belts": {
    image: "/assets/corridors/rajahmundry-vemagiri.jpg",
    title: "Vemagiri Riverfront Belts",
    spec: "Riverbank Apartment Terrace | Zero Fall Hazard",
    cityId: "rajahmundry"
  },

  // Vijayawada Corridors
  "Benz Circle": {
    image: "/assets/corridors/vijayawada-benzcircle.jpg",
    title: "Benz Circle Corridor Towers",
    spec: "15th-Floor Skyscraper Elevation | Urban View",
    cityId: "vijayawada"
  },
  "Benz Circle Corridor Towers": {
    image: "/assets/corridors/vijayawada-benzcircle.jpg",
    title: "Benz Circle Corridor Towers",
    spec: "15th-Floor Skyscraper Elevation | Urban View",
    cityId: "vijayawada"
  },
  "Amaravati HappyNest": {
    image: "/assets/corridors/vijayawada-happynest.jpg",
    title: "Amaravati HappyNest (G+18)",
    spec: "G+18 Floodplain Panoramas | 100% Toddler Safe",
    cityId: "vijayawada"
  },
  "HappyNest Amaravati": {
    image: "/assets/corridors/vijayawada-happynest.jpg",
    title: "Amaravati HappyNest (G+18)",
    spec: "G+18 Floodplain Panoramas | 100% Toddler Safe",
    cityId: "vijayawada"
  },
  "Amaravati HappyNest (G+18)": {
    image: "/assets/corridors/vijayawada-happynest.jpg",
    title: "Amaravati HappyNest (G+18)",
    spec: "G+18 Floodplain Panoramas | 100% Toddler Safe",
    cityId: "vijayawada"
  },
  "Moghalrajpuram": {
    image: "/assets/corridors/vijayawada-moghalrajpuram.jpg",
    title: "Moghalrajpuram Hillside Flats",
    spec: "Elevated Ridge-View Apartments",
    cityId: "vijayawada"
  },
  "Gunadala": {
    image: "/assets/corridors/vijayawada-gunadala.jpg",
    title: "Gunadala & Ramavarappadu",
    spec: "Premium Gated Societies | 400 KG Load",
    cityId: "vijayawada"
  },
  "Kanuru": {
    image: "/assets/corridors/vijayawada-kanuru.jpg",
    title: "Kanuru & Poranki Belt",
    spec: "Expanding Luxury Suburbs | Cross-Ventilation",
    cityId: "vijayawada"
  },
  "Tadepalli": {
    image: "/assets/corridors/vijayawada-tadepalli.jpg",
    title: "Tadepalli Riverside Towers",
    spec: "Krishna Riverfront Penthouses",
    cityId: "vijayawada"
  },

  // Guntur Corridors
  "Brodipet": {
    image: "/assets/corridors/guntur-brodipet.jpg",
    title: "Brodipet High-End Residencies",
    spec: "Prime City Balcony Flats | Architectural Luxury",
    cityId: "guntur"
  },
  "Arundelpet": {
    image: "/assets/corridors/guntur-arundelpet.jpg",
    title: "Arundelpet Modern Towers",
    spec: "High-Density Residential Hub | Zero-Climb",
    cityId: "guntur"
  },
  "Amaravati Road": {
    image: "/assets/corridors/guntur-amaravatiroad.jpg",
    title: "Amaravati Road Corridor",
    spec: "Luxury Gated Towers | Kondaveedu View",
    cityId: "guntur"
  },
  "Namburu": {
    image: "/assets/corridors/guntur-namburu.jpg",
    title: "Namburu IT & University Belt",
    spec: "University Apartment Window Safety | 100% Breeze",
    cityId: "guntur"
  },
  "Kaza": {
    image: "/assets/corridors/guntur-kaza.jpg",
    title: "Kaza & Tadepalli Belt",
    spec: "Expressway Towers | 100% Daylighting",
    cityId: "guntur"
  },

  // Kakinada Corridors
  "Vakalapudi": {
    image: "/assets/corridors/kakinada-vakalapudi.jpg",
    title: "Vakalapudi Port & Lighthouse Corridor",
    spec: "Sea-Front Balcony Residences | Marine-Grade Alloy",
    cityId: "kakinada"
  },
  "Sarpavaram": {
    image: "/assets/corridors/kakinada-sarpavaram.jpg",
    title: "Sarpavaram High-Rise Towers",
    spec: "Gated Residential Colonies | Toddler Lockdown",
    cityId: "kakinada"
  },
  "Madhavapatnam": {
    image: "/assets/corridors/kakinada-madhavapatnam.jpg",
    title: "Madhavapatnam Residential Hub",
    spec: "Family Window & Balcony Safety | Bird Barrier",
    cityId: "kakinada"
  },
  "Ramanayyapeta": {
    image: "/assets/corridors/kakinada-ramanayyapeta.jpg",
    title: "Ramanayyapeta Urban Flatted Living",
    spec: "City Center Elevations | 1-Min Fire Egress",
    cityId: "kakinada"
  },
  "Jagannaickpur": {
    image: "/assets/corridors/kakinada-jagannaickpur.jpg",
    title: "Jagannaickpur Waterfront Enclaves",
    spec: "Canal & Coastal Flats | Corrosion-Free Tracks",
    cityId: "kakinada"
  },

  // Nellore Corridors
  "Magunta Layout": {
    image: "/assets/corridors/nellore-maguntalayout.jpg",
    title: "Magunta Layout Premium Flats",
    spec: "Central Luxury Balconies | Sunset View",
    cityId: "nellore"
  },
  "Balaji Nagar": {
    image: "/assets/corridors/nellore-balajinagar.jpg",
    title: "Balaji Nagar Elevated Residencies",
    spec: "High-Floor Family Apartments | 400 KG Strength",
    cityId: "nellore"
  },
  "Dargamitta": {
    image: "/assets/corridors/nellore-dargamitta.jpg",
    title: "Dargamitta Corridors",
    spec: "Terrace & High Balcony Flats | Anti-Sag Anchoring",
    cityId: "nellore"
  },
  "Vedayapalem": {
    image: "/assets/corridors/nellore-vedayapalem.jpg",
    title: "Vedayapalem Riverfront Belt",
    spec: "Penna Riverfront Window Safety | Child Safe",
    cityId: "nellore"
  },
  "Podalakur Road": {
    image: "/assets/corridors/nellore-podalakur.jpg",
    title: "Podalakur Road & Kavali Belt",
    spec: "Expanding Gated Communities | Pest Control",
    cityId: "nellore"
  },
  "Podalakuru Road": {
    image: "/assets/corridors/nellore-podalakur.jpg",
    title: "Podalakur Road & Kavali Belt",
    spec: "Expanding Gated Communities | Pest Control",
    cityId: "nellore"
  },
  // Ongole Corridors
  "Bhagyanagar": {
    image: "/assets/corridors/ongole-bhagyanagar.jpg",
    title: "Bhagyanagar Prime High-Rises",
    spec: "Prime Residential | 100% Toddler Fall Protection",
    cityId: "ongole"
  },
  "Lawyerpet": {
    image: "/assets/corridors/ongole-lawyerpet.jpg",
    title: "Lawyerpet Central Residences",
    spec: "Central Society Living | 100% Pigeon Shield",
    cityId: "ongole"
  },
  "Kurnool Road": {
    image: "/assets/corridors/ongole-kurnoolroad.jpg",
    title: "Kurnool Road Growth Belt",
    spec: "Highway High-Rise Towers | High-Tension SS-316",
    cityId: "ongole"
  },
  "Kurnool Road Belt": {
    image: "/assets/corridors/ongole-kurnoolroad.jpg",
    title: "Kurnool Road Growth Belt",
    spec: "Highway High-Rise Towers | High-Tension SS-316",
    cityId: "ongole"
  },
  "Santhapet": {
    image: "/assets/corridors/ongole-santhapet.jpg",
    title: "Santhapet Established Zone",
    spec: "Modern Facade | Zero Iron Cage Effect",
    cityId: "ongole"
  },
  "Mangamuru Road": {
    image: "/assets/corridors/ongole-mangamuru.jpg",
    title: "Mangamuru Road Gated Belts",
    spec: "Gated Towers | Senior & Pet Safety",
    cityId: "ongole"
  }
};

// --- REAL SOCIETY INSTALLATIONS & SOCIAL PROOF DATA ---
export interface SocietyInstallation {
  id: string;
  cityId: string;
  cityName: string;
  societyName: string;
  corridor: string;
  floor: string;
  specs: string;
  highlight: string;
  image: string;
  unitsProtected: string;
  customerNote: string;
}

export const SOCIETY_INSTALLATIONS: SocietyInstallation[] = [
  // Visakhapatnam Hub
  {
    id: 'mvv-grand',
    cityId: 'vizag',
    cityName: 'Visakhapatnam',
    societyName: 'MVV GV The Grand',
    corridor: 'Madhurawada',
    floor: '25th-Floor Penthouse',
    specs: '2.5mm Marine SS-316',
    highlight: '100% Unblocked Hilltop & Valley View',
    image: '/assets/locations/sub/vizag-madhurawada.png',
    unitsProtected: '34 Balconies Secured',
    customerNote: 'Valley breeze passes freely with zero vertigo risk for kids up to 25 floors.'
  },
  {
    id: 'sanskriti-bayfront',
    cityId: 'vizag',
    cityName: 'Visakhapatnam',
    societyName: 'Sanskriti Bayfront',
    corridor: 'Rushikonda',
    floor: 'Sea-Facing Tower (14th Floor)',
    specs: '2.5mm Molybdenum SS-316',
    highlight: 'Zero-Decay Marine Coating | Pet & Child Lockdown',
    image: '/assets/locations/sub/vizag-rushikonda.png',
    unitsProtected: '22 Balconies Secured',
    customerNote: 'Zero rust from coastal salt air. Pristine view of turquoise waves.'
  },
  {
    id: 'oceanus-towers',
    cityId: 'vizag',
    cityName: 'Visakhapatnam',
    societyName: 'Oceanus Towers',
    corridor: 'Yendada',
    floor: '18th-Floor Coastal Flat',
    specs: '2.5mm Marine SS-316',
    highlight: 'Pigeon Exclusion Grid & Coastal Bay Protection',
    image: '/assets/locations/sub/vizag-yendada.png',
    unitsProtected: '28 Balconies Secured',
    customerNote: '100% bird droppings prevention without blocking the morning ocean sunrise.'
  },

  // Rajamahendravaram Hub
  {
    id: 'godavari-riverfront',
    cityId: 'rajahmundry',
    cityName: 'Rajamahendravaram',
    societyName: 'Godavari Riverfront Enclave',
    corridor: 'Morampudi',
    floor: '12th-Floor Riverfront Balcony',
    specs: '2.5mm Marine SS-316',
    highlight: 'River-Breeze Balcony | 10-Year Anti-Rust Certified',
    image: '/assets/locations/sub/rajahmundry-morampudi.png',
    unitsProtected: '19 Balconies Secured',
    customerNote: 'Continuous river humidity tested. Zero corrosion with 99% clear river sightline.'
  },
  {
    id: 'sri-krishna-gated',
    cityId: 'rajahmundry',
    cityName: 'Rajamahendravaram',
    societyName: 'Sri Krishna Gated Society',
    corridor: 'Bommuru',
    floor: 'Duplex Terrace & Balcony',
    specs: '2.5mm Virgin SS-316',
    highlight: 'Toddler Fall-Safe Lockdown | 2-Inch Safe Spacing',
    image: '/assets/locations/sub/rajahmundry-bommuru.png',
    unitsProtected: '15 Balconies Secured',
    customerNote: 'Eliminated pigeon roosting and gives parents complete peace of mind.'
  },

  // Vijayawada & Amaravati Hub
  {
    id: 'happynest-amaravati',
    cityId: 'vijayawada',
    cityName: 'Vijayawada & Amaravati',
    societyName: 'Amaravati HappyNest (Tower 3)',
    corridor: 'Amaravati (G+18)',
    floor: '16th-Floor High-Rise Unit',
    specs: 'SS-316 2.5mm Marine Grade',
    highlight: 'High-Rise Safety Mesh | 1-Min Fire Cutter Egress Compliant',
    image: '/assets/corridors/vijayawada-happynest.jpg',
    unitsProtected: '48 Balconies Secured',
    customerNote: 'Complies with fire safety norms with clean 60-second emergency cutter escape.'
  },
  {
    id: 'tadepalli-riverside',
    cityId: 'vijayawada',
    cityName: 'Vijayawada & Amaravati',
    societyName: 'Tadepalli Riverside Residences',
    corridor: 'Tadepalli',
    floor: '10th-Floor Riverbank Flat',
    specs: '2.5mm Marine SS-316',
    highlight: 'Krishna River Mist Protection | SS-316 Metallurgy',
    image: '/assets/corridors/vijayawada-tadepalli.jpg',
    unitsProtected: '26 Balconies Secured',
    customerNote: 'Uninterrupted view of Prakasam Barrage waters and Krishna greenery.'
  },
  {
    id: 'benz-circle-skyscraper',
    cityId: 'vijayawada',
    cityName: 'Vijayawada & Amaravati',
    societyName: 'Benz Circle Skyscraper Residences',
    corridor: 'Benz Circle',
    floor: '15th-Floor Skyscraper Elevation',
    specs: '3.0mm Heavy-Duty SS-316',
    highlight: 'High Wind-Load Resistance | Capital Skyline Sightline',
    image: '/assets/corridors/vijayawada-benzcircle.jpg',
    unitsProtected: '32 Balconies Secured',
    customerNote: 'High wind-load resistance with clear sightline to illuminated city avenues.'
  },

  // Guntur Hub
  {
    id: 'brodipet-heights',
    cityId: 'guntur',
    cityName: 'Guntur',
    societyName: 'Brodipet Heights',
    corridor: 'Brodipet',
    floor: '14th-Floor Luxury Flat',
    specs: '2.5mm High-Tensile SS-316',
    highlight: 'High-Wind Resistance & Child Proofing',
    image: '/assets/corridors/guntur-brodipet.jpg',
    unitsProtected: '18 Balconies Secured',
    customerNote: 'Withstands strong gusts from Kondaveedu hills with zero wire vibration.'
  },

  // Kakinada Hub
  {
    id: 'vakalapudi-port-view',
    cityId: 'kakinada',
    cityName: 'Kakinada',
    societyName: 'Vakalapudi Port View Towers',
    corridor: 'Vakalapudi Port Corridor',
    floor: '11th-Floor Port Harbor Flat',
    specs: '2.5mm Marine Grade SS-316',
    highlight: 'Salt-Spray Corrosion Immunity | Flat Coastal Panoramas',
    image: '/assets/corridors/kakinada-vakalapudi.jpg',
    unitsProtected: '21 Balconies Secured',
    customerNote: 'Full view of lighthouse and Bay of Bengal shipping vessels with zero rust.'
  },

  // Nellore Hub
  {
    id: 'magunta-luxury',
    cityId: 'nellore',
    cityName: 'Nellore',
    societyName: 'Magunta Layout Luxury Flats',
    corridor: 'Magunta Layout',
    floor: '8th-Floor Riverfront View',
    specs: '2.5mm Marine SS-316',
    highlight: '400 KG Tensile Strength Fall Protection',
    image: '/assets/corridors/nellore-magunta.jpg',
    unitsProtected: '17 Balconies Secured',
    customerNote: 'Penna river breeze stays unblocked while toddlers play safely.'
  },

  // Ongole Hub
  {
    id: 'bhagyanagar-skyline',
    cityId: 'ongole',
    cityName: 'Ongole',
    societyName: 'Bhagyanagar Skyline Enclave',
    corridor: 'Bhagyanagar',
    floor: '9th-Floor Balcony View',
    specs: '2.5mm Marine SS-316',
    highlight: '100% Uncompromised Open Air & Safety',
    image: '/assets/corridors/ongole-bhagyanagar.jpg',
    unitsProtected: '14 Balconies Secured',
    customerNote: 'Children play safely while unobstructed morning sunlight floods the balcony.'
  }
];

// --- 6-CARD PROBLEM SOLVER GALLERY (IMAGE-FIRST, REAL BALCONY SOLUTIONS) ---
export const PROBLEM_SOLVERS = [
  {
    icon: Baby,
    title: "Children's Safety",
    tagline: 'High-Rise Balcony Lockdown',
    badge: '400 KG / CABLE | HIGH-RISE BALCONY LOCKDOWN',
    desc: 'Anti-fall lockdown coverage up to 30th floor. Chinna pillalu unna elevations bayam lekunda safe setup.',
    teluguDesc: 'Chinna pillalu unna elevations bayam lekunda safe lockdown coverage.',
    image: '/assets/pillars/children-safety.png',
    stat: '400 KG / CABLE'
  },
  {
    icon: Cat,
    title: 'Pets Safety',
    tagline: 'Zero Gap Paw Architecture',
    badge: 'ZERO GAP HAZARD | ZERO GAP PAW ARCHITECTURE',
    desc: '2-inch precision vertical wire spacing. Cats and dogs cannot slip through.',
    teluguDesc: 'Cats leda dogs small space gaps nundi kindhaki slip avvakunda absolute zero gap safety wire structures.',
    image: '/assets/pillars/pets-safety.png',
    stat: 'ZERO GAP HAZARD'
  },
  {
    icon: HeartHandshake,
    title: 'Old Age Persons Safety',
    tagline: 'Vertigo & Tension Elimination',
    badge: '100% RIGID ANCHORING | VERTIGO & TENSION ELIMINATION',
    desc: 'Solid structural support on balcony edges eliminating height dizziness and loose railing anxiety.',
    teluguDesc: 'Pedda vallu loose railings or heights valla tension padakunda absolute strong support balcony edge frame structure.',
    image: '/assets/pillars/old-age-safety.png',
    stat: '100% RIGID ANCHORING'
  },
  {
    icon: Eye,
    title: 'Pigeons Safety',
    tagline: '100% Droppings Protection',
    badge: 'ZERO BIRDS ENTRY | 100% DROPPINGS PROTECTION',
    desc: '100% bird droppings and dirty maintenance prevention without blocking natural sea/river breeze or view.',
    teluguDesc: 'Balcony and local windows padavvakunda, dirty maintenance problems lekunda birds control protection mesh screen.',
    image: '/assets/pillars/pigeon-control.png',
    stat: 'ZERO BIRDS ENTRY'
  },
  {
    icon: Flame,
    title: '1-Minute Emergency Fire Escape',
    tagline: 'Life Saving Egress Speed',
    badge: '60 SEC CUT ESCAPE | LIFE SAVING EGRESS SPEED',
    desc: 'Unlike welded iron cages that trap families during fires, SS-316 wires can be severed in under 60 seconds with emergency cutters.',
    teluguDesc: 'Box type traditional iron mesh fixed ga untayi, fire accident time lo escape avvalem. Mana high-tensile wire setup lo standard cutter tho 1-minute lo easy wires cut chesi safe escape avvachu!',
    image: '/assets/pillars/fire-escape.png',
    stat: '60 SEC CUT ESCAPE'
  },
  {
    icon: Sparkles,
    title: 'Modern Luxury Look & Free Air',
    tagline: 'Eliminates Dark Iron Bars',
    badge: '99% TRANSPARENCY | ELIMINATES DARK IRON BARS',
    desc: 'Replaces ugly dark iron bars with invisible stainless-steel elegance, delivering 100% natural sunlight and cross-ventilation.',
    teluguDesc: 'Traditional heavy iron bars look pathadi aipoindi. Mana grills tho full lighting natural air flow stop avvadu. Balcony full open ventilation flat spaces premium architecture aesthetic build chesthundi.',
    image: '/assets/pillars/modern-airflow.png',
    stat: '99% TRANSPARENCY'
  }
];

export const FAQS = [
  {
    q: "Can invisible grills really support a child's weight or adult impact?",
    a: "Yes. D-VIEW uses high-tensile SS-316 multi-strand wire ropes with each strand certified to withstand tensile loads exceeding 400 kg. Spaced precisely at 2-inch intervals, they provide unbreakable fall protection."
  },
  {
    q: "How does SS-316 prevent rust in coastal areas like Vizag and Kakinada?",
    a: "SS-316 contains 2.0% - 3.0% Molybdenum, a rare alloy element specifically developed for marine resistance. It is chemically immune to chloride pitting and coastal humidity, unlike standard SS-202 or SS-304."
  },
  {
    q: "How is emergency fire escape handled compared to iron grates?",
    a: "Welded iron bars require heavy gas cutters or angle grinders, creating death traps during high-rise fires. In contrast, D-VIEW invisible grills can be severed with standard emergency manual wire cutters in under 60 seconds."
  },
  {
    q: "Will pigeons and birds still be able to enter my balcony?",
    a: "No. The 2-inch (50 mm) vertical wire spacing physically prevents pigeons and common birds from squeezing into your balcony space, permanently solving droppings and nesting issues without dark nylon netting."
  }
];

// --- MOBILE FOCAL POINT & LANDMARK FRAMING HELPERS (< 768px) ---
export const getMobileFocalPosition = (nameOrKey?: string): string => {
  if (!nameOrKey) return 'center center';
  const clean = nameOrKey.toLowerCase();
  if (clean.includes('rushikonda')) return '40% center';
  if (clean.includes('madhurawada')) return '60% center';
  if (clean.includes('yendada')) return '35% center';
  if (clean.includes('morampudi')) return '45% center';
  if (clean.includes('bommuru')) return '40% center';
  if (clean.includes('rajahmundry') || clean.includes('arch bridge')) return 'center bottom 25%';
  if (clean.includes('vizag') || clean.includes('visakhapatnam')) return '35% center';
  if (clean.includes('benz') || clean.includes('vijayawada')) return '45% center';
  if (clean.includes('happynest') || clean.includes('amaravati')) return '55% center';
  if (clean.includes('kakinada') || clean.includes('vakalapudi')) return '35% center';
  if (clean.includes('guntur') || clean.includes('brodipet')) return '50% center';
  if (clean.includes('nellore')) return '50% center';
  return 'center center';
};

export const getMobileLandmarkClass = (nameOrKey?: string): string => {
  if (!nameOrKey) return '';
  const clean = nameOrKey.toLowerCase();
  if (clean.includes('rushikonda')) return 'landmark-rushikonda';
  if (clean.includes('madhurawada')) return 'landmark-madhurawada';
  if (clean.includes('yendada')) return 'landmark-yendada';
  if (clean.includes('morampudi')) return 'landmark-morampudi';
  if (clean.includes('rajahmundry') || clean.includes('arch bridge')) return 'landmark-rajahmundry';
  if (clean.includes('vizag') || clean.includes('visakhapatnam')) return 'landmark-vizag';
  if (clean.includes('benz') || clean.includes('vijayawada')) return 'landmark-vijayawada';
  if (clean.includes('happynest') || clean.includes('amaravati')) return 'landmark-happynest';
  if (clean.includes('guntur')) return 'landmark-guntur';
  if (clean.includes('kakinada')) return 'landmark-kakinada';
  if (clean.includes('nellore')) return 'landmark-nellore';
  if (clean.includes('ongole') || clean.includes('bhagyanagar') || clean.includes('lawyerpet') || clean.includes('kurnool')) return 'landmark-ongole';
  return '';
};

interface DViewWebsiteProps {
  initialCitySlug?: string;
  initialCorridor?: string;
  tier?: 'tier1' | 'tier2' | 'tier3';
  faqs?: { question: string; answer: string }[];
}

export const WARRANTY_BADGES = [
  {
    icon: ShieldCheck,
    title: '10-Year 100% Anti-Rust Replacement Warranty',
    highlight: 'SS-316 Molybdenum Core',
    desc: 'Manufactured strictly using SS-316 with 2-3% Molybdenum core. If any rust, oxidation, or corrosion occurs in coastal salt-air or river humidity, we provide 100% FREE wire-and-track replacement.'
  },
  {
    icon: Lock,
    title: '400 KG / Cable Tensile Breakage Guarantee',
    highlight: 'UV-Nylon Multi-Strand',
    desc: 'Multi-strand 316-grade stainless steel cables encased in UV-stabilized, transparent high-grade nylon. Guaranteed zero structural breakage under extreme high-rise impacts.'
  },
  {
    icon: Wrench,
    title: 'Lifetime Zero-Loose Wires Service Guarantee',
    highlight: '6063-T6 Structural Tracks',
    desc: 'Solid anchored installation using 6063-T6 heavy-duty structural aluminum tracks. Includes free periodic wire tension inspections and re-tightening support.'
  },
  {
    icon: Droplets,
    title: 'ASTM B117 Saline Mist Laboratory Certification',
    highlight: 'NSS Saline Tested',
    desc: 'Independently tested for 1,000+ continuous hours of saline mist exposure with zero pitting, rusting, or surface discoloration across coastal and riverfront microclimates.'
  }
];

export default function DViewWebsite({ initialCitySlug, initialCorridor, tier = 'tier1', faqs }: DViewWebsiteProps) {
  const getIndexFromSlug = (slug?: string) => {
    if (!slug) return 0;
    const clean = slug.toLowerCase().trim();
    if (clean === 'rajamahendravaram') return CITIES_SLIDES.findIndex(s => s.id === 'rajahmundry');
    if (clean === 'amaravati' || clean === 'vijayawada-amaravati') return CITIES_SLIDES.findIndex(s => s.id === 'vijayawada');
    if (clean === 'vizag' || clean === 'visakhapatnam') return CITIES_SLIDES.findIndex(s => s.id === 'vizag');
    const idx = CITIES_SLIDES.findIndex(
      s => s.locationPath.replace('/', '').replace('locations/', '') === clean || 
           s.slug === clean || 
           s.id === clean || 
           s.name.toLowerCase().includes(clean) ||
           s.slug.includes(clean) ||
           clean.includes(s.id)
    );
    return idx >= 0 ? idx : 0;
  };

  const initialIndex = getIndexFromSlug(initialCitySlug);
  const activeSlide = CITIES_SLIDES[initialIndex];

  // Side Drawer Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Selected Corridor for Sub-locations drill-down
  const [selectedCorridor, setSelectedCorridor] = useState<string>(() => {
    if (initialCorridor) return initialCorridor;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const c = params.get('corridor');
      if (c) return c;
    }
    return activeSlide.subLocations[0]?.name || activeSlide.activeBelts[0] || '';
  });

  // Read corridor from URL if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        const corridorParam = params.get('corridor');
        if (corridorParam) {
          setSelectedCorridor(corridorParam);
        } else if (initialCorridor) {
          setSelectedCorridor(initialCorridor);
        }
      };

      updateFromUrl();
      window.addEventListener('popstate', updateFromUrl);
      return () => window.removeEventListener('popstate', updateFromUrl);
    }
  }, [initialCorridor]);

  // Helper to resolve active corridor asset for dynamic Tier 3 Hero
  const getActiveCorridorAsset = () => {
    const defaultSub = activeSlide.subLocations[0];
    const q = (selectedCorridor || '').trim();
    if (!q) {
      return {
        name: defaultSub?.name || activeSlide.name,
        title: defaultSub?.name || activeSlide.name,
        image: defaultSub?.image || activeSlide.heroImage,
        spec: defaultSub?.tag || activeSlide.badge
      };
    }

    const cleanQ = q.toLowerCase();

    // 1. Direct or fuzzy lookup in CORRIDOR_ASSETS scoped to current city
    for (const [key, val] of Object.entries(CORRIDOR_ASSETS)) {
      if (val.cityId && val.cityId !== activeSlide.id) continue;
      const cleanKey = key.toLowerCase();
      if (
        cleanKey === cleanQ ||
        (cleanQ.length >= 3 && (cleanKey.includes(cleanQ) || cleanQ.includes(cleanKey)))
      ) {
        return {
          name: val.title || key,
          title: val.title || key,
          image: val.image,
          spec: val.spec
        };
      }
    }

    // 2. Lookup in activeSlide.subLocations
    const subMatch = activeSlide.subLocations.find(s => {
      const cleanSub = s.name.toLowerCase();
      return (
        cleanSub === cleanQ ||
        (cleanQ.length >= 3 && (cleanSub.includes(cleanQ) || cleanQ.includes(cleanSub)))
      );
    });

    if (subMatch) {
      return {
        name: subMatch.name,
        title: subMatch.name,
        image: subMatch.image,
        spec: subMatch.tag
      };
    }

    // 3. Lookup in activeSlide.activeBelts
    const beltMatch = activeSlide.activeBelts.find(b => {
      const cleanBelt = b.toLowerCase();
      return (
        cleanBelt === cleanQ ||
        (cleanQ.length >= 3 && (cleanBelt.includes(cleanQ) || cleanQ.includes(cleanBelt)))
      );
    });

    if (beltMatch) {
      return {
        name: beltMatch,
        title: beltMatch,
        image: defaultSub?.image || activeSlide.heroImage,
        spec: defaultSub?.tag || activeSlide.badge
      };
    }

    // 4. Safe fallback to default validated corridor (never render raw untrusted query string)
    return {
      name: defaultSub?.name || activeSlide.name,
      title: defaultSub?.name || activeSlide.name,
      image: defaultSub?.image || activeSlide.heroImage,
      spec: defaultSub?.tag || activeSlide.badge
    };
  };

  const activeCorridorAsset = getActiveCorridorAsset();
  const currentHeroImage = activeCorridorAsset.image;
  const currentCorridorDisplayName = activeCorridorAsset.title || activeSlide.name;

  // Client-side document title synchronization when ?corridor= parameter is present on Tier 3
  useEffect(() => {
    if (typeof window !== 'undefined' && tier === 'tier3') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('corridor') && currentCorridorDisplayName) {
        document.title = `SS-316 Invisible Grills in ${activeSlide.name} | ${currentCorridorDisplayName} Balcony Safety | D-View`;
      }
    }
  }, [tier, activeSlide.name, currentCorridorDisplayName]);

  // Booking Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedHub, setSelectedHub] = useState(activeSlide.name);
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [modalError, setModalError] = useState('');

  const handleOpenBooking = (hubName?: string, corridorName?: string) => {
    setSelectedHub(hubName || activeSlide.name);
    if (corridorName) setSelectedCorridor(corridorName);
    setModalError('');
    setConsentAgreed(false);
    setIsModalOpen(true);
  };

  const getWhatsAppMessage = () => {
    let msg = `Hello D-view invisible grills, I am interested in invisible safety grills for my balcony. Please share details.`;
    if (selectedHub && selectedHub !== "Andhra Pradesh") {
      msg += `\n\n📍 City: ${selectedHub}${currentCorridorDisplayName ? ` (${currentCorridorDisplayName})` : ''}`;
    }
    if (customerName) {
      msg += `\n👤 Name: ${customerName}`;
    }
    if (customerPhone) {
      msg += `\n📞 Phone: ${customerPhone}`;
    }
    return encodeURIComponent(msg);
  };

  // Generate the prefilled enquiry QR locally instead of sending lead details
  // to a third-party QR image API via a public request URL.
  const [whatsAppQrDataUrl, setWhatsAppQrDataUrl] = useState('');
  useEffect(() => {
    let active = true;
    const whatsappUrl = `https://wa.me/916281620716?text=${getWhatsAppMessage()}`;
    QRCode.toDataURL(whatsappUrl, {
      width: 140,
      margin: 1,
      color: { dark: '#0F172A', light: '#FFFFFF' }
    })
      .then(dataUrl => { if (active) setWhatsAppQrDataUrl(dataUrl); })
      .catch(() => { if (active) setWhatsAppQrDataUrl(''); });
    return () => { active = false; };
  }, [customerName, customerPhone, selectedHub, currentCorridorDisplayName]);

  // Close drawer or modal on Escape key press
  useEffect(() => {
    if (!isMenuOpen && !isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isModalOpen) setIsModalOpen(false);
        if (isMenuOpen) setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, isModalOpen]);

  // Society Proof Filter State
  const [societyFilter, setSocietyFilter] = useState<string>(activeSlide.id);

  useEffect(() => {
    setSocietyFilter(activeSlide.id);
  }, [activeSlide.id]);

  const filteredSocieties = societyFilter === 'all'
    ? SOCIETY_INSTALLATIONS
    : SOCIETY_INSTALLATIONS.filter(s => s.cityId === societyFilter);

  // =========================================================================
  // REUSABLE GLOBAL SECTIONS: PROOF, WARRANTY, FOOTER
  // =========================================================================

  const renderSocietyProofSection = (isSnap = false) => (
    <section id="society-proof-section" className={`${isSnap ? 'snap-start' : ''} relative py-16 sm:py-20 px-5 sm:px-12 bg-slate-50 border-t border-slate-200`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-[10px] font-bold text-[#16A34A] uppercase tracking-widest mb-3 shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>REAL HIGH-RISE PROOF • 850+ VERIFIED APARTMENTS</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold uppercase text-slate-900 tracking-tight">
            RECENTLY COMPLETED INSTALLATIONS ACROSS <span className="text-[#16A34A]">ANDHRA SOCIETIES</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed font-normal">
            Over 850+ luxury high-rise balconies secured with certified SS-316 marine-grade invisible safety cables.
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All AP Hubs (850+)' },
            { id: 'vizag', label: 'Visakhapatnam' },
            { id: 'rajahmundry', label: 'Rajamahendravaram' },
            { id: 'vijayawada', label: 'Vijayawada & Amaravati' },
            { id: 'guntur', label: 'Guntur' },
            { id: 'kakinada', label: 'Kakinada' },
            { id: 'nellore', label: 'Nellore' },
            { id: 'ongole', label: 'Ongole' },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSocietyFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                societyFilter === tab.id
                  ? 'bg-[#16A34A] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-300 hover:border-emerald-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Society Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredSocieties.map((society) => (
            <div
              key={society.id}
              className="group rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-500 bg-white transition-all duration-300 flex flex-col justify-between hover:shadow-xl shadow-sm"
            >
              <div>
                {/* 100% Clean Architectural Balcony Photo */}
                <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-100">
                  <img
                    src={society.image}
                    alt={`${society.societyName} SS-316 Balcony Invisible Grills`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                    width="640"
                    height="360"
                  />
                  {/* Subtle bottom blend */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                </div>

                {/* Content Container Below Image */}
                <div className="p-6">
                  {/* Top Status & Units Row */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A34A]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span>Verified Installation</span>
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-700 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200">
                      {society.unitsProtected}
                    </span>
                  </div>

                  {/* Society Name */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#16A34A] transition mb-1">
                    {society.societyName}
                  </h3>

                  {/* Location Subline */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                    <span>{society.corridor}, {society.cityName}</span>
                  </div>

                  {/* Specs & Floor Pill Container */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mb-3 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Elevation:</span>
                      <span className="text-slate-800 font-semibold">{society.floor}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Metallurgy:</span>
                      <span className="text-[#16A34A] font-bold">{society.specs}</span>
                    </div>
                  </div>

                  {/* Highlight Feature */}
                  <div className="text-xs font-semibold text-[#16A34A] mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] shrink-0" />
                    <span>{society.highlight}</span>
                  </div>

                  {/* Resident / Society Feedback Note */}
                  <p className="text-xs text-slate-600 italic font-light leading-relaxed">
                    "{society.customerNote}"
                  </p>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                    10-Year Anti-Rust Guaranteed
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenBooking(society.cityName, society.societyName)}
                    className="text-xs font-bold text-[#16A34A] hover:text-emerald-700 transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request Similar Setup</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );

  const renderWeatherShieldSection = (isSnap = false) => (
    <section id="weather-trust" className={`${isSnap ? 'snap-start' : ''} py-20 px-6 sm:px-12 border-t border-slate-200 bg-white`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#16A34A] font-bold block">
              SS-316 METALLURGY TRUST & GUARANTEES
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold uppercase text-slate-900 tracking-tight break-words">
              Specific Weather Shield ({activeSlide.name})
            </h2>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Why cheap steel fails in Andhra Pradesh: coastal salt-air and river mists cause immediate pitting and corrosion on ordinary mild steel and cheap SS-202 cables within months.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Droplets className="w-6 h-6 text-[#16A34A] shrink-0 mt-1" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase">The Environmental Challenge</h3>
                  <p className="text-xs text-slate-600 mt-1">{activeSlide.weatherChallenge}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-300">
                <ShieldCheck className="w-6 h-6 text-[#16A34A] shrink-0 mt-1" />
                <div>
                  <h3 className="text-sm font-bold text-[#16A34A] uppercase">The Material: Molybdenum-Infused SS-316</h3>
                  <p className="text-xs text-slate-700 mt-1">{activeSlide.weatherSolution}</p>
                </div>
              </div>
            </div>

            {/* Trust Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-center">
                <span className="text-xl sm:text-2xl font-black text-[#16A34A] block">10 YEARS</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-700 font-semibold block mt-0.5">
                  Anti-Rust Replacement Warranty
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xl sm:text-2xl font-black text-slate-900 block">1 YEAR FREE</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold block mt-0.5">
                  Periodic Tension Inspection
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-center">
                <span className="text-xl sm:text-2xl font-black text-[#16A34A] block">400+ KG</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-700 font-semibold block mt-0.5">
                  Cable Breaking Tension Load
                </span>
              </div>
            </div>

          </div>

          {/* Certified SS-316 Architecture & Weather Defense Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-emerald-300 shadow-xl group">
              <img 
                src={activeSlide.heroImage} 
                alt={`D-VIEW SS-316 Weather Shield in ${activeSlide.name}`} 
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
                width="640"
                height="320"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
              
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-emerald-300 text-[10px] font-bold text-[#16A34A] uppercase tracking-wider shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                  ASTM B117 Saline Certified
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 bg-[#16A34A] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                  Marine Metallurgy Armor
                </div>
                <h3 className="text-lg font-bold text-white">SS-316 Molybdenum Barrier</h3>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  Infused with 2.5% Molybdenum core alloy, preventing salt-spray pitting, river-fog oxidation, and thermal slackening across {activeSlide.name}.
                </p>
                <div className="mt-3 flex items-center gap-2 pt-2 border-t border-white/20 text-[10px] text-slate-200 font-mono">
                  <span className="text-emerald-400">● AISI-316</span>
                  <span>•</span>
                  <span>400KG Tensile</span>
                  <span>•</span>
                  <span>UV-Nylon Core</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );

  const renderWarrantySection = (isSnap = false) => (
    <section id="warranty-section" className={`${isSnap ? 'snap-start' : ''} relative py-20 px-5 sm:px-12 bg-slate-50 border-t border-slate-200`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-[10px] font-bold text-[#16A34A] uppercase tracking-widest mb-3 shadow-sm">
            <span>UNCONDITIONAL PEACE OF MIND • STRUCTURAL INTEGRITY</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold uppercase text-slate-900 tracking-tight">
            OFFICIAL 10-YEAR STRUCTURAL WARRANTY & <span className="text-[#16A34A]">UNCONDITIONAL GUARANTEE</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 font-normal leading-relaxed">
            Certified Virgin Marine-Grade SS-316 metallurgy engineered for coastal & riverfront longevity.
          </p>
        </div>

        {/* 4 Core Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {WARRANTY_BADGES.map((badge, bIdx) => {
            const Icon = badge.icon;
            return (
              <div 
                key={bIdx}
                className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between hover:shadow-xl shadow-sm group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#16A34A] mb-5 group-hover:scale-110 transition-transform shadow-sm">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#16A34A] block mb-1">
                    {badge.highlight}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {badge.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#16A34A] font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" /> 100% Certified
                  </span>
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider">
                    D-View Guarantee
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 100% Free Doorstep Precision Laser Survey Banner */}
        <div className="mt-12 rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-50 via-slate-50 to-emerald-50 border border-emerald-300 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-300 text-[10px] font-bold text-[#16A34A] uppercase tracking-widest shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>100% Free Doorstep Engineering Survey</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Precision Laser Measurement & Genuine SS-316 Sample Verification
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal max-w-2xl leading-relaxed">
              Our certified technicians visit your balcony with digital laser meters, genuine SS-316 cable cross-section samples, and provide accurate on-spot pricing with zero sales pressure.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleOpenBooking(selectedHub)}
            className="px-6 py-3.5 rounded-2xl bg-[#16A34A] hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider shadow-lg shrink-0 transition cursor-pointer"
          >
            Book Free Laser Survey →
          </button>
        </div>
      </div>
    </section>
  );



  const renderLuxuryFooter = (isSnap = false) => (
    <footer className={`${isSnap ? 'snap-start' : ''} relative border-t border-slate-200 bg-white pt-14 pb-28 md:pb-14 px-5 sm:px-12 text-slate-600 text-xs antialiased`}>
      <div className="max-w-7xl mx-auto">

        {/* ------------------------------------------------------------ */}
        {/* 1. TOP 4 COLUMNS: HELP | SERVICES | ABOUT D-VIEW | CONNECT   */}
        {/* ------------------------------------------------------------ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-slate-200">
          
          {/* Column 1: HELP */}
          <div>
            <h4 className="text-slate-900 font-extrabold uppercase tracking-[0.16em] text-[11px] mb-4">
              HELP
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-600 mb-4">
              Call <a href="tel:+916281620716" className="underline font-bold text-slate-900 hover:text-[#16A34A] transition">+91 62816 20716</a> or <a href={`https://wa.me/916281620716?text=${getWhatsAppMessage()}`} target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#16A34A] hover:underline">WhatsApp us</a>. You can also <a href="mailto:dviewsolutions32@gmail.com" className="underline font-bold text-slate-900 hover:text-[#16A34A] transition">email us</a>.
            </p>
            <ul className="space-y-2.5 text-[11px] text-slate-700">
              <li>
                <a href="/contact#book-visit" className="hover:text-[#16A34A] transition block font-medium">Installation Enquiries</a>
              </li>
              <li>
                <a href="/about" className="hover:text-[#16A34A] transition block font-medium">About Our Work</a>
              </li>
              <li>
                <a href="/locations" className="hover:text-[#16A34A] transition block font-medium">Service Areas & Corridors</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#16A34A] transition block font-medium">Central Support & Helpline</a>
              </li>
            </ul>
          </div>

          {/* Column 2: SERVICES */}
          <div>
            <h4 className="text-slate-900 font-extrabold uppercase tracking-[0.16em] text-[11px] mb-4">
              SERVICES
            </h4>
            <ul className="space-y-2.5 text-[11px] text-slate-700">
              <li>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(true)}
                  className="text-[#16A34A] font-bold hover:underline flex items-center gap-1 cursor-pointer text-left"
                >
                  <span>Book a Free Site Visit</span>
                  <span className="text-xs">→</span>
                </button>
              </li>
              <li>
                <a href="/solutions" className="hover:text-[#16A34A] transition block font-medium">Balcony Invisible Grills (SS-316)</a>
              </li>
              <li>
                <a href="/solutions" className="hover:text-[#16A34A] transition block font-medium">Window Architectural Safety Cables</a>
              </li>
              <li>
                <a href="/solutions" className="hover:text-[#16A34A] transition block font-medium">Anti-Pigeon & Bird Exclusion Grills</a>
              </li>
              <li>
                <a href="/solutions" className="hover:text-[#16A34A] transition block font-medium">Duplex & Staircase Safety Systems</a>
              </li>
              <li>
                <a href="/privacy#legal" className="hover:text-[#16A34A] transition block font-medium">Warranty & Terms</a>
              </li>
              <li>
                <a href="/solutions" className="hover:text-[#16A34A] transition block font-medium">All Engineering Services</a>
              </li>
            </ul>
          </div>

          {/* Column 3: ABOUT D-VIEW */}
          <div>
            <h4 className="text-slate-900 font-extrabold uppercase tracking-[0.16em] text-[11px] mb-4">
              ABOUT D-VIEW
            </h4>
            <ul className="space-y-2.5 text-[11px] text-slate-700">
              <li>
                <a href="/about" className="hover:text-[#16A34A] transition block font-medium">Our Story & Heritage</a>
              </li>
              <li>
                <a href="/about" className="hover:text-[#16A34A] transition block font-medium">About Invisible Grills</a>
              </li>
              <li>
                <a href="/projects" className="hover:text-[#16A34A] transition block font-medium">Lifestyle Project Gallery</a>
              </li>
              <li>
                <a href="/about" className="hover:text-[#16A34A] transition block font-medium">Materials & Approach</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#16A34A] transition block font-medium">Ask a Safety Question</a>
              </li>
            </ul>
          </div>

          {/* Column 4: CONNECT */}
          <div>
            <h4 className="text-slate-900 font-extrabold uppercase tracking-[0.16em] text-[11px] mb-4">
              CONNECT
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-600 mb-4 font-normal">
              <a href={`https://wa.me/916281620716?text=${getWhatsAppMessage()}`} target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#16A34A] hover:underline">WhatsApp us</a> and D-VIEW passes your request to our certified local engineering team across 7 cities in Andhra Pradesh, who visits your home, provides laser measurement, gives the written quote, installs and provides the 10-year warranty directly.
            </p>
            
            <div className="space-y-2 text-[11px] pt-1">
              <span className="text-slate-900 font-bold block uppercase tracking-wider text-[10px]">Direct Support</span>
              <a href="tel:+916281620716" className="flex items-center gap-2 hover:text-[#16A34A] transition text-slate-800 font-semibold">
                <span className="text-[#16A34A]">📞</span>
                <span>+91 62816 20716</span>
              </a>
              <a href="mailto:dviewsolutions32@gmail.com" className="flex items-center gap-2 hover:text-[#16A34A] transition text-slate-800 font-medium">
                <span className="text-[#16A34A]">✉️</span>
                <span>dviewsolutions32@gmail.com</span>
              </a>
              <div className="pt-2 text-[10px] text-slate-500">
                <span className="text-slate-800 font-semibold block">📍 Regional Service Base:</span>
                Rajamahendravaram, Andhra Pradesh, India (Doorstep On-Site Service).
              </div>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------ */}
        {/* 2. DEDICATED 7 SERVICE BASES & REGIONAL HUBS GRID             */}
        {/* ------------------------------------------------------------ */}
        <div className="py-10 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h4 className="text-slate-900 font-extrabold uppercase tracking-[0.16em] text-[11px]">
                OUR 7 SERVICE BASES & REGIONAL HUBS (ANDHRA PRADESH)
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Certified local technicians stationed across all major urban growth corridors with same-day laser measurements.
              </p>
            </div>
            <a href="/locations" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#16A34A] hover:underline whitespace-nowrap">
              <span>View All 7 Hubs</span>
              <span>→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 text-[11px]">
            {/* Vizag */}
            <a href="/visakhapatnam" className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition group">
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-slate-900 group-hover:text-[#16A34A]">Visakhapatnam (Vizag)</span>
                <span className="text-[10px] text-[#16A34A] font-bold">Explore →</span>
              </div>
              <span className="text-[10px] text-slate-500 block leading-relaxed">
                Madhurawada (27-Floor Towers), Yendada, Rushikonda, PM Palem, Gajuwaka.
              </span>
            </a>

            {/* Rajahmundry */}
            <a href="/rajahmundry" className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition group">
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-slate-900 group-hover:text-[#16A34A]">Rajamahendravaram</span>
                <span className="text-[10px] text-[#16A34A] font-bold">Explore →</span>
              </div>
              <span className="text-[10px] text-slate-500 block leading-relaxed">
                Morampudi, Bommuru, Diwancheruvu, Lalacheruvu, Vemagiri, Godavari Belts.
              </span>
            </a>

            {/* Vijayawada */}
            <a href="/vijayawada" className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition group">
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-slate-900 group-hover:text-[#16A34A]">Vijayawada & Amaravati</span>
                <span className="text-[10px] text-[#16A34A] font-bold">Explore →</span>
              </div>
              <span className="text-[10px] text-slate-500 block leading-relaxed">
                Benz Circle, Moghalrajpuram, HappyNest G+18, Kanuru, Tadepalli Riverfront.
              </span>
            </a>

            {/* Guntur */}
            <a href="/guntur" className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition group">
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-slate-900 group-hover:text-[#16A34A]">Guntur Hub</span>
                <span className="text-[10px] text-[#16A34A] font-bold">Explore →</span>
              </div>
              <span className="text-[10px] text-slate-500 block leading-relaxed">
                Brodipet, Arundelpet, Amaravati Road, Namburu, Kaza & Tadepalli Belts.
              </span>
            </a>

            {/* Kakinada */}
            <a href="/kakinada" className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition group">
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-slate-900 group-hover:text-[#16A34A]">Kakinada Hub</span>
                <span className="text-[10px] text-[#16A34A] font-bold">Explore →</span>
              </div>
              <span className="text-[10px] text-slate-500 block leading-relaxed">
                Sarpavaram, Vakalapudi Lighthouse Belt, Ramanayyapeta, Madhavapatnam.
              </span>
            </a>

            {/* Nellore */}
            <a href="/nellore" className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition group">
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-slate-900 group-hover:text-[#16A34A]">Nellore Hub</span>
                <span className="text-[10px] text-[#16A34A] font-bold">Explore →</span>
              </div>
              <span className="text-[10px] text-slate-500 block leading-relaxed">
                Magunta Layout, Penna Riverfront, Balaji Nagar, Dargamitta, Vedayapalem.
              </span>
            </a>

            {/* Ongole */}
            <a href="/ongole" className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition group">
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-slate-900 group-hover:text-[#16A34A]">Ongole Hub</span>
                <span className="text-[10px] text-[#16A34A] font-bold">Explore →</span>
              </div>
              <span className="text-[10px] text-slate-500 block leading-relaxed">
                Bhagyanagar, Lawyerpet, Kurnool Road Belt, Santhapet, Mangamuru Road.
              </span>
            </a>

            {/* Free Measurement Callout */}
            <div className="p-3 rounded-xl border border-emerald-300 bg-emerald-50/60 flex flex-col justify-between">
              <div>
                <span className="font-black text-slate-900 text-[11px] block">Need Free Measurement?</span>
                <span className="text-[10px] text-slate-600 block mt-0.5">We dispatch our engineer with laser toolkit in 2 hours.</span>
              </div>
              <a href="tel:+916281620716" className="mt-2 text-[10px] font-black text-[#16A34A] hover:underline flex items-center gap-1">
                <span>Call Now</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* 3. BOTTOM BAR: INDIA | SITEMAP | LEGAL & PRIVACY | COOKIES    */}
        {/* ------------------------------------------------------------ */}
        <div className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          
          {/* Left: Region Flag */}
          <div className="flex items-center gap-2 font-medium text-slate-700">
            <span className="text-base leading-none">🇮🇳</span>
            <span>India • Andhra Pradesh</span>
          </div>

          {/* Right: Sitemap, Legal & Privacy, Cookies */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 font-medium text-slate-600">
            <a href="/sitemap" className="hover:text-slate-900 transition">Sitemap</a>
            <a href="/privacy" className="hover:text-slate-900 transition">Legal & Privacy</a>
            <a href="/privacy#cookies" className="hover:text-slate-900 transition">Cookies</a>
          </div>

        </div>

        {/* ------------------------------------------------------------ */}
        {/* 4. LARGE CENTERED BRAND WORDMARK MATCHING REFERENCE PHOTO    */}
        {/* ------------------------------------------------------------ */}
        <div className="pt-8 text-center border-t border-slate-100">
          <div className="text-2xl sm:text-3xl md:text-4xl font-black tracking-[0.24em] sm:tracking-[0.32em] text-slate-950 uppercase select-none">
            D-VIEW
          </div>
          <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-[0.28em] mt-1.5">
            ARCHITECTURAL INVISIBLE SAFETY GRILLS • ZERO CAGES • 10-YEAR WARRANTY
          </p>
        </div>

      </div>
    </footer>
  );

  const quickConnectWAMessage = encodeURIComponent(
    "Hello D-view invisible grills, I am interested in invisible safety grills for my balcony. Please share details."
  );

  const renderFloatingQuickConnect = () => (
    <aside aria-label="Quick Connect Floating Actions">
      {/* 1. Floating WhatsApp Button (Bottom-Right on ALL devices) */}
      <a
        href={`https://wa.me/916281620716?text=${quickConnectWAMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with D-View on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_4px_25px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer border-2 border-white/20"
      >
        {/* Subtle Breathing Pulse Glow Animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping -z-10 pointer-events-none" />
        
        {/* Normal Official WhatsApp SVG Icon (White Phone & Bubble) */}
        <svg 
          className="w-8 h-8 sm:w-9 sm:h-9 fill-white text-white drop-shadow-sm" 
          viewBox="0 0 448 512"
          aria-hidden="true"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>

        {/* Desktop Hover Tooltip */}
        <span className="hidden md:group-hover:block absolute right-full mr-3 px-3.5 py-2 rounded-xl bg-[#101714] border border-[#25D366]/40 text-[#25D366] text-xs font-semibold whitespace-nowrap shadow-xl">
          Chat on WhatsApp
        </span>
      </a>

      {/* 2. Floating Quick Call Button (Bottom-Left) */}
      <a
        href="tel:+916281620716"
        aria-label="Direct Phone Call"
        className="fixed bottom-6 left-5 sm:left-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-[#101714]/95 backdrop-blur-md border border-[#7CFF3A]/40 text-slate-100 shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:scale-105 active:scale-95 transition-all text-xs font-semibold uppercase tracking-wider group cursor-pointer"
      >
        <Phone className="w-4 h-4 text-[#7CFF3A] shrink-0 stroke-[2.5]" />
        <span className="text-white font-bold tracking-normal">Call Now</span>
      </a>
    </aside>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-[#16A34A] selection:text-white">
      
      {/* ========================================================= */}
      {/* 1. TOP MINIMAL NAVIGATION HEADER                          */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 px-4 sm:px-12 flex items-center justify-between pointer-events-auto transition-all">
        
        {/* Left: Thin menu mark `= MENU` and brand title `D-VIEW INVISIBLE SAFETY` */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Navigation Menu"
            aria-expanded={isMenuOpen}
            aria-controls="dview-side-drawer"
            className="flex items-center gap-2 py-2 text-xs uppercase tracking-[0.25em] text-slate-700 hover:text-[#16A34A] transition cursor-pointer font-bold"
          >
            <span className="text-base leading-none">=</span> MENU
          </button>

          {tier === 'tier1' ? (
            <h1 className="m-0 flex items-center">
              <a href="/" className="flex items-center gap-3 group">
                <img 
                  src="/images/d-view-logo-horizontal.png" 
                  alt="D-VIEW Invisible Grills & Safety Solutions" 
                  width="160"
                  height="40"
                  decoding="async"
                  className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                />
                <span className="sr-only xl:not-sr-only xl:flex items-center pl-3 border-l-2 border-emerald-500/40">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-[10px] xl:text-[11px] font-black uppercase tracking-wider text-[#16A34A] shadow-sm whitespace-nowrap">
                    <span className="text-[#16A34A] font-extrabold" aria-hidden="true">—</span>
                    <span className="text-slate-900 font-extrabold tracking-[0.14em]">INVISIBLE GRILLS & SAFETY SOLUTIONS</span>
                    <span className="text-[#16A34A] font-extrabold" aria-hidden="true">—</span>
                  </span>
                </span>
              </a>
            </h1>
          ) : (
            <a href="/" className="flex items-center gap-3 group">
              <img 
                src="/images/d-view-logo-horizontal.png" 
                alt="D-VIEW Invisible Grills & Safety Solutions" 
                width="160"
                height="40"
                decoding="async"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="hidden xl:flex items-center pl-3 border-l-2 border-emerald-500/40">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-[10px] xl:text-[11px] font-black uppercase tracking-wider text-[#16A34A] shadow-sm whitespace-nowrap">
                  <span className="text-[#16A34A] font-extrabold">—</span>
                  <span className="text-slate-900 font-extrabold tracking-[0.14em]">INVISIBLE GRILLS & SAFETY SOLUTIONS</span>
                  <span className="text-[#16A34A] font-extrabold">—</span>
                </span>
              </div>
            </a>
          )}
        </div>

        {/* Middle: 6 Cities Quick Navigation Dropdown */}
        <div className="relative group hidden md:block">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50 border border-emerald-300 text-[#16A34A] text-xs font-bold uppercase tracking-wider hover:bg-[#16A34A] hover:text-white transition cursor-pointer shadow-sm"
          >
            <span>📍 Explore 7 City Hubs</span>
            <span className="text-[10px]">▼</span>
          </button>
          <div className="absolute top-full mt-2 left-0 w-64 rounded-2xl bg-white border border-slate-200 p-2 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 mb-1">
              Select City Sub-Page
            </div>
            {CITIES_SLIDES.map((c) => (
              <a
                key={c.id}
                href={c.locationPath}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-white hover:bg-[#16A34A] transition"
              >
                <span>{c.name}</span>
                <span className="text-[#16A34A] group-hover:text-white font-black">→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right: Direct concierge telephone `+91 62816 20716` and `CONTACT US` */}
        <div className="flex items-center gap-4 sm:gap-8 text-xs uppercase tracking-[0.2em] text-slate-700 font-semibold">
          <button
            type="button"
            onClick={() => handleOpenBooking()}
            className="hidden sm:inline-block py-2 hover:text-[#16A34A] transition cursor-pointer text-slate-700"
          >
            CONTACT US
          </button>
          
          <a
            href="tel:+916281620716"
            aria-label="Call D-VIEW Helpline +91 62816 20716"
            className="text-slate-900 hover:text-[#16A34A] transition flex items-center gap-1.5 p-2 sm:p-0"
          >
            <Phone className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#16A34A] stroke-[2]" />
            <span className="hidden sm:inline text-slate-800 font-bold">+91 62816 20716</span>
          </a>
        </div>

      </header>

      {/* ========================================================= */}
      {/* SLEEK LUXURY SIDE DRAWER MENU                             */}
      {/* ========================================================= */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div
            id="dview-side-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation Menu"
            className="relative w-full max-w-sm bg-white border-r border-slate-200 h-full p-6 sm:p-8 z-10 flex flex-col justify-between overflow-y-auto shadow-2xl"
          >
            
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-200">
                <div className="flex flex-col gap-1.5">
                  <a href="/" className="flex items-center gap-2">
                    <img 
                      src="/images/d-view-logo-horizontal.png" 
                      alt="D-VIEW Invisible Safety Grills" 
                      width="160"
                      height="40"
                      decoding="async"
                      className="h-8 w-auto object-contain" 
                    />
                  </a>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-[9px] font-black uppercase tracking-wider text-[#16A34A] w-fit">
                    <span className="text-[#16A34A]">—</span>
                    <span className="text-slate-900 font-extrabold">INVISIBLE GRILLS & SAFETY SOLUTIONS</span>
                    <span className="text-[#16A34A]">—</span>
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close Navigation Menu"
                  className="text-slate-500 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Service Locations List (Tier 1 -> Tier 2) */}
              <div className="mt-8">
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold block mb-4">
                  SELECT CITY HUB (TIER 2 CORRIDORS)
                </span>
                <div className="space-y-2">
                  {CITIES_SLIDES.map((slide) => (
                    <a
                      key={slide.id}
                      href={slide.locationPath}
                      onClick={() => setIsMenuOpen(false)}
                      className="block p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-emerald-300 transition group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-900 group-hover:text-[#16A34A]">
                          {slide.name}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#16A34A]" />
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        {slide.categoryTag}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Navigation Links */}
              <div className="mt-8 pt-6 border-t border-slate-200 space-y-3 text-xs tracking-wider text-slate-700 uppercase font-semibold">
                <a 
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-1 hover:text-[#16A34A] transition"
                >
                  Tier 1: City Showcase Slides
                </a>
                <a 
                  href={activeSlide.locationPath}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-1 hover:text-[#16A34A] transition"
                >
                  Tier 2: {activeSlide.name} Corridors
                </a>
                <a 
                  href={`/safety-pillars/${activeSlide.slug === 'vijayawada-amaravati' ? 'vijayawada' : activeSlide.slug}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-1 hover:text-[#16A34A] transition text-[#16A34A]"
                >
                  Tier 3: 6-Pillar Proofs & Pricing
                </a>
              </div>
            </div>

            {/* Concierge Info at Bottom */}
            <div className="pt-8 border-t border-slate-200 text-xs text-slate-500 space-y-1">
              <p className="text-slate-900 font-bold tracking-wider">Direct Concierge</p>
              <p className="text-slate-800 font-medium">+91 62816 20716</p>
              <p className="text-slate-600">dviewsolutions32@gmail.com</p>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TIER 1: MAIN DASHBOARD (FULL-SCREEN CITY SHOWCASE SLIDES)            */}
      {/* ==================================================================== */}
      {tier === 'tier1' && (
        <main className="min-h-screen w-full bg-slate-50">
          
          {/* 6 CITIES SLIDES: 100% IMMERSIVE FULL SCREEN COVERAGE */}
          {CITIES_SLIDES.map((slide, idx) => (
            <section
              key={slide.id}
              id={`slide-${slide.id}`}
              className="relative w-full h-[calc(100dvh-56px)] min-h-[580px] flex flex-col justify-between overflow-hidden select-none border-b border-slate-200 bg-white"
            >
              {/* ============================================================ */}
              {/* MOBILE VIEW: TRUE 100% FULLSCREEN 9:16 IMMERSIVE EXPERIENCE  */}
              {/* ============================================================ */}
              <div className="md:hidden absolute inset-0 w-full h-full">
                {/* 100% Fullscreen 9:16 Vertical Image covering entire mobile screen edge-to-edge */}
                <picture className="absolute inset-0 w-full h-full">
                  <source media="(max-width: 768px)" srcSet={slide.mobileHeroImage || slide.heroImage} />
                  <img
                    src={slide.heroImage}
                    alt={`D-VIEW Invisible Grills in ${slide.name}`}
                    className="w-full h-full object-cover object-center"
                    loading={idx === 0 ? "eager" : "lazy"}
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    decoding="async"
                    width="720"
                    height="1280"
                  />
                </picture>

                {/* Bottom gradient vignette for crisp text legibility while upper 75% remains unblocked */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />

                {/* Full screen tap-target navigates directly to the city corridor page */}
                <a
                  href={slide.locationPath}
                  className="absolute inset-0 z-10 block"
                  aria-label={`Explore ${slide.name} Invisible Grills`}
                />

                {/* Mobile Bottom Information: Exactly 2-3 lines of clean text (NO map symbol, NO counter, NO extra buttons) */}
                <div className="absolute bottom-24 inset-x-0 z-20 px-5 pb-2 text-left pointer-events-none">
                  {/* Line 1: Place Name in Brand Green (No map icon) */}
                  <div className="text-xs sm:text-sm font-black text-[#7CFF3A] tracking-[0.22em] uppercase drop-shadow mb-1">
                    {slide.name}
                  </div>

                  {/* Line 2: Semantic H2 Headline */}
                  <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight leading-tight drop-shadow-md mb-1.5">
                    Invisible Grills in <span className="text-[#7CFF3A]">{slide.cityShort}</span>
                  </h2>

                  {/* Line 3: Subline Paragraph */}
                  <p className="text-xs sm:text-sm text-slate-100/95 font-medium leading-snug drop-shadow max-w-sm">
                    {slide.subline || "SS-316 Marine Grade Invisible Grills for 100% Balcony Safety & Open Views."}
                  </p>
                </div>

              </div>

              {/* ============================================================ */}
              {/* DESKTOP VIEW: LUXURY 2-COLUMN SPLIT SHOWCASE                 */}
              {/* ============================================================ */}
              <div className="hidden md:flex relative w-full h-full flex-col justify-between p-6 bg-slate-50">
                {/* Ambient Atmospheric Background */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-slate-100 to-emerald-500/5 pointer-events-none"
                />

                {/* Main Content Grid */}
                <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 grid grid-cols-12 gap-8 items-center justify-center my-auto">
                  {/* Poster Image Card */}
                  <div className="col-span-7 flex flex-col items-center justify-center">
                    <a
                      href={slide.locationPath}
                      className="relative block w-full max-w-[480px] aspect-square rounded-3xl overflow-hidden border-2 border-emerald-500 shadow-xl bg-white group transition-all duration-300 hover:scale-[1.01] active:scale-98 cursor-pointer"
                    >
                      <img
                        src={slide.heroImage}
                        alt={`D-VIEW Invisible Grills in ${slide.name}`}
                        className="w-full h-full object-cover rounded-3xl"
                        loading="lazy"
                        decoding="async"
                        width="640"
                        height="640"
                      />
                    </a>
                  </div>

                  {/* Desktop Side Details */}
                  <div className="col-span-5 flex flex-col items-start text-left space-y-3.5">
                    {/* Prominently Highlighted Brand Slogan Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border-2 border-emerald-500 text-[11px] font-black tracking-wider uppercase text-emerald-950 shadow-sm">
                      <span className="text-[#16A34A] font-extrabold text-sm">—</span>
                      <span className="font-extrabold tracking-[0.14em]">INVISIBLE GRILLS & SAFETY SOLUTIONS</span>
                      <span className="text-[#16A34A] font-extrabold text-sm">—</span>
                    </div>

                    {/* Place Name (Clean - No map icon) */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-black text-[#16A34A] uppercase tracking-wider">
                      <span>{slide.name} ({slide.cityShort})</span>
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-black text-slate-900 uppercase leading-snug tracking-tight">
                      Invisible Grills in <span className="text-[#16A34A]">{slide.name}</span>
                    </h2>

                    <p className="text-sm text-slate-600 font-normal leading-relaxed">
                      {slide.subline || slide.landmarkDesc}
                    </p>

                    <div className="p-3 rounded-2xl bg-white border border-slate-200 w-full space-y-1 shadow-sm">
                      <div className="text-[11px] font-bold text-[#16A34A] uppercase tracking-wider">
                        Prominent Service Belts:
                      </div>
                      <div className="text-xs text-slate-700 font-medium">
                        {slide.activeBelts.slice(0, 4).join(' • ')}
                      </div>
                    </div>

                    <a
                      href={slide.locationPath}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#16A34A] hover:bg-emerald-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>Explore {slide.cityShort} Safety Solutions</span>
                      <span className="text-base font-black">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* GLOBAL SECTIONS: PROOF, WARRANTY, FOOTER                            */}
          {/* ==================================================================== */}
          {renderSocietyProofSection(true)}
          {renderWarrantySection(true)}
          {renderLuxuryFooter(true)}
          {renderFloatingQuickConnect()}

        </main>
      )}

      {/* ==================================================================== */}
      {/* TIER 2: CITY SUB-LOCATIONS GRID PAGE (e.g. /locations/vizag)         */}
      {/* CRITICAL: ONLY LOCAL PROMINENT CORRIDORS - ZERO 6-PILLAR GRID HERE!  */}
      {/* ==================================================================== */}
      {tier === 'tier2' && (
        <main id="location-tier2" className="min-h-screen pb-28 sm:pb-20 bg-slate-50">
          
          {/* Top 35vh (Mobile) / 45vh (Desktop) Bright Hero Background Section */}
          <section className="relative h-[35vh] sm:h-[45vh] min-h-[260px] w-full overflow-hidden flex items-end justify-start">
            {/* Bright Signature City Interior Balcony Background - Mobile Landmark Focal Point */}
            <div 
              className={`bg-adaptive-landmark absolute inset-0 bg-cover transition-transform duration-700 ${getMobileLandmarkClass(activeSlide.id)}`}
              style={{ 
                backgroundImage: `url(${activeSlide.heroImage})`,
                ['--bg-pos-mob' as any]: getMobileFocalPosition(activeSlide.id)
              }}
            >
              {/* Natural Daytime Architectural Clarity: 100% Bright Sunlit View */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none" />
            </div>

            {/* Concise Header in Bottom-Left */}
            <div className="relative z-20 max-w-5xl px-5 sm:px-12 pb-6 sm:pb-8">
              {/* Breadcrumb Back */}
              <a 
                href="/" 
                className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-slate-200 hover:text-white transition mb-2 group font-medium drop-shadow"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition" />
                <span>City Showcase (Tier 1)</span>
              </a>

              {/* 1 concise line emotion tag in Signature Brand Green Pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-emerald-300 text-[9px] sm:text-[10px] font-bold text-[#16A34A] uppercase tracking-wider mb-2 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                <span>"{activeSlide.emotionHook}"</span>
              </div>

              {/* 1 title in Pure White with City Accent in Brand Green */}
              <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold uppercase text-white tracking-tight drop-shadow-md">
                <span className="text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]">{activeSlide.name}</span> • Prominent Residential & High-Rise Corridors
              </h1>
            </div>
          </section>

          {/* Sub-Locations Grid Section - 1 Column Stack on Mobile */}
          <div className="max-w-7xl mx-auto px-5 sm:px-12 pt-8 sm:pt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {activeSlide.subLocations.map((corridor, idx) => (
                <a
                  key={idx}
                  href={`/safety-pillars/${activeSlide.slug === 'vijayawada-amaravati' ? 'vijayawada' : activeSlide.slug}?corridor=${encodeURIComponent(corridor.name)}`}
                  className="group rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-500 bg-white transition-all duration-300 flex flex-col hover:shadow-xl cursor-pointer"
                >
                  {/* High-Definition Sunlit Balcony Visual - 100% CLEAN & UNOBSTRUCTED */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                    <img 
                      src={corridor.image} 
                      alt={`${corridor.name} Balcony SS-316 Invisible Grills`} 
                      style={{ objectPosition: getMobileFocalPosition(corridor.name) }}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${getMobileLandmarkClass(corridor.name)}`}
                      loading={idx === 0 ? "eager" : "lazy"}
                      fetchPriority={idx === 0 ? "high" : "auto"}
                      decoding="async"
                      width="640"
                      height="360"
                      sizes="(max-width: 768px) 100vw, 1920px"
                    />
                    {/* Natural Daytime Architectural Clarity: Subtle bottom blend only */}
                    <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                  </div>

                  {/* Card Content in Brushed Silver & Deep Green */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Specifications Row Below Image */}
                      <div className="flex flex-wrap items-center gap-2 mb-2.5">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#16A34A] uppercase tracking-wider">
                          <MapPin className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                          {corridor.elevation}
                        </span>
                        <span className="text-slate-300 text-xs">•</span>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-700 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                          {corridor.tag}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#16A34A] transition mb-1.5 sm:mb-2">
                        {corridor.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {corridor.desc}
                      </p>
                    </div>

                    <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[#16A34A] font-bold group-hover:translate-x-1 transition flex items-center gap-1 text-[11px] sm:text-xs">
                        View 6-Pillar Solutions & Pricing →
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                        SS-316 Certified
                      </span>
                    </div>
                  </div>

                </a>
              ))}
            </div>
          </div>

          {/* GLOBAL SECTIONS: PROOF, WEATHER, WARRANTY, FOOTER                   */}
          {/* ==================================================================== */}
          {renderSocietyProofSection(false)}
          {renderWeatherShieldSection(false)}
          {renderWarrantySection(false)}
          {renderLuxuryFooter(false)}
          {renderFloatingQuickConnect()}

        </main>
      )}

      {/* ==================================================================== */}
      {/* TIER 3: THE 6-PILLAR PROBLEM-SOLVER & CONVERSION PAGE                 */}
      {/* OPENS ONLY AFTER CLICKING A TIER 2 SUB-LOCATION CARD!                 */}
      {/* ==================================================================== */}
      {tier === 'tier3' && (
        <main id="location-tier3" className="min-h-screen pb-28 sm:pb-20 bg-white">
          
          {/* Dynamic Top Hero Section (Height: 32vh on mobile, 42vh on desktop) */}
          <section className="relative h-[32vh] sm:h-[42vh] min-h-[240px] w-full overflow-hidden flex items-end justify-start">
            {/* Bright Corridor-Specific Interior Balcony Background with Mobile Landmark Framing */}
            <div 
              className={`bg-adaptive-landmark absolute inset-0 bg-cover transition-transform duration-700 ${getMobileLandmarkClass(selectedCorridor)}`}
              style={{ 
                backgroundImage: `url(${currentHeroImage})`,
                ['--bg-pos-mob' as any]: getMobileFocalPosition(selectedCorridor)
              }}
            >
              {/* Natural Daytime Architectural Clarity: 100% Bright Sunlit View */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none" />
            </div>

            {/* Header Micro-Copy in Bottom-Left */}
            <div className="relative z-20 max-w-5xl px-5 sm:px-12 pb-6 sm:pb-8">
              
              {/* Top Back Link & Focused Corridor Badge */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <a 
                  href={activeSlide.locationPath} 
                  className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-slate-200 hover:text-white transition group font-medium drop-shadow"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition" />
                  <span>Back to {activeSlide.name} Corridors (Tier 2)</span>
                </a>

                {/* Corridor Pill Badge with Signature Brand Green */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-emerald-300 text-[10px] sm:text-[11px] font-bold text-[#16A34A] shadow-md">
                  <span>📍 Focused Corridor: {currentCorridorDisplayName}</span>
                </div>
              </div>

              {/* Heading (White & Brand Green) */}
              <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold uppercase text-white tracking-tight drop-shadow-md">
                THE 6-PILLAR PROBLEM-SOLVER <span className="text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]">SOLUTIONS</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 font-normal tracking-wide mt-1 sm:mt-2 drop-shadow-md line-clamp-2 sm:line-clamp-none">
                Tailored architectural invisible grill engineering for {currentCorridorDisplayName} residences.
              </p>

            </div>
          </section>

          {/* ----------------------------------------------------------------- */}
          {/* SECTION A: THE 6-PILLAR PROBLEM-SOLVER GRID                       */}
          {/* ----------------------------------------------------------------- */}
          <section id="pillars-section" className="py-10 sm:py-12 px-5 sm:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
              
              <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-[#16A34A] uppercase tracking-widest mb-2 shadow-sm">
                  <span>REAL PROOF SOLUTIONS • SS-316 ARCHITECTURAL CERTIFIED</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold uppercase text-slate-900 tracking-tight">
                  High-Definition <span className="text-[#16A34A]">Balcony Protection</span>
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1.5 sm:mt-2 leading-relaxed font-normal">
                  Engineered specifically for {currentCorridorDisplayName} high-rises and residential balconies.
                </p>
              </div>

              {/* 6 Grid Cards with Crisp Sunlight Imagery & Emerald Badges - 1 Column Stack on Mobile */}
              {(() => {
                const cityGrillData = getSafetyGrillData(activeSlide.id);
                const cityPillarsMap: Record<string, { problem: string; solution: string; title: string }> = {};
                if (cityGrillData?.pillars) {
                  cityGrillData.pillars.forEach(p => { cityPillarsMap[p.id] = p; });
                }
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {PROBLEM_SOLVERS.map((card, idx) => {
                      const Icon = card.icon;
                      // Map generic pillar id to PROBLEM_SOLVERS index order
                      const pillarIds = ['children-safety', 'pets-safety', 'old-age-safety', 'pigeons-safety', 'fire-escape', 'modern-luxury'];
                      const cityPillar = cityPillarsMap[pillarIds[idx]];
                      return (
                        <div 
                          key={idx}
                          className="group rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-500 bg-white transition-all duration-300 flex flex-col hover:shadow-xl"
                        >
                          {/* High-Definition Sunlit Balcony Photography - 100% CLEAN & UNOBSTRUCTED */}
                          <div className="relative h-64 w-full overflow-hidden">
                            <img 
                              src={card.image} 
                              alt={cityPillar?.title || card.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading={idx === 0 ? "eager" : "lazy"}
                              fetchPriority={idx === 0 ? "high" : "auto"}
                              decoding="async"
                              width="640"
                              height="360"
                              sizes="(max-width: 768px) 100vw, 1920px"
                            />
                            {/* Natural Daytime Architectural Clarity: Subtle bottom blend only */}
                            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                          </div>

                          {/* Content in Deep Emerald Green & Brushed Silver */}
                          <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                              {/* Specification Row Below Image */}
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[#16A34A]">
                                    <Icon className="w-4 h-4 text-[#16A34A]" />
                                  </div>
                                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#16A34A]">
                                    {card.badge}
                                  </span>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
                                  {card.stat}
                                </span>
                              </div>

                              {/* City-specific pillar title (from corridors.ts) or fallback */}
                              <h3 className="text-xl font-bold text-slate-900 mb-2">
                                {cityPillar?.title || card.title}
                              </h3>

                              {/* City-specific problem/solution injection from corridors.ts */}
                              {cityPillar ? (
                                <>
                                  <div className="mb-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                                    <div>
                                      <span className="text-[10px] font-bold uppercase tracking-widest text-rose-700 block mb-0.5">⚠ Local Problem</span>
                                      <p className="text-xs text-rose-950 leading-relaxed font-normal">{cityPillar.problem}</p>
                                    </div>
                                    <div className="border-t border-slate-200 pt-2.5">
                                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#16A34A] block mb-0.5">✓ D-View Solution</span>
                                      <p className="text-xs text-slate-800 leading-relaxed font-normal">{cityPillar.solution}</p>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2 font-normal">
                                    {card.desc}
                                  </p>
                                  <p className="text-xs text-[#16A34A] italic leading-relaxed font-medium">
                                    "{card.teluguDesc}"
                                  </p>
                                </>
                              )}
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                              <span className="flex items-center gap-1.5 text-[#16A34A] font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" /> Certified SS-316
                              </span>
                              <span className="uppercase text-[10px] tracking-wider text-slate-500 font-semibold">
                                100% Reliable
                              </span>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              {/* ============================================================= */}
              {/* CITY-SPECIFIC COMPLETED PROJECTS STRIP (from corridors.ts)     */}
              {/* ============================================================= */}
              {(() => {
                const cityGrillData = getSafetyGrillData(activeSlide.id);
                if (!cityGrillData?.completedProjects?.length) return null;
                return (
                  <div className="mt-12">
                    <div className="text-center mb-6">
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-[#16A34A] uppercase tracking-widest">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                        VERIFIED {cityGrillData.cityName.toUpperCase()} INSTALLATIONS
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {cityGrillData.completedProjects.map((proj, pi) => (
                        <div
                          key={pi}
                          className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-all group shadow-sm hover:shadow-md"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#16A34A] uppercase tracking-wider">
                              <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                              {proj.status}
                            </span>
                            {proj.unitsSecured && (
                              <span className="text-[10px] font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                                {proj.unitsSecured}
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#16A34A] transition mb-1 leading-snug">
                            {proj.societyName}
                          </h3>
                          <div className="flex items-center gap-1.5 text-[10px] text-[#16A34A] font-semibold mb-2">
                            <span>🛡</span>
                            <span>{proj.installationType}</span>
                          </div>
                          {proj.floor && (
                            <div className="text-[10px] text-slate-600 mb-2 font-medium">
                              <MapPin className="w-3 h-3 inline mr-1 text-[#16A34A]" />
                              {proj.floor}
                            </div>
                          )}
                          {proj.note && (
                            <p className="text-[11px] text-slate-600 italic leading-relaxed border-t border-slate-200 pt-2 mt-2">
                              "{proj.note}"
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Closing Tagline in Telugu */}
              <div className="mt-14 text-center p-6 rounded-2xl bg-emerald-50 border border-emerald-200 max-w-4xl mx-auto shadow-sm">
                <p className="text-emerald-950 font-semibold text-sm sm:text-base italic">
                  "Okke Okka Balcony Installation... Enno High-Alert Safety Problems Nundi Mee Intiki Life-Time Premium Protection!"
                </p>
              </div>

            </div>
          </section>

          {/* ----------------------------------------------------------------- */}
          {/* REAL SOCIETY INSTALLATIONS & SOCIAL PROOF ENGINE                   */}
          {/* ----------------------------------------------------------------- */}
          {renderSocietyProofSection(false)}

          {/* ----------------------------------------------------------------- */}
          {/* SECTION B: LOCAL WEATHER GUIDE & SS-316 TECHNICAL TRUST         */}
          {/* ----------------------------------------------------------------- */}
          {renderWeatherShieldSection(false)}

          {/* ----------------------------------------------------------------- */}
          {/* SECTION A: WARRANTY & TRUST STANDARDS                             */}
          {/* ----------------------------------------------------------------- */}
          {renderWarrantySection(false)}


          {/* ----------------------------------------------------------------- */}
          {/* TECHNICAL FAQS SECTION                                            */}
          {/* ----------------------------------------------------------------- */}
          <section id="faq-section" className="py-16 sm:py-20 px-6 sm:px-12 border-t border-slate-200 bg-slate-50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-[0.3em] text-[#16A34A] font-bold">
                  FREQUENTLY ASKED QUESTIONS
                </span>
                <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold uppercase text-slate-900 mt-2 break-words">
                  Architectural Safety Insights ({activeSlide.name})
                </h2>
              </div>

              <div className="space-y-4">
                {(faqs && faqs.length > 0 ? faqs.map(f => ({ q: f.question, a: f.answer })) : FAQS).map((faq, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
                      {faq.q}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6 font-normal">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* GLOBAL LUXURY CONCIERGE FOOTER */}
          {renderLuxuryFooter(false)}

          {/* Persistent Floating WhatsApp & Call Buttons */}
          {renderFloatingQuickConnect()}

        </main>
      )}

      {/* ========================================================= */}
      {/* WHATSAPP LEAD MODAL WITH DYNAMIC QR CODE                  */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            className="relative w-full max-w-md max-h-[90dvh] overflow-y-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl"
          >
            
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close Booking Modal"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 cursor-pointer transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-left mb-5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#16A34A] font-bold block">
                Instant Concierge Booking
              </span>
              <h3 id="booking-modal-title" className="text-xl sm:text-2xl font-extrabold uppercase text-slate-900 mt-1">
                Book Free Site Measurement
              </h3>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Free Doorstep Precision Laser Site Measurement Across Andhra Pradesh
              </p>
            </div>

            <div className="space-y-3.5">
              <div>
                <label htmlFor="modal-city-hub" className="text-[11px] uppercase font-bold text-slate-700 block mb-1">
                  Selected City Hub
                </label>
                <select 
                  id="modal-city-hub"
                  value={selectedHub}
                  onChange={(e) => setSelectedHub(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white font-medium"
                >
                  <option value="Visakhapatnam">Visakhapatnam</option>
                  <option value="Rajamahendravaram">Rajamahendravaram</option>
                  <option value="Vijayawada">Vijayawada</option>
                  <option value="Guntur">Guntur</option>
                  <option value="Kakinada">Kakinada</option>
                  <option value="Nellore">Nellore</option>
                  <option value="Ongole">Ongole</option>
                </select>
              </div>

              <div>
                <label htmlFor="modal-corridor" className="text-[11px] uppercase font-bold text-slate-700 block mb-1">
                  Corridor / Community
                </label>
                <input 
                  id="modal-corridor"
                  type="text"
                  placeholder="e.g. Madhurawada High-Rises"
                  value={selectedCorridor}
                  onChange={(e) => setSelectedCorridor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="modal-customer-name" className="text-[11px] uppercase font-bold text-slate-700 block mb-1">
                  Your Full Name
                </label>
                <input 
                  id="modal-customer-name"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Ramesh Varma"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (modalError) setModalError('');
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="modal-customer-phone" className="text-[11px] uppercase font-bold text-slate-700 block mb-1">
                  Phone Number (For WhatsApp Confirmation)
                </label>
                <input 
                  id="modal-customer-phone"
                  type="tel"
                  inputMode="tel"
                  pattern="[6-9][0-9]{9}"
                  maxLength={15}
                  autoComplete="tel"
                  placeholder="+91 62816 20716"
                  value={customerPhone}
                  onChange={(e) => {
                    setCustomerPhone(e.target.value);
                    if (modalError) setModalError('');
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              {/* Dynamic WhatsApp QR Code */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center mt-3">
                <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl flex items-center justify-center border border-slate-200 shadow-sm">
                  {whatsAppQrDataUrl ? (
                    <img
                      src={whatsAppQrDataUrl}
                      alt="QR code for opening the prefilled D-VIEW WhatsApp enquiry"
                      className="w-full h-full object-contain"
                      width="140"
                      height="140"
                    />
                  ) : (
                    <span className="text-[10px] text-slate-500">QR code loading</span>
                  )}
                </div>
                <span className="block text-[11px] text-slate-600 font-medium mt-2">
                  Scan with camera to open pre-filled WhatsApp enquiry draft
                </span>
              </div>

              {/* Affirmative Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consentAgreed}
                    onChange={(e) => {
                      setConsentAgreed(e.target.checked);
                      if (modalError) setModalError('');
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-[11px] text-slate-600 leading-tight">
                    I agree to D-VIEW contacting me via WhatsApp or call regarding site measurement and safety grill details.
                  </span>
                </label>
              </div>

              {/* Accessible Inline Validation Alert */}
              {modalError && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2 mt-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{modalError}</span>
                </div>
              )}

              <a 
                href={`https://wa.me/916281620716?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!customerName.trim()) {
                    e.preventDefault();
                    setModalError('Please enter your full name');
                    return;
                  }
                  const cleanPhone = customerPhone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
                  if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
                    e.preventDefault();
                    setModalError('Please enter a valid 10-digit Indian mobile number');
                    return;
                  }
                  if (!consentAgreed) {
                    e.preventDefault();
                    setModalError('Please check the consent box to proceed with WhatsApp enquiry.');
                    return;
                  }
                  setModalError('');
                }}
                className="w-full bg-[#16A34A] hover:bg-emerald-700 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider block text-center shadow-lg mt-3 transition"
              >
                Send Details via WhatsApp Directly →
              </a>
              <p className="text-center text-[10px] text-slate-500 mt-1">
                Opens WhatsApp with your draft message; tap Send in WhatsApp to share with D-VIEW.
              </p>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

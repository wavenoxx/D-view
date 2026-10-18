// /src/data/corridors.ts
// Dynamic data configuration standard for D-View Invisible Safety Web Application

export interface VisualParameters {
  locationType: string;
  landmarkView: string;
  brightnessEnforcement: string;
  textContrastRatio: string;
}

export interface PillarItem {
  id: string;
  title: string;
  problem: string;
  solution: string;
  specKey: string;
}

export interface CompletedProject {
  societyName: string;
  installationType: string;
  status: string;
  floor?: string;
  unitsSecured?: string;
  note?: string;
}

export interface ContactSpecs {
  phoneDial: string;
  whatsappPreFill: string;
  emergencySpec: string;
}

export interface CitySafetyGrillConfig {
  cityId: string;
  cityName: string;
  pillarRouting: string;
  visualParams: VisualParameters;
  pillars: PillarItem[];
  completedProjects: CompletedProject[];
  contactSpecs: ContactSpecs;
}

export const safetyGrillData: Record<string, CitySafetyGrillConfig> = {
  // ==========================================
  // STEP 1: VISAKHAPATNAM DATA INTEGRATION
  // ==========================================
  vizag: {
    cityId: "vizag",
    cityName: "Visakhapatnam",
    pillarRouting: "vizag",
    visualParams: {
      locationType: "coastal_hills",
      landmarkView: "RK Beach Curve & Kailasagiri Hillside",
      brightnessEnforcement: "max_daylight_sunlit",
      textContrastRatio: "premium_emerald_silver",
    },
    pillars: [
      {
        id: "children-safety",
        title: "CHILDREN FALL PROTECTION",
        problem: "25th-floor penthouse balcony vertigo and toddler climbing hazards.",
        solution: "Floor-to-ceiling high-tensile SS-316 cables with zero ladder-effect.",
        specKey: "HIGH_TENSILE_SPEC"
      },
      {
        id: "pets-safety",
        title: "ZERO-GAP PET ARCHITECTURE",
        problem: "Cats and dogs slipping through wide traditional grill bar gaps.",
        solution: "Strict 2-inch vertical wire spacing preventing any animal egress.",
        specKey: "PET_SAFE_2INCH"
      },
      {
        id: "old-age-safety",
        title: "ELDERLY VERTIGO & DIZZINESS ELIMINATION",
        problem: "Dizziness and fear of falling near open sea winds and heights.",
        solution: "6063-T6 heavy-duty structural anchoring eliminating vibration.",
        specKey: "RIGID_ANCHOR_T6"
      },
      {
        id: "pigeons-safety",
        title: "COASTAL BIRD EXCLUSION",
        problem: "Salt-damp pigeon roosting and droppings destroying vitrified tiles.",
        solution: "Physical 50mm wire barrier blocking birds while preserving 99% sea breeze.",
        specKey: "BIRD_SHIELD_SS316"
      },
      {
        id: "fire-escape",
        title: "1-MINUTE EMERGENCY FIRE EGRESS",
        problem: "Welded iron cage grills creating inescapable traps during high-rise fires.",
        solution: "Clean manual cable severing in under 60 seconds with emergency cutters.",
        specKey: "1_MIN_SAFE_FIRE_EGRESS"
      },
      {
        id: "modern-luxury",
        title: "UNOBSTRUCTED RK BEACH HORIZON",
        problem: "Rusty dark iron bars ruining panoramic Bay of Bengal ocean views.",
        solution: "99% optical transparency with subtle chrome sheen on vitrified tiles.",
        specKey: "OPTICAL_LUXURY_316"
      }
    ],
    completedProjects: [
      {
        societyName: "MVV GV The Grand (Madhurawada)",
        installationType: "SS-316 2.5mm Marine Grade",
        status: "Design Specification",
        floor: "25th-Floor Penthouse",
        note: "Valley breeze passes freely with zero vertigo risk for kids."
      },
      {
        societyName: "Sanskriti Bayfront (Rushikonda)",
        installationType: "SS-316 2.5mm Molybdenum Marine Grade",
        status: "Design Specification",
        floor: "14th-Floor Sea Facing",
        note: "Zero decay from coastal salt spray."
      },
      {
        societyName: "Oceanus Towers (Yendada)",
        installationType: "SS-316 2.5mm Marine Grade",
        status: "Design Specification",
        floor: "18th-Floor Coastal Flat",
        note: "Effective bird droppings prevention without blocking morning sunrise."
      }
    ],
    contactSpecs: {
      phoneDial: "+916281620716",
      whatsappPreFill: "Hello D-View, I am interested in SS-316 invisible safety grills for my Vizag balcony. Please send information.",
      emergencySpec: "1_MIN_SAFE_FIRE_EGRESS"
    }
  },

  // ==========================================
  // STEP 2: RAJAMAHENDRAVARAM DATA INTEGRATION
  // ==========================================
  rajahmundry: {
    cityId: "rajahmundry",
    cityName: "Rajamahendravaram",
    pillarRouting: "rajahmundry",
    visualParams: {
      locationType: "riverfront_heritage",
      landmarkView: "Godavari Arch Bridge & River Panorama",
      brightnessEnforcement: "max_daylight_sunlit",
      textContrastRatio: "premium_emerald_silver",
    },
    pillars: [
      {
        id: "children-safety",
        title: "CHILDREN FALL PROTECTION",
        problem: "Riverbank high-rise balconies with loose railings causing fall risks.",
        solution: "Floor-to-ceiling high-tensile cables with tamper-proof anchoring.",
        specKey: "HIGH_TENSILE_SPEC"
      },
      {
        id: "pets-safety",
        title: "PET PROTECTION SPACING",
        problem: "Pets slipping through railing gaps onto riverfront drop.",
        solution: "2-inch precision spacing ensuring zero pet slip hazard.",
        specKey: "PET_SAFE_2INCH"
      },
      {
        id: "old-age-safety",
        title: "RIVERFRONT DIZZINESS ELIMINATION",
        problem: "Height anxiety when viewing broad river expanse from high floors.",
        solution: "Solid structural frame providing psychological and physical security.",
        specKey: "RIGID_ANCHOR_T6"
      },
      {
        id: "pigeons-safety",
        title: "EFFECTIVE PIGEON BARRIER",
        problem: "Heavy Godavari river pigeon colonies nesting on balcony ledges.",
        solution: "Effective pigeon barrier while maintaining open river breeze cross-ventilation.",
        specKey: "BIRD_SHIELD_SS316"
      },
      {
        id: "fire-escape",
        title: "1-MINUTE EMERGENCY FIRE EGRESS",
        problem: "Trapping iron window grates preventing quick terrace or ladder egress.",
        solution: "Rapid 60-second cutter severing for emergency family escape.",
        specKey: "1_MIN_SAFE_FIRE_EGRESS"
      },
      {
        id: "modern-luxury",
        title: "HERITAGE BRIDGE PANORAMA PRESERVATION",
        problem: "Ugly iron box cages destroying the iconic yellow Arch Bridge view.",
        solution: "Invisible stainless elegance preserving historic Godavari river sightlines.",
        specKey: "OPTICAL_LUXURY_316"
      }
    ],
    completedProjects: [
      {
        societyName: "Godavari Riverfront Enclave (Morampudi)",
        installationType: "SS-316 2.5mm Marine Grade",
        status: "Design Specification",
        floor: "12th-Floor Riverfront Balcony",
        note: "Continuous river humidity tested. Zero corrosion with 99% clear river sightline."
      },
      {
        societyName: "Sri Krishna Gated Society (Bommuru)",
        installationType: "SS-316 2.5mm Virgin Grade",
        status: "Design Specification",
        floor: "Duplex Terrace & Balcony",
        note: "Eliminated pigeon roosting and gives parents complete peace of mind."
      }
    ],
    contactSpecs: {
      phoneDial: "+916281620716",
      whatsappPreFill: "Hello D-View, I am interested in safe invisible grills for my Rajahmundry home. Please send information.",
      emergencySpec: "1_MIN_SAFE_FIRE_EGRESS"
    }
  },

  // ==========================================
  // STEP 3: VIJAYAWADA & AMARAVATI DATA INTEGRATION
  // ==========================================
  vijayawada: {
    cityId: "vijayawada",
    cityName: "Vijayawada & Amaravati",
    pillarRouting: "vijayawada",
    visualParams: {
      locationType: "riverfront",
      landmarkView: "Prakasam Barrage & Krishna Riverfront",
      brightnessEnforcement: "max_daylight_sunlit",
      textContrastRatio: "premium_emerald_silver",
    },
    pillars: [
      {
        id: "children-safety",
        title: "CHILDREN FALL PROTECTION",
        problem: "G+18 High-Rise Height Vertigo and Fall Anxiety.",
        solution: "Floor-to-ceiling tightly tensioned vertical cables.",
        specKey: "HIGH_TENSILE_SPEC"
      },
      {
        id: "pets-safety",
        title: "ZERO-GAP PET RESTRAINT",
        problem: "Curious household pets stepping out onto narrow exterior balcony ledges.",
        solution: "Precision 2-inch vertical spacing with zero horizontal footing to climb.",
        specKey: "PET_SAFE_2INCH"
      },
      {
        id: "old-age-safety",
        title: "HIGH-RISE VERTIGO ELIMINATION",
        problem: "Intense height dizziness for senior citizens in 15+ floor capital towers.",
        solution: "Rigid heavy-duty 6063-T6 aluminum track anchoring that absorbs lateral pressure.",
        specKey: "RIGID_ANCHOR_T6"
      },
      {
        id: "pigeons-safety",
        title: "KRISHNA RIVERBANK PIGEON EXCLUSION",
        problem: "River mist attracting aggressive bird nesting and dirty droppings on balconies.",
        solution: "Complete bird entry exclusion without blocking cool river cross-ventilation.",
        specKey: "BIRD_SHIELD_SS316"
      },
      {
        id: "fire-escape",
        title: "1-MINUTE EMERGENCY FIRE EGRESS",
        problem: "High-rise fire emergencies trapping residents behind immovable iron grates.",
        solution: "Manual egress cutter severance for emergency situations.",
        specKey: "1_MIN_SAFE_FIRE_EGRESS"
      },
      {
        id: "modern-luxury",
        title: "CAPITAL SKYLINE ARCHITECTURAL LUXURY",
        problem: "Heavy welded iron bars downgrading luxury apartment elevation aesthetics.",
        solution: "99% optical transparency matching Amaravati HappyNest modern architecture.",
        specKey: "OPTICAL_LUXURY_316"
      }
    ],
    completedProjects: [
      {
        societyName: "Amaravati HappyNest (Tower 3)",
        installationType: "SS-316 2.5mm Marine Grade",
        status: "Design Specification",
        floor: "16th-Floor High-Rise Unit",
        note: "Complies with fire safety norms with clean 60-second emergency cutter escape."
      },
      {
        societyName: "Tadepalli Riverside Residences",
        installationType: "SS-316 2.5mm Marine Grade",
        status: "Design Specification",
        floor: "10th-Floor Riverbank Flat",
        note: "Krishna river mist protection with strong corrosion resistance and open riverfront views."
      },
      {
        societyName: "Benz Circle Skyscraper Residences",
        installationType: "SS-316 3.0mm Heavy-Duty Grade",
        status: "Design Specification",
        floor: "15th-Floor Skyscraper Elevation",
        note: "High wind-load resistance with clear sightline to illuminated city avenues."
      }
    ],
    contactSpecs: {
      phoneDial: "+916281620716",
      whatsappPreFill: "Hello D-View, I am interested in safe invisible grills for my Amaravati flat. Please send information.",
      emergencySpec: "1_MIN_SAFE_FIRE_EGRESS"
    }
  },

  // ==========================================
  // STEP 4: GUNTUR DATA INTEGRATION
  // ==========================================
  guntur: {
    cityId: "guntur",
    cityName: "Guntur",
    pillarRouting: "guntur",
    visualParams: {
      locationType: "urban_ridge",
      landmarkView: "Kondaveedu Ridge & Brodipet Skyline",
      brightnessEnforcement: "max_daylight_sunlit",
      textContrastRatio: "premium_emerald_silver",
    },
    pillars: [
      {
        id: "children-safety",
        title: "CHILDREN FALL PROTECTION",
        problem: "High-wind gusts and elevation risks across Brodipet and Arundelpet apartments.",
        solution: "Heavy-duty multi-strand stainless steel cables engineered for high-tensile load capacity.",
        specKey: "HIGH_TENSILE_SPEC"
      },
      {
        id: "pets-safety",
        title: "PET SAFETY GRID",
        problem: "Pets slipping through balcony openings on windy upper floors.",
        solution: "Uniform 2-inch vertical cable spacing ensuring pet safety.",
        specKey: "PET_SAFE_2INCH"
      },
      {
        id: "old-age-safety",
        title: "SENIOR CITIZEN BALCONY SECURITY",
        problem: "Unsteady balcony railings in older apartment renovations.",
        solution: "Structural anchor tracks providing vibration-free, reassuring barrier.",
        specKey: "RIGID_ANCHOR_T6"
      },
      {
        id: "pigeons-safety",
        title: "ANTI-PIGEON MESH",
        problem: "Urban pigeon nesting and droppings on apartment AC ledges and balconies.",
        solution: "Clean vertical wire barrier blocking pigeons permanently.",
        specKey: "BIRD_SHIELD_SS316"
      },
      {
        id: "fire-escape",
        title: "1-MINUTE EMERGENCY FIRE EGRESS",
        problem: "Inflexible iron grates creating escape bottlenecks during building fires.",
        solution: "Emergency manual cutters sever cables cleanly in under 60 seconds.",
        specKey: "1_MIN_SAFE_FIRE_EGRESS"
      },
      {
        id: "modern-luxury",
        title: "CONTEMPORARY URBAN FACADE",
        problem: "Traditional iron cages making buildings look aged and prison-like.",
        solution: "Sleek stainless architectural wires preserving modern elevation aesthetics.",
        specKey: "OPTICAL_LUXURY_316"
      }
    ],
    completedProjects: [
      {
        societyName: "Brodipet Heights (Guntur)",
        installationType: "SS-316 2.5mm High-Tensile Grade",
        status: "Design Specification",
        floor: "14th-Floor Luxury Flat",
        note: "Withstands strong gusts from Kondaveedu hills with zero wire vibration."
      }
    ],
    contactSpecs: {
      phoneDial: "+916281620716",
      whatsappPreFill: "Hello D-View, I am interested in safe invisible grills for my Guntur balcony. Please send information.",
      emergencySpec: "1_MIN_SAFE_FIRE_EGRESS"
    }
  },

  // ==========================================
  // STEP 5: KAKINADA DATA INTEGRATION
  // ==========================================
  kakinada: {
    cityId: "kakinada",
    cityName: "Kakinada",
    pillarRouting: "kakinada",
    visualParams: {
      locationType: "flat_coastal_port",
      landmarkView: "Vakalapudi Lighthouse & Flat Coastal Horizon",
      brightnessEnforcement: "max_daylight_sunlit",
      textContrastRatio: "premium_emerald_silver",
    },
    pillars: [
      {
        id: "children-safety",
        title: "CHILDREN FALL PROTECTION",
        problem: "High-floor coastal apartment balconies exposing children to fall hazards.",
        solution: "Floor-to-ceiling high-tensile SS-316 cables.",
        specKey: "HIGH_TENSILE_SPEC"
      },
      {
        id: "pets-safety",
        title: "PET SAFELOCK MESH",
        problem: "Small pets sliding through balcony railing gaps toward open street.",
        solution: "2-inch precision spacing ensuring absolute containment.",
        specKey: "PET_SAFE_2INCH"
      },
      {
        id: "old-age-safety",
        title: "BALCONY STABILITY & COMFORT",
        problem: "Height insecurity and loose balustrade fear for seniors.",
        solution: "Solid aluminum tracks anchored into RCC ceiling and floor.",
        specKey: "RIGID_ANCHOR_T6"
      },
      {
        id: "pigeons-safety",
        title: "COASTAL BIRD EXCLUSION",
        problem: "Harbor sea gulls and pigeons nesting on open balconies.",
        solution: "Effective bird exclusion without impeding coastal coconut breezes.",
        specKey: "BIRD_SHIELD_SS316"
      },
      {
        id: "fire-escape",
        title: "1-MINUTE EMERGENCY FIRE EGRESS",
        problem: "Fixed iron cages blocking emergency egress routes.",
        solution: "Clean manual cable severing in under 60 seconds with emergency cutters.",
        specKey: "1_MIN_SAFE_FIRE_EGRESS"
      },
      {
        id: "modern-luxury",
        title: "FLAT COASTAL PANORAMA PRESERVATION",
        problem: "Cheap steel rusting into brown streaks across coastal facades.",
        solution: "Molybdenum-infused SS-316 with 5-year warranty protection.",
        specKey: "OPTICAL_LUXURY_316"
      }
    ],
    completedProjects: [
      {
        societyName: "Vakalapudi Port View Towers (Kakinada)",
        installationType: "SS-316 2.5mm Marine Grade",
        status: "Design Specification",
        floor: "11th-Floor Port Harbor Flat",
        note: "Full view of lighthouse and shipping vessels with lasting corrosion resistance."
      },
      {
        societyName: "Ramanayyapeta Elite Enclave (Kakinada)",
        installationType: "SS-316 2.5mm Marine Grade",
        status: "Design Specification",
        floor: "High-Rise Balconies",
        note: "Pigeon shield and open sky living with complete safety."
      }
    ],
    contactSpecs: {
      phoneDial: "+916281620716",
      whatsappPreFill: "Hello D-View, I am interested in safe invisible grills for my Kakinada home. Please send information.",
      emergencySpec: "1_MIN_SAFE_FIRE_EGRESS"
    }
  },

  // ==========================================
  // STEP 6: NELLORE DATA INTEGRATION
  // ==========================================
  nellore: {
    cityId: "nellore",
    cityName: "Nellore",
    pillarRouting: "nellore",
    visualParams: {
      locationType: "flat_riverbed",
      landmarkView: "Penna Riverfront Sunset Horizon",
      brightnessEnforcement: "max_daylight_sunlit",
      textContrastRatio: "premium_emerald_silver",
    },
    pillars: [
      {
        id: "children-safety",
        title: "CHILDREN FALL PROTECTION",
        problem: "High-rise balcony elevations posing toddler fall risks.",
        solution: "Multi-strand high-tensile break-resistant stainless cables.",
        specKey: "HIGH_TENSILE_SPEC"
      },
      {
        id: "pets-safety",
        title: "PAW-SAFE ARCHITECTURE",
        problem: "Cats and dogs slipping through lower railing bars.",
        solution: "2-inch vertical wires preventing paw or body passage.",
        specKey: "PET_SAFE_2INCH"
      },
      {
        id: "old-age-safety",
        title: "HEIGHT ANXIETY ELIMINATION",
        problem: "Vertigo and instability when looking down from high floors.",
        solution: "Reinforced ceiling-to-floor tension tracks providing firm support.",
        specKey: "RIGID_ANCHOR_T6"
      },
      {
        id: "pigeons-safety",
        title: "PIGEON AND PEST EXCLUSION",
        problem: "River mist and birds causing unhygienic balcony droppings.",
        solution: "Physical 2-inch safe spacing blocking birds completely.",
        specKey: "BIRD_SHIELD_SS316"
      },
      {
        id: "fire-escape",
        title: "1-MINUTE EMERGENCY FIRE EGRESS",
        problem: "Dangerous welded iron barriers preventing rapid fire rescue.",
        solution: "Cables severable within 60 seconds using wire cutters.",
        specKey: "1_MIN_SAFE_FIRE_EGRESS"
      },
      {
        id: "modern-luxury",
        title: "PENNA RIVERFRONT BREEZE & LUXURY",
        problem: "Heavy bars cutting off natural daylight and river breezes.",
        solution: "99% open airflow and crystal clarity across the balcony.",
        specKey: "OPTICAL_LUXURY_316"
      }
    ],
    completedProjects: [
      {
        societyName: "Magunta Layout Luxury Flats (Nellore)",
        installationType: "SS-316 2.5mm Marine Grade",
        status: "Design Specification",
        floor: "8th-Floor Riverfront View",
        note: "Penna river breeze stays unblocked while toddlers play safely."
      }
    ],
    contactSpecs: {
      phoneDial: "+916281620716",
      whatsappPreFill: "Hello D-View, I am interested in safe invisible grills for my Nellore apartment. Please send information.",
      emergencySpec: "1_MIN_SAFE_FIRE_EGRESS"
    }
  },

  // ==========================================
  // STEP 7: ONGOLE DATA INTEGRATION
  // ==========================================
  ongole: {
    cityId: "ongole",
    cityName: "Ongole",
    pillarRouting: "ongole",
    visualParams: {
      locationType: "inland_growth_corridor",
      landmarkView: "Kurnool Road Ridge & Bhagyanagar Skyline",
      brightnessEnforcement: "max_daylight_sunlit",
      textContrastRatio: "premium_emerald_silver",
    },
    pillars: [
      {
        id: "children-safety",
        title: "BHAGYANAGAR & LAWYERPET TODDLER FALL PREVENTION",
        problem: "Low balcony railings creating dangerous fall hazards in multi-floor apartments.",
        solution: "Floor-to-ceiling SS-316 vertical wire cables with strict 2-inch safe spacing.",
        specKey: "SS316_HIGH_TENSION"
      },
      {
        id: "old-age-safety",
        title: "HEIGHT ANXIETY & LEAN SUPPORT FOR SENIORS",
        problem: "Fear of heights and weak balcony barriers making elders fearful of outdoor relaxation.",
        solution: "Reinforced ceiling-to-floor tension tracks providing firm, reassuring support.",
        specKey: "RIGID_ANCHOR_T6"
      },
      {
        id: "pigeons-safety",
        title: "ZERO PIGEON NESTING & UNHYGIENIC DROPPINGS",
        problem: "Wild pigeons nesting on AC ledges and balconies along highway belts.",
        solution: "Precision 50mm vertical physical barrier preventing bird entry permanently.",
        specKey: "BIRD_SHIELD_SS316"
      },
      {
        id: "fire-escape",
        title: "1-MINUTE EMERGENCY RAPID FIRE ESCAPE",
        problem: "Welded iron window and balcony grilles forming inescapable fire hazards.",
        solution: "High-tensile cables quickly severable in emergencies with safety wire cutters.",
        specKey: "1_MIN_SAFE_FIRE_EGRESS"
      },
      {
        id: "modern-luxury",
        title: "UNBLOCKED CROSS-VENTILATION & SKYLINE",
        problem: "Heavy rusted bars cutting off natural sunlight and air circulation.",
        solution: "99% optical transparency preserving open vistas and cooling breezes.",
        specKey: "OPTICAL_LUXURY_316"
      }
    ],
    completedProjects: [
      {
        societyName: "Bhagyanagar Skyline Enclave (Ongole)",
        installationType: "SS-316 2.5mm Marine Grade",
        status: "Design Specification",
        floor: "9th-Floor Balcony",
        note: "Engineered toddler safety with uninterrupted open hill & city view."
      }
    ],
    contactSpecs: {
      phoneDial: "+916281620716",
      whatsappPreFill: "Hello D-View, I am interested in safe invisible grills for my Ongole apartment. Please send information.",
      emergencySpec: "1_MIN_SAFE_FIRE_EGRESS"
    }
  }
};

// Helper function to query safety grill data dynamically
export const getSafetyGrillData = (cityId?: string): CitySafetyGrillConfig => {
  if (!cityId) return safetyGrillData.vizag;
  const clean = cityId.toLowerCase().trim();
  if (clean.includes("amaravati") || clean.includes("vijayawada")) return safetyGrillData.vijayawada;
  if (clean.includes("rajahmundry") || clean.includes("rajamahendravaram")) return safetyGrillData.rajahmundry;
  if (clean.includes("vizag") || clean.includes("visakhapatnam")) return safetyGrillData.vizag;
  if (clean.includes("guntur")) return safetyGrillData.guntur;
  if (clean.includes("kakinada")) return safetyGrillData.kakinada;
  if (clean.includes("nellore")) return safetyGrillData.nellore;
  if (clean.includes("ongole")) return safetyGrillData.ongole;
  return safetyGrillData[clean] || safetyGrillData.vizag;
};

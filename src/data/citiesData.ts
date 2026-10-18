export interface CityConfig {
  id: string;
  name: string;
  tagline: string;
  subline: string;
  landmark: string;
  heroImage: string;
  localHeroImage?: string;
  keyAreas: string[];
  weatherAngle: string;
  district: string;
}

export const citiesData: CityConfig[] = [
  {
    id: "vizag",
    name: "Visakhapatnam",
    tagline: "Unblocked Vizag Views, Breathtaking & Secure",
    subline: "RK Beach to Kailasagiri - Experience ocean horizon vistas with zero safety compromise.",
    landmark: "RK Beach & Kailasagiri Hilltop View",
    heroImage: "/assets/locations/vizag-novotel-straight.jpg",
    localHeroImage: "/assets/locations/vizag-novotel-straight.jpg",
    keyAreas: ["Madhurawada (27-Floor High-Rises)", "Yendada", "Rushikonda", "PM Palem", "Anandapuram", "Pendurthi", "Gajuwaka"],
    weatherAngle: "Continuous marine damp humidity and coastal salt-spray will corrode normal steel within months. We exclusively install SS-316 Marine Grade wires with 10-Year Rust Warranty.",
    district: "Visakhapatnam"
  },
  {
    id: "rajahmundry",
    name: "Rajamahendravaram",
    tagline: "RIVERFRONT HERITAGE LIVING | BRIGHT & SUNLIT ELEVATIONS",
    subline: "SS-316 Invisible Grills with Unobstructed Godavari Arch Bridge Views.",
    landmark: "Godavari Arch Bridge & River Breeze",
    heroImage: "/assets/locations/rajahmundry-godavari-bridge.jpg",
    localHeroImage: "/assets/locations/rajahmundry-godavari-bridge.jpg",
    keyAreas: ["Morampudi", "Bommuru", "Diwancheruvu", "Lalacheruvu", "Vemagiri", "Gadaala Projects"],
    weatherAngle: "River humidity attracts high pigeon infestation. Our invisible mesh blocks pigeons 100% while allowing free cross-ventilation.",
    district: "East Godavari"
  },
  {
    id: "vijayawada",
    name: "Vijayawada & Amaravati",
    tagline: "Modern Living in Amaravati: Krishna River Horizons",
    subline: "Prakasam Barrage skyline security tailored for modern luxury high-rise towers.",
    landmark: "Prakasam Barrage & Krishna Riverfront",
    heroImage: "/assets/locations/vijayawada.jpg",
    localHeroImage: "/assets/locations/vijayawada.jpg",
    keyAreas: ["Benz Circle", "Moghalrajpuram", "Gunadala", "Kanuru", "Poranki", "Amaravati HappyNest (G+18 Towers)", "Tadepalli"],
    weatherAngle: "High summer temperatures and humidity require unhindered natural air circulation without compromising child safety.",
    district: "NTR / Guntur"
  },
  {
    id: "guntur",
    name: "Guntur",
    tagline: "ELEVATED INLAND RESIDENTIAL LIVING | Meticulous Fall Containment",
    subline: "SS-316 Invisible Safety Grills for Multi-Storey Balconies & Terraces across Guntur's premium high-rise corridors.",
    landmark: "Kondaveedu Fort Ridge & Guntur Urban Skyline",
    heroImage: "/assets/locations/guntur.jpg",
    localHeroImage: "/assets/locations/guntur.jpg",
    keyAreas: ["Brodipet", "Arundelpet", "Amaravati Road", "Namburu", "Kaza & Tadepalli Growth Corridor"],
    weatherAngle: "Dust and strong inland winds need low-maintenance, easy-to-clean SS-316 high-tension steel structures.",
    district: "Guntur"
  },
  {
    id: "kakinada",
    name: "Kakinada",
    tagline: "Kakinada's Coastal Charm & Marine-Grade SS-316 Safety",
    subline: "Vakalapudi Lighthouse and coastal palm vistas preserved with anti-corrosive engineering.",
    landmark: "Vakalapudi Lighthouse & Port Coastline",
    heroImage: "/assets/locations/kakinada.jpg",
    localHeroImage: "/assets/locations/kakinada.jpg",
    keyAreas: ["Sarpavaram", "Madhavapatnam", "Ramanayyapeta", "Vakalapudi", "Jagannaickpur"],
    weatherAngle: "High industrial & coastal salinity demands zero-rust SS-316 grade wiring designed for port towns.",
    district: "Kakinada"
  },
  {
    id: "nellore",
    name: "Nellore",
    tagline: "Tranquility & Trust: Nellore Barrage & Penna Riverfront",
    subline: "Elegantly framed sunset views with elder and pet safety security.",
    landmark: "Nellore Barrage & Penna River Horizon",
    heroImage: "/assets/locations/nellore.jpg",
    localHeroImage: "/assets/locations/nellore.jpg",
    keyAreas: ["Magunta Layout", "Balaji Nagar", "Dargamitta", "Vedayapalem", "Podalakur Road", "Kavali Road"],
    weatherAngle: "Riverbank dampness and seasonal storms require heavy anchoring and anti-sag wire tension.",
    district: "SPSR Nellore"
  },
  {
    id: "ongole",
    name: "Ongole",
    tagline: "Prakasam Pride: Bhagyanagar, Lawyerpet & Kurnool Road Skyline",
    subline: "100% Uncompromised safety and breezy open balconies across Ongole's thriving high-rise corridors.",
    landmark: "Kurnool Road Ridge & Chennakesava Swamy Panorama",
    heroImage: "/assets/locations/ongole.jpg",
    localHeroImage: "/assets/locations/ongole.jpg",
    keyAreas: ["Bhagyanagar", "Lawyerpet", "Kurnool Road Belt", "Santhapet", "Mangamuru Road", "Pellur Corridor", "Housing Board Colony"],
    weatherAngle: "Inland heat and sudden dust winds require SS-316 high-tension steel with anti-dust coating and zero rust guarantees.",
    district: "Prakasam"
  }
];

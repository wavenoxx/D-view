export interface EmotionalCard {
  id: number;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  image: string;
  tag: string;
}

export const emotionalCards: EmotionalCard[] = [
  {
    id: 1,
    title: "Children Fall Safety",
    subtitle: "Fear to Complete Freedom",
    problem: "Balcony height vertigo & fall anxiety",
    solution: "Engineered vertical high-tensile cables",
    image: "/images/penthouse-safety-balcony-9x16.jpg", // Ready asset
    tag: "Child Protection"
  },
  {
    id: 2,
    title: "Senior Citizens Peace",
    subtitle: "Open Morning Living Without Cages",
    problem: "Claustrophobic heavy iron bars",
    solution: "Fresh breeze & unblocked sunrise viewing",
    image: "/images/senior-living-morning-tea-balcony.jpg", // Ready asset
    tag: "Elder Comfort"
  },
  {
    id: 3,
    title: "Zero Pigeon Infestation",
    subtitle: "Hygienic Balcony Living",
    problem: "Unhygienic droppings & nesting mess",
    solution: "50mm precision gap stops pigeons permanently",
    image: "/images/kakinada-coastal-balcony-canal.jpg",
    tag: "Hygienic Living"
  },
  {
    id: 4,
    title: "99% Unblocked Air & Horizon",
    subtitle: "Breathe Pure Coastal Air",
    problem: "Dark, blocked, shadowy rooms",
    solution: "Marine-grade SS-316 transparency",
    image: "/images/vizag-penthouse-terrace-wide.jpg",
    tag: "Panoramic Freedom"
  }
];

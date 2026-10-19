import React, { useRef } from 'react';

const emotionalCards = [
  {
    id: 1,
    title: "Children Fall Safety",
    subtitle: "From Constant Fear to Complete Freedom",
    problem: "Fear of heights & balcony lockups",
    solution: "Child-safe vertical stainless tensioned cables",
    image: "/assets/cards/child-mother-safety.jpg",
    tag: "Child Protection"
  },
  {
    id: 2,
    title: "Senior Citizens Peace",
    subtitle: "No More Feeling Like an Iron Cage",
    problem: "Claustrophobic heavy rusted grates",
    solution: "Sunlit open balconies for peaceful morning tea",
    image: "/assets/cards/grandparents-luxury-balcony.jpg",
    tag: "Elder Comfort"
  },
  {
    id: 3,
    title: "Zero Pigeon Droppings",
    subtitle: "Say Goodbye to Balcony Dirt & Disease",
    problem: "Nasty bird droppings & contaminated spaces",
    solution: "50mm precision gap deters pigeons and birds",
    image: "/assets/cards/pigeon-free-hygiene.jpg",
    tag: "Hygienic Living"
  },
  {
    id: 4,
    title: "Open Air & Panoramic View",
    subtitle: "Unobstructed Daylight & Fresh Breeze",
    problem: "Dark, blocked, shadowy rooms",
    solution: "99% transparent stainless steel vertical wires",
    image: "/assets/cards/unblocked-air-view.jpg",
    tag: "Panoramic View"
  }
];

export const EmotionalCardSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full bg-[#031B15] py-8 px-4 text-white">
      <div className="max-w-7xl mx-auto mb-6 text-center">
        <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#028A0F]/20 text-[#3DED97] border border-[#028A0F]/50 font-bold">
          Why D-View Invisible Safety?
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold mt-2 text-white">
          Real Life Balcony <span className="text-[#3DED97]">Transformations</span>
        </h2>
        <p className="text-xs md:text-sm text-gray-300 mt-1">
          Slide horizontally to see how we protect your family, view, and hygiene.
        </p>
      </div>

      {/* Horizontal Swipe Card Carousel */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 pt-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {emotionalCards.map((card) => (
          <div 
            key={card.id}
            className="flex-shrink-0 w-[290px] md:w-[340px] snap-center rounded-2xl overflow-hidden bg-[#052920] border border-white/10 shadow-xl flex flex-col"
          >
            {/* 3D Visual Preview */}
            <div className="relative h-[380px] w-full overflow-hidden">
              <img 
                src={card.image} 
                alt={card.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-[#3DED97] border border-white/10">
                {card.tag}
              </span>
            </div>

            {/* Emotional Content */}
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-lg font-bold text-white">{card.title}</h3>
                <p className="text-xs text-[#3DED97] font-medium mb-3">{card.subtitle}</p>
                
                <div className="space-y-1.5 text-xs">
                  <div className="bg-red-950/40 p-2 rounded border border-red-500/20 text-red-200">
                    <span className="font-bold text-red-400">Before: </span>{card.problem}
                  </div>
                  <div className="bg-[#028A0F]/20 p-2 rounded border border-[#028A0F]/40 text-emerald-200">
                    <span className="font-bold text-[#3DED97]">After D-View: </span>{card.solution}
                  </div>
                </div>
              </div>

              <a 
                href="/contact"
                className="mt-4 w-full py-2 bg-[#028A0F] hover:bg-[#028A0F]/80 text-white rounded-lg text-xs font-bold transition text-center block"
              >
                Secure This For Your Home
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EmotionalCardSlider;

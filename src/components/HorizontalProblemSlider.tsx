import React, { useRef, useState, useEffect } from 'react';

export interface ShowcaseCard {
  id: number;
  type: 'problem' | 'solution';
  category: string;
  tag: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  bullet: string;
}

export const SHOWCASE_8_CARDS: ShowcaseCard[] = [
  // 1. Children Problem
  {
    id: 1,
    type: 'problem',
    category: 'CHILDREN SAFETY',
    tag: '01 • PROBLEM',
    badge: '⚠️ DANGER: ACCIDENTAL FALL RISK',
    title: 'Children Fall Hazard',
    subtitle: 'Low Railings & Unprotected Open Ledges',
    image: '/images/before-child-danger.jpg',
    description: 'Low open railings cause constant panic for parents. Toddlers can easily drag a chair or slip through wide gaps. One misstep can be fatal.',
    bullet: 'Parents keep balcony doors locked in permanent fear.',
  },
  // 2. Children Solution
  {
    id: 2,
    type: 'solution',
    category: 'CHILDREN SAFETY',
    tag: '02 • D-VIEW SOLUTION',
    badge: '🛡️ 100% TODDLER FALL PROTECTION',
    title: 'Children Freedom & Safety',
    subtitle: 'High-Tensile SS-316 @ 2" Safe Gap',
    image: '/images/after-child-safety.jpg',
    description: 'Floor-to-ceiling high-tensile SS-316 vertical wire cables with strict 2-inch safe spacing. Zero horizontal footholds to climb. Supports >400 kg load per strand.',
    bullet: 'Toddlers explore and play freely right at the edge without fear.',
  },

  // 3. Pigeon Problem
  {
    id: 3,
    type: 'problem',
    category: 'PIGEON MENACE',
    tag: '03 • PROBLEM',
    badge: '⚠️ UNHYGIENIC: DROPPINGS & BACTERIA',
    title: 'Wild Pigeon Infestation',
    subtitle: 'Foul Droppings, Mites & Feathers',
    image: '/images/before-pigeon-mess.jpg',
    description: 'Flocks of wild pigeons roost on open railings and AC outdoor units, leaving acidic droppings, feathers, and foul odor across floor tiles and balcony furniture.',
    bullet: 'Balcony becomes an unusable, dirty maintenance headache.',
  },
  // 4. Pigeon Solution
  {
    id: 4,
    type: 'solution',
    category: 'PIGEON MENACE',
    tag: '04 • D-VIEW SOLUTION',
    badge: '🛡️ 100% BIRD-FREE CLEAN HYGIENE',
    title: 'Zero Pigeon Menace',
    subtitle: 'Precision 50mm Structural Physical Barrier',
    image: '/images/after-pigeon-free.jpg',
    description: 'Precision 50mm vertical spacing physically prevents pigeons and birds from entering or nesting, without ugly dark nylon pigeon nets.',
    bullet: 'Spotless marble floors, fresh clean air, and pristine luxury living.',
  },

  // 5. View & Airflow Problem
  {
    id: 5,
    type: 'problem',
    category: 'VIEW & AIRFLOW',
    tag: '05 • PROBLEM',
    badge: '⚠️ HAZARD: BLOCKED BREEZE & FIRE TRAP',
    title: 'Traditional Heavy Iron Cage',
    subtitle: 'Blocks 40% Daylight & Deadly Fire Trap',
    image: '/images/before-height-anxiety.jpg',
    description: 'Heavy welded iron grilles block 40% of natural sunlight and fresh cross-ventilation. In sudden high-rise fire emergencies, iron cages trap families inside.',
    bullet: 'Claustrophobic prison-like feeling with blocked city panoramas.',
  },
  // 6. View & Airflow Solution
  {
    id: 6,
    type: 'solution',
    category: 'VIEW & AIRFLOW',
    tag: '06 • D-VIEW SOLUTION',
    badge: '🛡️ 99% AIRFLOW & 1-MIN FIRE ESCAPE',
    title: '100% Open Air & Fire Safety',
    subtitle: 'Unobstructed Panoramic Views',
    image: '/images/after-luxury-lounge.jpg',
    description: 'Ultra-slim vertical stainless steel cables preserve 99% optical transparency and river/coastal breeze. Fully severable in under 60 seconds with emergency cutters.',
    bullet: 'Pure sunlight, complete airflow, and certified life-saving fire egress.',
  },

  // 7. Old Age Problem
  {
    id: 7,
    type: 'problem',
    category: 'SENIOR CITIZENS',
    tag: '07 • PROBLEM',
    badge: '⚠️ ACROPHOBIA: FEAR OF HEIGHTS & VERTIGO',
    title: 'Senior Balcony Vertigo & Fear of Heights',
    subtitle: 'Dizziness at Balcony Edge & Fear of Falling',
    image: '/images/before-elder-height-vertigo.jpg',
    description: 'High-floor elevations trigger severe dizziness, vertigo, and acrophobia for elderly grandparents. Looking over low open railings induces constant anxiety, making seniors feel unsafe and terrified of losing balance.',
    bullet: 'Elders avoid the balcony completely, trapped indoors in fear of dangerous heights.',
  },
  // 8. Old Age Solution
  {
    id: 8,
    type: 'solution',
    category: 'SENIOR CITIZENS',
    tag: '08 • D-VIEW SOLUTION',
    badge: '🛡️ 100% PEACEFUL RETIREMENT & VERTIGO RELIEF',
    title: 'Senior Comfort & Fall Protection',
    subtitle: 'Floor-to-Ceiling SS-316 High-Tension Barrier',
    image: '/images/after-elderly-peace.jpg',
    description: 'Rigidly tensioned floor-to-ceiling SS-316 cables create a secure, transparent barrier that completely eliminates vertigo and fear of heights. Grandparents can safely lean, sit, sip morning tea, and read newspapers with total peace of mind.',
    bullet: 'Full psychological comfort & zero fall risk—grandparents enjoy fresh air without fear.',
  },

  // 9. Fire Emergency Trap Problem (MS Grills)
  {
    id: 9,
    type: 'problem',
    category: 'FIRE SAFETY & ESCAPE',
    tag: '09 • PROBLEM',
    badge: '🔥 CRITICAL: DEADLY MS GRILL FIRE TRAP',
    title: 'Overheated MS Iron Grill Fire Trap',
    subtitle: 'Welded Iron Cages Prevent Life-Saving Egress',
    image: '/images/before-ms-grill-fire-trap.jpg',
    description: 'When sudden fire erupts and apartment doors are blocked by smoke and flames, the balcony is the only escape route. Heavy welded MS iron grills become scorching hot and impossible to cut or break without industrial machinery, fatally trapping families inside.',
    bullet: 'Welded iron cages block emergency exits, turning high-rise balconies into fatal death traps.',
  },
  // 10. Fire Safety Solution (D-View)
  {
    id: 10,
    type: 'solution',
    category: 'FIRE SAFETY & ESCAPE',
    tag: '10 • D-VIEW SOLUTION',
    badge: '🧯 60-SEC EMERGENCY LIFE-SAVING EGRESS',
    title: '60-Second Fire Escape System',
    subtitle: 'Instant Cable-Cut & Fire Brigade Ladder Evacuation',
    image: '/images/after-dview-fire-escape.jpg',
    description: 'Unlike impenetrable welded iron cages, D-View SS-316 high-tension cables provide 400kg fall security daily, yet can be cleanly severed in under 60 seconds with emergency cutters. Fire brigade turntable ladders can easily reach and rescue families.',
    bullet: 'Life-saving emergency balcony evacuation with certified quick-cut cable technology.',
  },

  // 11. Pet Safety Problem
  {
    id: 11,
    type: 'problem',
    category: 'PET SAFETY & FREEDOM',
    tag: '11 • PROBLEM',
    badge: '⚠️ DANGER: ACCIDENTAL PET FALL HAZARD',
    title: 'Pet Balcony Fall Anxiety',
    subtitle: 'Curious Cats & Dogs at Risk on Open Balconies',
    image: '/images/before-pet-danger.jpg',
    description: 'High-rise open balconies with low railings terrify pet owners. Curious cats and energetic dogs can easily slip through railings or leap after birds. Pet parents live in constant stress, restricting pets indoors and keeping balcony doors locked in fear.',
    bullet: 'Pets confined indoors; owners constantly panicked about tragic high-altitude falls.',
  },
  // 12. Pet Safety Solution
  {
    id: 12,
    type: 'solution',
    category: 'PET SAFETY & FREEDOM',
    tag: '12 • D-VIEW SOLUTION',
    badge: '🐾 100% SECURE PET FREEDOM & RELAXATION',
    title: 'Safe Pet Balcony Living',
    subtitle: 'Relaxed Sunbathing & Unrestricted Peace of Mind',
    image: '/images/after-pet-freedom.jpg',
    description: 'Floor-to-ceiling SS-316 high-tension vertical cables with precision 50mm safe spacing ensure cats cannot slip out and dogs cannot jump over. Pet parents can enjoy morning tea and panoramic views while their furry friends bask safely in the fresh breeze.',
    bullet: 'Zero fall risk, total freedom for pets, and complete peace of mind for owners.',
  },
];

interface HorizontalProblemSliderProps {
  cityName?: string;
}

export const HorizontalProblemSlider: React.FC<HorizontalProblemSliderProps> = ({
  cityName = 'Andhra Pradesh',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Smooth 400ms transition with snappy easeOut curve
  const smoothScrollTo = (targetLeft: number, duration: number = 400) => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const startLeft = el.scrollLeft;
    const distance = targetLeft - startLeft;
    const startTime = performance.now();

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth ease-out cubic curve (duration: 400ms)
      const ease = 1 - Math.pow(1 - progress, 3);
      el.scrollLeft = startLeft + distance * ease;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  // Strict rules 2 & 3:
  // - 1000ms autoplay interval (maximum 1 second delay)
  // - 400ms smooth transition speed
  // - Infinite loop (loop: true)
  // - disableOnInteraction: false and pauseOnMouseEnter: false
  // - Clean cleanup on unmount
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const el = scrollRef.current;
        const cardEl = el.firstElementChild as HTMLElement | null;
        const cardWidth = cardEl?.clientWidth || 310;
        const gap = 24; // gap-5 sm:gap-6
        const step = cardWidth + gap;
        const singleSetWidth = step * SHOWCASE_8_CARDS.length;

        // Infinite loop (loop: true): reset scrollLeft silently by 1 set without visual jump
        if (el.scrollLeft >= singleSetWidth) {
          el.scrollLeft -= singleSetWidth;
        }

        smoothScrollTo(el.scrollLeft + step, 400);
      }
    }, 1000); // Strict rule 2: maximum 1 second delay (1000ms)

    return () => {
      clearInterval(interval);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Triple set of cards for seamless infinite forward looping (loop: true)
  const infiniteCards = [...SHOWCASE_8_CARDS, ...SHOWCASE_8_CARDS, ...SHOWCASE_8_CARDS];

  return (
    <section className="w-full bg-slate-50 py-14 px-4 sm:px-6 lg:px-8 text-slate-900 border-y border-slate-200 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-[#16A34A] text-xs font-bold tracking-widest uppercase mb-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
              Why Choose Invisible Grills?
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Install Invisible Grills? <span className="text-[#16A34A]">One Single Installation, Every Problem Solved.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              A single modern installation solves all your major balcony challenges at once — guaranteeing 100% toddler safety, eliminating pigeon mess, preventing iron rust, and giving you crystal-clear open views without that caged feeling.
            </p>
          </div>
        </div>

        {/* 12 Horizontal Cards Container with Fast 60fps Auto-Sliding: 1000ms autoplay, 400ms transition, loop: true */}
        <div
          ref={scrollRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 pt-1 no-scrollbar cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {infiniteCards.map((card, idx) => {
            const isProblem = card.type === 'problem';

            return (
              <div
                key={`${card.id}-${idx}`}
                className={`w-[260px] sm:w-[290px] md:w-[310px] shrink-0 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 bg-white ${
                  isProblem
                    ? 'border border-rose-200 hover:border-rose-400 hover:shadow-lg'
                    : 'border border-emerald-200 hover:border-emerald-400 hover:shadow-lg'
                }`}
              >
                {/* Visual Area with Image - Reduced Compact Height */}
                <div className="relative h-[210px] sm:h-[230px] w-full overflow-hidden bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none"
                  />

                  {/* Top Tag */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-md border shadow-sm ${
                        isProblem
                          ? 'bg-white/95 text-rose-700 border-rose-200'
                          : 'bg-white/95 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {card.tag}
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider shadow-sm ${
                        isProblem
                          ? 'bg-rose-600 text-white'
                          : 'bg-emerald-600 text-white font-bold'
                      }`}
                    >
                      {isProblem ? 'PROBLEM' : 'SOLUTION'}
                    </span>
                  </div>

                  {/* Bottom Image Floating Badge */}
                  <div className="absolute bottom-2 left-2 right-2 z-10">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold backdrop-blur-md border shadow-sm truncate max-w-full ${
                        isProblem
                          ? 'bg-rose-950/90 text-rose-100 border-rose-400/40'
                          : 'bg-emerald-950/90 text-emerald-100 border-emerald-400/40'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          isProblem ? 'bg-rose-400 animate-pulse' : 'bg-emerald-400'
                        }`}
                      />
                      <span className="truncate">{card.badge}</span>
                    </span>
                  </div>
                </div>

                {/* Content Area - Compact Main Text Only */}
                <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-grow text-left bg-white">
                  <div>
                    <span
                      className={`text-[9px] font-extrabold uppercase tracking-widest block mb-0.5 ${
                        isProblem ? 'text-rose-600' : 'text-[#16A34A]'
                      }`}
                    >
                      {card.category}
                    </span>
                    <h3
                      className={`text-base font-black tracking-tight leading-snug transition-colors ${
                        isProblem
                          ? 'text-slate-900 group-hover:text-rose-600'
                          : 'text-slate-900 group-hover:text-[#16A34A]'
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 font-medium mt-1 leading-snug">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Bottom Action CTA */}
                  <a
                    href={`/contact?reason=${encodeURIComponent(card.category)}`}
                    className={`mt-3 w-full py-2 rounded-xl text-[11px] font-bold transition-all duration-300 text-center block shadow-sm cursor-pointer ${
                      isProblem
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-[#16A34A] hover:bg-emerald-700 text-white'
                    }`}
                  >
                    {isProblem ? `Solve in ${cityName} →` : `Protect in ${cityName} →`}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="text-center mt-4">
          <span className="text-xs text-slate-500 font-medium inline-flex items-center gap-2">
            <span>⇄</span> Scroll horizontally to see all 12 problems & solutions
          </span>
        </div>
      </div>
    </section>
  );
};

export default HorizontalProblemSlider;

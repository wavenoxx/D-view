import React, { useRef, useState, useEffect } from 'react';
import OptimizedGrillImage, { prefetchGrillImages } from './OptimizedGrillImage';

const emotionalCards = [
  {
    id: 1,
    title: "Children Fall Safety",
    subtitle: "From Constant Fear to Complete Freedom",
    problem: "Fear of heights & balcony lockups",
    solution: "100% child-safe vertical SS-316 tensioned cables",
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
    solution: "50mm precision gap stops pigeons permanently",
    image: "/assets/cards/pigeon-free-hygiene.jpg",
    tag: "Hygienic Living"
  },
  {
    id: 4,
    title: "100% Open Air & View",
    subtitle: "Unobstructed Daylight & Fresh Breeze",
    problem: "Dark, blocked, shadowy rooms",
    solution: "99% transparent marine-grade vertical wires",
    image: "/assets/cards/unblocked-air-view.jpg",
    tag: "Panoramic View"
  }
];

export const EmotionalCardSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Eagerly pre-fetch activeIndex + 1 and activeIndex + 2 images
  useEffect(() => {
    const next1 = (activeSlideIndex + 1) % emotionalCards.length;
    const next2 = (activeSlideIndex + 2) % emotionalCards.length;
    prefetchGrillImages([
      emotionalCards[next1]?.image,
      emotionalCards[next2]?.image,
    ]);
  }, [activeSlideIndex]);

  // Smooth cubic-bezier(0.25, 1, 0.5, 1) easing curve (duration: 450ms)
  const cubicBezierEase = (t: number): number => {
    const u = 1 - t;
    return 3 * u * u * t * 1 + 3 * u * t * t * 1 + t * t * t;
  };

  const smoothScrollTo = (targetLeft: number, duration: number = 450) => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const startLeft = el.scrollLeft;
    const distance = targetLeft - startLeft;
    const startTime = performance.now();

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = cubicBezierEase(progress);
      el.scrollLeft = startLeft + distance * ease;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  // Strict rules 1-5: Autoplay with 1000ms delay, 450ms cubic-bezier transition,
  // infinite loop (loop: true), disableOnInteraction: false, pauseOnMouseEnter: false,
  // and clean cleanup on unmount.
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % emotionalCards.length);

      if (scrollRef.current) {
        const el = scrollRef.current;
        const cardWidth = el.firstElementChild?.clientWidth || 290;
        const step = cardWidth + 16; // card width + gap
        const singleSetWidth = step * emotionalCards.length;

        // Infinite loop: seamless reset without visual jump
        if (el.scrollLeft >= singleSetWidth) {
          el.scrollLeft -= singleSetWidth;
        }

        smoothScrollTo(el.scrollLeft + step, 450);
      }
    }, 1000); // 1000ms delay between slides

    return () => {
      clearInterval(interval);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const infiniteCards = [...emotionalCards, ...emotionalCards, ...emotionalCards];

  return (
    <section className="w-full bg-[#031B15] py-8 px-4 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto mb-6 text-center">
        <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#028A0F]/20 text-[#3DED97] border border-[#028A0F]/50 font-bold">
          Why D-View Invisible Safety?
        </span>
        <h2 className="text-fluid-h1 font-extrabold mt-2 text-white">
          Real Life Balcony <span className="text-[#3DED97]">Transformations</span>
        </h2>
        <p className="text-xs md:text-sm text-gray-300 mt-1">
          Slide horizontally to see how we protect your family, view, and hygiene.
        </p>
      </div>

      {/* Responsive Horizontal Swipe Card Carousel: 1.15 on Mobile (<640px), 2.2 on Tablet (640-1024px), 3-4 on Desktop (>1024px) */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 pt-1 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {infiniteCards.map((card, idx) => (
          <div 
            key={`${card.id}-${idx}`}
            className="flex-shrink-0 w-[calc((100vw-3rem)/1.15)] sm:w-[calc((100%-1.5rem)/2.2)] lg:w-[calc((100%-3rem)/3.2)] xl:w-[calc((100%-4.5rem)/4)] max-w-[340px] snap-center rounded-2xl overflow-hidden bg-[#052920] border border-white/10 shadow-xl flex flex-col gpu-accel"
          >
            {/* 3D Visual Preview with 3:4 Aspect Ratio and OptimizedGrillImage */}
            <div className="relative aspect-[3/4] sm:h-[380px] w-full overflow-hidden">
              <OptimizedGrillImage
                src={card.image}
                alt={card.title}
                aspectRatio="3/4"
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 340px"
                className="w-full h-full"
                imageClassName="hover:scale-105 transition-transform duration-500"
                width={480}
                height={640}
                loading="lazy"
                sharpen={true}
              />
              <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-[#3DED97] border border-white/10 z-10">
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

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Play, 
  Pause,
  Compass
} from 'lucide-react';
import { citiesData, type CityConfig } from '../data/citiesData';
import OptimizedGrillImage, { prefetchGrillImages } from './OptimizedGrillImage';

export default function LuxuryCitySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const currentCity = citiesData[currentIndex];

// Strict rule 1: Autoplay enabled with 1000ms delay between slides
  // Strict rule 3: Infinite loop (loop: true)
  // Strict rule 4: disableOnInteraction: false and pauseOnMouseEnter: false
  // Strict rule 5: Clean cleanup of intervals on component unmount
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % citiesData.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Eagerly prefetch activeIndex + 1 and activeIndex + 2 slides in background
  useEffect(() => {
    const next1 = (currentIndex + 1) % citiesData.length;
    const next2 = (currentIndex + 2) % citiesData.length;
    prefetchGrillImages([
      citiesData[next1]?.localHeroImage || citiesData[next1]?.heroImage,
      citiesData[next2]?.localHeroImage || citiesData[next2]?.heroImage,
    ]);
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % citiesData.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + citiesData.length) % citiesData.length);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch Swipe (disableOnInteraction: false - swipe does not permanently kill auto-sliding timer)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) goToNext();
    if (diff < -50) goToPrev();
    touchStartX.current = null;
  };

  const getCityUrl = (city: CityConfig) => {
    if (city.id === 'vizag') return '/locations/vizag';
    if (city.id === 'vijayawada') return '/locations/vijayawada-amaravati';
    return `/locations/${city.id}`;
  };

  return (
    <section 
      className="relative w-full h-screen min-h-[680px] bg-[#0B0D0C] overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images with 450ms smooth cubic-bezier Cross-fade Transition */}
      {citiesData.map((city, index) => {
        const isActive = index === currentIndex;
        const imgPath = city.localHeroImage || city.heroImage;
        return (
          <div
            key={city.id}
            className={`absolute inset-0 gpu-accel ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            style={{
              transition: 'opacity 450ms cubic-bezier(0.25, 1, 0.5, 1)',
              willChange: 'opacity'
            }}
          >
            <OptimizedGrillImage
              src={city.localHeroImage || city.heroImage}
              alt={city.name}
              priority={index === 0}
              sizes="100vw"
              width={1920}
              height={1080}
              className="w-full h-full"
              imageClassName={isActive ? 'scale-105' : 'scale-100'}
              style={{
                transition: 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1)',
                willChange: 'transform'
              }}
            />
            {/* Invisprotect-inspired architectural gradient masks */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D0C]/95 via-[#0B0D0C]/65 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0C] via-transparent to-[#0B0D0C]/50"></div>
          </div>
        );
      })}

      {/* Main Slide Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between pt-28 pb-12 sm:pb-16">
        
        {/* Top Tagline / Category Indicator */}
        <div className="flex items-center justify-between">
          <a 
            href={getCityUrl(currentCity)}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#121816]/90 border border-[#7CFF3A]/50 hover:border-[#7CFF3A] backdrop-blur-md shadow-[0_0_20px_rgba(124,255,58,0.2)] transition-all hover:scale-105"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#7CFF3A] animate-ping"></span>
            <span className="text-xs font-black uppercase tracking-widest text-[#7CFF3A]">
              D-VIEW LUXURY • {currentCity.name.toUpperCase()} HUB
            </span>
          </a>

          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#94A3B8] bg-[#121816]/80 px-3 py-1.5 rounded-full border border-[#24322B] backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-[#7CFF3A]" />
            <span>Landmark: <strong className="text-white">{currentCity.landmark}</strong></span>
          </div>
        </div>

        {/* Center Headline & Subline */}
        <div className="max-w-3xl my-auto space-y-6">
          
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#7CFF3A] block">
              Architectural Invisible Grills & Balcony Safety
            </span>
            <a href={getCityUrl(currentCity)} className="group block focus:outline-none">
              <h1 className="text-fluid-hero font-black text-white group-hover:text-[#7CFF3A] transition-colors tracking-tight leading-[1.08] text-shadow">
                {currentCity.tagline.split(':')[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7CFF3A] via-[#A6FF7A] to-white group-hover:from-white group-hover:to-[#7CFF3A]">
                  {currentCity.name.toUpperCase()}
                </span>
              </h1>
            </a>
          </div>

          <p className="text-base sm:text-xl text-[#E2E8F0] font-normal leading-relaxed max-w-2xl">
            {currentCity.subline}
          </p>

          {/* Key Areas Pill Ribbon */}
          <div className="pt-1">
            <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-2">
              High-Rise & Villa Corridors Covered:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentCity.keyAreas.slice(0, 5).map((area, idx) => (
                <span key={idx} className="text-xs bg-[#121816]/90 text-[#C7CDD1] px-3 py-1 rounded-lg border border-[#24322B] backdrop-blur-sm">
                  {area}
                </span>
              ))}
              {currentCity.keyAreas.length > 5 && (
                <span className="text-xs bg-[#151C19] text-[#7CFF3A] px-2.5 py-1 rounded-lg border border-[#7CFF3A]/30 font-semibold">
                  +{currentCity.keyAreas.length - 5} more
                </span>
              )}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={getCityUrl(currentCity)}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm sm:text-base font-extrabold text-[#0B0D0C] bg-[#7CFF3A] hover:bg-[#8FFF52] transition-all duration-200 shadow-[0_0_30px_rgba(124,255,58,0.35)] hover:shadow-[0_0_40px_rgba(124,255,58,0.55)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore {currentCity.name} Balcony View & Services</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="/contact#book-visit"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-[#151C19]/80 hover:bg-[#1A2420] border border-[#24322B] hover:border-[#7CFF3A]/60 backdrop-blur-md transition-all"
            >
              <span>BOOK FREE SITE VISIT</span>
            </a>
          </div>

        </div>

        {/* Bottom Navigation & City Switcher Thumbnails */}
        <div className="pt-6 border-t border-[#24322B]/80 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Slide Progress (01 / 06) and Arrows */}
          <div className="flex items-center gap-4">
            <div className="text-xs font-black tracking-widest text-[#94A3B8]">
              <span className="text-white text-sm">0{currentIndex + 1}</span> / 0{citiesData.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Previous City"
                className="w-10 h-10 rounded-full bg-[#121816]/90 border border-[#24322B] hover:border-[#7CFF3A] text-white hover:text-[#7CFF3A] flex items-center justify-center transition-colors shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="Next City"
                className="w-10 h-10 rounded-full bg-[#121816]/90 border border-[#24322B] hover:border-[#7CFF3A] text-white hover:text-[#7CFF3A] flex items-center justify-center transition-colors shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive City Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-none">
            {citiesData.map((city, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      window.location.href = getCityUrl(city);
                    } else {
                      setCurrentIndex(idx);
                    }
                  }}
                  title={isSelected ? `Open ${city.name} landing page` : `View ${city.name}`}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#7CFF3A] text-[#0B0D0C] border-[#7CFF3A] shadow-[0_0_15px_rgba(124,255,58,0.4)] scale-105'
                      : 'bg-[#121816]/80 text-[#C7CDD1] border-[#24322B] hover:border-[#384C42] hover:text-white backdrop-blur-md'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#0B0D0C]' : 'bg-[#7CFF3A]'}`}></span>
                  <span>{city.name}</span>
                  {isSelected && <span className="text-[10px] ml-0.5 opacity-80">↗</span>}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

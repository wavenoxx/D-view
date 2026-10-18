import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ChevronDown, 
  Menu, 
  X, 
  PhoneCall, 
  ArrowRight,
  Grid3X3,
  HelpCircle,
  FolderKanban,
  MapPin
} from 'lucide-react';
import { ALL_LOCATIONS } from '../data/locations';

interface NavbarProps {
  currentSlug?: string;
}

export default function Navbar({ currentSlug }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const activeLocation = ALL_LOCATIONS.find(loc => loc.slug === currentSlug);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md py-3' 
          : 'bg-white/85 backdrop-blur-sm border-b border-slate-200/60 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Prominently Highlighted Slogan */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3 group">
              <img 
                src="/images/d-view-logo-horizontal.png" 
                alt="D-VIEW Invisible Grills & Safety Solutions" 
                className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
              {/* Highlighted Slogan Badge in Header */}
              <div className="hidden lg:flex items-center pl-3 border-l-2 border-emerald-500/40">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-[10px] xl:text-[11px] font-black uppercase tracking-wider text-[#16A34A] shadow-sm">
                  <span className="text-[#16A34A] font-extrabold">—</span>
                  <span className="text-slate-900 font-extrabold tracking-[0.14em]">INVISIBLE GRILLS & SAFETY SOLUTIONS</span>
                  <span className="text-[#16A34A] font-extrabold">—</span>
                </span>
              </div>
            </a>

            {/* City Selector Pill */}
            <div className="relative hidden xl:block ml-2">
              <button
                type="button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                onBlur={() => setTimeout(() => setCityDropdownOpen(false), 200)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-50 border border-slate-200 hover:border-[#16A34A] text-slate-700 hover:text-slate-900 transition-all"
              >
                <MapPin className="w-3 h-3 text-[#16A34A]" />
                <span>{activeLocation ? activeLocation.name : 'Select City'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {cityDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 w-64 rounded-xl bg-white border border-slate-200 shadow-2xl p-2 z-50 animate-in fade-in backdrop-blur-xl">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    7 Andhra Pradesh Hubs
                  </div>
                  <div className="mt-1 space-y-1">
                    {ALL_LOCATIONS.map((loc) => {
                      const canonicalSlug = loc.slug === 'vijayawada-amaravati' ? 'vijayawada' : loc.slug;
                      return (
                      <a
                        key={loc.slug}
                        href={`/${canonicalSlug}`}
                        className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-emerald-50 hover:text-[#16A34A] transition-all"
                      >
                        <span>{loc.name}</span>
                        <span className="text-[10px] text-slate-400">{loc.district}</span>
                      </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2">
            
            {/* 1. Solutions (Dropdown) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                onBlur={() => setTimeout(() => setSolutionsDropdownOpen(false), 200)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                aria-expanded={solutionsDropdownOpen}
              >
                <Grid3X3 className="w-4 h-4 text-[#16A34A]" />
                <span>Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {solutionsDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 w-64 rounded-xl bg-white border border-slate-200 shadow-2xl p-2 z-50 animate-in fade-in backdrop-blur-xl">
                  <a
                    href="/solutions#services"
                    onClick={() => setSolutionsDropdownOpen(false)}
                    className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-slate-50 text-left transition-all group"
                  >
                    <span className="text-sm font-bold text-slate-900 group-hover:text-[#16A34A]">
                      Balcony SS-316 Grills
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Full-height luxury invisible grills for high-rises
                    </span>
                  </a>
                  <a
                    href="/solutions#services"
                    onClick={() => setSolutionsDropdownOpen(false)}
                    className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-slate-50 text-left transition-all group"
                  >
                    <span className="text-sm font-bold text-slate-900 group-hover:text-[#16A34A]">
                      Window Grills
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Corrosion-resistant slim cables for open window ventilation
                    </span>
                  </a>
                  <a
                    href="/solutions#services"
                    onClick={() => setSolutionsDropdownOpen(false)}
                    className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-slate-50 text-left transition-all group"
                  >
                    <span className="text-sm font-bold text-slate-900 group-hover:text-[#16A34A]">
                      High-Rise Elevation Grills
                    </span>
                    <span className="text-[11px] text-slate-500">
                      High-tensile tensioned stainless steel elevation grills
                    </span>
                  </a>
                </div>
              )}
            </div>

            {/* 2. Service Areas */}
            <a 
              href="/locations" 
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
            >
              <MapPin className="w-4 h-4 text-[#16A34A]" />
              <span>Service Areas</span>
            </a>

            {/* 3. Projects */}
            <a 
              href="/projects" 
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
            >
              <FolderKanban className="w-4 h-4 text-[#16A34A]" />
              <span>Projects</span>
            </a>

            {/* 4. About */}
            <a 
              href="/about" 
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              <span>About</span>
            </a>

            {/* 5. Direct Call */}
            <a
              href="tel:+916281620716"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-900 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-all ml-1"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>+91 62816 20716</span>
            </a>

          </nav>

          {/* Right CTA Button: Emerald Green Button -> 'Book Free Site Visit ->' */}
          <div className="hidden lg:flex items-center">
            <a
              href="/contact#book-visit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-extrabold text-slate-950 bg-[#7CFF3A] hover:bg-[#68e028] transition-all duration-200 shadow-[0_4px_16px_rgba(124,255,58,0.35)] hover:shadow-[0_6px_22px_rgba(124,255,58,0.5)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Book Free Site Visit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <a
              href="tel:+916281620716"
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[#16A34A]"
              aria-label="Call D-VIEW Helpline +91 62816 20716"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
            <a
              href="/contact#book-visit"
              className="hidden min-[380px]:inline-flex px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-[#7CFF3A]"
            >
              Free Visit
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 hover:text-[#16A34A] cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="region"
          aria-label="Mobile Navigation Drawer"
          className="lg:hidden bg-white/98 border-b border-slate-200 px-4 pt-4 pb-6 space-y-4 backdrop-blur-2xl shadow-xl"
        >
          
          {/* City Selection in Mobile Drawer */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Select City Hub</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {ALL_LOCATIONS.map((loc) => {
                const isActive = loc.slug === currentSlug;
                const canonicalSlug = loc.slug === 'vijayawada-amaravati' ? 'vijayawada' : loc.slug;
                return (
                  <a
                    key={loc.slug}
                    href={`/${canonicalSlug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left truncate transition-colors ${
                      isActive
                        ? 'bg-[#7CFF3A] text-slate-950 font-bold'
                        : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    {loc.name}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Strict Nav Links */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Solutions
            </div>
            <a
              href="/solutions#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#16A34A]"
            >
              • Balcony SS-316 Grills
            </a>
            <a
              href="/solutions#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#16A34A]"
            >
              • Window Grills
            </a>
            <a
              href="/solutions#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#16A34A]"
            >
              • High-Rise Elevation Grills
            </a>

            <div className="pt-2 border-t border-slate-200"></div>

            <a
              href="/locations"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#16A34A]"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#16A34A]" />
                Service Areas (7 Hubs)
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>

            <a
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#16A34A]"
            >
              <span className="flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-[#16A34A]" />
                Projects
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>

            <a
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#16A34A]"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                About
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Action CTA */}
          <div className="pt-2 border-t border-slate-200 space-y-2">
            <a
              href="/contact#book-visit"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#7CFF3A] text-slate-950 font-extrabold text-sm shadow-md"
            >
              <span>Book Free Site Visit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+916281620716"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-semibold"
            >
              <PhoneCall className="w-4 h-4 text-[#16A34A]" />
              <span>Call Direct: +91 62816 20716</span>
            </a>
          </div>

        </div>
      )}
    </header>
  );
}

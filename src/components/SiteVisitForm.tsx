import React, { useEffect, useState } from 'react';
import { 
  Check, 
  ChevronDown, 
  ArrowRight, 
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Minus
} from 'lucide-react';
import { ALL_LOCATIONS } from '../data/locations';

interface SiteVisitFormProps {
  defaultCitySlug?: string;
  cityName?: string;
}

const CITY_QUERY_ALIASES: Record<string, string> = {
  vizag: 'visakhapatnam',
  visakhapatnam: 'visakhapatnam',
  rajahmundry: 'rajahmundry',
  rajamahendravaram: 'rajahmundry',
  vijayawada: 'vijayawada-amaravati',
  amaravati: 'vijayawada-amaravati',
  'vijayawada-amaravati': 'vijayawada-amaravati',
  guntur: 'guntur',
  kakinada: 'kakinada',
  nellore: 'nellore',
  ongole: 'ongole',
};

const ALLOWED_REASON_LABELS: Record<string, string> = {
  'children safety': 'Children Safety & Fall Protection',
  'pigeon menace': 'Pigeon & Bird Barrier Protection',
  'view & airflow': 'Unobstructed View & Natural Airflow',
  'senior citizens': 'Senior Citizen Balcony Vertigo & Fall Safety',
  'fire safety & escape': '60-Second Emergency Fire Escape Compliance',
  'pet safety & freedom': 'Pet Balcony Safety & Containment',
};

const ALLOWED_REQUIREMENT_IDS = [
  'BALCONY',
  'WINDOWS',
  'STAIRCASE / DUPLEX',
  'FULL FLAT / VILLA',
] as const;

export default function SiteVisitForm({ defaultCitySlug = 'rajahmundry', cityName = 'Rajahmundry' }: SiteVisitFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(defaultCitySlug);
  const [area, setArea] = useState('');
  const [customArea, setCustomArea] = useState('');
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>(['BALCONY']);
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState('');
  const [connectGoogle, setConnectGoogle] = useState(false);
  const [consentAgreed, setConsentAgreed] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);

    const requestedCity = params.get('city')?.trim().toLowerCase();
    if (requestedCity) {
      const resolvedCity = CITY_QUERY_ALIASES[requestedCity] || requestedCity;
      if (ALL_LOCATIONS.some((loc) => loc.slug === resolvedCity)) {
        setCity(resolvedCity);
        setArea('');
        setCustomArea('');
      }
    }

    const requestedReason = params.get('reason')?.trim().toLowerCase();
    if (requestedReason) {
      const mappedReason = ALLOWED_REASON_LABELS[requestedReason];
      if (mappedReason) {
        setShowNote(true);
        setNote(`Enquiry focus: ${mappedReason}`);
      } else {
        const upperReason = requestedReason.toUpperCase();
        if ((ALLOWED_REQUIREMENT_IDS as readonly string[]).includes(upperReason)) {
          setSelectedRequirements((prev) =>
            prev.includes(upperReason) ? prev : [...prev, upperReason]
          );
        }
      }
    }
  }, []);

  const activeCity = ALL_LOCATIONS.find(c => c.slug === city) || ALL_LOCATIONS[0];
  const cityAreas = activeCity.areas || [];

  const toggleRequirement = (req: string) => {
    if (selectedRequirements.includes(req)) {
      setSelectedRequirements(selectedRequirements.filter(r => r !== req));
    } else {
      setSelectedRequirements([...selectedRequirements, req]);
    }
  };

  const finalArea = area === 'other' ? (customArea || 'Custom Locality') : (area || 'Not specified');

  const buildWhatsAppUrl = () => {
    const text = `Hello D-view invisible grills, I am interested in invisible safety grills for my balcony. Please share details.
• Name: ${name || 'Customer'}
• Mobile: +91 ${phone || ''}
• City: ${activeCity.name}
• Area: ${finalArea}
• Requirements: ${selectedRequirements.length > 0 ? selectedRequirements.join(', ') : 'Balcony'}
${note ? `• Note: ${note}` : ''}`;

    return `https://wa.me/916281620716?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!area) {
      alert(`Please select your area / locality in ${activeCity.name}`);
      return;
    }
    if (area === 'other' && !customArea.trim()) {
      alert('Please enter your locality / apartment name');
      return;
    }
    if (!consentAgreed) {
      alert('Please agree to project sharing terms to schedule your site visit');
      return;
    }

    setIsSubmitted(true);
    // Direct WhatsApp redirect
    window.open(buildWhatsAppUrl(), '_blank');
  };

  return (
    <section id="book-visit" className="relative py-16 sm:py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative max-w-xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Form Container - Clean, Realistic White Theme matching D-VIEW */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-9 relative overflow-hidden text-left">
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* 01 / SITE DETAILS HEADER */}
              <div>
                <div className="text-[11px] font-extrabold tracking-[0.2em] text-[#16A34A] uppercase mb-1">
                  01 / SITE DETAILS
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight pb-4 border-b border-slate-200 flex items-center justify-between">
                  <span>INVISIBLE GRILLS • {activeCity.name}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-[#16A34A] font-bold border border-emerald-200 lowercase tracking-normal">
                    ap hub
                  </span>
                </h2>
              </div>

              {/* YOUR NAME */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  YOUR NAME <span className="text-[#16A34A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arjun Mehta"
                  className="w-full px-4 py-3.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] transition-colors"
                />
              </div>

              {/* MOBILE NUMBER */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  MOBILE NUMBER <span className="text-[#16A34A]">*</span>
                </label>
                <div className="flex rounded-xl overflow-hidden border border-slate-300 focus-within:border-[#16A34A] focus-within:ring-1 focus-within:ring-[#16A34A] transition-colors bg-slate-50">
                  <div className="px-4 py-3.5 bg-slate-100 border-r border-slate-300 text-sm font-bold text-slate-700 flex items-center justify-center">
                    +91
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    maxLength={13}
                    className="w-full px-4 py-3.5 text-sm bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* CITY & AREA / LOCALITY */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    SELECT CITY HUB <span className="text-[#16A34A]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        setArea('');
                        setCustomArea('');
                      }}
                      className="w-full appearance-none px-4 py-3.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] transition-colors cursor-pointer"
                    >
                      {ALL_LOCATIONS.map((loc) => (
                        <option key={loc.slug} value={loc.slug} className="bg-white text-slate-900">
                          {loc.name} ({loc.district || 'Andhra Pradesh'})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    AREA / LOCALITY <span className="text-[#16A34A]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full appearance-none px-4 py-3.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] transition-colors cursor-pointer"
                    >
                      <option value="" disabled className="bg-white text-slate-400">
                        Select your area in {activeCity.name}
                      </option>
                      {cityAreas.map((a, idx) => (
                        <option key={idx} value={a.name} className="bg-white text-slate-900">
                          {a.name} ({a.type})
                        </option>
                      ))}
                      <option value="other" className="bg-white text-slate-900">
                        + Other Area / Colony in {activeCity.name}
                      </option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {area === 'other' && (
                    <input
                      type="text"
                      required
                      value={customArea}
                      onChange={(e) => setCustomArea(e.target.value)}
                      placeholder={`Enter your apartment / colony in ${activeCity.name}`}
                      className="mt-2.5 w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#16A34A]"
                    />
                  )}

                  <p className="text-[11px] text-slate-500 mt-1.5 font-normal">
                    So we send the nearest checked installer.
                  </p>
                </div>
              </div>

              {/* 02 / REQUIREMENT SECTION */}
              <div className="pt-2">
                <div className="text-[11px] font-extrabold tracking-[0.2em] text-[#16A34A] uppercase">
                  02 / REQUIREMENT
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                  OPTIONAL • SELECT ALL THAT APPLY
                </div>

                {/* 2x2 SELECTION GRID */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {[
                    { id: 'BALCONY', label: 'BALCONY' },
                    { id: 'WINDOWS', label: 'WINDOWS' },
                    { id: 'STAIRCASE / DUPLEX', label: 'STAIRCASE / DUPLEX' },
                    { id: 'FULL FLAT / VILLA', label: 'FULL FLAT / VILLA' },
                  ].map((item) => {
                    const isSelected = selectedRequirements.includes(item.id);
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => toggleRequirement(item.id)}
                        className={`flex items-center justify-between px-3.5 sm:px-4 py-3 rounded-xl border text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'bg-emerald-50 border-[#16A34A] text-emerald-950 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900'
                        }`}
                      >
                        <span className="truncate pr-2">{item.label}</span>
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border transition-all ${
                            isSelected
                              ? 'border-[#16A34A] bg-[#16A34A] text-white'
                              : 'border-slate-300 bg-transparent'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* + ADD A NOTE (OPTIONAL) */}
                <div className="mt-3">
                  {!showNote ? (
                    <button
                      type="button"
                      onClick={() => setShowNote(true)}
                      className="text-xs font-bold text-slate-600 hover:text-[#16A34A] uppercase tracking-wider inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ ADD A NOTE (OPTIONAL)</span>
                    </button>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                          YOUR NOTE (OPTIONAL)
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setShowNote(false);
                            setNote('');
                          }}
                          className="text-xs text-slate-500 hover:text-slate-800"
                        >
                          Cancel
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="e.g. 5th floor sea view, toddler safety, need installation by this weekend..."
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#16A34A]"
                      ></textarea>
                    </div>
                  )}
                </div>
              </div>

              {/* GOOGLE ACCOUNT CONNECT / VERIFY OPTION */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={connectGoogle}
                    onChange={(e) => setConnectGoogle(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#16A34A] cursor-pointer"
                  />
                  <div className="flex items-center gap-1.5">
                    {/* Google G SVG */}
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span className="text-xs font-bold text-slate-700">
                      Connect with Google account
                    </span>
                  </div>
                </label>
                <span className="text-[10px] text-[#16A34A] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Verified
                </span>
              </div>

              {/* CONSENT CHECKBOX */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-slate-500 leading-relaxed select-none">
                  <input
                    type="checkbox"
                    checked={consentAgreed}
                    onChange={(e) => setConsentAgreed(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded accent-[#16A34A] cursor-pointer flex-shrink-0"
                  />
                  <span>
                    I agree that D-VIEW may share my project details with our verified installation expert in {activeCity.name} to schedule a site survey and quote via Call or WhatsApp. See the <a href="/privacy" className="underline hover:text-slate-900">Privacy Policy</a>.
                  </span>
                </label>
              </div>

              {/* SUBMIT BUTTON - D-VIEW Signature Green */}
              <div>
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base tracking-wider uppercase text-slate-950 bg-[#7CFF3A] hover:bg-[#6be630] transition-all shadow-[0_4px_20px_rgba(124,255,58,0.4)] hover:shadow-[0_6px_28px_rgba(124,255,58,0.55)] hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer active:translate-y-0"
                >
                  <span>SEND REQUEST ON WHATSAPP</span>
                  <span className="text-lg leading-none">→</span>
                </button>

                <p className="text-center text-[11px] text-slate-500 mt-3 font-medium">
                  Complimentary site visit • One checked installer • No spam
                </p>
              </div>

            </form>
          ) : (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-[#16A34A] flex items-center justify-center mx-auto text-[#16A34A]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase">
                Free Site Visit Request Sent!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you <strong className="text-slate-900">{name}</strong>. Our verified installer for <strong className="text-[#16A34A]">{activeCity.name} ({finalArea})</strong> has been notified.
              </p>
              <div className="pt-4 flex flex-col gap-2.5">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:opacity-95"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Open WhatsApp Conversation Now</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-slate-500 hover:text-slate-900 underline pt-2"
                >
                  Submit another site measurement
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

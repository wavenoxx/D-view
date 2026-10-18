import React, { useEffect, useState } from 'react';
import { 
  Check, 
  ChevronDown, 
  ArrowRight, 
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Minus,
  AlertCircle
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
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const normalizedPhone = phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');

  const buildWhatsAppUrl = () => {
    const text = `Hello D-view invisible grills, I am interested in invisible safety grills for my balcony. Please share details.
• Name: ${name || 'Customer'}
• Mobile: +91 ${normalizedPhone}
• City: ${activeCity.name}
• Area: ${finalArea}
• Requirements: ${selectedRequirements.length > 0 ? selectedRequirements.join(', ') : 'Balcony'}
${note ? `• Note: ${note}` : ''}`;

    return `https://wa.me/916281620716?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number (starting with 6-9).');
      return;
    }
    if (!area) {
      setErrorMessage(`Please select your area / locality in ${activeCity.name}.`);
      return;
    }
    if (area === 'other' && !customArea.trim()) {
      setErrorMessage('Please enter your apartment or colony name.');
      return;
    }
    if (!consentAgreed) {
      setErrorMessage('Please check the agreement box to share your details via WhatsApp.');
      return;
    }

    setIsSubmitting(true);
    setIsSubmitted(true);
    try {
      window.open(buildWhatsAppUrl(), '_blank', 'noopener,noreferrer');
    } catch (err) {
      // Handled gracefully via the visible confirmation fallback link
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book-visit" className="relative py-16 sm:py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative max-w-xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Form Container - Clean, Realistic White Theme matching D-VIEW */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-9 relative overflow-hidden text-left">
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
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
                <label htmlFor="site-visit-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  YOUR NAME <span className="text-[#16A34A]">*</span>
                </label>
                <input
                  id="site-visit-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arjun Mehta"
                  className="w-full px-4 py-3.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] transition-colors"
                />
              </div>

              {/* MOBILE NUMBER */}
              <div>
                <label htmlFor="site-visit-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  MOBILE NUMBER <span className="text-[#16A34A]">*</span>
                </label>
                <div className="flex rounded-xl overflow-hidden border border-slate-300 focus-within:border-[#16A34A] focus-within:ring-1 focus-within:ring-[#16A34A] transition-colors bg-slate-50">
                  <div className="px-4 py-3.5 bg-slate-100 border-r border-slate-300 text-sm font-bold text-slate-700 flex items-center justify-center">
                    +91
                  </div>
                  <input
                    id="site-visit-phone"
                    type="tel"
                    inputMode="tel"
                    pattern="[6-9][0-9]{9}"
                    required
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="98765 43210"
                    maxLength={13}
                    className="w-full px-4 py-3.5 text-sm bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* CITY & AREA / LOCALITY */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="site-visit-city" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    SELECT CITY HUB <span className="text-[#16A34A]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="site-visit-city"
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
                  <label htmlFor="site-visit-area" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    AREA / LOCALITY <span className="text-[#16A34A]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="site-visit-area"
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
                      id="site-visit-custom-area"
                      type="text"
                      required
                      value={customArea}
                      onChange={(e) => setCustomArea(e.target.value)}
                      placeholder={`Enter your apartment / colony in ${activeCity.name}`}
                      className="mt-2.5 w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#16A34A]"
                    />
                  )}

                  <p className="text-[11px] text-slate-500 mt-1.5 font-normal">
                    This helps us understand your installation location.
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
                        <label htmlFor="site-visit-note" className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                          YOUR NOTE (OPTIONAL)
                        </label>
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
                        id="site-visit-note"
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

              {/* CONSENT CHECKBOX */}
              <div className="pt-1">
                <label htmlFor="site-visit-consent" className="flex items-start gap-2.5 cursor-pointer text-[11px] text-slate-500 leading-relaxed select-none">
                  <input
                    id="site-visit-consent"
                    type="checkbox"
                    checked={consentAgreed}
                    onChange={(e) => setConsentAgreed(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded accent-[#16A34A] cursor-pointer flex-shrink-0"
                  />
                  <span>
                    I agree to share my enquiry details with D-VIEW on WhatsApp to request a quotation for {activeCity.name}. I understand that I must tap Send in WhatsApp. See the <a href="/privacy#privacy" className="underline hover:text-slate-900">Privacy Policy</a>.
                  </span>
                </label>
              </div>

              {/* ERROR MESSAGE DISPLAY */}
              {errorMessage && (
                <div role="alert" aria-live="polite" className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* SUBMIT BUTTON - D-VIEW Signature Green */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base tracking-wider uppercase text-slate-950 bg-[#7CFF3A] hover:bg-[#6be630] transition-all shadow-[0_4px_20px_rgba(124,255,58,0.4)] hover:shadow-[0_6px_28px_rgba(124,255,58,0.55)] hover:-translate-y-0.5 flex items-center justify-center gap-2 active:translate-y-0 ${
                    isSubmitting ? 'opacity-80 cursor-wait' : 'cursor-pointer'
                  }`}
                >
                  <span>{isSubmitting ? 'PREPARING WHATSAPP DRAFT...' : 'SEND REQUEST ON WHATSAPP'}</span>
                  <span className="text-lg leading-none">→</span>
                </button>

                <p className="text-center text-[11px] text-slate-500 mt-3 font-medium">
                  Opening WhatsApp prepares a draft; you must tap Send.
                </p>
              </div>

            </form>
          ) : (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-[#16A34A] flex items-center justify-center mx-auto text-[#16A34A]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase">
                WhatsApp Message Ready
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you <strong className="text-slate-900">{name}</strong>. Your enquiry for <strong className="text-[#16A34A]">{activeCity.name} ({finalArea})</strong> is not sent yet. Open WhatsApp and tap Send to share it with D-VIEW.
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
                <p className="text-[11px] text-slate-500 font-medium">
                  If your browser popup blocker prevented the window from opening automatically, tap the green button above.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setErrorMessage('');
                  }}
                  className="text-xs text-slate-500 hover:text-slate-900 underline pt-2"
                >
                  Edit enquiry details
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

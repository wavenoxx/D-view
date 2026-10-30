import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  Calculator, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  X,
  Phone,
  User,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { ALL_LOCATIONS } from '../data/locations';

interface PriceCalculatorProps {
  defaultCitySlug?: string;
  cityName?: string;
}

export interface MaterialOption {
  value: string;
  label: string;
  grade: 'SS-316' | 'SS-304';
  description: string;
}

const MATERIAL_OPTIONS: MaterialOption[] = [
  {
    value: '316-2.5mm',
    label: 'SS-316 Stainless Steel - 2.5 mm (Recommended for Coastal Humidity)',
    grade: 'SS-316',
    description: 'Corrosion-resistant alloy suitable for coastal and humid corridors.'
  },
  {
    value: '316-3.0mm',
    label: 'SS-316 Stainless Steel - 3.0 mm (Heavy Duty)',
    grade: 'SS-316',
    description: 'Heavy-duty cable core for large openings and high wind exposure.'
  },
  {
    value: '316-2.0mm',
    label: 'SS-316 Stainless Steel - 2.0 mm (Standard)',
    grade: 'SS-316',
    description: 'Standard multi-strand cable with transparent protective nylon coating.'
  },
  {
    value: '304-2.5mm',
    label: 'SS-304 Stainless Steel - 2.5 mm (Standard Balcony)',
    grade: 'SS-304',
    description: 'Durable stainless steel cable core for standard urban balconies.'
  },
  {
    value: '304-3.0mm',
    label: 'SS-304 Stainless Steel - 3.0 mm (Heavy Duty)',
    grade: 'SS-304',
    description: 'Heavy-duty standard grade cable core for wider openings.'
  },
  {
    value: '304-2.0mm',
    label: 'SS-304 Stainless Steel - 2.0 mm (Economy)',
    grade: 'SS-304',
    description: 'Economy grade wire cable for sheltered openings.'
  }
];

export default function PriceCalculator({ defaultCitySlug = 'visakhapatnam', cityName = 'Visakhapatnam' }: PriceCalculatorProps) {
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(8);
  const [material, setMaterial] = useState<string>('316-2.5mm');
  const [selectedCity, setSelectedCity] = useState<string>(defaultCitySlug);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  // Form states in modal
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [modalCity, setModalCity] = useState(defaultCitySlug);
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const selectedMaterialObj = MATERIAL_OPTIONS.find(m => m.value === material) || MATERIAL_OPTIONS[0];
  const activeCityObj = ALL_LOCATIONS.find(loc => loc.slug === selectedCity) || ALL_LOCATIONS[0];
  const modalCityObj = ALL_LOCATIONS.find(loc => loc.slug === modalCity) || activeCityObj;

  // Calculation
  const totalArea = Math.max(1, width * height);

  // Validation warnings
  const isWidthWarning = width > 35;
  const isHeightWarning = height > 15;

  const normalizedPhone = phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');

  // Prepare pre-filled WhatsApp message
  const createWhatsAppUrl = () => {
    const message = `Hello D-VIEW Solutions!
I calculated my balcony dimensions on your website:
${name.trim() ? `- Name: ${name.trim()}\n` : ''}${normalizedPhone ? `- Mobile: +91 ${normalizedPhone}\n` : ''}- Location: ${modalCityObj.name}
- Dimensions: ${width} ft (W) × ${height} ft (H)
- Total Area: ${totalArea} sq.ft
- Material: ${selectedMaterialObj.label}

Please schedule my site-visit measurement and provide an itemized quotation.`;

    return `https://wa.me/916281620716?text=${encodeURIComponent(message)}`;
  };

  // Generate QR code when modal opens or calculation changes
  useEffect(() => {
    const waUrl = createWhatsAppUrl();
    QRCode.toDataURL(waUrl, {
      width: 220,
      margin: 2,
      color: {
        dark: '#0a0f0d',
        light: '#FFFFFF'
      }
    })
    .then((url) => setQrCodeDataUrl(url))
    .catch((err) => console.error('QR code generation error', err));
  }, [isModalOpen, width, height, material, selectedCity, modalCity, name, phone]);

  const handleSubmitLead = (e: React.FormEvent) => {
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
    if (!consentAgreed) {
      setErrorMessage('Please check the agreement box to share your quote enquiry via WhatsApp.');
      return;
    }

    setIsSubmitting(true);
    setIsSubmitted(true);
    try {
      window.open(createWhatsAppUrl(), '_blank', 'noopener,noreferrer');
    } catch (err) {
      // Handled gracefully via the visible fallback link
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="calculator" className="relative py-20 bg-slate-50 border-y border-slate-200 overflow-hidden">
      {/* Background Emerald Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#16A34A] uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Area & Specification Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            CALCULATE YOUR BALCONY <br className="hidden sm:inline" />
            <span className="text-[#16A34A]">SAFETY SPECIFICATION</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Select your opening dimensions and cable grade to determine total area and request an itemized quotation.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="space-y-6">
              
              {/* City Selection */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5">
                  1. Select Location
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ALL_LOCATIONS.map((loc) => (
                    <button
                      key={loc.slug}
                      type="button"
                      onClick={() => {
                        setSelectedCity(loc.slug);
                        setModalCity(loc.slug);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between border ${
                        selectedCity === loc.slug
                          ? 'bg-emerald-50 border-[#16A34A] text-[#16A34A]'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span>{loc.name}</span>
                      {selectedCity === loc.slug && <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions Input */}
              <div className="pt-2 border-t border-slate-200">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
                  2. Balcony Opening Dimensions (Feet)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Width */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-slate-700">Width (Span)</span>
                      <span className="text-sm font-black text-[#16A34A]">{width} ft</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="40"
                      step="1"
                      aria-label="Balcony width in feet slider"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#16A34A]"
                    />
                    <div className="mt-3 flex items-center justify-between">
                      <label htmlFor="calc-num-width" className="text-[11px] text-slate-500">Numeric:</label>
                      <div className="flex items-center gap-1.5">
                        <input
                          id="calc-num-width"
                          type="number"
                          inputMode="decimal"
                          min="1"
                          max="60"
                          value={width}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setWidth(isNaN(val) ? 1 : Math.max(1, Math.min(60, val)));
                          }}
                          className="w-20 px-2 py-1 text-xs text-center bg-white border border-slate-300 rounded-lg text-slate-900 font-bold focus:outline-none focus:border-[#16A34A]"
                        />
                        <span className="text-xs text-slate-500">ft</span>
                      </div>
                    </div>
                  </div>

                  {/* Height */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-slate-700">Height (Floor to Ceiling)</span>
                      <span className="text-sm font-black text-[#16A34A]">{height} ft</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="15"
                      step="0.5"
                      aria-label="Balcony height in feet slider"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#16A34A]"
                    />
                    <div className="mt-3 flex items-center justify-between">
                      <label htmlFor="calc-num-height" className="text-[11px] text-slate-500">Numeric:</label>
                      <div className="flex items-center gap-1.5">
                        <input
                          id="calc-num-height"
                          type="number"
                          inputMode="decimal"
                          min="1"
                          max="20"
                          step="0.5"
                          value={height}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setHeight(isNaN(val) ? 1 : Math.max(1, Math.min(20, val)));
                          }}
                          className="w-20 px-2 py-1 text-xs text-center bg-white border border-slate-300 rounded-lg text-slate-900 font-bold focus:outline-none focus:border-[#16A34A]"
                        />
                        <span className="text-xs text-slate-500">ft</span>
                      </div>
                    </div>
                  </div>

                </div>

                {(isWidthWarning || isHeightWarning) && (
                  <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-300 flex items-start gap-2.5 text-xs text-amber-800">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Large dimensions detected ({width}×{height} ft). Balconies above 30ft width benefit from mid-span structural stiffener tracks, which our engineer will inspect during site measurement.</span>
                  </div>
                )}
              </div>

              {/* Wire Material & Thickness Options */}
              <div className="pt-2 border-t border-slate-200">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                    3. Wire Material & Thickness
                  </label>
                  <span className="text-[11px] text-[#16A34A] font-bold">SS-316 & SS-304 Offered</span>
                </div>
                <div className="space-y-2.5">
                  {MATERIAL_OPTIONS.map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() => setMaterial(opt.value)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        material === opt.value
                          ? 'bg-emerald-50 border-[#16A34A] shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            material === opt.value ? 'border-[#16A34A] bg-[#16A34A]' : 'border-slate-300'
                          }`}>
                            {material === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                          </div>
                          <div>
                            <span className="text-sm font-bold text-slate-900">{opt.label}</span>
                            <span className="block text-xs text-slate-500">{opt.description}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] font-bold text-[#16A34A] bg-white px-2 py-0.5 rounded border border-emerald-200">
                            {opt.grade}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-xs font-black tracking-wider uppercase text-slate-500">
                Calculated Balcony Summary
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-[#16A34A] border border-emerald-200">
                {activeCityObj.name}
              </span>
            </div>

            {/* Area Metric */}
            <div className="py-6 border-b border-slate-200 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-slate-600 font-medium">Total Opening Area:</span>
                <span className="text-3xl font-black text-slate-900">{totalArea} <span className="text-sm font-normal text-slate-500">sq.ft</span></span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Dimensions</span>
                  <span className="text-slate-900 font-semibold">{width} ft × {height} ft</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Selected Grade</span>
                  <span className="text-[#16A34A] font-bold">{selectedMaterialObj.grade}</span>
                </div>
              </div>
            </div>

            {/* Quotation Notice */}
            <div className="py-6">
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Quotation on Measurement
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Itemized Quote <span className="text-sm text-slate-500 font-normal">after site visit</span>
              </div>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Pricing is determined by opening span, anchor profile, and selected {selectedMaterialObj.grade} cable grade. An itemized quote is provided in writing after site measurement.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-extrabold text-sm text-slate-950 bg-[#7CFF3A] hover:bg-[#68e028] transition-all shadow-[0_4px_16px_rgba(124,255,58,0.4)] hover:shadow-[0_6px_22px_rgba(124,255,58,0.55)] cursor-pointer"
              >
                <span>Request Site Visit & Written Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={createWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-xs text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-[#16A34A] transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#16A34A]" />
                <span>Discuss on WhatsApp with Saved Dimensions</span>
              </a>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <p className="text-[11px] text-slate-500 leading-relaxed">
                * No fixed rate card. Exact quotation is confirmed in writing following on-site laser measurement and specification confirmation.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Modal: Book Site Visit & Dynamic WhatsApp QR */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
        >
          <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="calc-modal-title"
            className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
          >
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close calculation modal"
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-800 rounded-lg bg-slate-100 hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                  <span className="text-xs font-black uppercase tracking-wider text-[#16A34A]">
                    Site Measurement Coordination
                  </span>
                </div>
                <h3 id="calc-modal-title" className="text-2xl font-black text-slate-900">
                  Request Site Visit & Written Quotation
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Balcony Opening: <strong className="text-slate-900">{totalArea} sq.ft</strong> ({selectedMaterialObj.label})
                </p>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
                  
                  {/* Clean Lead Form */}
                  <form onSubmit={handleSubmitLead} noValidate className="md:col-span-7 space-y-4">
                    <div>
                      <label htmlFor="calc-customer-name" className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                          id="calc-customer-name"
                          type="text"
                          required
                          autoComplete="name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errorMessage) setErrorMessage('');
                          }}
                          placeholder="e.g. Ramesh Varma"
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-[#16A34A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="calc-customer-phone" className="block text-xs font-bold text-slate-700 mb-1">Phone Number (WhatsApp Preferred)</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                          id="calc-customer-phone"
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
                          placeholder="e.g. 6281620716"
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-[#16A34A]"
                        />
                      </div>
                    </div>

                    {/* Simple Location Dropdown */}
                    <div>
                      <label htmlFor="calc-customer-city" className="block text-xs font-bold text-slate-700 mb-1">Location / City</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <select
                          id="calc-customer-city"
                          value={modalCity}
                          onChange={(e) => setModalCity(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-[#16A34A]"
                        >
                          {ALL_LOCATIONS.map((loc) => (
                            <option key={loc.slug} value={loc.slug}>
                              {loc.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Affirmative Consent Checkbox */}
                    <div className="pt-1">
                      <label htmlFor="calc-consent" className="flex items-start gap-2.5 cursor-pointer text-[11px] text-slate-500 leading-relaxed select-none">
                        <input
                          id="calc-consent"
                          type="checkbox"
                          checked={consentAgreed}
                          onChange={(e) => {
                            setConsentAgreed(e.target.checked);
                            if (errorMessage) setErrorMessage('');
                          }}
                          className="w-4 h-4 mt-0.5 rounded accent-[#16A34A] cursor-pointer flex-shrink-0"
                        />
                        <span>
                          I agree to share my balcony quotation details with D-VIEW on WhatsApp. I understand that I must tap Send in WhatsApp. See the <a href="/privacy#privacy" className="underline hover:text-slate-900" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                        </span>
                      </label>
                    </div>

                    {/* Error Banner */}
                    {errorMessage && (
                      <div role="alert" aria-live="polite" className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3.5 rounded-xl font-black text-sm text-slate-950 bg-[#7CFF3A] hover:bg-[#68e028] transition-all shadow-[0_4px_16px_rgba(124,255,58,0.4)] ${
                        isSubmitting ? 'opacity-80 cursor-wait' : 'cursor-pointer'
                      }`}
                    >
                      {isSubmitting ? 'Preparing WhatsApp Draft...' : 'Request Site Visit via WhatsApp →'}
                    </button>
                    <p className="text-center text-[10px] text-slate-500 mt-2">
                      Opening WhatsApp prepares a draft; tap Send in WhatsApp to share with D-VIEW.
                    </p>
                  </form>

                  {/* WhatsApp QR Code side */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2">
                      Scan with Phone to Send
                    </span>
                    {qrCodeDataUrl ? (
                      <div className="p-2 bg-white rounded-xl shadow-md border border-slate-200">
                        <img 
                          src={qrCodeDataUrl} 
                          alt="Dynamic WhatsApp QR Code for Balcony Estimate" 
                          className="w-32 h-32 sm:w-36 sm:h-36"
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 bg-slate-100 rounded-xl flex items-center justify-center text-xs text-slate-400">
                        Generating QR...
                      </div>
                    )}
                    <span className="mt-2.5 text-xs text-slate-900 font-bold">
                      Direct WhatsApp Chat
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      Links to chat with your {totalArea} sq.ft details
                    </span>
                  </div>

                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-[#16A34A] flex items-center justify-center mx-auto text-[#16A34A]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">WhatsApp Enquiry Ready</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you <strong className="text-slate-900">{name}</strong>. Your <strong className="text-[#16A34A]">{modalCityObj.name}</strong> enquiry draft ({totalArea} sq.ft) is ready. Open WhatsApp and tap Send to share your details (<strong className="text-slate-900">+91 {normalizedPhone}</strong>) with D-VIEW.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={createWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-extrabold text-sm hover:opacity-95 transition-all shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open in WhatsApp Now</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setIsModalOpen(false);
                    }}
                    className="px-6 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-200 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  If your browser popup blocker prevented the window from opening automatically, tap the green button above.
                </p>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}

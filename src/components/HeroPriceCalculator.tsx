import React, { useState } from 'react';
import { Calculator, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react';

interface HeroPriceCalculatorProps {
  citySlug: string;
  cityName: string;
}

export interface MaterialOption {
  id: string;
  grade: 'SS 316' | 'SS 304';
  thickness: string;
  label: string;
  ratePerSqFt: number;
}

// User-specified rates:
// SS 316: 3.0mm = ₹190, 2.5mm = ₹170, 2.0mm = ₹160
// SS 304: 3.0mm = ₹170, 2.5mm = ₹150, 2.0mm = ₹140
const MATERIAL_OPTIONS: MaterialOption[] = [
  // SS 316 (Marine Grade)
  {
    id: '316-2.5',
    grade: 'SS 316',
    thickness: '2.5 mm',
    label: 'SS 316 (Marine Grade) - 2.5 mm High Tensile (Recommended)',
    ratePerSqFt: 170,
  },
  {
    id: '316-3.0',
    grade: 'SS 316',
    thickness: '3.0 mm',
    label: 'SS 316 (Marine Grade) - 3.0 mm Heavy Duty Coastal',
    ratePerSqFt: 190,
  },
  {
    id: '316-2.0',
    grade: 'SS 316',
    thickness: '2.0 mm',
    label: 'SS 316 (Marine Grade) - 2.0 mm Standard',
    ratePerSqFt: 160,
  },

  // SS 304 (Standard Grade)
  {
    id: '304-2.5',
    grade: 'SS 304',
    thickness: '2.5 mm',
    label: 'SS 304 (Standard Grade) - 2.5 mm High Tensile',
    ratePerSqFt: 150,
  },
  {
    id: '304-3.0',
    grade: 'SS 304',
    thickness: '3.0 mm',
    label: 'SS 304 (Standard Grade) - 3.0 mm Heavy Duty',
    ratePerSqFt: 170,
  },
  {
    id: '304-2.0',
    grade: 'SS 304',
    thickness: '2.0 mm',
    label: 'SS 304 (Standard Grade) - 2.0 mm Economy',
    ratePerSqFt: 140,
  },
];

export default function HeroPriceCalculator({ citySlug, cityName }: HeroPriceCalculatorProps) {
  // Height and Width up to 100 Ft supported
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(8);
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('316-2.5');

  const selectedMaterial =
    MATERIAL_OPTIONS.find((m) => m.id === selectedMaterialId) || MATERIAL_OPTIONS[0];

  // Calculate only when width and height are provided
  const hasValidDimensions = width > 0 && height > 0;
  const area = hasValidDimensions ? width * height : 0;
  const estimatedPrice = hasValidDimensions ? area * selectedMaterial.ratePerSqFt : 0;

  // Handle number input clamped between 1 and 100
  const handleWidthChange = (val: string) => {
    if (val === '') {
      setWidth(0);
      return;
    }
    const num = Math.min(100, Math.max(0, parseInt(val, 10) || 0));
    setWidth(num);
  };

  const handleHeightChange = (val: string) => {
    if (val === '') {
      setHeight(0);
      return;
    }
    const num = Math.min(100, Math.max(0, parseInt(val, 10) || 0));
    setHeight(num);
  };

  const getWhatsAppEstimateUrl = () => {
    const text = `Hi D-View! I checked the ${cityName} balcony price calculator:
• Dimensions: ${width || 0} Ft (Width) × ${height || 0} Ft (Height)
• Total Area: ${area} Sq.Ft
• Material: ${selectedMaterial.label}
• Estimated Demo Price: ₹${estimatedPrice.toLocaleString('en-IN')}

I am interested in D-View Invisible Grills. Please schedule a 100% Free Site Visit & Measurement and apply the 10% – 15% Spot Discount.`;

    return `https://wa.me/916281620716?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-white/95 sm:bg-white backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-200 sm:border-2 sm:border-emerald-500/80 p-3.5 sm:p-5 shadow-2xl text-left relative overflow-hidden select-none">
      
      {/* Top Header: CHECK [CITY] PRICE NOW */}
      <div className="mb-3">
        <a
          href={getWhatsAppEstimateUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#16A34A] to-[#22c55e] hover:from-[#15803d] hover:to-[#16A34A] text-white font-black text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-black/20 flex items-center justify-center text-white">
              <Calculator className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </span>
            <span className="truncate">
              CHECK <strong className="text-white underline">{cityName}</strong> PRICE NOW
            </span>
          </div>
          <span className="text-base leading-none group-hover:translate-x-1 transition-transform">›</span>
        </a>
      </div>

      <div className="space-y-3">
        
        {/* Width & Height Inputs (1 to 100 Feet) */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Width Input */}
          <div>
            <label htmlFor="hero-calc-width" className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
              Width (1 - 100 Ft):
            </label>
            <div className="relative">
              <input
                id="hero-calc-width"
                type="number"
                inputMode="decimal"
                min="1"
                max="100"
                value={width || ''}
                onChange={(e) => handleWidthChange(e.target.value)}
                placeholder="10"
                className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white pr-9 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 pointer-events-none">
                Ft
              </span>
            </div>
          </div>

          {/* Height Input */}
          <div>
            <label htmlFor="hero-calc-height" className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
              Height (1 - 100 Ft):
            </label>
            <div className="relative">
              <input
                id="hero-calc-height"
                type="number"
                inputMode="decimal"
                min="1"
                max="100"
                value={height || ''}
                onChange={(e) => handleHeightChange(e.target.value)}
                placeholder="8"
                className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white pr-9 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 pointer-events-none">
                Ft
              </span>
            </div>
          </div>
        </div>

        {/* Quick Presets for 100 Ft & Popular Balcony Dimensions */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[10px] text-slate-500 font-semibold shrink-0">Presets:</span>
          {[
            { label: '10×8 Ft', w: 10, h: 8 },
            { label: '15×9 Ft', w: 15, h: 9 },
            { label: '25×10 Ft', w: 25, h: 10 },
            { label: '50×10 Ft', w: 50, h: 10 },
            { label: '100×10 Ft', w: 100, h: 10 },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setWidth(preset.w);
                setHeight(preset.h);
              }}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition shrink-0 cursor-pointer ${
                width === preset.w && height === preset.h
                  ? 'bg-emerald-50 border-[#16A34A] text-[#16A34A]'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Material Selection (SS 316 & SS 304) */}
        <div>
          <label htmlFor="hero-calc-material" className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
            Wire Material & Thickness:
          </label>
          <div className="relative">
            <select
              id="hero-calc-material"
              value={selectedMaterialId}
              onChange={(e) => setSelectedMaterialId(e.target.value)}
              className="w-full appearance-none px-3 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-[#16A34A] focus:bg-white cursor-pointer pr-8"
            >
              <optgroup label="── SS 316 Marine Grade (Rust-Proof) ──">
                <option value="316-2.5">SS 316 (Marine Grade) - 2.5 mm High Tensile (Recommended)</option>
                <option value="316-3.0">SS 316 (Marine Grade) - 3.0 mm Heavy Duty Coastal</option>
                <option value="316-2.0">SS 316 (Marine Grade) - 2.0 mm Standard</option>
              </optgroup>
              <optgroup label="── SS 304 Standard Grade ──">
                <option value="304-2.5">SS 304 (Standard Grade) - 2.5 mm High Tensile</option>
                <option value="304-3.0">SS 304 (Standard Grade) - 3.0 mm Heavy Duty</option>
                <option value="304-2.0">SS 304 (Standard Grade) - 2.0 mm Economy</option>
              </optgroup>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-[10px]">▼</span>
          </div>
        </div>

        {/* Output Area: Price shown only when Width and Height are added */}
        {hasValidDimensions ? (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 shadow-inner">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-600">Total Area:</span>
              <span className="font-extrabold text-slate-900">
                {area} Sq.Ft <span className="text-slate-500 text-xs">({width} Ft × {height} Ft)</span>
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-1.5 border-t border-emerald-200 mt-1.5">
              <div>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900">Estimated Demo Price:</span>
                <span className="block text-[10px] text-slate-500 font-normal">
                  ({selectedMaterial.grade} • {selectedMaterial.thickness})
                </span>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-[#16A34A] drop-shadow-sm">
                ₹ {estimatedPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-center">
            <p className="text-xs text-amber-800 font-semibold">
              ⚠️ Please enter Width & Height (1 - 100 Ft) above to see estimated demo price.
            </p>
          </div>
        )}

        {/* High-Converting Special Offer Box */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100/60 border-2 border-emerald-400 shadow-sm text-left relative overflow-hidden">
          {/* Header Badge */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-[#16A34A] text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
              🔥 SPECIAL ON-SITE OFFER
            </span>
            <span className="text-[11px] sm:text-xs font-black text-white bg-[#16A34A] px-2 py-0.5 rounded-lg shadow-sm">
              10% – 15% OFF
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
            Worried about price? <span className="text-[#16A34A]">Get 10% to 15% Extra Discount on Call or Free Site Visit!</span>
          </h4>
          
          <p className="text-[10px] sm:text-[11px] text-slate-600 mt-1 leading-relaxed">
            * <strong className="text-slate-900">Note:</strong> The price above is only a standard demo estimate. When you schedule a <strong className="text-[#16A34A]">100% Free Site Measurement Visit</strong> or call our engineering team, we inspect your balcony and unlock a <strong className="text-[#16A34A]">10% to 15% direct spot discount</strong> tailored to your site!
          </p>
        </div>

        {/* Action Buttons: Direct Call & WhatsApp Buttons */}
        <div className="space-y-2 pt-0.5">
          {/* WhatsApp Primary CTA */}
          <a
            href={getWhatsAppEstimateUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#16A34A] to-[#22c55e] hover:from-[#15803d] hover:to-[#16A34A] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-98 group cursor-pointer"
          >
            <span className="text-sm sm:text-base">👉</span>
            <span>Book Free Site Visit & Claim 15% Off (WhatsApp)</span>
          </a>

          {/* Direct Phone Call Button */}
          <a
            href="tel:+916281620716"
            className="w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-300 hover:border-[#16A34A] text-slate-800 font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-98 cursor-pointer"
          >
            <span>📞</span>
            <span>Call Directly for Lowest Spot Quote: <strong className="text-[#16A34A] ml-1">+91 62816 20716</strong></span>
          </a>
        </div>

      </div>
    </div>
  );
}

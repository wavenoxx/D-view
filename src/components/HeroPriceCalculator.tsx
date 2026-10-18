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
}

const MATERIAL_OPTIONS: MaterialOption[] = [
  // SS 316
  {
    id: '316-2.5',
    grade: 'SS 316',
    thickness: '2.5 mm',
    label: 'SS-316 Stainless Steel - 2.5 mm (Recommended for Coastal Humidity)',
  },
  {
    id: '316-3.0',
    grade: 'SS 316',
    thickness: '3.0 mm',
    label: 'SS-316 Stainless Steel - 3.0 mm (Heavy Duty)',
  },
  {
    id: '316-2.0',
    grade: 'SS 316',
    thickness: '2.0 mm',
    label: 'SS-316 Stainless Steel - 2.0 mm (Standard)',
  },

  // SS 304
  {
    id: '304-2.5',
    grade: 'SS 304',
    thickness: '2.5 mm',
    label: 'SS-304 Stainless Steel - 2.5 mm (Standard Balcony)',
  },
  {
    id: '304-3.0',
    grade: 'SS 304',
    thickness: '3.0 mm',
    label: 'SS-304 Stainless Steel - 3.0 mm (Heavy Duty)',
  },
  {
    id: '304-2.0',
    grade: 'SS 304',
    thickness: '2.0 mm',
    label: 'SS-304 Stainless Steel - 2.0 mm (Economy)',
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
    const text = `Hi D-View! I checked the ${cityName} balcony area calculator:
• Dimensions: ${width || 0} Ft (Width) × ${height || 0} Ft (Height)
• Total Area: ${area} Sq.Ft
• Selected Material: ${selectedMaterial.label}

Please share quotation details and confirm site-visit availability for my location.`;

    return `https://wa.me/916281620716?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-white/95 sm:bg-white backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-200 sm:border-2 sm:border-emerald-500/80 p-3.5 sm:p-5 shadow-2xl text-left relative overflow-hidden select-none">
      
      {/* Top Header */}
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
              CALCULATE <strong className="text-white underline">{cityName}</strong> BALCONY AREA
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
              <optgroup label="── SS-316 Stainless Steel (Coastal Recommended) ──">
                <option value="316-2.5">SS-316 Stainless Steel - 2.5 mm (Recommended for Coastal Humidity)</option>
                <option value="316-3.0">SS-316 Stainless Steel - 3.0 mm (Heavy Duty)</option>
                <option value="316-2.0">SS-316 Stainless Steel - 2.0 mm (Standard)</option>
              </optgroup>
              <optgroup label="── SS-304 Stainless Steel (Standard Inland) ──">
                <option value="304-2.5">SS-304 Stainless Steel - 2.5 mm (Standard Balcony)</option>
                <option value="304-3.0">SS-304 Stainless Steel - 3.0 mm (Heavy Duty)</option>
                <option value="304-2.0">SS-304 Stainless Steel - 2.0 mm (Economy)</option>
              </optgroup>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-[10px]">▼</span>
          </div>
        </div>

        {/* Output Area: Area and Quotation Status */}
        {hasValidDimensions ? (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 shadow-inner">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-600">Total Calculated Area:</span>
              <span className="font-extrabold text-slate-900">
                {area} Sq.Ft <span className="text-slate-500 text-xs">({width} Ft × {height} Ft)</span>
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-1.5 border-t border-emerald-200 mt-1.5">
              <div>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900">Quotation on Measurement:</span>
                <span className="block text-[10px] text-slate-500 font-normal">
                  ({selectedMaterial.grade} • {selectedMaterial.thickness})
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#16A34A] bg-emerald-100/70 px-2 py-0.5 rounded-lg border border-emerald-200">
                Itemized Quote
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-center">
            <p className="text-xs text-amber-800 font-semibold">
              ⚠️ Please enter Width & Height (1 - 100 Ft) above to calculate balcony area.
            </p>
          </div>
        )}

        {/* Informative Site Measurement Box */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm text-left relative overflow-hidden">
          <div className="flex items-center justify-between mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#16A34A] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
              Site Measurement & Written Quote
            </span>
            <span className="text-[10px] font-semibold text-slate-500">
              Transparent Pricing
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
            Tailored to Your Balcony Dimensions & Selected Grade
          </h4>
          
          <p className="text-[10px] sm:text-[11px] text-slate-600 mt-1 leading-relaxed">
            Final pricing is determined after physical site inspection based on structural anchor tracks, span, and selected material ({selectedMaterial.grade}). Contact us to verify service availability and schedule measurement.
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
            <span>Request Quotation via WhatsApp</span>
          </a>

          {/* Direct Phone Call Button */}
          <a
            href="tel:+916281620716"
            className="w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-300 hover:border-[#16A34A] text-slate-800 font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-98 cursor-pointer"
          >
            <span>📞</span>
            <span>Call for Enquiry & Quotation: <strong className="text-[#16A34A] ml-1">+91 62816 20716</strong></span>
          </a>
        </div>

      </div>
    </div>
  );
}

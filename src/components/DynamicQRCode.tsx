import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Smartphone, Copy, Check, ExternalLink } from 'lucide-react';

interface DynamicQRCodeProps {
  locationSlug: string;
  cityName: string;
}

export default function DynamicQRCode({ locationSlug, cityName }: DynamicQRCodeProps) {
  const [pageQrUrl, setPageQrUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [currentUrl, setCurrentUrl] = useState<string>(`https://www.dviewsolutions.com/locations/${locationSlug}`);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      setCurrentUrl(url);
      QRCode.toDataURL(url, {
        width: 200,
        margin: 2,
        color: {
          dark: '#0B0D0C',
          light: '#FFFFFF'
        }
      })
      .then((dataUrl) => setPageQrUrl(dataUrl))
      .catch((err) => console.error('Failed to generate page QR code', err));
    }
  }, [locationSlug]);

  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-[#151C19] to-[#0F1412] rounded-2xl border border-[#24322B] p-6 sm:p-8 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#7CFF3A]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        
        {/* QR Code Frame */}
        <div className="shrink-0 bg-white p-3 rounded-2xl shadow-xl border-4 border-[#1A2420] text-center">
          {pageQrUrl ? (
            <img 
              src={pageQrUrl} 
              alt={`QR Code for D-VIEW ${cityName} Invisible Grills Safety Page`}
              className="w-36 h-36 sm:w-40 sm:h-40" 
            />
          ) : (
            <div className="w-36 h-36 sm:w-40 sm:h-40 bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-medium">
              Generating QR...
            </div>
          )}
          <span className="block mt-1 text-[10px] font-bold text-[#0B0D0C] uppercase tracking-wider">
            {cityName} Hub
          </span>
        </div>

        {/* Text & Explanations */}
        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121816] border border-[#7CFF3A]/30 text-xs font-semibold text-[#7CFF3A] uppercase tracking-wider mb-2">
            <QrCode className="w-3.5 h-3.5" />
            <span>Digital Safety Passport</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            KEEP YOUR LOCAL {cityName.toUpperCase()} SAFETY GUIDE
          </h3>

          <p className="mt-2 text-sm text-[#C7CDD1] leading-relaxed">
            Scan this dynamic QR code with your smartphone camera to save or revisit this official D-VIEW {cityName} specifications page anytime, or share it directly with your apartment association (RWA).
          </p>

          {/* Direct Laser Site Survey Hook */}
          <div className="mt-3 p-3 rounded-xl bg-[#1A2420] border border-[#7CFF3A]/30 flex items-center gap-2.5">
            <span className="text-base">🛡️</span>
            <span className="text-xs font-semibold text-[#E2E8F0]">
              <strong className="text-[#7CFF3A]">Doorstep Technical Survey:</strong> Includes precision digital laser measurement and SS-316 / SS-304 sample inspection.
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1A2420] hover:bg-[#232E29] border border-[#24322B] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#7CFF3A]" /> : <Copy className="w-3.5 h-3.5 text-[#94A3B8]" />}
              <span>{copied ? 'Link Copied!' : 'Copy City Page URL'}</span>
            </button>

            <a
              href={`https://wa.me/916281620716?text=${encodeURIComponent(`Hello D-view invisible grills, I am interested in invisible safety grills for my balcony in ${cityName}. Please share details.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#0B0D0C] bg-[#7CFF3A] hover:bg-[#8FFF52] transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}

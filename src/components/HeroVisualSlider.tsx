import React, { useState, useRef, useCallback } from 'react';

export interface BeforeAfterProps {
  beforeImage?: string;
  afterImage?: string;
}

export const HeroVisualSlider: React.FC<BeforeAfterProps> = ({
  beforeImage = "/assets/balcony-before-rusted-iron.jpg",
  afterImage = "/assets/balcony-after-dview-luxury.jpg",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 2) percentage = 2;
    if (percentage > 98) percentage = 98;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    updatePosition(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    updatePosition(e.clientX);
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-8">
      {/* Clean Luxury Heading - No cluttered boxes */}
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-1 rounded-full bg-[#028A0F]/10 border border-[#028A0F] text-[#028A0F] text-xs font-bold tracking-widest uppercase mb-2">
          Architectural Transformation
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          See What Life Looks Like <span className="text-[#028A0F]">Without Cages</span>
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          Drag the center handle to compare traditional rusted grills with D-View Invisible Safety.
        </p>
      </div>

      {/* Main Interactive 3D Split Slider Box */}
      <div
        ref={containerRef}
        className="relative w-full h-[450px] md:h-[620px] rounded-2xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-gray-200"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onClick={handleClick}
      >
        {/* AFTER Image (Full Background) */}
        <img
          src={afterImage}
          alt="After D-View Invisible Grill Installation"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-semibold tracking-wide border border-white/20 pointer-events-none z-10">
          AFTER: D-View SS-316
        </div>

        {/* BEFORE Image (Clipped Left Side with Pixel-Perfect Alignment) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt="Before with Heavy Rusted Iron Grills"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute top-4 left-4 bg-red-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-red-200 text-xs font-semibold tracking-wide border border-red-500/30">
            BEFORE: Traditional Cages
          </div>
        </div>

        {/* Slider Center Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-gray-800 shadow-2xl flex items-center justify-center font-bold text-sm border-2 border-[#028A0F] hover:scale-105 transition-transform">
            ⇄
          </div>
        </div>
      </div>

      {/* 4 Problem-Solution Badges under Slider */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-center">
          <p className="text-xs text-gray-500">Pigeon Solution</p>
          <p className="text-sm font-bold text-gray-900">Zero Mess & Droppings</p>
        </div>
        <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-center">
          <p className="text-xs text-gray-500">Child & Elder Safety</p>
          <p className="text-sm font-bold text-gray-900">Balcony Safety Barrier</p>
        </div>
        <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-center">
          <p className="text-xs text-gray-500">Unblocked View</p>
          <p className="text-sm font-bold text-gray-900">99% Air & Sun Transparency</p>
        </div>
        <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-center">
          <p className="text-xs text-gray-500">Emergency Egress</p>
          <p className="text-sm font-bold text-gray-900">1-Min Quick Fire Escape</p>
        </div>
      </div>
    </section>
  );
};

export default HeroVisualSlider;

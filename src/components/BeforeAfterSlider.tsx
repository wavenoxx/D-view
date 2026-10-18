import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
}

export default function BeforeAfterSlider({
  beforeImage = '/images/balcony-before.jpg',
  afterImage = '/images/balcony-after.jpg',
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronize container width on mount and resize for pixel-perfect image alignment
  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);

    const observer = new ResizeObserver(() => {
      updateWidth();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateWidth);
      observer.disconnect();
    };
  }, [updateWidth]);

  const rafId = useRef<number | null>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }
    rafId.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percent = (x / rect.width) * 100;
      if (percent < 0) percent = 0;
      if (percent > 100) percent = 100;
      setSliderPos(percent);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  // Touch gesture direction tracking for buttery-smooth mobile scrolling
  const touchStartRef = useRef<{ x: number; y: number; isHorizontal?: boolean } | null>(null);

  // Global mouse & touch listeners for continuous dragging
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      if (touchStartRef.current?.isHorizontal) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleWindowEnd = () => {
      setIsDragging(false);
      touchStartRef.current = null;
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleWindowMouseMove);
      window.addEventListener('mouseup', handleWindowEnd);
      window.addEventListener('touchmove', handleWindowTouchMove, { passive: true });
      window.addEventListener('touchend', handleWindowEnd);
      window.addEventListener('touchcancel', handleWindowEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowEnd);
      window.removeEventListener('touchmove', handleWindowTouchMove);
      window.removeEventListener('touchend', handleWindowEnd);
      window.removeEventListener('touchcancel', handleWindowEnd);
    };
  }, [isDragging, handleMove]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        isHorizontal: undefined,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.touches.length === 0) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = Math.abs(currentX - touchStartRef.current.x);
    const deltaY = Math.abs(currentY - touchStartRef.current.y);

    // Distinguish between vertical page scroll and horizontal comparison slider drag
    if (touchStartRef.current.isHorizontal === undefined) {
      if (deltaY > 8 && deltaY > deltaX) {
        // User is scrolling the page vertically! Do not hijack scroll.
        touchStartRef.current.isHorizontal = false;
        setIsDragging(false);
        return;
      } else if (deltaX > 8 && deltaX > deltaY) {
        // User is intentionally sliding left/right to compare
        touchStartRef.current.isHorizontal = true;
        setIsDragging(true);
      }
    }

    if (touchStartRef.current.isHorizontal) {
      handleMove(currentX);
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto my-6 px-4 select-none">
      <div className="text-center mb-4">
        <span className="inline-block px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-[#16A34A] text-[11px] font-bold tracking-wider uppercase mb-1.5">
          Live Split Comparison
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Before vs After <span className="text-[#16A34A]">Installation</span>
        </h3>
        <p className="text-xs text-[#16A34A] mt-1 font-semibold">
          Drag the slider handle ⇄ left or right
        </p>
      </div>

      {/* 9:16 Aspect Ratio Frame - touch-pan-y permits smooth page scrolling */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-xl border border-slate-200 cursor-ew-resize touch-pan-y ring-1 ring-slate-100"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {/* AFTER IMAGE (Solution - Background) */}
        <img 
          src={afterImage} 
          alt="After D-VIEW Invisible Safety" 
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
        <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-emerald-300 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold shadow-md z-10 pointer-events-none">
          AFTER: Safe & Open
        </span>

        {/* BEFORE IMAGE (Problem - Clipped Top Layer) */}
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none z-10 select-none"
          style={{ width: `${sliderPos}%` }}
        >
          <img 
            src={beforeImage} 
            alt="Before Installation Danger" 
            className="absolute inset-0 w-full h-full object-cover max-w-none select-none pointer-events-none"
            style={{ width: containerWidth ? `${containerWidth}px` : '100%' }}
            draggable={false}
            loading="lazy"
            decoding="async"
          />
          <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-rose-300 text-rose-800 text-xs px-2.5 py-1 rounded-full font-bold shadow-md pointer-events-none whitespace-nowrap">
            BEFORE: Danger & Fear
          </span>
        </div>

        {/* Divider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl pointer-events-none z-20"
          style={{ left: `${sliderPos}%` }}
        >
          <div
            role="slider"
            tabIndex={0}
            aria-valuenow={Math.round(sliderPos)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Balcony before and after installation comparison slider"
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setSliderPos((prev) => Math.max(0, prev - 5));
              } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                setSliderPos((prev) => Math.min(100, prev + 5));
              } else if (e.key === 'Home') {
                e.preventDefault();
                setSliderPos(0);
              } else if (e.key === 'End') {
                e.preventDefault();
                setSliderPos(100);
              }
            }}
            className={`pointer-events-auto absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-900 font-black text-sm flex items-center justify-center border-2 border-[#16A34A] shadow-2xl transition-transform cursor-ew-resize focus:outline-none focus:ring-4 focus:ring-emerald-400/60 ${
              isDragging ? 'scale-110 ring-4 ring-emerald-400/40' : ''
            }`}
          >
            ⇄
          </div>
        </div>
      </div>

      {/* Problem vs Solution Comparison Text Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-left">
          <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wide">Before Case</p>
          <p className="text-xs font-semibold text-rose-900 mt-0.5">
            Low railing danger & bird infestation
          </p>
        </div>
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-left">
          <p className="text-[10px] font-bold text-[#16A34A] uppercase tracking-wide">With D-VIEW</p>
          <p className="text-xs font-semibold text-emerald-900 mt-0.5">
            Engineered child-safe invisible protection
          </p>
        </div>
      </div>
    </div>
  );
}

export { BeforeAfterSlider };

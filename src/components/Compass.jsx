import React, { useRef, useState, useEffect } from 'react';
import useCompassHeading from '../hooks/useCompassHeading';

/**
 * Compass component
 * - Rotates the dial ring so N always points to True North while needle stays fixed pointing up.
 * - Mobile: 72px diameter; Tablet/Desktop: 96px diameter.
 * - Shows numeric heading and 8-sector cardinal (e.g. "142° SE").
 * - Supports iOS 13+ permission prompt, Android orientation, and desktop drag fallback.
 */
function Compass({ className = '' }) {
  const {
    heading,
    cardinal,
    isFallback,
    needsPermission,
    requestPermission,
    setManualHeading,
    dialRef,
  } = useCompassHeading();

  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);

  // Drag interaction for desktop fallback
  const handlePointerDown = (e) => {
    if (!isFallback) return;
    isDraggingRef.current = true;
    updateHeadingFromEvent(e);
  };

  const updateHeadingFromEvent = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);

    if (clientX == null || clientY == null) return;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    // atan2 gives angle from positive x-axis (East), convert to clockwise from North
    let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;
    setManualHeading(deg);
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (isDraggingRef.current) {
        updateHeadingFromEvent(e);
      }
    };
    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isFallback]);

  return (
    <div
      className={`relative flex flex-col items-center select-none ${className}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Compass Dial Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        className={`relative w-[72px] h-[72px] md:w-[96px] md:h-[96px] rounded-full p-[2px] transition-transform ${isFallback ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
        title={isFallback ? 'Drag to rotate dial' : `${heading}° ${cardinal}`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
          aria-label="Compass"
        >
          {/* Dial Base / Background */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="var(--theme-blur-layer, #004443)"
            fillOpacity="0.88"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="1.5"
          />

          {/* ROTATABLE DIAL (Ring + Tick marks + Cardinal letters rotate with -heading) */}
          <g
            ref={dialRef}
            className="compass-dial-ring"
            style={{
              transform: `rotate(${-heading}deg)`,
              transformOrigin: '50px 50px',
              willChange: 'transform',
            }}
          >
            {/* Outer track */}
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1"
            />

            {/* Minor & Major Ticks (every 30 degrees) */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="50"
                y1={deg % 90 === 0 ? '7' : '10'}
                x2="50"
                y2={deg % 90 === 0 ? '14' : '13'}
                stroke={deg === 0 ? '#FF6B4A' : 'rgba(255, 255, 255, 0.7)'}
                strokeWidth={deg % 90 === 0 ? '1.8' : '1'}
                transform={`rotate(${deg} 50 50)`}
              />
            ))}

            {/* Cardinal Letters */}
            {/* N */}
            <text
              x="50"
              y="22"
              textAnchor="middle"
              fill="#FF7043"
              fontSize="9"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              N
            </text>
            {/* E */}
            <text
              x="79"
              y="53.5"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="8.5"
              fontWeight="600"
              fontFamily="sans-serif"
            >
              E
            </text>
            {/* S */}
            <text
              x="50"
              y="84"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="8.5"
              fontWeight="600"
              fontFamily="sans-serif"
            >
              S
            </text>
            {/* W */}
            <text
              x="21"
              y="53.5"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="8.5"
              fontWeight="600"
              fontFamily="sans-serif"
            >
              W
            </text>
          </g>

          {/* FIXED NEEDLE (Points straight up to screen top, NEVER rotates) */}
          <g className="fixed-needle">
            {/* North half - vibrant orange arrow */}
            <path
              d="M 50,22 L 53.5,49 L 46.5,49 Z"
              fill="#FF6036"
              stroke="#D33812"
              strokeWidth="0.5"
            />
            {/* South half - clean white arrow */}
            <path
              d="M 50,78 L 53.5,51 L 46.5,51 Z"
              fill="#FFFFFF"
              stroke="#B0BEC5"
              strokeWidth="0.5"
            />
            {/* Pivot Center Pin */}
            <circle cx="50" cy="50" r="3.5" fill="#FFFFFF" stroke="#004443" strokeWidth="1.2" />
            <circle cx="50" cy="50" r="1.5" fill="#FF6036" />
          </g>
        </svg>

        {/* iOS Permission Button (if device requires user tap gesture) */}
        {needsPermission && (
          <button
            onClick={requestPermission}
            className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center justify-center rounded-full bg-[var(--theme-bottom)]/95 text-[10px] text-white font-semibold text-center p-1 border border-white/40 shadow-lg hover:bg-[var(--theme-route-box)] transition-colors"
          >
            Enable compass
          </button>
        )}
      </div>

      {/* Heading Readout & State Label */}
      <div className="mt-1 flex flex-col items-center">
        <span className="text-[11px] md:text-xs font-semibold tracking-wider text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          {Math.round(heading)}° {cardinal}
        </span>
        {isFallback && !needsPermission && (
          <span className="text-[9px] text-[var(--theme-route-title)]/80 tracking-tight leading-none text-center">
            No sensor — north up
          </span>
        )}
      </div>
    </div>
  );
}

export default Compass;

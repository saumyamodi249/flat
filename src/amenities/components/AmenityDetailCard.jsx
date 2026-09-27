import React from "react";
import { AMENITY_ICONS } from "../data";

function AmenityDetailCard({ amenity, onOpenModal }) {
  if (!amenity) return null;

  const iconSrc = amenity.icon || AMENITY_ICONS[amenity.id];

  return (
    <div className="w-[300px] sm:w-[325px] bg-[var(--theme-amenity-bg,#002E2D)]/90 backdrop-blur-md border border-[var(--theme-amenity-border)]/30 rounded-[14px] p-4 text-[var(--theme-amenity-text)] shadow-2xl transition-all duration-300 pointer-events-auto select-none animate-fadeIn">
      {/* Amenity Title */}
      <h3 className="text-xl font-semibold text-[var(--theme-amenity-text)] tracking-tight leading-snug truncate">
        {amenity.label || amenity.name}
      </h3>

      {/* Amenity Badge & Icon */}
      <div className="flex items-center gap-[6px] mt-2 text-[var(--theme-amenity-text)]/80">
        {iconSrc && (
          <span
            aria-hidden="true"
            className="w-4 h-4 shrink-0 inline-block"
            style={{
              maskImage: `url("${iconSrc}")`,
              WebkitMaskImage: `url("${iconSrc}")`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              backgroundColor: "var(--theme-amenity-border, #C09973)",
            }}
          />
        )}
        <span className="text-xs font-bold text-[var(--theme-amenity-border)] uppercase tracking-wider">
          Riviera Select Amenity
        </span>
      </div>

      {/* Horizontal Divider */}
      <div className="h-[0.5px] bg-[var(--theme-amenity-line)]/40 my-3" />

      {/* View Fullscreen / Preview Button */}
      {onOpenModal && (
        <button
          type="button"
          onClick={() => onOpenModal(amenity)}
          className="w-full py-2.5 px-4 rounded-[8px] bg-[var(--theme-amenity-button-selected-bg,#C09973)] hover:opacity-90 active:scale-[0.98] text-[var(--theme-amenity-left)] flex items-center justify-center gap-2 transition-all cursor-pointer font-medium text-sm shadow-sm"
        >
          View Fullscreen
        </button>
      )}
    </div>
  );
}

export default AmenityDetailCard;

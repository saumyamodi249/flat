import React, { useState } from "react";
import { IoLocationOutline, IoCloseCircleOutline } from "react-icons/io5";
import { mapUI, CATEGORY_ICONS } from "../data";

function MapDetailCard({ place, onOpenStreetView, onClose }) {
  const [loading360, setLoading360] = useState(false);

  if (!place) return null;

  const iconSrc = CATEGORY_ICONS[place.category] || "/map/icon/location.svg";

  const handleStreetViewClick = async () => {
    if (!onOpenStreetView) return;
    setLoading360(true);
    try {
      await onOpenStreetView(place);
    } finally {
      setLoading360(false);
    }
  };

  return (
    <div className="w-full bg-[var(--theme-map-street-view,#002E2D)]/95 backdrop-blur-md border border-[var(--theme-map-border,#C09973)]/30 rounded-[14px] p-3.5 sm:p-4 text-[var(--theme-map-text,#FFFFFF)] shadow-2xl transition-all duration-300 pointer-events-auto select-none animate-fadeIn">
      {/* Top Row: Location Title + Close Icon */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base sm:text-xl font-semibold text-[var(--theme-map-text,#FFFFFF)] tracking-tight leading-snug truncate">
          {place.name}
        </h3>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="text-[var(--theme-cancel,#F7E4CF)]/80 hover:text-white cursor-pointer shrink-0 p-0.5 transition-colors"
          >
            <IoCloseCircleOutline className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Category & Subtitle */}
      <div className="flex items-center gap-1.5 mt-2 text-[var(--theme-map-text,#FFFFFF)]/80">
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
            backgroundColor: "var(--theme-icon-color, #C09973)",
          }}
        />
        <span className="text-xs sm:text-sm font-medium text-[var(--theme-map-text,#FFFFFF)] capitalize">
          {place.categoryLabel || place.category}
        </span>
      </div>

      {/* Horizontal Divider */}
      <div className="h-[0.5px] bg-[var(--theme-map-line,#C09973)]/40 my-3" />

      {/* Travel Times — driven by mapUI.travel in data.js */}
      <div className="grid grid-cols-3 gap-2 py-0.5 text-center">
        {mapUI.travel.map(({ key, img, alt, fallback }) => (
          <div key={key} className="flex flex-col items-center">
            <img src={img} alt={alt} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
            <span className="text-xs sm:text-sm font-normal text-[var(--theme-map-text,#FFFFFF)] mt-1">
              {place.travel?.[key] || fallback}
            </span>
          </div>
        ))}
      </div>

      {/* Address */}
      {(place.address || place.subtitle) && (
        <div className="flex items-center gap-2 mt-3 text-[var(--theme-map-text,#FFFFFF)]/85">
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            <IoLocationOutline className="w-5 h-5 text-[var(--theme-map-text,#FFFFFF)]" />
          </div>
          <p className="text-xs sm:text-sm text-[var(--theme-map-text,#FFFFFF)] font-normal truncate">
            {place.address || place.subtitle}
          </p>
        </div>
      )}

      {/* 360° Street View Button */}
      <button
        type="button"
        onClick={handleStreetViewClick}
        disabled={loading360}
        className="w-full mt-3 sm:mt-4 py-2 sm:py-2.5 px-4 rounded-[8px] bg-[var(--theme-map-bg,#002E2D)] active:scale-[0.98] border border-[var(--theme-map-border,#C09973)] text-[var(--theme-route-map-button-title-selected-bg,#F7E4CF)] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-75"
      >
        {loading360 ? (
          <span className="font-semibold text-xs sm:text-sm tracking-wide text-[var(--theme-route-map-button-title-selected-bg,#F7E4CF)]">
            {mapUI.streetView.loadingLabel}
          </span>
        ) : (
          <>
            <img src={mapUI.streetView.img} alt={mapUI.streetView.alt} className="h-4 sm:h-5 object-contain" />
            <span className="font-semibold text-xs sm:text-sm tracking-wide text-[var(--theme-route-map-button-title-selected-bg,#F7E4CF)]">
              {mapUI.streetView.label}
            </span>
          </>
        )}
      </button>
    </div>
  );
}

export default MapDetailCard;

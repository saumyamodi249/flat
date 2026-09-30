import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { getStreetViewEmbedUrl } from "../../api/maps/mapsApi";

function StreetViewModal({ place, streetViewData, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!place) return null;

  // Real Google Maps embed street view / 360 viewer for the location
  const embedUrl = streetViewData?.embedUrl || getStreetViewEmbedUrl(place);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--theme-bg-blur)]/80 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl h-[75vh] max-h-[680px] bg-[var(--theme-map-street-view)] border border-[var(--theme-map-border)]/50 rounded-[14px] shadow-2xl overflow-hidden flex flex-col cursor-default"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--theme-map-border)]/30 bg-[var(--theme-map-street-view)]">
          <div>
            <h4 className="text-[var(--theme-map-text)] font-semibold text-base flex items-center gap-2">
              <span>{place.name}</span>
              <span className="text-xs text-[var(--theme-map-border)] font-normal border border-[var(--theme-map-border)]/40 px-2 py-0.5 rounded-full">
                360° View
              </span>
            </h4>
            <p className="text-xs text-[var(--theme-map-text)]/60 line-clamp-1">{place.address}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Street View"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[var(--theme-map-text)] hover:text-[var(--theme-route-map-button-title-selected-bg)] flex items-center justify-center transition-all cursor-pointer"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Street View / Map Embed Frame */}
        <div className="relative flex-1 w-full h-full bg-[var(--theme-bg-blur)]">
          <iframe
            src={embedUrl}
            title={`Street View of ${place.name}`}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

export default StreetViewModal;

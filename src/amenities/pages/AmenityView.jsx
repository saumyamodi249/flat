import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getAmenityById, amenityUI } from "../data";

function AmenityView() {
  const { category = "waiting-lounge" } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch current amenity matching route category
  const currentAmenity = useMemo(() => {
    return getAmenityById(category);
  }, [category]);

  // Reset loaded state on category change for smooth fade-in
  useEffect(() => {
    setIsLoaded(false);
  }, [category]);

  return (
    <div className="relative w-full h-full flex-1 min-h-0 rounded-[10px] overflow-hidden border border-[var(--theme-amenity-border)]/40 bg-[#081b1a] flex flex-col select-none">
      {/* High-Resolution Amenity Photo matching reference design */}
      <div className="relative flex-1 w-full h-full bg-[#081b1a] overflow-hidden">
        <img
          key={currentAmenity.id}
          src={currentAmenity.photo}
          alt={currentAmenity.label}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            setIsLoaded(true);
            e.currentTarget.src = "/Amenity/amenity-photos/01_waiting_lounge.svg";
          }}
          className={`w-full h-full object-cover select-none transition-opacity duration-300 ${
            isLoaded ? "opacity-100 animate-fadeIn" : "opacity-0"
          }`}
        />

        {/* Loading state while switching amenity photos */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-[#081b1a] flex flex-col items-center justify-center gap-3 text-[var(--theme-amenity-text)]/70">
            <div className="w-8 h-8 border-3 border-[var(--theme-amenity-border)] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-medium tracking-wide">{amenityUI.loading}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AmenityView;

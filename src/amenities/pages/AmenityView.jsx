import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getAmenityById, amenityUI } from "../data";

function AmenityView() {
  const { category = "waiting-lounge" } = useParams();
  const [loadedId, setLoadedId] = useState(null);

  // Fetch current amenity matching route category
  const currentAmenity = useMemo(() => {
    return getAmenityById(category);
  }, [category]);

  const isLoaded = loadedId === currentAmenity.id;

  return (
    <div className="relative w-full h-full flex-1 min-h-0 rounded-[14px] sm:rounded-[10px] overflow-hidden border border-[var(--theme-amenity-img-bg-border)] bg-[#081b1a] flex flex-col select-none shadow-md">
      {/* High-Resolution Amenity Photo matching reference design */}
      <div className="relative flex-1 w-full h-full bg-[#081b1a] overflow-hidden">
        <img
          key={currentAmenity.id}
          src={currentAmenity.img || currentAmenity.photo}
          alt={currentAmenity.label}
          onLoad={() => setLoadedId(currentAmenity.id)}
          onError={(e) => {
            setLoadedId(currentAmenity.id);
            e.currentTarget.src = "/Amenity/amenity-img/waiting_lounge.svg";
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

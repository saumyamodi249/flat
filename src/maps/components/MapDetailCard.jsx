import React, { useState } from "react";
import {
  IoLocationOutline,
  IoLeafOutline,
  IoSchoolOutline,
  IoMedicalOutline,
  IoGameControllerOutline,
  IoRestaurantOutline,
  IoBedOutline,
  IoBagHandleOutline,
} from "react-icons/io5";
import { HiOutlineBriefcase } from "react-icons/hi";
import { mapUI } from "../data";

const CATEGORY_ICONS = {
  all: IoLocationOutline,
  business: HiOutlineBriefcase,
  education: IoSchoolOutline,
  hospital: IoMedicalOutline,
  fun: IoGameControllerOutline,
  food: IoRestaurantOutline,
  hotel: IoBedOutline,
  mall: IoBagHandleOutline,
  parks: IoLeafOutline,
};

function MapDetailCard({ place, onOpenStreetView }) {
  const [loading360, setLoading360] = useState(false);

  if (!place) return null;

  const CategoryIcon = CATEGORY_ICONS[place.category] || IoLocationOutline;

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
    <div className="w-[300px] sm:w-[325px] bg-[var(--theme-map-street-view)] backdrop-blur-md border border-[var(--theme-map-border)]/20 rounded-[14px] p-4 text-[var(--theme-map-text)] shadow-2xl transition-all duration-300 pointer-events-auto select-none animate-fadeIn">
      {/* Location Title */}
      <h3 className="text-xl font-semibold text-[var(--theme-map-text)] tracking-tight leading-snug truncate">
        {place.name}
      </h3>

      {/* Category & Subtitle */}
      <div className="flex items-center gap-[6px] mt-2.5 text-[var(--theme-map-text)]/80">
        {place.icon ? (
          <span className="text-sm leading-none shrink-0">{place.icon}</span>
        ) : (
          <CategoryIcon className="w-4 h-4 text-[var(--theme-map-border)] shrink-0" />
        )}
        <span className="text-xs font-bold text-[var(--theme-map-text)] capitalize">
          {place.categoryLabel || place.category}
        </span>
      </div>

      {/* Horizontal Divider */}
      <div className="h-[0.5px] bg-[var(--theme-map-line)]/60 my-4" />

      {/* Travel Times — driven by mapUI.travel in data.js */}
      <div className="grid grid-cols-3 gap-[30px] py-0.5 text-center">
        {mapUI.travel.map(({ key, img, alt, fallback }) => (
          <div key={key} className="flex flex-col items-center">
            <img src={img} alt={alt} className="w-6 h-6" />
            <span className="text-sm font-normal text-[var(--theme-map-text)] mt-1.5">
              {place.travel?.[key] || fallback}
            </span>
          </div>
        ))}
      </div>

      {/* Address — only when dynamically resolved from user's map click */}
      {place.address && (
        <div className="flex items-center gap-2.5 mt-4 text-[var(--theme-map-text)]/80">
          <div className="w-6 h-6 flex items-center justify-center shrink-0">
            <IoLocationOutline className="w-6 h-6 text-[var(--theme-map-text)]" />
          </div>
          <p className="text-sm text-[var(--theme-map-text)] font-normal truncate">
            {place.address}
          </p>
        </div>
      )}

      {/* 360° Street View Button — content from mapUI.streetView in data.js */}
      <button
        type="button"
        onClick={handleStreetViewClick}
        disabled={loading360}
        className="w-full mt-4 py-[12px] px-[69px] rounded-[8px] bg-[var(--theme-map-bg)] active:scale-[0.98] border-[1px] border-[var(--theme-map-border)] text-[var(--theme-route-map-button-title-selected-bg)] flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm disabled:opacity-75"
      >
        {loading360 ? (
          <span className="font-semibold text-sm tracking-wide text-[var(--theme-route-map-button-title-selected-bg)]">
            {mapUI.streetView.loadingLabel}
          </span>
        ) : (
          <>
            <img src={mapUI.streetView.img} alt={mapUI.streetView.alt} className="h-5" />
            <span className="font-semibold text-sm tracking-wide text-[var(--theme-route-map-button-title-selected-bg)]">
              {mapUI.streetView.label}
            </span>
          </>
        )}
      </button>
    </div >
  );
}

export default MapDetailCard;

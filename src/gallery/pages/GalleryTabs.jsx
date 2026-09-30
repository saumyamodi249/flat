import React from "react";
import { NavLink } from "react-router-dom";
import { galleryTabs } from "../data";

function GalleryTabs() {
  return (
    <div className="flex items-center justify-center gap-[8.5px] sm:gap-3 md:gap-[12px] w-full max-w-full sm:mb-4 md:mb-[20px] select-none">
      {galleryTabs.map((tab) => (
        <NavLink
          key={tab.id}
          to={tab.path}
          className={({ isActive }) =>
            `text-center px-[15px] sm:px-[22px] md:px-[25px] py-2.5 sm:py-2.5 md:py-[15px] rounded-[6px] sm:rounded-[10px] text-xs sm:text-sm md:text-base font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${isActive
              ? "bg-[var(--theme-gallery-tab-selected-bg,#C09973)] text-white shadow-md"
              : "text-white/80 hover:text-[var(--theme-gallery-tab-hover-text,#F7E4CF)]"
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}

export default GalleryTabs;

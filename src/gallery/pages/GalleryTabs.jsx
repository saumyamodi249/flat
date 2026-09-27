import React from "react";
import { NavLink } from "react-router-dom";
import { galleryTabs } from "../data";

function GalleryTabs() {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-6 w-full max-w-full mb-4 sm:mb-6 md:mb-8 select-none">
      {galleryTabs.map((tab) => (
        <NavLink
          key={tab.id}
          to={tab.path}
          className={({ isActive }) =>
            `text-center px-4 py-2 md:px-[25px] md:py-[12px] rounded-[10px] text-xs sm:text-sm md:text-base font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap shrink ${
              isActive && tab.id === "interior"
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

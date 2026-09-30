import React from "react";
import { NavLink } from "react-router-dom";
import { aboutTabs } from "../data";

function AboutTabs() {
  return (
    <div className="flex items-center justify-center gap-[8.5px] sm:gap-3 md:gap-6 w-full max-w-full mb-4 sm:mb-6 md:mb-[70px] select-none">
      {aboutTabs.map((tab) => (
        <NavLink
          key={tab.id}
          to={tab.path}
          className={({ isActive }) =>
            `text-center px-[15px] py-2.5 sm:px-4 sm:py-2 md:px-[25px] md:py-[15px] rounded-[10px] text-xs sm:text-sm md:text-base font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap shrink ${isActive
              ? "bg-[var(--theme-route-about-button-bg)] text-[var(--theme-route-about-button-title-selected-bg)] shadow-md"
              : "text-[var(--theme-route-about-button-title-default-bg)]/80 hover:text-[var(--theme-route-about-button-title-default-bg)]"
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}

export default AboutTabs;

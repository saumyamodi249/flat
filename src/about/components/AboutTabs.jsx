import React from "react";
import { NavLink } from "react-router-dom";
import { aboutTabs } from "../data";

function AboutTabs() {
  return (
    <div className="flex items-center gap-2 sm:gap-4 p-1 rounded-xl bg-black/20 backdrop-blur-sm border border-white/5">
      {aboutTabs.map((tab) => (
        <NavLink
          key={tab.id}
          to={tab.path}
          className={({ isActive }) =>
            `px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-[var(--theme-route-about-button-bg)] text-[var(--theme-route-about-button-title-selected-bg)] shadow-md scale-100"
                : "text-[var(--theme-route-about-button-title-default-bg)]/80 hover:text-[var(--theme-route-about-button-title-default-bg)] hover:bg-white/10"
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

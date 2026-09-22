import React from "react";
import { aboutData } from "../data";
import AboutSiteDetails from "./AboutSiteDetails";

function Developer() {
  const data = aboutData.developer;

  return (
    <div className="w-full flex flex-col justify-between h-full">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-[var(--theme-about-title-main)] uppercase mb-4 sm:mb-6">
        {data.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
        <div className="w-full h-64 sm:h-72 md:h-80 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#0c2a5b] flex items-center justify-center">
          <img
            src={data.image}
            alt={data.imageAlt}
            className="w-full h-full object-cover select-none hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        <div className="flex flex-col justify-center space-y-3 sm:space-y-4 text-left">
          <h3 className="text-xl sm:text-2xl font-semibold text-[var(--theme-about-title)] tracking-wide">
            {data.subtitle}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-[var(--theme-about-description)]/90 font-light leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>

      <AboutSiteDetails details={data.siteDetails} />
    </div>
  );
}

export default Developer;

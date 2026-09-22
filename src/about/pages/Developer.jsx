import React from "react";
import { aboutData } from "../data";
import AboutTabs from "./AboutTabs";
import SiteDetails from "../components/SiteDetails";

function Developer() {
  const data = aboutData.developer;

  return (
    <div className="w-full max-w-full flex flex-col ">
      {/* Centered Tabs with zero extra bottom margin */}
      <div className="flex justify-center w-full max-w-full">
        <AboutTabs />
      </div>

      {/* Main Content: Wrapper Container */}
      <div className="flex flex-col w-full ">
        {/* 1st Main Div: Just Title */}
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-[30px] font-semibold tracking-normal text-[var(--theme-about-title-main)] uppercase">
            {data.title}
          </h2>
        </div>

        {/* 2nd Main Div: Row container for Image (left) and Text content (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start w-full">
          {/* Inside 2nd Div -> 1st Child: Image only */}
          <div className="w-full h-64 sm:h-80 md:h-96 rounded-[8px] overflow-hidden shadow-2xl border border-white/10 bg-[#0d2240] flex items-center justify-center p-4 shrink-0">
            <img
              src={data.image}
              alt={data.imageAlt}
              className="w-full h-full object-contain select-none hover:scale-102 transition-transform duration-500 ease-out"
            />
          </div>

          {/* Inside 2nd Div -> 2nd Child: Right Column with Title & Description */}
          <div className="flex flex-col space-y-3 sm:space-y-4">
            {/* 2nd Child -> 1st sub-div: Subtitle */}
            <div>
              <h3 className="text-3xl font-semibold text-[var(--theme-about-title)] tracking-wide">
                {data.subtitle}
              </h3>
            </div>

            {/* 2nd Child -> 2nd sub-div: Description */}
            <div>
              <p className="text-lg text-[var(--theme-about-description)] font-light leading-relaxed whitespace-pre-line">
                {data.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Site Details on all viewports */}
      <div className="mt-[50px]">
        <SiteDetails details={data.siteDetails} />
      </div>
    </div>
  );
}

export default Developer;

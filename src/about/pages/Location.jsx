import React from "react";
import { aboutData } from "../data";
import AboutTabs from "./AboutTabs";
import SiteDetails from "../components/SiteDetails";

function Location() {
  const data = aboutData.location;

  return (
    <div className="w-full max-w-full flex flex-col h-full min-h-0">
      {/* Centered Tabs with zero extra bottom margin */}
      <div className="flex justify-center w-full max-w-full shrink-0">
        <AboutTabs />
      </div>

      {/* Inner Scrollable Container */}
      <div className="w-full flex-1 min-h-0 overflow-y-auto scrollbar-none flex flex-col">
        {/* 1st Main Div: Just Title */}
        <div>
          <h2 className="text-lg sm:text-3xl lg:text-4xl mb-2.5 sm:mb-[30px] lg:mb-[30px] font-semibold tracking-normal text-[var(--theme-about-title-main)] uppercase">
            {data.title}
          </h2>
        </div>

        {/* 2nd Main Div: Row container for Map (left) and Text content (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-6 lg:gap-10 items-start w-full">
          {/* Inside 2nd Div -> 1st Child: Map only */}
          <div className="w-full h-44 sm:h-72 md:h-80 lg:h-96 rounded-[8px] overflow-hidden shadow-2xl border border-white/10 bg-[var(--theme-bg-blur)]/20 shrink-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d771.391519637442!2d72.61096364588012!3d23.119886328808533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e82296f9e7abf%3A0x9f0fa0efc3bcb29e!2sCluster_chandkheda%2016%2C%208%2C%20Sardar%20Patel%20Ring%20Rd%2C%20nr.%20Tapovan%20Circle%2C%20Nigam%20Nagar%2C%20Chandkheda%2C%20Ahmedabad%2C%20Gujarat%20382424!5e0!3m2!1sen!2sin!4v1790148770082!5m2!1sen!2sin"
              className="block w-full h-full border-0 rounded-[8px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Riviera Select Location"
            />
          </div>

          {/* Inside 2nd Div -> 2nd Child: Right Column with Title & Description */}
          <div className="flex flex-col space-y-[10px]  sm:space-y-4">
            {/* 2nd Child -> 1st sub-div: Subtitle */}
            <div>
              <h3 className="text-base lg:text-3xl font-semibold text-[var(--theme-about-title)] tracking-wide">
                {data.subtitle}
              </h3>
            </div>

            {/* 2nd Child -> 2nd sub-div: Description */}
            <div>
              <p className="text-base sm:text-base lg:text-lg text-[var(--theme-about-description)] font-light leading-relaxed whitespace-pre-line">
                {data.description}
              </p>
            </div>
          </div>
        </div>

        {/* Site Details on all viewports */}
        <div className="mt-2.5 sm:mt-6 lg:mt-[50px]">
          <SiteDetails details={data.siteDetails} />
        </div>
      </div>
    </div>
  );
}

export default Location;

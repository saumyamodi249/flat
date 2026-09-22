import React from "react";
import { aboutData } from "../data";
import AboutTabs from "./AboutTabs";
import SiteDetails from "../components/SiteDetails";

function Location() {
  const data = aboutData.location;

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

        {/* 2nd Main Div: Row container for Map (left) and Text content (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start w-full">
          {/* Inside 2nd Div -> 1st Child: Map only */}
          <div className="w-full h-64 sm:h-80 md:h-96 rounded-[8px] overflow-hidden shadow-2xl border border-white/10 bg-black/20 shrink-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.3544891672573!2d72.60753977477313!3d23.120714512659678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8397fc2e08f1%3A0xc006497fc468a78c!2sDwarkesh%20Peninsula!5e0!3m2!1sen!2sin!4v1788346684939!5m2!1sen!2sin"
              className="block w-full h-full border-0 rounded-[8px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Dwarkesh Peninsula Location"
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
        <SiteDetails />
      </div>
    </div>
  );
}

export default Location;

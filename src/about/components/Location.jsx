import React from "react";
import { aboutData } from "../data";
import AboutSiteDetails from "./AboutSiteDetails";

function Location() {
  const data = aboutData.location;

  return (
    <div className="w-full flex flex-col justify-between h-full">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-[var(--theme-about-title-main)] uppercase mb-4 sm:mb-6">
        {data.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
        <div className="w-full h-64 sm:h-72 md:h-80 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.3544891672573!2d72.60753977477313!3d23.120714512659678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8397fc2e08f1%3A0xc006497fc468a78c!2sDwarkesh%20Peninsula!5e0!3m2!1sen!2sin!4v1788346684939!5m2!1sen!2sin"
            className="block w-full h-full min-h-[260px] sm:min-h-[300px] border-0 rounded-xl"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Dwarkesh Peninsula Location"
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

export default Location;

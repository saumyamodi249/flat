import React from "react";
import { amenitiesData } from "../data";
import AmenitiesTabs from "./AmenitiesTabs";

function Outdoor() {
  const data = amenitiesData.outdoor;

  return (
    <div className="w-full max-w-full flex flex-col select-none">
      {/* Centered Tabs */}
      <div className="flex justify-center w-full max-w-full">
        <AmenitiesTabs />
      </div>

      {/* Main Content: Wrapper Container */}
      <div className="flex flex-col w-full">
        {/* Title */}
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-[30px] font-semibold tracking-normal text-[var(--theme-about-title-main)] uppercase">
            {data.title}
          </h2>
        </div>

        {/* 2-Column Row for Image (left) and Text Content (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start w-full">
          {/* Left Column: Image */}
          <div className="w-full h-64 sm:h-80 md:h-96 rounded-[8px] overflow-hidden shadow-2xl border border-white/10 bg-black/20 shrink-0">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right Column: Details & Features */}
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <div>
              <h3 className="text-3xl font-semibold text-[var(--theme-about-title)] tracking-wide">
                {data.subtitle}
              </h3>
            </div>

            <div>
              <p className="text-lg text-[var(--theme-about-description)] font-light leading-relaxed whitespace-pre-line">
                {data.description}
              </p>
            </div>

            {/* Feature List Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {data.features.map((item, i) => (
                <div
                  key={i}
                  className="p-3 rounded-[8px] bg-black/30 border border-white/10 flex flex-col gap-1"
                >
                  <span className="text-sm font-semibold text-[var(--theme-about-title)]">
                    {item.name}
                  </span>
                  <span className="text-xs text-[var(--theme-about-description)] font-light">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Outdoor;

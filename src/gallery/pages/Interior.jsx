import React from "react";
import { portfolioData } from "../data";

function Interior() {
  return (
    <div className="w-full max-w-full flex flex-col h-full min-h-0 select-none">
      {/* Scrollable Gallery Content Area */}
      <div className="w-full flex-1 min-h-0 overflow-y-auto scrollbar-none flex flex-col pr-0.5 sm:pr-1 pb-6">
        {/* 6-Column Grid Layout matching past specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 w-full">
          {portfolioData.map((item) => (
            <div
              key={item.id}
              className={`${item.className} relative rounded-xl lg:rounded-md overflow-hidden border border-white/10 bg-[#081b1a] shadow-md`}
            >
              <img
                src={item.image}
                alt={`${item.category} ${item.id}`}
                className="w-full h-auto block select-none"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/Amenity/amenity-img/waiting_lounge.svg";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Interior;

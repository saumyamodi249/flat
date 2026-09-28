import React from "react";
import { allGalleryData } from "../data";

function All() {
  return (
    <div className="w-full max-w-full flex flex-col h-full min-h-0 select-none">
      {/* Scrollable Gallery Content Area */}
      <div className="w-full flex-1 min-h-0 overflow-y-auto scrollbar-none flex flex-col pr-1 pb-4">
        {/* 6-Column Grid Layout matching Interior specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 w-full">
          {allGalleryData.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className={`${item.className} relative rounded-[10px] overflow-hidden border border-white/10 bg-[#081b1a] shadow-lg min-h-[200px] sm:min-h-[240px]`}
            >
              <img
                src={item.image}
                alt={`${item.category} ${item.id}`}
                className="w-full h-full object-cover select-none"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/Amenity/amenity-photos/01_waiting_lounge.svg";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default All;

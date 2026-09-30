import React from "react";
import { allGalleryData } from "../data";

function All() {
  return (
    <div className="w-full max-w-full flex flex-col h-full min-h-0 select-none">
      {/* Scrollable Gallery Content Area */}
      <div className="w-full flex-1 min-h-0 overflow-y-auto scrollbar-none flex flex-col pr-1 pb-6">
        {/* 6-Column Responsive Grid Layout matching Exterior / Interior / Amenities */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 w-full [grid-auto-flow:dense]">
          {allGalleryData.map((item, idx) => (
            <div
              key={`${item.category}-${item.id}-${idx}`}
              className={`${item.className} relative rounded-[10px] overflow-hidden border border-white/10 bg-[#081b1a] shadow-lg min-h-[220px] sm:min-h-[260px]`}
            >
              <img
                src={item.image}
                alt={`${item.category} ${item.id}`}
                className="w-full h-full object-cover select-none"
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

export default All;

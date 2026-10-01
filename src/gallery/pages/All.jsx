import { allGalleryData } from "../data";

function All() {
  return (
    <div className="w-full max-w-full flex flex-col h-full min-h-0 select-none">
      {/* Scrollable Gallery Content Area */}
      <div className="w-full flex-1 min-h-0 overflow-y-auto scrollbar-none flex flex-col pr-0.5 sm:pr-1 pb-6">
        {/* 3-Column Responsive Grid Layout on Mobile, expanding on Desktop */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 auto-rows-[75px] xs:auto-rows-[85px] sm:auto-rows-[105px] md:auto-rows-[125px] lg:auto-rows-[135px] gap-1.5 sm:gap-2.5 md:gap-4 lg:gap-5 w-full [grid-auto-flow:dense]">
          {allGalleryData.map((item, idx) => (
            <div
              key={`${item.category}-${item.id}-${idx}`}
              className={`${item.className} relative rounded-[6px] sm:rounded-[10px] overflow-hidden border border-white/10 bg-[#081b1a] shadow-md`}
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

import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { GALLERY_ITEMS } from "../data";
import GalleryModal from "../components/GalleryModal";

function GalleryView() {
  const { category = "interior" } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);

  // Normalize category parameter
  const currentCategory = useMemo(() => {
    const cat = (category || "interior").toLowerCase();
    if (GALLERY_ITEMS[cat]) return cat;
    return "interior";
  }, [category]);

  const items = useMemo(() => {
    return GALLERY_ITEMS[currentCategory] || GALLERY_ITEMS.interior;
  }, [currentCategory]);

  return (
    <div className="relative w-full h-full flex-1 min-h-0 flex flex-col select-none">
      {/* 3-Column Responsive Grid with row-span and col-span matching reference designs */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-3.5 sm:gap-4 w-full h-full flex-1 min-h-0 overflow-y-auto md:overflow-hidden pr-0.5">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`relative overflow-hidden rounded-[10px] border border-white/10 bg-[#081b1a] shadow-lg group cursor-pointer transition-all duration-300 hover:border-[var(--theme-gallery-border,#C09973)]/60 ${
                item.rowSpan || "row-span-1"
              } ${item.colSpan || "col-span-1"} min-h-[180px] md:min-h-0`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Subtle hover gradient overlay with photo title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 sm:p-4">
                <span className="text-xs font-semibold text-[var(--theme-gallery-tab-hover-text,#F7E4CF)] tracking-wide uppercase">
                  {item.category}
                </span>
                <h4 className="text-white text-sm sm:text-base font-medium truncate mt-0.5">
                  {item.title}
                </h4>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal on Image Click */}
      {selectedItem && (
        <GalleryModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}

export default GalleryView;

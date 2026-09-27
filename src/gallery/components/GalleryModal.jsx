import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

function GalleryModal({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[85vh] max-h-[800px] bg-[var(--theme-gallery-bg,#002E2D)] border border-[var(--theme-gallery-border)]/50 rounded-[14px] shadow-2xl overflow-hidden flex flex-col cursor-default"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--theme-gallery-border)]/30 bg-[var(--theme-gallery-bg,#002E2D)] shrink-0">
          <div className="flex items-center gap-3">
            <h4 className="text-white font-semibold text-base flex items-center gap-2">
              <span>{item.title}</span>
              <span className="text-xs text-[var(--theme-gallery-border)] font-normal border border-[var(--theme-gallery-border)]/40 px-2.5 py-0.5 rounded-full capitalize">
                {item.category}
              </span>
            </h4>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Preview"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-[var(--theme-gallery-tab-hover-text,#F7E4CF)] flex items-center justify-center transition-all cursor-pointer"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Image Display */}
        <div className="relative flex-1 w-full h-full bg-black overflow-hidden flex items-center justify-center p-2">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain select-none"
          />
        </div>
      </div>
    </div>
  );
}

export default GalleryModal;

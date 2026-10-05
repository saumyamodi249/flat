import { useEffect } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

function AmenityModal({ amenity, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!amenity) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--theme-bg-blur)]/85 backdrop-blur-md cursor-pointer"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[80vh] max-h-[750px] bg-[var(--theme-amenity-bg)] border border-[var(--theme-amenity-border)]/50 rounded-[14px] shadow-2xl overflow-hidden flex flex-col cursor-default"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--theme-amenity-border)]/30 bg-[var(--theme-amenity-bg)]">
          <div className="flex items-center gap-3">
            <h4 className="text-[var(--theme-amenity-text)] font-semibold text-base flex items-center gap-2">
              <span>{amenity.label}</span>
              <span className="text-xs text-[var(--theme-amenity-border)] font-normal border border-[var(--theme-amenity-border)]/40 px-2 py-0.5 rounded-full">
                Amenity Preview
              </span>
            </h4>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Preview"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[var(--theme-amenity-text)] hover:text-[var(--theme-amenity-left)] flex items-center justify-center transition-all cursor-pointer"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Fullscreen Image Content */}
        <div className="relative flex-1 w-full h-full bg-[var(--theme-bg-blur)] overflow-hidden flex items-center justify-center">
          <img
            src={amenity.img || amenity.photo}
            alt={amenity.label}
            className="w-full h-full object-cover select-none"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AmenityModal;

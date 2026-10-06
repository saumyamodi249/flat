import { motion, AnimatePresence } from "framer-motion";
import {
  inventoryUI,
  inventoryPropertyTypes,
  inventoryExposures,
  inventoryPropertyStatuses,
} from "../data";
import useInventoryStore from "../store/useInventoryStore";

function MobileFilterModal(props) {
  const store = useInventoryStore();
  const isOpen = props.isOpen ?? store.isMobileFilterOpen;
  const onClose = props.onClose ?? (() => store.setIsMobileFilterOpen(false));
  const selectedPropertyType = props.selectedPropertyType ?? store.selectedPropertyType;
  const setSelectedPropertyType = props.setSelectedPropertyType ?? store.setSelectedPropertyType;
  const selectedExposure = props.selectedExposure ?? store.selectedExposure;
  const setSelectedExposure = props.setSelectedExposure ?? store.setSelectedExposure;
  const selectedStatus = props.selectedStatus ?? store.selectedStatus;
  const setSelectedStatus = props.setSelectedStatus ?? store.setSelectedStatus;
  const onShowFlats = props.onShowFlats ?? store.handleShowFlats;
  const onClearAll = props.onClearAll ?? store.handleClearAllMobile;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-start lg:hidden bg-black/60 backdrop-blur-sm overflow-y-auto"
        >
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-[var(--theme-inventory-bg-main)] border-b border-white/10 p-5 shadow-2xl flex flex-col text-white will-change-transform transform-gpu"
          >
        {/* Top Header: Filter Icon + Title + Close Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={inventoryUI.filterIconSrc}
              alt="Filter"
              className="w-5 h-5 object-contain"
            />
            <span className="text-base font-semibold text-white tracking-wide">
              {inventoryUI.filterTitle || "Filter"}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full border border-[var(--theme-inventory-cancel)] text-[var(--theme-inventory-cancel)] flex items-center justify-center cursor-pointer transition-colors active:scale-90 bg-transparent hover:bg-white/5"
            aria-label="Close Filter"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="2.5" y1="2.5" x2="9.5" y2="9.5" />
              <line x1="9.5" y1="2.5" x2="2.5" y2="9.5" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-[0.5px] bg-white/20 mt-3 mb-4.5" />

        {/* Section 1: Property Type */}
        <div className="flex flex-col gap-2.5 sm:gap-3 mb-5 sm:items-center">
          <span className="text-white text-sm font-medium w-full sm:max-w-md md:max-w-lg sm:text-center">
            {inventoryUI.propertyTypeLabel || "Property Type"}
          </span>
          <div className="w-full sm:max-w-md md:max-w-lg flex items-center justify-center gap-1 p-1.5 rounded-[10px] bg-[var(--theme-inventory-all-button)]">
            {inventoryPropertyTypes.map((type) => {
              const isSelected = selectedPropertyType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedPropertyType(type)}
                  className={`flex-1 py-2 px-2 sm:px-4 rounded-[8px] sm:rounded-[10px] text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer text-center whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? "bg-[var(--theme-inventory-tab-selected-bg)] text-white shadow-sm"
                      : "text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-hover-text)] hover:bg-white/10"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Exposure */}
        <div className="flex flex-col gap-2.5 sm:gap-3 mb-5 sm:items-center">
          <span className="text-white text-sm font-medium w-full sm:max-w-md md:max-w-lg sm:text-center">
            {inventoryUI.exposureLabel || "Exposure"}
          </span>
          <div className="w-full sm:max-w-md md:max-w-lg flex items-center justify-center gap-1 p-1.5 rounded-[10px] bg-[var(--theme-inventory-all-button)]">
            {inventoryExposures.map((exp) => {
              const isSelected = selectedExposure === exp;
              return (
                <button
                  key={exp}
                  type="button"
                  onClick={() => setSelectedExposure(exp)}
                  className={`flex-1 py-2 px-2 sm:px-4 rounded-[8px] sm:rounded-[10px] text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer text-center active:scale-95 ${
                    isSelected
                      ? "bg-[var(--theme-inventory-tab-selected-bg)] text-white shadow-sm"
                      : "text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-hover-text)] hover:bg-white/10"
                  }`}
                >
                  {exp}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Property Status */}
        <div className="flex flex-col gap-2.5 sm:gap-3 mb-8 sm:mb-12 sm:items-center">
          <span className="text-white text-sm font-medium w-full sm:max-w-md md:max-w-lg sm:text-center">
            {inventoryUI.propertyStatusLabel || "Property Status"}
          </span>
          <div className="w-full sm:max-w-md md:max-w-lg flex items-center justify-center gap-1 p-1.5 rounded-[10px] bg-[var(--theme-inventory-all-button)]">
            {inventoryPropertyStatuses.map((status) => {
              const isSelected = selectedStatus === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSelectedStatus(status)}
                  className={`flex-1 py-2 px-1.5 sm:px-3 rounded-[8px] sm:rounded-[10px] text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer text-center whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? "bg-[var(--theme-inventory-tab-selected-bg)] text-white shadow-sm"
                      : "text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-hover-text)] hover:bg-white/10"
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions: Show Flats + Clear all (Centered) */}
        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={onShowFlats}
            className="border border-[#C09973]/70 bg-[var(--theme-inventory-all-button)] hover:bg-[#0c3325] hover:brightness-110 active:scale-95 text-white px-6 py-2.5 rounded-[10px] text-sm font-medium cursor-pointer transition-all shadow-md"
          >
            Show Flats
          </button>
          <button
            type="button"
            onClick={onClearAll}
            className="text-white hover:text-[var(--theme-inventory-tab-hover-text)] hover:bg-white/5 active:scale-95 px-4 py-2.5 rounded-[10px] text-sm font-medium cursor-pointer transition-all"
          >
            Clear all
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
  );
}

export default MobileFilterModal;

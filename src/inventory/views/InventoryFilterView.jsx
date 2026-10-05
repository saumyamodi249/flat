import { CiCircleChevLeft } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import InventoryPageDetail from "../pages/InventoryPageDetail";
import InventoryFilterControls from "../components/InventoryFilterControls";
import InventoryTable from "../components/InventoryTable";
import useInventoryStore from "../store/useInventoryStore";
import useInventoryData from "../hooks/useInventoryData";
import { inventoryUI } from "../data";

function InventoryFilterView() {
  const setIsFilterOpen = useInventoryStore((s) => s.setIsFilterOpen);
  const resetFilters = useInventoryStore((s) => s.resetFilters);
  const toggleFavoriteUnit = useInventoryStore((s) => s.toggleFavoriteUnit);
  const setSelectedUnitId = useInventoryStore((s) => s.setSelectedUnitId);

  const { activeUnit, filteredUnits } = useInventoryData();

  return (
    <div className="relative w-full h-full flex flex-col lg:flex-row overflow-hidden">
      {/* LEFT FILTER PANEL (40% Width) */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:w-[40%] h-full flex flex-col z-30 bg-[var(--theme-inventory-bg-main)] border-r border-white/10"
      >
        {/* Filter Top Header: Riviera Select Logo + Collapse Chevron Left (Sticky) */}
        <div className="shrink-0 flex items-center justify-between px-[30px] pt-[30px] pb-[20px]">
          <img
            src={inventoryUI.logoSrc}
            alt={inventoryUI.logoAlt}
            className="h-12 object-contain drop-shadow"
          />
          <button
            type="button"
            onClick={() => setIsFilterOpen(false)}
            className="cursor-pointer text-[var(--theme-inventory-filter-text)]"
            aria-label={inventoryUI.collapseFilterAria}
          >
            <CiCircleChevLeft className="w-8 h-8 mt-[20px]" />
          </button>
        </div>

        {/* Fixed Filter & Reset Bar — Always on page */}
        <div className="shrink-0 px-[50px] pb-4">
          <div className="flex items-center justify-between">
            {/* Div A: SVG and Filter text */}
            <div className="flex items-center gap-2.5">
              <img
                src={inventoryUI.filterIconSrc}
                alt={inventoryUI.filterTitle}
                className="w-6 h-6 object-contain"
              />
              <span className="text-[var(--theme-inventory-tab-default-text)] text-2xl font-medium tracking-wide">
                {inventoryUI.filterTitle}
              </span>
            </div>

            {/* Div B: Reset Filters button */}
            <div>
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-[10px] rounded-[10px] border border-[var(--theme-inventory-border)] text-sm font-medium text-[var(--theme-inventory-tab-selected-bg)] hover:text-[var(--theme-inventory-tab-hover-text)]"
              >
                {inventoryUI.resetFiltersText}
              </button>
            </div>
          </div>
        </div>

        {/* Left Panel Scrollable Container — Scroll starts below the sticky Filter Bar */}
        <div className="flex-1 min-h-0 w-full flex flex-col overflow-y-auto scrollbar-none pb-0 gap-5">
          {/* Filter Controls (Property Type, Exposure, Status, Area Range) powered by Zustand */}
          <InventoryFilterControls className="shrink-0 px-[30px] sm:px-[50px]" />

          {/* Flat Option: Table Area (Full width across left panel for wide column gap, no bottom padding) */}
          <InventoryTable
            units={filteredUnits}
            activeUnit={activeUnit}
            onSelectUnit={(u) => setSelectedUnitId(u.id)}
            onToggleFavorite={toggleFavoriteUnit}
          />
        </div>
      </motion.div>

      {/* RIGHT BUILDING AREA (60% Width) */}
      <div className="w-full lg:w-[60%] h-full relative flex items-center justify-center overflow-hidden bg-[var(--theme-inventory-img-bg)]">
        {/* Top-Right Favorite Circle Button */}
        <div className="hidden lg:block absolute top-[30px] right-[30px] z-30">
          <button
            type="button"
            aria-label={inventoryUI.wishlistAria}
            onClick={() => toggleFavoriteUnit(activeUnit?.id)}
            className="w-10 h-10 rounded-full border border-white/20 bg-[var(--theme-bg-blur)]/25 backdrop-blur-md flex items-center justify-center text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-default-text)] transition-all cursor-pointer shadow-lg"
          >
            {activeUnit?.isFavorite ? (
              <FaHeart className="w-4 h-4 text-[var(--theme-inventory-heart)]" />
            ) : (
              <FaRegHeart className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* 3D Isometric Building Perspective */}
        <div className="w-full h-full flex items-center justify-center p-4">
          <img
            src={inventoryUI.buildingSrc}
            alt={inventoryUI.buildingAlt}
            className="w-auto h-[82%] max-w-[95%] object-contain drop-shadow-2xl"
          />
        </div>

        {/* Right Floating Unit Card (VIEW 2) */}
        <div className="hidden lg:block absolute top-[90px] right-[30px] z-30 pointer-events-auto">
          <InventoryPageDetail
            unit={activeUnit}
            onToggleFavorite={toggleFavoriteUnit}
          />
        </div>
      </div>
    </div>
  );
}

export default InventoryFilterView;

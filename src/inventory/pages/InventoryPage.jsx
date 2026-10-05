import React, { useState, useMemo, useRef, useEffect } from "react";
import { CiCircleChevRight, CiCircleChevLeft, CiCircleChevDown } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import BottomNav from "../../components/BottomNav";
import InventoryPageDetail from "./InventoryPageDetail";
import InventoryFilterControls from "../components/InventoryFilterControls";
import InventoryTable from "../components/InventoryTable";
import MobileFlatsCarousel from "../components/MobileFlatsCarousel";
import MobileFilterModal from "../components/MobileFilterModal";
import {
  inventoryUI,
  inventoryTableHeaders,
  inventoryPropertyTypes,
  inventoryExposures,
  inventoryPropertyStatuses,
  inventoryAreaRange,
  inventoryUnits,
} from "../data";

function InventoryPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showFlatsCarousel, setShowFlatsCarousel] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showDesktopFilterView = isFilterOpen && isDesktop;

  const [selectedPropertyType, setSelectedPropertyType] = useState(inventoryPropertyTypes[0]);
  const [selectedExposure, setSelectedExposure] = useState(inventoryExposures[0]);
  const [selectedStatus, setSelectedStatus] = useState(inventoryPropertyStatuses[0]);
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");

  // Keep favorite IDs in state, while dynamically pulling fresh data from inventoryUnits
  const [favoriteUnitIds, setFavoriteUnitIds] = useState(() => {
    return new Set(inventoryUnits.filter((u) => u.isFavorite).map((u) => u.id));
  });

  // Units with favorite status derived from favoriteUnitIds

  const units = useMemo(() => {
    return inventoryUnits.map((u) => ({
      ...u,
      isFavorite: favoriteUnitIds.has(u.id),
    }));
  }, [favoriteUnitIds]);

  const [selectedUnit, setSelectedUnit] = useState(inventoryUnits[0]);

  // Active unit connected between table rows and detail card
  const activeUnit = useMemo(() => {
    const found = units.find(
      (u) =>
        u.id === selectedUnit?.id ||
        (u.unitNo && selectedUnit?.unitNo && u.unitNo.toLowerCase() === selectedUnit.unitNo.toLowerCase())
    );
    return found || selectedUnit || units[0];
  }, [units, selectedUnit]);

  // Toggle favorite for unit — only ONE favorite allowed at a time
  const toggleUnitFavorite = (id, e) => {
    if (e && typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }
    setFavoriteUnitIds((prev) => {
      // If already favorite, remove it
      if (prev.has(id)) {
        return new Set();
      }
      // Otherwise clear all and set only this one
      return new Set([id]);
    });
    // Auto-select the favorited unit so the detail card shows it
    const targetUnit = units.find((u) => u.id === id);
    if (targetUnit) {
      setSelectedUnit(targetUnit);
    }
  };

  // Reset Filters handler (desktop)
  const handleResetFilters = () => {
    setSelectedPropertyType(inventoryPropertyTypes[0]);
    setSelectedExposure(inventoryExposures[0]);
    setSelectedStatus(inventoryPropertyStatuses[0]);
    setMinArea("");
    setMaxArea("");
    setSelectedUnit(units[0]);
  };

  // Show Flats button handler (from Image 2 -> Image 3) — mobile/tablet only
  const handleShowFlats = () => {
    setIsMobileFilterOpen(false);
    setIsFilterOpen(false);
    setShowFlatsCarousel(true);
  };

  // Clear all button handler (Image 2) — mobile/tablet only
  const handleClearAll = () => {
    setSelectedPropertyType(inventoryPropertyTypes[0] || "Office");
    setSelectedExposure(inventoryExposures[0] || "N");
    setSelectedStatus(inventoryPropertyStatuses[0] || "All");
    setShowFlatsCarousel(false);
    setSelectedUnit(units[0]);
  };



  // Carousel units list (displayed when Show Flats is clicked) — mobile/tablet
  const carouselUnits = useMemo(() => {
    let list = units.filter((u) => {
      if (selectedPropertyType && u.propertyType?.toLowerCase() !== selectedPropertyType.toLowerCase()) {
        return false;
      }
      if (selectedStatus && selectedStatus !== "All" && u.status?.toLowerCase() !== selectedStatus.toLowerCase()) {
        return false;
      }
      if (selectedExposure && !u.exposure?.split(",").map((s) => s.trim()).includes(selectedExposure) && !u.exposure?.includes(selectedExposure)) {
        return false;
      }
      return true;
    });

    if (list.length === 0) {
      list = [...units];
    }

    // Place 801 / A-801 first to match Image 3 if present
    const a801Index = list.findIndex((u) => u.unitNo === "801" || u.unitNo === "A-801");
    if (a801Index > 0) {
      const a801 = list.splice(a801Index, 1)[0];
      list.unshift(a801);
    }

    return list;
  }, [units, selectedPropertyType, selectedStatus, selectedExposure]);

  // Filtered unit list based on user selections — desktop table
  const filteredUnits = useMemo(() => {
    return units.filter((u) => {
      if (selectedPropertyType && u.propertyType?.toLowerCase() !== selectedPropertyType.toLowerCase()) {
        return false;
      }
      if (selectedStatus && selectedStatus !== inventoryPropertyStatuses[0] && u.status?.toLowerCase() !== selectedStatus.toLowerCase()) {
        return false;
      }
      if (selectedExposure && !u.exposure?.split(",").map((s) => s.trim()).includes(selectedExposure) && !u.exposure?.includes(selectedExposure)) {
        return false;
      }
      if (minArea && u.area < Number(minArea)) {
        return false;
      }
      if (maxArea && u.area > Number(maxArea)) {
        return false;
      }
      return true;
    });
  }, [units, selectedPropertyType, selectedStatus, selectedExposure, minArea, maxArea]);

  // Sync selectedUnit with filtered units when filter changes
  useEffect(() => {
    if (filteredUnits.length > 0 && !filteredUnits.some((u) => u.id === selectedUnit?.id)) {
      setSelectedUnit(filteredUnits[0]);
    }
  }, [filteredUnits, selectedUnit]);

  return (
    <div className="relative flex flex-col justify-between h-[100dvh] max-h-[100dvh] w-full max-w-full overflow-hidden bg-[var(--theme-inventory-img-bg)] select-none">
      {/* Main Content Area */}
      <main className="relative flex-1 min-h-0 w-full flex flex-col overflow-hidden">
        {/* VIEW 1: INTRO VIEW (Always shown on mobile; shown on desktop/tablet when filter is closed) */}
        {!showDesktopFilterView ? (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            {/* Top Bar (Desktop): Logo */}
            <div className="relative z-30 hidden lg:flex items-center px-[30px] pt-[30px]">
              <img
                src={inventoryUI.logoSrc}
                alt={inventoryUI.logoAlt}
                className="h-12 object-contain drop-shadow"
              />
            </div>

            {/* Top-Right Favorite Circle Button (Desktop only >= 1024px) */}
            <div className="hidden lg:block absolute top-[30px] right-[30px] z-30">
              <button
                type="button"
                aria-label={inventoryUI.wishlistAria}
                onClick={() => toggleUnitFavorite(activeUnit?.id)}
                className="w-10 h-10 rounded-full border border-white/20 bg-[var(--theme-bg-blur)]/25 backdrop-blur-md flex items-center justify-center text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-default-text)] transition-all cursor-pointer shadow-lg"
              >
                {activeUnit?.isFavorite ? (
                  <FaHeart className="w-4 h-4 text-[var(--theme-inventory-heart)]" />
                ) : (
                  <FaRegHeart className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Top Bar (Mobile & Tablet): Phone Logo (left) + Center Filters Pill + Right Heart Button */}
            <div className="relative z-30 flex lg:hidden items-center justify-between px-5 pt-[25px] sm:px-[30px] sm:pt-[30px]">
              <div className="flex items-center">
                <img
                  src="/UI IMG/phone logo.svg"
                  alt="Riviera"
                  className="h-8 w-8 sm:h-10 sm:w-10 object-contain drop-shadow"
                />
              </div>

              {/* Center Filters Button (Matching laptop size, padding, and typography) */}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center gap-[10px] px-4 py-[10px] rounded-full border border-[var(--theme-inventory-filter-border)] text-[var(--theme-inventory-tab-default-text)] cursor-pointer hover:bg-white/5 active:scale-95 transition-all shadow-sm bg-[var(--theme-bg-blur)]/25 backdrop-blur-md"
              >
                <img
                  src={inventoryUI.filterIconSrc}
                  alt={inventoryUI.filterButtonText}
                  className="w-6 h-6 object-contain text-[var(--theme-inventory-filter-text)]"
                />
                <span className="text-normal font-medium tracking-wide text-[var(--theme-inventory-filter-text)]">
                  {inventoryUI.filterButtonText}
                </span>
                <CiCircleChevDown className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--theme-inventory-filter-text)]" />
              </button>

              {/* Right Wishlist Heart Button (1st Image) */}
              <button
                type="button"
                aria-label={inventoryUI.wishlistAria}
                onClick={() => toggleUnitFavorite(activeUnit?.id)}
                className="w-10 h-10 rounded-full border border-white/30 bg-black/25 backdrop-blur-md flex items-center justify-center text-white hover:text-white transition-all cursor-pointer shadow-lg active:scale-90"
              >
                {activeUnit?.isFavorite ? (
                  <FaHeart className="w-4 h-4 text-[var(--theme-inventory-heart,#FF4D4F)]" />
                ) : (
                  <FaRegHeart className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Left Floating Filters Button (Desktop only >= 1024px) */}
            <div className="hidden lg:block absolute top-20 left-12 z-30">
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center mt-[60px] gap-[10px] px-4 py-[10px] rounded-full border border-[var(--theme-inventory-filter-border)] text-[var(--theme-inventory-tab-default-text)] cursor-pointer hover:bg-white/5 transition-colors"
              >
                <img
                  src={inventoryUI.filterIconSrc}
                  alt={inventoryUI.filterButtonText}
                  className="w-6 h-6 object-contain text-[var(--theme-inventory-filter-text)]"
                />
                <span className="text-normal font-medium tracking-wide text-[var(--theme-inventory-filter-text)]">
                  {inventoryUI.filterButtonText}
                </span>
                <CiCircleChevRight className="w-8 h-8 text-[var(--theme-inventory-filter-text)]" />
              </button>
            </div>

            {/* Central 3D Building Perspective on Wireframe Floor */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4 pt-10 sm:pt-6 lg:pt-0 pb-10 sm:pb-12 lg:pb-0">
              <img
                src={inventoryUI.buildingSrc}
                alt={inventoryUI.buildingAlt}
                className="w-auto h-[82%] sm:h-[77%] lg:h-[84%] max-h-[72vh] sm:max-h-[80vh] lg:max-h-none max-w-[92%] sm:max-w-[95%] object-contain drop-shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Desktop Unit Card: Top-right (Desktop only >= 1024px) */}
            <div className="hidden lg:block absolute top-[90px] right-[30px] z-30 pointer-events-auto">
              <InventoryPageDetail
                unit={activeUnit}
                onToggleFavorite={toggleUnitFavorite}
              />
            </div>

            {/* Mobile & Tablet Unit Cards: Only visible after user clicks "Show Flats" */}
            {showFlatsCarousel && (
              <MobileFlatsCarousel
                units={carouselUnits}
                onToggleFavorite={toggleUnitFavorite}
              />
            )}

            {/* Mobile & Tablet Filter Modal (< 1024px) */}
            <MobileFilterModal
              isOpen={isMobileFilterOpen}
              onClose={() => setIsMobileFilterOpen(false)}
              selectedPropertyType={selectedPropertyType}
              setSelectedPropertyType={setSelectedPropertyType}
              selectedExposure={selectedExposure}
              setSelectedExposure={setSelectedExposure}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              onShowFlats={handleShowFlats}
              onClearAll={handleClearAll}
            />
          </div>
        ) : (
          /* VIEW 2: FILTER OPEN VIEW — Desktop only (40% Filter Panel + 60% Building Area) */
          <div className="relative w-full h-full flex flex-col lg:flex-row overflow-hidden">
            {/* LEFT FILTER PANEL (40% Width) */}
            <div className="w-full lg:w-[40%] h-full flex flex-col z-30 bg-[var(--theme-inventory-bg-main,#071B11)] border-r border-white/10">
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
                      onClick={handleResetFilters}
                      className="px-4 py-[10px] rounded-[10px] border border-[var(--theme-inventory-border)] text-sm font-medium text-[var(--theme-inventory-tab-selected-bg)] hover:text-[var(--theme-inventory-tab-hover-text)]"
                    >
                      {inventoryUI.resetFiltersText}
                    </button>
                  </div>
                </div>
              </div>

              {/* Left Panel Scrollable Container — Scroll starts below the sticky Filter Bar */}
              <div className="flex-1 min-h-0 w-full flex flex-col overflow-y-auto scrollbar-none">
                {/* Filter Controls (Property Type, Exposure, Status, Area Range) with dvh min-height so user can scroll down to flat options */}
                <InventoryFilterControls
                  selectedPropertyType={selectedPropertyType}
                  setSelectedPropertyType={setSelectedPropertyType}
                  selectedExposure={selectedExposure}
                  setSelectedExposure={setSelectedExposure}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                  minArea={minArea}
                  setMinArea={setMinArea}
                  maxArea={maxArea}
                  setMaxArea={setMaxArea}
                  className="shrink-0 px-[50px] pb-6 min-h-[calc(100dvh-240px)]"
                />

                {/* Flat Option: Table Area (Exactly 5 flats visible, isolated inner scroll) */}
                <InventoryTable
                  units={filteredUnits}
                  activeUnit={activeUnit}
                  onSelectUnit={setSelectedUnit}
                  onToggleFavorite={toggleUnitFavorite}
                />
              </div>
            </div>

            {/* RIGHT BUILDING AREA (60% Width) */}
            <div className="w-full lg:w-[60%] h-full relative flex items-center justify-center overflow-hidden bg-[var(--theme-inventory-img-bg)]">
              {/* Top-Right Favorite Circle Button */}
              <div className="hidden lg:block absolute top-[30px] right-[30px] z-30">
                <button
                  type="button"
                  aria-label={inventoryUI.wishlistAria}
                  onClick={() => toggleUnitFavorite(activeUnit?.id)}
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
                  onToggleFavorite={toggleUnitFavorite}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <footer className="relative w-full z-40 shrink-0 h-13 md:h-14">
        <BottomNav />
      </footer>
    </div>
  );
}

export default InventoryPage;

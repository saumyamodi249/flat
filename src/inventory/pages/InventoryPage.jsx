import React, { useState, useMemo, useRef, useEffect } from "react";
import { CiCircleChevRight, CiCircleChevLeft, CiCircleChevDown } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import BottomNav from "../../components/BottomNav";
import InventoryPageDetail from "./InventoryPageDetail";
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
  const [focusedThumb, setFocusedThumb] = useState("min");

  // Keep favorite IDs in state, while dynamically pulling fresh data from inventoryUnits
  const [favoriteUnitIds, setFavoriteUnitIds] = useState(() => {
    return new Set(inventoryUnits.filter((u) => u.isFavorite).map((u) => u.id));
  });

  // Carousel dragging refs for horizontal scroll on mobile
  const carouselRef = useRef(null);
  const isDraggingCarousel = useRef(false);
  const startXCarousel = useRef(0);
  const scrollLeftCarousel = useRef(0);

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

  // Computed range values and percentages for dual slider
  const currentMinVal = Math.max(
    inventoryAreaRange.min,
    Math.min(Number(minArea || inventoryAreaRange.min), inventoryAreaRange.max)
  );
  const currentMaxVal = Math.max(
    inventoryAreaRange.min,
    Math.min(Number(maxArea || inventoryAreaRange.max), inventoryAreaRange.max)
  );

  const minPercent =
    (currentMinVal - inventoryAreaRange.min) /
    (inventoryAreaRange.max - inventoryAreaRange.min);
  const maxPercent =
    (currentMaxVal - inventoryAreaRange.min) /
    (inventoryAreaRange.max - inventoryAreaRange.min);

  // Slider dragging refs & event handlers
  const sliderTrackRef = useRef(null);
  const isDraggingRef = useRef(null);
  const valuesRef = useRef({ currentMinVal, currentMaxVal });
  valuesRef.current = { currentMinVal, currentMaxVal };

  const updateThumbPosition = (thumbType, clientX) => {
    const track = sliderTrackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const usableWidth = rect.width - 16;
    const relativeX = clientX - rect.left - 8;
    const rawPct = usableWidth > 0 ? Math.max(0, Math.min(1, relativeX / usableWidth)) : 0;
    const rawVal = inventoryAreaRange.min + rawPct * (inventoryAreaRange.max - inventoryAreaRange.min);
    const steppedVal = Math.round(rawVal / inventoryAreaRange.step) * inventoryAreaRange.step;

    if (thumbType === "min") {
      const clamped = Math.max(inventoryAreaRange.min, Math.min(steppedVal, valuesRef.current.currentMaxVal));
      setMinArea(clamped === inventoryAreaRange.min ? "" : clamped.toString());
    } else {
      const clamped = Math.min(inventoryAreaRange.max, Math.max(steppedVal, valuesRef.current.currentMinVal));
      setMaxArea(clamped === inventoryAreaRange.max ? "" : clamped.toString());
    }
  };

  const startDragging = (thumbType, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFocusedThumb(thumbType);
    isDraggingRef.current = thumbType;

    const onPointerMove = (moveEvt) => {
      if (!isDraggingRef.current) return;
      updateThumbPosition(isDraggingRef.current, moveEvt.clientX);
    };

    const onPointerUp = () => {
      isDraggingRef.current = null;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  const handleTrackPointerDown = (e) => {
    e.preventDefault();
    const track = sliderTrackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const usableWidth = rect.width - 16;
    const relativeX = e.clientX - rect.left - 8;
    const rawPct = usableWidth > 0 ? Math.max(0, Math.min(1, relativeX / usableWidth)) : 0;
    const rawVal = inventoryAreaRange.min + rawPct * (inventoryAreaRange.max - inventoryAreaRange.min);
    const steppedVal = Math.round(rawVal / inventoryAreaRange.step) * inventoryAreaRange.step;

    const distMin = Math.abs(steppedVal - valuesRef.current.currentMinVal);
    const distMax = Math.abs(steppedVal - valuesRef.current.currentMaxVal);
    const targetThumb = distMin <= distMax ? "min" : "max";

    updateThumbPosition(targetThumb, e.clientX);
    startDragging(targetThumb, e);
  };

  useEffect(() => {
    return () => {
      isDraggingRef.current = null;
    };
  }, []);

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

  // Carousel dragging handlers for mobile left/right drag bar
  const handlePointerDown = (e) => {
    if (!carouselRef.current) return;
    isDraggingCarousel.current = true;
    startXCarousel.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftCarousel.current = carouselRef.current.scrollLeft;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingCarousel.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXCarousel.current) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftCarousel.current - walk;
  };

  const handlePointerUp = () => {
    isDraggingCarousel.current = false;
  };

  const handlePointerLeave = () => {
    isDraggingCarousel.current = false;
  };

  // Carousel units list (displayed when Show Flats is clicked) — mobile/tablet
  const carouselUnits = useMemo(() => {
    let list = units.filter((u) => {
      if (selectedStatus && selectedStatus !== "All" && u.status?.toLowerCase() !== selectedStatus.toLowerCase()) {
        return false;
      }
      if (selectedExposure && !u.exposure?.includes(selectedExposure)) {
        return false;
      }
      return true;
    });

    if (list.length === 0) {
      list = [...units];
    }

    // Place A-801 first to match Image 3 if present
    const a801Index = list.findIndex((u) => u.unitNo === "A-801");
    if (a801Index > 0) {
      const a801 = list.splice(a801Index, 1)[0];
      list.unshift(a801);
    }

    return list;
  }, [units, selectedStatus, selectedExposure]);

  // Filtered unit list based on user selections — desktop table
  const filteredUnits = useMemo(() => {
    return units.filter((u) => {
      if (selectedStatus !== inventoryPropertyStatuses[0] && u.status !== selectedStatus) {
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
  }, [units, selectedStatus, minArea, maxArea]);

  return (
    <div className="relative flex flex-col justify-between h-[100dvh] max-h-[100dvh] w-full max-w-full overflow-hidden bg-[var(--theme-inventory-img-bg)] select-none">
      {/* Main Content Area */}
      <main className="relative flex-1 min-h-0 w-full flex flex-col overflow-hidden">
        {/* VIEW 1: INTRO VIEW (Always shown on mobile; shown on desktop/tablet when filter is closed) */}
        {!showDesktopFilterView ? (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            {/* Top Bar (Desktop): Logo & Wishlist button */}
            <div className="relative z-30 hidden lg:flex items-center justify-between px-[30px] pt-[30px]">
              <div className="flex items-center">
                <img
                  src={inventoryUI.logoSrc}
                  alt={inventoryUI.logoAlt}
                  className="h-12 object-contain drop-shadow"
                />
              </div>

              {/* Wishlist Circle Button — toggles active unit favorite */}
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
            <div className="hidden lg:block absolute lg:top-24 lg:right-10 z-30 pointer-events-auto">
              <InventoryPageDetail
                unit={activeUnit}
                onToggleFavorite={toggleUnitFavorite}
              />
            </div>

            {/* Mobile & Tablet Unit Cards: Only visible after user clicks "Show Flats" */}
            {showFlatsCarousel && (
              <div className="lg:hidden absolute bottom-[62px] left-0 right-0 z-30 pointer-events-auto animate-fadeIn">
                <div
                  ref={carouselRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerLeave}
                  className="w-full flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none px-4 sm:px-8 snap-x cursor-grab active:cursor-grabbing select-none"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  {carouselUnits.map((u) => (
                    <div key={u.id} className="w-[280px] sm:w-[320px] shrink-0 snap-center">
                      <InventoryPageDetail
                        unit={u}
                        onToggleFavorite={toggleUnitFavorite}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile & Tablet Filter Modal (< 1024px) */}
            {isMobileFilterOpen && (
              <div
                onClick={() => setIsMobileFilterOpen(false)}
                className="fixed inset-0 z-50 flex items-start lg:hidden bg-black/60 backdrop-blur-sm overflow-y-auto"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full bg-[var(--theme-inventory-bg-main)] border-b border-white/10 p-5 shadow-2xl flex flex-col text-white"
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
                        Filter
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsMobileFilterOpen(false)}
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
                      Property Type
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
                                ? "bg-[var(--theme-inventory-tab-selected-bg,#C09973)] text-white shadow-sm"
                                : "text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-hover-text,#F7E4CF)] hover:bg-white/10"
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
                      Exposure
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
                                ? "bg-[var(--theme-inventory-tab-selected-bg,#C09973)] text-white shadow-sm"
                                : "text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-hover-text,#F7E4CF)] hover:bg-white/10"
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
                      Property Status
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
                                ? "bg-[var(--theme-inventory-tab-selected-bg,#C09973)] text-white shadow-sm"
                                : "text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-hover-text,#F7E4CF)] hover:bg-white/10"
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
                      onClick={handleShowFlats}
                      className="border border-[#C09973]/70 bg-[var(--theme-inventory-all-button)] hover:bg-[#0c3325] hover:brightness-110 active:scale-95 text-white px-6 py-2.5 rounded-[10px] text-sm font-medium cursor-pointer transition-all shadow-md"
                    >
                      Show Flats
                    </button>
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="text-white hover:text-[var(--theme-inventory-tab-hover-text,#F7E4CF)] hover:bg-white/5 active:scale-95 px-4 py-2.5 rounded-[10px] text-sm font-medium cursor-pointer transition-all"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* VIEW 2: FILTER OPEN VIEW — Desktop only (40% Filter Panel + 60% Building Area) */
          <div className="relative w-full h-full flex flex-col lg:flex-row overflow-hidden">
            {/* LEFT FILTER PANEL (35% Width) */}
            <div className="w-full lg:w-[35%] h-[100dvh] lg:h-full flex flex-col z-30 bg-[var(--theme-inventory-bg-main,#071B11)] border-r border-white/10">
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

              {/* Filter Controls — Always visible, never scrolls */}
              <div className="shrink-0 px-[50px] flex flex-col gap-4 sm:gap-5">
                {/* DIV 1: Filter Header & Property Selector Buttons */}
                <div className="flex flex-col gap-8">
                  {/* Sub-Div 1: Filter SVG + Title and Reset Filters Button */}
                  <div className="flex items-center justify-between">
                    {/* Div A: SVG and Filter text */}
                    <div className="flex items-center gap-2.5">
                      <img
                        src={inventoryUI.filterIconSrc}
                        alt={inventoryUI.filterTitle}
                        className="w-6 h-6 object-contain"
                      />
                      <span className="text-[var(--theme-inventory-tab-default-text)] text-2xl  font-medium tracking-wide">
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

                  {/* Sub-Div 2: Property Type */}
                  <div className="flex flex-col gap-4">
                    <span className="text-[var(--theme-inventory-tab-default-text)] text-sm font-medium">
                      {inventoryUI.propertyTypeLabel}
                    </span>
                    <div className="flex items-center gap-1 px-3 py-2 rounded-[10px] bg-[var(--theme-inventory-all-button)]">
                      {inventoryPropertyTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedPropertyType(type)}
                          className={`flex-1 py-2 px-4 rounded-[10px] text-xs sm:text-sm font-medium transition-all ${selectedPropertyType === type
                            ? "bg-[var(--theme-inventory-tab-selected-bg,#C09973)] text-[var(--theme-inventory-tab-selected-text,#FFFFFF)] shadow"
                            : "text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-hover-text,#F7E4CF)]"
                            }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sub-Div 3: Exposure */}
                  <div className="flex flex-col gap-4">
                    <span className="text-[var(--theme-inventory-tab-default-text)] text-sm font-medium">
                      {inventoryUI.exposureLabel}
                    </span>
                    <div className="flex items-center gap-1 px-3 py-2 rounded-[10px] bg-[var(--theme-inventory-all-button)]">
                      {inventoryExposures.map((exp) => (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => setSelectedExposure(exp)}
                          className={`flex-1 py-2 px-4 rounded-[10px] text-xs sm:text-sm font-medium transition-all ${selectedExposure === exp
                            ? "bg-[var(--theme-inventory-tab-selected-bg,#C09973)] text-[var(--theme-inventory-tab-selected-text,#FFFFFF)] shadow"
                            : "text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-hover-text,#F7E4CF)]"
                            }`}
                        >
                          {exp}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sub-Div 4: Property Status */}
                  <div className="flex flex-col gap-4">
                    <span className="text-[var(--theme-inventory-tab-default-text)] text-sm font-medium">
                      {inventoryUI.propertyStatusLabel}
                    </span>
                    <div className="flex items-center gap-1 px-3 py-2 rounded-[10px] bg-[var(--theme-inventory-all-button)]">
                      {inventoryPropertyStatuses.map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setSelectedStatus(status)}
                          className={`flex-1 py-2 px-4 rounded-[10px] text-xs sm:text-sm font-medium transition-all ${selectedStatus === status
                            ? "bg-[var(--theme-inventory-tab-selected-bg,#C09973)] text-[var(--theme-inventory-tab-selected-text,#FFFFFF)] shadow"
                            : "text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-hover-text,#F7E4CF)]"
                            }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* DIV 2: Area Size Range */}
                <div className="flex flex-col gap-6">
                  {/* 1st Div: Area Size Label and 2 Small Boxes for Min / Max */}
                  <div className="flex flex-col gap-4">
                    <span className="text-[var(--theme-inventory-tab-default-text)] text-sm font-medium">
                      {inventoryUI.areaSizeLabel}
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Min Box */}
                      <div className="flex items-center px-4 py-[9px] rounded-[10px] border border-1 border-[var(--theme-inventory-filter-border)]/50 bg-[var(--theme-inventory-all-button)] text-[var(--theme-inventory-tab-default-text)] text-xs sm:text-sm">
                        <input
                          type="number"
                          placeholder={inventoryUI.minPlaceholder}
                          value={minArea}
                          onChange={(e) => setMinArea(e.target.value)}
                          className="w-full bg-transparent outline-none text-[var(--theme-inventory-tab-default-text)] placeholder-white/50 text-xs sm:text-sm"
                        />
                      </div>
                      {/* Max Box */}
                      <div className="flex items-center px-4 py-[9px] rounded-[10px] border border-[var(--theme-inventory-filter-border)]/50 bg-[var(--theme-inventory-all-button)] text-[var(--theme-inventory-tab-default-text)] text-xs sm:text-sm">
                        <input
                          type="number"
                          placeholder={inventoryUI.maxPlaceholder}
                          value={maxArea}
                          onChange={(e) => setMaxArea(e.target.value)}
                          className="w-full bg-transparent outline-none text-[var(--theme-inventory-tab-default-text)] placeholder-white/50 text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2nd Div: Range Limit Line with labels min & max */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-semibold text-[var(--theme-inventory-tab-default-text)]">
                      <span>{inventoryAreaRange.minLabel}</span>
                      <span>{inventoryAreaRange.maxLabel}</span>
                    </div>

                    <div
                      ref={sliderTrackRef}
                      onPointerDown={handleTrackPointerDown}
                      className="relative w-full flex items-center h-7 select-none touch-none cursor-pointer"
                    >
                      {/* Base Track */}
                      <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden relative pointer-events-none">
                        {/* Active Highlight Track */}
                        <div
                          className="h-full bg-white rounded-full"
                          style={{
                            marginLeft: `calc(8px + (100% - 16px) * ${minPercent})`,
                            width: `calc((100% - 16px) * ${Math.max(0, maxPercent - minPercent)})`,
                          }}
                        />
                      </div>

                      {/* Min Thumb (Left Side Handle - Draggable) */}
                      <div
                        role="slider"
                        aria-label="Minimum Area"
                        aria-valuemin={inventoryAreaRange.min}
                        aria-valuemax={currentMaxVal}
                        aria-valuenow={currentMinVal}
                        tabIndex={0}
                        onPointerDown={(e) => startDragging("min", e)}
                        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none ${focusedThumb === "min" ? "z-40" : "z-30"
                          }`}
                        style={{
                          left: `calc(8px + (100% - 16px) * ${minPercent})`,
                        }}
                      >
                        <img
                          src={inventoryUI.sliderCircleSrc}
                          alt=""
                          className="w-4 h-4 pointer-events-none select-none drop-shadow hover:scale-110 active:scale-125 transition-transform"
                          draggable={false}
                        />
                      </div>

                      {/* Max Thumb (Right Side Handle - Draggable) */}
                      <div
                        role="slider"
                        aria-label="Maximum Area"
                        aria-valuemin={currentMinVal}
                        aria-valuemax={inventoryAreaRange.max}
                        aria-valuenow={currentMaxVal}
                        tabIndex={0}
                        onPointerDown={(e) => startDragging("max", e)}
                        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none ${focusedThumb === "max" ? "z-40" : "z-30"
                          }`}
                        style={{
                          left: `calc(8px + (100% - 16px) * ${maxPercent})`,
                        }}
                      >
                        <img
                          src={inventoryUI.sliderCircleSrc}
                          alt=""
                          className="w-4 h-4 pointer-events-none select-none drop-shadow hover:scale-110 active:scale-125 transition-transform"
                          draggable={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Header — Always visible, never scrolls */}
              <div className="shrink-0 w-full grid grid-cols-5 text-sm sm:text-base text-[var(--theme-inventory-5tab)] font-medium items-center pt-4">
                {inventoryTableHeaders.map((header) => (
                  <span key={header.key} className="col-span-1 text-center flex items-center justify-center whitespace-nowrap">
                    {header.label}
                  </span>
                ))}
                <span className="col-span-1 text-center flex items-center justify-center text-[var(--theme-inventory-heart)]">
                  <FaHeart className="w-4 h-4" />
                </span>
              </div>

              {/* Table Rows — ONLY this scrolls */}
              <div className="flex-1 min-h-0 w-full flex flex-col overflow-y-auto scrollbar-none pb-14">
                {filteredUnits.map((u) => {
                  const isSelected = activeUnit?.unitNo === u.unitNo;
                  return (
                    <div
                      key={u.id}
                      onClick={() => setSelectedUnit(u)}
                      className={`w-full grid grid-cols-5 text-sm sm:text-base font-normal text-[var(--theme-inventory-tab-default-text)] items-center py-2 rounded-lg cursor-pointer transition-colors ${isSelected ? "bg-white/10" : "hover:bg-white/5"
                        }`}
                    >
                      <span className="col-span-1 text-center flex items-center justify-center font-medium whitespace-nowrap">
                        {u.unitNo ? u.unitNo.replace(/^Unit\s*(?:No\.?)?\s*/i, "") : ""}
                      </span>
                      <span className="col-span-1 text-center flex items-center justify-center whitespace-nowrap">{u.type}</span>
                      <span className="col-span-1 text-center flex items-center justify-center whitespace-nowrap">{u.exposure}</span>
                      <span className="col-span-1 text-center flex items-center justify-center whitespace-nowrap">{u.area}</span>
                      <span className="col-span-1 text-center flex items-center justify-center">
                        <button
                          type="button"
                          onClick={(e) => toggleUnitFavorite(u.id, e)}
                          className="text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-default-text)] cursor-pointer flex items-center justify-center transition-transform hover:scale-110 active:scale-125"
                        >
                          {u.isFavorite ? (
                            <FaHeart className="w-4 h-4 text-[var(--theme-inventory-heart)]" />
                          ) : (
                            <FaRegHeart className="w-4 h-4 text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-default-text)]" />
                          )}
                        </button>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT BUILDING AREA (65% Width) */}
            <div className="w-full lg:w-[65%] h-full relative flex items-center justify-center overflow-hidden bg-[var(--theme-inventory-img-bg)]">
              {/* Top-Right Favorite Circle Button */}
              <div className="absolute top-4 sm:top-6 right-6 sm:right-10 z-30">
                <button
                  type="button"
                  aria-label={inventoryUI.wishlistAria}
                  onClick={() => toggleUnitFavorite(activeUnit?.id)}
                  className="w-10 h-10 rounded-full border border-white/20 bg-black/25 backdrop-blur-md flex items-center justify-center text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-default-text)] transition-all cursor-pointer shadow-lg"
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
              <div className="absolute top-16 sm:top-20 right-6 sm:right-10 z-30 pointer-events-auto">
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
      <footer className="relative w-full z-40 shrink-0">
        <BottomNav />
      </footer>
    </div>
  );
}

export default InventoryPage;

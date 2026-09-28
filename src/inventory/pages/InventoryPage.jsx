import React, { useState, useMemo, useRef, useEffect } from "react";
import { CiCircleChevRight, CiCircleChevLeft } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiCompass } from "react-icons/bi";
import { MdOutline360 } from "react-icons/md";
import { IoLayersOutline } from "react-icons/io5";
import BottomNav from "../../components/BottomNav";
import {
  inventoryUI,
  inventoryTableHeaders,
  inventoryPropertyTypes,
  inventoryExposures,
  inventoryPropertyStatuses,
  inventoryAreaRange,
  defaultFeaturedUnit,
  inventoryUnits,
} from "../data";

function InventoryPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState(inventoryPropertyTypes[0]);
  const [selectedExposure, setSelectedExposure] = useState(inventoryExposures[0]);
  const [selectedStatus, setSelectedStatus] = useState(inventoryPropertyStatuses[0]);
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [focusedThumb, setFocusedThumb] = useState("min");
  const [units, setUnits] = useState(inventoryUnits);
  const [selectedUnit, setSelectedUnit] = useState(defaultFeaturedUnit);
  const [isFeaturedFavorite, setIsFeaturedFavorite] = useState(true);

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

  // Toggle favorite for list item (only one unit can be favorited at a time)
  const toggleUnitFavorite = (id, e) => {
    e.stopPropagation();
    setUnits((prev) =>
      prev.map((unit) => {
        if (unit.id === id) {
          return { ...unit, isFavorite: !unit.isFavorite };
        }
        return { ...unit, isFavorite: false };
      })
    );
  };

  // Reset Filters handler
  const handleResetFilters = () => {
    setSelectedPropertyType(inventoryPropertyTypes[0]);
    setSelectedExposure(inventoryExposures[0]);
    setSelectedStatus(inventoryPropertyStatuses[0]);
    setMinArea("");
    setMaxArea("");
    setSelectedUnit(defaultFeaturedUnit);
  };

  // Filtered unit list based on user selections
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
        {/* VIEW 1: INTRO VIEW (Filter closed) */}
        {!isFilterOpen ? (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            {/* Top Bar: Logo & Wishlist button */}
            <div className="relative z-30 flex items-center justify-between px-[30px] pt-[30px]">
              <div className="flex items-center">
                <img
                  src={inventoryUI.logoSrc}
                  alt={inventoryUI.logoAlt}
                  className="h-12 object-contain drop-shadow"
                />
              </div>

              {/* Wishlist Circle Button */}
              <button
                type="button"
                aria-label={inventoryUI.wishlistAria}
                className="w-10 h-10 rounded-full border border-white/20 bg-black/25 backdrop-blur-md flex items-center justify-center text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-default-text)] transition-all cursor-pointer shadow-lg"
              >
                <FaRegHeart className="w-4 h-4" />
              </button>
            </div>

            {/* Left Floating Filters Button */}
            <div className="absolute top-20 left-12 z-30">
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center mt-[60px] gap-[10px] px-4 py-[10px] rounded-full border border-[var(--theme-inventory-filter-border)] text-[var(--theme-inventory-tab-default-text)]"
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
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4">
              <img
                src={inventoryUI.buildingSrc}
                alt={inventoryUI.buildingAlt}
                className="w-auto h-[78%] sm:h-[84%] max-w-[95%] object-contain drop-shadow-2xl"
              />
            </div>

            {/* Right Floating Unit Card */}
            <div className="absolute top-20 sm:top-24 right-6 sm:right-10 z-30 pointer-events-auto">
              <div className="w-[280px] sm:w-[300px] rounded-[14px] border border-white/15 bg-[var(--theme-inventory-bg,#002E2D)]/85 backdrop-blur-md p-4 sm:p-5 shadow-2xl flex flex-col gap-3 text-[var(--theme-inventory-tab-default-text)]">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-semibold tracking-wide text-[var(--theme-inventory-tab-default-text)]">
                    {selectedUnit?.unitNo || defaultFeaturedUnit.unitNo}
                  </h3>
                  <span className="text-xs font-semibold text-[#E65100]">
                    {selectedUnit?.status || defaultFeaturedUnit.status}
                  </span>
                </div>

                {/* Floor & Exposure */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-[var(--theme-inventory-tab-default-text)]">
                  <span>{selectedUnit?.floor || defaultFeaturedUnit.floor}</span>
                  <span className="flex items-center gap-1.5">
                    <BiCompass className="w-4 h-4 text-[var(--theme-inventory-tab-default-text)]" />
                    <span>{selectedUnit?.exposure || defaultFeaturedUnit.exposure}</span>
                  </span>
                </div>

                {/* Area & Heart */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-[var(--theme-inventory-tab-default-text)]">
                  <span>
                    {typeof selectedUnit?.area === "number"
                      ? `${selectedUnit.area} ${inventoryUI.sqFtUnit}`
                      : (selectedUnit?.area || defaultFeaturedUnit.area)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsFeaturedFavorite(!isFeaturedFavorite)}
                    className="cursor-pointer"
                  >
                    <FaHeart
                      className={`w-4 h-4 ${isFeaturedFavorite ? "text-[#E65100]" : "text-[var(--theme-inventory-tab-default-text)]"}`}
                    />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    type="button"
                    className="w-full py-2 px-3 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MdOutline360 className="w-4 h-4 text-[var(--theme-inventory-border,#C09973)]" />
                    <span>{inventoryUI.viewPropertyText}</span>
                  </button>
                  <button
                    type="button"
                    className="w-full py-2 px-3 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <IoLayersOutline className="w-4 h-4 text-[var(--theme-inventory-border,#C09973)]" />
                    <span>{inventoryUI.floorPlanText}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom-Right Compass Widget */}
            <div className="absolute bottom-6 right-6 sm:right-10 z-20 pointer-events-none">
              <div className="w-12 h-12 rounded-full border border-white/30 bg-black/60 backdrop-blur-md shadow-2xl flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="rotate-[-35deg]"
                  >
                    <polygon points="12,2 15,12 12,10 9,12" fill="#E65100" />
                    <polygon points="12,22 15,12 12,14 9,12" fill="#CCCCCC" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* VIEW 2: FILTER OPEN VIEW (40% Filter Panel + 60% Building Area) */
          <div className="relative w-full h-full flex flex-col lg:flex-row overflow-hidden">
            {/* LEFT FILTER PANEL (40% Width) */}
            <div className="w-full lg:w-[35%] h-full flex flex-col pt-[30px] overflow-y-auto scrollbar-none z-30 bg-[var(--theme-inventory-bg-main,#071B11)] border-r border-white/10">
              {/* Filter Top Header: Riviera Select Logo + Collapse Chevron Left */}
              <div className="flex items-center justify-between mb-[50px] px-[30px]">
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

              {/* ONE MAIN DIV (containing 3 divs as requested) */}
              <div className="flex-1 flex flex-col gap-6">
                {/* Filter Controls Container with px-[50px] */}
                <div className="px-[50px] flex flex-col gap-4 sm:gap-5">
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

                {/* DIV 3: Unit List Table */}
                <div className="w-full flex flex-col gap-4 px-5">
                  {/* Table Header */}
                  <div className="w-full grid grid-cols-5 gap-x-25 text-normal text-[var(--theme-inventory-5tab)] font-medium items-center justify-items-center px-1">
                    {inventoryTableHeaders.map((header) => (
                      <span key={header.key} className="col-span-1 text-center flex items-center justify-center whitespace-nowrap">
                        {header.label}
                      </span>
                    ))}
                    <span className="col-span-1 text-center flex items-center justify-center text-[var(--theme-inventory-heart)]">
                      <FaHeart className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Table Rows */}
                  <div className="w-full flex flex-col gap-2 max-h-[220px] overflow-y-auto scrollbar-none">
                    {filteredUnits.map((u) => {
                      const isSelected = selectedUnit?.unitNo === u.unitNo;
                      return (
                        <div
                          key={u.id}
                          onClick={() => setSelectedUnit(u)}
                          className={`w-full grid grid-cols-5 gap-x-25 text-normal
                            font-normal text-[var(--theme-inventory-tab-default-text)] items-center justify-items-center py-2 px-1 rounded-md cursor-pointer transition-colors ${isSelected ? "bg-white/10" : "hover:bg-white/5"
                            }`}
                        >
                          <span className="col-span-1 text-center flex items-center justify-center font-medium whitespace-nowrap">{u.unitNo}</span>
                          <span className="col-span-1 text-center flex items-center justify-center text-[var(--theme-inventory-tab-default-text)] whitespace-nowrap">{u.type}</span>
                          <span className="col-span-1 text-center flex items-center justify-center text-[var(--theme-inventory-tab-default-text)] whitespace-nowrap">{u.exposure}</span>
                          <span className="col-span-1 text-center flex items-center justify-center text-[var(--theme-inventory-tab-default-text)] whitespace-nowrap">{u.area}</span>
                          <span className="col-span-1 text-center flex items-center justify-center">
                            <button
                              type="button"
                              onClick={(e) => toggleUnitFavorite(u.id, e)}
                              className="text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-default-text)] cursor-pointer flex items-center justify-center"
                            >
                              {u.isFavorite ? (
                                <FaHeart className="w-3.5 h-3.5 text-[var(--theme-inventory-heart)]" />
                              ) : (
                                <FaRegHeart className="w-3.5 h-3.5 text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-default-text)]" />
                              )}
                            </button>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT BUILDING AREA (60% Width) */}
            <div className="w-full lg:w-[65%] h-full relative flex items-center justify-center overflow-hidden bg-[var(--theme-inventory-img-bg)]">
              {/* Top-Right Favorite Circle Button */}
              <div className="absolute top-4 sm:top-6 right-6 sm:right-10 z-30">
                <button
                  type="button"
                  aria-label={inventoryUI.wishlistAria}
                  className="w-10 h-10 rounded-full border border-white/20 bg-black/25 backdrop-blur-md flex items-center justify-center text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-default-text)] transition-all cursor-pointer shadow-lg"
                >
                  <FaRegHeart className="w-4 h-4" />
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

              {/* Right Floating Unit Card */}
              <div className="absolute top-16 sm:top-20 right-6 sm:right-10 z-30 pointer-events-auto">
                <div className="w-[260px] sm:w-[280px] rounded-[14px] border border-white/15 bg-[var(--theme-inventory-bg,#002E2D)]/85 backdrop-blur-md p-4 shadow-2xl flex flex-col gap-3 text-[var(--theme-inventory-tab-default-text)]">
                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold tracking-wide text-[var(--theme-inventory-tab-default-text)]">
                      {selectedUnit?.unitNo || defaultFeaturedUnit.unitNo}
                    </h3>
                    <span className="text-xs font-semibold text-[#E65100]">
                      {selectedUnit?.status || defaultFeaturedUnit.status}
                    </span>
                  </div>

                  {/* Floor & Exposure */}
                  <div className="flex items-center justify-between text-xs text-[var(--theme-inventory-tab-default-text)]">
                    <span>{selectedUnit?.floor || defaultFeaturedUnit.floor}</span>
                    <span className="flex items-center gap-1.5">
                      <BiCompass className="w-4 h-4 text-[var(--theme-inventory-tab-default-text)]" />
                      <span>{selectedUnit?.exposure || defaultFeaturedUnit.exposure}</span>
                    </span>
                  </div>

                  {/* Area & Heart */}
                  <div className="flex items-center justify-between text-xs text-[var(--theme-inventory-tab-default-text)]">
                    <span>
                      {typeof selectedUnit?.area === "number"
                        ? `${selectedUnit.area} ${inventoryUI.sqFtUnit}`
                        : (selectedUnit?.area || defaultFeaturedUnit.area)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsFeaturedFavorite(!isFeaturedFavorite)}
                      className="cursor-pointer"
                    >
                      <FaHeart
                        className={`w-3.5 h-3.5 ${isFeaturedFavorite ? "text-[#E65100]" : "text-[var(--theme-inventory-tab-default-text)]"}`}
                      />
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 pt-0.5">
                    <button
                      type="button"
                      className="w-full py-1.5 px-3 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <MdOutline360 className="w-4 h-4 text-[var(--theme-inventory-border,#C09973)]" />
                      <span>{inventoryUI.viewPropertyText}</span>
                    </button>
                    <button
                      type="button"
                      className="w-full py-1.5 px-3 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <IoLayersOutline className="w-4 h-4 text-[var(--theme-inventory-border,#C09973)]" />
                      <span>{inventoryUI.floorPlanText}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom-Right Compass Widget */}
              <div className="absolute bottom-6 right-6 sm:right-10 z-20 pointer-events-none">
                <div className="w-12 h-12 rounded-full border border-white/30 bg-black/60 backdrop-blur-md shadow-2xl flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="rotate-[-35deg]"
                    >
                      <polygon points="12,2 15,12 12,10 9,12" fill="#E65100" />
                      <polygon points="12,22 15,12 12,10 9,12" fill="#CCCCCC" />
                    </svg>
                  </div>
                </div>
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

import { useRef, useEffect, useState } from "react";
import { inventoryAreaRange, inventoryUI } from "../data";

function AreaRangeSlider({ minArea, maxArea, setMinArea, setMaxArea, className = "" }) {
  const [focusedThumb, setFocusedThumb] = useState("min");

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

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
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
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none ${
            focusedThumb === "min" ? "z-40" : "z-30"
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
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none ${
            focusedThumb === "max" ? "z-40" : "z-30"
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
  );
}

export default AreaRangeSlider;

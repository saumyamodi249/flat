import React, { useState } from "react";
import BottomNav from "../../components/BottomNav";
import WeatherCard from "../components/WeatherCard";
import UrbanDataLayers, { LAYERS } from "../components/UrbanDataLayers";
import useGeoLocation from "../../hooks/useGeoLocation";
import usePanZoom from "../../hooks/usePanZoom";
import { IoCloseCircleOutline } from "react-icons/io5";

function HomePage() {
  const { coords, isApproximate } = useGeoLocation();
  const [activeLayer, setActiveLayer] = useState(null);
  const [isUrbanDrawerOpen, setIsUrbanDrawerOpen] = useState(false);
  const { ref: buildingImageRef } = usePanZoom({
    minScale: 1,
    maxScale: 10,
  });

  return (
    <div className="relative flex flex-col justify-between h-[100dvh] max-h-[100dvh] w-full overflow-hidden bg-[var(--theme-bottom)] select-none">
      {/* Background images — Building.png (default) or Iscon circle.png (when layer active) */}
      <img
        ref={buildingImageRef}
        src="/UI IMG/Building.png"
        alt="Riviera Select property"
        className={`absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-500 ease-in-out ${activeLayer ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
      />
      <img
        src="/UI IMG/Iscon circle.png"
        alt="Iscon Circle urban layer view"
        className={`absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-500 ease-in-out ${activeLayer ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      />

      {/* ================= TOP BAR ================= */}
      {/* 1. Mobile Top Bar (Screen 1 & 3: phone logo + Weather Pill + filter chain) */}
      <div className="relative z-30 flex md:hidden items-start justify-between px-5 pt-[30px] w-full">
        {/* Mobile Left: phone logo */}
        <div className="h-[42px] flex items-center">
          <img
            src="/UI IMG/phone logo.svg"
            alt="Riviera"
            className="h-[25px] w-[25px] object-contain drop-shadow"
          />
        </div>

        {/* Mobile Center: Weather Pill with condition below */}
        <div className="flex-1 flex justify-center px-2">
          <WeatherCard
            lat={coords.lat}
            lon={coords.lon}
            isApproximate={isApproximate}
            variant="mobile"
          />
        </div>

        {/* Mobile Right: filter chain button (toggles Urban Data Layers bottom drawer) */}
        <div className="h-[42px] flex items-center">
          <button
            type="button"
            onClick={() => setIsUrbanDrawerOpen((prev) => !prev)}
            aria-label="Open Urban Data Layers"
            className="cursor-pointer p-1 active:scale-90 transition-transform flex items-center justify-center"
          >
            <img
              src="/UI IMG/filter chain.svg"
              alt="Filter"
              className="w-6 h-6 object-contain"
            />
          </button>
        </div>
      </div>

      {/* 2. Desktop Top Bar (Preserved 100% untouched for Laptop/Desktop) */}
      <div className="relative z-30 hidden md:flex flex-row items-center justify-between pl-[20px] sm:pl-[30px] pr-[20px] sm:pr-[30px] pt-[20px] sm:pt-[30px] gap-3">
        {/* Top logo */}
        <div className="flex items-center">
          <img
            src="/UI IMG/top_logo.svg"
            alt="Riviera Select"
            className="h-12 object-contain drop-shadow"
          />
        </div>

        {/* Top Right Weather Card Strip */}
        <div className="self-auto">
          <WeatherCard
            lat={coords.lat}
            lon={coords.lon}
            isApproximate={isApproximate}
            variant="desktop"
          />
        </div>
      </div>

      {/* ================= DESKTOP FLOATING URBAN DATA LAYERS ================= */}
      <div className="relative z-20 flex-1 hidden md:flex justify-end items-start px-4 sm:px-[30px] pt-5 pointer-events-none">
        <div className="pointer-events-auto">
          <UrbanDataLayers
            lat={coords.lat}
            lon={coords.lon}
            activeLayer={activeLayer}
            onLayerChange={setActiveLayer}
          />
        </div>
      </div>


      {/* ================= MOBILE URBAN DATA LAYERS DRAWER (Screen 3) ================= */}
      {isUrbanDrawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop overlay to click outside (transparent so it does not darken the drawer) */}
          <div
            className="absolute inset-0"
            onClick={() => setIsUrbanDrawerOpen(false)}
          />

          <div
            className="absolute z-10 bottom-[52px] left-0 right-0 rounded-none bg-[var(--theme-blur-layer)]/50 backdrop-blur-md p-5 pb-6 shadow-2xl shadow-teal-950/50 text-[var(--theme-UrbanDataLayers-border)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Title + Close Icon */}
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-base font-semibold text-white tracking-wide">
                Urban Data Layers
              </h3>
              <button
                type="button"
                onClick={() => setIsUrbanDrawerOpen(false)}
                className="text-white hover:text-white/80 cursor-pointer flex items-center justify-center transition-colors"
                aria-label="Close Urban Data Layers"
              >
                <IoCloseCircleOutline className="w-6 h-6" />
              </button>
            </div>

            {/* Thin horizontal divider line matching laptop version */}
            <div className="border-t border-[var(--theme-UrbanDataLayers-border)] opacity-20 my-2" />

            {/* Body: 2x2 Grid exactly like laptop version */}
            <div className="grid grid-cols-2 gap-4 sm:gap-3.5 pt-1">
              {LAYERS.map((layer) => {
                const isActive = activeLayer === layer.id;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => {
                      setActiveLayer(isActive ? null : layer.id);
                    }}
                    aria-pressed={isActive}
                    className={`group relative flex flex-col items-center justify-center p-[10px] rounded-2xl transition-all duration-300 ease-out cursor-pointer min-h-[98px] focus:outline-none ${isActive
                      ? "bg-[var(--theme-blur-layer)]/80 text-white shadow-lg shadow-black/20 border border-transparent"
                      : "bg-transparent hover:bg-[var(--theme-blur-layer)]/40 text-white/80 hover:text-white border border-transparent"
                      }`}
                  >
                    {/* Label on Top */}
                    <span className="text-sm font-semibold tracking-tight text-center text-white mb-2.5">
                      {layer.label}
                    </span>

                    {/* Custom Image */}
                    <div className="relative flex items-center justify-center h-8">
                      <img
                        src={layer.imgSrc}
                        alt={layer.label}
                        className={`h-7 sm:h-8 w-auto max-w-[36px] object-contain select-none transition-transform ${isActive ? "scale-110" : "group-hover:scale-105"
                          }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="relative w-full z-40 shrink-0">
        <BottomNav />
      </div>
    </div>
  );
}

export default HomePage;

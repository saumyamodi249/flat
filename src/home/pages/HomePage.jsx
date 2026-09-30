import React, { useState } from "react";
import BottomNav from "../../components/BottomNav";
import WeatherCard from "../components/WeatherCard";
import UrbanDataLayers, { LAYERS } from "../components/UrbanDataLayers";
import useGeoLocation from "../../hooks/useGeoLocation";
import usePanZoom from "../../hooks/usePanZoom";

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
        className={`absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-500 ease-in-out ${
          activeLayer ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
      <img
        src="/UI IMG/Iscon circle.png"
        alt="Iscon Circle urban layer view"
        className={`absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-500 ease-in-out ${
          activeLayer ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ================= TOP BAR ================= */}
      {/* 1. Mobile Top Bar (Screen 1 & 3: phone logo + Weather Pill + filter chain) */}
      <div className="relative z-30 flex md:hidden items-center justify-between px-5 pt-4 w-full">
        {/* Mobile Left: phone logo */}
        <div className="flex items-center">
          <img
            src="/UI IMG/phone logo.svg"
            alt="Riviera"
            className="h-8 w-auto object-contain drop-shadow"
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
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setIsUrbanDrawerOpen((prev) => !prev)}
            aria-label="Open Urban Data Layers"
            className="cursor-pointer p-1 active:scale-90 transition-transform"
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
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
          onClick={() => setIsUrbanDrawerOpen(false)}
        >
          <div
            className="absolute bottom-[52px] left-0 right-0 rounded-t-2xl border-t border-white/15 bg-[var(--theme-bottom)]/95 backdrop-blur-md p-5 pb-6 shadow-2xl"
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
                className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
                aria-label="Close Urban Data Layers"
              >
                ✕
              </button>
            </div>

            {/* Row 1: 3 Items (Roads, Parks, Education) */}
            <div className="grid grid-cols-3 gap-3 pt-3">
              {LAYERS.slice(0, 3).map((layer) => {
                const isActive = activeLayer === layer.id;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => {
                      setActiveLayer(isActive ? null : layer.id);
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 cursor-pointer ${isActive
                      ? "bg-[#04332d] border border-[#C09973]/60 shadow-lg text-white"
                      : "bg-transparent text-white/80 hover:bg-white/5"
                      }`}
                  >
                    <span className="text-xs font-medium mb-2">{layer.label}</span>
                    <img
                      src={layer.imgSrc}
                      alt={layer.label}
                      className="w-6 h-6 object-contain"
                    />
                  </button>
                );
              })}
            </div>

            {/* Row 2: 1 Item (Fun & Food) */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {LAYERS.slice(3, 4).map((layer) => {
                const isActive = activeLayer === layer.id;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => {
                      setActiveLayer(isActive ? null : layer.id);
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 cursor-pointer ${isActive
                      ? "bg-[#04332d] border border-[#C09973]/60 shadow-lg text-white"
                      : "bg-transparent text-white/80 hover:bg-white/5"
                      }`}
                  >
                    <span className="text-xs font-medium mb-2">{layer.label}</span>
                    <img
                      src={layer.imgSrc}
                      alt={layer.label}
                      className="w-6 h-6 object-contain"
                    />
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

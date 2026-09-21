import React, { useState } from "react";
import BottomNav from "../components/BottomNav";
import WeatherCard from "../components/WeatherCard";
import UrbanDataLayers from "../components/UrbanDataLayers";
import useGeoLocation from "../hooks/useGeoLocation";

function HomePage() {
  const { coords, isApproximate } = useGeoLocation();

  return (
    <div className="relative flex flex-col justify-between h-screen w-full overflow-hidden">
      {/* Building / property image — absolute, sits behind content */}
      <img
        src="/UI IMG/Building.png"
        alt="Riviera Select property"
        className="absolute inset-0 w-full h-full object-cover select-none"
      />

      {/* Top Bar: Left Logo & Right Weather Strip */}
      <div className="relative z-30 flex flex-col sm:flex-row items-start sm:items-center justify-between pl-[20px] sm:pl-[30px] pr-[20px] sm:pr-[30px] pt-[20px] sm:pt-[30px] gap-3">
        {/* Top logo */}
        <div className="flex items-center">
          <img
            src="/UI IMG/top_logo.svg"
            alt="Riviera Select"
            className="h-8 sm:h-10 object-contain drop-shadow"
          />
        </div>

        {/* Top Right Weather Card Strip */}
        <div className="self-end sm:self-auto">
          <WeatherCard
            lat={coords.lat}
            lon={coords.lon}
            isApproximate={isApproximate}
          />
        </div>
      </div>

      {/* Upper-Right Floating Urban Data Layers Panel */}
      <div className="relative z-20 flex-1 flex justify-end items-start px-4 sm:px-[30px] pt-5 pointer-events-none">
        <div className="pointer-events-auto">
          <UrbanDataLayers
            lat={coords.lat}
            lon={coords.lon}
          />
        </div>
      </div>

      {/* Bottom Nav with Compass */}
      <div className="relative w-full z-40">
        <BottomNav />
      </div>
    </div>
  );
}

export default HomePage;

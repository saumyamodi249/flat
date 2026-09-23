import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../../components/TopNav";
import BottomNav from "../../components/BottomNav";
import CategoryFilterBar from "../components/CategoryFilterBar";
import { mapCategories } from "../data";

function MapPage() {
  return (
    <div className="relative flex flex-col justify-between min-h-screen w-full max-w-full overflow-y-auto overflow-x-hidden scrollbar-none bg-[var(--theme-bottom)] select-none">
      {/* Blurred background image */}
      <img
        src="/UI IMG/Building.png"
        alt="Riviera Select property"
        className="fixed inset-0 w-full h-full object-cover blur-sm scale-105 select-none brightness-85 pointer-events-none"
      />
      <div className="fixed inset-0 bg-black/35 pointer-events-none" />

      {/* Top Header Navigation */}
      <TopNav title="3D Map" />

      {/* Main Content Area: Modal anchored to bottom matching About section */}
      <main className="relative z-20 flex-1 flex flex-col justify-end items-center px-4 sm:px-[50px] pt-4 pb-[52px] md:pb-[56px] w-full max-w-full">
        <div className="w-full max-w-8xl rounded-t-[10px] rounded-b-none backdrop-blur-md px-[40px] py-[30px] shadow-2xl border border-[var(--theme-map-border)]/40 border-b-0 bg-[var(--theme-map-bg)] flex flex-col gap-[20px] sm:gap-[24px] overflow-hidden">
          {/* Sub-Route Map Canvas (MapView) */}
          <Outlet />

          {/* Category Filter Bar at the Bottom */}
          <div className="w-full pt-0.5">
            <CategoryFilterBar categories={mapCategories} />
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="relative w-full z-40">
        <BottomNav />
      </footer>
    </div>
  );
}

export default MapPage;

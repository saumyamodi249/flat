import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../../components/TopNav";
import BottomNav from "../../components/BottomNav";
import CategoryFilterBar from "../components/CategoryFilterBar";
import { mapCategories } from "../data";

function MapPage() {
  return (
    <div className="relative flex flex-col justify-between min-h-screen w-full overflow-x-hidden overflow-y-auto select-none bg-[var(--theme-bottom)]">
      {/* Blurred background image */}
      <img
        src="/UI IMG/Building.png"
        alt="Riviera Select property"
        className="fixed inset-0 w-full h-full object-cover blur-sm scale-105 select-none brightness-75 pointer-events-none"
      />
      <div className="fixed inset-0 bg-black/45 pointer-events-none" />

      {/* Top Header Navigation */}
      <TopNav title="3D Map" />

      {/* Main Content Area */}
      <main className="relative z-20 flex-1 flex flex-col justify-center items-center px-3 sm:px-6 md:px-10 py-3 sm:py-4 w-full max-w-[1440px] mx-auto">
        <div className="w-full bg-[var(--theme-map-bg)]/95 backdrop-blur-md border border-[var(--theme-map-border)]/40 rounded-[10px] p-10 shadow-2xl flex flex-col gap-3.5">
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

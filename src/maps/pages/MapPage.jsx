import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../../components/TopNav";
import BottomNav from "../../components/BottomNav";
import CategoryFilterBar from "../components/CategoryFilterBar";
import { mapCategories } from "../data";

function MapPage() {
  return (
    <div className="relative flex flex-col justify-between h-[100dvh] max-h-[100dvh] w-full max-w-full overflow-hidden bg-transparent select-none">

      {/* Top Header Navigation */}
      <div className="shrink-0 w-full">
        <TopNav title="3D Map" />
      </div>

      {/* Main Content Area: Modal anchored to bottom matching About section */}
      <main className="relative z-20 flex-1 flex flex-col items-center px-4 sm:px-[50px] pt-4 pb-[52px] md:pb-[56px] w-full max-w-full min-h-0 overflow-hidden">
        <div className="w-full max-w-8xl h-full rounded-t-[10px] rounded-b-none backdrop-blur-md px-[40px] py-[30px] border-b-0 bg-[var(--theme-map-bg)] flex flex-col gap-[30px] min-h-0 overflow-hidden">
          {/* Sub-Route Map Canvas (MapView) */}
          <div className="w-full flex-1 min-h-0 flex flex-col">
            <Outlet />
          </div>

          {/* Category Filter Bar at the Bottom */}
          <div className="w-full pt-0.5 shrink-0">
            <CategoryFilterBar categories={mapCategories} />
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="relative w-full z-40 shrink-0">
        <BottomNav />
      </footer>
    </div>
  );
}

export default MapPage;

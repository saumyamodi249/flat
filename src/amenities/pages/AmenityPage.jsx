import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../../components/TopNav";
import BottomNav from "../../components/BottomNav";
import CategoryFilterBar from "../components/CategoryFilterBar";
import { AMENITIES_LIST } from "../data";

function AmenityPage() {
  return (
    <div className="relative flex flex-col justify-between h-[100dvh] max-h-[100dvh] w-full max-w-full overflow-hidden bg-[var(--theme-bottom)] select-none">
      {/* Blurred background image */}
      <img
        src="/UI IMG/Building.png"
        alt="Riviera Select property"
        className="fixed inset-0 w-full h-full object-cover blur-sm scale-105 select-none brightness-85 pointer-events-none"
      />
      <div className="fixed inset-0 bg-black/35 pointer-events-none" />

      {/* Top Header Navigation */}
      <div className="shrink-0 w-full">
        <TopNav title="Amenities" />
      </div>

      {/* Main Content Area: Modal anchored to bottom matching Maps and About sections */}
      <main className="relative z-20 flex-1 flex flex-col items-center px-4 sm:px-[50px] pt-4 pb-[52px] md:pb-[56px] w-full max-w-full min-h-0 overflow-hidden">
        <div className="w-full max-w-8xl h-full rounded-t-[10px] rounded-b-none backdrop-blur-md px-[40px] py-[30px] border-b-0 bg-[var(--theme-amenity-bg,#002E2D)] flex flex-col gap-[30px] min-h-0 overflow-hidden">
          {/* Sub-Route Amenity Canvas (AmenityView) */}
          <div className="w-full flex-1 min-h-0 flex flex-col">
            <Outlet />
          </div>

          {/* Category Filter Bar at the Bottom */}
          <div className="w-full pt-0.5 shrink-0">
            <CategoryFilterBar categories={AMENITIES_LIST} />
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

export default AmenityPage;

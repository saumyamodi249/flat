import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../../components/TopNav";
import BottomNav from "../../components/BottomNav";
import GalleryTabs from "./GalleryTabs";

function GalleryPage() {
  return (
    <div className="relative flex flex-col justify-between h-[100dvh] max-h-[100dvh] w-full max-w-full overflow-hidden bg-[var(--theme-bottom)] select-none">
      {/* Blurred background property image */}
      <img
        src="/UI IMG/Building.png"
        alt="Riviera Select property"
        className="fixed inset-0 w-full h-full object-cover blur-sm scale-105 select-none brightness-85 pointer-events-none"
      />
      <div className="fixed inset-0 bg-black/35 pointer-events-none" />

      {/* Top Header Navigation */}
      <div className="shrink-0 w-full">
        <TopNav title="Gallery" />
      </div>

      {/* Main Content Area: Modal anchored under top nav extending to bottom */}
      <main className="relative z-20 flex-1 flex flex-col items-center px-4 sm:px-[50px] pt-2 sm:pt-4 pb-[52px] md:pb-[56px] w-full max-w-full min-h-0 overflow-hidden">
        <div className="w-full max-w-8xl h-full rounded-t-[10px] rounded-b-none backdrop-blur-md px-4 sm:px-[40px] pt-[20px] sm:pt-[30px] pb-4 border-b-0 bg-[var(--theme-gallery-bg,#002E2D)] flex flex-col gap-[20px] sm:gap-[24px] min-h-0 overflow-hidden">
          {/* Centered Gallery Tabs matching AboutTabs */}
          <div className="flex justify-center w-full max-w-full shrink-0">
            <GalleryTabs />
          </div>

          {/* Sub-Route Outlet (e.g. Interior) */}
          <div className="w-full flex-1 min-h-0 flex flex-col">
            <Outlet />
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

export default GalleryPage;

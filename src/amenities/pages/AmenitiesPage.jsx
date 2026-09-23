import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import TopNav from "../../components/TopNav";

function AmenitiesPage() {
  return (
    <div className="relative flex flex-col justify-between min-h-screen w-full max-w-full overflow-y-auto overflow-x-hidden scrollbar-none bg-[var(--theme-bottom)] select-none">
      {/* Blurred background image */}
      <img
        src="/UI IMG/Building.png"
        alt="Riviera Select property"
        className="fixed inset-0 w-full h-full object-cover blur-sm scale-105 select-none brightness-85 pointer-events-none"
      />
      <div className="fixed inset-0 bg-black/35 pointer-events-none" />

      {/* Top Navigation */}
      <TopNav title="Amenities" />

      {/* Main Content Area: Modal anchored to bottom matching AboutPage */}
      <main className="relative z-20 flex-1 flex flex-col justify-end items-center px-4 sm:px-[50px] pt-4 pb-[52px] md:pb-[56px] w-full max-w-full">
        <div className="w-full max-w-8xl rounded-t-[10px] rounded-b-none backdrop-blur-md px-[40px] pt-[30px] pb-6 shadow-2xl border border-white/10 border-b-0 bg-[var(--theme-box-bg)] flex flex-col overflow-hidden">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="relative w-full z-40">
        <BottomNav />
      </footer>
    </div>
  );
}

export default AmenitiesPage;

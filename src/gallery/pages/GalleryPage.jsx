import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import TopNav from "../../components/TopNav";
import BottomNav from "../../components/BottomNav";
import GalleryTabs from "./GalleryTabs";

function GalleryPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-between h-[100dvh] max-h-[100dvh] w-full max-w-full overflow-hidden bg-transparent select-none">

      {/* Top Header Navigation (Desktop only) */}
      <div className="hidden sm:block shrink-0 w-full">
        <TopNav title="Gallery" />
      </div>

      {/* Main Content Area: Modal anchored to bottom, starting right below mobile header (pt-[140px] on mobile) */}
      <main className="relative z-20 flex-1 flex flex-col justify-end items-center px-0 sm:px-[50px] pt-[140px] sm:pt-4 pb-[52px] md:pb-[56px] w-full max-w-full min-h-0 overflow-hidden">
        <div className="w-full max-w-8xl h-full sm:rounded-t-[10px] rounded-b-none backdrop-blur-md px-5 sm:px-[40px] pt-4 sm:pt-[30px]  border-b-0 bg-[var(--theme-gallery-bg)] flex flex-col gap-4 sm:gap-[25px] min-h-0 overflow-hidden shadow-2xl">
          {/* Mobile Header: Title + Close Icon inside card */}
          <div className="flex sm:hidden items-center justify-between mb-2 shrink-0">
            <h2 className="text-base font-semibold tracking-wide text-white">
              Gallery
            </h2>
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="text-white hover:text-white/80 cursor-pointer flex items-center justify-center transition-colors"
              aria-label="Close Gallery"
            >
              <IoCloseCircleOutline className="w-6 h-6" />
            </button>
          </div>

          {/* Centered Gallery Tabs */}
          <div className="flex justify-center w-full max-w-full shrink-0">
            <GalleryTabs />
          </div>

          {/* Sub-Route Outlet (e.g. All, Interior, Exterior, Amenities) */}
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

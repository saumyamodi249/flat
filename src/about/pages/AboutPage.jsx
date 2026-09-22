import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import { IoClose } from "react-icons/io5";

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-between min-h-screen w-full max-w-full overflow-y-auto overflow-x-hidden scrollbar-none bg-[var(--theme-bottom)] select-none">
      {/* Blurred background image */}
      <img
        src="/UI IMG/Building.png"
        alt="Riviera Select property"
        className="fixed inset-0 w-full h-full object-cover blur-sm scale-105 select-none brightness-85 pointer-events-none"
      />
      <div className="fixed inset-0 bg-black/35 pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 w-full max-w-full">
        <div className="flex items-center gap-3">
          {/* Mobile: "About" title matching Figma */}
          <span className="sm:hidden text-lg font-semibold tracking-wide text-white">
            About
          </span>

          {/* Desktop: Top Riviera Select Logo */}
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="hidden sm:block cursor-pointer transition-transform hover:scale-102 focus:outline-none"
            aria-label="Go to Home"
          >
            <img
              src="/UI IMG/top_logo.svg"
              alt="Riviera Select"
              className="h-8 object-contain drop-shadow"
            />
          </button>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={() => navigate("/home")}
          aria-label="Close About"
          className="w-9 h-9 rounded-full bg-[#002E2D]/90 border border-white/20 text-[var(--theme-about-title)] flex items-center justify-center hover:bg-[#003837] hover:scale-105 transition-all cursor-pointer shadow-lg"
        >
          <IoClose className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content Area: Modal anchored to bottom */}
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

export default AboutPage;

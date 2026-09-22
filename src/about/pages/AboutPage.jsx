import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import AboutTabs from "../components/AboutTabs";
import { IoClose } from "react-icons/io5";

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-between min-h-screen w-full overflow-y-auto bg-[var(--theme-bottom)] select-none">
      <img
        src="/UI IMG/Building.png"
        alt="Riviera Select property"
        className="fixed inset-0 w-full h-full object-cover blur-sm scale-105 select-none brightness-85 pointer-events-none"
      />
      <div className="fixed inset-0 bg-black/35 pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-30 flex items-center justify-between px-6 sm:px-10 pt-6 sm:pt-8 w-full">
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="cursor-pointer transition-transform hover:scale-102 focus:outline-none"
          aria-label="Go to Home"
        >
          <img
            src="/UI IMG/top_logo.svg"
            alt="Riviera Select"
            className="h-8 sm:h-10 object-contain drop-shadow"
          />
        </button>

        <button
          type="button"
          onClick={() => navigate("/home")}
          aria-label="Close About"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#002E2D]/90 border border-white/20 text-[var(--theme-about-title)] flex items-center justify-center hover:bg-[#003837] hover:scale-105 transition-all cursor-pointer shadow-lg"
        >
          <IoClose className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </header>

      {/* Main Content Area: Centered About Modal */}
      <main className="relative z-20 flex-1 flex items-center justify-center px-4 sm:px-6 py-6 pb-24 sm:pb-28">
        <div className="w-full max-w-5xl rounded-2xl backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-2xl border border-white/10 transition-all bg-[var(--theme-box-bg)]/95 flex flex-col">
          <div className="flex justify-center sm:justify-end mb-6">
            <AboutTabs />
          </div>

          <div className="w-full flex-1">
            <Outlet />
          </div>
        </div>
      </main>

      <footer className="relative w-full z-40">
        <BottomNav />
      </footer>
    </div>
  );
}

export default AboutPage;

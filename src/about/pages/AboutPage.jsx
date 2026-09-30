import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import TopNav from "../../components/TopNav";

function AboutPage() {
  return (
    <div className="relative flex flex-col justify-between h-[100dvh] max-h-[100dvh] w-full max-w-full overflow-hidden bg-transparent select-none">

      {/* Top Header Bar */}
      <div className="shrink-0 w-full">
        <TopNav title="About" />
      </div>

      {/* Main Content Area: Modal anchored under top nav extending to bottom */}
      <main className="relative z-20 flex-1 flex flex-col items-center px-4 sm:px-[50px] pt-2 sm:pt-4 pb-[52px] md:pb-[56px] w-full max-w-full min-h-0 overflow-hidden">
        <div className="w-full max-w-8xl h-full rounded-t-[10px] rounded-b-none backdrop-blur-md px-4 sm:px-[40px] pt-[20px] sm:pt-[30px] pb-4  border-b-0 bg-[var(--theme-box-bg)] flex flex-col min-h-0 overflow-hidden">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="relative w-full z-40 shrink-0">
        <BottomNav />
      </footer>
    </div>
  );
}

export default AboutPage;
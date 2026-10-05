import { Outlet, useNavigate } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import BottomNav from "../../components/BottomNav";
import TopNav from "../../components/TopNav";

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-between h-[100dvh] max-h-[100dvh] w-full max-w-full overflow-hidden bg-transparent select-none">

      {/* Top Header Bar (Desktop only) */}
      <div className="hidden sm:block shrink-0 w-full">
        <TopNav title="About" />
      </div>

      {/* Main Content Area: Modal anchored to bottom, starting right below mobile header (pt-[140px] on mobile) */}
      <main className="relative z-20 flex-1 flex flex-col justify-end items-center px-0 sm:px-[50px] pt-[140px] sm:pt-4 pb-[52px] md:pb-[56px] w-full max-w-full min-h-0 overflow-hidden">
        <div className="w-full max-w-8xl h-full sm:rounded-t-[10px] rounded-b-none backdrop-blur-md px-5 sm:px-[40px] pt-4 sm:pt-[30px] border-b-0 bg-[var(--theme-box-bg)] flex flex-col gap-4 sm:gap-[30px] min-h-0 overflow-hidden shadow-2xl">
          {/* Mobile Header: Title + Close Icon inside card */}
          <div className="flex sm:hidden items-center justify-between shrink-0 mb-2">
            <h2 className="text-base font-semibold tracking-wide text-white">
              About
            </h2>
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="text-white hover:text-white/80 cursor-pointer flex items-center justify-center transition-colors"
              aria-label="Close About"
            >
              <IoCloseCircleOutline className="w-6 h-6" />
            </button>
          </div>

          {/* Sub-Route Outlet */}
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

export default AboutPage;
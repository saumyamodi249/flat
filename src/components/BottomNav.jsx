import { useState, useEffect } from "react";
import Compass from "./Compass";

// Exact 4-circle dot menu icon from Figma design
function FourDotsIcon({ size = 24, color = "#F5DEB3" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className="shrink-0"
    >
      <circle cx="7" cy="7" r="2.8" />
      <circle cx="17" cy="7" r="2.8" />
      <circle cx="7" cy="17" r="2.8" />
      <circle cx="17" cy="17" r="2.8" />
    </svg>
  );
}

const navItems = [
  { label: "HOME", path: "/home" },
  { label: "INVENTORY", path: "/inventory" },
  { label: "AMENITIES", path: "/amenities" },
  { label: "GALLERY", path: "/gallery" },
  { label: "MAPS", path: "/maps" },
  { label: "ABOUT", path: "/about" },
  { label: "CONTACT US", path: "/contact" },
];

function BottomNav({ showCompass = true }) {
  const [currentPath, setCurrentPath] = useState("/");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <>
      {/* Mobile Drawer when grid menu is tapped */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 club-mobile-nav"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute bottom-[60px] right-4 left-4 rounded-xl border border-[var(--theme-route-box)]/30 bg-[var(--theme-bottom)] p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-[var(--theme-route-title)] font-semibold">
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-[var(--theme-route-title)] text-lg px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3">
              {navItems.map((item) => {
                const isActive =
                  item.path === "/home"
                    ? currentPath === "/" || currentPath === "/home"
                    : currentPath.startsWith(item.path);

                return (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-lg px-3 py-2.5 text-center text-xs font-bold uppercase tracking-wider no-underline transition-all text-[var(--theme-route-title)] ${
                      isActive
                        ? "bg-[var(--theme-route-box)] shadow-sm"
                        : "hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Working Compass: Fixed position bottom-right */}
      {showCompass && (
        <div className="fixed bottom-[62px] md:bottom-[70px] right-4 sm:right-6 md:right-8 z-40 pointer-events-auto">
          <Compass />
        </div>
      )}

      {/* Main Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-[52px] md:h-[56px] bg-[var(--theme-bottom)] flex items-center justify-between border-t border-[var(--theme-bottom)] select-none">
        {/* === MOBILE (<= 425px: shows clubbed view) === */}
        <div className="club-mobile-nav items-center justify-between w-full h-full">
          <div className="flex items-center h-full pl-[20px] py-[5px] gap-[10px]">
            {navItems.slice(0, 2).map((item) => {
              const isActive =
                item.path === "/home"
                  ? currentPath === "/" || currentPath === "/home"
                  : currentPath.startsWith(item.path);

              return (
                <a
                  key={item.path}
                  href={item.path}
                  className={`h-full flex items-center justify-center px-4 text-xs font-bold uppercase tracking-wider no-underline transition-colors whitespace-nowrap text-[var(--theme-route-title)] ${
                    isActive
                      ? "bg-[var(--theme-route-box)] shadow-sm"
                      : "hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center p-1 transition-transform hover:scale-105 cursor-pointer"
              title="Menu"
            >
              <FourDotsIcon
                size={24}
                color="var(--theme-route-title, #F7E4CF)"
              />
            </button>
          </div>

          <div className="flex items-center justify-end pr-[20px] py-[11.84px] shrink-0">
            <img
              src="/UI IMG/bottom_logo.svg"
              alt="Powered by SolidTwin"
              className="h-5 object-contain"
            />
          </div>
        </div>

        {/* === FULL NAV (> 425px: shows all items without clubbing) === */}
        <div className="full-desktop-nav items-center h-full w-full justify-between">
          {/* Nav items starting cleanly with small left padding */}
          <div className="flex items-center h-full pl-6 lg:pl-[50px] gap-6 lg:gap-[30px] xl:gap-12 overflow-x-auto scrollbar-none">
            {navItems.map((item) => {
              const isActive =
                item.path === "/home"
                  ? currentPath === "/" || currentPath === "/home"
                  : currentPath.startsWith(item.path);

              return (
                <a
                  key={item.path}
                  href={item.path}
                  className={`h-full flex items-center justify-center px-5 py-[10px] text-sm lg:text-base font-semibold uppercase tracking-wider no-underline transition-colors whitespace-nowrap text-[var(--theme-route-title)] ${
                    isActive
                      ? "bg-[var(--theme-route-box)] shadow-sm"
                      : "hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Right SolidTwin Logo with exact padding requested */}
          <div className="flex items-center justify-end pr-[50px] py-[12.29px] pl-[72px] shrink-0">
            <img
              src="/UI IMG/bottom_logo.svg"
              alt="Powered by SolidTwin"
              className="h-7 object-contain"
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default BottomNav;

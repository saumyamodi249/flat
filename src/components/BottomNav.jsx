import { useState, useEffect } from "react";

const navItems = [
  { label: "HOME", path: "/home" },
  { label: "INVENTORY", path: "/inventory" },
  { label: "AMENITIES", path: "/amenities" },
  { label: "GALLERY", path: "/gallery" },
  { label: "MAPS", path: "/maps" },
  { label: "ABOUT", path: "/about" },
  { label: "CONTACT US", path: "/contact" },
];

function BottomNav() {
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
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute bottom-[60px] right-4 left-4 rounded-xl border border-[var(--theme-route)]/30 bg-[var(--theme-bottom)] p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-[var(--theme-route-title)] font-semibold">
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-[var(--theme-route-title)] text-lg px-2"
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
                    className={`rounded-lg px-3 py-2.5 text-center text-xs font-bold uppercase tracking-wider no-underline transition-all ${isActive
                      ? "bg-[var(--theme-route)] text-white shadow-sm"
                      : "text-white/80 hover:bg-white/10"
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

      {/* Main Bottom Nav — exact match to Figma design */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-[52px] md:h-[56px] bg-[var(--theme-bottom)] flex items-center justify-between border-t border-[var(--theme-bottom)] select-none">
        {/* === MOBILE (< md) === */}
        <div className="flex md:hidden items-center justify-between w-full h-full px-4">
          <a
            href="/home"
            className={`h-full flex items-center px-4 text-xs font-bold uppercase tracking-wider no-underline transition-all ${currentPath === "/" || currentPath === "/home"
              ? "bg-[var(--theme-route)] text-white"
              : "text-white"
              }`}
          >
            HOME
          </a>

          <a
            href="/inventory"
            className={`px-3 text-xs font-bold uppercase tracking-wider no-underline transition-all ${currentPath.startsWith("/inventory")
              ? "text-[var(--theme-route)]"
              : "text-white"
              }`}
          >
            INVENTORY
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center p-1 transition-transform hover:scale-105"
            title="Menu"
          >
            <BsDice4Fill size={24} color="#F5DEB3" />
          </button>

          <img
            src="/UI IMG/bottom_logo.svg"
            alt="Powered by SolidTwin"
            className="h-5 object-contain"
          />
        </div>

        {/* === DESKTOP (>= md) === */}
        <div className="hidden md:flex items-center h-full w-full justify-between">
          {/* Nav items starting cleanly with small left padding */}
          <div className="flex items-center h-full pl-6 lg:pl-[50px] gap-6 lg:gap-[30px] xl:gap-12">
            {navItems.map((item) => {
              const isActive =
                item.path === "/home"
                  ? currentPath === "/" || currentPath === "/home"
                  : currentPath.startsWith(item.path);

              return (
                <a
                  key={item.path}
                  href={item.path}
                  className={`h-full flex items-center justify-center px-5 py-[10px] text-sm lg:text-base font-semibold uppercase tracking-wider no-underline transition-colors whitespace-nowrap ${isActive
                    ? "bg-[var(--theme-route)] text-white shadow-sm"
                    : "text-white hover:bg-white/5 hover:text-[var(--theme-route-title)]"
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Right SolidTwin Logo with exact padding requested */}
          <div className="flex items-center justify-end pr-[50px] py-[12.29px] pl-[119.39px] shrink-0">
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

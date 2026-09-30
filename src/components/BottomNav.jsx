import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";



const navItems = [
  { label: "HOME", path: "/home" },
  { label: "INVENTORY", path: "/inventory" },
  { label: "AMENITIES", path: "/amenities" },
  { label: "GALLERY", path: "/gallery" },
  { label: "MAPS", path: "/maps" },
  { label: "ABOUT", path: "/about" },
  { label: "CONTACT US", path: "/contact" },
];

const mobileMenuSections = [
  [
    { label: "About", path: "/about" },
    { label: "Amenities", path: "/amenities" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contact Us", path: "/contact" },
  ],
  [
    { label: "Privacy", path: "/contact" },
    { label: "Terms", path: "/contact" },
  ],
];

function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Drawer when grid menu is tapped (Screen 2: Menu) */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[var(--theme-bg-blur)]/30 backdrop-blur-xl flex flex-col justify-between p-5 club-mobile-nav"
          onClick={() => setMenuOpen(false)}
        >
          {/* Top Row: Close icon on the right */}
          <div className="flex justify-end w-full pt-2">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 rounded-full border border-[var(--theme-UrbanDataLayers-border)] flex items-center justify-center text-[var(--theme-UrbanDataLayers)] hover:text-[var(--theme-route-title)] hover:border-[var(--theme-route-title)] hover:bg-[var(--theme-route-box)]/20 cursor-pointer transition-colors"
              aria-label="Close menu"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>

          {/* Center Content: Riviera Select Logo + Vertical Menu List Cards */}
          <div
            className="flex flex-col items-center w-full max-w-[350px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Logo */}
            <div className="flex justify-center">
              <img
                src="/UI IMG/Riviera_logo.svg"
                alt="Riviera Select"
                className="h-12 w-auto object-contain drop-shadow"
              />
            </div>

            {/* Menu Boxes Container */}
            <div className="flex flex-col gap-[10px] w-full mt-[50px]">
              {mobileMenuSections.map((section, idx) => (
                <div
                  key={idx}
                  className="w-full rounded-[10px] bg-[var(--theme-bottom)] border border-[var(--theme-UrbanDataLayers-border)]/20 backdrop-blur-md overflow-hidden shadow-2xl flex flex-col divide-y divide-[var(--theme-UrbanDataLayers-border)]/15 text-[var(--theme-route-title)]"
                >
                  {section.map((item) => (
                    <a
                      key={item.label}
                      href={item.path}
                      onClick={() => setMenuOpen(false)}
                      className="py-4 px-[14px] text-center text-sm font-medium text-[var(--theme-route-title)] hover:bg-[var(--theme-route-box)]/25 transition-colors no-underline block"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom spacing */}
          <div className="h-6" />
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
                  className={`h-full flex items-center justify-center px-4 text-xs font-bold uppercase tracking-wider no-underline transition-colors whitespace-nowrap text-[var(--theme-route-title)] ${isActive
                    ? "bg-[var(--theme-route-box)] shadow-sm"
                    : "hover:bg-[var( --theme-home-white-text)]/90"
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
              aria-label="Open Menu"
            >
              <img
                src="/UI IMG/4dots.svg"
                alt="Menu"
                className="h-6 w-6 object-contain"
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
                  className={`h-full flex items-center justify-center px-5 py-[10px] text-sm lg:text-base font-semibold uppercase tracking-wider no-underline transition-colors whitespace-nowrap text-[var(--theme-route-title)] ${isActive
                    ? "bg-[var(--theme-route-box)] shadow-sm"
                    : "hover:bg-[var( --theme-home-white-text)]/10"
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

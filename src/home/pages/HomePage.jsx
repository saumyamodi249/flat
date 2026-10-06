import { useState } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "../../components/BottomNav";
import WeatherCard from "../components/WeatherCard";
import UrbanDataLayers from "../components/UrbanDataLayers";
import { LAYERS } from "../data";
import useGeoLocation from "../../hooks/useGeoLocation";
import usePanZoom from "../../hooks/usePanZoom";
import { IoCloseCircleOutline, IoClose } from "react-icons/io5";

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSubpageActive = location.pathname !== "/home" && location.pathname !== "/";
  const isContactPage = location.pathname.startsWith("/contact");
  const isOtherSubpageActive = isSubpageActive && !isContactPage;
  const subpageKey = location.pathname.split("/")[1] || "subpage";
  const isGoingHome = location.pathname === "/home" || location.pathname === "/";
  const { coords, isApproximate } = useGeoLocation();
  const [activeLayer, setActiveLayer] = useState(null);
  const [isUrbanDrawerOpen, setIsUrbanDrawerOpen] = useState(false);
  const [initialImageAdjusted, setInitialImageAdjusted] = useState(false);
  const { ref: buildingImageRef } = usePanZoom({
    minScale: 1,
    maxScale: 10,
  });

  return (
    <div className="relative flex flex-col justify-between h-[100dvh] max-h-[100dvh] w-full overflow-hidden bg-[var(--theme-bottom)] select-none touch-none">
      {/* Background images — Building.png (default) or Iscon circle.png (when layer active) with pan and zoom */}
      <div
        ref={buildingImageRef}
        className={`absolute inset-0 w-full h-full select-none touch-none ${isSubpageActive || isUrbanDrawerOpen ? "pointer-events-none" : ""
          }`}
      >
        <AnimatePresence>
          {!activeLayer ? (
            <motion.img
              key="building-view"
              src="/UI IMG/Building.png"
              alt="Riviera Select property"
              draggable={false}
              initial={isOtherSubpageActive ? false : { opacity: 0, scale: 2 }}
              animate={{
                opacity: isSubpageActive ? 0.65 : 1,
                scale: 1,
              }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={
                isOtherSubpageActive
                  ? { duration: 0 }
                  : { duration: 1.8, ease: "easeInOut" }
              }
              onAnimationComplete={() => {
                if (!isOtherSubpageActive) setInitialImageAdjusted(true);
              }}
              className={`absolute inset-0 w-full h-full object-cover select-none transition-[filter] duration-500 ${isSubpageActive ? "blur-[3px] brightness-65" : ""
                }`}
            />
          ) : (
            <motion.img
              key="iscon-circle-view"
              src="/UI IMG/Iscon circle.png"
              alt="Iscon Circle urban layer view"
              draggable={false}
              initial={isOtherSubpageActive ? false : { opacity: 0, scale: 3.75 }}
              animate={{
                opacity: isSubpageActive ? 0.65 : 1,
                scale: 1,
              }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={
                isOtherSubpageActive
                  ? { duration: 0 }
                  : { duration: 1.8, ease: "easeInOut" }
              }
              className={`absolute inset-0 w-full h-full object-cover select-none transition-[filter] duration-500 ${isSubpageActive ? "blur-[3px] brightness-65" : ""
                }`}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ================= TOP BAR ================= */}
      {/* 1. Mobile Top Bar (Screen 1 & 3: phone logo + Weather Pill + filter chain) — Visible on Mobile */}
      {!isContactPage && (
        <div
          className={`relative flex sm:hidden items-start justify-between px-[20px] pt-[20px] w-full transition-all duration-300 ${isSubpageActive ? "z-10 blur-[2px] opacity-55 pointer-events-none" : "z-30"
            }`}
        >
          {/* Mobile Left: phone logo */}
          <div className="h-[42px] flex items-center">
            <Link to="/home" className="cursor-pointer focus:outline-none">
              <img
                src="/UI IMG/phone logo.svg"
                alt="Riviera"
                className="h-[25px] w-[25px] object-contain drop-shadow"
              />
            </Link>
          </div>

          {/* Mobile Center: Weather Pill with condition below */}
          <div className="flex-1 flex justify-center px-2">
            <WeatherCard
              lat={coords.lat}
              lon={coords.lon}
              isApproximate={isApproximate}
              variant="mobile"
            />
          </div>

          {/* Mobile Right: filter chain button (toggles Urban Data Layers bottom drawer) */}
          <div className="h-[42px] flex items-center">
            <button
              type="button"
              onClick={() => setIsUrbanDrawerOpen((prev) => !prev)}
              aria-label="Open Urban Data Layers"
              className="cursor-pointer p-1 active:scale-90 transition-transform flex items-center justify-center"
            >
              <img
                src="/UI IMG/filter chain.svg"
                alt="Filter"
                className="w-6 h-6 object-contain"
              />
            </button>
          </div>
        </div>
      )}

      {/* 2. Desktop Top Bar — Completely static at top, NO Framer Motion on the logo */}
      <div
        className="relative hidden sm:flex flex-row items-center justify-between px-[20px] pt-[20px] gap-3 z-40 pointer-events-auto shrink-0"
      >
        {/* Top logo — No Framer Motion */}
        <div className="flex items-center">
          <Link to="/home" className="cursor-pointer focus:outline-none">
            <img
              src="/UI IMG/top_logo.svg"
              alt="Riviera Select"
              className="h-7 sm:h-7.5 md:h-8 lg:h-12 object-contain drop-shadow"
            />
          </Link>
        </div>

        {/* Top Right: WeatherCard on Home (only when subpage is NOT active) - Slides up to original after image settles */}
        <div className="self-auto">
          <AnimatePresence>
            {!isSubpageActive && (
              <motion.div
                key="desktop-weather-card"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0, transition: { duration: 0.3 } }}
                transition={{
                  duration: 1.8,
                  ease: "easeInOut",
                  delay: initialImageAdjusted ? 0.2 : 1.8,
                }}
              >
                <WeatherCard
                  lat={coords.lat}
                  lon={coords.lon}
                  isApproximate={isApproximate}
                  variant="desktop"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ================= DESKTOP FLOATING URBAN DATA LAYERS — Only on Home page - Slides up to original after image settles ================= */}
      <AnimatePresence>
        {!isSubpageActive && (
          <motion.div
            key="desktop-urban-layers-container"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="relative z-10 flex-1 hidden sm:flex justify-end items-start px-[20px] pt-[20px] pointer-events-none"
          >
            <motion.div
              key="desktop-urban-layers-card"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.8,
                ease: "easeInOut",
                delay: initialImageAdjusted ? 0.2 : 1.8,
              }}
              className="pointer-events-auto"
            >
              <UrbanDataLayers
                lat={coords.lat}
                lon={coords.lon}
                activeLayer={activeLayer}
                onLayerChange={setActiveLayer}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Atmospheric dark overlay sitting at z-20 above all home elements */}
      {isSubpageActive && (
        <div className="fixed inset-0 z-20 bg-[var(--theme-bg-blur)]/20 backdrop-blur-[2px] pointer-events-none transition-all duration-300" />
      )}

      {/* ================= MOBILE URBAN DATA LAYERS DRAWER (Screen 3) ================= */}
      <AnimatePresence>
        {!isSubpageActive && isUrbanDrawerOpen && (
          <div className="fixed inset-0 z-40 sm:hidden">
            {/* Transparent backdrop overlay to click outside without darkening background */}
            <div
              className="absolute inset-0 bg-transparent"
              onClick={() => setIsUrbanDrawerOpen(false)}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="absolute z-10 bottom-[52px] left-0 right-0 rounded-t-[16px] bg-[var(--theme-blur-layer)]/50 backdrop-blur-md text-white shadow-2xl shadow-teal-950/50 select-none overflow-hidden will-change-transform transform-gpu"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header: Title + Close Icon */}
              <div className="flex items-center justify-between p-4 pb-3">
                <h2 className="text-[15px] sm:text-base font-semibold tracking-normal text-white">
                  Urban Data Layers
                </h2>
                <button
                  type="button"
                  onClick={() => setIsUrbanDrawerOpen(false)}
                  className="text-white hover:text-white/80 transition-transform p-1 cursor-pointer flex items-center justify-center"
                  aria-label="Close Urban Data Layers"
                >
                  <IoCloseCircleOutline className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Thin horizontal divider line matching laptop version */}
              <div className="mx-4 border-t border-[var(--theme-UrbanDataLayers-border)] opacity-20" />

              {/* Body: 2x2 Grid exactly like laptop version */}
              <div className="px-4 pb-5 pt-3">
                <div className="grid grid-cols-2 gap-4 sm:gap-3.5">
                  {LAYERS.map((layer) => {
                    const isActive = activeLayer === layer.id;
                    return (
                      <button
                        key={layer.id}
                        type="button"
                        onClick={() => {
                          setActiveLayer(isActive ? null : layer.id);
                        }}
                        aria-pressed={isActive}
                        className={`group relative flex flex-col items-center justify-center p-[10px] rounded-2xl transition-all duration-300 ease-out cursor-pointer min-h-[98px] focus:outline-none ${isActive
                          ? "bg-[var(--theme-blur-layer)]/80 text-white shadow-lg shadow-black/20 border border-transparent"
                          : "bg-transparent hover:bg-[var(--theme-blur-layer)]/80 hover:shadow-lg hover:shadow-black/20 active:bg-[var(--theme-blur-layer)]/80 active:shadow-lg active:shadow-black/20 text-white/80 hover:text-white border border-transparent"
                          }`}
                      >
                        {/* Label on Top */}
                        <span className="text-sm font-semibold tracking-tight text-center text-white mb-2.5">
                          {layer.label}
                        </span>

                        {/* Custom Image */}
                        <div className="relative flex items-center justify-center h-8">
                          <img
                            src={layer.imgSrc}
                            alt={layer.label}
                            className={`h-7 sm:h-8 w-auto max-w-[36px] object-contain select-none transition-transform ${isActive ? "scale-110" : "group-hover:scale-105"
                              }`}
                            onError={(e) => {
                              if (!e.currentTarget.src.includes("UrbanDataLayers")) {
                                e.currentTarget.src = layer.imgSrc.replace(
                                  "/urbandatalayer/",
                                  "/UrbanDataLayers/"
                                );
                              }
                            }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Modal Canvas — Fade & Scale only, ZERO down-to-up motion */}
      <AnimatePresence>
        {isContactPage && (
          <motion.div
            key="contact-canvas"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="fixed inset-0 z-30 flex flex-col pointer-events-auto"
          >
            <Outlet />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subpage Modal Canvas (Amenities, Gallery, Maps, About) - Slides up from bottom on EVERY page navigation */}
      <AnimatePresence>
        {isOtherSubpageActive && (
          <motion.div
            key={subpageKey}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={
              isGoingHome
                ? { y: "100%", opacity: 0, transition: { duration: 1.8, ease: "easeInOut" } }
                : { opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }
            }
            transition={{
              duration: 1.8,
              ease: "easeInOut",
            }}
            className="fixed inset-0 z-30 flex flex-col pointer-events-auto will-change-transform transform-gpu"
          >
            <Outlet />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation — Permanently fixed at bottom, ZERO Framer Motion */}
      <div className="relative w-full z-40 shrink-0">
        <BottomNav />
      </div>
    </div>
  );
}

export default HomePage;

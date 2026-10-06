import { motion } from "framer-motion";
import { CiCircleChevRight, CiCircleChevDown } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import InventoryPageDetail from "../pages/InventoryPageDetail";
import MobileFlatsCarousel from "../components/MobileFlatsCarousel";
import MobileFilterModal from "../components/MobileFilterModal";
import useInventoryStore from "../store/useInventoryStore";
import useInventoryData from "../hooks/useInventoryData";
import { inventoryUI } from "../data";

function InventoryIntroView() {
  const setIsFilterOpen = useInventoryStore((s) => s.setIsFilterOpen);
  const setIsMobileFilterOpen = useInventoryStore((s) => s.setIsMobileFilterOpen);
  const showFlatsCarousel = useInventoryStore((s) => s.showFlatsCarousel);
  const toggleFavoriteUnit = useInventoryStore((s) => s.toggleFavoriteUnit);

  const { activeUnit, carouselUnits } = useInventoryData();

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
      {/* Top Bar (Desktop): Logo */}
      <div className="relative z-30 hidden lg:flex items-center px-[30px] pt-[30px]">
        <img
          src={inventoryUI.logoSrc}
          alt={inventoryUI.logoAlt}
          className="h-12 object-contain drop-shadow"
        />
      </div>

      {/* Top-Right Favorite Circle Button (Desktop only >= 1024px) */}
      <div className="hidden lg:block absolute top-[30px] right-[30px] z-30">
        <button
          type="button"
          aria-label={inventoryUI.wishlistAria}
          onClick={() => toggleFavoriteUnit(activeUnit?.id)}
          className="w-10 h-10 rounded-full border border-white/20 bg-[var(--theme-bg-blur)]/25 backdrop-blur-md flex items-center justify-center text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-default-text)] transition-all cursor-pointer shadow-lg"
        >
          {activeUnit?.isFavorite ? (
            <FaHeart className="w-4 h-4 text-[var(--theme-inventory-heart)]" />
          ) : (
            <FaRegHeart className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Top Bar (Mobile & Tablet): Phone Logo (left) + Center Filters Pill + Right Heart Button */}
      <div className="relative z-30 flex lg:hidden items-center justify-between px-5 pt-[25px] sm:px-[30px] sm:pt-[30px]">
        <div className="flex items-center">
          <img
            src="/UI IMG/phone logo.svg"
            alt="Riviera"
            className="h-8 w-8 sm:h-10 sm:w-10 object-contain drop-shadow"
          />
        </div>

        {/* Center Filters Button */}
        <button
          type="button"
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-[10px] px-4 py-[10px] rounded-full border border-[var(--theme-inventory-filter-border)] text-[var(--theme-inventory-tab-default-text)] cursor-pointer hover:bg-white/5 active:scale-95 transition-all shadow-sm bg-[var(--theme-bg-blur)]/25 backdrop-blur-md"
        >
          <img
            src={inventoryUI.filterIconSrc}
            alt={inventoryUI.filterButtonText}
            className="w-6 h-6 object-contain text-[var(--theme-inventory-filter-text)]"
          />
          <span className="text-normal font-medium tracking-wide text-[var(--theme-inventory-filter-text)]">
            {inventoryUI.filterButtonText}
          </span>
          <CiCircleChevDown className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--theme-inventory-filter-text)]" />
        </button>

        {/* Right Wishlist Heart Button */}
        <button
          type="button"
          aria-label={inventoryUI.wishlistAria}
          onClick={() => toggleFavoriteUnit(activeUnit?.id)}
          className="w-10 h-10 rounded-full border border-white/30 bg-black/25 backdrop-blur-md flex items-center justify-center text-white hover:text-white transition-all cursor-pointer shadow-lg active:scale-90"
        >
          {activeUnit?.isFavorite ? (
            <FaHeart className="w-4 h-4 text-[var(--theme-inventory-heart)]" />
          ) : (
            <FaRegHeart className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Left Floating Filters Button (Desktop only >= 1024px) - Enters from left to current position */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        className="hidden lg:block absolute top-20 left-12 z-30"
      >
        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center mt-[60px] gap-[10px] px-4 py-[10px] rounded-full border border-[var(--theme-inventory-filter-border)] text-[var(--theme-inventory-tab-default-text)] cursor-pointer hover:bg-white/5 transition-colors"
        >
          <img
            src={inventoryUI.filterIconSrc}
            alt={inventoryUI.filterButtonText}
            className="w-6 h-6 object-contain text-[var(--theme-inventory-filter-text)]"
          />
          <span className="text-normal font-medium tracking-wide text-[var(--theme-inventory-filter-text)]">
            {inventoryUI.filterButtonText}
          </span>
          <CiCircleChevRight className="w-8 h-8 text-[var(--theme-inventory-filter-text)]" />
        </button>
      </motion.div>

      {/* Central 3D Building Perspective on Wireframe Floor - Scales up simultaneously */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4 pt-10 sm:pt-12 lg:pt-0 pb-10 sm:pb-3 lg:pb-0">
        <motion.img
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          src={inventoryUI.buildingSrc}
          alt={inventoryUI.buildingAlt}
          className="w-auto h-[88%] sm:h-[88%] lg:h-[84%] max-h-[78vh] sm:max-h-[82vh] lg:max-h-none max-w-[94%] sm:max-w-[95%] object-contain drop-shadow-2xl"
        />
      </div>

      {/* Desktop Unit Card: Top-right (Desktop only >= 1024px) - Enters from right to current position simultaneously */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        className="hidden lg:block absolute top-[90px] right-[30px] z-30 pointer-events-auto"
      >
        <InventoryPageDetail
          unit={activeUnit}
          onToggleFavorite={toggleFavoriteUnit}
        />
      </motion.div>

      {/* Mobile & Tablet Unit Cards: Only visible after user clicks "Show Flats" */}
      {showFlatsCarousel && (
        <MobileFlatsCarousel
          units={carouselUnits}
          onToggleFavorite={toggleFavoriteUnit}
        />
      )}

      {/* Mobile & Tablet Filter Modal (< 1024px) */}
      <MobileFilterModal />
    </div>
  );
}

export default InventoryIntroView;

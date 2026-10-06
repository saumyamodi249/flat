import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { galleryTabs } from "../data";

function GalleryTabs() {
  return (
    <div className="flex items-center justify-center gap-[8.5px] sm:gap-3 md:gap-[12px] w-full max-w-full sm:mb-4 md:mb-[20px] select-none">
      {galleryTabs.map((tab, index) => (
        <motion.div
          key={tab.id}
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            y: {
              type: "spring",
              duration: 1.1,
              bounce: 0.4,
              delay: 1.85 + index * 0.18,
            },
            opacity: {
              duration: 0.3,
              ease: "easeOut",
              delay: 1.85 + index * 0.18,
            },
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="shrink-0 will-change-transform transform-gpu"
        >
          <NavLink
            to={tab.path}
            className={({ isActive }) =>
              `text-center px-[15px] sm:px-[22px] md:px-[25px] py-2.5 sm:py-2.5 md:py-[15px] rounded-[6px] sm:rounded-[10px] text-xs sm:text-sm md:text-base font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap block ${
                isActive
                  ? "bg-[var(--theme-gallery-tab-selected-bg)] text-white shadow-md"
                  : "text-white/80 hover:text-[var(--theme-gallery-tab-hover-text)]"
              }`
            }
          >
            {tab.label}
          </NavLink>
        </motion.div>
      ))}
    </div>
  );
}

export default GalleryTabs;

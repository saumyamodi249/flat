import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { aboutTabs } from "../data";

function AboutTabs() {
  const isFirstEnter = typeof window !== "undefined" && !window.__aboutEntranceDone;

  useEffect(() => {
    const timer = setTimeout(() => {
      window.__aboutEntranceDone = true;
    }, 3400);

    return () => {
      clearTimeout(timer);
      setTimeout(() => {
        if (!window.location.pathname.startsWith("/about")) {
          window.__aboutEntranceDone = false;
        }
      }, 100);
    };
  }, []);

  const getInitialPosition = (tabId) => {
    if (!isFirstEnter) {
      return { x: 0, y: 0, opacity: 1 };
    }

    switch (tabId) {
      case "project":
        // "The Project" comes from the left
        return { x: -160, y: 0, opacity: 0 };
      case "location":
        // "Location" comes from up/top
        return { x: 0, y: -100, opacity: 0 };
      case "developer":
        // "Developer" comes from the right
        return { x: 160, y: 0, opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  const animDelay = isFirstEnter ? 1.85 : 0;
  const animDuration = isFirstEnter ? 1.4 : 0.2;

  return (
    <div className="flex items-center justify-center gap-[8.5px] sm:gap-3 md:gap-6 w-full max-w-full mb-4 sm:mb-6 md:mb-17.5 select-none">
      {aboutTabs.map((tab) => (
        <motion.div
          key={tab.id}
          initial={getInitialPosition(tab.id)}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{
            x: {
              duration: animDuration,
              ease: [0.25, 1, 0.5, 1],
              delay: animDelay,
            },
            y: {
              duration: animDuration,
              ease: [0.25, 1, 0.5, 1],
              delay: animDelay,
            },
            opacity: {
              duration: animDuration,
              ease: "easeOut",
              delay: animDelay,
            },
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="shrink-0 will-change-transform transform-gpu"
        >
          <NavLink
            to={tab.path}
            className={({ isActive }) =>
              `text-center px-3.75 py-2.5 sm:px-4 sm:py-2 md:px-6.25 md:py-3.75 rounded-[10px] text-xs sm:text-sm md:text-base font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap block shrink ${
                isActive
                  ? "bg-[var(--theme-route-about-button-bg)] text-[var(--theme-route-about-button-title-selected-bg)] shadow-md"
                  : "text-[var(--theme-route-about-button-title-default-bg)]/80 hover:text-[var(--theme-route-about-button-title-default-bg)]"
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

export default AboutTabs;

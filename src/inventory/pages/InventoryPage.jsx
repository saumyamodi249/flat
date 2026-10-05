import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "../../components/BottomNav";
import InventoryIntroView from "../views/InventoryIntroView";
import InventoryFilterView from "../views/InventoryFilterView";
import useInventoryStore from "../store/useInventoryStore";

function InventoryPage() {
  const isFilterOpen = useInventoryStore((s) => s.isFilterOpen);

  // Responsive Desktop detection
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showDesktopFilterView = isFilterOpen && isDesktop;

  return (
    <div className="fixed inset-0 h-full w-full overflow-hidden flex flex-col justify-between bg-[var(--theme-inventory-img-bg)] select-none">
      {/* Main Content Area */}
      <main className="relative flex-1 min-h-0 w-full flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {!showDesktopFilterView ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full flex flex-col"
            >
              <InventoryIntroView />
            </motion.div>
          ) : (
            <motion.div
              key="filter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full flex flex-col"
            >
              <InventoryFilterView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <footer className="relative w-full z-40 shrink-0 h-13 md:h-14">
        <BottomNav />
      </footer>
    </div>
  );
}

export default InventoryPage;

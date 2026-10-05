import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

function TopNav({ title = "About", rightContent = null, onClose }) {
  const navigate = useNavigate();
  const handleClose = onClose || (() => navigate("/home"));

  return (
    <header className="relative z-30 flex items-center justify-between px-[30px] sm:pt-[30px] w-full max-w-full">
      {/* Left side: Transparent spacer for root logo */}
      <div className="h-12 w-12 shrink-0 pointer-events-none" />

      {/* Right controls: Close button WITH FRAMER MOTION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: -8 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 pointer-events-auto"
      >
        {rightContent}
        <button
          type="button"
          onClick={handleClose}
          aria-label={`Close ${title || "Page"}`}
          className="w-9 h-9 rounded-full bg-[#002E2D]/90 border border-white/20 text-white flex items-center justify-center hover:bg-[#002E2D] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
        >
          <IoClose className="w-5 h-5" />
        </button>
      </motion.div>
    </header>
  );
}

export default TopNav;

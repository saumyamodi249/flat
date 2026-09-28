import React from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function TopNav({ title = "About", rightContent = null, onClose }) {
  const navigate = useNavigate();
  const handleClose = onClose || (() => navigate("/home"));

  return (
    <header className="relative z-30 flex items-center justify-between px-[30px] sm:pt-[30px] w-full max-w-full">
      <div className="flex items-center gap-3">
        {/* Mobile: title */}
        {title && (
          <span className="sm:hidden text-lg font-semibold tracking-wide text-white">
            {title}
          </span>
        )}

        {/* Desktop: Top Riviera Select Logo */}
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="hidden sm:block cursor-pointer transition-transform hover:scale-102 focus:outline-none"
          aria-label="Go to Home"
        >
          <img
            src="/UI IMG/top_logo.svg"
            alt="Riviera Select"
            className="h-12 object-contain drop-shadow"
          />
        </button>
      </div>

      {/* Right controls: optional extra content + Close button */}
      <div className="flex items-center gap-3">
        {rightContent}
        <button
          type="button"
          onClick={handleClose}
          aria-label={`Close ${title || "Page"}`}
          className="w-9 h-9 rounded-full bg-[#002E2D]/90 border border-white/20 text-[var(--theme-about-title)] flex items-center justify-center "
        >
          <IoClose className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

export default TopNav;

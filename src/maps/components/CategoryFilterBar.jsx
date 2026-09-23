import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IoLocationOutline,
  IoSchoolOutline,
  IoMedicalOutline,
  IoGameControllerOutline,
  IoRestaurantOutline,
  IoBedOutline,
  IoBagHandleOutline,
  IoLeafOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import { HiOutlineBriefcase } from "react-icons/hi";

const CATEGORY_ICONS = {
  all: IoLocationOutline,
  business: HiOutlineBriefcase,
  education: IoSchoolOutline,
  hospital: IoMedicalOutline,
  fun: IoGameControllerOutline,
  food: IoRestaurantOutline,
  hotel: IoBedOutline,
  mall: IoBagHandleOutline,
  parks: IoLeafOutline,
};

function CategoryFilterBar({ categories }) {
  const { category = "parks" } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const buttonRefs = useRef({});

  // Scroll boundary state for showing/hiding arrows
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse drag scrolling state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const draggedDistance = useRef(0);

  // Check if scrolled to start or end
  const checkScrollBounds = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    // Hide left arrow if at start (scrollLeft <= 4)
    setCanScrollLeft(scrollLeft > 4);
    // Hide right arrow if at end / last option (scrollLeft >= maxScroll - 4)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  useEffect(() => {
    checkScrollBounds();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScrollBounds, { passive: true });
    window.addEventListener("resize", checkScrollBounds);

    return () => {
      el.removeEventListener("scroll", checkScrollBounds);
      window.removeEventListener("resize", checkScrollBounds);
    };
  }, [categories]);

  // Smoothly center the active category on route change
  useEffect(() => {
    if (buttonRefs.current[category]) {
      buttonRefs.current[category].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setTimeout(checkScrollBounds, 350);
    }
  }, [category]);

  // Click scroll buttons (left & right)
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScrollBounds, 320);
    }
  };

  // Mouse drag-to-scroll handlers (drag left and right on both sides)
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    draggedDistance.current = 0;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    draggedDistance.current = Math.abs(walk);
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
    checkScrollBounds();
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setTimeout(() => {
      draggedDistance.current = 0;
    }, 60);
  };

  const handleCategoryClick = (catId) => {
    // If the user was dragging the bar, don't trigger button click
    if (draggedDistance.current > 5) return;
    navigate(`/maps/${catId}`);
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 w-full max-w-full select-none relative">
      {/* Scrollable & Draggable Category Route Buttons */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto scrollbar-none py-1 px-1 flex-1 cursor-grab active:cursor-grabbing select-none"
      >
        {categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.id] || IoLocationOutline;
          const isActive = category === cat.id;

          return (
            <button
              key={cat.id}
              ref={(el) => (buttonRefs.current[cat.id] = el)}
              type="button"
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer border shrink-0 ${isActive
                  ? "bg-[var(--theme-map-border)] text-[var(--theme-route-map-button-title-selected-bg)] border-[var(--theme-map-border)] font-semibold shadow-md scale-102"
                  : "bg-[var(--theme-map-bg)]/70 hover:bg-[var(--theme-map-bg)] text-[var(--theme-route-map-button-title-default-bg)]/80 hover:text-[var(--theme-route-map-button-title-default-bg)] border-[var(--theme-map-border)]/30 hover:border-[var(--theme-map-border)]/60"
                }`}
            >
              {cat.icon ? (
                <span className="text-sm leading-none shrink-0">{cat.icon}</span>
              ) : (
                <Icon
                  className={`w-4 h-4 shrink-0 ${isActive
                      ? "text-[var(--theme-route-map-button-title-selected-bg)]"
                      : "text-[var(--theme-route-map-button-title-default-bg)]/70"
                    }`}
                />
              )}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Carousel Navigation Arrows (Removed when reaching start/end) */}
      <div className="flex items-center gap-1.5 shrink-0 pl-1">
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Previous categories"
            title="Scroll left"
            className="w-8 h-8 rounded-full border border-[var(--theme-map-border)]/40 bg-[var(--theme-map-bg)]/80 text-[var(--theme-route-map-button-title-default-bg)]/90 hover:text-[var(--theme-route-map-button-title-default-bg)] hover:border-[var(--theme-map-border)] hover:bg-[var(--theme-map-bg)] flex items-center justify-center transition-all cursor-pointer shadow animate-fadeIn"
          >
            <IoChevronBack className="w-4 h-4" />
          </button>
        )}

        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Next categories"
            title="Scroll right"
            className="w-8 h-8 rounded-full border border-[var(--theme-map-border)] bg-[var(--theme-map-border)] text-[var(--theme-route-map-button-title-selected-bg)] hover:brightness-110 flex items-center justify-center transition-all cursor-pointer shadow animate-fadeIn"
          >
            <IoChevronForward className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default CategoryFilterBar;

import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CATEGORY_ICONS } from "../data";

function CategoryFilterBar({ categories }) {
  const { category = "parks" } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const buttonRefs = useRef({});

  // Active arrow selection state: "right" (default matching design) or "left"
  const [selectedArrow, setSelectedArrow] = useState("right");

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
        className="flex items-center gap-4 overflow-x-auto scrollbar-none flex-1 cursor-grab active:cursor-grabbing select-none"
      >
        {categories.map((cat) => {
          const isActive = category === cat.id;

          return (
            <button
              key={cat.id}
              ref={(el) => (buttonRefs.current[cat.id] = el)}
              type="button"
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex items-center gap-[10px] px-4 py-2 rounded-[10px] text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer border border-[1px] shrink-0 ${isActive
                ? "bg-[var(--theme-map-button-selected-bg)] text-[var(--theme-map-left)] border-[var(--theme-map-button-selected-bg)]"
                : "bg-[var(--theme-map-button-default-bg)] text-[var(--theme-route-map-button-title-default-bg)] border-[var(--theme-map-border)]/90"
                }`}
            >
              {CATEGORY_ICONS[cat.id] ? (
                <span
                  aria-hidden="true"
                  className="w-4 h-4 shrink-0 inline-block transition-colors duration-200"
                  style={{
                    maskImage: `url("${CATEGORY_ICONS[cat.id]}")`,
                    WebkitMaskImage: `url("${CATEGORY_ICONS[cat.id]}")`,
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    backgroundColor: isActive
                      ? "var(--theme-icon-selected-color, #F7E4CF)"
                      : "var(--theme-icon-color, #C09973)",
                  }}
                />
              ) : null}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Carousel Navigation Arrows (Exact 30x30 circles matching design) */}
      <div className="flex items-center gap-2 shrink-0 pl-1">
        <button
          type="button"
          onClick={() => {
            handleScroll("left");
            setSelectedArrow("left");
          }}
          aria-label="Previous categories"
          title="Scroll left"
          className={`w-[30px] h-[30px] rounded-full flex items-center justify-center transition-all cursor-pointer select-none shrink-0 ${
            selectedArrow === "left"
              ? "bg-[var(--theme-map-button-selected-bg)] text-[var(--theme-map-left)] shadow-sm"
              : "border border-[var(--theme-map-left)] bg-transparent text-[var(--theme-map-left)]"
          }`}
        >
          <svg width="10" height="14" viewBox="0 0 10 16" fill="none" className="stroke-current">
            <path d="M8 2L2 8L8 14" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => {
            handleScroll("right");
            setSelectedArrow("right");
          }}
          aria-label="Next categories"
          title="Scroll right"
          className={`w-[30px] h-[30px] rounded-full flex items-center justify-center transition-all cursor-pointer select-none shrink-0 ${
            selectedArrow === "right"
              ? "bg-[var(--theme-map-button-selected-bg)] text-[var(--theme-map-left)] shadow-sm"
              : "border border-[var(--theme-map-left)] bg-transparent text-[var(--theme-map-left)]"
          }`}
        >
          <svg width="10" height="14" viewBox="0 0 10 16" fill="none" className="stroke-current">
            <path d="M2 2L8 8L2 14" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CategoryFilterBar;

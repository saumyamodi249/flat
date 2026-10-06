import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CategoryFilterBar({ categories }) {
  const { category = "waiting-lounge" } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const set0Ref = useRef(null);
  const set1Ref = useRef(null);
  const setWidthRef = useRef(0);
  const scrollEndTimer = useRef(null);
  const chakkarRaf = useRef(null);
  const userInteracted = useRef(false);

  // Active arrow selection state: "right" (default) or "left"
  const [selectedArrow, setSelectedArrow] = useState("right");

  // Mouse drag scrolling state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const draggedDistance = useRef(0);

  // Measure single loop set width
  const updateSetWidth = useCallback(() => {
    if (set0Ref.current && set1Ref.current) {
      const width = set1Ref.current.offsetLeft - set0Ref.current.offsetLeft;
      if (width > 0) {
        setWidthRef.current = width;
      }
    }
  }, []);

  // Infinite 360 scroll wrap handler: ensures scroll never ends in either direction
  const normalizeScrollPosition = useCallback(() => {
    const el = scrollRef.current;
    const setWidth = setWidthRef.current;
    if (!el || !setWidth || setWidth <= 0) return;

    if (el.scrollLeft >= 3 * setWidth) {
      el.scrollLeft -= setWidth;
    } else if (el.scrollLeft <= setWidth) {
      el.scrollLeft += setWidth;
    }
  }, []);

  // Perform one complete circular chakkar:
  // Glides smoothly through every amenity category and lands right back at the start
  const runCircularChakkar = useCallback(() => {
    const el = scrollRef.current;
    const setWidth = setWidthRef.current;
    if (!el || !setWidth || setWidth <= 0 || userInteracted.current) return;

    // Start aligned at Set 1
    const startScroll = setWidth;
    el.scrollLeft = startScroll;
    const duration = 3600; // 3.6 seconds smooth luxury showcase
    const startTime = performance.now();

    const animateChakkar = (now) => {
      if (userInteracted.current) return;

      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth Ease-in-out cubic trajectory
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      el.scrollLeft = startScroll + setWidth * ease;

      if (progress < 1) {
        chakkarRaf.current = requestAnimationFrame(animateChakkar);
      } else {
        // Complete full 360 circle: smoothly settled back at start
        normalizeScrollPosition();
      }
    };

    chakkarRaf.current = requestAnimationFrame(animateChakkar);
  }, [normalizeScrollPosition]);

  // Setup loop and trigger the circular chakkar on mount
  useEffect(() => {
    updateSetWidth();
    userInteracted.current = false;

    const frameId = requestAnimationFrame(() => {
      updateSetWidth();
      if (scrollRef.current && setWidthRef.current > 0) {
        scrollRef.current.scrollLeft = setWidthRef.current; // aligned at Set 1
      }
    });

    // Run the circular 360 chakkar after 450ms entrance delay
    const tourTimer = setTimeout(() => {
      runCircularChakkar();
    }, 450);

    const handleResize = () => {
      updateSetWidth();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(tourTimer);
      if (chakkarRaf.current) cancelAnimationFrame(chakkarRaf.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [categories, runCircularChakkar, updateSetWidth]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    const setWidth = setWidthRef.current;
    if (!el || !setWidth) return;

    // Boundary safety guard for high-velocity wheel/drag
    if (el.scrollLeft >= 3.8 * setWidth) {
      el.scrollLeft -= setWidth;
    } else if (el.scrollLeft <= 0.2 * setWidth) {
      el.scrollLeft += setWidth;
    }

    // Seamless normalization once smooth scroll/drag settles
    if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
    scrollEndTimer.current = setTimeout(() => {
      normalizeScrollPosition();
    }, 80);
  }, [normalizeScrollPosition]);

  // Mouse wheel horizontal scroll handler (scrolls 360 infinitely left and right)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      userInteracted.current = true;
      if (chakkarRaf.current) cancelAnimationFrame(chakkarRaf.current);

      if (e.deltaY !== 0 || e.deltaX !== 0) {
        e.preventDefault();
        const scrollDelta = e.deltaY !== 0 ? e.deltaY * 1.2 : e.deltaX;
        el.scrollLeft += scrollDelta;
        handleScroll();
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [handleScroll]);

  // Arrow navigation buttons (infinite 360 rotation, never disabled)
  const handleArrowScroll = (direction) => {
    userInteracted.current = true;
    if (chakkarRaf.current) cancelAnimationFrame(chakkarRaf.current);

    setSelectedArrow(direction);
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Mouse drag-to-scroll handlers (drag left and right with continuous wrap)
  const handleMouseDown = (e) => {
    userInteracted.current = true;
    if (chakkarRaf.current) cancelAnimationFrame(chakkarRaf.current);

    if (!scrollRef.current) return;
    isDragging.current = true;
    draggedDistance.current = 0;
    startX.current = e.pageX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX;
    const delta = (x - startX.current) * 1.3;
    draggedDistance.current += Math.abs(delta);
    scrollRef.current.scrollLeft -= delta;
    startX.current = x;
    handleScroll();
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setTimeout(() => {
      draggedDistance.current = 0;
    }, 80);
  };

  const handleCategoryClick = (catId) => {
    if (draggedDistance.current > 6) return;
    userInteracted.current = true;
    if (chakkarRaf.current) cancelAnimationFrame(chakkarRaf.current);
    navigate(`/amenities/${catId}`);
  };

  return (
    <div className="flex flex-col w-full max-w-full select-none">
      {/* Main Amenity Category Filter Bar */}
      <div
        className="relative flex items-center w-full max-w-full select-none"
        style={{ perspective: 1200 }}
      >
        {/* Scrollable & Draggable Amenity Route Buttons (Infinite 360 Loop) */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex items-center overflow-x-auto scrollbar-none w-full cursor-grab active:cursor-grabbing select-none pr-[90px]"
        >
          <div className="flex items-center gap-4 shrink-0">
            {[0, 1, 2, 3, 4].map((setIndex) => (
              <div
                key={setIndex}
                ref={setIndex === 0 ? set0Ref : setIndex === 1 ? set1Ref : null}
                className="flex items-center gap-4 shrink-0"
              >
                {categories.map((cat) => {
                  const isActive = category === cat.id;

                  return (
                    <div
                      key={`${cat.id}-${setIndex}`}
                      className="shrink-0"
                    >
                      <button
                        type="button"
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`flex items-center gap-[10px] px-4 py-2 rounded-[10px] text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-200 cursor-pointer border border-[1px] shrink-0 ${
                          isActive
                            ? "bg-[var(--theme-amenity-button-selected-bg)] text-[var(--theme-amenity-left)] border-[var(--theme-amenity-button-selected-bg)]"
                            : "bg-[var(--theme-amenity-button-default-bg)] text-[var(--theme-route-amenity-button-title-default-bg)] border-[var(--theme-amenity-border)]/90"
                        }`}
                      >
                        {cat.icon ? (
                          <span
                            aria-hidden="true"
                            className="w-6 h-6 shrink-0 inline-block transition-colors duration-200"
                            style={{
                              maskImage: `url("${cat.icon}")`,
                              WebkitMaskImage: `url("${cat.icon}")`,
                              maskSize: "contain",
                              WebkitMaskSize: "contain",
                              maskRepeat: "no-repeat",
                              WebkitMaskRepeat: "no-repeat",
                              maskPosition: "center",
                              WebkitMaskPosition: "center",
                              backgroundColor: isActive
                                ? "var(--theme-amenity-left)"
                                : "var(--theme-amenity-border)",
                            }}
                          />
                        ) : null}
                        <span>{cat.label}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Right Linear Gradient Fade Overlay with Navigation Arrows */}
        <div
          className="absolute right-0 top-0 bottom-0 flex items-center justify-end pl-8 pr-0 pointer-events-none z-10 w-[140px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(0, 46, 45, 0) 0%, rgba(0, 46, 45, 0.75) 45%, var(--theme-amenity-bg) 85%, var(--theme-amenity-bg) 100%)",
          }}
        >
          {/* Carousel Navigation Arrows: Always enabled for 360 continuous scrolling */}
          <div className="flex items-center gap-2 shrink-0 pointer-events-auto">
            <button
              type="button"
              onClick={() => handleArrowScroll("left")}
              aria-label="Previous amenities"
              title="Scroll left"
              className={`w-[30px] h-[30px] rounded-full flex items-center justify-center transition-colors duration-200 select-none shrink-0 cursor-pointer ${
                selectedArrow === "left"
                  ? "bg-[var(--theme-amenity-button-selected-bg)] text-[var(--theme-amenity-left)] shadow-sm"
                  : "border border-[var(--theme-amenity-left)] bg-transparent text-[var(--theme-amenity-left)]"
              }`}
            >
              <svg
                width="10"
                height="14"
                viewBox="0 0 10 16"
                fill="none"
                className="stroke-current"
              >
                <path
                  d="M8 2L2 8L8 14"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => handleArrowScroll("right")}
              aria-label="Next amenities"
              title="Scroll right"
              className={`w-[30px] h-[30px] rounded-full flex items-center justify-center transition-colors duration-200 select-none shrink-0 cursor-pointer ${
                selectedArrow === "right"
                  ? "bg-[var(--theme-amenity-button-selected-bg)] text-[var(--theme-amenity-left)] shadow-sm"
                  : "border border-[var(--theme-amenity-left)] bg-transparent text-[var(--theme-amenity-left)]"
              }`}
            >
              <svg
                width="10"
                height="14"
                viewBox="0 0 10 16"
                fill="none"
                className="stroke-current"
              >
                <path
                  d="M2 2L8 8L2 14"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilterBar;

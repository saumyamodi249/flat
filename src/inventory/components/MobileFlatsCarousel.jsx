import { useRef } from "react";
import InventoryPageDetail from "../pages/InventoryPageDetail";

function MobileFlatsCarousel({ units, onToggleFavorite, className = "" }) {
  const carouselRef = useRef(null);
  const isDraggingCarousel = useRef(false);
  const startXCarousel = useRef(0);
  const scrollLeftCarousel = useRef(0);

  const handlePointerDown = (e) => {
    if (!carouselRef.current) return;
    isDraggingCarousel.current = true;
    startXCarousel.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftCarousel.current = carouselRef.current.scrollLeft;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingCarousel.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXCarousel.current) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftCarousel.current - walk;
  };

  const handlePointerUp = () => {
    isDraggingCarousel.current = false;
  };

  const handlePointerLeave = () => {
    isDraggingCarousel.current = false;
  };

  if (!units || units.length === 0) return null;

  return (
    <div className={`lg:hidden absolute bottom-[62px] left-0 right-0 z-30 pointer-events-auto animate-fadeIn ${className}`}>
      <div
        ref={carouselRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        className="w-full flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none px-4 sm:px-8 snap-x cursor-grab active:cursor-grabbing select-none"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {units.map((u) => (
          <div key={u.id} className="w-[280px] sm:w-[320px] shrink-0 snap-center">
            <InventoryPageDetail
              unit={u}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MobileFlatsCarousel;

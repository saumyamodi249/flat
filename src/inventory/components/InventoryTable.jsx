import { useRef, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { inventoryTableHeaders } from "../data";

function InventoryTable({
  units = [],
  activeUnit,
  onSelectUnit,
  onToggleFavorite,
  className = "",
}) {
  const tableRowsRef = useRef(null);

  useEffect(() => {
    const el = tableRowsRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const isScrollable = scrollHeight > clientHeight;
      if (!isScrollable) return;

      const isAtTop = scrollTop <= 0;
      const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
        // Normal scroll inside table
        e.stopPropagation();
      } else {
        // At boundary: prevent wheel from scrolling the outer page/panel!
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [units]);

  return (
    <div className={`shrink-0 w-full flex flex-col pt-2 pb-0 ${className}`}>
      {/* Flat Option: Table Header */}
      <div className="shrink-0 w-full grid grid-cols-5 text-sm sm:text-base text-[var(--theme-inventory-5tab)] font-medium items-center pb-1">
        {inventoryTableHeaders.map((header) => (
          <span
            key={header.key}
            className="col-span-1 text-center flex items-center justify-center whitespace-nowrap"
          >
            {header.label}
          </span>
        ))}
        <span className="col-span-1 text-center flex items-center justify-center text-[var(--theme-inventory-heart)]">
          <FaHeart className="w-4 h-4" />
        </span>
      </div>

      {/* Flat Option: Table Rows (Exactly 5 flats visible at 200px, isolated inner scroll without visible scrollbar) */}
      <div
        ref={tableRowsRef}
        style={{
          height: "200px",
          maxHeight: "200px",
          overscrollBehavior: "contain",
        }}
        className="w-full flex flex-col overflow-y-auto scrollbar-none overscroll-contain"
      >
        {units.map((u) => {
          const isSelected = activeUnit?.unitNo === u.unitNo;
          return (
            <div
              key={u.id}
              onClick={() => onSelectUnit && onSelectUnit(u)}
              style={{ height: "40px" }}
              className={`w-full h-[40px] shrink-0 grid grid-cols-5 text-sm sm:text-base font-normal text-[var(--theme-inventory-tab-default-text)] items-center py-2 cursor-pointer transition-colors ${
                isSelected ? "bg-white/10" : "hover:bg-white/5"
              }`}
            >
              <span className="col-span-1 text-center flex items-center justify-center font-medium whitespace-nowrap">
                {u.unitNo ? u.unitNo.replace(/^Unit\s*(?:No\.?)?\s*/i, "") : ""}
              </span>
              <span className="col-span-1 text-center flex items-center justify-center whitespace-nowrap">
                {u.type}
              </span>
              <span className="col-span-1 text-center flex items-center justify-center whitespace-nowrap">
                {u.exposure}
              </span>
              <span className="col-span-1 text-center flex items-center justify-center whitespace-nowrap">
                {u.area}
              </span>
              <span className="col-span-1 text-center flex items-center justify-center">
                <button
                  type="button"
                  onClick={(e) => onToggleFavorite && onToggleFavorite(u.id, e)}
                  className="text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-default-text)] cursor-pointer flex items-center justify-center transition-transform hover:scale-110 active:scale-125"
                >
                  {u.isFavorite ? (
                    <FaHeart className="w-4 h-4 text-[var(--theme-inventory-heart)]" />
                  ) : (
                    <FaRegHeart className="w-4 h-4 text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-default-text)]" />
                  )}
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InventoryTable;

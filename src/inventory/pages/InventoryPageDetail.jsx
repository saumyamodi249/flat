import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { inventoryUI, defaultFeaturedUnit } from "../data";

function InventoryPageDetail({ unit: propUnit, onToggleFavorite, className = "" }) {
  const [fallbackUnit, setFallbackUnit] = React.useState(defaultFeaturedUnit);
  const unit = propUnit || fallbackUnit;

  const isFavorite = Boolean(unit?.isFavorite);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(unit.id, e);
    } else {
      setFallbackUnit((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    }
  };

  // Status color using CSS variables
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "sold":
        return "text-[var(--theme-InventoryDetail-sold)]";
      case "available":
        return "text-[var(--theme-InventoryDetail-Available)]";
      case "reserved":
        return "text-[var(--theme-InventoryDetail-Reserved)]";
      case "leased":
        return "text-[var(--theme-InventoryDetail-Leased)]";
      default:
        return "text-[var(--theme-InventoryDetail-sold)]";
    }
  };

  return (
    <div
      className={`w-[260px] sm:w-[280px] lg:w-[300px] max-w-full rounded-[10px] border border-[var(--theme-InventoryDetail-box-border)] bg-[var(--theme-InventoryDetail-box-bg)]/90 backdrop-blur-md p-4 flex flex-col text-[var(--theme-InventoryDetail-tab-default-text)] transition-all duration-300 ${className}`}
    >

      {/* 1st Div: Unit No + Status */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-xl font-semibold text-[var(--theme-InventoryDetail-tab-default-text)]">
          {unit?.unitNo
            ? unit.unitNo.startsWith("Unit No.")
              ? unit.unitNo
              : `Unit No. ${unit.unitNo}`
            : "Unit No. N/A"}
        </div>
        <div className={`text-sm font-semibold ${getStatusColor(unit?.status)}`}>
          {unit?.status}
        </div>
      </div>

      {/* 2nd Div: Border Line */}
      <div className="w-full" style={{ borderTop: "0.5px solid var(--theme-InventoryDetail-inner-border)" }}></div>

      {/* 3rd Div: Floor/Exposure + Area/Heart */}
      <div className="flex flex-col gap-4 my-4">

        {/* 3rd > 1st Div: Floor + Exposure */}
        <div className="flex items-center justify-between">
          <div className="text-[16px] font-normal text-[var(--theme-InventoryDetail-tab-default-text)]">
            {unit?.floor || "Floor N/A"}
          </div>
          <div className="flex items-center gap-1.5">
            <div>
              <img src="/Inventory/Compass.svg" alt="Compass" className="h-6 w-6" />
            </div>
            <div className="text-[16px] font-medium text-[var(--theme-InventoryDetail-tab-default-text)]">
              {unit?.exposure || "N/A"}
            </div>
          </div>
        </div>

        {/* 3rd > 2nd Div: Area + Heart */}
        <div className="flex items-center justify-between">
          <div className="text-[16px] font-normal text-[var(--theme-InventoryDetail-tab-default-text)]">
            {typeof unit?.area === "number"
              ? `${unit.area} ${inventoryUI.sqFtUnit || "Sq.ft"}`
              : (unit?.area || "")}
          </div>
          <div className="flex items-center">
            <button
              type="button"
              aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
              onClick={handleFavoriteClick}
              className="cursor-pointer hover:scale-110 active:scale-125 transition-transform"
            >
              {isFavorite ? (
                <FaHeart className="h-6 w-6 text-[var(--theme-InventoryDetail-sold)]" />
              ) : (
                <FaRegHeart className="h-6 w-6 text-[var(--theme-InventoryDetail-tab-default-text)]" />
              )}
            </button>
          </div>
        </div>

      </div>

      {/* 4th Div: Action Buttons */}
      <div className="flex flex-col gap-2">

        {/* 4th > 1st Div: View Property */}
        <div className="flex items-center justify-center gap-2 px-[33.5px] py-3 rounded-[8px] border border-[var(--theme-InventoryDetail-inner-box-border)] cursor-pointer hover:bg-white/5 transition-colors">
          <img src="/Inventory/360 View.svg" alt="360 View" className="h-6 w-6" />
          <span className="text-[16px] font-medium text-[var(--theme-InventoryDetail-tab-default-text)]">
            {inventoryUI.viewPropertyText || "View Property"}
          </span>
        </div>

        {/* 4th > 2nd Div: Floor Plan */}
        <div className="flex items-center justify-center gap-2 px-[50px] py-3 rounded-[8px] border border-[var(--theme-InventoryDetail-inner-box-border)] cursor-pointer hover:bg-white/5 transition-colors">
          <img src="/Inventory/floor-plan.svg" alt="Floor Plan" className="h-6 w-6" />
          <span className="text-[16px] font-medium text-[var(--theme-InventoryDetail-tab-default-text)]">
            {inventoryUI.floorPlanText || "Floor Plan"}
          </span>
        </div>

      </div>

    </div>
  );
}

export default InventoryPageDetail;

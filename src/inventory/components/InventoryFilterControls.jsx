import {
  inventoryPropertyTypes,
  inventoryExposures,
  inventoryPropertyStatuses,
  inventoryUI,
} from "../data";
import AreaRangeSlider from "./AreaRangeSlider";

function InventoryFilterControls({
  selectedPropertyType,
  setSelectedPropertyType,
  selectedExposure,
  setSelectedExposure,
  selectedStatus,
  setSelectedStatus,
  minArea,
  setMinArea,
  maxArea,
  setMaxArea,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-4 sm:gap-5 ${className}`}>
      <div className="flex flex-col gap-8">
        {/* Sub-Div 2: Property Type */}
        <div className="flex flex-col gap-4">
          <span className="text-[var(--theme-inventory-tab-default-text)] text-sm font-medium">
            {inventoryUI.propertyTypeLabel}
          </span>
          <div className="flex items-center gap-1 px-3 py-2 rounded-[10px] bg-[var(--theme-inventory-all-button)]">
            {inventoryPropertyTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedPropertyType(type)}
                className={`flex-1 py-2 px-4 rounded-[10px] text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedPropertyType === type
                    ? "bg-[var(--theme-inventory-tab-selected-bg,#C09973)] text-[var(--theme-inventory-tab-selected-text,#FFFFFF)] shadow"
                    : "text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-hover-text,#F7E4CF)]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-Div 3: Exposure */}
        <div className="flex flex-col gap-4">
          <span className="text-[var(--theme-inventory-tab-default-text)] text-sm font-medium">
            {inventoryUI.exposureLabel}
          </span>
          <div className="flex items-center gap-1 px-3 py-2 rounded-[10px] bg-[var(--theme-inventory-all-button)]">
            {inventoryExposures.map((exp) => (
              <button
                key={exp}
                type="button"
                onClick={() => setSelectedExposure(exp)}
                className={`flex-1 py-2 px-4 rounded-[10px] text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedExposure === exp
                    ? "bg-[var(--theme-inventory-tab-selected-bg,#C09973)] text-[var(--theme-inventory-tab-selected-text,#FFFFFF)] shadow"
                    : "text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-hover-text,#F7E4CF)]"
                }`}
              >
                {exp}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-Div 4: Property Status */}
        <div className="flex flex-col gap-4">
          <span className="text-[var(--theme-inventory-tab-default-text)] text-sm font-medium">
            {inventoryUI.propertyStatusLabel}
          </span>
          <div className="flex items-center gap-1 px-3 py-2 rounded-[10px] bg-[var(--theme-inventory-all-button)]">
            {inventoryPropertyStatuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={`flex-1 py-2 px-4 rounded-[10px] text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedStatus === status
                    ? "bg-[var(--theme-inventory-tab-selected-bg,#C09973)] text-[var(--theme-inventory-tab-selected-text,#FFFFFF)] shadow"
                    : "text-[var(--theme-inventory-tab-default-text)] hover:text-[var(--theme-inventory-tab-hover-text,#F7E4CF)]"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DIV 2: Area Size Range */}
      <div className="flex flex-col gap-6">
        {/* 1st Div: Area Size Label and 2 Small Boxes for Min / Max */}
        <div className="flex flex-col gap-4">
          <span className="text-[var(--theme-inventory-tab-default-text)] text-sm font-medium">
            {inventoryUI.areaSizeLabel}
          </span>
          <div className="grid grid-cols-2 gap-4">
            {/* Min Box */}
            <div className="flex items-center px-4 py-[9px] rounded-[10px] border border-1 border-[var(--theme-inventory-filter-border)]/50 bg-[var(--theme-inventory-all-button)] text-[var(--theme-inventory-tab-default-text)] text-xs sm:text-sm">
              <input
                type="number"
                placeholder={inventoryUI.minPlaceholder}
                value={minArea}
                onChange={(e) => setMinArea(e.target.value)}
                className="w-full bg-transparent outline-none text-[var(--theme-inventory-tab-default-text)] placeholder-white/50 text-xs sm:text-sm"
              />
            </div>
            {/* Max Box */}
            <div className="flex items-center px-4 py-[9px] rounded-[10px] border border-[var(--theme-inventory-filter-border)]/50 bg-[var(--theme-inventory-all-button)] text-[var(--theme-inventory-tab-default-text)] text-xs sm:text-sm">
              <input
                type="number"
                placeholder={inventoryUI.maxPlaceholder}
                value={maxArea}
                onChange={(e) => setMaxArea(e.target.value)}
                className="w-full bg-transparent outline-none text-[var(--theme-inventory-tab-default-text)] placeholder-white/50 text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* 2nd Div: Range Limit Line with labels min & max */}
        <AreaRangeSlider
          minArea={minArea}
          maxArea={maxArea}
          setMinArea={setMinArea}
          setMaxArea={setMaxArea}
        />
      </div>
    </div>
  );
}

export default InventoryFilterControls;

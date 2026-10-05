// Static Data & UI Labels for Inventory Page

export const inventoryUI = {
  // Brand & Media Assets
  logoSrc: "/Inventory/Riviera_logo.svg",
  logoAlt: "Riviera Select",
  buildingSrc: "/Inventory/Front_building.svg",
  buildingAlt: "Riviera Building 3D View",
  filterIconSrc: "/Inventory/Filter.svg",
  filterIconAlt: "Filter",

  // Buttons & Controls
  filterButtonText: "Filters",
  filterTitle: "Filter",
  resetFiltersText: "Reset Filters",
  collapseFilterAria: "Collapse Filters",
  wishlistAria: "Wishlist",

  // Filter Form Section Labels
  propertyTypeLabel: "Property Type",
  exposureLabel: "Exposure",
  propertyStatusLabel: "Property Status",
  areaSizeLabel: "Area Size (Sq. ft.)",

  // Slider & Input Placeholders / Units
  minPlaceholder: "Min",
  maxPlaceholder: "Max",
  sqFtUnit: "Sq.ft",
  sliderCircleSrc: "/Inventory/circle_limit.svg",

  // Unit Card Action Buttons
  viewPropertyText: "View Property",
  floorPlanText: "Floor Plan",
};

export const inventoryTableHeaders = [
  { key: "unitNo", label: "Unit No." },
  { key: "type", label: "Type" },
  { key: "exposure", label: "Exposure" },
  { key: "area", label: "Area (Sq.ft.)" },
];

export const inventoryPropertyTypes = ["Office", "Retail", "F & B", "Other"];

export const inventoryExposures = ["N", "S", "E", "W"];

export const inventoryPropertyStatuses = ["All", "Available", "Leased", "Reserved"];

export const inventoryAreaRange = {
  min: 200,
  max: 50000,
  defaultMin: 200,
  defaultMax: 50000,
  step: 100,
  minLabel: "200",
  maxLabel: "50,000",
};

export const defaultFeaturedUnit = {
  id: 71,
  unitNo: "801",
  type: "Duplex",
  propertyType: "Office",
  status: "Available",
  floor: "8th Floor",
  exposure: "N,W",
  area: 2500,
  isFavorite: true,
};

// 18 Floors with 10 flats each (101 to 110 up to 1801 to 1810) = 180 total units generated dynamically via loop
const types = ["Simplex", "Executive", "Studio", "Duplex"];
const propertyTypes = ["Office", "Retail", "F & B", "Other"];
const exposures = ["N,E", "S,W", "E", "N,S", "W", "N,E", "S", "N,W", "N", "S,E"];
const statuses = ["Available", "Available", "Leased", "Reserved", "Available", "Available", "Sold", "Available", "Reserved", "Available"];

const getFloorSuffix = (floor) => {
  if (floor === 1) return "1st Floor";
  if (floor === 2) return "2nd Floor";
  if (floor === 3) return "3rd Floor";
  return `${floor}th Floor`;
};

export const inventoryUnits = [];

for (let floor = 1; floor <= 18; floor++) {
  for (let flat = 1; flat <= 10; flat++) {
    const id = (floor - 1) * 10 + flat;
    const unitNo = `${floor}${flat < 10 ? "0" + flat : flat}`;
    const isTopPenthouse = floor >= 15 && (flat === 1 || flat === 6 || flat === 9 || flat === 10);
    const type = isTopPenthouse ? "Penthouse" : types[(floor + flat) % types.length];
    const propertyType = propertyTypes[(floor * 2 + flat) % propertyTypes.length];
    const exposure = exposures[(flat - 1) % exposures.length];
    const status = statuses[(flat - 1) % statuses.length];
    const area = 1800 + (floor * 250) + ((flat * 350) % 1500);

    inventoryUnits.push({
      id,
      unitNo,
      type: unitNo === "801" ? "Duplex" : type,
      propertyType: unitNo === "801" ? "Office" : propertyType,
      exposure: unitNo === "801" ? "N,W" : exposure,
      area: unitNo === "801" ? 2500 : area,
      floor: getFloorSuffix(floor),
      status: unitNo === "801" ? "Available" : status,
      isFavorite: unitNo === "801",
    });
  }
}

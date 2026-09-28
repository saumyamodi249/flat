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
  unitNo: "Unit No. A-801",
  status: "Sold",
  floor: "4th Floor",
  exposure: "N,W",
  area: "2500 Sq.ft",
  isFavorite: true,
};

export const inventoryUnits = [
  {
    id: 1,
    unitNo: "A-101",
    type: "Simplex",
    exposure: "N,E",
    area: 4500,
    floor: "4th Floor",
    status: "Sold",
    isFavorite: false,
  },
  {
    id: 2,
    unitNo: "A-102",
    type: "Simplex",
    exposure: "S,W",
    area: 4500,
    floor: "4th Floor",
    status: "Available",
    isFavorite: false,
  },
  {
    id: 3,
    unitNo: "B-101",
    type: "Simplex",
    exposure: "W,E",
    area: 4500,
    floor: "5th Floor",
    status: "Leased",
    isFavorite: false,
  },
  {
    id: 4,
    unitNo: "B-102",
    type: "Simplex",
    exposure: "N,S",
    area: 4500,
    floor: "5th Floor",
    status: "Reserved",
    isFavorite: false,
  },
  {
    id: 5,
    unitNo: "A-101",
    type: "Simplex",
    exposure: "N,S",
    area: 4500,
    floor: "6th Floor",
    status: "Available",
    isFavorite: false,
  },
];

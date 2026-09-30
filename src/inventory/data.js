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
  id: 6,
  unitNo: "A-801",
  type: "Duplex",
  status: "Sold",
  floor: "8th Floor",
  exposure: "N,W",
  area: 2500,
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
    unitNo: "A-201",
    type: "Simplex",
    exposure: "N,S",
    area: 4500,
    floor: "6th Floor",
    status: "Available",
    isFavorite: false,
  },
  {
    id: 6,
    unitNo: "A-801",
    type: "Duplex",
    exposure: "N,W",
    area: 2500,
    floor: "4th Floor",
    status: "Available",
    isFavorite: true,
  },
  {
    id: 7,
    unitNo: "A-301",
    type: "Simplex",
    exposure: "N,E",
    area: 3200,
    floor: "7th Floor",
    status: "Available",
    isFavorite: false,
  },
  {
    id: 8,
    unitNo: "A-302",
    type: "Duplex",
    exposure: "S,E",
    area: 4800,
    floor: "7th Floor",
    status: "Reserved",
    isFavorite: false,
  },
  {
    id: 9,
    unitNo: "B-201",
    type: "Penthouse",
    exposure: "N,S",
    area: 5500,
    floor: "9th Floor",
    status: "Available",
    isFavorite: false,
  },
  {
    id: 10,
    unitNo: "B-202",
    type: "Simplex",
    exposure: "W,S",
    area: 2800,
    floor: "9th Floor",
    status: "Leased",
    isFavorite: false,
  },
  {
    id: 11,
    unitNo: "C-101",
    type: "Studio",
    exposure: "E",
    area: 1200,
    floor: "2nd Floor",
    status: "Available",
    isFavorite: false,
  },
  {
    id: 12,
    unitNo: "C-102",
    type: "Executive",
    exposure: "N",
    area: 2100,
    floor: "2nd Floor",
    status: "Sold",
    isFavorite: false,
  },
  {
    id: 13,
    unitNo: "C-201",
    type: "Simplex",
    exposure: "S",
    area: 3500,
    floor: "3rd Floor",
    status: "Available",
    isFavorite: false,
  },
  {
    id: 14,
    unitNo: "C-202",
    type: "Duplex",
    exposure: "W",
    area: 4200,
    floor: "3rd Floor",
    status: "Reserved",
    isFavorite: false,
  },
  {
    id: 15,
    unitNo: "D-301",
    type: "Penthouse",
    exposure: "N,E",
    area: 6200,
    floor: "12th Floor",
    status: "Available",
    isFavorite: false,
  },
  {
    id: 16,
    unitNo: "D-302",
    type: "Simplex",
    exposure: "S,W",
    area: 3800,
    floor: "12th Floor",
    status: "Leased",
    isFavorite: false,
  },
];

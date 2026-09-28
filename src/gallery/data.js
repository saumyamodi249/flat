// Gallery & Portfolio Data

export const galleryTabs = [
  { id: "all", label: "All", path: "/gallery/all" },
  { id: "exterior", label: "Exterior", path: "/gallery/exterior" },
  { id: "interior", label: "Interior", path: "/gallery/interior" },
  { id: "amenities", label: "Amenities", path: "/gallery/amenities" },
];

/**
 * 6-Column Responsive Grid Spans Presets
 */
export const SPANS = {
  // Standard Column Spans
  col2: "col-span-1 md:col-span-1 lg:col-span-2",
  col3: "col-span-1 md:col-span-1.5 lg:col-span-3",
  col4: "col-span-1 md:col-span-2 lg:col-span-4",
  col6: "col-span-1 md:col-span-3 lg:col-span-6",
  col6_row2: "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 md:row-span-2 lg:row-span-2",

  // Proportional Heights (for 6-row layout)
  thirdPiece: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-1 lg:row-span-2",
  halfPiece: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-3",
  twoThirdsPiece: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-4",
  full1Piece: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-3 lg:row-span-6",
};

// Exterior Gallery Data (7 authentic Riviera assets)
export const exteriorData = [
  {
    id: 1,
    image: "/gallery/Exterior/2nd.svg",
    category: "Exterior",
    title: "Front Elevation",
    className: SPANS.halfPiece,
  },
  {
    id: 2,
    image: "/gallery/Exterior/4th.svg",
    category: "Exterior",
    title: "Grand Entrance Gate",
    className: SPANS.thirdPiece,
  },
  {
    id: 3,
    image: "/gallery/Exterior/1st.svg",
    category: "Exterior",
    title: "Iconic Tower Perspective",
    className: SPANS.full1Piece,
  },
  {
    id: 4,
    image: "/gallery/Exterior/3rd.svg",
    category: "Exterior",
    title: "Sunset Perspective",
    className: SPANS.halfPiece,
  },
  {
    id: 5,
    image: "/gallery/Exterior/5th.svg",
    category: "Exterior",
    title: "Dusk Tower Facade",
    className: SPANS.twoThirdsPiece,
  },
  {
    id: 6,
    image: "/gallery/Exterior/6th.jpg",
    category: "Exterior",
    title: "Green Landscape & Garden",
    className: SPANS.halfPiece,
  },
  {
    id: 7,
    image: "/gallery/Exterior/7th.jpg",
    category: "Exterior",
    title: "Night View Elevation",
    className: SPANS.halfPiece,
  },
];

// Interior Gallery Data (30 interior designs)
export const portfolioData = [
  {
    id: 1,
    image: "/gallery/Interior/1st.svg",
    category: "Interior",
    className: SPANS.col4,
  },
  {
    id: 2,
    image: "/gallery/Interior/2nd.svg",
    category: "Interior",
    className: SPANS.col2,
  },
  {
    id: 3,
    image: "/gallery/Interior/3rd.svg",
    category: "Interior",
    className: SPANS.col2,
  },
  {
    id: 4,
    image: "/gallery/Interior/4th.svg",
    category: "Interior",
    className: SPANS.col2,
  },
  {
    id: 5,
    image: "/gallery/Interior/5th.svg",
    category: "Interior",
    className: SPANS.col2,
  },
  {
    id: 6,
    image: "/gallery/Interior/6th.svg",
    category: "Interior",
    className: SPANS.col2,
  },
  {
    id: 7,
    image: "/gallery/Interior/7th.svg",
    category: "Interior",
    className: SPANS.col4,
  },
  {
    id: 8,
    image: "/gallery/Interior/8th.svg",
    category: "Interior",
    className: SPANS.col6_row2,
  },
  {
    id: 9,
    image: "/gallery/Interior/9th.svg",
    category: "Interior",
    className: SPANS.col2,
  },
  {
    id: 10,
    image: "/gallery/Interior/10th.svg",
    category: "Interior",
    className: SPANS.col4,
  },
  {
    id: 11,
    image: "/gallery/Interior/11th.svg",
    category: "Interior",
    className: SPANS.col3,
  },
  {
    id: 12,
    image: "/gallery/Interior/12th.svg",
    category: "Interior",
    className: SPANS.col3,
  },
  {
    id: 13,
    image: "/gallery/Interior/13th.svg",
    category: "Interior",
    className: SPANS.col2,
  },
  {
    id: 14,
    image: "/gallery/Interior/14th.svg",
    category: "Interior",
    className: SPANS.col2,
  },
  {
    id: 15,
    image: "/gallery/Interior/15th.svg",
    category: "Interior",
    className: SPANS.col2,
  },
  {
    id: 16,
    image: "/gallery/Interior/16th.svg",
    category: "Interior",
    className: SPANS.col4,
  },
  {
    id: 17,
    image: "/gallery/Interior/17th.svg",
    category: "Interior",
    className: SPANS.col2,
  },
  {
    id: 18,
    image: "/gallery/Interior/18th.svg",
    category: "Interior",
    className: SPANS.col6,
  },
  {
    id: 19,
    image: "/gallery/Interior/19th.svg",
    category: "Interior",
    className: SPANS.col3,
  },
  {
    id: 20,
    image: "/gallery/Interior/20th.svg",
    category: "Interior",
    className: SPANS.col3,
  },
  {
    id: 21,
    image: "/gallery/Interior/21th.svg",
    category: "Interior",
    className: SPANS.col2,
  },
  {
    id: 22,
    image: "/gallery/Interior/22th.svg",
    category: "Interior",
    className: SPANS.col2,
  },
  {
    id: 23,
    image: "/gallery/Interior/23th.svg",
    category: "Interior",
    className: SPANS.col2,
  },
  {
    id: 24,
    image: "/gallery/Interior/24th.svg",
    category: "Interior",
    className: SPANS.col2,
  },
  {
    id: 25,
    image: "/gallery/Interior/25th.svg",
    category: "Interior",
    className: SPANS.col4,
  },
  {
    id: 26,
    image: "/gallery/Interior/26th.svg",
    category: "Interior",
    className: SPANS.col3,
  },
  {
    id: 27,
    image: "/gallery/Interior/27th.svg",
    category: "Interior",
    className: SPANS.col3,
  },
  {
    id: 28,
    image: "/gallery/Interior/28th.svg",
    category: "Interior",
    className: SPANS.col2,
  },
  {
    id: 29,
    image: "/gallery/Interior/29th.svg",
    category: "Interior",
    className: SPANS.col2,
  },
  {
    id: 30,
    image: "/gallery/Interior/30th.svg",
    category: "Interior",
    className: SPANS.col2,
  },
];

// Semantic alias
export const interiorData = portfolioData;

// Amenities Gallery Data (7 authentic assets)
export const amenitiesData = [
  {
    id: 1,
    image: "/gallery/Amenities/1st.svg",
    category: "Amenities",
    title: "Cricket & Sports Turf",
    className: SPANS.halfPiece,
  },
  {
    id: 2,
    image: "/gallery/Amenities/5th.svg",
    category: "Amenities",
    title: "Tower Perspective",
    className: SPANS.full1Piece,
  },
  {
    id: 3,
    image: "/gallery/Amenities/3rd.svg",
    category: "Amenities",
    title: "Pergola & Ceiling Louvers",
    className: SPANS.thirdPiece,
  },
  {
    id: 4,
    image: "/gallery/Amenities/4th.svg",
    category: "Amenities",
    title: "Sunset Pool Deck",
    className: SPANS.halfPiece,
  },
  {
    id: 5,
    image: "/gallery/Amenities/2nd.svg",
    category: "Amenities",
    title: "Poolside Lounge Deck",
    className: SPANS.twoThirdsPiece,
  },
  {
    id: 6,
    image: "/gallery/Amenities/6th.svg",
    category: "Amenities",
    title: "Infinity Pool View",
    className: SPANS.halfPiece,
  },
  {
    id: 7,
    image: "/gallery/Amenities/7th.svg",
    category: "Amenities",
    title: "Sky Terrace & Balcony Lounge",
    className: SPANS.halfPiece,
  },
];

// Helper to shuffle array (Fisher-Yates)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Harmonic layout pattern for "All" gallery ensuring every row sums to 6 columns with ZERO gaps
const ALL_GRID_SPANS = [
  // Row 1: 4 + 2 = 6
  "col-span-1 md:col-span-4",
  "col-span-1 md:col-span-2",

  // Row 2: 2 + 2 + 2 = 6
  "col-span-1 md:col-span-2",
  "col-span-1 md:col-span-2",
  "col-span-1 md:col-span-2",

  // Row 3: 2 + 4 = 6
  "col-span-1 md:col-span-2",
  "col-span-1 md:col-span-4",

  // Row 4: 3 + 3 = 6
  "col-span-1 md:col-span-3",
  "col-span-1 md:col-span-3",

  // Row 5: 2 + 2 + 2 = 6
  "col-span-1 md:col-span-2",
  "col-span-1 md:col-span-2",
  "col-span-1 md:col-span-2",

  // Row 6: 4 + 2 = 6
  "col-span-1 md:col-span-4",
  "col-span-1 md:col-span-2",

  // Row 7: 6 (Hero banner)
  "col-span-1 md:col-span-6",

  // Row 8: 3 + 3 = 6
  "col-span-1 md:col-span-3",
  "col-span-1 md:col-span-3",

  // Row 9: 2 + 2 + 2 = 6
  "col-span-1 md:col-span-2",
  "col-span-1 md:col-span-2",
  "col-span-1 md:col-span-2",

  // Row 10: 2 + 4 = 6
  "col-span-1 md:col-span-2",
  "col-span-1 md:col-span-4",
];

// All Gallery items combined: randomly shuffled images with randomized IDs and gap-free responsive spans
export const allGalleryData = shuffleArray(
  [...exteriorData, ...portfolioData, ...amenitiesData]
).map((item, index) => ({
  ...item,
  id: Math.floor(Math.random() * 9000) + 1000,
  className: ALL_GRID_SPANS[index % ALL_GRID_SPANS.length],
}));

// Backward compatibility references
export const GALLERY_CATEGORIES = galleryTabs;
export const GALLERY_ITEMS = {
  interior: portfolioData,
  exterior: exteriorData,
  amenities: amenitiesData,
  all: allGalleryData,
};

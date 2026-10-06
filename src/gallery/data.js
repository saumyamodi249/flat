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
  col2: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1",
  col3: "col-span-1 md:col-span-1.5 lg:col-span-3 row-span-1",
  col4: "col-span-1 md:col-span-2 lg:col-span-4 row-span-1",
  col6: "col-span-1 md:col-span-3 lg:col-span-6 row-span-1",
  col6_row2: "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 md:row-span-2 lg:row-span-2",

  // Proportional Heights (for 6-row layout and 3-col mobile grid)
  thirdPiece: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-1 lg:row-span-2",
  halfPiece: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-3",
  twoThirdsPiece: "col-span-1 md:col-span-1 lg:col-span-2 row-span-2 md:row-span-2 lg:row-span-4",
  full1Piece: "col-span-1 md:col-span-1 lg:col-span-2 row-span-2 md:row-span-3 lg:row-span-6",
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

// Curated items to match user's reference mockup at the top of the All gallery
const showcaseItems = [
  // 1. Column 1 (Row 1-2): Tall Garden Villa
  { ...exteriorData[2], id: "showcase-1" },
  // 2. Column 2 (Row 1): Pool Deck Pergola
  { ...amenitiesData[2], id: "showcase-2" },
  // 3. Column 3 (Row 1): Sunset Pool Deck
  { ...amenitiesData[3], id: "showcase-3" },
  // 4. Column 2 (Row 2): Balcony Seating Lounge
  { ...amenitiesData[4], id: "showcase-4" },
  // 5. Column 3 (Row 2): Sky Balcony Lounge Angle 2
  { ...amenitiesData[6], id: "showcase-5" },
  // 6. Column 1 (Row 3): Curved Living Room Sofa
  { ...portfolioData[0], id: "showcase-6" },
  // 7. Column 2 (Row 3): High-rise terrace with breakfast tray
  { ...amenitiesData[5], id: "showcase-7" },
  // 8. Column 3 (Row 3): Gym & Fitness Studio
  { ...portfolioData[2], id: "showcase-8" },
  // 9. Column 1 (Row 4): Tower Front Elevation
  { ...exteriorData[3], id: "showcase-9" },
  // 10. Column 2 (Row 4): Garden Entrance Gate
  { ...exteriorData[5], id: "showcase-10" },
  // 11. Column 3 (Row 4-5): Tower Perspective Looking Up
  { ...amenitiesData[1], id: "showcase-11" },
  // 12. Column 1 (Row 5): Sunset Tower Facade
  { ...exteriorData[1], id: "showcase-12" },
  // 13. Column 2 (Row 5): Night View Elevation
  { ...exteriorData[6], id: "showcase-13" },
];

// All Gallery items combined using their authentic default sizes/spans like exterior, interior, and amenities
export const allGalleryData = [
  ...showcaseItems,
  ...exteriorData,
  ...portfolioData,
  ...amenitiesData,
];


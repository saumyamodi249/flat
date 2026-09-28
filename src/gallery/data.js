// Gallery & Portfolio Data matching reference

export const galleryTabs = [
  { id: "all", label: "All", path: "/gallery/all" },
  { id: "exterior", label: "Exterior", path: "/gallery/exterior" },
  { id: "interior", label: "Interior", path: "/gallery/interior" },
  { id: "amenities", label: "Amenities", path: "/amenities" },
];

export const portfolioCategories = [
  "All",
  "Living room",
  "Kitchen",
  "Bedroom",
];

export const portfolioHeading = {
  titleLine1: "Transform Your Space",
  titleLine2Normal: "with ",
  titleLine2Highlight: "Stunning",
  titleLine2End: " Design Ideas",
  description:
    "Discover a world of beautifully curated design inspirations and intelligent room layouts crafted to enhance not just the look, but the way you live. From modern minimalism to cozy charm, explore interior ideas that blend style, function, and personal expression bringing purpose and personality to every corner of your space. Whether you're planning a complete makeover or a subtle refresh, Desinary helps you design smarter, live better, and love your space.",
};

export const exteriorCategories = [
  "All",
  "Facade",
  "Architecture",
  "Landscape",
];

export const exteriorHeading = {
  titleLine1: "Experience Grandeur",
  titleLine2Normal: "with ",
  titleLine2Highlight: "Stunning",
  titleLine2End: " Exterior Views",
  description:
    "Discover the breathtaking external architecture, expansive balconies, and thoughtfully designed outdoor amenities of Riviera Select. Designed to inspire from first glance.",
};

/**
 * 6-Column Grid Spans Presets & Keywords
 * Fully responsive across all 3 breakpoints:
 * - default (mobile): col-span-1, row-span-1
 * - md (tablet):      md:col-span-..., md:row-span-...
 * - lg (desktop):     lg:col-span-..., lg:row-span-...
 */
export const SPANS = {
  // === Standard 1-Row Spans (Responsive default, md, lg) ===
  col1: "col-span-1 md:col-span-1 lg:col-span-1",
  col2: "col-span-1 md:col-span-1 lg:col-span-2",
  col3: "col-span-1 md:col-span-1.5 lg:col-span-3",
  col4: "col-span-1 md:col-span-2 lg:col-span-4",
  col5: "col-span-1 md:col-span-2.5 lg:col-span-5",
  col6: "col-span-1 md:col-span-3 lg:col-span-6",

  // === 2 Rows Tall Spans (row-span-2 on tablet & desktop, 1 on mobile) ===
  col1_row2: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-2 lg:row-span-2",
  col2_row2: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-2",
  col3_row2: "col-span-1 md:col-span-1.5 lg:col-span-3 row-span-1 md:row-span-2 lg:row-span-2",
  col4_row2: "col-span-1 md:col-span-2 lg:col-span-4 row-span-1 md:row-span-2 lg:row-span-2",
  col5_row2: "col-span-1 md:col-span-2.5 lg:col-span-5 row-span-1 md:row-span-2 lg:row-span-2",
  col6_row2: "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 md:row-span-2 lg:row-span-2",

  // === 3 Rows Tall Spans (row-span-3 on desktop, 2 on tablet, 1 on mobile) -> CUT IN HALF OF 2 ===
  col1_row3: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-2 lg:row-span-3",
  col2_row3: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-3",
  col3_row3: "col-span-1 md:col-span-1.5 lg:col-span-3 row-span-1 md:row-span-2 lg:row-span-3",
  col4_row3: "col-span-1 md:col-span-2 lg:col-span-4 row-span-1 md:row-span-2 lg:row-span-3",
  col5_row3: "col-span-1 md:col-span-2.5 lg:col-span-5 row-span-1 md:row-span-2 lg:row-span-3",
  col6_row3: "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 md:row-span-2 lg:row-span-3",

  // === 4 Rows Tall Spans (row-span-4 on desktop, 2 on tablet, 1 on mobile) -> 2 OF 3 PARTS ===
  col1_row4: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-2 lg:row-span-4",
  col2_row4: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-4",
  col3_row4: "col-span-1 md:col-span-1.5 lg:col-span-3 row-span-1 md:row-span-2 lg:row-span-4",
  col4_row4: "col-span-1 md:col-span-2 lg:col-span-4 row-span-1 md:row-span-2 lg:row-span-4",
  col5_row4: "col-span-1 md:col-span-2.5 lg:col-span-5 row-span-1 md:row-span-2 lg:row-span-4",
  col6_row4: "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 md:row-span-2 lg:row-span-4",

  // === 6 Rows Tall Spans (row-span-6 on desktop, 3 on tablet, 1 on mobile) -> FULL 1 PIECE ===
  col1_row6: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-3 lg:row-span-6",
  col2_row6: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-3 lg:row-span-6",
  col3_row6: "col-span-1 md:col-span-1.5 lg:col-span-3 row-span-1 md:row-span-3 lg:row-span-6",
  col4_row6: "col-span-1 md:col-span-2 lg:col-span-4 row-span-1 md:row-span-3 lg:row-span-6",
  col5_row6: "col-span-1 md:col-span-2.5 lg:col-span-5 row-span-1 md:row-span-3 lg:row-span-6",
  col6_row6: "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 md:row-span-3 lg:row-span-6",

  // === Ratio / Keyword Aliases (0.5, 1, 1.5, 2, 2.5, 3 of 6 parts) ===
  c0_5: "col-span-1 md:col-span-1 lg:col-span-1",
  c1: "col-span-1 md:col-span-1 lg:col-span-2",
  c1_5: "col-span-1 md:col-span-1.5 lg:col-span-3",
  c2: "col-span-1 md:col-span-2 lg:col-span-4",
  c2_5: "col-span-1 md:col-span-2.5 lg:col-span-5",
  c3: "col-span-1 md:col-span-3 lg:col-span-6",

  // Ratio with row 2 (Cut in 3 / 1/3 height):
  c0_5_r2: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-2 lg:row-span-2",
  c1_r2: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-2",
  c1_5_r2: "col-span-1 md:col-span-1.5 lg:col-span-3 row-span-1 md:row-span-2 lg:row-span-2",
  c2_r2: "col-span-1 md:col-span-2 lg:col-span-4 row-span-1 md:row-span-2 lg:row-span-2",
  c2_5_r2: "col-span-1 md:col-span-2.5 lg:col-span-5 row-span-1 md:row-span-2 lg:row-span-2",
  c3_r2: "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 md:row-span-2 lg:row-span-2",

  // Ratio with row 3 (Cut in half of 2 / 50% height):
  c0_5_r3: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-2 lg:row-span-3",
  c1_r3: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-3",
  c1_5_r3: "col-span-1 md:col-span-1.5 lg:col-span-3 row-span-1 md:row-span-2 lg:row-span-3",
  c2_r3: "col-span-1 md:col-span-2 lg:col-span-4 row-span-1 md:row-span-2 lg:row-span-3",
  c2_5_r3: "col-span-1 md:col-span-2.5 lg:col-span-5 row-span-1 md:row-span-2 lg:row-span-3",
  c3_r3: "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 md:row-span-2 lg:row-span-3",

  // Ratio with row 6 (Full 1 piece / 100% height):
  c0_5_r6: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-3 lg:row-span-6",
  c1_r6: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-3 lg:row-span-6",
  c1_5_r6: "col-span-1 md:col-span-1.5 lg:col-span-3 row-span-1 md:row-span-3 lg:row-span-6",
  c2_r6: "col-span-1 md:col-span-2 lg:col-span-4 row-span-1 md:row-span-3 lg:row-span-6",
  c2_5_r6: "col-span-1 md:col-span-2.5 lg:col-span-5 row-span-1 md:row-span-3 lg:row-span-6",
  c3_r6: "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 md:row-span-3 lg:row-span-6",

  // === Explicit Piece Division Keywords (Directly matching your request) ===
  // Standard 2-Column width (1 of 3 columns across page):
  full1Piece: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-3 lg:row-span-6",      // Full 1 piece tall (100% height)
  fullPiece: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-3 lg:row-span-6",       // Alias
  col2_full: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-3 lg:row-span-6",       // Alias
  halfPiece: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-3",       // Cut in half of 2 (50% height)
  halfOf2: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-3",         // Alias
  col2_half: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-3",       // Alias
  thirdPiece: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-1 lg:row-span-2",      // Cut in 3 (1/3 height)
  cutIn3: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-1 lg:row-span-2",          // Alias
  col2_third: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-1 lg:row-span-2",      // Alias
  twoThirdsPiece: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-4",  // 2 of 3 parts (66.7% height)
  col2_twoThirds: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-4",  // Alias

  // Half-Width Column (3 of 6 columns across page):
  halfWidth_fullPiece: "col-span-1 md:col-span-1.5 lg:col-span-3 row-span-1 md:row-span-3 lg:row-span-6",
  halfWidth_halfPiece: "col-span-1 md:col-span-1.5 lg:col-span-3 row-span-1 md:row-span-2 lg:row-span-3",
  halfWidth_thirdPiece: "col-span-1 md:col-span-1.5 lg:col-span-3 row-span-1 md:row-span-1 lg:row-span-2",
  halfWidth_twoThirds: "col-span-1 md:col-span-1.5 lg:col-span-3 row-span-1 md:row-span-2 lg:row-span-4",

  // Full-Width Column (6 of 6 columns across page):
  fullWidth_fullPiece: "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 md:row-span-3 lg:row-span-6",
  fullWidth_halfPiece: "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 md:row-span-2 lg:row-span-3",
  fullWidth_thirdPiece: "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 md:row-span-1 lg:row-span-2",
  fullWidth_twoThirds: "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 md:row-span-2 lg:row-span-4",

  // === Intuitive Semantic Keywords ===
  small: "col-span-1 md:col-span-1 lg:col-span-2",
  tall: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-2",
  extraTall: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-3",
  half: "col-span-1 md:col-span-1.5 lg:col-span-3",
  halfTall: "col-span-1 md:col-span-1.5 lg:col-span-3 row-span-1 md:row-span-2 lg:row-span-2",
  wide: "col-span-1 md:col-span-2 lg:col-span-4",
  wideTall: "col-span-1 md:col-span-2 lg:col-span-4 row-span-1 md:row-span-2 lg:row-span-2",
  wideExtraTall: "col-span-1 md:col-span-2 lg:col-span-4 row-span-1 md:row-span-2 lg:row-span-3",
  full: "col-span-1 md:col-span-3 lg:col-span-6",
  hero: "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 md:row-span-2 lg:row-span-2",
  megaHero: "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 md:row-span-2 lg:row-span-3",
};

/**
 * Shorthand helper: span(cols, rows)
 * Fully responsive:
 * - default (mobile): col-span-1, row-span-1
 * - md (tablet):      auto-calculated md:col-span & md:row-span
 * - lg (desktop):     lg:col-span-[cols], lg:row-span-[rows]
 */
export function span(cols = 2, rows = 1) {
  const key = `col${cols}_row${rows}`;
  const keyCol = `col${cols}`;
  if (SPANS[key]) return SPANS[key];
  if (SPANS[keyCol] && rows === 1) return SPANS[keyCol];
  const mdCol = Math.max(1, Math.min(3, Math.ceil(cols / 2)));
  const mdRow = rows > 1 ? ` md:row-span-${Math.min(rows, 3)}` : "";
  const lgRow = rows > 1 ? ` lg:row-span-${rows}` : "";
  return `col-span-1 md:col-span-${mdCol} lg:col-span-${cols} row-span-1${mdRow}${lgRow}`;
}

/**
 * Custom responsive builder:
 * responsiveSpan(defaultCol, mdCol, lgCol, lgRow, mdRow)
 */
export function responsiveSpan(defaultCol = 1, mdCol = 1, lgCol = 2, lgRow = 1, mdRow = 1) {
  let cls = `col-span-${defaultCol} md:col-span-${mdCol} lg:col-span-${lgCol} row-span-1`;
  if (mdRow > 1) cls += ` md:row-span-${mdRow}`;
  if (lgRow > 1) cls += ` lg:row-span-${lgRow}`;
  return cls;
}

// Exterior Gallery Data (5 filtered authentic images placed in exact Figma 3-column layout)
export const exteriorData = [
  {
    id: 1,
    image: "/gallery/Exterior/2nd.svg",
    category: "Facade",
    title: "Front Elevation",
    className: SPANS.halfPiece, // Row 1-3, Col 1-2 (Cut in half of 2 - Top-Left)
  },
  {
    id: 2,
    image: "/gallery/Exterior/4th.svg",
    category: "Entrance",
    title: "Grand Entrance Gate",
    className: SPANS.thirdPiece, // Row 1-2, Col 3-4 (Cut in 3 - Top-Middle)
  },
  {
    id: 3,
    image: "/gallery/Exterior/1st.svg",
    category: "Elevation",
    title: "Iconic Tower Perspective",
    className: SPANS.full1Piece, // Rows 1-6, Col 5-6 (Full 1 piece - Right Tower)
  },
  {
    id: 4,
    image: "/gallery/Exterior/3rd.svg",
    category: "Architecture",
    title: "Sunset Perspective",
    className: SPANS.halfPiece, // Row 4-6, Col 1-2 (Cut in half of 2 - Bottom-Left)
  },
  {
    id: 5,
    image: "/gallery/Exterior/5th.svg",
    category: "Architecture",
    title: "Dusk Tower Facade",
    className: SPANS.twoThirdsPiece, // Row 3-6, Col 3-4 (2 of 3 parts - Bottom-Middle)
  },
  {
    id: 6,
    image: "/gallery/Exterior/6th.jpg",
    category: "Landscape",
    title: "Green Landscape & Garden",
    className: SPANS.halfPiece,
  },
  {
    id: 7,
    image: "/gallery/Exterior/7th.jpg",
    category: "Facade",
    title: "Night View Elevation",
    className: SPANS.halfPiece,
  },


];

// Interior Gallery Data (using SPANS keywords)
export const portfolioData = [
  {
    id: 1,
    image: "/gallery/Interior/1st.svg",
    category: "Living room",
    className: SPANS.col4,
  },
  {
    id: 2,
    image: "/gallery/Interior/2nd.svg",
    category: "Kitchen",
    className: SPANS.col2,
  },
  {
    id: 3,
    image: "/gallery/Interior/3rd.svg",
    category: "Living room",
    className: SPANS.col2,
  },
  {
    id: 4,
    image: "/gallery/Interior/4th.svg",
    category: "Living room",
    className: SPANS.col2,
  },
  {
    id: 5,
    image: "/gallery/Interior/5th.svg",
    category: "Living room",
    className: SPANS.col2,
  },
  {
    id: 6,
    image: "/gallery/Interior/6th.svg",
    category: "Kitchen",
    className: SPANS.col2,
  },
  {
    id: 7,
    image: "/gallery/Interior/7th.svg",
    category: "Kitchen",
    className: SPANS.col4,
  },
  {
    id: 8,
    image: "/gallery/Interior/8th.svg",
    category: "Bedroom",
    className: SPANS.col6_row2,
  },
  {
    id: 9,
    image: "/gallery/Interior/9th.svg",
    category: "Living room",
    className: SPANS.col2,
  },
  {
    id: 10,
    image: "/gallery/Interior/10th.svg",
    category: "Kitchen",
    className: SPANS.col4,
  },
  {
    id: 11,
    image: "/gallery/Interior/11th.svg",
    category: "Bedroom",
    className: SPANS.col3,
  },
  {
    id: 12,
    image: "/gallery/Interior/12th.svg",
    category: "Living room",
    className: SPANS.col3,
  },
  {
    id: 13,
    image: "/gallery/Interior/13th.svg",
    category: "Living room",
    className: SPANS.col2,
  },
  {
    id: 14,
    image: "/gallery/Interior/14th.svg",
    category: "Living room",
    className: SPANS.col2,
  },
  {
    id: 15,
    image: "/gallery/Interior/15th.svg",
    category: "Living room",
    className: SPANS.col2,
  },
  {
    id: 16,
    image: "/gallery/Interior/16th.svg",
    category: "Bedroom",
    className: SPANS.col4,
  },
  {
    id: 17,
    image: "/gallery/Interior/17th.svg",
    category: "Kitchen",
    className: SPANS.col2,
  },
  {
    id: 18,
    image: "/gallery/Interior/18th.svg",
    category: "Kitchen",
    className: SPANS.col6,
  },
  {
    id: 19,
    image: "/gallery/Interior/19th.svg",
    category: "Bedroom",
    className: SPANS.col3,
  },
  {
    id: 20,
    image: "/gallery/Interior/20th.svg",
    category: "Living room",
    className: SPANS.col3,
  },
  {
    id: 21,
    image: "/gallery/Interior/21th.svg",
    category: "Living room",
    className: SPANS.col2,
  },
  {
    id: 22,
    image: "/gallery/Interior/22th.svg",
    category: "Bedroom",
    className: SPANS.col2,
  },
  {
    id: 23,
    image: "/gallery/Interior/23th.svg",
    category: "Living room",
    className: SPANS.col2,
  },
  {
    id: 24,
    image: "/gallery/Interior/24th.svg",
    category: "Bedroom",
    className: SPANS.col2,
  },
  {
    id: 25,
    image: "/gallery/Interior/25th.svg",
    category: "Bedroom",
    className: SPANS.col4,
  },
  {
    id: 26,
    image: "/gallery/Interior/26th.svg",
    category: "Bedroom",
    className: SPANS.col3,
  },
  {
    id: 27,
    image: "/gallery/Interior/27th.svg",
    category: "Kitchen",
    className: SPANS.col3,
  },
  {
    id: 28,
    image: "/gallery/Interior/28th.svg",
    category: "Kitchen",
    className: SPANS.col2,
  },
  {
    id: 29,
    image: "/gallery/Interior/29th.svg",
    category: "Bedroom",
    className: SPANS.col2,
  },
  {
    id: 30,
    image: "/gallery/Interior/30th.svg",
    category: "Living room",
    className: SPANS.col2,
  },
];

// Alias for semantic clarity
export const interiorData = portfolioData;

// All Gallery items combined
export const allGalleryData = [...exteriorData, ...portfolioData];

// Backwards compatibility
export const GALLERY_CATEGORIES = galleryTabs;
export const GALLERY_ITEMS = {
  interior: portfolioData,
  exterior: exteriorData,
  all: allGalleryData,
};

// Pure text & data for the Amenities section

export const amenitiesTabs = [
  {
    id: "indoor",
    label: "Indoor",
    path: "/amenities/indoor",
  },
  {
    id: "outdoor",
    label: "Outdoor",
    path: "/amenities/outdoor",
  },
  {
    id: "wellness",
    label: "Wellness",
    path: "/amenities/wellness",
  },
];

export const amenitiesData = {
  indoor: {
    title: "INDOOR AMENITIES",
    subtitle: "Curated Spaces for Leisure & Recreation",
    description:
      "Step into a world of curated leisure where luxury meets everyday comfort. The indoor amenities at Riviera Select are tailored for both quiet relaxation and vibrant community gatherings. From an ultra-modern gymnasium and private screening theatre to executive conference lounges and interactive games arcades, every square foot is crafted to enhance your standard of living.",
    features: [
      { name: "Grand Clubhouse", desc: "Sprawling multi-level clubhouse with private lounge" },
      { name: "Fitness Centre", desc: "State-of-the-art gym equipped with Technogym machinery" },
      { name: "Private Mini Theatre", desc: "Acoustically treated cinema room for private screenings" },
      { name: "Indoor Games Arena", desc: "Billiards, table tennis, and virtual golf simulator" },
      { name: "Banquet & Party Hall", desc: "High-ceiling hall designed for memorable celebrations" },
      { name: "Executive Business Lounge", desc: "Quiet co-working pods and video conference suites" },
    ],
    image: "/UI IMG/Building.png",
  },

  outdoor: {
    title: "OUTDOOR AMENITIES",
    subtitle: "Open Air Living Amidst Lush Greens",
    description:
      "Embrace open skies, verdant gardens, and world-class athletic zones designed to keep you invigorated. Riviera Select offers an expansive outdoor footprint complete with an infinity lap pool, championship-grade sports courts, fragrant sensory gardens, and dedicated safe play zones for children, providing a rejuvenating retreat right outside your doorway.",
    features: [
      { name: "Infinity Lap Pool", desc: "Temperature-controlled pool with sun deck cabanas" },
      { name: "Tennis & Pickleball Courts", desc: "All-weather championship courts with floodlights" },
      { name: "Kids Adventure Park", desc: "Interactive nature-themed play area with soft turfing" },
      { name: "Jogging & Cycling Track", desc: "Continuous tree-lined track weaving through the campus" },
      { name: "Botanical Zen Garden", desc: "Calm green sanctuary with water fountains and gazebos" },
      { name: "Open Air Amphitheatre", desc: "Community amphitheatre for weekend cultural evenings" },
    ],
    image: "/UI IMG/Iscon circle.png",
  },

  wellness: {
    title: "WELLNESS & ROOFTOP",
    subtitle: "Rejuvenate Mind, Body, & Soul",
    description:
      "Perched high above the city, the wellness and rooftop facilities offer an ethereal sanctuary. Greet the morning sun with rooftop yoga, unwind in therapeutic sauna chambers, or enjoy sunset views from the sky-high observatory deck. Here, wellness is an elevated way of life.",
    features: [
      { name: "Sky Yoga Deck", desc: "Panoramic sunrise yoga deck with wooden pergolas" },
      { name: "Spa & Steam Rooms", desc: "Holistic therapeutic zones with aromatherapy showers" },
      { name: "Meditation Pavilion", desc: "Sound-isolated peaceful deck encircled by reflexology paths" },
      { name: "Star Gazing Sky Lounge", desc: "High-powered telescope zone on the rooftop terrace" },
      { name: "Herbal Green Zone", desc: "Medicinal and aromatic herb gardens providing clean oxygen" },
      { name: "Sunset Horizon Deck", desc: "Comfortable glass-walled vantage point facing SG Highway" },
    ],
    image: "/UI IMG/Building.png",
  },
};

/**
 * Maps & Nearby Places API
 * Base location: Cluster_chandkheda 16, 8, Sardar Patel Ring Rd, nr. Tapovan Circle, Chandkheda, Ahmedabad 382424
 * Coordinates: 23.1198863, 72.6109636
 */

export const BASE_PROPERTY_LOCATION = {
  id: "riviera-select-main",
  name: "Riviera Select",
  subtitle: "8, Sardar Patel Ring Rd, nr. Tapovan Circle",
  category: "all",
  categoryLabel: "Property",
  icon: "🏢",
  address:
    "Cluster_chandkheda 16, 8, Sardar Patel Ring Rd, nr. Tapovan Circle, Nigam Nagar, Chandkheda, Ahmedabad, Gujarat 382424",
  lat: 23.1198863,
  lng: 72.6109636,
  travel: {
    walk: "0 mins",
    cycle: "0 mins",
    car: "0 mins",
  },
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d72.6109636!3d23.1198863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e82296f9e7abf%3A0x9f0fa0efc3bcb29e!2sCluster_chandkheda%2016%2C%208%2C%20Sardar%20Patel%20Ring%20Rd%2C%20nr.%20Tapovan%20Circle%2C%20Nigam%20Nagar%2C%20Chandkheda%2C%20Ahmedabad%2C%20Gujarat%20382424!5e0!3m2!1sen!2sin!4v1790148770082!5m2!1sen!2sin",
};

// Complete Comprehensive Categories requested by user
export const MAP_CATEGORIES = [
  { id: "all", label: "All", icon: "🌐" },
  { id: "parks", label: "Parks", icon: "🌳" },
  { id: "fun", label: "Fun", icon: "🎉" },
  { id: "business", label: "Business", icon: "💼" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "hospital", label: "Hospital", icon: "🏥" },
  { id: "food", label: "Food", icon: "🍽️" },
  { id: "hotel", label: "Hotel", icon: "🏨" },
  { id: "shopping", label: "Shopping", icon: "🛍️" },
  { id: "banking", label: "Banking", icon: "🏦" },
  { id: "fuel", label: "Fuel", icon: "⛽" },
  { id: "grocery", label: "Grocery", icon: "🛒" },
  { id: "pharmacy", label: "Pharmacy", icon: "💊" },
  { id: "fitness", label: "Fitness", icon: "🏋️" },
  { id: "religious", label: "Religious", icon: "🛕" },
  { id: "transport", label: "Transport", icon: "🚉" },
  { id: "parking", label: "Parking", icon: "🚗" },
  { id: "sports", label: "Sports", icon: "⛳" },
  { id: "cafes", label: "Cafés", icon: "☕" },
  { id: "entertainment", label: "Entertainment", icon: "🎬" },
  { id: "services", label: "Services", icon: "🏪" },
  { id: "pet-care", label: "Pet Care", icon: "🐕" },
  { id: "nature", label: "Nature", icon: "🌿" },
  { id: "government", label: "Government", icon: "🏛️" },
  { id: "police", label: "Police", icon: "🚓" },
  { id: "emergency", label: "Emergency", icon: "🚒" },
  { id: "airport", label: "Airport", icon: "✈️" },
  { id: "real-estate", label: "Real Estate", icon: "🏢" },
];

export const PLACES_DATABASE = [
  // --- PARKS ---
  {
    id: "tapovan-green-vatika",
    name: "Tapovan Green Vatika",
    category: "parks",
    categoryLabel: "Parks",
    icon: "🌳",
    subtitle: "Tranquil Garden & Jogging Path",
    address: "Sardar Patel Ring Rd, nr. Tapovan Circle, Chandkheda, Ahmedabad 382424",
    lat: 23.1215,
    lng: 72.6120,
    travel: { walk: "4 mins", cycle: "2 mins", car: "1 min" },
  },
  {
    id: "chandkheda-lake-garden",
    name: "Chandkheda Lake & Garden",
    category: "parks",
    categoryLabel: "Parks",
    icon: "🌳",
    subtitle: "Scenic Lakeside Walkway & Park",
    address: "Nigam Nagar, Chandkheda, Ahmedabad, Gujarat 382424",
    lat: 23.1112,
    lng: 72.5954,
    travel: { walk: "12 mins", cycle: "5 mins", car: "3 mins" },
  },
  {
    id: "auda-garden-motera",
    name: "AUDA Botanical Garden Motera",
    category: "parks",
    categoryLabel: "Parks",
    icon: "🌳",
    subtitle: "Lush Urban Green Space",
    address: "Visat-Gandhinagar Highway, Motera, Ahmedabad 380005",
    lat: 23.1025,
    lng: 72.6015,
    travel: { walk: "18 mins", cycle: "8 mins", car: "5 mins" },
  },

  // --- FUN & ENTERTAINMENT ---
  {
    id: "narendra-modi-stadium",
    name: "Narendra Modi Stadium",
    category: "fun",
    categoryLabel: "Fun",
    icon: "🎉",
    subtitle: "World's Largest Cricket Stadium & Arena",
    address: "Stadium Rd, Motera, Ahmedabad, Gujarat 380005",
    lat: 23.0917,
    lng: 72.5975,
    travel: { walk: "25 mins", cycle: "10 mins", car: "5 mins" },
  },
  {
    id: "spark-premier",
    name: "Spark Premier Game Zone",
    category: "fun",
    categoryLabel: "Fun",
    icon: "🎉",
    subtitle: "Indoor Sports, Bowling & VR Arena",
    address: "SP Ring Rd, nr. Tapovan Circle, Chandkheda 382424",
    lat: 23.1189,
    lng: 72.6320,
    travel: { walk: "18 mins", cycle: "8 mins", car: "4 mins" },
  },

  // --- BUSINESS ---
  {
    id: "tapovan-corporate-park",
    name: "Tapovan Corporate Park",
    category: "business",
    categoryLabel: "Business",
    icon: "💼",
    subtitle: "Grade-A Corporate & Tech Offices",
    address: "Sardar Patel Ring Rd, Chandkheda, Ahmedabad 382424",
    lat: 23.1205,
    lng: 72.6135,
    travel: { walk: "6 mins", cycle: "3 mins", car: "2 mins" },
  },
  {
    id: "ongc-headquarters",
    name: "ONGC Western Region Headquarters",
    category: "business",
    categoryLabel: "Business",
    icon: "💼",
    subtitle: "Avani Bhavan Corporate Office",
    address: "Avani Bhavan, Chandkheda, Ahmedabad, Gujarat 382424",
    lat: 23.1090,
    lng: 72.5980,
    travel: { walk: "14 mins", cycle: "6 mins", car: "3 mins" },
  },

  // --- EDUCATION ---
  {
    id: "vgec-college",
    name: "Vishwakarma Govt. Engineering College",
    category: "education",
    categoryLabel: "Education",
    icon: "🎓",
    subtitle: "Premier Engineering Institution",
    address: "Nr. Visat Three Roads, Chandkheda, Ahmedabad 382424",
    lat: 23.1070,
    lng: 72.5948,
    travel: { walk: "15 mins", cycle: "6 mins", car: "3 mins" },
  },
  {
    id: "gtu-campus",
    name: "Gujarat Technological University (GTU)",
    category: "education",
    categoryLabel: "Education",
    icon: "🎓",
    subtitle: "State Technical University Campus",
    address: "Nr. Visat Three Roads, Nigam Nagar, Chandkheda 382424",
    lat: 23.1062,
    lng: 72.5935,
    travel: { walk: "16 mins", cycle: "7 mins", car: "4 mins" },
  },

  // --- HOSPITAL ---
  {
    id: "satyamev-hospital",
    name: "Satyamev Multi-speciality Hospital",
    category: "hospital",
    categoryLabel: "Hospital",
    icon: "🏥",
    subtitle: "24/7 Advanced Emergency & Critical Care",
    address: "Nr. Chandkheda Bus Stop, Chandkheda, Ahmedabad 382424",
    lat: 23.1118,
    lng: 72.5912,
    travel: { walk: "14 mins", cycle: "6 mins", car: "3 mins" },
  },
  {
    id: "kd-hospital",
    name: "KD Hospital (Kusum Dhirajlal Hospital)",
    category: "hospital",
    categoryLabel: "Hospital",
    icon: "🏥",
    subtitle: "Multi-Super Speciality Healthcare",
    address: "Vaishno Devi Circle, SG Highway, Ahmedabad 382421",
    lat: 23.1280,
    lng: 72.5450,
    travel: { walk: "28 mins", cycle: "14 mins", car: "6 mins" },
  },

  // --- FOOD ---
  {
    id: "kansar-restaurant",
    name: "Kansar Restaurant",
    category: "food",
    categoryLabel: "Food",
    icon: "🍽️",
    subtitle: "Authentic Gujarati Thali & Fine Dining",
    address: "SCS Food Plaza, Opp. Golden Villa, Nigam Nagar, Chandkheda, Ahmedabad 382424",
    lat: 23.1165,
    lng: 72.6010,
    travel: { walk: "8 mins", cycle: "4 mins", car: "2 mins" },
  },
  {
    id: "522-fine-dine",
    name: "522 Fine Dine Restaurant",
    category: "food",
    categoryLabel: "Food",
    icon: "🍽️",
    subtitle: "Multi-Cuisine Garden Restaurant",
    address: "SP Ring Rd, nr. Tapovan Circle, Chandkheda, Ahmedabad 382424",
    lat: 23.1190,
    lng: 72.6085,
    travel: { walk: "5 mins", cycle: "2 mins", car: "1 min" },
  },

  // --- HOTEL ---
  {
    id: "the-fern-residency",
    name: "The Fern Residency",
    category: "hotel",
    categoryLabel: "Hotel",
    icon: "🏨",
    subtitle: "Eco-Friendly Luxury Business Hotel",
    address: "Near Subhash Bridge, Ashram Road, Ahmedabad 380027",
    lat: 23.0645,
    lng: 72.5780,
    travel: { walk: "30 mins", cycle: "15 mins", car: "7 mins" },
  },
  {
    id: "narayani-heights",
    name: "Narayani Heights Hotel & Resort",
    category: "hotel",
    categoryLabel: "Hotel",
    icon: "🏨",
    subtitle: "5-Star Resort, Banquet & Suites",
    address: "Near Apollo Hospital, Bhat, Gandhinagar 382428",
    lat: 23.1118,
    lng: 72.6174,
    travel: { walk: "26 mins", cycle: "13 mins", car: "6 mins" },
  },

  // --- SHOPPING ---
  {
    id: "4d-square-mall",
    name: "4D Square Mall & Multiplex",
    category: "shopping",
    categoryLabel: "Shopping",
    icon: "🛍️",
    subtitle: "Premium Brands, Food Court & Retail",
    address: "Visat-Gandhinagar Highway, Motera, Ahmedabad 380005",
    lat: 23.0988,
    lng: 72.5942,
    travel: { walk: "16 mins", cycle: "7 mins", car: "4 mins" },
  },
  {
    id: "agora-mall",
    name: "Agora Mall",
    category: "shopping",
    categoryLabel: "Shopping",
    icon: "🛍️",
    subtitle: "International Retail & Entertainment",
    address: "Sardar Patel Ring Rd, nr. Bhat Circle, Ahmedabad 382428",
    lat: 23.1090,
    lng: 72.6250,
    travel: { walk: "25 mins", cycle: "12 mins", car: "6 mins" },
  },

  // --- BANKING ---
  {
    id: "sbi-bank-chandkheda",
    name: "State Bank of India (SBI)",
    category: "banking",
    categoryLabel: "Banking",
    icon: "🏦",
    subtitle: "Full-Service Branch & 24/7 ATM",
    address: "SP Ring Rd, Chandkheda, Ahmedabad, Gujarat 382424",
    lat: 23.1145,
    lng: 72.6020,
    travel: { walk: "7 mins", cycle: "3 mins", car: "2 mins" },
  },
  {
    id: "hdfc-bank-tapovan",
    name: "HDFC Bank Tapovan Branch",
    category: "banking",
    categoryLabel: "Banking",
    icon: "🏦",
    subtitle: "Retail Banking & Wealth Management",
    address: "Near Tapovan Circle, Chandkheda, Ahmedabad 382424",
    lat: 23.1210,
    lng: 72.6130,
    travel: { walk: "5 mins", cycle: "2 mins", car: "1 min" },
  },

  // --- FUEL ---
  {
    id: "nayara-fuel-station",
    name: "Nayara Energy Fuel Station",
    category: "fuel",
    categoryLabel: "Fuel",
    icon: "⛽",
    subtitle: "Petrol, Diesel & EV Fast Charging",
    address: "Sardar Patel Ring Rd, nr. Tapovan Circle, Chandkheda",
    lat: 23.1212,
    lng: 72.6145,
    travel: { walk: "4 mins", cycle: "2 mins", car: "1 min" },
  },
  {
    id: "indianoil-petrol-pump",
    name: "Indian Oil Petrol Station",
    category: "fuel",
    categoryLabel: "Fuel",
    icon: "⛽",
    subtitle: "24/7 Fuel & Auto Air Service",
    address: "Chandkheda - Zundal Cross Rd, SP Ring Rd 382424",
    lat: 23.1170,
    lng: 72.6040,
    travel: { walk: "8 mins", cycle: "4 mins", car: "2 mins" },
  },

  // --- GROCERY ---
  {
    id: "dmart-chandkheda",
    name: "DMart Chandkheda",
    category: "grocery",
    categoryLabel: "Grocery",
    icon: "🛒",
    subtitle: "Hypermarket Daily Essentials & Groceries",
    address: "Tragad Rd, Chandkheda, Ahmedabad 382424",
    lat: 23.1105,
    lng: 72.5890,
    travel: { walk: "15 mins", cycle: "7 mins", car: "3 mins" },
  },
  {
    id: "reliance-smart-point",
    name: "Reliance Smart Point",
    category: "grocery",
    categoryLabel: "Grocery",
    icon: "🛒",
    subtitle: "Fresh Produce & FMCG Grocery",
    address: "Nigam Nagar, Chandkheda, Ahmedabad 382424",
    lat: 23.1130,
    lng: 72.5980,
    travel: { walk: "10 mins", cycle: "4 mins", car: "2 mins" },
  },

  // --- PHARMACY ---
  {
    id: "apollo-pharmacy-tapovan",
    name: "Apollo Pharmacy",
    category: "pharmacy",
    categoryLabel: "Pharmacy",
    icon: "💊",
    subtitle: "24/7 Prescriptions & Health Care",
    address: "Shop 4, SP Ring Rd, Tapovan Circle, Chandkheda 382424",
    lat: 23.1200,
    lng: 72.6125,
    travel: { walk: "3 mins", cycle: "1 min", car: "1 min" },
  },
  {
    id: "medplus-pharmacy",
    name: "MedPlus Pharmacy Chandkheda",
    category: "pharmacy",
    categoryLabel: "Pharmacy",
    icon: "💊",
    subtitle: "Genuine Medicines & Healthcare Store",
    address: "Nigam Nagar, Chandkheda, Ahmedabad 382424",
    lat: 23.1140,
    lng: 72.5960,
    travel: { walk: "9 mins", cycle: "4 mins", car: "2 mins" },
  },

  // --- FITNESS ---
  {
    id: "golds-gym-motera",
    name: "Gold's Gym",
    category: "fitness",
    categoryLabel: "Fitness",
    icon: "🏋️",
    subtitle: "State-of-the-Art Fitness & Training",
    address: "4D Square Mall, Motera, Ahmedabad 380005",
    lat: 23.0988,
    lng: 72.5945,
    travel: { walk: "16 mins", cycle: "7 mins", car: "4 mins" },
  },
  {
    id: "anytime-fitness-tapovan",
    name: "Anytime Fitness SP Ring Rd",
    category: "fitness",
    categoryLabel: "Fitness",
    icon: "🏋️",
    subtitle: "24-Hour Premium Gym & Cardio",
    address: "Nr. Tapovan Circle, Chandkheda, Ahmedabad 382424",
    lat: 23.1218,
    lng: 72.6150,
    travel: { walk: "5 mins", cycle: "2 mins", car: "1 min" },
  },

  // --- RELIGIOUS ---
  {
    id: "merudham-jain-tirth",
    name: "Merudham Jain Tirth - Nageshwar Parshwanath",
    category: "religious",
    categoryLabel: "Religious",
    icon: "🛕",
    subtitle: "Grand Jain Temple & Peaceful Pilgrimage",
    address: "Acharya Farm Rd, nr. Tapovan Circle, Chandkheda 382424",
    lat: 23.1220,
    lng: 72.6140,
    travel: { walk: "4 mins", cycle: "2 mins", car: "1 min" },
  },
  {
    id: "trimandir-adalaj",
    name: "Trimandir Adalaj",
    category: "religious",
    categoryLabel: "Religious",
    icon: "🛕",
    subtitle: "Non-Sectarian Spiritual Temple Complex",
    address: "Ahmedabad-Kalol Highway, Adalaj, Gandhinagar 382421",
    lat: 23.1670,
    lng: 72.5830,
    travel: { walk: "35 mins", cycle: "18 mins", car: "8 mins" },
  },

  // --- TRANSPORT ---
  {
    id: "motera-metro-station",
    name: "Motera Stadium Metro Station",
    category: "transport",
    categoryLabel: "Transport",
    icon: "🚉",
    subtitle: "Ahmedabad Metro North-South Corridor",
    address: "Metro Station, Motera, Ahmedabad, Gujarat 380005",
    lat: 23.0950,
    lng: 72.5985,
    travel: { walk: "20 mins", cycle: "8 mins", car: "4 mins" },
  },
  {
    id: "chandkheda-railway-station",
    name: "Chandkheda Road Railway Station",
    category: "transport",
    categoryLabel: "Transport",
    icon: "🚉",
    subtitle: "Suburban & Passenger Rail Station",
    address: "Railway Colony, Chandkheda, Ahmedabad 382424",
    lat: 23.1010,
    lng: 72.5850,
    travel: { walk: "22 mins", cycle: "9 mins", car: "5 mins" },
  },

  // --- PARKING ---
  {
    id: "tapovan-parking-plaza",
    name: "Tapovan Circle Parking Plaza",
    category: "parking",
    categoryLabel: "Parking",
    icon: "🚗",
    subtitle: "Secure 24/7 Dedicated Multi-Vehicle Parking",
    address: "SP Ring Road, Tapovan Circle, Chandkheda 382424",
    lat: 23.1190,
    lng: 72.6110,
    travel: { walk: "2 mins", cycle: "1 min", car: "1 min" },
  },

  // --- SPORTS ---
  {
    id: "narendra-modi-sports",
    name: "Narendra Modi Cricket Stadium",
    category: "sports",
    categoryLabel: "Sports",
    icon: "⛳",
    subtitle: "132,000 Capacity International Cricket Arena",
    address: "Stadium Rd, Motera, Ahmedabad, Gujarat 380005",
    lat: 23.0917,
    lng: 72.5975,
    travel: { walk: "25 mins", cycle: "10 mins", car: "5 mins" },
  },
  {
    id: "sardar-patel-sports-complex",
    name: "Sardar Patel Sports Complex",
    category: "sports",
    categoryLabel: "Sports",
    icon: "⛳",
    subtitle: "Olympic-Standard Indoor & Outdoor Facilities",
    address: "Koba-Gandhinagar Highway, Gandhinagar 382428",
    lat: 23.1350,
    lng: 72.6410,
    travel: { walk: "30 mins", cycle: "14 mins", car: "6 mins" },
  },

  // --- CAFES ---
  {
    id: "starbucks-tapovan",
    name: "Starbucks Coffee",
    category: "cafes",
    categoryLabel: "Cafés",
    icon: "☕",
    subtitle: "Artisan Coffee, Snacks & Outdoor Seating",
    address: "SP Ring Road, nr. Tapovan Circle, Chandkheda 382424",
    lat: 23.1210,
    lng: 72.6138,
    travel: { walk: "4 mins", cycle: "2 mins", car: "1 min" },
  },
  {
    id: "ccd-tapovan",
    name: "Café Coffee Day",
    category: "cafes",
    categoryLabel: "Cafés",
    icon: "☕",
    subtitle: "Cozy Coffee Lounge & Quick Bites",
    address: "Visat-Gandhinagar Hwy, Motera, Ahmedabad 380005",
    lat: 23.1020,
    lng: 72.6010,
    travel: { walk: "16 mins", cycle: "7 mins", car: "4 mins" },
  },

  // --- ENTERTAINMENT ---
  {
    id: "ny-cinemas",
    name: "NY Cinemas (Devgn CineX)",
    category: "entertainment",
    categoryLabel: "Entertainment",
    icon: "🎬",
    subtitle: "Dolby Atmos 4K Luxury Multiplex",
    address: "SP Ring Rd, Chandkheda, Ahmedabad 382424",
    lat: 23.1175,
    lng: 72.6070,
    travel: { walk: "7 mins", cycle: "3 mins", car: "2 mins" },
  },

  // --- SERVICES ---
  {
    id: "chandkheda-post-office",
    name: "Chandkheda Post Office & India Post",
    category: "services",
    categoryLabel: "Services",
    icon: "🏪",
    subtitle: "Speed Post, Banking & Parcel Hub",
    address: "Post Office Rd, Chandkheda, Ahmedabad 382424",
    lat: 23.1120,
    lng: 72.5920,
    travel: { walk: "14 mins", cycle: "6 mins", car: "3 mins" },
  },

  // --- PET CARE ---
  {
    id: "dr-pets-clinic",
    name: "Dr. Pet's Veterinary Hospital",
    category: "pet-care",
    categoryLabel: "Pet Care",
    icon: "🐕",
    subtitle: "24/7 Animal Health Clinic & Grooming",
    address: "Tragad Rd, Chandkheda, Ahmedabad 382424",
    lat: 23.1140,
    lng: 72.5910,
    travel: { walk: "13 mins", cycle: "5 mins", car: "3 mins" },
  },

  // --- NATURE ---
  {
    id: "indroda-nature-park",
    name: "Indroda Nature Park & Zoo",
    category: "nature",
    categoryLabel: "Nature",
    icon: "🌿",
    subtitle: "Jurassic Dinosaur Gallery & Botanical Sanctuary",
    address: "Indroda, Gandhinagar, Gujarat 382007",
    lat: 23.1895,
    lng: 72.6465,
    travel: { walk: "35 mins", cycle: "18 mins", car: "8 mins" },
  },

  // --- GOVERNMENT ---
  {
    id: "chandkheda-ward-amc",
    name: "Chandkheda Municipal Civic Center (AMC)",
    category: "government",
    categoryLabel: "Government",
    icon: "🏛️",
    subtitle: "Public Services & Civic Administration",
    address: "Tragad Road, Chandkheda, Ahmedabad 382424",
    lat: 23.1110,
    lng: 72.5930,
    travel: { walk: "13 mins", cycle: "5 mins", car: "3 mins" },
  },

  // --- POLICE ---
  {
    id: "chandkheda-police-station",
    name: "Chandkheda Police Station",
    category: "police",
    categoryLabel: "Police",
    icon: "🚓",
    subtitle: "Law Enforcement & 24/7 Citizen Security",
    address: "Tragad Cross Rd, Chandkheda, Ahmedabad 382424",
    lat: 23.1115,
    lng: 72.5915,
    travel: { walk: "14 mins", cycle: "6 mins", car: "3 mins" },
  },

  // --- EMERGENCY ---
  {
    id: "108-emergency-station",
    name: "108 Emergency Ambulance Station",
    category: "emergency",
    categoryLabel: "Emergency",
    icon: "🚒",
    subtitle: "24/7 Rapid Emergency Response Hub",
    address: "Tapovan Circle, SP Ring Rd, Chandkheda 382424",
    lat: 23.1195,
    lng: 72.6105,
    travel: { walk: "2 mins", cycle: "1 min", car: "1 min" },
  },

  // --- AIRPORT ---
  {
    id: "svpi-airport",
    name: "Sardar Vallabhbhai Patel International Airport (AMD)",
    category: "airport",
    categoryLabel: "Airport",
    icon: "✈️",
    subtitle: "Domestic & International Flight Terminals",
    address: "Hansol, Ahmedabad, Gujarat 380003 (via SP Ring Rd)",
    lat: 23.0734,
    lng: 72.6347,
    travel: { walk: "55 mins", cycle: "25 mins", car: "12 mins" },
  },

  // --- REAL ESTATE ---
  {
    id: "riviera-select-sales",
    name: "Riviera Select Experience Lounge",
    category: "real-estate",
    categoryLabel: "Real Estate",
    icon: "🏢",
    subtitle: "Luxury Residences & Sample Flat Gallery",
    address: "Cluster_chandkheda 16, 8, Sardar Patel Ring Rd, nr. Tapovan Circle",
    lat: 23.1198863,
    lng: 72.6109636,
    travel: { walk: "0 mins", cycle: "0 mins", car: "0 mins" },
  },
];

/**
 * Normalizes category IDs to handle user aliases
 */
export function normalizeCategory(category) {
  if (!category) return "all";
  const cat = category.toLowerCase().trim();
  const aliases = {
    bank: "banking",
    mall: "shopping",
    groceries: "grocery",
    cafe: "cafes",
    coffee: "cafes",
    realestate: "real-estate",
    "real estate": "real-estate",
    pet: "pet-care",
    pets: "pet-care",
  };
  return aliases[cat] || cat;
}

/**
 * Calculates distance in km between two lat/lng coordinates (Haversine formula)
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

/**
 * Calculates travel times based on distance
 */
export function calculateTravelTimes(distanceKm) {
  const walkMins = Math.max(1, Math.round((distanceKm / 4.5) * 60));
  const cycleMins = Math.max(1, Math.round((distanceKm / 12) * 60));
  const carMins = Math.max(1, Math.round((distanceKm / 35) * 60));

  return {
    walk: `${walkMins} mins`,
    cycle: `${cycleMins} mins`,
    car: `${carMins} min${carMins > 1 ? "s" : ""}`,
  };
}

/**
 * API function to fetch places by category, sorted by distance from reference location
 */
export function fetchNearbyPlaces(
  category = "parks",
  refLat = BASE_PROPERTY_LOCATION.lat,
  refLng = BASE_PROPERTY_LOCATION.lng
) {
  const normalized = normalizeCategory(category);
  const filtered =
    normalized === "all"
      ? [...PLACES_DATABASE]
      : PLACES_DATABASE.filter((p) => p.category === normalized);

  if (filtered.length === 0) {
    return [BASE_PROPERTY_LOCATION];
  }

  return filtered
    .map((place) => {
      const distanceKm = calculateDistanceKm(refLat, refLng, place.lat, place.lng);
      return {
        ...place,
        distanceKm,
        travel: place.travel || calculateTravelTimes(distanceKm),
      };
    })
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

/**
 * API function to get place by ID or custom search
 */
export function getPlaceById(id) {
  if (id === BASE_PROPERTY_LOCATION.id) {
    return BASE_PROPERTY_LOCATION;
  }
  return PLACES_DATABASE.find((p) => p.id === id) || null;
}

/**
 * API function to fetch 360 Street View for a location
 */
export async function fetch360StreetView(place) {
  if (!place) throw new Error("No location provided");

  return new Promise((resolve) => {
    setTimeout(() => {
      const query = encodeURIComponent(`${place.name}, ${place.address}`);
      const embedUrl = `https://www.google.com/maps?q=${query}&output=embed`;
      resolve({
        success: true,
        placeId: place.id,
        name: place.name,
        address: place.address,
        embedUrl,
        timestamp: Date.now(),
      });
    }, 250);
  });
}

/**
 * API function to get street view embed URL directly
 */
export function getStreetViewEmbedUrl(place) {
  if (!place) return "";
  const query = `${place.name}, ${place.address}`;
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

/**
 * Dynamic Google Maps JavaScript SDK loader
 */
let googleMapsLoadingPromise = null;

export function loadGoogleMapsSDK(apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "") {
  if (typeof window === "undefined") return Promise.reject(new Error("Window not defined"));
  if (window.google && window.google.maps) {
    return Promise.resolve(window.google.maps);
  }
  if (googleMapsLoadingPromise) {
    return googleMapsLoadingPromise;
  }

  googleMapsLoadingPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById("google-maps-js-sdk");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.google.maps));
      existingScript.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-js-sdk";
    const keyParam = apiKey ? `&key=${apiKey}` : "";
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places,geometry${keyParam}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = (err) => {
      googleMapsLoadingPromise = null;
      reject(err);
    };
    document.head.appendChild(script);
  });

  return googleMapsLoadingPromise;
}

/**
 * Dynamic Leaflet SDK loader for watermark-free, clean Google Maps tile rendering
 */
let leafletPromise = null;

export function loadLeafletSDK() {
  if (typeof window === "undefined") return Promise.reject(new Error("Window not defined"));
  if (window.L) return Promise.resolve(window.L);
  if (leafletPromise) return leafletPromise;

  leafletPromise = new Promise((resolve, reject) => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    if (document.getElementById("leaflet-js")) {
      const existing = document.getElementById("leaflet-js");
      existing.addEventListener("load", () => resolve(window.L));
      return;
    }

    const script = document.createElement("script");
    script.id = "leaflet-js";
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => resolve(window.L);
    script.onerror = (err) => {
      leafletPromise = null;
      reject(err);
    };
    document.head.appendChild(script);
  });

  return leafletPromise;
}

/**
 * Reverse geocode any clicked latitude and longitude into structured place data
 */
export async function reverseGeocodeLocation(lat, lng, placeId = null, mapInstance = null) {
  if (typeof lat !== "number" || typeof lng !== "number") {
    return BASE_PROPERTY_LOCATION;
  }

  // 1. If user clicked a direct Google POI landmark (like Karnavati University), fetch precise Place Details
  if (placeId && typeof window !== "undefined" && window.google?.maps?.places?.PlacesService) {
    try {
      const placesService = new window.google.maps.places.PlacesService(
        mapInstance || document.createElement("div")
      );

      const placeDetails = await new Promise((resolve) => {
        placesService.getDetails(
          {
            placeId,
            fields: [
              "name",
              "formatted_address",
              "geometry",
              "types",
              "vicinity",
            ],
          },
          (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
              resolve(place);
            } else {
              resolve(null);
            }
          }
        );
      });

      if (placeDetails && placeDetails.name) {
        const placeLat = placeDetails.geometry?.location
          ? placeDetails.geometry.location.lat()
          : lat;
        const placeLng = placeDetails.geometry?.location
          ? placeDetails.geometry.location.lng()
          : lng;
        const distanceKm = calculateDistanceKm(
          BASE_PROPERTY_LOCATION.lat,
          BASE_PROPERTY_LOCATION.lng,
          placeLat,
          placeLng
        );

        const primaryType = placeDetails.types?.[0] || "landmark";
        const formattedCategory = primaryType
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

        return {
          id: placeId,
          name: placeDetails.name,
          category: primaryType,
          categoryLabel: formattedCategory,
          icon: "📍",
          subtitle:
            placeDetails.vicinity ||
            `${placeLat.toFixed(4)}° N, ${placeLng.toFixed(4)}° E`,
          address: placeDetails.formatted_address || placeDetails.vicinity || "",
          lat: placeLat,
          lng: placeLng,
          distanceKm,
          travel: calculateTravelTimes(distanceKm),
        };
      }
    } catch (err) {
      console.warn("PlacesService getDetails failed:", err);
    }
  }

  // 2. Check nearby POIs in our local database (within 150 meters)
  for (const place of PLACES_DATABASE) {
    const dist = calculateDistanceKm(lat, lng, place.lat, place.lng);
    if (dist < 0.15) {
      return {
        ...place,
        distanceKm: calculateDistanceKm(
          BASE_PROPERTY_LOCATION.lat,
          BASE_PROPERTY_LOCATION.lng,
          place.lat,
          place.lng
        ),
        travel: calculateTravelTimes(dist),
      };
    }
  }

  // 3. Check Google Places nearby search if user clicked near a landmark
  if (typeof window !== "undefined" && window.google?.maps?.places?.PlacesService) {
    try {
      const placesService = new window.google.maps.places.PlacesService(
        mapInstance || document.createElement("div")
      );

      const nearbyPlace = await new Promise((resolve) => {
        placesService.nearbySearch(
          {
            location: { lat, lng },
            radius: 40,
          },
          (results, status) => {
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              results &&
              results[0]
            ) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        );
      });

      if (nearbyPlace && nearbyPlace.name) {
        const placeLat = nearbyPlace.geometry?.location
          ? nearbyPlace.geometry.location.lat()
          : lat;
        const placeLng = nearbyPlace.geometry?.location
          ? nearbyPlace.geometry.location.lng()
          : lng;
        const distanceKm = calculateDistanceKm(
          BASE_PROPERTY_LOCATION.lat,
          BASE_PROPERTY_LOCATION.lng,
          placeLat,
          placeLng
        );
        const primaryType = nearbyPlace.types?.[0] || "landmark";
        const formattedCategory = primaryType
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

        return {
          id: nearbyPlace.place_id || `loc-${lat.toFixed(5)}-${lng.toFixed(5)}`,
          name: nearbyPlace.name,
          category: primaryType,
          categoryLabel: formattedCategory,
          icon: "📍",
          subtitle:
            nearbyPlace.vicinity ||
            `${placeLat.toFixed(4)}° N, ${placeLng.toFixed(4)}° E`,
          address: nearbyPlace.vicinity || "",
          lat: placeLat,
          lng: placeLng,
          distanceKm,
          travel: calculateTravelTimes(distanceKm),
        };
      }
    } catch (err) {
      // nearbySearch fallback
    }
  }

  // 4. Google Geocoder if available
  if (typeof window !== "undefined" && window.google?.maps?.Geocoder) {
    try {
      const geocoder = new window.google.maps.Geocoder();
      const res = await new Promise((resolve) => {
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const poiResult = results.find((r) =>
              r.types.some((t) =>
                [
                  "point_of_interest",
                  "premise",
                  "establishment",
                  "university",
                  "school",
                ].includes(t)
              )
            );
            resolve(poiResult || results[0]);
          } else {
            resolve(null);
          }
        });
      });

      if (res) {
        const address = res.formatted_address;
        const firstSegment = address.split(",")[0]?.trim();
        const nameComp =
          res.address_components?.find((c) =>
            c.types.some((t) =>
              [
                "point_of_interest",
                "premise",
                "neighborhood",
                "establishment",
              ].includes(t)
            )
          )?.long_name ||
          (firstSegment && firstSegment.length < 40 ? firstSegment : null) ||
          res.address_components?.find((c) => c.types.includes("sublocality"))
            ?.long_name ||
          res.address_components?.find((c) => c.types.includes("locality"))
            ?.long_name ||
          res.address_components?.[0]?.long_name ||
          "Selected Location";

        const distanceKm = calculateDistanceKm(
          BASE_PROPERTY_LOCATION.lat,
          BASE_PROPERTY_LOCATION.lng,
          lat,
          lng
        );

        return {
          id: `loc-${lat.toFixed(5)}-${lng.toFixed(5)}`,
          name: nameComp,
          category: "location",
          categoryLabel: "Selected Location",
          icon: "📍",
          subtitle: `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`,
          address,
          lat,
          lng,
          distanceKm,
          travel: calculateTravelTimes(distanceKm),
        };
      }
    } catch (e) {
      console.warn("Google reverse geocoding failed:", e);
    }
  }

  // 3. OpenStreetMap Nominatim reverse geocode (Worldwide, free, reliable fallback)
  try {
    const resp = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`,
      { headers: { "Accept-Language": "en" } }
    );
    if (resp.ok) {
      const data = await resp.json();
      const addr = data.address || {};
      const name =
        data.name ||
        addr.amenity ||
        addr.building ||
        addr.neighbourhood ||
        addr.suburb ||
        addr.city ||
        addr.town ||
        addr.county ||
        addr.state ||
        "Selected Location";

      const distanceKm = calculateDistanceKm(
        BASE_PROPERTY_LOCATION.lat,
        BASE_PROPERTY_LOCATION.lng,
        lat,
        lng
      );

      return {
        id: `loc-${lat.toFixed(5)}-${lng.toFixed(5)}`,
        name,
        category: "location",
        categoryLabel: addr.city ? `${addr.city}, ${addr.country || ""}` : "Selected Location",
        icon: "📍",
        subtitle: `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`,
        address: data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
        lat,
        lng,
        distanceKm,
        travel: calculateTravelTimes(distanceKm),
      };
    }
  } catch (err) {
    console.warn("Nominatim reverse geocode error:", err);
  }

  // 4. Default coordinates format
  const distanceKm = calculateDistanceKm(
    BASE_PROPERTY_LOCATION.lat,
    BASE_PROPERTY_LOCATION.lng,
    lat,
    lng
  );
  return {
    id: `loc-${lat.toFixed(5)}-${lng.toFixed(5)}`,
    name: "Selected Location",
    category: "location",
    categoryLabel: "Coordinates Pin",
    icon: "📍",
    subtitle: `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`,
    address: `Latitude: ${lat.toFixed(5)}, Longitude: ${lng.toFixed(5)}`,
    lat,
    lng,
    distanceKm,
    travel: calculateTravelTimes(distanceKm),
  };
}


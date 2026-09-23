// Real-world map data and points of interest matching Riviera Select surroundings
// Baseline location: Sardar Patel Ring Road, nr. Tapovan Circle, Chandkheda, Ahmedabad

export const RIVIERA_LOCATION = {
  id: "riviera-select-main",
  name: "Riviera Select",
  address: "Cluster_chandkheda 16, 8, Sardar Patel Ring Rd, nr. Tapovan Circle, Nigam Nagar, Chandkheda, Ahmedabad, Gujarat 382424",
  lat: 23.1198863,
  lng: 72.6109636,
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d771.391519637442!2d72.61096364588012!3d23.119886328808533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e82296f9e7abf%3A0x9f0fa0efc3bcb29e!2sCluster_chandkheda%2016%2C%208%2C%20Sardar%20Patel%20Ring%20Rd%2C%20nr.%20Tapovan%20Circle%2C%20Nigam%20Nagar%2C%20Chandkheda%2C%20Ahmedabad%2C%20Gujarat%20382424!5e0!3m2!1sen!2sin!4v1790148770082!5m2!1sen!2sin",
};

import { MAP_CATEGORIES } from "../api/maps/mapsApi";

export const mapCategories = MAP_CATEGORIES;

// All static UI text & asset paths for the maps folder — single source of truth.
// Place data (name, category, travel, address, lat, lng) comes from mapsApi.js
// via fetchNearbyPlaces() / reverseGeocodeLocation() — NOT stored here.
export const mapUI = {
  loading: "Loading Map...",
  toggleSatellite: "Switch to Satellite view",
  toggleRoad: "Switch to Road Map view",
  satelliteAlt: "Satellite Layer",
  roadAlt: "Map Layer",
  satelliteImg: "/UI IMG/real_sat_toggle.svg",
  roadImg: "/UI IMG/real_map_toggle.svg",
  zoomIn: "Zoom In",
  zoomOut: "Zoom Out",
  prevCategories: "Previous categories",
  scrollLeft: "Scroll left",
  nextCategories: "Next categories",
  scrollRight: "Scroll right",
  travel: [
    { key: "walk", img: "/map/manwalking.svg", alt: "Walk", fallback: "4 mins" },
    { key: "cycle", img: "/map/cycle.svg", alt: "Cycle", fallback: "2 mins" },
    { key: "car", img: "/map/car.svg", alt: "Car", fallback: "1 min" },
  ],
  streetView: {
    img: "/map/360 View.svg",
    alt: "360° Street View",
    label: "Street View",
    loadingLabel: "Loading...",
  },
};

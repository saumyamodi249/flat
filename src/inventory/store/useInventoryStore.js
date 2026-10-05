import { create } from "zustand";
import {
  inventoryUnits,
  inventoryPropertyTypes,
  inventoryExposures,
  inventoryPropertyStatuses,
  defaultFeaturedUnit,
} from "../data";

export const useInventoryStore = create((set, get) => ({
  // Filter States
  selectedPropertyType: inventoryPropertyTypes[0] || "Office",
  selectedExposure: inventoryExposures[0] || "N",
  selectedStatus: inventoryPropertyStatuses[0] || "All",
  minArea: "",
  maxArea: "",

  // UI Visibility States
  isFilterOpen: false,
  isMobileFilterOpen: false,
  showFlatsCarousel: false,

  // Selected Unit & Favorites State
  favoriteUnitId: defaultFeaturedUnit.id, // Only ONE favorite allowed at a time
  selectedUnitId: defaultFeaturedUnit.id || 1,

  // Actions
  setSelectedPropertyType: (type) => set({ selectedPropertyType: type }),
  setSelectedExposure: (exposure) => set({ selectedExposure: exposure }),
  setSelectedStatus: (status) => set({ selectedStatus: status }),
  setMinArea: (minArea) => set({ minArea }),
  setMaxArea: (maxArea) => set({ maxArea }),

  setIsFilterOpen: (isOpen) =>
    set((state) => ({
      isFilterOpen: typeof isOpen === "function" ? isOpen(state.isFilterOpen) : isOpen,
    })),

  setIsMobileFilterOpen: (isOpen) =>
    set((state) => ({
      isMobileFilterOpen: typeof isOpen === "function" ? isOpen(state.isMobileFilterOpen) : isOpen,
    })),

  setShowFlatsCarousel: (show) => set({ showFlatsCarousel: show }),

  setSelectedUnitId: (id) => set({ selectedUnitId: id }),

  // Toggle favorite for unit — only ONE favorite allowed at a time
  toggleFavoriteUnit: (id, e) => {
    if (e && typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }
    const currentFav = get().favoriteUnitId;
    if (currentFav === id) {
      set({ favoriteUnitId: null });
    } else {
      set({ favoriteUnitId: id, selectedUnitId: id });
    }
  },

  // Reset Filters (Desktop)
  resetFilters: () => {
    set({
      selectedPropertyType: inventoryPropertyTypes[0] || "Office",
      selectedExposure: inventoryExposures[0] || "N",
      selectedStatus: inventoryPropertyStatuses[0] || "All",
      minArea: "",
      maxArea: "",
      selectedUnitId: 1,
    });
  },

  // Mobile "Show Flats" button
  handleShowFlats: () => {
    set({
      isMobileFilterOpen: false,
      isFilterOpen: false,
      showFlatsCarousel: true,
    });
  },

  // Mobile "Clear all" button
  handleClearAllMobile: () => {
    set({
      selectedPropertyType: inventoryPropertyTypes[0] || "Office",
      selectedExposure: inventoryExposures[0] || "N",
      selectedStatus: inventoryPropertyStatuses[0] || "All",
      showFlatsCarousel: false,
      selectedUnitId: 1,
    });
  },
}));

export default useInventoryStore;

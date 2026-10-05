import { makeAutoObservable } from "mobx";
import {
  inventoryUnits,
  inventoryPropertyTypes,
  inventoryExposures,
  inventoryPropertyStatuses,
  defaultFeaturedUnit,
} from "../data";

/**
 * MobX Store implementation for Inventory state management
 * Demonstrates Class-based Observable state, Computed Getters, and Actions.
 */
class InventoryMobxStore {
  selectedPropertyType = inventoryPropertyTypes[0] || "Office";
  selectedExposure = inventoryExposures[0] || "N";
  selectedStatus = inventoryPropertyStatuses[0] || "All";
  minArea = "";
  maxArea = "";

  isFilterOpen = false;
  isMobileFilterOpen = false;
  showFlatsCarousel = false;

  favoriteUnitId = defaultFeaturedUnit.id;
  selectedUnitId = defaultFeaturedUnit.id || 1;

  constructor() {
    makeAutoObservable(this);
  }

  // --- Actions ---
  setSelectedPropertyType = (type) => {
    this.selectedPropertyType = type;
  };

  setSelectedExposure = (exp) => {
    this.selectedExposure = exp;
  };

  setSelectedStatus = (status) => {
    this.selectedStatus = status;
  };

  setMinArea = (val) => {
    this.minArea = val;
  };

  setMaxArea = (val) => {
    this.maxArea = val;
  };

  setSelectedUnitId = (id) => {
    this.selectedUnitId = id;
  };

  setIsFilterOpen = (isOpen) => {
    this.isFilterOpen = typeof isOpen === "function" ? isOpen(this.isFilterOpen) : isOpen;
  };

  setIsMobileFilterOpen = (isOpen) => {
    this.isMobileFilterOpen = typeof isOpen === "function" ? isOpen(this.isMobileFilterOpen) : isOpen;
  };

  setShowFlatsCarousel = (show) => {
    this.showFlatsCarousel = show;
  };

  toggleFavoriteUnit = (id, e) => {
    if (e && typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }
    if (this.favoriteUnitId === id) {
      this.favoriteUnitId = null;
    } else {
      this.favoriteUnitId = id;
      this.selectedUnitId = id;
    }
  };

  resetFilters = () => {
    this.selectedPropertyType = inventoryPropertyTypes[0] || "Office";
    this.selectedExposure = inventoryExposures[0] || "N";
    this.selectedStatus = inventoryPropertyStatuses[0] || "All";
    this.minArea = "";
    this.maxArea = "";
    this.selectedUnitId = 1;
  };

  handleShowFlats = () => {
    this.isMobileFilterOpen = false;
    this.isFilterOpen = false;
    this.showFlatsCarousel = true;
  };

  handleClearAllMobile = () => {
    this.selectedPropertyType = inventoryPropertyTypes[0] || "Office";
    this.selectedExposure = inventoryExposures[0] || "N";
    this.selectedStatus = inventoryPropertyStatuses[0] || "All";
    this.showFlatsCarousel = false;
    this.selectedUnitId = 1;
  };

  // --- Computed Getters ---
  get units() {
    return inventoryUnits.map((u) => ({
      ...u,
      isFavorite: u.id === this.favoriteUnitId,
    }));
  }

  get activeUnit() {
    const found = this.units.find((u) => u.id === this.selectedUnitId);
    return found || this.units[0];
  }

  get filteredUnits() {
    return this.units.filter((u) => {
      if (this.selectedPropertyType && u.propertyType?.toLowerCase() !== this.selectedPropertyType.toLowerCase()) {
        return false;
      }
      if (
        this.selectedStatus &&
        this.selectedStatus !== inventoryPropertyStatuses[0] &&
        u.status?.toLowerCase() !== this.selectedStatus.toLowerCase()
      ) {
        return false;
      }
      if (
        this.selectedExposure &&
        !u.exposure?.split(",").map((s) => s.trim()).includes(this.selectedExposure) &&
        !u.exposure?.includes(this.selectedExposure)
      ) {
        return false;
      }
      if (this.minArea && u.area < Number(this.minArea)) {
        return false;
      }
      if (this.maxArea && u.area > Number(this.maxArea)) {
        return false;
      }
      return true;
    });
  }
}

export const inventoryMobxStore = new InventoryMobxStore();
export default inventoryMobxStore;

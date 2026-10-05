import { useMemo } from "react";
import useInventoryStore from "../store/useInventoryStore";
import { inventoryUnits, inventoryPropertyStatuses } from "../data";

/**
 * Custom hook to encapsulate computed inventory data and filtering
 */
export function useInventoryData() {
  const selectedPropertyType = useInventoryStore((s) => s.selectedPropertyType);
  const selectedExposure = useInventoryStore((s) => s.selectedExposure);
  const selectedStatus = useInventoryStore((s) => s.selectedStatus);
  const minArea = useInventoryStore((s) => s.minArea);
  const maxArea = useInventoryStore((s) => s.maxArea);
  const favoriteUnitId = useInventoryStore((s) => s.favoriteUnitId);
  const selectedUnitId = useInventoryStore((s) => s.selectedUnitId);

  // Compute units with live isFavorite status
  const units = useMemo(() => {
    return inventoryUnits.map((u) => ({
      ...u,
      isFavorite: u.id === favoriteUnitId,
    }));
  }, [favoriteUnitId]);

  // Compute active unit for card details
  const activeUnit = useMemo(() => {
    const found = units.find((u) => u.id === selectedUnitId);
    return found || units[0];
  }, [units, selectedUnitId]);

  // Filtered units for desktop table
  const filteredUnits = useMemo(() => {
    return units.filter((u) => {
      if (selectedPropertyType && u.propertyType?.toLowerCase() !== selectedPropertyType.toLowerCase()) {
        return false;
      }
      if (
        selectedStatus &&
        selectedStatus !== inventoryPropertyStatuses[0] &&
        u.status?.toLowerCase() !== selectedStatus.toLowerCase()
      ) {
        return false;
      }
      if (
        selectedExposure &&
        !u.exposure?.split(",").map((s) => s.trim()).includes(selectedExposure) &&
        !u.exposure?.includes(selectedExposure)
      ) {
        return false;
      }
      if (minArea && u.area < Number(minArea)) {
        return false;
      }
      if (maxArea && u.area > Number(maxArea)) {
        return false;
      }
      return true;
    });
  }, [units, selectedPropertyType, selectedStatus, selectedExposure, minArea, maxArea]);

  // Filtered units for mobile carousel
  const carouselUnits = useMemo(() => {
    let list = units.filter((u) => {
      if (selectedPropertyType && u.propertyType?.toLowerCase() !== selectedPropertyType.toLowerCase()) {
        return false;
      }
      if (selectedStatus && selectedStatus !== "All" && u.status?.toLowerCase() !== selectedStatus.toLowerCase()) {
        return false;
      }
      if (
        selectedExposure &&
        !u.exposure?.split(",").map((s) => s.trim()).includes(selectedExposure) &&
        !u.exposure?.includes(selectedExposure)
      ) {
        return false;
      }
      return true;
    });

    if (list.length === 0) {
      list = [...units];
    }

    const a801Index = list.findIndex((u) => u.unitNo === "801" || u.unitNo === "A-801");
    if (a801Index > 0) {
      const a801 = list.splice(a801Index, 1)[0];
      list.unshift(a801);
    }

    return list;
  }, [units, selectedPropertyType, selectedStatus, selectedExposure]);

  return {
    units,
    activeUnit,
    filteredUnits,
    carouselUnits,
  };
}

export default useInventoryData;

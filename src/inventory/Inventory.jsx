import React from "react";
import { Routes, Route } from "react-router-dom";
import InventoryPage from "./pages/InventoryPage";

function Inventory() {
  return (
    <Routes>
      <Route index element={<InventoryPage />} />
      <Route path="*" element={<InventoryPage />} />
    </Routes>
  );
}

export { InventoryPage };
export default Inventory;

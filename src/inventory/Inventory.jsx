import React from "react";
import { Routes, Route } from "react-router-dom";
import InventoryPage from "./pages/InventoryPage";
import InventoryPageDetail from "./pages/InventoryPageDetail";

function Inventory() {
  return (
    <Routes>
      <Route index element={<InventoryPage />} />
      <Route path="detail" element={<InventoryPageDetail />} />
      <Route path="*" element={<InventoryPage />} />
    </Routes>
  );
}

export { InventoryPage, InventoryPageDetail };
export default Inventory;

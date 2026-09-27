import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AmenityPage from "./pages/AmenityPage";
import AmenityView from "./pages/AmenityView";

function Amenities() {
  return (
    <Routes>
      <Route element={<AmenityPage />}>
        {/* Default route redirect to waiting-lounge matching reference design */}
        <Route index element={<Navigate to="waiting-lounge" replace />} />
        {/* All dynamic amenity category routes */}
        <Route path=":category" element={<AmenityView />} />
      </Route>
    </Routes>
  );
}

export { AmenityPage, AmenityView };
export default Amenities;

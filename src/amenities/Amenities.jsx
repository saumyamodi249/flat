import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AmenitiesPage from "./pages/AmenitiesPage";
import Indoor from "./pages/Indoor";
import Outdoor from "./pages/Outdoor";
import Wellness from "./pages/Wellness";

function Amenities() {
  return (
    <Routes>
      <Route element={<AmenitiesPage />}>
        <Route index element={<Navigate to="indoor" replace />} />
        <Route path="indoor" element={<Indoor />} />
        <Route path="outdoor" element={<Outdoor />} />
        <Route path="wellness" element={<Wellness />} />
      </Route>
    </Routes>
  );
}

export { AmenitiesPage, Indoor, Outdoor, Wellness };
export default Amenities;

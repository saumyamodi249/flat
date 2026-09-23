import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MapPage from "./pages/MapPage";
import MapView from "./pages/MapView";

function Maps() {
  return (
    <Routes>
      <Route element={<MapPage />}>
        {/* Default route redirect to parks */}
        <Route index element={<Navigate to="parks" replace />} />
        {/* All dynamic category routes */}
        <Route path=":category" element={<MapView />} />
      </Route>
    </Routes>
  );
}

export { MapPage, MapView };
export default Maps;

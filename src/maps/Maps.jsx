import { Routes, Route, Navigate } from "react-router-dom";
import MapPage from "./pages/MapPage";
import MapView from "./pages/MapView";

function Maps() {
  return (
    <Routes>
      <Route element={<MapPage />}>
        {/* Default route redirect to all matching Image 1 */}
        <Route index element={<Navigate to="all" replace />} />
        {/* All dynamic category routes */}
        <Route path=":category" element={<MapView />} />
      </Route>
    </Routes>
  );
}

export { MapPage, MapView };
export default Maps;

import { Routes, Route, Navigate } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";
import Interior from "./pages/Interior";
import Exterior from "./pages/Exterior";
import Amenities from "./pages/Amenities";
import All from "./pages/All";

function Gallery() {
  return (
    <Routes>
      <Route element={<GalleryPage />}>
        {/* Default route redirects to all */}
        <Route index element={<Navigate to="all" replace />} />
        <Route path="all" element={<All />} />
        <Route path="interior" element={<Interior />} />
        <Route path="exterior" element={<Exterior />} />
        <Route path="amenities" element={<Amenities />} />
        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="all" replace />} />
      </Route>
    </Routes>
  );
}

export { GalleryPage, Interior, Exterior, Amenities, All };
export default Gallery;

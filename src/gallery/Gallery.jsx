import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";
import Interior from "./pages/Interior";

function Gallery() {
  return (
    <Routes>
      <Route element={<GalleryPage />}>
        {/* Default route redirect to interior matching user request */}
        <Route index element={<Navigate to="interior" replace />} />
        <Route path="interior" element={<Interior />} />
      </Route>
    </Routes>
  );
}

export { GalleryPage, Interior };
export default Gallery;

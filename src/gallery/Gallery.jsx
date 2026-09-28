import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";
import Interior from "./pages/Interior";
import Exterior from "./pages/Exterior";
import All from "./pages/All";

function Gallery() {
  return (
    <Routes>
      <Route element={<GalleryPage />}>
        {/* Default route redirects to interior */}
        <Route index element={<Navigate to="interior" replace />} />
        <Route path="all" element={<All />} />
        <Route path="interior" element={<Interior />} />
        <Route path="exterior" element={<Exterior />} />
        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="interior" replace />} />
      </Route>
    </Routes>
  );
}

export { GalleryPage, Interior, Exterior, All };
export default Gallery;

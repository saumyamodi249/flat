import React from "react";
import BottomNav from "../../components/BottomNav";
import { galleryData } from "../data";

function GalleryPage() {
  return (
    <div className="min-h-screen w-full bg-[var(--theme-route-title)] pb-16">
      <h1 className="text-2xl font-semibold text-[var(--theme-bottom)] text-center pt-6">
        {galleryData.title}
      </h1>
      <BottomNav />
    </div>
  );
}

export default GalleryPage;

import { GALLERY_CATEGORIES } from "../data";

function GalleryFilterTabs({ activeCategory = "interior", onSelectCategory }) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 select-none">
      {GALLERY_CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-5 sm:px-6 py-1.5 sm:py-2 rounded-[10px] text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer select-none ${
              isActive
                ? "bg-[var(--theme-gallery-tab-selected-bg)] text-[var(--theme-gallery-tab-selected-text)] shadow-md font-semibold"
                : "bg-transparent text-[var(--theme-gallery-tab-default-text)]/85 hover:text-[var(--theme-gallery-tab-hover-text)]"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

export default GalleryFilterTabs;


/**
 * Common Background Component
 * Reusable across pages (Amenities, Gallery, Maps, About, Contact, etc.)
 * Provides the Riviera Building background with 50% transparency and blur.
 */
function PageBackground({
  src = "/UI IMG/Building.png",
  blur = true,
  opacity = "opacity-50",
  overlay = "bg-[var(--theme-bg-blur)]/30",
  className = "",
}) {
  return (
    <div
      className={`fixed inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Building background image with 50% transparency and subtle blur */}
      <img
        src={src}
        alt=""
        className={`w-full h-full object-cover select-none pointer-events-none scale-105 transition-all duration-300 ${
          blur ? "blur-sm" : ""
        } ${opacity} brightness-90`}
      />
      {/* Dark overlay */}
      {overlay && <div className={`absolute inset-0 ${overlay}`} />}
    </div>
  );
}

export default PageBackground;

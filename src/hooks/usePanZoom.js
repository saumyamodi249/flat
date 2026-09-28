import { useRef, useEffect, useCallback } from "react";

/**
 * Pure utility function to calculate clamped boundary positions
 * so the image never exposes borders outside viewport/container.
 */
function clampPosition(x, y, scale, el, contain) {
  if (!el || !contain) return { x, y };

  const containerWidth = el.parentElement ? el.parentElement.clientWidth : window.innerWidth;
  const containerHeight = el.parentElement ? el.parentElement.clientHeight : window.innerHeight;

  const scaledWidth = containerWidth * scale;
  const scaledHeight = containerHeight * scale;

  // Horizontal translation clamping
  let clampedX = x;
  if (scaledWidth >= containerWidth) {
    const minX = containerWidth - scaledWidth;
    const maxX = 0;
    clampedX = Math.min(Math.max(x, minX), maxX);
  } else {
    clampedX = (containerWidth - scaledWidth) / 2;
  }

  // Vertical translation clamping
  let clampedY = y;
  if (scaledHeight >= containerHeight) {
    const minY = containerHeight - scaledHeight;
    const maxY = 0;
    clampedY = Math.min(Math.max(y, minY), maxY);
  } else {
    clampedY = (containerHeight - scaledHeight) / 2;
  }

  return { x: clampedX, y: clampedY };
}

/**
 * usePanZoom hook
 * Enables smooth zooming (scaling) via mouse wheel towards the cursor,
 * and dragging (translating) in any direction with pointer events.
 *
 * Automatically clamps the translation to the viewport/container boundaries
 * so the image always covers the screen without exposing gaps on the top,
 * bottom, left, or right when zooming out to minScale (or any scale).
 *
 * @param {Object} options
 * @param {number} [options.minScale=1] - Minimum allowable zoom scale (default 1)
 * @param {number} [options.maxScale=10] - Maximum allowable zoom scale
 * @param {number} [options.initialScale=1] - Starting scale
 * @param {number} [options.initialX=0] - Starting X translation
 * @param {number} [options.initialY=0] - Starting Y translation
 * @param {number} [options.zoomSpeed=0.0018] - Sensitivity of mouse wheel zoom
 * @param {boolean} [options.contain=true] - Constrain edges so background never shows
 * @param {boolean} [options.resetOnDoubleClick=true] - Reset to 1x on double click
 * @returns {{ ref: React.RefObject, reset: () => void, setTransform: (x: number, y: number, scale: number) => void }}
 */
export default function usePanZoom(options = {}) {
  const {
    minScale = 1,
    maxScale = 10,
    initialScale = 1,
    initialX = 0,
    initialY = 0,
    zoomSpeed = 0.0018,
    contain = true,
    resetOnDoubleClick = true,
  } = options;

  const elementRef = useRef(null);

  // Internal state kept in refs for 60fps direct DOM manipulation without React re-render lag
  const stateRef = useRef({
    scale: initialScale,
    x: initialX,
    y: initialY,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    originX: initialX,
    originY: initialY,
  });

  // Apply CSS transform directly to element
  const applyTransform = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;
    const { x, y, scale } = stateRef.current;
    el.style.transform = `translate3d(${x}px, ${y}px, 0px) scale(${scale})`;
  }, []);

  // Programmatic reset function (with smooth return transition)
  const reset = useCallback(() => {
    const el = elementRef.current;
    if (el) {
      el.style.transition = "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)";
      setTimeout(() => {
        if (elementRef.current) {
          elementRef.current.style.transition = "";
        }
      }, 350);
    }
    stateRef.current.scale = initialScale;
    stateRef.current.x = initialX;
    stateRef.current.y = initialY;
    stateRef.current.isDragging = false;
    applyTransform();
  }, [initialScale, initialX, initialY, applyTransform]);

  // Programmatic setTransform function
  const setTransform = useCallback(
    (newX, newY, newScale) => {
      const el = elementRef.current;
      const nextScale = Math.min(Math.max(newScale, minScale), maxScale);
      const { x, y } = clampPosition(newX, newY, nextScale, el, contain);
      stateRef.current.scale = nextScale;
      stateRef.current.x = x;
      stateRef.current.y = y;
      applyTransform();
    },
    [minScale, maxScale, contain, applyTransform]
  );

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Ensure hardware acceleration and top-left transform origin for cursor zooming
    el.style.transformOrigin = "0 0";
    el.style.willChange = "transform";
    el.style.touchAction = "none";
    el.style.cursor = "grab";

    // Initial boundary clamp
    const initialClamped = clampPosition(initialX, initialY, initialScale, el, contain);
    stateRef.current.x = initialClamped.x;
    stateRef.current.y = initialClamped.y;
    applyTransform();

    // === MOUSE WHEEL ZOOM (Both positive and negative scroll with edge containment) ===
    const handleWheel = (e) => {
      e.preventDefault();

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const currentScale = stateRef.current.scale;
      const currentX = stateRef.current.x;
      const currentY = stateRef.current.y;

      // Exponential zoom step based on wheel delta
      const delta = -e.deltaY * zoomSpeed;
      const factor = Math.exp(delta);
      const nextScale = Math.min(Math.max(currentScale * factor, minScale), maxScale);

      if (nextScale === currentScale) return;

      // Anchor zoom to cursor position: (mouseX, mouseY) stays stationary on screen
      const ratio = nextScale / currentScale;
      const rawNextX = mouseX - (mouseX - currentX) * ratio;
      const rawNextY = mouseY - (mouseY - currentY) * ratio;

      // Strict boundary clamp so borders never show
      const { x: nextX, y: nextY } = clampPosition(rawNextX, rawNextY, nextScale, el, contain);

      stateRef.current.scale = nextScale;
      stateRef.current.x = nextX;
      stateRef.current.y = nextY;

      applyTransform();
    };

    // === POINTER DOWN (Start dragging) ===
    const handlePointerDown = (e) => {
      // Only drag with primary mouse button (left click) or touch
      if (e.button !== 0 && e.pointerType === "mouse") return;

      try {
        el.setPointerCapture(e.pointerId);
      } catch (_) {}

      stateRef.current.isDragging = true;
      stateRef.current.dragStartX = e.clientX;
      stateRef.current.dragStartY = e.clientY;
      stateRef.current.originX = stateRef.current.x;
      stateRef.current.originY = stateRef.current.y;

      el.style.cursor = "grabbing";
    };

    // === POINTER MOVE (Translate in direction of drag with edge clamping) ===
    const handlePointerMove = (e) => {
      if (!stateRef.current.isDragging) return;

      const deltaX = e.clientX - stateRef.current.dragStartX;
      const deltaY = e.clientY - stateRef.current.dragStartY;

      const rawX = stateRef.current.originX + deltaX;
      const rawY = stateRef.current.originY + deltaY;

      // Strict boundary clamp so user can't pull image past screen edges
      const { x: nextX, y: nextY } = clampPosition(rawX, rawY, stateRef.current.scale, el, contain);

      stateRef.current.x = nextX;
      stateRef.current.y = nextY;

      applyTransform();
    };

    // === POINTER UP / CANCEL (Stop dragging) ===
    const handlePointerUp = (e) => {
      if (!stateRef.current.isDragging) return;
      stateRef.current.isDragging = false;

      try {
        if (el.hasPointerCapture(e.pointerId)) {
          el.releasePointerCapture(e.pointerId);
        }
      } catch (_) {}

      el.style.cursor = "grab";
    };

    // === DOUBLE CLICK (Smooth reset to default) ===
    const handleDblClick = () => {
      if (resetOnDoubleClick) {
        reset();
      }
    };

    // === WINDOW RESIZE (Re-clamp so image stays bounded) ===
    const handleResize = () => {
      const { x, y, scale } = stateRef.current;
      const clamped = clampPosition(x, y, scale, el, contain);
      stateRef.current.x = clamped.x;
      stateRef.current.y = clamped.y;
      applyTransform();
    };

    // Attach listeners
    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("pointerdown", handlePointerDown);
    el.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointerup", handlePointerUp);
    el.addEventListener("pointercancel", handlePointerUp);
    if (resetOnDoubleClick) {
      el.addEventListener("dblclick", handleDblClick);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("pointerdown", handlePointerDown);
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerup", handlePointerUp);
      el.removeEventListener("pointercancel", handlePointerUp);
      if (resetOnDoubleClick) {
        el.removeEventListener("dblclick", handleDblClick);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [
    minScale,
    maxScale,
    initialScale,
    initialX,
    initialY,
    zoomSpeed,
    contain,
    resetOnDoubleClick,
    applyTransform,
    reset,
  ]);

  return {
    ref: elementRef,
    reset,
    setTransform,
  };
}

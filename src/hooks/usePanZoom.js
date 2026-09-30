import { useRef, useEffect, useCallback } from "react";

/**
 * Clamps (x, y) so that the zoomed element always covers the container/viewport
 * without exposing empty edges when contain is true.
 */
function clampPosition(x, y, scale, el, contain = true) {
  if (!el || !contain) return { x, y };

  const cw = el.parentElement?.clientWidth || window.innerWidth;
  const ch = el.parentElement?.clientHeight || window.innerHeight;
  const sw = cw * scale;
  const sh = ch * scale;

  const clampAxis = (pos, containerSize, scaledSize) => {
    if (scaledSize >= containerSize) {
      return Math.min(Math.max(pos, containerSize - scaledSize), 0);
    }
    return (containerSize - scaledSize) / 2;
  };

  return {
    x: clampAxis(x, cw, sw),
    y: clampAxis(y, ch, sh),
  };
}

export default function usePanZoom({
  minScale = 1,
  maxScale = 10,
  initialScale = 1,
  initialX = 0,
  initialY = 0,
  zoomSpeed = 0.0018,
  contain = true,
  resetOnDoubleClick = true,
} = {}) {
  const elementRef = useRef(null);

  const state = useRef({
    scale: initialScale,
    x: initialX,
    y: initialY,
    isDragging: false,
    startX: 0,
    startY: 0,
    originX: initialX,
    originY: initialY,
  });

  // Track active touch pointers for multi-touch pinch-to-zoom
  const activePointers = useRef(new Map());
  const pinchData = useRef({
    startDistance: 0,
    startScale: initialScale,
    midX: 0,
    midY: 0,
    originX: 0,
    originY: 0,
  });

  const lastTapRef = useRef(0);

  const applyTransform = useCallback(() => {
    if (elementRef.current) {
      const { x, y, scale } = state.current;
      elementRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px) scale(${scale})`;
    }
  }, []);

  const reset = useCallback(() => {
    const el = elementRef.current;
    if (el) {
      el.style.transition = "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)";
      setTimeout(() => {
        if (elementRef.current) elementRef.current.style.transition = "";
      }, 350);
    }
    state.current.scale = initialScale;
    state.current.x = initialX;
    state.current.y = initialY;
    state.current.isDragging = false;
    applyTransform();
  }, [initialScale, initialX, initialY, applyTransform]);

  const setTransform = useCallback(
    (newX, newY, newScale) => {
      const el = elementRef.current;
      const nextScale = Math.min(Math.max(newScale, minScale), maxScale);
      const { x, y } = clampPosition(newX, newY, nextScale, el, contain);
      state.current.scale = nextScale;
      state.current.x = x;
      state.current.y = y;
      applyTransform();
    },
    [minScale, maxScale, contain, applyTransform]
  );

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    el.style.transformOrigin = "0 0";
    el.style.willChange = "transform";
    el.style.touchAction = "none";
    el.style.userSelect = "none";
    el.style.webkitUserSelect = "none";
    el.style.cursor = "grab";

    const initial = clampPosition(initialX, initialY, initialScale, el, contain);
    state.current.x = initial.x;
    state.current.y = initial.y;
    applyTransform();

    // Prevent default browser image dragging
    const onDragStart = (e) => e.preventDefault();
    el.addEventListener("dragstart", onDragStart);

    // ================= MOUSE WHEEL ZOOM =================
    const onWheel = (e) => {
      e.preventDefault();
      const current = state.current;
      const factor = Math.exp(-e.deltaY * zoomSpeed);
      const nextScale = Math.min(Math.max(current.scale * factor, minScale), maxScale);
      if (nextScale === current.scale) return;

      const ratio = nextScale / current.scale;
      const rawX = e.clientX - (e.clientX - current.x) * ratio;
      const rawY = e.clientY - (e.clientY - current.y) * ratio;

      const clamped = clampPosition(rawX, rawY, nextScale, el, contain);
      current.scale = nextScale;
      current.x = clamped.x;
      current.y = clamped.y;
      applyTransform();
    };

    // ================= POINTER DOWN =================
    const onPointerDown = (e) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;

      // Handle double-tap on mobile/touch
      if (e.pointerType === "touch" && resetOnDoubleClick) {
        const now = Date.now();
        if (now - lastTapRef.current < 300) {
          reset();
          lastTapRef.current = 0;
          return;
        }
        lastTapRef.current = now;
      }

      try {
        el.setPointerCapture(e.pointerId);
      } catch (_) {}

      activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (activePointers.current.size === 1) {
        // Start single-pointer drag
        state.current.isDragging = true;
        state.current.startX = e.clientX;
        state.current.startY = e.clientY;
        state.current.originX = state.current.x;
        state.current.originY = state.current.y;
        el.style.cursor = "grabbing";
      } else if (activePointers.current.size === 2) {
        // Start 2-finger pinch
        const points = Array.from(activePointers.current.values());
        const dist = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
        pinchData.current = {
          startDistance: dist || 1,
          startScale: state.current.scale,
          midX: (points[0].x + points[1].x) / 2,
          midY: (points[0].y + points[1].y) / 2,
          originX: state.current.x,
          originY: state.current.y,
        };
      }
    };

    // ================= POINTER MOVE =================
    const onPointerMove = (e) => {
      if (!activePointers.current.has(e.pointerId)) return;
      activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (activePointers.current.size === 1 && state.current.isDragging) {
        // 1-pointer pan
        const deltaX = e.clientX - state.current.startX;
        const deltaY = e.clientY - state.current.startY;
        const rawX = state.current.originX + deltaX;
        const rawY = state.current.originY + deltaY;

        const clamped = clampPosition(rawX, rawY, state.current.scale, el, contain);
        state.current.x = clamped.x;
        state.current.y = clamped.y;
        applyTransform();
      } else if (activePointers.current.size >= 2) {
        // 2-finger pinch zoom
        const points = Array.from(activePointers.current.values());
        const currentDist = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
        const { startDistance, startScale, midX, midY, originX, originY } = pinchData.current;

        const scaleFactor = currentDist / (startDistance || 1);
        const nextScale = Math.min(Math.max(startScale * scaleFactor, minScale), maxScale);

        const ratio = nextScale / (startScale || 1);
        const rawX = midX - (midX - originX) * ratio;
        const rawY = midY - (midY - originY) * ratio;

        const clamped = clampPosition(rawX, rawY, nextScale, el, contain);
        state.current.scale = nextScale;
        state.current.x = clamped.x;
        state.current.y = clamped.y;
        applyTransform();
      }
    };

    // ================= POINTER UP / CANCEL =================
    const onPointerUp = (e) => {
      activePointers.current.delete(e.pointerId);
      try {
        if (el.hasPointerCapture(e.pointerId)) {
          el.releasePointerCapture(e.pointerId);
        }
      } catch (_) {}

      if (activePointers.current.size === 1) {
        // Switch back smoothly to single pointer drag
        const remaining = Array.from(activePointers.current.values())[0];
        state.current.startX = remaining.x;
        state.current.startY = remaining.y;
        state.current.originX = state.current.x;
        state.current.originY = state.current.y;
      } else if (activePointers.current.size === 0) {
        state.current.isDragging = false;
        el.style.cursor = "grab";
      }
    };

    // ================= DOUBLE CLICK (Desktop) =================
    const onDoubleClick = () => {
      if (resetOnDoubleClick) reset();
    };

    // ================= WINDOW RESIZE =================
    const onResize = () => {
      const clamped = clampPosition(
        state.current.x,
        state.current.y,
        state.current.scale,
        el,
        contain
      );
      state.current.x = clamped.x;
      state.current.y = clamped.y;
      applyTransform();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    if (resetOnDoubleClick) el.addEventListener("dblclick", onDoubleClick);
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("dragstart", onDragStart);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      if (resetOnDoubleClick) el.removeEventListener("dblclick", onDoubleClick);
      window.removeEventListener("resize", onResize);
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

  return { ref: elementRef, reset, setTransform };
}

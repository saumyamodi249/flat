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
    el.style.webkitTouchCallout = "none";
    el.style.userSelect = "none";
    el.style.webkitUserSelect = "none";
    el.style.cursor = "grab";

    const initial = clampPosition(initialX, initialY, initialScale, el, contain);
    state.current.x = initial.x;
    state.current.y = initial.y;
    applyTransform();

    // Prevent default browser drag on image
    const onDragStart = (e) => e.preventDefault();
    el.addEventListener("dragstart", onDragStart);

    // ================= REAL MOBILE & TABLET TOUCH HANDLERS =================
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        // Handle double-tap to reset on touch devices
        if (resetOnDoubleClick) {
          const now = Date.now();
          if (now - lastTapRef.current < 300) {
            reset();
            lastTapRef.current = 0;
            return;
          }
          lastTapRef.current = now;
        }

        // Start 1-finger pan
        state.current.isDragging = true;
        state.current.startX = e.touches[0].clientX;
        state.current.startY = e.touches[0].clientY;
        state.current.originX = state.current.x;
        state.current.originY = state.current.y;
      } else if (e.touches.length === 2) {
        // Start 2-finger pinch
        state.current.isDragging = false;
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        const dist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);

        pinchData.current = {
          startDistance: dist || 1,
          startScale: state.current.scale,
          midX: (t0.clientX + t1.clientX) / 2,
          midY: (t0.clientY + t1.clientY) / 2,
          originX: state.current.x,
          originY: state.current.y,
        };
      }
    };

    const onTouchMove = (e) => {
      // Crucial: prevent native browser pinch/zoom/scroll
      if (e.cancelable) {
        e.preventDefault();
      }

      if (e.touches.length === 1 && state.current.isDragging) {
        // 1-finger pan
        const deltaX = e.touches[0].clientX - state.current.startX;
        const deltaY = e.touches[0].clientY - state.current.startY;
        const rawX = state.current.originX + deltaX;
        const rawY = state.current.originY + deltaY;

        const clamped = clampPosition(rawX, rawY, state.current.scale, el, contain);
        state.current.x = clamped.x;
        state.current.y = clamped.y;
        applyTransform();
      } else if (e.touches.length >= 2) {
        // 2-finger pinch zoom
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        const currentDist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
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

    const onTouchEnd = (e) => {
      if (e.touches.length === 1) {
        // Switch back smoothly to single-finger drag without sudden jumping
        state.current.isDragging = true;
        state.current.startX = e.touches[0].clientX;
        state.current.startY = e.touches[0].clientY;
        state.current.originX = state.current.x;
        state.current.originY = state.current.y;
      } else if (e.touches.length === 0) {
        state.current.isDragging = false;
      }
    };

    // Prevent iOS Safari gesture events from hijacking pinch-to-zoom
    const onGesturePrevent = (e) => {
      if (e.cancelable) e.preventDefault();
    };

    // ================= MOUSE WHEEL ZOOM (Desktop & Laptop) =================
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

    // ================= MOUSE DRAG HANDLERS (Desktop) =================
    const onMouseDown = (e) => {
      if (e.button !== 0) return; // Left click only
      state.current.isDragging = true;
      state.current.startX = e.clientX;
      state.current.startY = e.clientY;
      state.current.originX = state.current.x;
      state.current.originY = state.current.y;
      el.style.cursor = "grabbing";

      const onMouseMove = (moveEvt) => {
        if (!state.current.isDragging) return;
        const deltaX = moveEvt.clientX - state.current.startX;
        const deltaY = moveEvt.clientY - state.current.startY;
        const rawX = state.current.originX + deltaX;
        const rawY = state.current.originY + deltaY;

        const clamped = clampPosition(rawX, rawY, state.current.scale, el, contain);
        state.current.x = clamped.x;
        state.current.y = clamped.y;
        applyTransform();
      };

      const onMouseUp = () => {
        state.current.isDragging = false;
        if (elementRef.current) elementRef.current.style.cursor = "grab";
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
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

    // Attach native touch listeners with passive: false for reliable multi-touch pinch on iOS & Android
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: false });
    el.addEventListener("touchcancel", onTouchEnd, { passive: false });

    // iOS Safari gesture prevention
    el.addEventListener("gesturestart", onGesturePrevent, { passive: false });
    el.addEventListener("gesturechange", onGesturePrevent, { passive: false });
    el.addEventListener("gestureend", onGesturePrevent, { passive: false });

    // Desktop mouse events
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("mousedown", onMouseDown);
    if (resetOnDoubleClick) el.addEventListener("dblclick", onDoubleClick);
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("dragstart", onDragStart);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("gesturestart", onGesturePrevent);
      el.removeEventListener("gesturechange", onGesturePrevent);
      el.removeEventListener("gestureend", onGesturePrevent);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mousedown", onMouseDown);
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

import { useRef, useEffect, useCallback } from "react";

function clampPosition(x, y, scale, el, contain = true) {
  if (!el || !contain) return { x, y };

  const cw = el.parentElement?.clientWidth || window.innerWidth;
  const ch = el.parentElement?.clientHeight || window.innerHeight;
  const sw = cw * scale;
  const sh = ch * scale;

  const clampAxis = (pos, containerSize, scaledSize) =>
    scaledSize >= containerSize
      ? Math.min(Math.max(pos, containerSize - scaledSize), 0)
      : (containerSize - scaledSize) / 2;

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
    currentX: initialX,
    currentY: initialY,
  });

  const applyTransform = useCallback(() => {
    if (elementRef.current) {
      const { x, y, scale } = state.current;
      elementRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px) scale(${scale})`;
    }
  }, []);

  const reset = useCallback(() => {
    const el = elementRef.current;
    if (el) {
      el.style.transition = "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)";
      setTimeout(() => {
        if (elementRef.current) elementRef.current.style.transition = "";
      }, 300);
    }
    state.current.scale = initialScale;
    state.current.x = initialX;
    state.current.y = initialY;
    state.current.isDragging = false;
    applyTransform();
  }, [initialScale, initialX, initialY, applyTransform]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    el.style.transformOrigin = "0 0";
    el.style.willChange = "transform";
    el.style.touchAction = "none";
    el.style.cursor = "grab";

    const initial = clampPosition(initialX, initialY, initialScale, el, contain);
    state.current.x = initial.x;
    state.current.y = initial.y;
    applyTransform();

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

    const onPointerDown = (e) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      try {
        el.setPointerCapture(e.pointerId);
      } catch (_) {}

      state.current.isDragging = true;
      state.current.startX = e.clientX;
      state.current.startY = e.clientY;
      state.current.currentX = state.current.x;
      state.current.currentY = state.current.y;
      el.style.cursor = "grabbing";
    };

    const onPointerMove = (e) => {
      if (!state.current.isDragging) return;
      const rawX = state.current.currentX + (e.clientX - state.current.startX);
      const rawY = state.current.currentY + (e.clientY - state.current.startY);
      const clamped = clampPosition(rawX, rawY, state.current.scale, el, contain);

      state.current.x = clamped.x;
      state.current.y = clamped.y;
      applyTransform();
    };

    const onPointerUp = (e) => {
      if (!state.current.isDragging) return;
      state.current.isDragging = false;
      try {
        if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      } catch (_) {}
      el.style.cursor = "grab";
    };

    const onResize = () => {
      const clamped = clampPosition(state.current.x, state.current.y, state.current.scale, el, contain);
      state.current.x = clamped.x;
      state.current.y = clamped.y;
      applyTransform();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    if (resetOnDoubleClick) el.addEventListener("dblclick", reset);
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      if (resetOnDoubleClick) el.removeEventListener("dblclick", reset);
      window.removeEventListener("resize", onResize);
    };
  }, [minScale, maxScale, initialScale, initialX, initialY, zoomSpeed, contain, resetOnDoubleClick, applyTransform, reset]);

  return { ref: elementRef, reset };
}

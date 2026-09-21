import { useState, useEffect, useRef, useCallback } from 'react';
import { getCardinal, normalizeAngle, shortestAngleDiff } from '../api/compass/compassApi';

/**
 * Hook for smooth, jitter-free compass heading across iOS, Android, and Desktop.
 * - iOS: handles DeviceOrientationEvent.requestPermission
 * - Android: uses deviceorientationabsolute, computes 360 - alpha
 * - Desktop: 1200ms timeout switches to fallback draggable north-up mode
 * - Smoothing: Lerp along shortest angular path via requestAnimationFrame
 */
export function useCompassHeading() {
  const [heading, setHeading] = useState(0);
  const [cardinal, setCardinal] = useState('N');
  const [isFallback, setIsFallback] = useState(false);
  const [needsPermission, setNeedsPermission] = useState(false);

  // References for smoothing without react render lag
  const targetHeadingRef = useRef(0);
  const currentHeadingRef = useRef(0);
  const isFallbackRef = useRef(false);
  const rafIdRef = useRef(null);
  const hasReceivedEventRef = useRef(false);
  const dialElementRef = useRef(null);

  // Check iOS permission requirement on mount
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof window.DeviceOrientationEvent !== 'undefined' &&
      typeof window.DeviceOrientationEvent.requestPermission === 'function'
    ) {
      setNeedsPermission(true);
    }
  }, []);

  // Drag callback for desktop fallback
  const setManualHeading = useCallback((angle) => {
    const normalized = normalizeAngle(angle);
    targetHeadingRef.current = normalized;
    currentHeadingRef.current = normalized;
    setHeading(Math.round(normalized));
    setCardinal(getCardinal(normalized));
    if (dialElementRef.current) {
      dialElementRef.current.style.transform = `rotate(${-normalized}deg)`;
    }
  }, []);

  // User gesture handler for iOS permission
  const requestPermission = useCallback(async () => {
    if (
      typeof window !== 'undefined' &&
      typeof window.DeviceOrientationEvent !== 'undefined' &&
      typeof window.DeviceOrientationEvent.requestPermission === 'function'
    ) {
      try {
        const response = await window.DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          setNeedsPermission(false);
        } else {
          setIsFallback(true);
          isFallbackRef.current = true;
          setNeedsPermission(false);
        }
      } catch (err) {
        console.warn('iOS orientation permission error:', err);
        setIsFallback(true);
        isFallbackRef.current = true;
        setNeedsPermission(false);
      }
    }
  }, []);

  useEffect(() => {
    if (needsPermission) {
      return;
    }

    let isMounted = true;
    hasReceivedEventRef.current = false;

    // Timeout detector: if no orientation events fire within 1200ms, switch to desktop fallback
    const timeoutId = setTimeout(() => {
      if (!hasReceivedEventRef.current && isMounted) {
        setIsFallback(true);
        isFallbackRef.current = true;
      }
    }, 1200);

    const handleOrientation = (e) => {
      let rawHeading = null;

      // 1. iOS: webkitCompassHeading is true north clockwise
      if (typeof e.webkitCompassHeading !== 'undefined' && e.webkitCompassHeading !== null) {
        rawHeading = e.webkitCompassHeading;
      }
      // 2. Android absolute orientation
      else if (typeof e.alpha === 'number' && e.alpha !== null) {
        // alpha increases counter-clockwise, heading is clockwise from North
        rawHeading = (360 - e.alpha) % 360;
      }

      if (rawHeading !== null && !isNaN(rawHeading)) {
        hasReceivedEventRef.current = true;
        if (isFallbackRef.current) {
          isFallbackRef.current = false;
          setIsFallback(false);
        }
        targetHeadingRef.current = normalizeAngle(rawHeading);
      }
    };

    // Prefer deviceorientationabsolute on Chrome / Android
    let supportsAbsolute = false;
    if ('ondeviceorientationabsolute' in window) {
      supportsAbsolute = true;
      window.addEventListener('deviceorientationabsolute', handleOrientation, true);
    }
    window.addEventListener('deviceorientation', handleOrientation, true);

    // Animation loop for smooth lerping
    let lastRenderedHeading = -1;

    const animate = () => {
      if (!isMounted) return;

      if (!isFallbackRef.current) {
        const current = currentHeadingRef.current;
        const target = targetHeadingRef.current;
        const diff = shortestAngleDiff(target, current);

        // Lerp step
        if (Math.abs(diff) > 0.05) {
          const next = normalizeAngle(current + diff * 0.15);
          currentHeadingRef.current = next;

          if (dialElementRef.current) {
            dialElementRef.current.style.transform = `rotate(${-next}deg)`;
          }

          const rounded = Math.round(next);
          if (rounded !== lastRenderedHeading) {
            lastRenderedHeading = rounded;
            setHeading(rounded);
            setCardinal(getCardinal(rounded));
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (supportsAbsolute) {
        window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
      }
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [needsPermission]);

  return {
    heading,
    cardinal,
    isFallback,
    needsPermission,
    requestPermission,
    setManualHeading,
    dialRef: dialElementRef,
  };
}

export default useCompassHeading;

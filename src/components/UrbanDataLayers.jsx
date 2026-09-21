import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchLayer } from '../api/UrbanDataLayers/urbanData';

const LAYERS = [
  {
    id: 'roads',
    label: 'Roads',
    imgSrc: '/urbandatalayer/road.svg',
  },
  {
    id: 'parks',
    label: 'Parks',
    imgSrc: '/urbandatalayer/tree.svg',
  },
  {
    id: 'education',
    label: 'Education',
    imgSrc: '/urbandatalayer/Education.svg',
  },
  {
    id: 'food',
    label: 'Fun & Food',
    imgSrc: '/urbandatalayer/food.svg',
  },
];

/**
 * UrbanDataLayers Component
 * - Default state: all tiles 50% transparent
 * - Selected state: 80% transparent
 * - No loading overlay effect on icons
 */
function UrbanDataLayers({
  lat = 23.0225,
  lon = 72.5714,
  className = '',
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Default to null so on open everything starts at 50%
  const [activeLayer, setActiveLayer] = useState(null);
  const [cache, setCache] = useState({});

  const abortControllersRef = useRef({});
  const debounceTimerRef = useRef(null);

  const roundedLat = Number(lat).toFixed(3);
  const roundedLon = Number(lon).toFixed(3);

  const loadLayer = useCallback(
    async (layerKey, force = false) => {
      if (!layerKey) return;
      const cacheKey = `${layerKey}:${roundedLat},${roundedLon}`;

      if (!force && cache[cacheKey]) {
        return;
      }

      if (abortControllersRef.current[layerKey]) {
        abortControllersRef.current[layerKey].abort();
      }
      const controller = new AbortController();
      abortControllersRef.current[layerKey] = controller;

      try {
        const results = await fetchLayer(layerKey, lat, lon, 2000, controller.signal);
        setCache((prev) => ({ ...prev, [cacheKey]: results }));
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn(`Layer ${layerKey} error:`, err);
        }
      }
    },
    [lat, lon, roundedLat, roundedLon, cache]
  );

  const handleToggleLayer = (layerKey) => {
    if (activeLayer === layerKey) {
      if (abortControllersRef.current[layerKey]) {
        abortControllersRef.current[layerKey].abort();
      }
      setActiveLayer(null);
    } else {
      if (activeLayer && abortControllersRef.current[activeLayer]) {
        abortControllersRef.current[activeLayer].abort();
      }
      setActiveLayer(layerKey);
      loadLayer(layerKey);
    }
  };

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (activeLayer) {
        loadLayer(activeLayer);
      }
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [lat, lon, activeLayer, loadLayer]);

  useEffect(() => {
    return () => {
      Object.values(abortControllersRef.current).forEach((ctrl) => ctrl.abort());
    };
  }, []);

  return (
    <div
      className={`rounded-[10px] bg-[var(--theme-blur-layer)]/50 backdrop-blur-md text-white shadow-2xl shadow-teal-950/50 select-none w-full sm:w-[310px] md:w-[330px] overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Header: "Urban Data Layers" with collapse chevron */}
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-between px-5 pt-4 pb-3 cursor-pointer"
      >
        <h2 className="text-[15px] sm:text-base font-semibold tracking-normal text-white">
          Urban Data Layers
        </h2>
        <button
          type="button"
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? 'Expand layers' : 'Collapse layers'}
          className="text-white hover:text-white/80 transition-transform p-1 cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : 'rotate-0'
              }`}
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </div>

      {/* Thin horizontal divider line */}
      <div className="mx-5 h-[1px] bg-white/20" />

      {/* Body: 2x2 Grid */}
      {!isCollapsed && (
        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-4 sm:gap-3.5">
            {LAYERS.map((layer) => {
              const isActive = activeLayer === layer.id;

              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => handleToggleLayer(layer.id)}
                  aria-pressed={isActive}
                  className={`group relative flex flex-col items-center justify-center p-[10px] rounded-2xl transition-all duration-200 cursor-pointer min-h-[98px] focus:outline-none ${isActive
                    ? 'bg-[var(--theme-blur-layer)]/80 text-white scale-[1.02] shadow-inner'
                    : 'bg-[var(--theme-blur-layer)]/50 hover:bg-[var(--theme-blur-layer)]/65 text-white/90'
                    }`}
                >
                  {/* Label on Top */}
                  <span className="text-[13px] font-semibold tracking-tight text-center text-white mb-2">
                    {layer.label}
                  </span>

                  {/* Clean Custom Image (no loading spinner overlay) */}
                  <div className="relative flex items-center justify-center h-8">
                    <img
                      src={layer.imgSrc}
                      alt={layer.label}
                      className="h-7 sm:h-8 w-auto max-w-[36px] object-contain select-none transition-transform group-hover:scale-105"
                      onError={(e) => {
                        if (!e.currentTarget.src.includes('UrbanDataLayers')) {
                          e.currentTarget.src = layer.imgSrc.replace(
                            '/urbandatalayer/',
                            '/UrbanDataLayers/'
                          );
                        }
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default UrbanDataLayers;

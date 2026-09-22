import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchLayer } from '../../api/UrbanDataLayers/urbanData';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

const LAYERS = [
  {
    id: 'roads',
    label: 'Roads',
    imgSrc: '/UrbanDataLayers/road.svg',
  },
  {
    id: 'parks',
    label: 'Parks',
    imgSrc: '/UrbanDataLayers/tree.svg',
  },
  {
    id: 'education',
    label: 'Education',
    imgSrc: '/UrbanDataLayers/Education.svg',
  },
  {
    id: 'food',
    label: 'Fun & Food',
    imgSrc: '/UrbanDataLayers/food.svg',
  },
];

/**
 * UrbanDataLayers Component
 * - Default state: tiles are transparent (no box)
 * - Hover state: box appears with 50% transparency
 * - Selected state: box appears with 50% transparency (#004443) and translate lift
 */
function UrbanDataLayers({
  lat = 23.0225,
  lon = 72.5714,
  className = '',
  activeLayer: controlledActiveLayer,
  onLayerChange,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [internalActiveLayer, setInternalActiveLayer] = useState(null);

  const isControlled = controlledActiveLayer !== undefined;
  const activeLayer = isControlled ? controlledActiveLayer : internalActiveLayer;

  const handleActiveLayerUpdate = (nextLayer) => {
    if (!isControlled) {
      setInternalActiveLayer(nextLayer);
    }
    if (onLayerChange) {
      onLayerChange(nextLayer);
    }
  };

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
      handleActiveLayerUpdate(null);
    } else {
      if (activeLayer && abortControllersRef.current[activeLayer]) {
        abortControllersRef.current[activeLayer].abort();
      }
      handleActiveLayerUpdate(layerKey);
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
        className="flex items-center justify-between p-4 cursor-pointer"
      >
        <h2 className="text-[15px] sm:text-base font-semibold tracking-normal text-white pr-12.5">
          Urban Data Layers
        </h2>
        <button
          type="button"
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? 'Expand layers' : 'Collapse layers'}
          className="text-white hover:text-white/80 transition-transform px-[6px] py-[9px] cursor-pointer flex items-center justify-center"
        >
          {isCollapsed ? (
            <IoChevronDownOutline className="w-6 h-6 text-white" />
          ) : (
            <IoChevronUpOutline className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Thin horizontal divider line (only visible when expanded) */}
      {!isCollapsed && (
        <div className="mx-4 border-t border-[var(--theme-UrbanDataLayers-border)] opacity-20" />
      )}

      {/* Body: 2x2 Grid */}
      {!isCollapsed && (
        <div className="px-4 pb-4 pt-3">
          <div className="grid grid-cols-2 gap-4 sm:gap-3.5">
            {LAYERS.map((layer) => {
              const isActive = activeLayer === layer.id;

              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => handleToggleLayer(layer.id)}
                  aria-pressed={isActive}
                  className={`group relative flex flex-col items-center justify-center p-[10px] rounded-2xl transition-all duration-300 ease-out cursor-pointer min-h-[98px] focus:outline-none ${isActive
                    ? 'bg-[var(--theme-blur-layer)]/80 text-white shadow-lg shadow-black/20 border border-transparent'
                    : 'bg-transparent hover:bg-[var(--theme-blur-layer)]/40 text-white/80 hover:text-white border border-transparent'
                    }`}
                >
                  {/* Label on Top */}
                  <span className="text-sm font-semibold tracking-tight text-center text-white mb-2.5">
                    {layer.label}
                  </span>

                  {/* Clean Custom Image */}
                  <div className="relative flex items-center justify-center h-8">
                    <img
                      src={layer.imgSrc}
                      alt={layer.label}
                      className={`h-7 sm:h-8 w-auto max-w-[36px] object-contain select-none transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-105'
                        }`}
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

import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchLayer } from '../../api/UrbanDataLayers/urbanData';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { LAYERS } from '../data';

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
    const controllers = abortControllersRef.current;
    return () => {
      Object.values(controllers).forEach((ctrl) => ctrl.abort());
    };
  }, []);

  return (
    <div
      className={`rounded-[10px] bg-[var(--theme-blur-layer)]/50 backdrop-blur-md text-white shadow-2xl shadow-teal-950/50 select-none w-full sm:w-[200px] md:w-[215px] lg:w-82.5 overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Header: "Urban Data Layers" with collapse chevron */}
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-between p-2.5 sm:p-2.5 md:p-3 lg:p-4 cursor-pointer"
      >
        <h2 className="text-xs sm:text-[12.5px] md:text-[13px] lg:text-base font-semibold tracking-normal text-white pr-2 sm:pr-3 lg:pr-12.5">
          Urban Data Layers
        </h2>
        <button
          type="button"
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? 'Expand layers' : 'Collapse layers'}
          className="text-white hover:text-white/80 transition-transform px-1 py-1 cursor-pointer flex items-center justify-center"
        >
          {isCollapsed ? (
            <IoChevronDownOutline className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-6 lg:h-6 text-white" />
          ) : (
            <IoChevronUpOutline className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-6 lg:h-6 text-white" />
          )}
        </button>
      </div>

      {/* Thin horizontal divider line (only visible when expanded) */}
      {!isCollapsed && (
        <div className="mx-2.5 sm:mx-2.5 md:mx-3 lg:mx-4 border-t border-[var(--theme-UrbanDataLayers-border)] opacity-20" />
      )}

      {/* Body: 2x2 Grid */}
      {!isCollapsed && (
        <div className="px-2 pb-2.5 pt-1.5 sm:px-2.5 sm:pb-2.5 sm:pt-2 md:px-3 md:pb-3 md:pt-2.5 lg:px-4 lg:pb-4 lg:pt-3">
          <div className="grid grid-cols-2 gap-2 sm:gap-2 md:gap-2.5 lg:gap-3.5">
            {LAYERS.map((layer) => {
              const isActive = activeLayer === layer.id;

              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => handleToggleLayer(layer.id)}
                  aria-pressed={isActive}
                  className={`group relative flex flex-col items-center justify-center p-1.5 sm:p-1.5 md:p-2 lg:p-2.5 rounded-lg md:rounded-xl lg:rounded-2xl transition-all duration-300 ease-out cursor-pointer min-h-[58px] sm:min-h-[60px] md:min-h-[66px] lg:min-h-24.5 focus:outline-none ${isActive
                    ? 'bg-[var(--theme-blur-layer)]/80 text-white shadow-lg shadow-black/20 border border-transparent'
                    : 'bg-transparent hover:bg-[var(--theme-blur-layer)]/80 hover:shadow-lg hover:shadow-black/20 active:bg-[var(--theme-blur-layer)]/80 active:shadow-lg text-white/80 hover:text-white border border-transparent'
                    }`}
                >
                  {/* Label on Top */}
                  <span className="text-[10.5px] sm:text-[11px] md:text-xs lg:text-sm font-semibold tracking-tight text-center text-white mb-1 sm:mb-1 md:mb-1.5 lg:mb-2.5">
                    {layer.label}
                  </span>

                  {/* Clean Custom Image */}
                  <div className="relative flex items-center justify-center h-5 sm:h-5 md:h-5.5 lg:h-8">
                    <img
                      src={layer.imgSrc}
                      alt={layer.label}
                      className={`h-5 sm:h-5 md:h-5.5 lg:h-8 w-auto max-w-[22px] sm:max-w-[22px] md:max-w-[24px] lg:max-w-9 object-contain select-none transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-105'
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

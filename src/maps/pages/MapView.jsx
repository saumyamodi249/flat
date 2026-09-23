import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import MapDetailCard from "../components/MapDetailCard";
import StreetViewModal from "../components/StreetViewModal";
import { mapUI } from "../data";
import {
  fetchNearbyPlaces,
  fetch360StreetView,
  reverseGeocodeLocation,
  loadGoogleMapsSDK,
  loadLeafletSDK,
  BASE_PROPERTY_LOCATION,
  calculateDistanceKm,
  calculateTravelTimes,
} from "../../api/maps/mapsApi";
import { IoAdd, IoRemove } from "react-icons/io5";

function MapView() {
  const { category = "parks" } = useParams();

  // Mode: "road" or "satellite" (default road map)
  const [mapMode, setMapMode] = useState("road");
  const [showStreetView, setShowStreetView] = useState(false);
  const [streetViewData, setStreetViewData] = useState(null);

  const [isMapReady, setIsMapReady] = useState(false);

  // References to preserve map state across renders without recreating/remounting
  const mapDivRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const hasUserInteracted = useRef(false);

  // Fetch real nearby places via mapsApi for the selected route category
  const categoryPlaces = useMemo(() => {
    return fetchNearbyPlaces(category);
  }, [category]);

  // Selected place based on route category (defaults to nearest real place in category)
  const [selectedPlace, setSelectedPlace] = useState(
    () => categoryPlaces[0] || BASE_PROPERTY_LOCATION
  );

  // Initialize Google Maps instance ONCE on mount (Using Clean Google Maps Tile Engine)
  useEffect(() => {
    let isCancelled = false;

    // Load clean, watermark-free Google Maps tiles directly (No API key, No watermarks, No popups)
    loadLeafletSDK()
      .then((L) => {
        if (isCancelled || !mapDivRef.current) return;
        if (mapInstanceRef.current) return;

        const initialLat = BASE_PROPERTY_LOCATION.lat;
        const initialLng = BASE_PROPERTY_LOCATION.lng;

        // 1. Initialize map
        const map = L.map(mapDivRef.current, {
          center: [initialLat, initialLng],
          zoom: 16,
          zoomControl: false,
          attributionControl: false, // 100% hides all watermarks, terms, shortcuts, logos
        });

        // 2. Add real Google Maps tile layers (No watermark, No error popup)
        const roadLayer = L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        });

        const satLayer = L.tileLayer("https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
        });

        roadLayer.addTo(map);

        // 3. Create high-resolution Google-style Red Pin Marker
        const pinHtml = `
          <div style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5)); transform: translate(-50%, -100%); width: 34px; height: 42px;">
            <svg width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 0C7.61 0 0 7.61 0 17C0 29.75 17 42 17 42C17 42 34 29.75 34 17C34 7.61 26.39 0 17 0Z" fill="#EA4335"/>
              <circle cx="17" cy="17" r="6.5" fill="#FFFFFF"/>
            </svg>
          </div>
        `;
        const pinIcon = L.divIcon({
          className: "clean-google-pin",
          html: pinHtml,
          iconSize: [0, 0],
        });

        const marker = L.marker([initialLat, initialLng], { icon: pinIcon }).addTo(map);
        markerRef.current = marker;

        mapInstanceRef.current = {
          leaflet: map,
          roadLayer,
          satLayer,
          setMapTypeId: (mode) => {
            if (mode === "satellite") {
              if (map.hasLayer(roadLayer)) map.removeLayer(roadLayer);
              satLayer.addTo(map);
            } else {
              if (map.hasLayer(satLayer)) map.removeLayer(satLayer);
              roadLayer.addTo(map);
            }
          },
          setZoom: (z) => map.setZoom(z),
          getZoom: () => map.getZoom(),
          panTo: (coords) => {
            if (coords && typeof coords.lat === "number" && typeof coords.lng === "number") {
              map.panTo([coords.lat, coords.lng]);
            } else if (Array.isArray(coords)) {
              map.panTo(coords);
            }
          },
        };

        map.on("dragstart", () => {
          hasUserInteracted.current = true;
        });

        // 4. Handle clicks on the map: ONLY select valid/confirmed Places/POIs
        map.on("click", async (e) => {
          if (!e || !e.latlng) return;

          const clickedLat = e.latlng.lat;
          const clickedLng = e.latlng.lng;

          try {
            const locationData = await reverseGeocodeLocation(clickedLat, clickedLng);
            const genericNames = [
              "selected location",
              "coordinates pin",
              "unnamed road",
              "india",
              "gujarat",
              "ahmedabad",
              "gandhinagar",
              "adalaj",
            ];
            // Only update card and move pin if a valid identifiable place was clicked
            if (locationData && !genericNames.includes(locationData.name.trim().toLowerCase())) {
              hasUserInteracted.current = true;
              setSelectedPlace(locationData);
              marker.setLatLng([clickedLat, clickedLng]);
            }
          } catch (err) {
            console.warn("Could not geocode clicked position:", err);
          }
        });

        setIsMapReady(true);
      })
      .catch((err) => {
        console.warn("Could not load clean Google tiles:", err);
      });

    return () => {
      isCancelled = true;
      if (mapInstanceRef.current?.leaflet) {
        mapInstanceRef.current.leaflet.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // When route category changes:
  // - If user has NOT interacted/panned away, pan to the first place in category.
  // - If user HAS interacted, update card data while preserving user's current map center/zoom.
  useEffect(() => {
    const targetPlace = categoryPlaces[0] || BASE_PROPERTY_LOCATION;
    setSelectedPlace(targetPlace);

    if (mapInstanceRef.current && !hasUserInteracted.current) {
      mapInstanceRef.current.panTo({ lat: targetPlace.lat, lng: targetPlace.lng });
      if (markerRef.current) {
        if (typeof markerRef.current.setLatLng === "function") {
          markerRef.current.setLatLng([targetPlace.lat, targetPlace.lng]);
        } else if (typeof markerRef.current.setPosition === "function") {
          markerRef.current.setPosition({ lat: targetPlace.lat, lng: targetPlace.lng });
        }
      }
    }
  }, [category, categoryPlaces]);

  // Toggle Map / Satellite mode:
  // Only changes mapTypeId on the existing instance. Preserves center, zoom, and location.
  const handleToggleMapMode = () => {
    const nextMode = mapMode === "road" ? "satellite" : "road";
    setMapMode(nextMode);

    if (mapInstanceRef.current?.setMapTypeId) {
      mapInstanceRef.current.setMapTypeId(nextMode);
    }
  };

  // Zoom controls using map instance directly
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      hasUserInteracted.current = true;
      mapInstanceRef.current.setZoom((mapInstanceRef.current.getZoom() || 16) + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      hasUserInteracted.current = true;
      mapInstanceRef.current.setZoom((mapInstanceRef.current.getZoom() || 16) - 1);
    }
  };

  // Open 360° Street View for selected location
  const handleOpen360StreetView = async (place) => {
    try {
      const data = await fetch360StreetView(place);
      setStreetViewData(data);
      setShowStreetView(true);
    } catch (err) {
      console.warn("Could not fetch 360 view:", err);
      setStreetViewData({ placeId: place.id, name: place.name, embedUrl: "" });
      setShowStreetView(true);
    }
  };


  return (
    <div className="relative w-full h-[54vh] sm:h-[62vh] lg:h-[66vh] min-h-[440px] rounded-[10px] overflow-hidden border border-[var(--theme-map-border)]/60 bg-[var(--theme-map-street-view)] shadow-2xl flex flex-col select-none">
      {/* Real Interactive Google Map Container */}
      <div className="relative flex-1 w-full h-full bg-[#081b1a] overflow-hidden">
        <div
          ref={mapDivRef}
          className="w-full h-full z-10"
          style={{
            width: "100%",
            height: "100%",
          }}
        />

        {/* Subtle loading state before first map load */}
        {!isMapReady && (
          <div className="absolute inset-0 bg-[#081b1a] flex flex-col items-center justify-center gap-3 text-[var(--theme-map-text)]/70">
            <div className="w-8 h-8 border-3 border-[var(--theme-map-border)] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-medium tracking-wide">{mapUI.loading}</span>
          </div>
        )}
      </div>

      {/* Floating Place Detail Card (Top-Right) */}
      <div className="absolute top-3.5 right-3.5 z-30 block max-w-[calc(100%-24px)] sm:max-w-none animate-fadeIn pointer-events-auto">
        <MapDetailCard
          place={selectedPlace}
          onOpenStreetView={handleOpen360StreetView}
        />
      </div>

      {/* Bottom-Left: Map / Satellite Mode Toggle (Enlarged with Map.svg and satellite.svg) */}
      <div className="absolute bottom-3.5 left-3.5 z-30 pointer-events-auto">
        <button
          type="button"
          onClick={handleToggleMapMode}
          title={mapMode === "road" ? mapUI.toggleSatellite : mapUI.toggleRoad}
          aria-label={mapMode === "road" ? mapUI.toggleSatellite : mapUI.toggleRoad}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-[16px] border-2 border-white/90 overflow-hidden shadow-2xl relative group cursor-pointer hover:scale-105 active:scale-95 transition-all select-none bg-[#081b1a] flex flex-col justify-end"
        >
          {/* Thumbnail preview image (Shows Satellite thumb when on road, Map thumb when on satellite) */}
          <img
            src={mapMode === "road" ? mapUI.satelliteImg : mapUI.roadImg}
            alt={mapMode === "road" ? mapUI.satelliteAlt : mapUI.roadAlt}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />


        </button>
      </div>

      {/* Zoom In & Out Controls (Bottom-Right) */}
      <div className="absolute bottom-3.5 right-3.5 z-30 flex flex-col bg-[var(--theme-map-bg)]/95 backdrop-blur-md border border-[var(--theme-map-border)]/40 rounded-[8px] overflow-hidden shadow-2xl pointer-events-auto">
        <button
          type="button"
          onClick={handleZoomIn}
          aria-label={mapUI.zoomIn}
          title={mapUI.zoomIn}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[var(--theme-map-text)] hover:text-[var(--theme-route-map-button-title-selected-bg)] hover:bg-[var(--theme-map-border)]/20 active:bg-[var(--theme-map-border)]/30 transition-all cursor-pointer"
        >
          <IoAdd className="w-5 h-5" />
        </button>

        <div className="w-full h-[1px] bg-[var(--theme-map-border)]/30" />

        <button
          type="button"
          onClick={handleZoomOut}
          aria-label={mapUI.zoomOut}
          title={mapUI.zoomOut}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[var(--theme-map-text)] hover:text-[var(--theme-route-map-button-title-selected-bg)] hover:bg-[var(--theme-map-border)]/20 active:bg-[var(--theme-map-border)]/30 transition-all cursor-pointer"
        >
          <IoRemove className="w-5 h-5" />
        </button>
      </div>

      {/* 360° Street View Modal */}
      {showStreetView && (
        <StreetViewModal
          place={selectedPlace}
          streetViewData={streetViewData}
          onClose={() => {
            setShowStreetView(false);
            setStreetViewData(null);
          }}
        />
      )}
    </div>
  );
}

export default MapView;

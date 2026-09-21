// Endpoint: https://overpass-api.de/api/interpreter (Overpass API)
// Rate limit: Max 2 concurrent queries per IP, max 10,000 queries per day
// Attribution: Map and POI data © OpenStreetMap contributors (ODbL)

/**
 * Computes the great-circle distance between two points on the Earth using Haversine formula.
 * @returns {number} distance in meters
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) *
    Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

/**
 * Formats distance in meters to a concise label:
 * under 1000m -> "320 m", above 1000m -> "1.4 km"
 */
export function formatDistance(meters) {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

/**
 * Build Overpass QL filter clauses for given category
 */
function getOverpassFilterClauses(layerKey, radius, lat, lon) {
  switch (layerKey) {
    case 'roads':
      return `way["highway"~"^(motorway|trunk|primary|secondary|tertiary|residential)$"](around:${radius},${lat},${lon});`;
    case 'parks':
      return `nwr["leisure"="park"](around:${radius},${lat},${lon});\n  nwr["landuse"="recreation_ground"](around:${radius},${lat},${lon});`;
    case 'education':
      return `nwr["amenity"~"^(school|college|university|kindergarten|library)$"](around:${radius},${lat},${lon});`;
    case 'food':
      return `nwr["amenity"~"^(restaurant|cafe|fast_food|food_court)$"](around:${radius},${lat},${lon});`;
    default:
      return '';
  }
}

/**
 * Fetches POIs for an urban layer using Overpass API.
 * @param {'roads'|'parks'|'education'|'food'} layerKey
 * @param {number} lat
 * @param {number} lon
 * @param {number} radius in meters (default 2000)
 * @param {AbortSignal} [signal]
 * @returns {Promise<Array<{id: string|number, name: string, category: string, lat: number, lon: number, distanceM: number, distanceLabel: string}>>}
 */
export async function fetchLayer(layerKey, lat, lon, radius = 2000, signal) {
  const filterClauses = getOverpassFilterClauses(layerKey, radius, lat, lon);
  if (!filterClauses) return [];

  const query = `[out:json][timeout:25];
(
  ${filterClauses}
);
out center 30;`;

  // List of public Overpass endpoints to ensure high availability
  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://lz4.overpass-api.de/api/interpreter',
  ];

  let lastError = null;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: 'data=' + encodeURIComponent(query),
        signal,
      });

      if (!response.ok) {
        throw new Error(`Overpass HTTP error ${response.status} from ${endpoint}`);
      }

      const data = await response.json();
      const elements = Array.isArray(data?.elements) ? data.elements : [];

      const parsedItems = [];

      for (const el of elements) {
        const tags = el.tags || {};
        const elementLat = el.lat ?? el.center?.lat;
        const elementLon = el.lon ?? el.center?.lon;

        if (elementLat == null || elementLon == null) {
          continue;
        }

        let name = tags.name;

        // Skip unnamed items for food and education; keep unnamed roads using tags.ref or "Unnamed road"
        if (!name) {
          if (layerKey === 'roads') {
            name = tags.ref || tags['ref:name'] || 'Unnamed road';
          } else if (layerKey === 'parks') {
            name = tags.official_name || tags.alt_name || 'Public Green Space';
          } else {
            continue;
          }
        }

        const distanceM = haversineDistance(lat, lon, elementLat, elementLon);

        parsedItems.push({
          id: el.id || `${layerKey}-${Math.random()}`,
          name: name.trim(),
          category: layerKey,
          lat: elementLat,
          lon: elementLon,
          distanceM,
          distanceLabel: formatDistance(distanceM),
          type: tags.amenity || tags.highway || tags.leisure || layerKey,
        });
      }

      // Sort ascending by distance and return top 10
      parsedItems.sort((a, b) => a.distanceM - b.distanceM);
      return parsedItems.slice(0, 10);
    } catch (err) {
      if (err.name === 'AbortError') {
        throw err;
      }
      lastError = err;
      // Try next endpoint if available
    }
  }

  console.error('All Overpass endpoints failed:', lastError);
  throw lastError || new Error('Overpass network failure');
}

// Endpoint: https://api.open-meteo.com/v1/forecast & https://nominatim.openstreetmap.org/reverse
// Rate limit: Open-Meteo 10,000 req/day; Nominatim 1 req/sec max (requires descriptive User-Agent)
// Attribution: Weather data by Open-Meteo (CC-BY 4.0), Geocoding © OpenStreetMap contributors (ODbL)

/**
 * Maps WMO weather codes to human-readable condition labels and icon keys.
 * 0 Clear, 1-2 Partly Cloudy, 3 Overcast, 45/48 Fog, 51-57 Drizzle,
 * 61-67 Rain, 71-77 Snow, 80-82 Showers, 95-99 Thunderstorm.
 */
export function mapWeatherCode(code) {
  if (code === 0) {
    return { condition: 'Clear', iconKey: 'clear' };
  }
  if (code === 1 || code === 2) {
    return { condition: 'Partly Cloudy', iconKey: 'partly-cloudy' };
  }
  if (code === 3) {
    return { condition: 'Overcast', iconKey: 'overcast' };
  }
  if (code === 45 || code === 48) {
    return { condition: 'Fog', iconKey: 'fog' };
  }
  if (code >= 51 && code <= 57) {
    return { condition: 'Drizzle', iconKey: 'drizzle' };
  }
  if (code >= 61 && code <= 67) {
    return { condition: 'Rain', iconKey: 'rain' };
  }
  if (code >= 71 && code <= 77) {
    return { condition: 'Snow', iconKey: 'snow' };
  }
  if (code >= 80 && code <= 82) {
    return { condition: 'Showers', iconKey: 'showers' };
  }
  if (code >= 95 && code <= 99) {
    return { condition: 'Thunderstorm', iconKey: 'thunderstorm' };
  }
  return { condition: 'Partly Cloudy', iconKey: 'partly-cloudy' };
}

/**
 * Format local time using location's timezone string.
 * Uses Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone }).
 */
export function formatLocalTime(timeZone, date = new Date()) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).format(date);
  } catch {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  }
}

/**
 * Reverse-geocodes coordinates to a human-readable location name via Nominatim.
 */
export async function reverseGeocode(lat, lon, signal) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(
      lat
    )}&lon=${encodeURIComponent(lon)}&zoom=14`;

    const response = await fetch(url, {
      signal,
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Nominatim error: ${response.status}`);
    }

    const data = await response.json();
    const address = data?.address || {};
    const placeName =
      address.suburb ||
      address.city_district ||
      address.city ||
      address.town ||
      address.neighbourhood ||
      address.village ||
      address.county ||
      data?.name ||
      'Ahmedabad';

    return placeName;
  } catch (err) {
    console.warn('reverseGeocode fallback to default city:', err?.message);
    return 'Ahmedabad';
  }
}

/**
 * Fetches current weather from Open-Meteo API.
 * Returns { tempC, condition, iconKey, isDay, localTime, place, timezone }.
 */
export async function getWeather(lat, lon, signal) {
  try {
    const targetLat = typeof lat === 'number' ? lat : 23.0225;
    const targetLon = typeof lon === 'number' ? lon : 72.5714;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${targetLat}&longitude=${targetLon}&current=temperature_2m,weather_code,is_day&timezone=auto`;

    const [weatherRes, placeName] = await Promise.all([
      fetch(url, { signal }),
      reverseGeocode(targetLat, targetLon, signal),
    ]);

    if (!weatherRes.ok) {
      throw new Error(`Open-Meteo error: ${weatherRes.status}`);
    }

    const data = await weatherRes.json();
    const current = data?.current || {};
    const timezone = data?.timezone || 'auto';

    const tempC = Math.round(current.temperature_2m ?? 26);
    const { condition, iconKey } = mapWeatherCode(current.weather_code ?? 0);
    const isDay = current.is_day === 1;
    const localTime = formatLocalTime(timezone);

    return {
      tempC,
      condition,
      iconKey,
      isDay,
      localTime,
      place: placeName,
      timezone,
    };
  } catch (error) {
    console.error('getWeather failed:', error);
    throw error;
  }
}

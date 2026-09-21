import { useState, useEffect, useCallback, useRef } from 'react';
import { reverseGeocode } from '../api/temptimeweather/weather';

const DEFAULT_COORDS = {
  lat: 23.0225,
  lon: 72.5714,
};
const DEFAULT_CITY = 'Ahmedabad';

/**
 * Hook to get user's geolocation with high accuracy and reverse geocode via Nominatim.
 * Falls back to Ahmedabad if permission is denied.
 *
 * @returns {{
 *   coords: { lat: number, lon: number },
 *   city: string,
 *   status: 'idle' | 'loading' | 'ready' | 'denied' | 'error',
 *   error: string | null,
 *   isApproximate: boolean,
 *   retry: () => void
 * }}
 */
export function useGeoLocation() {
  const [status, setStatus] = useState('idle');
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const [city, setCity] = useState(DEFAULT_CITY);
  const [isApproximate, setIsApproximate] = useState(false);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);

  const fetchLocation = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    if (!navigator.geolocation) {
      setStatus('error');
      setError('Geolocation not supported by this browser');
      setIsApproximate(true);
      setCoords(DEFAULT_COORDS);
      setCity(DEFAULT_CITY);
      return;
    }

    setStatus('loading');
    setError(null);

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000,
    };

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const userLat = pos.coords.latitude;
        const userLon = pos.coords.longitude;

        setCoords({ lat: userLat, lon: userLon });
        setIsApproximate(false);

        try {
          const placeName = await reverseGeocode(userLat, userLon, signal);
          if (!signal.aborted) {
            setCity(placeName || 'Current Location');
            setStatus('ready');
          }
        } catch {
          if (!signal.aborted) {
            setCity('Current Location');
            setStatus('ready');
          }
        }
      },
      async (err) => {
        console.warn('Geolocation failed:', err.message);
        setCoords(DEFAULT_COORDS);
        setIsApproximate(true);

        if (err.code === 1) {
          // PERMISSION_DENIED
          setStatus('denied');
          setError('Location permission denied. Showing Ahmedabad.');
        } else {
          setStatus('error');
          setError(err.message || 'Unable to retrieve location');
        }

        try {
          const fallbackCity = await reverseGeocode(
            DEFAULT_COORDS.lat,
            DEFAULT_COORDS.lon,
            signal
          );
          if (!signal.aborted) {
            setCity(fallbackCity || DEFAULT_CITY);
          }
        } catch {
          if (!signal.aborted) {
            setCity(DEFAULT_CITY);
          }
        }
      },
      geoOptions
    );
  }, []);

  useEffect(() => {
    fetchLocation();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchLocation]);

  return {
    coords,
    city,
    status,
    error,
    isApproximate,
    retry: fetchLocation,
  };
}

export default useGeoLocation;

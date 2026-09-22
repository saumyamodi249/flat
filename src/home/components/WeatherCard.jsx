import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getWeather, formatLocalTime } from '../../api/temptimeweather/weather';

/**
 * Sun / Weather icon matching the screenshot:
 * Golden yellow sun with radiating rays.
 */
function WeatherStatusIcon({ iconKey, isDay, className = 'w-6 h-6' }) {
  if (iconKey === 'clear' || isDay) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        {/* Sun center */}
        <circle cx="12" cy="12" r="4.2" fill="#FBBF24" stroke="#F59E0B" strokeWidth="0.8" />
        {/* Rays */}
        <g stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round">
          <line x1="12" y1="2.2" x2="12" y2="4.4" />
          <line x1="12" y1="19.6" x2="12" y2="21.8" />
          <line x1="4.8" y1="4.8" x2="6.4" y2="6.4" />
          <line x1="17.6" y1="17.6" x2="19.2" y2="19.2" />
          <line x1="2.2" y1="12" x2="4.4" y2="12" />
          <line x1="19.6" y1="12" x2="21.8" y2="12" />
          <line x1="4.8" y1="19.2" x2="6.4" y2="17.6" />
          <line x1="17.6" y1="6.4" x2="19.2" y2="4.8" />
        </g>
      </svg>
    );
  }

  // Night / Cloud fallback
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
        fill="#E2E8F0"
        fillOpacity="0.85"
      />
    </svg>
  );
}

/**
 * Solid white clock icon matching screenshot
 */
function ClockIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#FFFFFF" />
      {/* Clock hands cutout */}
      <polyline
        points="12 6.5 12 12 7.5 12"
        stroke="#004443"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Thermometer icon with °C label matching screenshot
 */
function ThermometerIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 28 24" fill="none" className={className}>
      <path
        d="M7 14.5V4.5a2.5 2.5 0 0 1 5 0v10a4 4 0 1 1-5 0z"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="17.5" r="2" fill="#FFFFFF" />
      <line x1="9.5" y1="9" x2="9.5" y2="15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="6" x2="14" y2="6" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="9" x2="14" y2="9" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="12" x2="14" y2="12" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
      <text x="16" y="10" fill="#FFFFFF" fontSize="8" fontWeight="600" fontFamily="sans-serif">
        °C
      </text>
    </svg>
  );
}

/**
 * WeatherCard Component
 * Frosted dark-teal glass pill using var(--theme-blur-layer):
 * [ ☀️ Partly Cloudy | 🕒 5:54PM 🌡️ 31°C ]
 */
function WeatherCard({ lat = 23.0225, lon = 72.5714, isApproximate = false, className = '' }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [displayTime, setDisplayTime] = useState('');

  const weatherRef = useRef(null);
  const abortControllerRef = useRef(null);

  const fetchWeatherData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setLoading(true);
    setHasError(false);

    try {
      const data = await getWeather(lat, lon, signal);
      if (!signal.aborted) {
        setWeather(data);
        weatherRef.current = data;
        setDisplayTime(data.localTime);
        setLoading(false);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.warn('Weather fetch failed:', err);
        setHasError(true);
        setLoading(false);
      }
    }
  }, [lat, lon]);

  useEffect(() => {
    fetchWeatherData();
    const tenMinutesMs = 10 * 60 * 1000;
    const intervalId = setInterval(fetchWeatherData, tenMinutesMs);

    return () => {
      clearInterval(intervalId);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchWeatherData]);

  useEffect(() => {
    const updateTick = () => {
      if (weatherRef.current?.timezone) {
        setDisplayTime(formatLocalTime(weatherRef.current.timezone));
      } else {
        setDisplayTime(formatLocalTime(Intl.DateTimeFormat().resolvedOptions().timeZone));
      }
    };

    updateTick();
    const timerId = setInterval(updateTick, 30000);
    return () => clearInterval(timerId);
  }, [weather?.timezone]);

  const activeData = weather || {
    tempC: 31,
    condition: 'Partly Cloudy',
    iconKey: 'clear',
    isDay: true,
    place: 'Ahmedabad',
  };

  const formattedTime = (displayTime || '5:54 PM').replace(/\s+/g, '');

  return (
    <div
      className={`relative inline-flex items-center gap-4 px-5 py-4 rounded-[10px]  bg-[var(--theme-blur-layer)]/50 backdrop-blur-md text-white shadow-xl shadow-teal-950/40 select-none transition-all ${className}`}
    >
      {/* Left Segment: [Sun Icon + Condition] */}
      <div className="flex items-center gap-2 min-w-0">
        <WeatherStatusIcon
          iconKey={activeData.iconKey}
          isDay={activeData.isDay}
          className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
        />
        <span className="text-md font-medium tracking-wide whitespace-nowrap text-white">
          {activeData.condition}
        </span>
      </div>

      {/* Vertical Divider Line */}
      <div className="h-4 sm:h-5 w-[1px] bg-white/40 shrink-0" />

      {/* Center Segment: [Clock Icon + Time] */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <ClockIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
        <span className="text-md font-medium tracking-tight whitespace-nowrap text-white">
          {formattedTime}
        </span>
      </div>

      {/* Right Segment: [Thermometer Icon + Temp°C] */}
      <div className="flex items-center gap-1 sm:gap-1.5 pl-1 sm:pl-2">
        <ThermometerIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <span className="text-md font-medium whitespace-nowrap text-white">
          {activeData.tempC}°C
        </span>

        {hasError && (
          <button
            onClick={fetchWeatherData}
            className="ml-1 p-0.5 rounded-full hover:bg-white/20 text-amber-300 transition-transform active:rotate-180 cursor-pointer"
            title="Weather update failed. Tap to retry."
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
              <path d="M23 4v6h-6M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default WeatherCard;

import { config } from '../config.js';
import { geocodeCity, getForecast } from './open-meteo.js';
import { describeWeatherCode } from './weather-codes.js';

// TODO (you): create one cache for the whole app, with a time to live of
// config.cacheTtlSeconds.

const cache = new Map();
let hits = 0;
let misses = 0;


// TODO (you): return the weather summary for one city, in the shape shown on
// the assignment page. Check the cache first. On a miss, geocode the city, get
// the forecast, build the summary, store it, and return it with cached: false.
// On a hit, return the stored summary with cached: true.
export async function getCityWeather(city) {
  const normalCity = city.trim().toLowerCase();
  const now = Date.now();


  //check the cache for a valid entry
  if (cache.has(normalCity)) {
    const entry = cache.get(normalCity);


    //check if the cache entry is still valid within the time to live
    if (now - entry.timestamp < config.cacheTtlSeconds * 1000) {
      //cache entry is valid, return the cached summary and increment the hit counter
      hits++;
      return { ...entry.summary, cached: true };
    } else {
      //cache entry is expired remove it from the cache
      cache.delete(normalCity);
    }
}


  //cache miss, increment the miss counter
  misses++;


  const location = await geocodeCity(city);
  const forecast = await getForecast(location.latitude, location.longitude);


  //build the summary object
  const data = {
    location: {
      name: location.name,
      region: location.region,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: forecast.timezone
  },
  current: {
    ...forecast.current,
    description: describeWeatherCode(forecast.current.weather_code)
  },
  daily: forecast.daily,
  fetchedAt: new Date().toISOString(),
  cached: false
  };


  //store the summary in the cache with the current timestamp
  cache.set(normalCity, {
    timestamp: now,
    data
  });


  return data;
}


// TODO (you): return the cache statistics for GET /api/cache/stats.

export function getCacheStats() {
  const now = Date.now();
  let validEntries = 0;
  const ttlMs = config.cacheTtlSeconds * 1000; 

  for (const [key, entry] of cache.entries()) {
    if (now - entry.timestamp < ttlMs) {
      validEntries++;
    } else {
      cache.delete(key);
    }
  }

  return {
    entries: validEntries,
    hits,
    misses,
    ttlSeconds: config.cacheTtlSeconds
  };
}
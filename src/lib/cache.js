// TODO (you): an in-memory cache where each entry expires after a set time.
// It needs a way to get a value (counting a hit or a miss), store a value,
// and report { entries, hits, misses, ttlSeconds }. The exact counting rules
// are on the assignment page. A Map with { value, expiresAt } entries works well.

import { config } from '../config.js';

//establish cache
const cache = new Map();
let hits = 0;
let misses = 0;

export function get(key) {
  const entry = cache.get(key);
  const now = Date.now();

  //if entry does not exist count as a miss
  if (!entry) {
    misses++;
    return null;
  }

  //if entry has expired delete it and count as a miss
  if (now > entry.expiresAt) {
    cache.delete(key);
    misses++;
    return null;
  }

  //otherwise a valid cache hit
  hits++;
  return entry.value;
}

export function set(key, value) {
  const ttlMs = config.cacheTtlSeconds * 1000;
  const expiresAt = Date.now() + ttlMs;
  cache.set(key, { value, expiresAt });
}

export function getCacheStats() {
  const now = Date.now();
  let activeEntries = 0;

  //clean up expired entries and count active ones
  for (const [key, entry] of cache.entries()) {
    if (now > entry.expiresAt) {
      cache.delete(key);
    } else {
      activeEntries++;
    }
  }

  return {
    entries: activeEntries,
    hits,
    misses,
    ttlSeconds: config.cacheTtlSeconds
  };
}
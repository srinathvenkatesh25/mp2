import type { Meal } from '../types/meal'

const CACHE_KEY = 'mp2.meals'
// How long a cached copy counts as "fresh": 24 hours.
const TTL_MS = 24 * 60 * 60 * 1000

interface CacheEntry {
  savedAt: number
  meals: Meal[]
}

// localStorage can throw (private windows, blocked storage) or contain junk,
// so every access is wrapped: a broken cache just behaves like "no cache".
export function readCache(): CacheEntry | null {
  try {
    const text = localStorage.getItem(CACHE_KEY)
    if (!text) return null
    const entry = JSON.parse(text) as CacheEntry
    if (typeof entry.savedAt !== 'number' || !Array.isArray(entry.meals)) return null
    return entry
  } catch {
    return null
  }
}

export function writeCache(meals: Meal[]): void {
  try {
    const entry: CacheEntry = { savedAt: Date.now(), meals }
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  } catch {
    // Ignore: the app works fine without a cache.
  }
}

export function isFresh(entry: CacheEntry): boolean {
  return Date.now() - entry.savedAt < TTL_MS
}

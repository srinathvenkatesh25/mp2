import { useEffect, useState, type ReactNode } from 'react'
import { fetchAllMeals, loadSnapshot } from '../api/mealApi'
import { isFresh, readCache, writeCache } from '../api/mealCache'
import type { Meal } from '../types/meal'
import { MealsContext } from './MealsContext'

// `children` is whatever you nest inside <MealsProvider>...</MealsProvider>.
export function MealsProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false

    async function load() {
      setLoading(true)
      setError(null)
      setNotice(null)

      const cached = readCache()

      // 1. Fresh cache: no network at all.
      // (A Retry click skips this so it really tries the network again.)
      if (cached && isFresh(cached) && attempt === 0) {
        setMeals(cached.meals)
        setLoading(false)
        return
      }

      try {
        // 2. Network.
        const data = await fetchAllMeals()
        if (ignore) return
        writeCache(data)
        setMeals(data)
      } catch {
        if (ignore) return
        if (cached) {
          // 3a. Network failed, but an expired cache is still better than nothing.
          setMeals(cached.meals)
          setNotice('You appear to be offline. Showing recipes saved earlier.')
        } else {
          try {
            // 3b. No cache either: use the bundled real-data snapshot.
            setMeals(await loadSnapshot())
            setNotice('Could not reach TheMealDB. Showing a saved copy of the recipes.')
          } catch {
            setError('Could not load recipes. Check your connection and try again.')
          }
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    load()
    return () => {
      ignore = true
    }
  }, [attempt])

  return (
    <MealsContext.Provider
      value={{ meals, loading, error, notice, retry: () => setAttempt((n) => n + 1) }}
    >
      {children}
    </MealsContext.Provider>
  )
}

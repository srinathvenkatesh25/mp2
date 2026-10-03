import { createContext } from 'react'
import type { Meal } from '../types/meal'

export interface MealsContextValue {
  meals: Meal[]
  loading: boolean
  // Set only when we have nothing at all to show.
  error: string | null
  // Set when we are showing older/offline data instead of fresh data.
  notice: string | null
  retry: () => void
}

// null = "no provider above me", which useMeals() turns into a clear error.
export const MealsContext = createContext<MealsContextValue | null>(null)

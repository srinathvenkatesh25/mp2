import { useContext } from 'react'
import { MealsContext } from '../context/MealsContext'

export function useMeals() {
  const value = useContext(MealsContext)
  if (!value) throw new Error('useMeals must be used inside <MealsProvider>')
  return value
}

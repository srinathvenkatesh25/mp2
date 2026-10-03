import axios from 'axios'
import type { Ingredient, Meal, RawMeal } from '../types/meal'

const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
})

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

// Turn the raw API object into our clean Meal shape.
export function normalizeMeal(raw: RawMeal): Meal {
  const ingredients: Ingredient[] = []
  for (let i = 1; i <= 20; i++) {
    const name = raw[`strIngredient${i}`]?.trim()
    if (name) {
      ingredients.push({ name, measure: raw[`strMeasure${i}`]?.trim() ?? '' })
    }
  }

  return {
    id: raw.idMeal,
    name: raw.strMeal,
    category: raw.strCategory,
    country: raw.strCountry,
    tags: raw.strTags ? raw.strTags.split(',').map((t) => t.trim()) : [],
    ingredients,
    instructions: raw.strInstructions,
    thumb: raw.strMealThumb,
    youtube: raw.strYoutube ?? '',
    source: raw.strSource ?? '',
  }
}

// If a fetch is already running, everyone who asks gets the SAME promise
// instead of starting 26 more requests (this is what absorbs StrictMode's
// double effect in dev).
let pending: Promise<Meal[]> | null = null

// The API has no "give me everything" endpoint, so we ask for each first
// letter (a-z) at the same time and merge the results.
export function fetchAllMeals(): Promise<Meal[]> {
  if (!pending) {
    pending = Promise.all(
      LETTERS.map((letter) =>
        api.get<{ meals: RawMeal[] | null }>('/search.php', { params: { f: letter } }),
      ),
    )
      .then((responses) => responses.flatMap((res) => res.data.meals ?? []).map(normalizeMeal))
      .finally(() => {
        pending = null
      })
  }
  return pending
}

// Offline fallback: the real data saved by `npm run snapshot`. It is loaded
// with a dynamic import() so it becomes its own chunk that is only downloaded
// when the network fails, not for every visitor.
export async function loadSnapshot(): Promise<Meal[]> {
  const module = await import('../data/meals.raw.json')
  return (module.default as RawMeal[]).map(normalizeMeal)
}

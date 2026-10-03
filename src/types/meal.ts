export interface Ingredient {
  name: string
  measure: string
}

// The cleaned-up shape our app uses everywhere.
export interface Meal {
  id: string
  name: string
  category: string
  country: string
  tags: string[]
  ingredients: Ingredient[]
  instructions: string
  thumb: string
  youtube: string
  source: string
}

// What TheMealDB actually sends: every field is prefixed with "str", and
// ingredients come as 20 separate fields (strIngredient1..20, strMeasure1..20).
export interface RawMeal {
  idMeal: string
  strMeal: string
  strCategory: string
  strCountry: string
  strInstructions: string
  strMealThumb: string
  strTags: string | null
  strYoutube: string | null
  strSource: string | null
  [key: string]: string | null | undefined
}

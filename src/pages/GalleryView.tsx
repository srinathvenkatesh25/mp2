import { useMemo, useState } from 'react'
import FilterChips, { type FilterOption } from '../components/FilterChips'
import MealCard from '../components/MealCard'
import { useMeals } from '../hooks/useMeals'
import type { DetailNavState } from '../types/navigation'
import styles from './GalleryView.module.css'

const MAX_TAG_OPTIONS = 25

// Count how often each value appears, most common first.
function countBy(values: string[]): FilterOption[] {
  const counts = new Map<string, number>()
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1)
  return [...counts]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
}

// Add the value if missing, remove it if present. Returns a NEW array.
function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

function GalleryView() {
  const { meals } = useMeals()

  const [countries, setCountries] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])

  // The chip lists only depend on the meals, so build them once per meals change.
  const countryOptions = useMemo(() => countBy(meals.map((m) => m.country)), [meals])
  const categoryOptions = useMemo(() => countBy(meals.map((m) => m.category)), [meals])
  const tagOptions = useMemo(
    () => countBy(meals.flatMap((m) => m.tags)).slice(0, MAX_TAG_OPTIONS),
    [meals],
  )

  // Inside one group: OR (any selected value matches).
  // Between groups: AND (a meal must satisfy every group that has a selection).
  const visible = useMemo(
    () =>
      meals.filter(
        (m) =>
          (countries.length === 0 || countries.includes(m.country)) &&
          (categories.length === 0 || categories.includes(m.category)) &&
          (tags.length === 0 || m.tags.some((t) => tags.includes(t))),
      ),
    [meals, countries, categories, tags],
  )

  const navState: DetailNavState = useMemo(
    () => ({ ids: visible.map((m) => m.id), from: '/gallery' }),
    [visible],
  )

  const hasFilters = countries.length + categories.length + tags.length > 0

  function clearFilters() {
    setCountries([])
    setCategories([])
    setTags([])
  }

  return (
    <>
      <h1 className={styles.title}>Gallery</h1>

      <FilterChips
        title="Cuisine (country)"
        options={countryOptions}
        selected={countries}
        onToggle={(v) => setCountries((list) => toggle(list, v))}
      />
      <FilterChips
        title="Category"
        options={categoryOptions}
        selected={categories}
        onToggle={(v) => setCategories((list) => toggle(list, v))}
      />
      <FilterChips
        title="Tags"
        options={tagOptions}
        selected={tags}
        onToggle={(v) => setTags((list) => toggle(list, v))}
      />

      <div className={styles.status}>
        <span>
          {visible.length} of {meals.length} recipes
        </span>
        {hasFilters && (
          <button type="button" className={styles.clear} onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <p>No recipes match these filters.</p>
      ) : (
        <div className={styles.grid}>
          {visible.map((meal) => (
            <MealCard key={meal.id} meal={meal} navState={navState} />
          ))}
        </div>
      )}
    </>
  )
}

export default GalleryView

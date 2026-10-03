import { useMemo, useState } from 'react'
import MealRow from '../components/MealRow'
import { useMeals } from '../hooks/useMeals'
import type { DetailNavState } from '../types/navigation'
import styles from './ListView.module.css'

type SortField = 'name' | 'country' | 'category'
type SortDir = 'asc' | 'desc'

const SORT_LABELS: Record<SortField, string> = {
  name: 'Name',
  country: 'Country',
  category: 'Category',
}

function ListView() {
  const { meals } = useMeals()

  // Controlled inputs: React state is the single source of truth for each control.
  const [query, setQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  // Derived data: recomputed only when one of the listed inputs changes.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matches = q
      ? meals.filter(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.ingredients.some((i) => i.name.toLowerCase().includes(q)),
        )
      : meals
    // Copy before sorting: sort() mutates, and React state must never be mutated.
    const sorted = [...matches].sort(
      (a, b) => a[sortField].localeCompare(b[sortField]) || a.name.localeCompare(b.name),
    )
    return sortDir === 'asc' ? sorted : sorted.reverse()
  }, [meals, query, sortField, sortDir])

  const navState: DetailNavState = useMemo(
    () => ({ ids: visible.map((m) => m.id), from: '/list' }),
    [visible],
  )

  return (
    <>
      <h1 className={styles.title}>Recipes</h1>

      <div className={styles.controls}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search by recipe or ingredient"
          aria-label="Search recipes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label className={styles.sort}>
          Sort by
          <select value={sortField} onChange={(e) => setSortField(e.target.value as SortField)}>
            {(Object.keys(SORT_LABELS) as SortField[]).map((field) => (
              <option key={field} value={field}>
                {SORT_LABELS[field]}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className={styles.direction}
          onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
        >
          {sortDir === 'asc' ? 'Ascending ↑' : 'Descending ↓'}
        </button>
      </div>

      <p className={styles.count}>
        {visible.length} of {meals.length} recipes
      </p>

      {visible.length === 0 ? (
        <p>No recipes match "{query}".</p>
      ) : (
        <div>
          {visible.map((meal) => (
            <MealRow key={meal.id} meal={meal} navState={navState} />
          ))}
        </div>
      )}
    </>
  )
}

export default ListView

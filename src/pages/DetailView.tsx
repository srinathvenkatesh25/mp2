import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useMeals } from '../hooks/useMeals'
import type { DetailNavState } from '../types/navigation'
import styles from './DetailView.module.css'

function DetailView() {
  // All hooks run before any early return (a rule of hooks).
  const { id } = useParams()
  const { meals } = useMeals()
  // Whatever the previous page put in <Link state={...}>; null on a direct visit.
  const incoming = useLocation().state as DetailNavState | null

  // New meal on screen -> start at the top of the page.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const meal = meals.find((m) => m.id === id)

  if (!meal) {
    return (
      <>
        <h1>No recipe with id "{id}"</h1>
        <Link to="/list">Back to list</Link>
      </>
    )
  }

  // Cycle through the list the user came from. If they opened the URL
  // directly (or the id isn't in that list), fall back to every meal.
  const ids = incoming?.ids.includes(meal.id) ? incoming.ids : meals.map((m) => m.id)
  const navState: DetailNavState = { ids, from: incoming?.from ?? '/list' }

  const position = ids.indexOf(meal.id)
  // "+ ids.length" keeps the number positive so % wraps first<->last correctly.
  const prevId = ids[(position - 1 + ids.length) % ids.length]
  const nextId = ids[(position + 1) % ids.length]

  const paragraphs = meal.instructions.split(/\r?\n+/).filter((line) => line.trim())

  return (
    <article>
      <div className={styles.topBar}>
        <Link to={navState.from} className={styles.back}>
          ← Back to {navState.from === '/gallery' ? 'gallery' : 'list'}
        </Link>
        <div className={styles.pager}>
          <Link to={`/meal/${prevId}`} state={navState} className={styles.pageButton}>
            ← Previous
          </Link>
          <span className={styles.position}>
            {position + 1} of {ids.length}
          </span>
          <Link to={`/meal/${nextId}`} state={navState} className={styles.pageButton}>
            Next →
          </Link>
        </div>
      </div>

      <div className={styles.layout}>
        <img className={styles.image} src={meal.thumb} alt={meal.name} />

        <div>
          <h1 className={styles.title}>{meal.name}</h1>
          <p className={styles.meta}>
            {meal.country} · {meal.category}
          </p>

          {meal.tags.length > 0 && (
            <ul className={styles.tags}>
              {meal.tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className={styles.links}>
            {meal.youtube && (
              <a href={meal.youtube} target="_blank" rel="noreferrer">
                Watch on YouTube
              </a>
            )}
            {meal.source && (
              <a href={meal.source} target="_blank" rel="noreferrer">
                Original source
              </a>
            )}
          </div>

          <h2 className={styles.heading}>Ingredients</h2>
          <ul className={styles.ingredients}>
            {meal.ingredients.map((ingredient, index) => (
              // Ingredients can repeat (e.g. "Garlic" twice), so the index is part of the key.
              <li key={`${ingredient.name}-${index}`}>
                <strong>{ingredient.measure}</strong> {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className={styles.heading}>Instructions</h2>
      {paragraphs.map((line, index) => (
        <p key={index} className={styles.step}>
          {line}
        </p>
      ))}
    </article>
  )
}

export default DetailView

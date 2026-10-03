import { Link } from 'react-router-dom'
import type { Meal } from '../types/meal'
import type { DetailNavState } from '../types/navigation'
import styles from './MealCard.module.css'

interface MealCardProps {
  meal: Meal
  navState: DetailNavState
}

// The whole card is one link to the detail page.
function MealCard({ meal, navState }: MealCardProps) {
  return (
    <Link to={`/meal/${meal.id}`} state={navState} className={styles.card}>
      <img className={styles.image} src={meal.thumb} alt={meal.name} loading="lazy" />
      <div className={styles.body}>
        <h2 className={styles.name}>{meal.name}</h2>
        <p className={styles.meta}>
          {meal.country} · {meal.category}
        </p>
      </div>
    </Link>
  )
}

export default MealCard

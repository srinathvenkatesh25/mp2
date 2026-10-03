import { Link } from 'react-router-dom'
import type { Meal } from '../types/meal'
import type { DetailNavState } from '../types/navigation'
import styles from './MealRow.module.css'

interface MealRowProps {
  meal: Meal
  navState: DetailNavState
}

function MealRow({ meal, navState }: MealRowProps) {
  return (
    <Link to={`/meal/${meal.id}`} state={navState} className={styles.row}>
      {/* TheMealDB serves a ~200px "/small" copy: ~12x lighter than the full image. */}
      <img className={styles.thumb} src={`${meal.thumb}/small`} alt="" loading="lazy" />
      <span className={styles.name}>{meal.name}</span>
      <span className={styles.country}>{meal.country}</span>
      <span className={styles.category}>{meal.category}</span>
    </Link>
  )
}

export default MealRow
